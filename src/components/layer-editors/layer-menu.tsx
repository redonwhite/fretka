import React from 'react';

import { observer } from 'mobx-react-lite';
import { FretkaLayer } from '../../fretka/layers/fretka-layer';
import { LayerStore } from "../../store/app-state";

import styles from './layer-editor.module.scss';

export const LayerMenu = observer((props: { layer: FretkaLayer, layerStore: LayerStore }) => {
  const { layer, layerStore } = props;

  return (
    <div className={styles.layerMenu}>
      <button
        onClick={() => layer.reset()}
        className={styles.resetLayerButton}
      >
        reset
      </button>
      <button
        onClick={() => layerStore.removeLayer(layer)}
        className={styles.deleteLayerButton}
      >
        ✘
      </button>
    </div>
  );
});
