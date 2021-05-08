import { computed, makeObservable, observable } from "mobx";
import { basicNotesArray, NoteAbsolute, NoteAbsoluteNatural } from "./notes";

export class KeyboardDefinition {
  keyCount: number;
  startingNote: NoteAbsolute;

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

  constructor(keyCount: number, startingNote: NoteAbsolute) {
    this.keyCount = keyCount;
    this.startingNote = startingNote;

    makeObservable(this, {
      keyCount: observable,
      startingNote: observable,
      naturalKeyWidth: computed,
      naturalKeyCount: computed,
    });
  }
}
