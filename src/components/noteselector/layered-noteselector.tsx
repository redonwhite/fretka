import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../fretka/note-selection';
import { noteSelectionSelector } from '../../fretka/store';
import { NoteSelector } from './noteselector';
import styles from './noteselector.module.scss';

export function LayeredNoteSelector() {
  const noteSelection = useSelector(noteSelectionSelector);
  const dispatch = useDispatch();
  const hasLayers = noteSelection.layers?.length > 0;

  return (
    <div className={styles.layeredNoteSelectorWrapper}>
      {noteSelection.layers.map((layer, idx) => {
        switch (layer.layerType) {
          case 'noteSelection':
            return <NoteSelector layerIdx={idx} key={idx} />;
          case 'shape':
            return <div>it's a shape!</div>;
          default:
            return <div>Unknown layer type!</div>;
        }
      })}
      {hasLayers && (
        <div className={styles.emptyLayerSlotActionWrapper}>
          <button
            className="addLayerButton secondaryButton"
            onClick={() => dispatch(actions.addLayerAtEnd())}
          >
            <span>✚</span>
            <span className={styles.showOnHover}>add layer</span>
          </button>
        </div>
      )}
      {!hasLayers && (
        <div className={styles.emptySelectorActionWrapper}>
          <button
            className="addFirstLayerButton primaryButton"
            onClick={() => dispatch(actions.addLayerAtEnd())}
          >
            select some notes!
          </button>
        </div>
      )}
    </div>
  );
}
