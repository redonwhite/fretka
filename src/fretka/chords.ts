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

interface Chord extends ScaleLike, MaybeNamed {
  abbr?: string;
}

interface RootedChord extends Chord, Rooted {}

const majChord: Chord = {
  name: "major",
  intervals: [root, maj3, perf5],
};

const maj7Chord: Chord = {
  name: "major 7th",
  intervals: [root, maj3, perf5, maj7],
};

const dom7Chord: Chord = {
  name: "dominant 7th",
  intervals: [root, maj3, perf5, min7],
};

const minChord: Chord = {
  name: "minor",
  intervals: [root, min3, perf5],
};

const min7Chord: Chord = {
  name: "minor 7th",
  intervals: [root, min3, perf5, min7],
};

const sus2Chord: Chord = {
  name: "suspended 2nd",
  intervals: [root, maj2, perf5],
};

const sus4Chord: Chord = {
  name: "suspended 4th",
  intervals: [root, perf4, perf5],
};

const dimTriad: Chord = {
  name: "diminished (triad)",
  intervals: [root, min3, dim5],
};

const halfDim7Chord: Chord = {
  name: "half-diminished 7th",
  intervals: [root, min3, dim5, min7],
};

export const chords = {
  majChord,
  maj7Chord,
  dom7Chord,
  minChord,
  min7Chord,
  dimTriad,
  halfDim7Chord,
  sus2Chord,
  sus4Chord,
};
