import { createSlice } from '@reduxjs/toolkit';
import {
  createEmptyNoteSelectionLayer,
  FretkaLayer,
  FretkaLayerWithIndex,
  NoteSelectionLayer,
  NoteSelectionLayerWithIndex,
} from './note-selection-layers';
import { getIndexedLayers } from './note-selection-layers';
import { basicNotesArray, NoteClass, NoteClassId } from './notes';

export type FretkaLayersState = {
  layers: Array<FretkaLayer>;
};

type AllNoteProperties = {
  [key in NoteClassId]: NoteProperties;
};

export const getPropertiesForAllNotes: (
  sel: FretkaLayersState,
) => AllNoteProperties = (sel: FretkaLayersState) => {
  const entries = basicNotesArray.map((note) => [
    note.id,
    getPropertiesForNote(sel, note),
  ]);
  const properties = Object.fromEntries(entries);
  return properties;
};

type NoteProperties = ReturnType<typeof getPropertiesForNote>;

export const getPropertiesForNote = (sel: FretkaLayersState, note: NoteClass) => {
  const layers = getIndexedLayers(sel);
  const properties = {
    ...note,
    isNoteSelected: isNoteSelected(sel, note),
    isNoteRoot: isNoteRoot(sel, note),
    selPropsByLayer: getSelPropsByLayer(sel, layers, note),
    rootInLayers: layers.filter((layer) => layer.layerType === 'noteSelection' && layer.selection.root === note.id),
    colors: layers
      .filter(
        (layer) =>
          layer.layerType === 'noteSelection' && (
            layer.selection.selected[note.id] || layer.selection.root === note.id
          )
      )
      .map((layer) => ({ layer: layer, color: layer.color })),
  };
  return properties;
};


const initialNoteSelection: FretkaLayersState = {
  layers: [createEmptyNoteSelectionLayer(0)],
};

export const isNoteSelected = (selection: FretkaLayersState, note: NoteClass) => {
  return selection.layers.some((layer) => layer.layerType === 'noteSelection' && layer.selection.selected[note.id]);
};

export const isNoteSelectedInLayerByIdx = (
  state: FretkaLayersState,
  note: NoteClass,
  layerIdx: number,
) => {
  const layer = state.layers[layerIdx];
  return isNoteSelectedInLayer(note, layer);
}

export const isNoteSelectedInLayer = (
  note: NoteClass,
  layer: FretkaLayer,
) => {
  if (layer.layerType !== 'noteSelection') return false;
  return layer.selection.selected[note.id];
};

export const isNoteRootInLayerByIdx = (
  selection: FretkaLayersState,
  note: NoteClass,
  layerIdx: number,
) => {
  const layer = selection.layers[layerIdx];
  return isNoteRootInLayer(note, layer);
}

export const isNoteRootInLayer = (
  note: NoteClass,
  layer: FretkaLayer,
) => {
  return layer.layerType === 'noteSelection' && layer.selection.root === note.id;
};

export const isNoteRoot = (state: FretkaLayersState, note: NoteClass) => {
  return state.layers.some((_layer, layerIdx) => isNoteRootInLayerByIdx(state, note, layerIdx));
};

export type LayerAction = {
  payload: {
    layerIdx: number;
  };
};

export type NoteAction = {
  payload: {
    noteId: NoteClassId;
  };
};

export type LayerNoteAction = LayerAction & NoteAction;

export const noteSelectionSlice = createSlice({
  name: 'noteSelection',
  initialState: initialNoteSelection,
  reducers: {
    addLayerAtEnd: (state) => {
      state.layers.push(createEmptyNoteSelectionLayer(state.layers.length));
    },
    deleteLayer: (state, action: LayerAction) => {
      const layerIdx = action.payload.layerIdx;
      if (canDeleteLayer(state, layerIdx)) state.layers.splice(layerIdx, 1);
    },
    resetSelectionInLayer: (state, action: LayerAction) => {
      const layer = state.layers[action.payload.layerIdx];
      if (layer.layerType !== 'noteSelection') return;
      delete layer.selection.root;
      const sel = layer.selection.selected;
      Object.keys(sel).forEach(k => (((sel[k as NoteClassId] = false))));
    },
    toggleNoteSelection: (state, action: LayerNoteAction) => {
      const layer = state.layers[action.payload.layerIdx];
      if (layer.layerType !== 'noteSelection') return;
      const noteId = action.payload.noteId;
      const layerIdx = action.payload.layerIdx;
      const wasSelected = layer.selection.selected[noteId];
      layer.selection.selected[noteId] = !wasSelected;
    },
    toggleRootSelection: (
      state,
      { payload: { layerIdx, noteId } }: LayerNoteAction,
    ) => {
      const layer = state.layers[layerIdx];
      if (layer.layerType !== 'noteSelection') return;
      if (layer.selection.root !== noteId) {
        layer.selection.root = noteId;
      } else {
        delete layer.selection.root;
      }
    },
  },
});

export const actions = noteSelectionSlice.actions;

export type NoteSelection = {
  root?: NoteClassId;
  selected: {
    [key in NoteClassId]: boolean;
  };
};


function getSelPropsByLayer(
  sel: FretkaLayersState,
  layers: FretkaLayerWithIndex[],
  note: NoteClass,
) {
  let nthSel = 0;
  let selPropses: {
    layer: NoteSelectionLayerWithIndex;
    selected: boolean;
    root: boolean;
    nthSel: number;
    nSelMax: number;
  }[] = [];
  layers.map((layer) => {
    if (layer.layerType == 'noteSelection') {
      const root = isNoteRootInLayer(note, layer);
      const selected = isNoteSelectedInLayer(note, layer);

      selPropses.push({
        layer,
        selected,
        root,
        nthSel: selected ? nthSel++ : nthSel,
        nSelMax: 0,
      });
    }
  });
  const nSelMax = Math.max(0, nthSel - 1);
  selPropses.forEach((el) => (el.nSelMax = nSelMax));
  return selPropses;
}


function canDeleteLayer(state: FretkaLayersState, layerIdx: number) {
  return state.layers[layerIdx]?.deletable;
}

