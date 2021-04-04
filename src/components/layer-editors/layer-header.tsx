import React from 'react';
import { LayerMenu } from './layer-menu';

import styles from './layer-editor.module.scss';
import { useSelector } from 'react-redux';
import { noteStateSelector } from '../../fretka/store';
import type { FretkaLayerWithIndex } from '../../fretka/layers';

export function LayerHeader(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;
  const layerState = useSelector(noteStateSelector);

  return (
    <div className={styles.layerHeader}>
      <div className={styles.layerTitle}>{layer.name}</div>
      <div className={styles.layerMenuContainer}>
        <LayerMenu layerIdx={layer.idx} />
      </div>
    </div>
  );
}
