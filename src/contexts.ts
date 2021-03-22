import React from 'react';
import type { NoteClassId } from './fretka/fretka';

export type NoteSelection = {
  [key in NoteClassId]?: {
    selected: true;
  };
};

export type NoteSelectionContextType = [
  NoteSelection,
  React.Dispatch<React.SetStateAction<NoteSelection>>,
];

export const NoteSelectionContext = React.createContext<NoteSelectionContextType | null>(
  null,
);
