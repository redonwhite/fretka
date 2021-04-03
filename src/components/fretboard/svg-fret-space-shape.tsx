import React, { useContext } from 'react';
import { FretboardContext } from '../../fretka/fretboard';
import { convertFromFretSpace, FretShapeSpec } from '../../fretka/shapes';
import { xyCoordSetToPathD } from '../../fretka/svg';
import { ShapeEditor } from '../noteselector/shape-editor';

export function SvgFretSpaceShape(props: { shape: FretShapeSpec }) {
  const { shape } = props;

  const fillColor = shape.appearance.fill;
  const strokeColor = shape.appearance.stroke;
  const strokeWidth = shape.appearance.strokeWidth;

  const f = useContext(FretboardContext);

  if (!f) return null;

  const gridSpaceCoordSets = convertFromFretSpace(
    shape.segments,
    f.tuning,
    f.fretCount,
  );
  const xyCoordSets = gridSpaceCoordSets.map(f.gridSpaceToXySpace);
  const pathDs = xyCoordSets.map(xyCoordSetToPathD);

  return (
    <>
      {pathDs.map((d, idx) => (
        <path className="fretkaShape" d={d} key={idx} />
      ))}
    </>
  );
}
