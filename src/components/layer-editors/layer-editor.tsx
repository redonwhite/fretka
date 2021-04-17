import classNames from 'classnames';
import type {
  FretkaLayerWithIndex,
  ShapeLayerWithIndex,
} from '../../fretka/layers';

import { LayerHeader } from './layer-header';
import { SelectionLayerEditor } from './selection-layer-editor';
import { ShapeLayerEditor } from './shape-layer-editor';

import styles from './layer-editor.module.scss';
import { LayerBullet } from './layer-bullet';

export function LayerEditor(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;

  function getWrapperClass(): string | undefined {
    return classNames({
      [styles.layerEditor]: true,
      layerColor: true,
      [`layerColor-${layer.color}`]: true,
    });
  }

  const isSelection = layer.layerType === 'noteSelection';
  const isShape = layer.layerType === 'shape';

  return (
    <div className={getWrapperClass()}>
      <LayerBullet layer={layer} />
      <LayerHeader layer={layer} />
      {isSelection && <SelectionLayerEditor layerId={layer.id} />}
      {isShape && <ShapeLayerEditor layerId={layer.id} />}
    </div>
  );
}
