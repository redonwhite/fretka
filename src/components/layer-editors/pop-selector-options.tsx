import { noteSuggestionOptionsArray } from "../../fretka/chord-finder";
import {
  basicIntervalsArray,
  intervalDirectionArray,
} from "../../fretka/intervals";
import { basicNotesArray, getPrettyNoteName } from "../../fretka/notes";
import {
  fretShapeTypeArray,
  absoluteStringSpecArray,
  relativeStringSpecArray,
} from "../../fretka/shapes";

export const shapeTypeOptions = fretShapeTypeArray.map(t => ({
  value: t.id,
  label: t.name,
}));

export const basicNoteOptions = basicNotesArray.map(n => ({
  value: n.id,
  label: getPrettyNoteName(n).toUpperCase(),
}));

export const basicIntervalOptions = basicIntervalsArray.map(i => ({
  value: i.id,
  label: i.abbr,
}));

export const absoluteStringSpecOptions = absoluteStringSpecArray.map(s => ({
  value: s.id,
  label: s.name,
}));

export const relativeStringSpecOptions = relativeStringSpecArray.map(s => ({
  value: s.id,
  label: s.name,
  buttonLabel: s.symbol,
  choiceLabel: (
    <>
      {s.symbol} {s.name}
    </>
  ),
}));

export const intervalDirectionOptions = intervalDirectionArray.map(d => ({
  value: d.id,
  label: d.name,
}));

export const noteSuggestionOptions = noteSuggestionOptionsArray.map(o => ({
  value: o,
  label: o,
}));
