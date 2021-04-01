import React from 'react';
import { useDispatch } from 'react-redux';
import type { ShapeLayer } from '../../fretka/layers';

export function ShapeEditor(props: { layer: ShapeLayer; layerIdx: number }) {
  const dispatch = useDispatch();

  return <div> this is a shape editor</div>;
}
