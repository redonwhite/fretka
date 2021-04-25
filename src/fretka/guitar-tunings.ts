import { makeObservable, observable } from "mobx";
import { NoteAbsolute, basicNotes } from "./notes";

export type StringTunings = Array<NoteAbsolute>;

export class GuitarTuning implements IGuitarTuning {
  name: string;
  stringTunings: StringTunings;

  constructor(baseTuning: IGuitarTuning) {
    this.name = baseTuning.name;
    this.stringTunings = [...baseTuning.stringTunings];

    makeObservable(this, {
      name: observable,
      stringTunings: observable,
    });
  }
}

export interface IGuitarTuning {
  name: string;
  stringTunings: StringTunings;
}

export const guitarTuningsLibrary: { [key: string]: IGuitarTuning } = {
  standard: {
    name: "Standard Tuning",
    stringTunings: [
      { ...basicNotes.e, absIdx: basicNotes.e.idx },
      { ...basicNotes.a, absIdx: basicNotes.a.idx + 12 },
      { ...basicNotes.d, absIdx: basicNotes.d.idx + 12 },
      { ...basicNotes.g, absIdx: basicNotes.g.idx + 12 },
      { ...basicNotes.b, absIdx: basicNotes.b.idx + 24 },
      { ...basicNotes.e, absIdx: basicNotes.e.idx + 24 },
    ],
  },
};
