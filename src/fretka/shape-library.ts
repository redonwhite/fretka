import type { ShapeLayer } from './layers';
import type { FretShapeSpec } from './shapes';

export const pentatonicMinorPos1: FretShapeSpec = {
  appearance: {
    fill: 'url(#graphpaper)',
  },
  type: 'sequence of intervals',
  segments: [
    ['string1', 'a'],
    ['same', 'root', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'maj3', 'up'],
    ['1up', 'perf4', 'up'],
    ['same', 'min3', 'up'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'maj3', 'down'],
  ],
};

export const pentatonicMinorPos2: FretShapeSpec = {
  appearance: {
    fill: 'url(#pj1)',
  },
  type: 'sequence of intervals',
  segments: [
    ['string1', 'a'],
    ['same', 'min3', 'up'],
    ['1up', 'maj3', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['same', 'maj2', 'up'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'maj3', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
  ],
};

export const pentatonicMinorPos3: FretShapeSpec = {
  appearance: {
    fill: 'url(#pj1)',
  },
  type: 'sequence of intervals',
  segments: [
    ['string1', 'a'],
    ['same', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'maj3', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['same', 'maj2', 'up'],
    ['1down', 'maj3', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['same', 'maj2', 'down'],
  ],
};

export const pentatonicMinorPos4: FretShapeSpec = {
  appearance: {
    fill: 'url(#pj1)',
  },
  type: 'sequence of intervals',
  segments: [
    ['string1', 'a'],
    ['same', 'perf5', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'maj3', 'up'],
    ['same', 'min3', 'up'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'maj3', 'down'],
    ['1down', 'perf4', 'down'],
    ['same', 'maj2', 'down'],
  ],
};

export const pentatonicMinorPos5: FretShapeSpec = {
  appearance: {
    fill: 'url(#pj1)',
  },
  type: 'sequence of intervals',
  segments: [
    ['string1', 'a'],
    ['same', 'min7', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'maj3', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['1up', 'perf4', 'up'],
    ['same', 'maj2', 'up'],
    ['1down', 'perf4', 'down'],
    ['1down', 'maj3', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['1down', 'perf4', 'down'],
    ['same', 'maj2', 'down'],
  ],
};
