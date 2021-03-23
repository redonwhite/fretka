import classNames from 'classnames';
import React, { useContext } from 'react';
import { NoteSelectionContext, useNoteSelection } from '../../fretka/contexts';

import * as fretka from '../../fretka/fretka';
import styles from './noteselector.module.scss';

export function NoteSelector() {
  const {
    noteSelection,
    updateNoteSelection,
    toggleNote,
    toggleRoot,
  } = useNoteSelection();

  const notes = fretka.notes.basicNotesArray;

  const getTogglerFor = (note: fretka.NoteClass) => () => toggleNote(note);
  const getRootTogglerFor = (note: fretka.NoteClass) => () => toggleRoot(note);

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.noteButton]: true,
      [styles.selected]: note.id in noteSelection,
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: noteSelection[note.id]?.isRoot,
    });
  };

  const resetSelection = () => {
    updateNoteSelection({});
  };

  return (
    <div className={styles.noteSelector}>
      {notes.map((note, idx) => (
        <div className={styles.buttonSet}>
          <button
            onClick={getTogglerFor(note)}
            className={getButtonClass(note)}
            key={idx}
          >
            {fretka.getPrettyNoteName(note)}
          </button>
          <button
            onClick={getRootTogglerFor(note)}
            className={getRootButtonClass(note)}
            key={'root' + idx}
          >
            root
          </button>
        </div>
      ))}
      <button onClick={resetSelection} className={styles.reset}>
        RESET
      </button>
    </div>
  );
}
