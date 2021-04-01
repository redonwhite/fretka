import React from 'react';
import type { FretShape } from '../../fretka/shapes';

export function FretSpaceShape(props: { shape: FretShape }) {
  const { shape: FretShape } = props;
  return <circle />;
}
