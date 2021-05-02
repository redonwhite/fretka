import { EnharmonicHistogram, withHistogram } from "./histograms";
import {
  dim5,
  maj2,
  maj3,
  maj7,
  min3,
  min7,
  perf4,
  perf5,
  root,
} from "./intervals";
import { Rooted, ScaleLike } from "./scales";

interface MaybeNamed {
  name: string;
}

interface ChordBasic extends ScaleLike, MaybeNamed {
  abbr?: string;
}

interface RootedChord extends ChordBasic, Rooted {}

const majChord: ChordBasic = {
  name: "major",
  intervals: [root, maj3, perf5],
};

const maj7Chord: ChordBasic = {
  name: "major 7th",
  intervals: [root, maj3, perf5, maj7],
};

const dom7Chord: ChordBasic = {
  name: "dominant 7th",
  intervals: [root, maj3, perf5, min7],
};

const minChord: ChordBasic = {
  name: "minor",
  intervals: [root, min3, perf5],
};

const min7Chord: ChordBasic = {
  name: "minor 7th",
  intervals: [root, min3, perf5, min7],
};

const sus2Chord: ChordBasic = {
  name: "suspended 2nd",
  intervals: [root, maj2, perf5],
};

const sus4Chord: ChordBasic = {
  name: "suspended 4th",
  intervals: [root, perf4, perf5],
};

const dimTriad: ChordBasic = {
  name: "diminished (triad)",
  intervals: [root, min3, dim5],
};

const halfDim7Chord: ChordBasic = {
  name: "half-diminished 7th",
  intervals: [root, min3, dim5, min7],
};

export interface WithHistogram {
  histogram: EnharmonicHistogram
}
export interface Chord extends
  ChordBasic, WithHistogram {}

export const chords = {
  maj: withHistogram(majChord),
  maj7: withHistogram(maj7Chord),
  dom7: withHistogram(dom7Chord),
  min: withHistogram(minChord),
  min7: withHistogram(min7Chord),
  dimTriad: withHistogram(dimTriad),
  halfDim7: withHistogram(halfDim7Chord),
  sus2: withHistogram(sus2Chord),
  sus4: withHistogram(sus4Chord),
};

export const chordsArray = Object.values(chords);