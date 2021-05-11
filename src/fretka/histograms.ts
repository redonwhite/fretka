import { NoteSelection } from "./layers/note-selection-layer";
import { basicNoteIds } from "./notes";
import { ScaleLike } from "./scales";
export interface WithHistogram {
  histogram: EnharmonicHistogram;
}

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

export function withHistogram<T extends ScaleLike>(scale: T) {
  return {
    ...scale,
    histogram: getEnharmonicHistogramForScale(scale),
  };
}

export function getEnharmonicHistogramForScale(scale: ScaleLike) {
  return getEnharmonicHistogram(scale.intervals.map(iv => iv.span));
}

export function getEnharmonicHistogram(spans: number[]): EnharmonicHistogram {
  const histogram: EnharmonicHistogram = [0, 0, 0, 0, 0, 0, 0];
  const positionSet: Set<number> = new Set([]);

  spans.map(span => (span + 12) % 12).forEach(span => positionSet.add(span));

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

export function getEnharmonicHistogramForSelection(
  sel: NoteSelection
): EnharmonicHistogram {
  return getEnharmonicHistogram(getSpansFromSelection(sel));
}

export function histogramGreaterOrEqualTo(
  given: EnharmonicHistogram,
  minimum: EnharmonicHistogram
) {
  return given.every((val, idx) => minimum[idx] <= val);
}

export function histogramSmallerOrEqualTo(
  given: EnharmonicHistogram,
  maximum: EnharmonicHistogram
) {
  return given.every((val, idx) => maximum[idx] >= val);
}

export function histogramInRange(
  given: EnharmonicHistogram,
  minimum: EnharmonicHistogram,
  maximum: EnharmonicHistogram
) {
  return given.every((val, idx) => minimum[idx] <= val && val <= maximum[idx]);
}  

export function getIndexOfFirstSelection(sel: NoteSelection): number {
  if (sel.a) return 0;
  if (sel.asharp) return 1;
  if (sel.b) return 2;
  if (sel.c) return 3;
  if (sel.csharp) return 4;
  if (sel.d) return 5;
  if (sel.dsharp) return 6;
  if (sel.e) return 7;
  if (sel.f) return 8;
  if (sel.fsharp) return 9;
  if (sel.g) return 10;
  if (sel.gsharp) return 11;
  return -1;
}

export function getSpansFromSelection(sel: NoteSelection): number[] {
  const firstIndex = getIndexOfFirstSelection(sel);
  if (firstIndex < 0) return [];
  const spans = [0];
  for (let n = 1; n < 12; n++) {
    const currIdx = (firstIndex + n) % 12;
    const currentNoteId = basicNoteIds[currIdx];
    if (sel[currentNoteId]) spans.push(n);
  }
  return spans;
}

export function isSubsetCandidate(
  superHist: EnharmonicHistogram,
  subHist: EnharmonicHistogram
): boolean {
  return (
    superHist[0] >= subHist[0] &&
    superHist[1] >= subHist[1] &&
    superHist[2] >= subHist[2] &&
    superHist[3] >= subHist[3] &&
    superHist[4] >= subHist[4] &&
    superHist[5] >= subHist[5] &&
    superHist[6] >= subHist[6]
  );
}

export function isEqualCanditate(
  superHist: EnharmonicHistogram,
  subHist: EnharmonicHistogram
): boolean {
  return (
    superHist[0] === subHist[0] &&
    superHist[1] === subHist[1] &&
    superHist[2] === subHist[2] &&
    superHist[3] === subHist[3] &&
    superHist[4] === subHist[4] &&
    superHist[5] === subHist[5] &&
    superHist[6] === subHist[6]
  );
}
