import { observer } from 'mobx-react-lite';
import { FretboardDefinition } from "../../fretka/fretboard-definition";
import { ShapeLayer } from '../../fretka/layers/shape-layer';
import { FretShapeSpec, fretSpaceShapeToGridSpace, XyCoord } from '../../fretka/shapes';
import { xyCoordSetToPathD } from '../../fretka/svg';

export const SvgFretSpaceShape = observer(
  (props: {
    fretboardDefinition: FretboardDefinition,
    shape: FretShapeSpec,
    layer: ShapeLayer
  }) => {

  const { fretboardDefinition, shape, layer } = props;
  const shapeAppearance = layer.appearance;

  const gridSpaceCoordSets = fretSpaceShapeToGridSpace(
    shape.segments,
    fretboardDefinition.tuning,
    fretboardDefinition.fretCount
  );

  const xyCoordSets = gridSpaceCoordSets.map(coord => fretboardDefinition.gridSpaceToXySpace(coord));
  const xyCoordSetsWithAbsWidths = xyCoordSets.map(
    xyCoordSet => xyCoordSet.map(
      xyCoord => [(xyCoord[0] * 0.01) * fretboardDefinition.fretboardWidth, xyCoord[1]] as XyCoord
    )
  );
  const pathDs = xyCoordSetsWithAbsWidths.map(xyCoordSetToPathD);

    return <>{pathDs.map((d, idx) => (
      <path className="fretkaShape" d={d} key={idx} {...shapeAppearance} />
    ))}</>
});
