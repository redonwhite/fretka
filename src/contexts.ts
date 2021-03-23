import React from 'react';
import type { NoteClass, NoteClassId } from './fretka/fretka';

export type NoteSelection = {
  [key in NoteClassId]?: {
    selected: true;
  };
};

export type NoteSelectionReactContextType = [
  NoteSelection,
  React.Dispatch<React.SetStateAction<NoteSelection>>,
];

export const NoteSelectionContext = React.createContext<NoteSelectionReactContextType | null>(
  null,
);

type NoteSelectionContext = {
  noteSelection: NoteSelection;
  updateNoteSelection: (newSelection: NoteSelection) => void;
  toggleNote: (note: NoteClass) => void;
};

export function useNoteSelection(): NoteSelectionContext {
  const [noteSelection, updateNoteSelection] = React.useContext(
    NoteSelectionContext,
  ) as NoteSelectionReactContextType;

  const toggleNote = (note: NoteClass) => {
    const newSelection = { ...noteSelection };
    note.id in noteSelection
      ? delete newSelection[note.id]
      : (newSelection[note.id] = { selected: true });
    updateNoteSelection(newSelection);
  };
  return { noteSelection, updateNoteSelection, toggleNote };
}