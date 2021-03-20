import {
  notes,
  scales,
  modesOfMajor,
  makeRootedScale,
} from "./domain/notes.js";

notes.basicNotesArray
  .map(note => makeRootedScale(modesOfMajor.ionian, note))
  .forEach(mode =>
    console.log(`${mode.root.id}: ${Object.keys(mode.notes).join(", ")}`)
  );

console.log("hajime");
