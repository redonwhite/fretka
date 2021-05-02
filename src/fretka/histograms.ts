import { ScaleLike } from "./scales";

export type EnharmonicHistogramValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type EnharmonicHistogramTritoneCount = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type EnharmonicHistogram = [
  EnharmonicHistogramValue,
  EnharmonicHistogramValue,
  EnharmonicHistogramValue,
  EnharmonicHistogramValue,
  EnharmonicHistogramValue,
  EnharmonicHistogramValue,
  EnharmonicHistogramTritoneCount
];

export function getEnharmonicHistogram(scale: ScaleLike): EnharmonicHistogram {
  const histogram: EnharmonicHistogram = [0, 0, 0, 0, 0, 0, 0];
  const positionSet: Set<number> = new Set([]);

  scale.intervals
    .map(interval => interval.span)
    .map(span => (span + 12) % 12)
    .forEach(span => positionSet.add(span));

  const positions = Array.from(positionSet);

  for (let current = 0; current < positions.length; current++) {
    for (let other = current; other < positions.length; other++) {
      const distance = Math.abs(positions[other] - positions[current]);
      const enharmonicDistance = distance > 6 ? 12 - distance : distance;
      histogram[enharmonicDistance]++;
    }
  }

  return histogram;
}
