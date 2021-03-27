import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../fretka/note-selection';

import styles from './noteselector.module.scss';

export function LayerMenu(props: { layerIdx: number }) {
  const { layerIdx } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.layerMenu}>
      <button
        onClick={() => dispatch(actions.resetSelectionInLayer({ layerIdx }))}
        className={styles.resetLayerButton}
      >
        reset
      </button>
      <button
        onClick={() => dispatch(actions.deleteLayer({ layerIdx }))}
        className={styles.deleteLayerButton}
      >
        ✘
      </button>
    </div>
  );
}
