import type { NoteClassId } from './notes';

export type StringSpec =
  | 'string1'
  | 'string2'
  | 'string3'
  | 'string4'
  | 'string5'
  | 'string6';

export type BasicIntervalSpec =
  | 'root'
  | 'min2'
  | 'maj2'
  | 'min3'
  | 'maj3'
  | 'perf4'
  | 'tritone'
  | 'perf5'
  | 'min6'
  | 'maj6'
  | 'min7'
  | 'maj7';

export type FretSpec = 'open' | number | BasicIntervalSpec | NoteClassId;
export type FretCoord = [StringSpec, FretSpec];
export type FretShape = {
  segments: Array<FretCoord>;
  appearance: { stroke: string };
};
