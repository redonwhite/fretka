import React, { useContext } from 'react';
import type { FretShape } from '../../fretka/shapes';
import { xyCoordSetToPathD } from '../../fretka/svg';
import { ShapeEditor } from '../noteselector/shape-editor';
import { FretboardContext } from './fretboard';



export function FretSpaceShape(props: { shape: FretShape }) {

  const { shape } = props;
  const f = useContext(FretboardContext);
  
  f?.grid .shape.segments
  const d = xyCoordSetToPathD(
  
  return <path d={ } />;
}
