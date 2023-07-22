import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: '[Entry] - Add-Entry'; payload: Entry }
  | { type: '[Entry] - Update-Entry' }
  | { type: '[Entry] - Refresh-Entry'; payload: Entry[] }
  | { type: '[Entry] - Delete-Entry'; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] - Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case '[Entry] - Update-Entry':
      return {
        ...state,
        entries: [...state.entries],
      };
    case '[Entry] - Refresh-Entry':
      return {
        ...state,
        entries: action.payload,
      };
    case '[Entry] - Delete-Entry':
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
};
