import React from 'react';

import { observer } from 'mobx-react-lite';
import { LayerStore } from "../../store/app-state";
import type { FretkaLayer } from '../../fretka/layers/fretka-layer';
import { LayerMenu } from './layer-menu';

import styles from './layer-editor.module.scss';

export const LayerHeader = observer((props: { layer: FretkaLayer, layerStore: LayerStore }) => {
  const { layer, layerStore } = props;

  return (
    <div className={styles.layerHeader}>
      <div className={styles.layerTitle}>
        <input
          className={styles.layerNameInput}
          value={layer.name}
          onChange={event => layer.setName(event.target.value)}
        />
      </div>
      <div className={styles.layerMenuContainer}>
        <LayerMenu layer={layer} layerStore={layerStore}/>
      </div>
    </div>
  );
  
});
