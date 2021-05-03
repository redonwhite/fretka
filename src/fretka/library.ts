import { chords } from "./chords";
import { modesOfMajor, scales } from "./scales";

export const allScaleLikes = [
  ...Object.values(chords),
  ...Object.values(scales),
  ...Object.values(modesOfMajor),
];
