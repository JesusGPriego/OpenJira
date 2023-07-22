import React, { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  SaveOutlined,
  AddCircleOutline,
  RemoveCircleOutlined,
} from '@mui/icons-material';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { isAddingEntry, toggleIsAddingEntry } = useContext(UIContext);

  const { addEntry } = useContext(EntriesContext);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetForm = () => {
    toggleIsAddingEntry();
    setInputValue('');
    setTouched(false);
  };

  const onSave = () => {
    if (!inputValue || inputValue.trim().length === 0) {
      return;
    }
    addEntry(inputValue.trim());
    resetForm();
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1,
      }}
    >
      {isAddingEntry && (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            placeholder='Nueva entrada'
            multiline
            label='Nueva Entrada'
            helperText={
              inputValue.length <= 0 && touched && 'Inserte una nueva tarea'
            }
            value={inputValue}
            onChange={onTextFieldChange}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
          />

          <Box display={'flex'} justifyContent={'space-between'}>
            <Button variant='text' onClick={toggleIsAddingEntry}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
      <Button
        sx={{
          marginTop: 1,
        }}
        startIcon={
          !isAddingEntry ? <AddCircleOutline /> : <RemoveCircleOutlined />
        }
        fullWidth
        variant='outlined'
        onClick={toggleIsAddingEntry}
      >
        {`${!isAddingEntry ? 'Agregar tarea' : 'Cerrar formulario'}`}
      </Button>
    </Box>
  );
};
