import { computed, makeObservable, observable } from "mobx";
import { LayerStore } from "../store/layer-store";
import {
  EnharmonicHistogram,
  getEnharmonicHistogramForSelection,
  histogramInRange,
} from "./histograms";
import { LayerColorId } from "./layers/fretka-layer";
import {
  NoteSelection,
  NoteSelectionLayer,
} from "./layers/note-selection-layer";
import { allScaleLikes } from "./library";
import { basicNoteIds, NoteClassId } from "./notes";
import { findRootedSuggestions, RootedScaleLike } from "./scales";

export type NoteSuggestionOption = "yes" | "no" | "maybe";
export type NoteSuggestionParameters = {
  [noteId in NoteClassId]: NoteSuggestionOption;
};
export type NoteSuggestionSubParameters = {
  [noteId in NoteClassId]?: NoteSuggestionOption;
};

export type SuggesitonRootParameters = Record<
  NoteClassId,
  {
    layers: NoteSelectionLayer[];
  }
>;

export const noteSuggestionOptionsArray: NoteSuggestionOption[] = ['yes', 'no', 'maybe'];
export type NoteTypeForSuggestions = LayerColorId | "unselected";

export class ChordFinder {
  suggestionOptionByColor: {
    [color_ in NoteTypeForSuggestions]: NoteSuggestionOption;
  };
  layerStore: LayerStore;

  get selectionLayers() {
    return this.layerStore.noteSelectionLayers;
  }

  get suggestionParameters() {

    const result = Object.fromEntries(
      basicNoteIds.map(nId => [nId, 'unknown'])
    );

    this.selectionLayers.forEach(layer => {
      const newOpt = this.suggestionOptionByColor[layer.color];
      basicNoteIds.forEach(noteId => {
        if (layer.selection[noteId]) {
          const oldOpt = result[noteId];
          result[noteId] = combineSuggestionOptions(oldOpt as NoteSuggestionOption | 'unknown', newOpt);
        }
      });
    });

    
    basicNoteIds.forEach(noteId => {
      if (result[noteId] === 'unknown') result[noteId] = this.suggestionOptionByColor.unselected;
    });

    console.log("suggestion parameters: ", result);
    
    return result as NoteSuggestionParameters;
  }

  get rootParameters(): SuggesitonRootParameters {
    let rootParams = {} as SuggesitonRootParameters;

    this.selectionLayers
      .filter(layer => layer.root !== null)
      .forEach(layer => {
        const root = layer.root as NoteClassId;
        rootParams[root] = rootParams[root] ?? { layers: [] };
        rootParams[root].layers.push(layer);
      });

    return rootParams;
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
        this.suggestionParameters,
        this.rootParameters,
        this.suggestionParamsByOption.notNo,
        this.suggestionParamsByOption.yes,
      )
    );

    return matches;
  }

  get suggestionsByRoot() {
    const suggDict = Object.fromEntries(
      basicNoteIds.map(rootNoteId => [
        rootNoteId,
        this.suggestions.filter(sugg => sugg.root.id === rootNoteId),
      ])
    );
    return suggDict;
  }

  constructor(layerStore: LayerStore) {
    this.suggestionOptionByColor = {
      black: "yes",
      blue: "yes",
      red: "yes",
      gray: "no",
      green: "yes",
      unselected: "maybe",
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
        suggestionsByRoot: computed,
        rootParameters: computed,
      },
      { deep: true }
    );
  }
}

function combineSuggestionOptions(
  oldOpt: NoteSuggestionOption | 'unknown',
  newOpt: NoteSuggestionOption | 'unknown'
): NoteSuggestionOption | 'unknown' {
  if (oldOpt === 'unknown') return newOpt;
  if (newOpt === 'unknown') return oldOpt;

  if (newOpt !== "maybe") return newOpt;
  return oldOpt;

}
