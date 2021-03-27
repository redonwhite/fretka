import { createSlice } from '@reduxjs/toolkit';
import { createEmptyNoteSelectionLayer, NoteSelectionLayer, NoteSelectionLayerWithIndex } from './note-selection-layers';
import { getIndexedLayers } from './note-selection-layers';
import { basicNotesArray, NoteClass, NoteClassId } from './notes';

export type NoteSelectionState = {
  layers: Array<NoteSelectionLayer>;
};

type AllNoteProperties = {
  [key in NoteClassId]: NoteProperties;
};

export const getPropertiesForAllNotes: (
  sel: NoteSelectionState,
) => AllNoteProperties = (sel: NoteSelectionState) => {
  const entries = basicNotesArray.map((note) => [
    note.id,
    getPropertiesForNote(sel, note),
  ]);
  const properties = Object.fromEntries(entries);
  return properties;
};

type NoteProperties = ReturnType<typeof getPropertiesForNote>;

export const getPropertiesForNote = (
  sel: NoteSelectionState,
  note: NoteClass,
) => {
  const layers = getIndexedLayers(sel);
  const properties = {
    ...note,
    isNoteSelected: isNoteSelected(sel, note),
    isNoteRoot: isNoteRoot(sel, note),
    selectedInLayers: getSelectedInLayersProperties(sel, layers, note),
    rootInLayers: layers.filter((layer) => layer.selection.root === note.id),
    colors: layers
      .filter(
        (layer) =>
          layer.selection.selected[note.id] || layer.selection.root === note.id,
      )
      .map((layer) => ({ layer: layer, color: layer.color })),
  };
  return properties;
};


const initialNoteSelection: NoteSelectionState = {
  layers: [
    createEmptyNoteSelectionLayer(0),
  ],
};

export const isNoteSelected = (
  selection: NoteSelectionState,
  note: NoteClass,
) => {
  return selection.layers.some((layer) => layer.selection.selected[note.id]);
};

export const isNoteSelectedInLayer = (
  selection: NoteSelectionState,
  note: NoteClass,
  layerIdx: number,
) => selection.layers[layerIdx].selection.selected[note.id];

export const isNoteRootInLayer = (
  selection: NoteSelectionState,
  note: NoteClass,
  layerIdx: number,
) => selection.layers[layerIdx].selection.root === note.id;

export const isNoteRoot = (selection: NoteSelectionState, note: NoteClass) => {
  return selection.layers.some((layer) => layer.selection.root === note.id);
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
      delete state.layers[action.payload.layerIdx].selection.root;
      const sel = state.layers[action.payload.layerIdx].selection.selected;
      Object.keys(sel).forEach(k => (((sel[k as NoteClassId] = false))));
    },
    toggleNoteSelection: (state, action: LayerNoteAction) => {
      const noteId = action.payload.noteId;
      const layerIdx = action.payload.layerIdx;
      const wasSelected = state.layers[layerIdx].selection.selected[noteId];
      state.layers[layerIdx].selection.selected[noteId] = !wasSelected;
    },
    toggleRootSelection: (
      state,
      { payload: { layerIdx, noteId } }: LayerNoteAction,
    ) => {
      if (state.layers[layerIdx].selection.root !== noteId) {
        state.layers[layerIdx].selection.root = noteId;
      } else {
        delete state.layers[layerIdx].selection.root;
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


function getSelectedInLayersProperties(
  sel: NoteSelectionState,
  layers: NoteSelectionLayerWithIndex[],
  note: NoteClass,
) {
  let nthSel = 0;
  let selProps: {
    layer: NoteSelectionLayerWithIndex;
    selected: boolean;
    nthSel: number;
    nSelMax: number;
  }[] = [];
  layers.map((layer) => {
    if (isNoteSelectedInLayer(sel, note, layer.idx)) {
      selProps.push({ layer, selected: true, nthSel: nthSel++, nSelMax: 0 });
    } else {
      selProps.push({ layer, selected: false, nthSel: nthSel, nSelMax: 0 });
    }
  });
  const nSelMax = Math.max(0, nthSel - 1);
  selProps.forEach((el) => (el.nSelMax = nSelMax));
  return selProps;
}


function canDeleteLayer(state: NoteSelectionState, layerIdx: number) {
  return state.layers[layerIdx]?.deletable;
}

