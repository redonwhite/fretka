import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { ShapeLayer } from "../../fretka/layers/shape-layer";
import { SvgFretSpaceShape } from "./svg-fret-space-shape";
import { FretboardDefinition } from "../../fretka/fretboard";

export const SvgShapeLayer = observer((props: {
  fretboardDefinition: FretboardDefinition,
  layer: ShapeLayer
}) => {

  const { fretboardDefinition, layer } = props;

  const groupClasseNames = classNames({
    shapeLayer: true,
    layerColor: true,
    [`layerColor-${layer.color}`]: true,
  });

  return (
    <g className={groupClasseNames}>
      <SvgFretSpaceShape fretboardDefinition={fretboardDefinition} shape={layer.shape} layer={layer} />
    </g>
  );

});
