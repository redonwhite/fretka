import React from 'react';
import { useDispatch } from 'react-redux';
import type { ShapeLayer, ShapeLayerWithIndex } from '../../fretka/layers';

export function ShapeLayerEditor(props: { layer: ShapeLayerWithIndex }) {
  const dispatch = useDispatch();

  return <div> this is a shape editor</div>;
}
