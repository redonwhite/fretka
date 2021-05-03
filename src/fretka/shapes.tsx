import React from "react";

import { BasicIntervalId, IntervalDirectionId } from "./intervals";
import { basicNotes, NoteAbsolute, NoteClass, NoteClassId } from "./notes";
import { LayerColorId } from "./layers/fretka-layer";
import { action, makeObservable, observable } from "mobx";
import {
  getPositiveSteps,
  addSemitones,
  addInterval,
  getShortestDelta,
} from "./interval-functions";
import { GuitarTuning } from "./guitar-tunings";

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

export type SingleStringId =
  | "string1"
  | "string2"
  | "string3"
  | "string4"
  | "string5"
  | "string6";

export type AbsoluteStringSpecId = SingleStringId | "allStrings";

export type RelativeStringSpec = {
  id: RelativeStringSpecId;
  stringOffset?: number;
  name: string;
  symbol: string | React.ReactElement;
};

// 𝄖	One-line Staff	U + 1D116;	&#119062;
// 𝄗	Two-line Staff	U + 1D117;	&#119063;
// 𝄘	Three-line Staff	U + 1D118;	&#119064;
// 𝄙	Four-line Staff	U + 1D119;	&#119065;
// 𝄚	Five-line Staff	U + 1D11A;	&#119066;
// 𝄛	Six-line Staff	U + 1D11B;	&#119067;
// 𝄜	Six-string Fretboard	U + 1D11C;	&#119068;
// 𝄝	Four - string Fretboar
// <span className="arrowSymbol">🠕🠗</span>▲
export const relativeStringSpecArray: Array<RelativeStringSpec> = [
  {
    id: "5up",
    symbol: "🠕🠕🠕🠕🠕",
    stringOffset: 5,
    name: "5 strings up",
  },
  {
    id: "4up",
    symbol: "🠕🠕🠕🠕",
    stringOffset: 4,
    name: "4 strings up",
  },
  {
    id: "3up",
    symbol: "🠕🠕🠕",
    stringOffset: 3,
    name: "3 strings up",
  },
  {
    id: "2up",
    symbol: "🠕🠕",
    stringOffset: 2,
    name: "2 strings up",
  },
  {
    id: "1up",
    symbol: "🠕",
    stringOffset: 1,
    name: "1 string up",
  },
  {
    id: "same",
    symbol: "-",
    stringOffset: 0,
    name: "same string",
  },
  {
    id: "1down",
    symbol: "🠗",
    stringOffset: -1,
    name: "1 string down",
  },
  {
    id: "2down",
    symbol: "🠗🠗",
    stringOffset: -2,
    name: "2 string down",
  },
  {
    id: "3down",
    symbol: "🠗🠗🠗",
    stringOffset: -3,
    name: "3 string down",
  },
  {
    id: "4down",
    symbol: "🠗🠗🠗🠗",
    stringOffset: -4,
    name: "4 string down",
  },
  {
    id: "5down",
    symbol: "🠗🠗🠗🠗🠗",
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
  dir: IntervalDirectionId
];

export type AbsoluteFretCoord = [AbsoluteStringSpecId, AbsoluteFretSpec];
export type RelativeFretCoord = [
  stringSpec: RelativeStringSpecId,
  ...fretSpec: RelativeIntervalSpec
];

export type FretShapeCoordArray = [AbsoluteFretCoord, ...RelativeFretCoord[]];

export interface IShapeAppearance {
  strokeWidth?: number | undefined;
  stroke?: string;
  patternId?: SvgPatternId;
}
export class ShapeAppearance implements IShapeAppearance {
  strokeWidth: number | undefined;
  stroke: string | undefined;
  patternId: SvgPatternId | undefined;

  constructor(pattern?: SvgPatternId, strokeWidth?: number, stroke?: string) {
    this.strokeWidth = strokeWidth;
    this.stroke = stroke;
    this.patternId = pattern;

    makeObservable(this, {
      strokeWidth: observable,
      stroke: observable,
      patternId: observable,
      resetTo: action,
      setPattern: action,
    });
  }

  setPattern = (patternId: SvgPatternId | undefined) =>
    (this.patternId = patternId);
  setStroke = (stroke: string | undefined) => (this.stroke = stroke);
  setStrokeWidth = (strokeWidth: number | undefined) =>
    (this.strokeWidth = strokeWidth);

  resetTo = (state: IShapeAppearance) => {
    this.strokeWidth = state.strokeWidth;
    this.stroke = state.stroke;
    this.patternId = state.patternId;
  };
}

export type FretShapeSpecTypeId = "sequence of intervals";

export type FretShapeSpecType = {
  id: FretShapeSpecTypeId;
  name: string;
};

export const fretShapeTypeArray: FretShapeSpecType[] = [
  {
    id: "sequence of intervals",
    name: "sequence of intervals",
  },
];

export interface IFretShapeSpec {
  type: FretShapeSpecTypeId;
  segments: FretShapeCoordArray;
  appearance: IShapeAppearance;
}

export class FretShapeSpec implements IFretShapeSpec {
  type: FretShapeSpecTypeId;
  segments: FretShapeCoordArray;
  appearance: ShapeAppearance;

  constructor(
    type: FretShapeSpecTypeId,
    headCoord: AbsoluteFretCoord = ["string1", "a"]
  ) {
    this.type = type;
    this.segments = [headCoord];
    this.appearance = new ShapeAppearance();

    makeObservable(this, {
      type: observable,
      segments: observable,
      appearance: observable,
      resetTo: action,
      setHeadFretSpec: action,
      setHeadStringSpec: action,
    });
  }

  setHeadFretSpec = (fretSpec: AbsoluteFretSpec) =>
    (this.segments[0][1] = fretSpec);

  setHeadStringSpec = (stringSpec: AbsoluteStringSpecId) =>
    (this.segments[0][0] = stringSpec);

  resetTo = (state: IFretShapeSpec) => {
    this.type = state.type;
    this.segments = [...state.segments];
    this.appearance.resetTo(state.appearance);
  };
}

export function getStringIndexesFromAbsSpec(
  stringSpec: AbsoluteStringSpecId,
  tuning: GuitarTuning
): Array<number> {
  switch (stringSpec) {
    case "allStrings":
      const r = Object.keys(tuning.stringTunings)
        .map((_, idx) => idx)
        .reverse();
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
  fretCount: number
): number[] {
  if (typeof fret === "number") {
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
  tuning: GuitarTuning
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
  shape: FretShapeCoordArray,
  tuning: GuitarTuning,
  fretCount: number
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

  rootCoords.forEach(rootCoord => {
    if (!shapeTail) return;
    const result: GridSpaceCoordSet = [];

    let [fromStringIdx, fromFretIdx] = rootCoord;

    let fromNote = addSemitones(
      tuning.stringTunings[fromStringIdx],
      fromFretIdx
    );

    for (const [relStringSpec, ...relIntervalSpec] of shapeTail) {
      const toStringIdx = getStringIndexFromRelSpec(
        relStringSpec,
        fromStringIdx
      );

      if (toStringIdx < 0 || toStringIdx >= tuning.stringTunings.length) {
        break; // out of fretboard bounds
      }

      const [toFretIdx, toNote] = getFretIndexAndNoteFromRelSpec(
        relIntervalSpec,
        fromFretIdx,
        fromNote,
        toStringIdx,
        tuning
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

export type SvgPatternId =
  | "beads"
  | "fans"
  | "wanStripes"
  | "thickStripes"
  | "lightStripes";

export type SvgPattern = {
  id: SvgPatternId;
  name: string;
};

export const svgPatterns: {
  [key in SvgPatternId]: { id: key } & SvgPattern;
} = {
  beads: { id: "beads", name: "beads" },
  fans: { id: "fans", name: "fans" },
  wanStripes: { id: "wanStripes", name: "wide and narrow stripes" },
  thickStripes: { id: "thickStripes", name: "thick stripes" },
  lightStripes: { id: "lightStripes", name: "light stripes" },
};
export const svgPatternsArray: SvgPattern[] = Object.values(svgPatterns);

export function getDomPatternId(pattern: SvgPatternId, color: LayerColorId) {
  return `${pattern}Pattern_${color}`;
}
