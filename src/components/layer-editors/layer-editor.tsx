import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { FretkaLayer } from '../../fretka/layers/fretka-layer';

import { LayerHeader } from './layer-header';
import { SelectionLayerEditor } from './selection-layer-editor';

import styles from './layer-editor.module.scss';
// import { LayerBullet } from './layer-bullet';
import { LayerStore } from "../../store/layer-store";
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';
import React from 'react';
import { ShapeLayer } from '../../fretka/layers/shape-layer';
import { ShapeLayerEditor } from './shape-layer-editor';

export const LayerEditor = observer(
  (props: { layerStore: LayerStore; layer: FretkaLayer }) => {
    const { layerStore, layer } = props;
    const layerState = layerStore.layerStates.get(layer.id);

    function getWrapperClass(): string | undefined {
      return classNames({
        [styles.layerEditor]: true,
        layerColor: true,
        [`layerColor-${layer.color}`]: true,
        [styles.layerLeaving]: layerState === "leaving",
      });
    }

    const isSelection = layer.layerType === "noteSelection";
    const isShape = layer.layerType === "shape";

    return (
      <div className={getWrapperClass()}>
        <LayerHeader layerStore={layerStore} layer={layer} />
        {isSelection && (
          <SelectionLayerEditor layer={layer as NoteSelectionLayer} />
        )}
        {isShape && <ShapeLayerEditor layer={layer as ShapeLayer} />}
      </div>
    );
  }
);
