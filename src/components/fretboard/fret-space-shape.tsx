import React, { useContext } from 'react';
import { FretboardContext } from '../../fretka/fretboard';
import { convertFromFretSpace, FretShape } from '../../fretka/shapes';
import { xyCoordSetToPathD } from '../../fretka/svg';
import { ShapeEditor } from '../noteselector/shape-editor';

export function FretSpaceShape(props: { shape: FretShape }) {

  const { shape } = props;
  const f = useContext(FretboardContext);
  
  if (!f) return null;

  const gridSpaceCoordSets = convertFromFretSpace(
    shape.segments,
    f.tuning,
    f.fretCount,
  );
  const xyCoordSets = gridSpaceCoordSets.map(f.gridSpaceToXySpace);
  const pathDs = xyCoordSets.map(xyCoordSetToPathD);
      
  return pathDs.map((d) => <path d={d} />);
}
