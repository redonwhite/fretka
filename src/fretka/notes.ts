export type NoteClassId =
  | "c"
  | "csharp"
  | "d"
  | "dsharp"
  | "e"
  | "f"
  | "fsharp"
  | "g"
  | "gsharp"
  | "a"
  | "asharp"
  | "b"

export type NoteClassIdCanon = 
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B"

export type SharpNoteClassId =
  | "csharp"
  | "dsharp"
  | "fsharp"
  | "gsharp"
  | "asharp"

export type NoteClass = {
  id: NoteClassId;
  idCanon: NoteClassIdCanon;
  idx: number;
  idxForMidiOctave0: number;
  sharpOf: NoteClassId;
  flatOf: NoteClassId;
  isNatural: boolean;
}

export type NoteAbsoluteNatural = NoteAbsolute & { isNatural: true };

export type NoteAbsolute = NoteClass & { absIdx: number /** midi index number */ };

export type NoteInScaleExtraParams = { direction?: "up" | "down" };

export type NoteClassInScale = NoteClass & NoteInScaleExtraParams;

// TODO! Midi indexes don't start on A. 

const c: NoteClass = {
  id: "c",
  idCanon: "C",
  isNatural: true,
  sharpOf: "b",
  flatOf: "csharp",
  idx: 0,
  idxForMidiOctave0: 0,
};

const csharp: NoteClass = {
  id: "csharp",
  idCanon: "C#",
  isNatural: false,
  sharpOf: "c",
  flatOf: "d",
  idx: 1,
  idxForMidiOctave0: 1,
};

const d: NoteClass = {
  id: "d",
  idCanon: "D",
  isNatural: true,
  sharpOf: "csharp",
  flatOf: "dsharp",
  idx: 2,
  idxForMidiOctave0: 2,
};

const dsharp: NoteClass = {
  id: "dsharp",
  idCanon: "D#",
  isNatural: false,
  sharpOf: "d",
  flatOf: "e",
  idx: 3,
  idxForMidiOctave0: 3,
};

const e: NoteClass = {
  id: "e",
  idCanon: "E",
  isNatural: true,
  sharpOf: "dsharp",
  flatOf: "f",
  idx: 4,
  idxForMidiOctave0: 4,
};

const f: NoteClass = {
  id: "f",
  idCanon: "F",
  isNatural: true,
  sharpOf: "e",
  flatOf: "fsharp",
  idx: 5,
  idxForMidiOctave0: 5,
};

const fsharp: NoteClass = {
  id: "fsharp",
  idCanon: "F#",
  isNatural: false,
  sharpOf: "f",
  flatOf: "g",
  idx: 6,
  idxForMidiOctave0: 6,
};

const g: NoteClass = {
  id: "g",
  idCanon: "G",
  isNatural: true,
  sharpOf: "fsharp",
  flatOf: "gsharp",
  idx: 7,
  idxForMidiOctave0: 7,
};

const gsharp: NoteClass = {
  id: "gsharp",
  idCanon: "G#",
  isNatural: false,
  sharpOf: "g",
  flatOf: "a",
  idx: 8,
  idxForMidiOctave0: 8,
};

const a: NoteClass = {
  id: "a",
  idCanon: "A",
  isNatural: true,
  sharpOf: "gsharp",
  flatOf: "asharp",
  idx: 9,
  idxForMidiOctave0: 9,
};

const asharp: NoteClass = {
  id: "asharp",
  idCanon: "A#",
  isNatural: false,
  sharpOf: "a",
  flatOf: "b",
  idx: 10,
  idxForMidiOctave0: 10,
};

const b: NoteClass = {
  id: "b",
  idCanon: "B",
  isNatural: true,
  sharpOf: "asharp",
  flatOf: "c",
  idx: 11,
  idxForMidiOctave0: 11,
};

export const basicNotes: { [key_ in NoteClassId]: NoteClass } = {
  c: c,
  csharp: csharp,
  d: d,
  dsharp: dsharp,
  e: e,
  f: f,
  fsharp: fsharp,
  g: g,
  gsharp: gsharp,
  a: a,
  asharp: asharp,
  b: b,
};

export const basicNoteIds: NoteClassId[] = Object.keys(
  basicNotes
) as NoteClassId[];

export const basicNotesArray: Array<NoteClass> = [
  c,
  csharp,
  d,
  dsharp,
  e,
  f,
  fsharp,
  g,
  gsharp,
  a,
  asharp,
  b,
];

export const notes = { basicNotes, basicNotesArray };

export function getPrettyNoteName(note: NoteClass) {
  if (note.isNatural) return note.id.toUpperCase();
  return note.sharpOf.toUpperCase() + "♯";
}

export const e2: NoteAbsolute = {
  ...basicNotes.e,
  absIdx: basicNotes.e.idxForMidiOctave0 + 24
}

export const a2: NoteAbsolute = {
  ...basicNotes.a,
  absIdx: basicNotes.a.idxForMidiOctave0 + 24
}

export const d3: NoteAbsolute = {
  ...basicNotes.d,
  absIdx: basicNotes.d.idxForMidiOctave0 + 36
}

export const g3: NoteAbsolute = {
  ...basicNotes.g,
  absIdx: basicNotes.g.idxForMidiOctave0 + 36
}

export const b3: NoteAbsolute = {
  ...basicNotes.b,
  absIdx: basicNotes.b.idxForMidiOctave0 + 36
}

export const e4: NoteAbsolute = {
  ...basicNotes.e,
  absIdx: basicNotes.e.idxForMidiOctave0 + 48
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

export function getOctaveNumber(note : NoteAbsolute) : number {
  return (note.absIdx - note.idxForMidiOctave0) / 12;
}

export function getScientificNotationName(note : NoteAbsolute) : string {
  return `${note.idCanon}${getOctaveNumber(note)}`;
}