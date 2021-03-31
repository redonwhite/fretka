import {
  basicNotes,
  basicNotesArray,
  EqTempInterval,
  NoteClass,
  NoteClassId,
} from './notes';

export type IntervalQuality =
  | 'minor'
  | 'major'
  | 'perfect'
  | 'augmented'
  | 'diminished';

export type IntervalBase = {
  id: string;
  abbr: string;
  name: string;
  step: number;
  quality?: IntervalQuality;
  span: EqTempInterval;
};

export type BasicInterval = IntervalBase & {
  id: BasicIntervalId;
  isBasic: true;
};

export type OtherInterval = IntervalBase & {
  isBasic: false;
  basicEquivalent: BasicInterval;
};

export type Interval = BasicInterval | OtherInterval;
export type BasicIntervalId =
  | 'root'
  | 'min2'
  | 'maj2'
  | 'min3'
  | 'maj3'
  | 'perf4'
  | 'tt'
  | 'perf5'
  | 'min6'
  | 'maj6'
  | 'min7'
  | 'maj7';

export const root: BasicInterval = {
  id: 'root',
  abbr: 'R',
  name: 'root',
  step: 1,
  quality: 'perfect',
  span: 0,
  isBasic: true,
};

export const min2: BasicInterval = {
  id: 'min2',
  abbr: '♭2',
  name: 'minor second',
  step: 2,
  quality: 'minor',
  span: 1,
  isBasic: true,
};

export const maj2: BasicInterval = {
  id: 'maj2',
  abbr: '2',
  name: 'major second',
  step: 2,
  quality: 'major',
  span: 2,
  isBasic: true,
};

export const min3: BasicInterval = {
  id: 'min3',
  name: 'minor third',
  abbr: '♭3',
  step: 3,
  quality: 'minor',
  span: 3,
  isBasic: true,
};

export const maj3: BasicInterval = {
  id: 'maj3',
  name: 'major third',
  abbr: '3',
  step: 3,
  quality: 'major',
  span: 4,
  isBasic: true,
};

export const perf4: BasicInterval = {
  id: 'perf4',
  name: 'perfect fourth',
  abbr: '4',
  step: 4,
  quality: 'perfect',
  span: 5,
  isBasic: true,
};

export const tt: BasicInterval = {
  id: 'tt',
  name: 'tritone',
  abbr: 'TT',
  step: 4,
  span: 6,
  isBasic: true,
};

export const aug4: Interval = {
  id: 'aug4',
  name: 'augmented fourth',
  abbr: '4+',
  step: 4,
  quality: 'augmented',
  span: 6,
  isBasic: false,
  basicEquivalent: tt,
};

export const dim5: Interval = {
  id: 'dim5',
  name: 'diminished fifth',
  abbr: '5-',
  step: 5,
  quality: 'diminished',
  span: 6,
  isBasic: false,
  basicEquivalent: tt,
};

export const perf5: BasicInterval = {
  id: 'perf5',
  name: 'perfect fifth',
  abbr: '5',
  step: 5,
  quality: 'perfect',
  span: 7,
  isBasic: true,
};

export const min6: BasicInterval = {
  id: 'min6',
  name: 'minor sixth',
  abbr: '♭6',
  step: 6,
  quality: 'minor',
  span: 8,
  isBasic: true,
};

export const maj6: BasicInterval = {
  id: 'maj6',
  name: 'major sixth',
  abbr: '6',
  step: 6,
  quality: 'major',
  span: 9,
  isBasic: true,
};

export const min7: BasicInterval = {
  id: 'min7',
  abbr: '♭7',
  name: 'minor seventh',
  step: 7,
  quality: 'minor',
  span: 10,
  isBasic: true,
};

export const maj7: BasicInterval = {
  id: 'maj7',
  name: 'major seventh',
  abbr: '7',
  step: 7,
  quality: 'major',
  span: 11,
  isBasic: true,
};

export const basicIntervalsArray: Array<BasicInterval> = [
  root,
  min2,
  maj2,
  min3,
  maj3,
  perf4,
  tt,
  perf5,
  min6,
  maj6,
  min7,
  maj7,
];

export type BasicIntervals = { [k in BasicIntervalId]: BasicInterval };

export const basicIntervals: BasicIntervals = Object.fromEntries(
  basicIntervalsArray.map((i) => [i.id, i]),
) as BasicIntervals;

export const basicIntervalsBySpan = basicIntervalsArray;

export function addSemitones(note: NoteClass, semitones: number): NoteClass {
  const newIdx = (note.idx + semitones + 12) % 12;
  return basicNotesArray[newIdx];
}

export function addInterval(note: NoteClass, iId: BasicIntervalId): NoteClass {
  const newIdx = (note.idx + basicIntervals[iId].span + 12) % 12;
  return basicNotesArray[newIdx];
}

export function getPositiveSteps(from: NoteClass, to: NoteClass) {
  return (12 + to.idx - from.idx) % 12;
}

export function getShortestDelta(from: NoteClass, to: NoteClass) {
  console.log('calculating interval from: ' + from.id + ' to: ' + to.id);
  const delta = to.idx - from.idx;
  console.log('to.idx - from.idx delta: ' + delta);
  const absdelta = Math.abs(delta);
  console.log('abs delta: ' + absdelta);
  if (absdelta <= 6) return delta;
  let c = Math.sign(delta) * (absdelta - 12);
  console.log('abs delta > 6, so using this instead: ' + c);
  return c;
}