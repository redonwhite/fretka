import React from 'react';

import { observer } from 'mobx-react-lite';
import { LayerStore } from "../../store/layer-store";
import type { FretkaLayer } from '../../fretka/layers/fretka-layer';
import { LayerMenu } from './layer-menu';

import styles from './layer-editor.module.scss';
// import { LayerBullet } from "./layer-bullet";

export const LayerHeader = observer((props: { layer: FretkaLayer, layerStore: LayerStore }) => {
  const { layer, layerStore } = props;

  return (
    <div className={styles.layerHeader}>
      ⠶&nbsp;
      <div className={styles.layerTitle}>
        <input
          className={styles.layerNameInput}
          value={layer.name}
          onChange={event => layer.setName(event.target.value)}
        />
      </div>
      <div className={styles.layerMenuContainer}>
        <LayerMenu layer={layer} layerStore={layerStore} />
      </div>
    </div>
  );
  
});
