import {
  aug4,
  dim5,
  Interval,
  maj2,
  maj3,
  maj6,
  maj7,
  min2,
  min3,
  min6,
  min7,
  perf4,
  perf5,
  root,
} from "./intervals";
import {
  NoteClass,
  basicNotesArray,
  NoteClassId,
  NoteClassInScale,
  NoteInScaleExtraParams,
} from "./notes";

export const major: ScaleMovable = {
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

export type ScaleMovable = {
  name?: string;
  intervals: Array<Interval>;
  extraParams?: { [key: number]: NoteInScaleExtraParams };
};

export type ScaleRooted = {
  movableVersion?: ScaleMovable;
  root: NoteClass;
  notes: { [key_ in NoteClassId]?: NoteClassInScale };
};

export type ScaleStepIndex = number;

export const step1: ScaleStepIndex = 0;
export const step2: ScaleStepIndex = 1;
export const step3: ScaleStepIndex = 2;
export const step4: ScaleStepIndex = 3;
export const step5: ScaleStepIndex = 4;
export const step6: ScaleStepIndex = 5;
export const step7: ScaleStepIndex = 6;
export const step8: ScaleStepIndex = 7;
export const step9: ScaleStepIndex = 8;
export const step10: ScaleStepIndex = 9;
export const step11: ScaleStepIndex = 10;
export const step12: ScaleStepIndex = 11;

type Mode = {
  modeOf: ScaleMovable;
  startOn: ScaleStepIndex;
} & ScaleMovable;

const ionian: Mode = {
  name: "Ionian",
  modeOf: major,
  startOn: step1,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

const dorian: Mode = {
  name: "Dorian",
  modeOf: major,
  startOn: step2,
  intervals: [root, maj2, min3, perf4, perf5, maj6, min7],
};

const phrygian: Mode = {
  name: "Phrygian",
  modeOf: major,
  startOn: step3,
  intervals: [root, min2, min3, perf4, perf5, min6, min7],
};

const lydian: Mode = {
  name: "Lydian",
  modeOf: major,
  startOn: step4,
  intervals: [root, maj2, maj3, aug4, perf5, maj6, maj7],
};

const mixolydian: Mode = {
  name: "Myxolydian",
  modeOf: major,
  startOn: step5,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, min7],
};

const aeolian: Mode = {
  name: "Aeolian",
  modeOf: major,
  startOn: step6,
  intervals: [root, min2, min3, perf4, perf5, min6, min7],
};

const minor: Mode = aeolian;

const locrian: Mode = {
  name: "Locrian",
  modeOf: major,
  startOn: step7,
  intervals: [root, min2, min3, perf4, dim5, min6, min7],
};

export function makeRootedScale(
  movableScale: ScaleMovable,
  root: NoteClass
): ScaleRooted {
  const baseIdx = root.idx;

  const notes = Object.fromEntries(
    movableScale.intervals
      .map(interval => (interval.span + baseIdx) % 12)
      .map(idx => [basicNotesArray[idx].id, basicNotesArray[idx]])
  );

  return {
    root: root,
    notes,
    movableVersion: movableScale,
  };
}

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

interface ScaleLike {
  intervals: Interval[];
}

export interface Rooted {
  root: NoteClass;
}

export interface RootedScaleLike extends ScaleLike, Rooted {}

export function getEnharmonicHistogram(scale: ScaleLike) {}
