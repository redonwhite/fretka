import React, { useCallback } from 'react';
import type { NoteClass, NoteClassId } from './fretka';

export type NoteSelection = {
  [key in NoteClassId]?: {
    selected: true;
    isRoot?: boolean;
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
  toggleRoot: (note: NoteClass) => void;
};

export function useNoteSelection(): NoteSelectionContext {
  const [noteSelection, updateNoteSelection] = React.useContext(
    NoteSelectionContext,
  ) as NoteSelectionReactContextType;

  const toggleNote = useCallback(
    (note: NoteClass) => {
      const newSelection = { ...noteSelection };
      note.id in noteSelection
        ? delete newSelection[note.id]
        : (newSelection[note.id] = { selected: true });
      updateNoteSelection(newSelection);
    },
    [noteSelection, updateNoteSelection],
  );

  const toggleRoot = useCallback(
    (note: NoteClass) => {
      const newSelection: NoteSelection = { ...noteSelection };

      if (!(note.id in noteSelection)) {
        newSelection[note.id] = {
          selected: true,
          isRoot: true,
        };
      }

      Object.keys(newSelection).map((key) => {
        const nid = key as NoteClassId;
        if (nid === note.id && !noteSelection[nid]?.isRoot) {
          newSelection[nid]!.isRoot = true;
        } else {
          delete newSelection[nid]?.isRoot;
        }
      });

      updateNoteSelection(newSelection);
    },
    [noteSelection, updateNoteSelection],
  );

  return { noteSelection, updateNoteSelection, toggleNote, toggleRoot };
}
