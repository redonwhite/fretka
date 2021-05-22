import { ReactElement } from "react";
import { withHistogram } from "./histograms";
import {
  aug5,
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
import { ScaleLike } from "./scales";

interface MaybeNamed {
  name: string;
}

interface Chord extends ScaleLike, MaybeNamed {
  abbr?: string | ReactElement;
}

const majChord: Chord = {
  abbr: "",
  shortName: "maj",
  name: "major chord",
  intervals: [root, maj3, perf5],
};

const maj7Chord: Chord = {
  abbr: <sup>Δ7</sup>,
  shortName: "maj7",
  name: "major 7th chord",
  intervals: [root, maj3, perf5, maj7],
};

const dom7Chord: Chord = {
  abbr: <sup>7</sup>,
  shortName: "dom7",
  name: "dominant 7th chord",
  intervals: [root, maj3, perf5, min7],
};

const minChord: Chord = {
  abbr: "m",
  shortName: "min",
  name: "minor chord",
  intervals: [root, min3, perf5],
};

const min7Chord: Chord = {
  abbr: (
    <>
      m<sup>7</sup>
    </>
  ),
  shortName: "min7",
  name: "minor 7th chord",
  intervals: [root, min3, perf5, min7],
};

const sus2Chord: Chord = {
  shortName: <sup>sus2</sup>,
  name: "suspended 2nd chord",
  intervals: [root, maj2, perf5],
};

const sus4Chord: Chord = {
  shortName: <sup>sus4</sup>,
  name: "suspended 4th chord",
  intervals: [root, perf4, perf5],
};

const dimTriad: Chord = {
  shortName: <sup>o</sup>,
  name: "diminished (triad) chord",
  intervals: [root, min3, dim5],
};

const augChord = {
  shortName: "+",
  name: "augmented chord",
  intervals: [root, maj3, aug5],
};

const halfDim7Chord: Chord = {
  shortName: <sup>ø7</sup>,
  name: "half-diminished 7th chord",
  intervals: [root, min3, dim5, min7],
};

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
  aug: withHistogram(augChord),
};

export const chordsArray = Object.values(chords);
