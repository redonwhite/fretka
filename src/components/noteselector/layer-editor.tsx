import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../fretka/note-selection';
import { noteStateSelector } from '../../fretka/store';
import { NoteSelector } from './note-selector';
import styles from './note-selector.module.scss';
import { ShapeEditor } from './shape-editor';

export function LayerEditor() {
  const layerState = useSelector(noteStateSelector);
  const dispatch = useDispatch();
  const hasLayers = layerState.layers?.length > 0;

  return (
    <div className={styles.layeredNoteSelectorWrapper}>
      {layerState.layers.map((layer, idx) => {
        switch (layer.layerType) {
          case 'noteSelection':
            return <NoteSelector layerIdx={idx} key={idx} />;
          case 'shape':
            return <ShapeEditor layer={layer} layerIdx={idx} key={idx} />;
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
