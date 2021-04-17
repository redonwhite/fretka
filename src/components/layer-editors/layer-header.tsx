import React, { ChangeEvent } from 'react';
import { LayerMenu } from './layer-menu';

import styles from './layer-editor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { noteStateSelector } from '../../fretka/store';
import type { FretkaLayerWithIndex } from '../../fretka/layers';
import { actions } from '../../fretka/layers-slice';

export function LayerHeader(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;
  const layerState = useSelector(noteStateSelector);
  const dispatch = useDispatch();

  return (
    <div className={styles.layerHeader}>
      <div className={styles.layerTitle}>
        <input
          className={styles.layerNameInput}
          value={layer.name}
          onChange={event =>
            dispatch(
              actions.renameLayer({
                layerId: layer.id,
                layerName: event.target.value,
              })
            )
          }
        />
      </div>
      <div className={styles.layerMenuContainer}>
        <LayerMenu layerId={layer.id} />
      </div>
    </div>
  );
}
