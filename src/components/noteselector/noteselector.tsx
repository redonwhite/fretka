import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isNoteRoot,
  isNoteRootInLayerByIdx,
  isNoteSelectedInLayerByIdx,
} from '../../fretka/note-selection';

import * as fretka from '../../fretka/notes';
import styles from './noteselector.module.scss';
import { noteSelectionSelector } from '../../fretka/store';
import { actions } from '../../fretka/note-selection';
import { LayerMenu } from './layer-menu';

export function NoteSelector(props: { layerIdx: any; }) {
  const { layerIdx } = props;

  const noteSelection = useSelector(noteSelectionSelector);
  const notes = fretka.notes.basicNotesArray;
  const dispatch = useDispatch();

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.noteButton]: true,
      [styles.selected]: isNoteSelectedInLayerByIdx(
        noteSelection,
        note,
        layerIdx,
      ),
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: isNoteRootInLayerByIdx(noteSelection, note, layerIdx),
    });
  };

  function getWrapperClass(): string | undefined {
    return classNames({
      [styles.noteSelectorWrapper]: true,
      layerColor: true,
      [`layerColor-${noteSelection.layers[layerIdx].color}`]: true,
    });
  }

  return (
    <div className={getWrapperClass()}>
      <div className={styles.layerHeader}>
        <div className={styles.layerTitle}>{noteSelection.layers[layerIdx].name}</div>
        <div className={styles.layerMenuContainer}><LayerMenu layerIdx={layerIdx} /></div>
      </div>
      <div className={styles.noteButtonWrapper}>
        {/* prettier-ignore */ }
        {notes.map((note, idx) => (
          <div className={styles.noteButtonSet} key={idx}>
            <button
              onClick={() =>
                dispatch(
                  actions.toggleNoteSelection({
                    layerIdx: layerIdx,
                    noteId: note.id,
                  }),
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
                  actions.toggleRootSelection({
                    layerIdx: layerIdx,
                    noteId: note.id,
                  }),
                )
              }
              className={getRootButtonClass(note)}
              key={'root' + idx}
            >
              root
            </button>
          </div>
        ))}
        
      </div>
    </div>
  );
}
