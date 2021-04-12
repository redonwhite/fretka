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
  canDeleteLayer,
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
      console.log(action);
      switch (layerType) {
        case "noteSelection":
          console.log("creating new selection layer");
          state.layers.push(createEmptyNoteSelectionLayer(state.layers.length));
          return;
        case "shape":
          console.log("creating new shape layer");
          state.layers.push(createEmptyShapeLayer(state.layers.length));
          return;
      }
      throw new Error("Unknown layer type!");
    },
    deleteLayer: (state, action: LayerAction) => {
      const layerIdx = action.payload.layerIdx;
      if (canDeleteLayer(state, layerIdx)) state.layers.splice(layerIdx, 1);
    },
    renameLayer: (
      state,
      action: LayerAction & { payload: { layerName: string } }
    ) => {
      const layerName = action.payload.layerName;
      const layer = state.layers[action.payload.layerIdx];
      layer.name = layerName;
    },
    setLayerColor: (
      state,
      action: LayerAction & {
        payload: { color: LayerColorId };
      }
    ) => {
      const color = action.payload.color;
      const layer = state.layers[action.payload.layerIdx];
      layer.color = color;
    },
    setLayerPattern: (
      state,
      action: LayerAction & {
        payload: { pattern: SvgPatternId | undefined };
      }
    ) => {
      const layer = state.layers[action.payload.layerIdx] as ShapeLayer;
      layer.shape.appearance.pattern = action.payload.pattern;
    },
    resetSelectionInLayer: (state, action: LayerAction) => {
      const layer = state.layers[action.payload.layerIdx];
      if (layer.originalState) {
        const restoredLayer = {
          ...layer.originalState,
          originalState: layer.originalState,
        };
        state.layers[action.payload.layerIdx] = restoredLayer as FretkaLayer;
      }
    },
    toggleNoteSelection: (state, action: LayerNoteAction) => {
      const layer = state.layers[action.payload.layerIdx];
      if (layer.layerType !== "noteSelection") return;
      const noteId = action.payload.noteId;
      const layerIdx = action.payload.layerIdx;
      const wasSelected = layer.selection.selected[noteId];
      layer.selection.selected[noteId] = !wasSelected;
    },
    toggleRootSelection: (
      state,
      { payload: { layerIdx, noteId } }: LayerNoteAction
    ) => {
      const layer = state.layers[layerIdx];
      if (layer.layerType !== "noteSelection") return;
      if (layer.selection.root !== noteId) {
        layer.selection.root = noteId;
      } else {
        delete layer.selection.root;
      }
    },
    setShapeRootFretSpec: (state, action: LayerNoteAction) => {
      const { payload } = action;
      const { layerIdx, noteId } = payload;
      const layer = state.layers[layerIdx] as ShapeLayer;
      layer.shape.segments[0][1] = noteId;
    },
  },
});

export const actions = layerSlice.actions;
