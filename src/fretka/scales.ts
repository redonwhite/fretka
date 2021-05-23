import { isMatch } from "lodash";
import { match } from "node:assert";
import { ReactElement } from "react";
import { NoteSuggestionOption, NoteSuggestionParameters, SuggesitonRootParameters } from "./chord-finder";
import { withHistogram } from "./histograms";
import {
  aug4,
  dim5,
  Interval,
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
} from "./intervals";
import {
  NoteClass,
  basicNotesArray,
  NoteClassId,
  NoteClassInScale,
  NoteInScaleExtraParams,
  basicNoteIds,
  basicNotes,
} from "./notes";

export const major: ScaleLike = {
  name: "major scale",
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

export const minorPentatonic: ScaleLike = {
  name: "minor pentatonic scale",
  intervals: [root, min3, perf4, perf5, min7],
};

export const blues: ScaleLike = {
  name: "blues scale",
  intervals: [root, min3, perf4, aug4, perf5, min7],
};

export type ScaleMovable = {
  name: string;
  abbr?: string | ReactElement;
  shortName?: string | ReactElement;
  intervals: Array<Interval>;
};

export type ScaleRooted = {
  movableVersion?: ScaleMovable;
  root: NoteClass;
  notes: { [key_ in NoteClassId]?: NoteClassInScale };
};

export type ScaleStepIndex = number;

export const step1: ScaleStepIndex = 0;
export const step2: ScaleStepIndex = 1;
export const step3: ScaleStepIndex = 2;
export const step4: ScaleStepIndex = 3;
export const step5: ScaleStepIndex = 4;
export const step6: ScaleStepIndex = 5;
export const step7: ScaleStepIndex = 6;
export const step8: ScaleStepIndex = 7;
export const step9: ScaleStepIndex = 8;
export const step10: ScaleStepIndex = 9;
export const step11: ScaleStepIndex = 10;
export const step12: ScaleStepIndex = 11;

type Mode = {
  modeOf: ScaleMovable;
  startOn: ScaleStepIndex;
} & ScaleMovable;

const ionian: Mode = {
  name: "Ionian",
  modeOf: major,
  startOn: step1,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};

const dorian: Mode = {
  name: "Dorian mode",
  modeOf: major,
  startOn: step2,
  intervals: [root, maj2, min3, perf4, perf5, maj6, min7],
};

const phrygian: Mode = {
  name: "Phrygian mode",
  modeOf: major,
  startOn: step3,
  intervals: [root, min2, min3, perf4, perf5, min6, min7],
};

const lydian: Mode = {
  name: "Lydian mode",
  modeOf: major,
  startOn: step4,
  intervals: [root, maj2, maj3, aug4, perf5, maj6, maj7],
};

const mixolydian: Mode = {
  name: "Myxolydian mode",
  modeOf: major,
  startOn: step5,
  intervals: [root, maj2, maj3, perf4, perf5, maj6, min7],
};

const aeolian: Mode = {
  name: "Aeolian mode",
  modeOf: major,
  startOn: step6,
  intervals: [root, maj2, min3, perf4, perf5, min6, min7],
};

const locrian: Mode = {
  name: "Locrian mode",
  modeOf: major,
  startOn: step7,
  intervals: [root, min2, min3, perf4, dim5, min6, min7],
};

export function makeRootedScale(
  movableScale: ScaleMovable,
  root: NoteClass
): ScaleRooted {
  const baseIdx = root.idx;

  const notes = Object.fromEntries(
    movableScale.intervals
      .map(interval => (interval.span + baseIdx) % 12)
      .map(idx => [basicNotesArray[idx].id, basicNotesArray[idx]])
  );

  return {
    root: root,
    notes,
    movableVersion: movableScale,
  };
}

export const scales = {
  major: withHistogram(major),
  minorPentatonic: withHistogram(minorPentatonic),
};

export const modesOfMajor = {
  ionian: withHistogram(ionian),
  dorian: withHistogram(dorian),
  phrygian: withHistogram(phrygian),
  lydian: withHistogram(lydian),
  mixolydian: withHistogram(mixolydian),
  aeolian: withHistogram(aeolian),
  locrian: withHistogram(locrian),
};

export interface ScaleLike {
  intervals: Interval[];
  name: string;
  shortName?: string | ReactElement;
  abbr?: string | ReactElement;
  extraParams?: { [key: number]: NoteInScaleExtraParams };
}

export interface Rooted {
  root: NoteClass;
}

export interface RootedScaleLike extends ScaleLike, Rooted { }

function getNotesFromRootAndSpans(rootId: NoteClassId, spans: number[]) {
  const rootIdx = basicNotes[rootId].idx;
  return spans.map(span => basicNoteIds[(rootIdx + span + 12) % 12]);
}

export function findRootedSuggestions(
  floatingChord: ScaleLike,
  noteSuggestionParams: NoteSuggestionParameters,
  rootParams: SuggesitonRootParameters,
  notNoNotes: NoteClassId[],
  yesNotes: NoteClassId[],
) {

  const matches: ReturnType<typeof generateMatch>[] = [];

  const chordNoteCount = floatingChord.intervals.length;

  notNoNotes.forEach(startingNoteId => {
    
    const chordNoteIds =
      getNotesFromRootAndSpans(startingNoteId, floatingChord.intervals.map(i => i.span));
    
    let rootToRootHits = 0;
    let rootHits = 0;
    let notNoHits = 0;
    let yesHits = 0;
    let maybeHits = 0;
    let noHits = 0;
    
    chordNoteIds.forEach((chordNoteId, chordNoteIdx) => {
      if (rootParams[chordNoteId]) {
        rootHits += rootParams[chordNoteId].layers.length;
        if (floatingChord.intervals[chordNoteIdx].span % 12 === 0) {
          rootToRootHits += rootParams[chordNoteId].layers.length;
        }
      }
      switch (noteSuggestionParams[chordNoteId]) {
        case 'yes':
          yesHits++;
          notNoHits++;
          break;
        case 'maybe':
          maybeHits++;
          notNoHits++;
          break;
        case 'no':
          noHits++;
          break;
      } 
    });
    
    const isMatch = noHits === 0 && yesHits === yesNotes.length;
    
    if (isMatch) {      
      const matchSpecificity = yesHits / chordNoteCount;
      
      matches.push(generateMatch(
        startingNoteId, floatingChord, rootToRootHits, rootHits, notNoHits, yesHits, maybeHits, noHits, matchSpecificity
      ));
    }
  });

  return matches.sort((m1, m2) => {
    
    let order = m1.matchSpecificity - m2.matchSpecificity;
    if (order !== 0) return order;

    order = m2.intervals.length - m1.intervals.length;
    return order;

  });

}



function generateMatch(
  rootId: NoteClassId,
  floatingChord: ScaleLike,
  rootToRootHits: number,
  rootHits: number,
  notNoHits: number,
  yesHits: number,
  maybeHits: number,
  noHits: number,
  matchSpecificity: number,
) {
  const root = basicNotes[rootId];
  return {
    root,
    ...floatingChord,
    rootToRootHits,
    rootHits,
    notNoHits,
    yesHits,
    maybeHits,
    noHits,
    matchSpecificity,
  };
}


type ScaleToSelectionMatcher = (
  _scaleNotes: NoteClassId[],
  _selNotes: NoteClassId[]
) => boolean;

export const isSelectionSubsetOfScale: ScaleToSelectionMatcher = (
  scaleNoteIds,
  selNoteIds
) => selNoteIds.every(noteId => scaleNoteIds.includes(noteId));

export const isScaleSubsetOfSelection: ScaleToSelectionMatcher = (
  scaleNoteIds,
  selNoteIds
) => scaleNoteIds.every(noteId => selNoteIds.includes(noteId));
