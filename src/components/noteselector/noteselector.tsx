import classNames from 'classnames';
import React, { useContext } from 'react';
import { NoteSelectionContext, NoteSelectionContextType } from '../../contexts';

import * as fretka from '../../fretka/fretka';
import styles from './noteselector.module.scss';

export function NoteSelector() {
  const [noteSelection, updateNoteSelection] = useContext(
    NoteSelectionContext,
  ) as NoteSelectionContextType;

  const notes = fretka.notes.basicNotesArray;

  console.log(noteSelection);

  const getTogglerFor = (note: fretka.NoteClass) => {
    return () => {
      const newSelection = { ...noteSelection };
      note.id in noteSelection
        ? delete newSelection[note.id]
        : (newSelection[note.id] = { selected: true });
      updateNoteSelection(newSelection);
    };
  };

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.noteButton]: true,
      [styles.selected]: note.id in noteSelection,
    });
  };

  const resetSelection = () => {
    updateNoteSelection({});
  };

  return (
    <div className={styles.noteSelector}>
      {notes.map((note, idx) => (
        <button
          onClick={getTogglerFor(note)}
          className={getButtonClass(note)}
          key={idx}
        >
          {fretka.getPrettyNoteName(note)}
        </button>
      ))}
      <button onClick={resetSelection} className={styles.reset}>
        RESET
      </button>
    </div>
  );
}
