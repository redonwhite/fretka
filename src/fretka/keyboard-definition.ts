import { computed, makeObservable, observable } from "mobx";
import {
  basicNotesArray,
  NoteAbsolute,
  NoteAbsoluteNatural,
  NoteClassId,
  SharpNoteClassId,
} from "./notes";

const sharpKeyWidthProportion = 0.6;
const cSpacing = (3 - 2 * sharpKeyWidthProportion) / 3;

const cSharpOffsetProportion = cSpacing;
const dSharpOffsetProportion = 2 - cSharpOffsetProportion - sharpKeyWidthProportion;

const fSpacing = (4 - 3 * sharpKeyWidthProportion) / 4;
const fSharpOffsetProportion = fSpacing;
const gSharpOffsetProportion = 3 - 2 * fSharpOffsetProportion - 2 * sharpKeyWidthProportion;
const aSharpOffsetProportion = 2 - fSharpOffsetProportion - sharpKeyWidthProportion;

const sharpKeyOffsetProportions: {
  [key_ in SharpNoteClassId]: number;
} = {
  csharp: cSharpOffsetProportion - 1,
  dsharp: dSharpOffsetProportion - 1,
  fsharp: fSharpOffsetProportion - 1,
  gsharp: gSharpOffsetProportion - 1,
  asharp: aSharpOffsetProportion - 1,
};

export class KeyboardDefinition {
  keyCount: number;
  startingNote: NoteAbsolute;
  sharpKeyWidthProportion: number;
  sharpKeyOffsetProportions: { [key_ in SharpNoteClassId]: number };

  get naturalKeyCount() {
    const remainderKeyCount = this.keyCount % 12;
    const fullOctaves = (this.keyCount - remainderKeyCount) / 12;
    let remainderNaturalCount = 0;

    for (let i = 0; i < remainderKeyCount; i++) {
      const noteIdx = (this.startingNote.idx + i) % 12;
      const note = basicNotesArray[noteIdx];
      if (note.isNatural) remainderNaturalCount++;
    }
    return remainderNaturalCount + fullOctaves * 7;
  }

  get naturalKeyWidth() {
    return 100 / this.naturalKeyCount;
  }

  get sharpKeyWidth() {
    return this.naturalKeyWidth * this.sharpKeyWidthProportion;
  }

  get sharpKeyOffsets() {
    return {
      asharp: this.sharpKeyOffsetProportions.asharp * this.naturalKeyWidth,
      csharp: this.sharpKeyOffsetProportions.csharp * this.naturalKeyWidth,
      dsharp: this.sharpKeyOffsetProportions.dsharp * this.naturalKeyWidth,
      fsharp: this.sharpKeyOffsetProportions.fsharp * this.naturalKeyWidth,
      gsharp: this.sharpKeyOffsetProportions.gsharp * this.naturalKeyWidth,
    };;
  }

  constructor(keyCount: number, startingNote: NoteAbsolute) {
    this.keyCount = keyCount;
    this.startingNote = startingNote;
    this.sharpKeyOffsetProportions = { ...sharpKeyOffsetProportions };
    this.sharpKeyWidthProportion = sharpKeyWidthProportion;

    makeObservable(this, {
      keyCount: observable,
      startingNote: observable,
      naturalKeyWidth: computed,
      sharpKeyWidth: computed,
      naturalKeyCount: computed,
      sharpKeyOffsetProportions: observable,
      sharpKeyWidthProportion: observable,
      sharpKeyOffsets: computed,
    });
  }
}
