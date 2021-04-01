import { createSlice } from '@reduxjs/toolkit';
import { FretkaLayerType, createEmptyNoteSelectionLayer } from './layers';
import {
  canDeleteLayer,
  FretkaLayersState,
  LayerAction,
  LayerNoteAction,
} from './note-selection';
import type { NoteClassId } from './notes';

const initialLayerState: FretkaLayersState = {
  layers: [createEmptyNoteSelectionLayer(0)],
};

export const layerSlice = createSlice({
  name: 'layers',
  initialState: initialLayerState,
  reducers: {
    addLayerAtEnd: (
      state,
      action: { payload: { layerType: FretkaLayerType } },
    ) => {
      const layerType: FretkaLayerType = action.payload.layerType;
      console.log(action);
      switch (layerType) {
        case 'noteSelection':
          console.log('creating new selection layer');
          state.layers.push(createEmptyNoteSelectionLayer(state.layers.length));
          return;
        case 'shape':
          console.log('creating new shape layer');
          state.layers.push(createEmptyNoteSelectionLayer(state.layers.length));
          return;
      }
      throw new Error('Unknown layer type!');
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
      Object.keys(sel).forEach((k) => (sel[k as NoteClassId] = false));
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

export const actions = layerSlice.actions;