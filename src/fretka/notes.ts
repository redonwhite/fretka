export type NoteClassId =
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

export type NoteClass = {
  id: NoteClassId;
  idx: number;
  sharpOf: NoteClassId;
  flatOf: NoteClassId;
  isNatural: boolean;
};

export type NoteAbsoluteNatural = NoteAbsolute & { isNatural: true };

export type NoteAbsolute = NoteClass & { absIdx: number };

export type NoteInScaleExtraParams = { direction?: "up" | "down" };

export type NoteClassInScale = NoteClass & NoteInScaleExtraParams;

const a: NoteClass = {
  id: "a",
  isNatural: true,
  sharpOf: "gsharp",
  flatOf: "asharp",
  idx: 0,
};

const asharp: NoteClass = {
  id: "asharp",
  isNatural: false,
  sharpOf: "a",
  flatOf: "b",
  idx: 1,
};

const b: NoteClass = {
  id: "b",
  isNatural: true,
  sharpOf: "asharp",
  flatOf: "c",
  idx: 2,
};

const c: NoteClass = {
  id: "c",
  isNatural: true,
  sharpOf: "b",
  flatOf: "csharp",
  idx: 3,
};

const csharp: NoteClass = {
  id: "csharp",
  isNatural: false,
  sharpOf: "c",
  flatOf: "d",
  idx: 4,
};

const d: NoteClass = {
  id: "d",
  isNatural: true,
  sharpOf: "csharp",
  flatOf: "dsharp",
  idx: 5,
};

const dsharp: NoteClass = {
  id: "dsharp",
  isNatural: false,
  sharpOf: "d",
  flatOf: "e",
  idx: 6,
};

const e: NoteClass = {
  id: "e",
  isNatural: true,
  sharpOf: "dsharp",
  flatOf: "f",
  idx: 7,
};

const f: NoteClass = {
  id: "f",
  isNatural: true,
  sharpOf: "e",
  flatOf: "fsharp",
  idx: 8,
};

const fsharp: NoteClass = {
  id: "fsharp",
  isNatural: false,
  sharpOf: "f",
  flatOf: "g",
  idx: 9,
};

const g: NoteClass = {
  id: "g",
  isNatural: true,
  sharpOf: "fsharp",
  flatOf: "gsharp",
  idx: 10,
};

const gsharp: NoteClass = {
  id: "gsharp",
  isNatural: false,
  sharpOf: "g",
  flatOf: "a",
  idx: 11,
};

export const basicNotes: { [key_ in NoteClassId]: NoteClass } = {
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

export const basicNoteIds: NoteClassId[] = Object.keys(
  basicNotes
) as NoteClassId[];

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

export const notes = { basicNotes, basicNotesArray };

export function getPrettyNoteName(note: NoteClass) {
  if (note.isNatural) return note.id.toUpperCase();
  return note.sharpOf.toUpperCase() + "♯";
}

export const middleC: NoteAbsolute = {
  ...basicNotes.c,
  absIdx: 60, // midi indexes used.
};

export const c1: NoteAbsolute = {
  ...basicNotes.c,
  absIdx: middleC.absIdx - 3 * 12,
};

export const a0: NoteAbsolute = {
  ...basicNotes.a,
  absIdx: c1.absIdx - 3,
};



