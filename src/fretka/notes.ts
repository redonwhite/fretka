import {
  root,
  Interval,
  maj2,
  maj3,
  perf4,
  perf5,
  maj6,
  maj7,
  min3,
  min7,
  min6,
  min2,
  aug4,
  dim5,
} from './intervals';

export type NoteClassId =
  | 'a'
  | 'asharp'
  | 'b'
  | 'c'
  | 'csharp'
  | 'd'
  | 'dsharp'
  | 'e'
  | 'f'
  | 'fsharp'
  | 'g'
  | 'gsharp';

export type NoteClass = {
  id: NoteClassId;
  idx: number;
  sharpOf: NoteClassId;
  flatOf: NoteClassId;
  isNatural: boolean;
};

export type ScaleStepIndex = number;

const step1: ScaleStepIndex = 0;
const step2: ScaleStepIndex = 1;
const step3: ScaleStepIndex = 2;
const step4: ScaleStepIndex = 3;
const step5: ScaleStepIndex = 4;
const step6: ScaleStepIndex = 5;
const step7: ScaleStepIndex = 6;
const step8: ScaleStepIndex = 7;
const step9: ScaleStepIndex = 8;
const step10: ScaleStepIndex = 9;
const step11: ScaleStepIndex = 10;
const step12: ScaleStepIndex = 11;

export type NoteAbsolute = NoteClass & {
  absIdx: number;
};

export type NoteInScaleExtraParams = { direction?: 'up' | 'down' };
export type NoteClassInScale = NoteClass & NoteInScaleExtraParams;

export type ScaleMovable = {
  intervals: Array<Interval>;
  extraParams?: { [key: number]: NoteInScaleExtraParams };
};

export type ScaleRooted = {
  movableVersion?: ScaleMovable;
  root: NoteClass;
  notes: { [key in NoteClassId]?: NoteClassInScale };
};

const a: NoteClass = {
  id: 'a',
  isNatural: true,
  sharpOf: 'gsharp',
  flatOf: 'asharp',
  idx: 0,
};

const asharp: NoteClass = {
  id: 'asharp',
  isNatural: false,
  sharpOf: 'a',
  flatOf: 'b',
  idx: 1,
};

const b: NoteClass = {
  id: 'b',
  isNatural: true,
  sharpOf: 'asharp',
  flatOf: 'c',
  idx: 2,
};

const c: NoteClass = {
  id: 'c',
  isNatural: true,
  sharpOf: 'b',
  flatOf: 'csharp',
  idx: 3,
};

const csharp: NoteClass = {
  id: 'csharp',
  isNatural: false,
  sharpOf: 'c',
  flatOf: 'd',
  idx: 4,
};

const d: NoteClass = {
  id: 'd',
  isNatural: true,
  sharpOf: 'csharp',
  flatOf: 'dsharp',
  idx: 5,
};

const dsharp: NoteClass = {
  id: 'dsharp',
  isNatural: false,
  sharpOf: 'd',
  flatOf: 'e',
  idx: 6,
};

const e: NoteClass = {
  id: 'e',
  isNatural: true,
  sharpOf: 'dsharp',
  flatOf: 'f',
  idx: 7,
};

const f: NoteClass = {
  id: 'f',
  isNatural: true,
  sharpOf: 'e',
  flatOf: 'fsharp',
  idx: 8,
};

const fsharp: NoteClass = {
  id: 'fsharp',
  isNatural: false,
  sharpOf: 'f',
  flatOf: 'g',
  idx: 9,
};

const g: NoteClass = {
  id: 'g',
  isNatural: true,
  sharpOf: 'fsharp',
  flatOf: 'gsharp',
  idx: 10,
};

const gsharp: NoteClass = {
  id: 'gsharp',
  isNatural: false,
  sharpOf: 'g',
  flatOf: 'a',
  idx: 11,
};

export const basicNotes: { [key in NoteClassId]: NoteClass } = {
  a: a,
  asharp: asharp,
  b: b,
  c: c,
  csharp: csharp,
  d: d,
  dsharp: dsharp,
  e: e,
  f: f,
  fsharp: fsharp,
  g: g,
  gsharp: gsharp,
};

export const basicNotesArray: Array<NoteClass> = [
  a,
  asharp,
  b,
  c,
  csharp,
  d,
  dsharp,
  e,
  f,
  fsharp,
  g,
  gsharp,
];

export const major: ScaleMovable = {
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

type Mode = {
  name: string;
  modeOf: ScaleMovable;
  startOn: ScaleStepIndex;
} & ScaleMovable;

const ionian = {
  name: 'Ionian',
  modeOf: major,
  startOn: step1,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

const dorian = {
  name: 'Dorian',
  modeOf: major,
  startOn: step2,
  intervals: [root, maj2, min3, perf4, perf5, maj6, min7],
};

const phrygian = {
  name: 'Phrygian',
  modeOf: major,
  startOn: step3,
  intervals: [root, min2, min3, perf4, perf5, min6, min7],
};

const lydian = {
  name: 'Lydian',
  modeOf: major,
  startOn: step4,
  intervals: [root, maj2, maj3, aug4, perf5, maj6, maj7],
};

const mixolydian = {
  name: 'Myxolydian',
  modeOf: major,
  startOn: step5,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, min7],
};

const aeolian = {
  name: 'Aeolian',
  modeOf: major,
  startOn: step6,
  intervals: [root, min2, min3, perf4, perf5, min6, min7],
};
const minor = aeolian;

const locrian = {
  name: 'Locrian',
  modeOf: major,
  startOn: step7,
  intervals: [root, min2, min3, perf4, dim5, min6, min7],
};

export function makeRootedScale(
  movableScale: ScaleMovable,
  root: NoteClass,
): ScaleRooted {
  const baseIdx = root.idx;

  const notes = Object.fromEntries(
    movableScale.intervals
      .map((interval) => (interval.span + baseIdx) % 12)
      .map((idx) => [basicNotesArray[idx].id, basicNotesArray[idx]]),
  );

  return {
    root: root,
    notes,
    movableVersion: movableScale,
  };
}

export const notes = { basicNotes, basicNotesArray };
export const scales = { major, minor };
export const modesOfMajor = {
  ionian,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  aeolian,
  locrian,
};

export function getPrettyNoteName(note: NoteClass) {
  if (note.isNatural) return note.id.toUpperCase();
  return note.sharpOf.toUpperCase() + '♯';
}