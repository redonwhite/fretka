import {
  IntervalId,
  IntervalDirectionId,
  basicIntervals,
  BasicIntervalId,
  basicIntervalsBySpan,
} from "./intervals";
import {
  basicNotes,
  basicNotesArray,
  NoteAbsolute,
  NoteClass,
  NoteClassId,
} from "./notes";

export function addSemitonesOld(note: NoteClass, semitones: number): NoteClass {
  const newIdx = (note.idx + semitones + 12) % 12;
  return basicNotesArray[newIdx];
}

export function addSemitones(
  note: NoteAbsolute,
  semitones: number
): NoteAbsolute {
  const newNote_AbsIdx = note.absIdx + semitones;
  const newNoteClass_Idx = (newNote_AbsIdx + 3 + 12) % 12;
  const newNoteClass = basicNotesArray[newNoteClass_Idx];

  const newNote: NoteAbsolute = {
    ...newNoteClass,
    absIdx: newNote_AbsIdx,
  };

  return newNote;
}

export function addInterval(
  note: NoteAbsolute,
  intervalId: IntervalId,
  direction: IntervalDirectionId = "up"
) {
  const semitones = getSemitones(intervalId, direction);
  return addSemitones(note, semitones);
}

export function getSemitones(
  intervalId: IntervalId,
  direction: IntervalDirectionId = "up"
) {
  const dirMultiplier = direction === "up" ? 1 : -1;
  return dirMultiplier * basicIntervals[intervalId].span;
}

export function addIntervalOld(
  note: NoteClass,
  iId: BasicIntervalId
): NoteClass {
  const intervalSpan = basicIntervals[iId].span;
  const newBaseIdx = (note.idx + intervalSpan + 12) % 12;
  const newNoteBase = basicNotesArray[newBaseIdx];

  const newNote = {
    ...newNoteBase,
    idx: note.idx + intervalSpan,
  };

  return newNote;
}

export function getBasicIntervalBetween(from: NoteClassId, to: NoteClassId) {
  const positiveSteps = (12 + basicNotes[to].idx - basicNotes[from].idx) % 12;
  return basicIntervalsBySpan[positiveSteps];
}

export function getPositiveSteps(from: NoteClass, to: NoteClass) {
  return (12 + to.idx - from.idx) % 12;
}

export function getShortestDelta(from: NoteClass, to: NoteClass) {
  const delta = to.idx - from.idx;
  const absdelta = Math.abs(delta);
  if (absdelta <= 6) return delta;
  let c = Math.sign(delta) * (absdelta - 12);
  return c;
}
