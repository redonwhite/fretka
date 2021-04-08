import {
  addInterval,
  addSemitones,
  BasicIntervalId,
  getPositiveSteps,
  getShortestDelta,
  IntervalDirectionId,
} from './intervals';
import {
  basicNotes,
  GuitarTuning,
  NoteAbsolute,
  NoteClass,
  NoteClassId,
} from './notes';

export type AbsoluteStringSpec = {
  id: AbsoluteStringSpecId;
  name: string;
  stringIdx?: number;
};

export const absoluteStringSpecArray: Array<AbsoluteStringSpec> = [
  {
    id: "allStrings",
    name: "on every string",
  },
  {
    id: "string1",
    name: "string 1",
    stringIdx: 0,
  },
  {
    id: "string2",
    name: "string 2",
    stringIdx: 1,
  },
  {
    id: "string3",
    name: "string 3",
    stringIdx: 2,
  },
  {
    id: "string4",
    name: "string 4",
    stringIdx: 3,
  },
  {
    id: "string5",
    name: "string 5",
    stringIdx: 4,
  },
  {
    id: "string6",
    name: "string 6",
    stringIdx: 5,
  },
];

export type AbsoluteStringSpecId =
  | "allStrings"
  | "string1"
  | "string2"
  | "string3"
  | "string4"
  | "string5"
  | "string6";

export type RelativeStringSpec = {
  id: RelativeStringSpecId;
  stringOffset?: number;
  name: string;
};

export const relativeStringSpecArray: Array<RelativeStringSpec> = [
  {
    id: "same",
    stringOffset: 0,
    name: "same string",
  },
  {
    id: "1up",
    stringOffset: 1,
    name: "1 string up",
  },
  {
    id: "2up",
    stringOffset: 2,
    name: "2 strings up",
  },
  {
    id: "3up",
    stringOffset: 3,
    name: "3 strings up",
  },
  {
    id: "4up",
    stringOffset: 4,
    name: "4 strings up",
  },
  {
    id: "5up",
    stringOffset: 5,
    name: "5 strings up",
  },
  {
    id: "1down",
    stringOffset: -1,
    name: "1 string down",
  },
  {
    id: "2down",
    stringOffset: -2,
    name: "2 string down",
  },
  {
    id: "3down",
    stringOffset: -3,
    name: "3 string down",
  },
  {
    id: "4down",
    stringOffset: -4,
    name: "4 string down",
  },
  {
    id: "5down",
    stringOffset: -5,
    name: "5 string down",
  },
];

export type RelativeStringSpecId =
  | "same"
  | "1up"
  | "2up"
  | "3up"
  | "4up"
  | "5up"
  | "1down"
  | "2down"
  | "3down"
  | "4down"
  | "5down";

function getStringIndexFromRelSpec(
  relStringSpec: RelativeStringSpecId,
  fromStringIdx: number
): number {
  switch (relStringSpec) {
    case "same":
      return fromStringIdx;
    case "1up":
      return fromStringIdx + 1;
    case "2up":
      return fromStringIdx + 2;
    case "3up":
      return fromStringIdx + 3;
    case "4up":
      return fromStringIdx + 4;
    case "5up":
      return fromStringIdx + 5;
    case "1down":
      return fromStringIdx - 1;
    case "2down":
      return fromStringIdx - 2;
    case "3down":
      return fromStringIdx - 3;
    case "4down":
      return fromStringIdx - 4;
    case "5down":
      return fromStringIdx - 5;
  }
}

export type RootRelativeFretSpec = number;

export type StringSpec = AbsoluteStringSpecId | RelativeStringSpecId;

export type AbsoluteFretNumberSpec = number;
export type AbsoluteFretSpec = NoteClassId | AbsoluteFretNumberSpec;

export type RelativeIntervalSpec = [
  interval: BasicIntervalId,
  dir: IntervalDirectionId,
];

export type AbsoluteFretCoord = [AbsoluteStringSpecId, AbsoluteFretSpec];
export type RelativeFretCoord = [
  stringSpec: RelativeStringSpecId,
  ...fretSpec: RelativeIntervalSpec
];

export type FretShapeCoords = [AbsoluteFretCoord, ...RelativeFretCoord[]];
export type ShapeAppearance = {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
};

export type FretShapeSpec = {
  type: 'sequence of intervals';
  segments: FretShapeCoords;
  appearance: ShapeAppearance;
};

export function getStringIndexesFromAbsSpec(
  stringSpec: AbsoluteStringSpecId,
  tuning: GuitarTuning
): Array<number> {
  switch (stringSpec) {
    case "allStrings":
      const r = Object.keys(tuning.stringTunings)
        .map((_, idx) => idx)
        .reverse();
      console.log(r);
      return r;
    case "string1":
      return [0];
    case "string2":
      return [1];
    case "string3":
      return [2];
    case "string4":
      return [3];
    case "string5":
      return [4];
    case "string6":
      return [5];
  }
  throw new Error("unknown stirng specifier");
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
  relIntervalSpec: RelativeIntervalSpec,
  fromFretIdx: number,
  fromNote: NoteAbsolute,
  toStringIdx: number,
  tuning: GuitarTuning,
): [toFretIdx: number, toNote: NoteAbsolute] {
  const toStringNote = tuning.stringTunings[toStringIdx];
  const fromNoteSameFretOnToString = addSemitones(toStringNote, fromFretIdx);
  const toNote = addInterval(fromNote, ...relIntervalSpec);
  const deltaFrets = getShortestDelta(fromNoteSameFretOnToString, toNote);
  return [fromFretIdx + deltaFrets, toNote];
}

export type GridSpaceCoord = [stringIdx: number, fretIdx: number];
export type GridSpaceCoordSet = Array<GridSpaceCoord>;
export type GridSpaceCoordSets = Array<GridSpaceCoordSet>;

export function fretSpaceShapeToGridSpace(
  shape: FretShapeCoords,
  tuning: GuitarTuning,
  fretCount: number,
): GridSpaceCoordSets {
  let shapeHead = shape[0];
  let headStringSpec = shapeHead[0];
  let headFretSpec = shapeHead[1];

  let stringIndexes = getStringIndexesFromAbsSpec(headStringSpec, tuning);
  const rootCoords: GridSpaceCoord[] = [];

  stringIndexes.forEach(stringIdx => {
    const startingFretIdxs = getFretIndexesFromAbsoluteFretSpec(
      tuning.stringTunings[stringIdx],
      headFretSpec,
      fretCount
    );

    startingFretIdxs.forEach(fretIdx => rootCoords.push([stringIdx, fretIdx]));
  });

  const [_shapeHead, ...shapeTail] = shape;
  const allResults: GridSpaceCoordSets = [];
  
  rootCoords.forEach((rootCoord) => {
    if (!shapeTail) return;
    const result: GridSpaceCoordSet = [];

    let [fromStringIdx, fromFretIdx] = rootCoord;

    let fromNote = addSemitones(
      tuning.stringTunings[fromStringIdx],
      fromFretIdx,
    );
    
    for (const [relStringSpec, ...relIntervalSpec] of shapeTail) {
      const toStringIdx = getStringIndexFromRelSpec(
        relStringSpec,
        fromStringIdx,
      );

      if (toStringIdx < 0 || toStringIdx >= tuning.stringTunings.length) {
        break; // out of fretboard bounds
      }

      const [toFretIdx, toNote] = getFretIndexAndNoteFromRelSpec(
        relIntervalSpec,
        fromFretIdx,
        fromNote,
        toStringIdx,
        tuning,
      );

      result.push([toStringIdx, toFretIdx]);

      fromNote = toNote;
      fromStringIdx = toStringIdx;
      fromFretIdx = toFretIdx;
    }
    if (result.length > 0) allResults.push(result);
  });

  return allResults;
}

export type XyCoord = [x: number, y: number];
export type XyCoordSet = XyCoord[];
export type XyXoordSets = XyCoordSet[];
