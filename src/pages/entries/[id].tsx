import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/layouts';
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '../../../database';
import { EntriesContext } from '@/context/entries';
import { dateUtils } from '@/utils';
interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = (props) => {
  const { entry } = props;

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

  const router = useRouter();

  const [InputValue, setInputValue] = useState(entry ? entry.description : '');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => InputValue.length <= 0 && touched,
    [InputValue, touched]
  );

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (InputValue.trim().length === 0) {
      return;
    }
    updateEntry(entry._id, status, InputValue);
  };

  const deleteEntryhandler = () => {
    deleteEntry(entry._id);
    router.push('/');
  };

  return (
    <Layout
      title={`${
        entry
          ? entry.description.substring(0, 15) + '...'
          : InputValue.substring(0, 15)
      } ...`}
    >
      <Grid container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${InputValue}`}
              subheader={`Creada hace ${dateUtils.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
                fullWidth
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                value={InputValue}
                onChange={onTextFieldChange}
                helperText={isNotValid && 'Ingrese algún valor'}
                error={isNotValid}
                onBlur={() => setTouched(true)}
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={InputValue.length <= 0}
              ></Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}
        onClick={deleteEntryhandler}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log(id);
  return {
    props: { entry: { ...entry, _id: entry._id.toString() } },
  };
};

export default EntryPage;
