type NoteClassId =
  | "a"
  | "asharp"
  | "b"
  | "c"
  | "csharp"
  | "d"
  | "dsharp"
  | "e"
  | "f"
  | "fsharp"
  | "g"
  | "gsharp";

type EqTempInterval = number;
type ScaleStepIndex = number;

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

type IntervalQuality =
  | "minor"
  | "major"
  | "perfect"
  | "augmented"
  | "diminished";

type Interval = {
  name: string;
  step: number;
  quality: IntervalQuality;
  span: EqTempInterval;
};

const root: Interval = {
  name: "root",
  step: 1,
  quality: "perfect",
  span: 0,
};

const min2: Interval = {
  name: "minor second",
  step: 2,
  quality: "minor",
  span: 1,
};

const maj2: Interval = {
  name: "major second",
  step: 2,
  quality: "major",
  span: 2,
};

const min3: Interval = {
  name: "minor third",
  step: 3,
  quality: "minor",
  span: 3,
};

const maj3: Interval = {
  name: "major third",
  step: 3,
  quality: "major",
  span: 4,
};

const perf4: Interval = {
  name: "perfect fourth",
  step: 4,
  quality: "perfect",
  span: 5,
};

const aug4: Interval = {
  name: "augmented fourth",
  step: 4,
  quality: "augmented",
  span: 6,
};

const dim5: Interval = {
  name: "diminished fifth",
  step: 5,
  quality: "diminished",
  span: 6,
};

const perf5: Interval = {
  name: "perfect fifth",
  step: 5,
  quality: "perfect",
  span: 7,
};

const min6: Interval = {
  name: "minor sixth",
  step: 6,
  quality: "minor",
  span: 8,
};

const maj6: Interval = {
  name: "major sixth",
  step: 6,
  quality: "major",
  span: 9,
};

const min7: Interval = {
  name: "minor seventh",
  step: 7,
  quality: "minor",
  span: 10,
};

const maj7: Interval = {
  name: "major seventh",
  step: 7,
  quality: "major",
  span: 11,
};

type NoteClass = {
  id: NoteClassId;
  sharpOf: NoteClassId;
  flatOf: NoteClassId;
  isNatural: boolean;
};

type NoteInScaleExtraParams = { direction: "up" | "down" };
type NoteClassInScale = NoteClass & NoteInScaleExtraParams;

type ScaleMovable = {
  intervals: Array<Interval>;
  extraParams?: { [key: number]: NoteInScaleExtraParams };
};

type ScaleConcrete = {
  movableVersion?: ScaleMovable;
  notes: { [key in NoteClassId]: NoteClassInScale };
};

const a: NoteClass = {
  id: "a",
  isNatural: true,
  sharpOf: "gsharp",
  flatOf: "asharp",
};

const asharp: NoteClass = {
  id: "asharp",
  isNatural: false,
  sharpOf: "a",
  flatOf: "b",
};

const b: NoteClass = {
  id: "b",
  isNatural: true,
  sharpOf: "asharp",
  flatOf: "c",
};

const c: NoteClass = {
  id: "c",
  isNatural: true,
  sharpOf: "b",
  flatOf: "csharp",
};

const csharp: NoteClass = {
  id: "csharp",
  isNatural: true,
  sharpOf: "c",
  flatOf: "d",
};

const d: NoteClass = {
  id: "d",
  isNatural: true,
  sharpOf: "csharp",
  flatOf: "dsharp",
};

const dsharp: NoteClass = {
  id: "dsharp",
  isNatural: true,
  sharpOf: "d",
  flatOf: "e",
};

const e: NoteClass = {
  id: "e",
  isNatural: true,
  sharpOf: "dsharp",
  flatOf: "f",
};

const f: NoteClass = {
  id: "f",
  isNatural: true,
  sharpOf: "e",
  flatOf: "fsharp",
};

const fsharp: NoteClass = {
  id: "fsharp",
  isNatural: true,
  sharpOf: "f",
  flatOf: "g",
};

const g: NoteClass = {
  id: "g",
  isNatural: true,
  sharpOf: "fsharp",
  flatOf: "gsharp",
};

const gsharp: NoteClass = {
  id: "gsharp",
  isNatural: true,
  sharpOf: "g",
  flatOf: "a",
};

const major: ScaleMovable = {
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

type Mode = {
  modeOf: ScaleMovable;
  startOn: ScaleStepIndex;
} & ScaleMovable;

const ionian = {
  modeOf: major,
  startOn: step1,
  intervals: major.intervals,
};
