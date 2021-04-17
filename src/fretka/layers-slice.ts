import { createSlice } from '@reduxjs/toolkit';
import {
  FretkaLayerType,
  createEmptyNoteSelectionLayer,
  createEmptyShapeLayer,
  FretkaLayer,
  ShapeLayer,
  LayerColorId,
} from "./layers";
import {
  FretkaLayersState,
  LayerAction,
  LayerNoteAction,
} from './note-selection';
import type { NoteClassId } from './notes';
import { SvgPatternId } from "./shapes";

const initialLayerState: FretkaLayersState = {
  layers: [createEmptyNoteSelectionLayer(0)],
};

export const layerSlice = createSlice({
  name: "layers",
  initialState: initialLayerState,
  reducers: {
    addLayerAtEnd: (
      state,
      action: { payload: { layerType: FretkaLayerType } }
    ) => {
      const layerType: FretkaLayerType = action.payload.layerType;
      switch (layerType) {
        case "noteSelection":
          state.layers.push(createEmptyNoteSelectionLayer(state.layers.length));
          return;
        case "shape":
          state.layers.push(createEmptyShapeLayer(state.layers.length));
          return;
      }
      throw new Error("Unknown layer type!");
    },
    deleteLayer: (state, action: LayerAction) => {
      const layerId = action.payload.layerId;
      const layerIdx = state.layers.findIndex(l => l.id === layerId);
      if (layerIdx < 0) return;

      const layer = state.layers[layerIdx];
      if (layer.deletable) state.layers.splice(layerIdx, 1);
    },
    renameLayer: (
      state,
      action: LayerAction & { payload: { layerName: string } }
    ) => {
      const layerName = action.payload.layerName;
      const layer = state.layers.find(l => l.id === action.payload.layerId);
      if (!layer) return;
      layer.name = layerName;
    },
    setLayerColor: (
      state,
      action: LayerAction & {
        payload: { color: LayerColorId };
      }
    ) => {
      const color = action.payload.color;
      const layer = state.layers.find(l => l.id === action.payload.layerId);
      if (!layer) return;
      layer.color = color;
    },
    setLayerPattern: (
      state,
      action: LayerAction & {
        payload: { pattern: SvgPatternId | undefined };
      }
    ) => {
      const layer = state.layers.find(
        
        l => l.id === action.payload.layerId
      
      ) as ShapeLayer;
      if (!layer?.shape?.appearance) return;
      layer.shape.appearance.pattern = action.payload.pattern;
    },
    resetSelectionInLayer: (state, action: LayerAction) => {
      const layerIdx = state.layers.findIndex(
        
        l => l.id === action.payload.layerId
      
      );
      const layer = state.layers[layerIdx];
      if (!layer) return;
      if (layer.originalState) {
        const restoredLayer = {
          ...layer.originalState,
          originalState: layer.originalState,
          id: layer.id,
        };
        state.layers[layerIdx] = restoredLayer as FretkaLayer;
      }
    },
    toggleNoteSelection: (state, action: LayerNoteAction) => {
      const layer = state.layers.find(l => l.id === action.payload.layerId);
      if (layer?.layerType !== "noteSelection") {
        console.log('shit');
        return;
      }
      const noteId = action.payload.noteId;
      const wasSelected = layer.selection.selected[noteId];
      layer.selection.selected[noteId] = !wasSelected;
    },
    toggleRootSelection: (state, action: LayerNoteAction) => {
      const layer = state.layers.find(l => l.id === action.payload.layerId);
      if (layer?.layerType !== "noteSelection") return;
      const noteId = action.payload.noteId;
      if (layer.selection.root !== noteId) {
        layer.selection.root = noteId;
      } else {
        delete layer.selection.root;
      }
    },
    setShapeRootFretSpec: (state, action: LayerNoteAction) => {
      const { payload } = action;
      const { layerId, noteId } = payload;
      const layer = state.layers.find(l => l.id === layerId);
      if (layer?.layerType !== "shape") return;
      layer.shape.segments[0][1] = noteId;
    },
  },
});

export const actions = layerSlice.actions;
