import {
  addInterval,
  addSemitones,
  BasicIntervalId,
  getPositiveSteps,
  getShortestDelta,
} from './intervals';
import { basicNotes, GuitarTuning, NoteClass, NoteClassId } from './notes';

export type AbsoluteStringSpec =
  | 'allStrings'
  | 'string1'
  | 'string2'
  | 'string3'
  | 'string4'
  | 'string5'
  | 'string6';

export type RelativeStringSpec =
  | 'same'
  | '1up'
  | '2up'
  | '3up'
  | '4up'
  | '5up'
  | '1down'
  | '2down'
  | '3down'
  | '4down'
  | '5down';

function getStringIndexFromRelSpec(
  relStringSpec: RelativeStringSpec,
  fromStringIdx: number,
): number {
  switch (relStringSpec) {
    case 'same':
      return fromStringIdx;
    case '1up':
      return fromStringIdx + 1;
    case '2up':
      return fromStringIdx + 2;
    case '3up':
      return fromStringIdx + 3;
    case '4up':
      return fromStringIdx + 4;
    case '5up':
      return fromStringIdx + 5;
    case '1down':
      return fromStringIdx - 1;
    case '2down':
      return fromStringIdx - 2;
    case '3down':
      return fromStringIdx - 3;
    case '4down':
      return fromStringIdx - 4;
    case '5down':
      return fromStringIdx - 5;
  }
}

export type StringSpec = AbsoluteStringSpec | RelativeStringSpec;

export type AbsoluteFretSpec = NoteClassId | number;
export type RelativeFretSpec = BasicIntervalId;
export type FretSpec = AbsoluteFretSpec | RelativeFretSpec;

export type AbsoluteFretCoord = [AbsoluteStringSpec, AbsoluteFretSpec];
export type RelativeFretCoord = [RelativeStringSpec, RelativeFretSpec];
export type FretCoord = [StringSpec, FretSpec];

export type FretShapeCoords = [AbsoluteFretCoord, ...RelativeFretCoord[]];
export type FretShapeAppearance = {
  stroke: string;
};

export type FretShape = {
  segments: FretShapeCoords;
  appearance: FretShapeAppearance;
};

export function getStringIndexesFromAbsSpec(
  stringSpec: AbsoluteStringSpec,
  tuning: GuitarTuning,
): Array<number> {
  switch (stringSpec) {
    case 'allStrings':
      const r = Object.keys(tuning.stringTunings)
        .map((_, idx) => idx)
        .reverse();
      console.log(r);
      return r;
    case 'string1':
      return [0];
    case 'string2':
      return [1];
    case 'string3':
      return [2];
    case 'string4':
      return [3];
    case 'string5':
      return [4];
    case 'string6':
      return [5];
  }
  throw new Error('unknown stirng specifier');
}

function getFretIndexesFromAbsoluteFretSpec(
  stringNote: NoteClass,
  fret: AbsoluteFretSpec,
  fretCount: number,
): number[] {
  if (typeof fret === 'number') {
    return [fret];
  }
  let currentFretIdx = getPositiveSteps(stringNote, basicNotes[fret]);
  const fretIndexes = [];
  while (currentFretIdx < fretCount) {
    fretIndexes.push(currentFretIdx);
    currentFretIdx += 12;
  }
  return fretIndexes;
}

export function getFretIndexAndNoteFromRelSpec(
  relFretSpec: RelativeFretSpec,
  fromFretIdx: number,
  fromNote: NoteClass,
  toStringIdx: number,
  tuning: GuitarTuning
): [toFretIdx: number, toNote: NoteClass] {
  const toStringNote = tuning.stringTunings[toStringIdx];
  console.log('t', toStringNote, toStringIdx);
  const fromNoteSameFretOnToString = addSemitones(toStringNote, fromFretIdx);
  console.log('s', fromNoteSameFretOnToString);
  const toNote = addInterval(fromNote, relFretSpec);
  console.log('sd', toNote);
  const deltaFrets = getShortestDelta(fromNoteSameFretOnToString, toNote);
  console.log('df', deltaFrets);

  return [fromFretIdx + deltaFrets, toNote];
}

export type GridSpaceCoord = [stringIdx: number, fretIdx: number];
export type GridSpaceCoordSet = Array<GridSpaceCoord>;
export type GridSpaceCoordSets = Array<GridSpaceCoordSet>;



export function convertFromFretSpace(
  shape: FretShapeCoords,
  tuning: GuitarTuning,
  fretCount: number,
): GridSpaceCoordSets {
  let shapeHead = shape[0];
  let headStringSpec = shapeHead[0];
  let headFretSpec = shapeHead[1];

  let stringIndexes = getStringIndexesFromAbsSpec(headStringSpec, tuning);

  const gridCoordSets: GridSpaceCoordSets = [];

  stringIndexes.map((stringIdx) => {
    const startingFretIdxs = getFretIndexesFromAbsoluteFretSpec(
      tuning.stringTunings[stringIdx],
      headFretSpec,
      fretCount
    );

    startingFretIdxs.forEach((fretIdx) =>
      gridCoordSets.push([[stringIdx, fretIdx]]),
    );
  });

  gridCoordSets.forEach((coordSet) => {
    const [_, ...shapeTail] = shape;
    if (!shapeTail) return;

    let [fromStringIdx, fromFretIdx] = coordSet[0];
    console.log(
      ';',
      [fromStringIdx, fromFretIdx],
      tuning.stringTunings[fromStringIdx],
    );
    let fromNote = addSemitones(
      tuning.stringTunings[fromStringIdx],
      fromFretIdx,
    );

    for (const [relStringSpec, relFretSpec] of shapeTail) {
      const toStringIdx = getStringIndexFromRelSpec(
        relStringSpec,
        fromStringIdx,
      );
      if (toStringIdx < 0 || toStringIdx >= tuning.stringTunings.length) {
        break;
      }

      const [toFretIdx, toNote] = getFretIndexAndNoteFromRelSpec(
        relFretSpec,
        fromFretIdx,
        fromNote,
        toStringIdx,
        tuning
      );

      coordSet.push([toStringIdx, toFretIdx]);

      fromNote = toNote;
      fromStringIdx = toStringIdx;
      fromFretIdx = toFretIdx;
    }
  });

  return gridCoordSets;
}

export type XyCoord = [x: number, y: number];
export type XyCoordSet = XyCoord[];
export type XyXoordSets = XyCoordSet[];