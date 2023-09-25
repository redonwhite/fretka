import { makeObservable, observable } from "mobx";
import { NoteAbsolute, a2, b3, d3, e2, e4, g3 } from "./notes";

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
    stringTunings: [ e2, a2, d3, g3, b3, e4 ]
  },
};
