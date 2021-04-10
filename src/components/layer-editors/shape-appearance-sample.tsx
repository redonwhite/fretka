import { ShapeLayerWithIndex } from "../../fretka/layers";
import { FretShapeSpec, getShapeAppearance } from "../../fretka/shapes";

export function ShapeAppearanceSample(props: {
  shape: FretShapeSpec;
  layer: ShapeLayerWithIndex;
}) {
  const { shape, layer } = props;
  const shapeAppearance = getShapeAppearance(shape, layer);

  return (
    <svg width="100%">
      <rect
        x="0"
        y="0"
        rx="5"
        width="100%"
        height="100%"
        {...shapeAppearance}
      />
    </svg>
  );
}
