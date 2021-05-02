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
import {
  EnharmonicHistogram,
  getEnharmonicHistogram,
  major,
  modesOfMajor,
  ScaleLike,
} from "./scales";

export {};

test("Generating simplest enharmonic histogram", () => {
  const singleNote: ScaleLike = { intervals: [root] };
  const histogram = getEnharmonicHistogram(singleNote);
  const expectedHistogram: EnharmonicHistogram = [1, 0, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating empty enharmonic histogram", () => {
  const singleNote: ScaleLike = { intervals: [] };
  const histogram = getEnharmonicHistogram(singleNote);
  const expectedHistogram: EnharmonicHistogram = [0, 0, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating two-note enharmonic histogram", () => {
  const twoNotes: ScaleLike = { intervals: [root, maj3] };
  const histogram = getEnharmonicHistogram(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [2, 0, 0, 0, 1, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating two-note enharmonic histogram with inverted interval", () => {
  const twoNotes: ScaleLike = { intervals: [root, maj7] };
  const histogram = getEnharmonicHistogram(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [2, 1, 0, 0, 0, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating three-note enharmonic histogram", () => {
  const twoNotes: ScaleLike = { intervals: [root, min2, maj3] };
  const histogram = getEnharmonicHistogram(twoNotes);
  const expectedHistogram: EnharmonicHistogram = [3, 1, 0, 1, 1, 0, 0];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating three-note enharmonic histogram with inverted interval", () => {
  const twoNotes: ScaleLike = { intervals: [root, min2, maj7] };
  const histogram = getEnharmonicHistogram(twoNotes);
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
  const histogram = getEnharmonicHistogram(chromaticScale);
  const expectedHistogram: EnharmonicHistogram = [12, 12, 12, 12, 12, 12, 6];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating major enharmonic histogram", () => {
  const histogram = getEnharmonicHistogram(major);
  const expectedHistogram: EnharmonicHistogram = [7, 2, 5, 4, 3, 6, 1];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Generating minor enharmonic histogram", () => {
  const histogram = getEnharmonicHistogram(major);
  const expectedHistogram: EnharmonicHistogram = [7, 2, 5, 4, 3, 6, 1];
  expect(histogram).toBeDefined();
  expect(histogram).toStrictEqual(expectedHistogram);
});

test("Histogram equality for modes", () => {
  const histogramMode1 = getEnharmonicHistogram(modesOfMajor.ionian);
  const histogramMode2 = getEnharmonicHistogram(modesOfMajor.dorian);
  const histogramMode3 = getEnharmonicHistogram(modesOfMajor.phrygian);
  const histogramMode4 = getEnharmonicHistogram(modesOfMajor.lydian);
  const histogramMode5 = getEnharmonicHistogram(modesOfMajor.mixolydian);
  const histogramMode6 = getEnharmonicHistogram(modesOfMajor.aeolian);
  const histogramMode7 = getEnharmonicHistogram(modesOfMajor.locrian);

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
