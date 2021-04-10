import classNames from 'classnames';
import React from 'react';
import type { ShapeLayer, ShapeLayerWithIndex } from "../../fretka/layers";
import { SvgFretSpaceShape } from './svg-fret-space-shape';

export function SvgShapeLayer(props: { layer: ShapeLayerWithIndex }) {
  const { layer } = props;

  const groupClasseNames = classNames({
    shapeLayer: true,
    layerColor: true,
    [`layerColor-${layer.color}`]: true,
  });

  return (
    <g className={groupClasseNames}>
      <SvgFretSpaceShape shape={layer.shape} layer={layer} />
    </g>
  );
}
