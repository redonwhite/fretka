import React from 'react';

import { observer } from 'mobx-react-lite';
import { FretkaLayer } from '../../fretka/layers/fretka-layer';
import { LayerStore } from "../../store/app-state";

import styles from './layer-editor.module.scss';
import { LayerBullet, LayerColorPicker } from "./layer-bullet";

export const LayerMenu = observer((props: { layer: FretkaLayer, layerStore: LayerStore }) => {
  const { layer, layerStore } = props;

  return (
    <div className={styles.layerMenu}>
      <LayerColorPicker layer={props.layer} />
      <button onClick={() => layer.reset()} className={styles.resetLayerButton}>
        reset
      </button>
      <button
        onClick={() => layerStore.animatedRemoveLayer(layer)}
        className={styles.deleteLayerButton}
      >
        ✘
      </button>
    </div>
  );
});
