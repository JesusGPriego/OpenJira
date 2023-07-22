import React, { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '@/context/ui';
import styles from './EntryList.module.css';
interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onEntryDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    updateEntry(id, status);
    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onEntryDrop}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 210px)',
          backgroundColor: 'transparent',
          overflow: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '1px 5px',
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.5 : 1,
            transition: 'all .3s',
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
