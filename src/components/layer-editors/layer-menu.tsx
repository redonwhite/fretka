import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../fretka/layers-slice';

import styles from './layer-editor.module.scss';

export function LayerMenu(props: { layerId: string }) {
  const { layerId } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.layerMenu}>
      <button
        onClick={() =>
         
          dispatch(actions.resetSelectionInLayer({ layerId }))
        
        }
        className={styles.resetLayerButton}
      >
        reset
      </button>
      <button
        onClick={() => dispatch(actions.deleteLayer({ layerId }))}
        className={styles.deleteLayerButton}
      >
        ✘
      </button>
    </div>
  );
}
