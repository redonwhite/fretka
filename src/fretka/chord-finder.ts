import { computed, makeObservable, observable } from "mobx";
import { LayerStore } from "../store/app-state";
import {
  EnharmonicHistogram,
  getEnharmonicHistogramForSelection,
  histogramInRange,
} from "./histograms";
import { LayerColorId } from "./layers/fretka-layer";
import { NoteSelection } from "./layers/note-selection-layer";
import { allScaleLikes } from "./library";
import { basicNoteIds, NoteClassId } from "./notes";
import { findRootedSuggestions } from "./scales";

export type NoteSuggestionOption = "yes" | "no" | "maybe";
export type NoteSuggestionParameters = {
  [noteId in NoteClassId]: NoteSuggestionOption;
};
export type NoteSuggestionSubParameters = {
  [noteId in NoteClassId]?: NoteSuggestionOption;
};

export const noteSuggestionOptionsArray: NoteSuggestionOption[] = ['yes', 'no', 'maybe'];

export class ChordFinder {
  suggestionOptionByColor: { [color in LayerColorId | 'unselected']: NoteSuggestionOption };
  layerStore: LayerStore;

  get selectionLayers() {
    return this.layerStore.noteSelectionLayers;
  }

  get suggestionParameters() {
    const result: NoteSuggestionParameters = Object.fromEntries(
      basicNoteIds.map(nId => [nId, this.suggestionOptionByColor.unselected])
    ) as NoteSuggestionParameters;
    this.selectionLayers.forEach(layer => {
      const newOpt = this.suggestionOptionByColor[layer.color];
      basicNoteIds.forEach(noteId => {
        if (layer.selection[noteId]) {
          const oldOpt = result[noteId];
          result[noteId] = combineSuggestionOptions(oldOpt, newOpt);
        }
      });
    });
    console.log("suggestion parameters: ", result);
    return result;
  }

  get suggestionParamsByOption() {
    const paramEntries = Object.entries(this.suggestionParameters);
    return {
      notNo: paramEntries
        .filter(([_k, v]) => v !== "no")
        .map(([k, _v]) => k as NoteClassId),
      yes: paramEntries
        .filter(([_k, v]) => v === "yes")
        .map(([k, _v]) => k as NoteClassId),
      no: paramEntries
        .filter(([_k, v]) => v === "no")
        .map(([k, _v]) => k as NoteClassId),
    };
  }

  get minimumSelection(): NoteSelection {
    return Object.fromEntries(
      Object.entries(this.suggestionParameters).filter(([_k, v]) => v === "yes")
    );
  }

  get maximumSelection() {
    return Object.fromEntries(
      Object.entries(this.suggestionParameters).filter(([_k, v]) => v !== "no")
    );
  }

  get minimumHistogram(): EnharmonicHistogram {
    return getEnharmonicHistogramForSelection(this.minimumSelection);
  }

  get maximumHistogram(): EnharmonicHistogram {
    return getEnharmonicHistogramForSelection(this.maximumSelection);
  }

  get suggestions() {
    
    const candidateScales = allScaleLikes.filter(scale =>
      histogramInRange(
        scale.histogram,
        this.minimumHistogram,
        this.maximumHistogram
      )
    );

    const matches = candidateScales.flatMap(scale =>
      findRootedSuggestions(
        scale,
        this.suggestionParamsByOption.notNo,
        this.suggestionParamsByOption.yes,
        this.suggestionParamsByOption.no
      )
    );

    return matches;
  }

  constructor(layerStore: LayerStore) {
    this.suggestionOptionByColor = {
      black: "yes",
      blue: "yes",
      red: "yes",
      gray: "no",
      green: "yes",
      unselected: "maybe"
    };

    this.layerStore = layerStore;

    makeObservable(
      this,
      {
        layerStore: observable,
        suggestionOptionByColor: observable,
        maximumHistogram: computed,
        maximumSelection: computed,
        minimumHistogram: computed,
        minimumSelection: computed,
        selectionLayers: computed,
        suggestionParameters: computed,
        suggestionParamsByOption: computed,
        suggestions: computed,
      },
      { deep: true }
    );
  }
}

function combineSuggestionOptions(
  oldOpt: NoteSuggestionOption,
  newOpt: NoteSuggestionOption
): NoteSuggestionOption {
  if (newOpt !== "maybe") return newOpt;
  return oldOpt;
}
