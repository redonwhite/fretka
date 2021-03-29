import type { BasicIntervalId } from './intervals';
import type { NoteClassId } from './notes';

export type AbsoluteStringSpec =
  | 'allStrings'
  | 'string1'
  | 'string2'
  | 'string3'
  | 'string4'
  | 'string5'
  | 'string6';

export type RelativeStringSpec =
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
