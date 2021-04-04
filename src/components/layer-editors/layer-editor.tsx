import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import type {
  FretkaLayer,
  FretkaLayerWithIndex,
  ShapeLayerWithIndex,
} from '../../fretka/layers';
import { noteStateSelector } from '../../fretka/store';

import styles from './layer-editor.module.scss';
import { LayerHeader } from './layer-header';
import { SelectionLayerEditor } from './selection-layer-editor';
import { ShapeLayerEditor } from './shape-layer-editor';

export function LayerEditor(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;

  function getWrapperClass(): string | undefined {
    return classNames({
      layerColor: true,
      [`layerColor-${layer.color}`]: true,
    });
  }

  const isSelection = layer.layerType === 'noteSelection';
  const isShape = layer.layerType === 'shape';

  return (
    <div className={getWrapperClass()}>
      <LayerHeader layer={layer} />
      {isSelection && <SelectionLayerEditor layerIdx={layer.idx} />}
      {isShape && <ShapeLayerEditor layer={layer as ShapeLayerWithIndex} />}
    </div>
  );
}
