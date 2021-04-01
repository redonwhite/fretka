import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../fretka/layers-slice';
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
      <div className={styles.emptyLayerSlotActionWrapper}>
        <button
          className="addLayerButton secondaryButton"
          onClick={() =>
            dispatch(actions.addLayerAtEnd({ layerType: 'noteSelection' }))
          }
        >
          <span>✚</span>
          <span>add layer</span>
        </button>
        <button
          className="addLayerButton secondaryButton"
          onClick={() =>
            dispatch(actions.addLayerAtEnd({ layerType: 'shape' }))
          }
        >
          <span>✚</span>
          <span>add shape</span>
        </button>
      </div>
    </div>
  );
}
