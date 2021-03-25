import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNoteRoot, isNoteSelected } from '../../fretka/note-selection';

import * as fretka from '../../fretka/fretka';
import styles from './noteselector.module.scss';
import { noteSelectionSelector } from '../../store';
import { actions } from '../../fretka/note-selection';

export function NoteSelector() {

  const noteSelection = useSelector(noteSelectionSelector);
  
  const notes = fretka.notes.basicNotesArray;
  const dispatch = useDispatch();

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.noteButton]: true,
      [styles.selected]: isNoteSelected(noteSelection, note),
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: isNoteRoot(noteSelection, note),
    });
  };

  const resetSelection = () => {
    void 0//updateNoteSelection({});
  };

  return (
    <div className={styles.noteSelector}>
      {notes.map((note, idx) => (
        <div className={styles.buttonSet} key={idx}>
          <button
            onClick={() =>
              dispatch(
                actions.toggleNoteSelection({ layerIdx: 0, noteId: note.id }),
              )
            }
            className={getButtonClass(note)}
            key={idx}
          >
            {fretka.getPrettyNoteName(note)}
          </button>
          <button
            onClick={() =>
              dispatch(
                actions.toggleRootSelection({ layerIdx: 0, noteId: note.id }),
              )
            }
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
