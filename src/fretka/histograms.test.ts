import { getEnharmonicHistogramForScale, EnharmonicHistogram, getEnharmonicHistogramForSelection } from "./histograms";
import {
  maj2,
  maj3,
  maj6,
  maj7,
  min2,
  min3,
  min6,
  min7,
  perf4,
  perf5,
  root,
  tt,
} from "./intervals";
import { createEmptySelection, NoteSelection } from "./layers/note-selection-layer";
import { basicNoteIds } from "./notes";
import {
  major,
  modesOfMajor,
  ScaleLike,
} from "./scales";

export {};

test("Generating simplest enharmonic histogram", () => {
  const singleNote: ScaleLike = { intervals: [root] };
  const histogram = getEnharmonicHistogramForScale(singleNote);
  const expectedHistogram: EnharmonicHistogram = [1, 0, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating empty enharmonic histogram", () => {
  const singleNote: ScaleLike = { intervals: [] };
  const histogram = getEnharmonicHistogramForScale(singleNote);
  const expectedHistogram: EnharmonicHistogram = [0, 0, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating two-note enharmonic histogram", () => {
  const twoNotes: ScaleLike = { intervals: [root, maj3] };
  const histogram = getEnharmonicHistogramForScale(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [2, 0, 0, 0, 1, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating two-note enharmonic histogram with inverted interval", () => {
  const twoNotes: ScaleLike = { intervals: [root, maj7] };
  const histogram = getEnharmonicHistogramForScale(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [2, 1, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating three-note enharmonic histogram", () => {
  const twoNotes: ScaleLike = { intervals: [root, min2, maj3] };
  const histogram = getEnharmonicHistogramForScale(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [3, 1, 0, 1, 1, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating three-note enharmonic histogram with inverted interval", () => {
  const twoNotes: ScaleLike = { intervals: [root, min2, maj7] };
  const histogram = getEnharmonicHistogramForScale(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [3, 2, 1, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating chromatic scale enharmonic histogram", () => {
  const chromaticScale: ScaleLike = {
    intervals: [
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
    ],
  };
  const histogram = getEnharmonicHistogramForScale(chromaticScale);
  const expectedHistogram: EnharmonicHistogram = [12, 12, 12, 12, 12, 12, 6];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating major enharmonic histogram", () => {
  const histogram = getEnharmonicHistogramForScale(major);
  const expectedHistogram: EnharmonicHistogram = [7, 2, 5, 4, 3, 6, 1];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating minor enharmonic histogram", () => {
  const histogram = getEnharmonicHistogramForScale(major);
  const expectedHistogram: EnharmonicHistogram = [7, 2, 5, 4, 3, 6, 1];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Histogram equality for modes", () => {
  const histogramMode1 = getEnharmonicHistogramForScale(modesOfMajor.ionian);
  const histogramMode2 = getEnharmonicHistogramForScale(modesOfMajor.dorian);
  const histogramMode3 = getEnharmonicHistogramForScale(modesOfMajor.phrygian);
  const histogramMode4 = getEnharmonicHistogramForScale(modesOfMajor.lydian);
  const histogramMode5 = getEnharmonicHistogramForScale(modesOfMajor.mixolydian);
  const histogramMode6 = getEnharmonicHistogramForScale(modesOfMajor.aeolian);
  const histogramMode7 = getEnharmonicHistogramForScale(modesOfMajor.locrian);

  const expectedHistogram: EnharmonicHistogram = [7, 2, 5, 4, 3, 6, 1];

  expect(histogramMode1).toBeDefined();
  expect(histogramMode1).toStrictEqual(expectedHistogram);
  expect(histogramMode1).toStrictEqual(histogramMode2);
  expect(histogramMode1).toStrictEqual(histogramMode3);
  expect(histogramMode1).toStrictEqual(histogramMode4);
  expect(histogramMode1).toStrictEqual(histogramMode5);
  expect(histogramMode1).toStrictEqual(histogramMode6);
  expect(histogramMode1).toStrictEqual(histogramMode7);
});


test("Convert empty selection to empty histogram", () => {
  const sel: NoteSelection = createEmptySelection(basicNoteIds);
  const hist = getEnharmonicHistogramForSelection(sel);
  expect(hist).toStrictEqual([0, 0, 0, 0, 0, 0, 0]);
});

test("Convert one note selection to histogram", () => {
  const sel: NoteSelection = createEmptySelection(basicNoteIds);
  sel.b = true;
  const hist = getEnharmonicHistogramForSelection(sel);
  expect(hist).toStrictEqual([1, 0, 0, 0, 0, 0, 0]);
});

test("Convert two note selection to histogram", () => {
  const sel: NoteSelection = createEmptySelection(basicNoteIds);
  sel.b = true;
  sel.csharp = true;
  const hist = getEnharmonicHistogramForSelection(sel);
  expect(hist).toStrictEqual([2, 0, 1, 0, 0, 0, 0]);
});

test("Convert inverted two note selection to histogram", () => {
  const sel: NoteSelection = createEmptySelection(basicNoteIds);
  sel.b = true;
  sel.g = true;
  const hist = getEnharmonicHistogramForSelection(sel);
  expect(hist).toStrictEqual([2, 0, 0, 0, 1, 0, 0]);
});

test("Convert full selection to histogram", () => {
  const sel: NoteSelection = Object.fromEntries(basicNoteIds.map(id => [id, true]));
  const hist = getEnharmonicHistogramForSelection(sel);
  expect(hist).toStrictEqual([12, 12, 12, 12, 12, 12, 6]);
});


