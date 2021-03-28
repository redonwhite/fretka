import React from 'react';
import type { FretShape } from '../../fretka/fret-shapes';

export function SvgShape(props: { shape: FretShape }) {
  const { shape: FretShape } = props;
  return <circle />;
}
