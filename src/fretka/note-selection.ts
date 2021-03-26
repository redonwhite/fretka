import { createSlice } from '@reduxjs/toolkit';
import { basicNotesArray, NoteClass, NoteClassId } from './fretka';

type NoteSelectionState = {
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
  const layers = sel.layers.map((layer, idx) => ({ ...layer, idx }));
  const properties = {
    ...note,
    isNoteSelected: isNoteSelected(sel, note),
    isNoteRoot: isNoteRoot(sel, note),
    selectedInLayers: layers.filter(
      (layer) => layer.selection.selected[note.id],
    ),
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
    {
      name: 'Your selection',
      color: 'black',
      deletable: false,
      selection: {
        selected: {
          a: true,
          asharp: false,
          b: false,
          c: false,
          csharp: false,
          d: false,
          dsharp: false,
          e: false,
          f: false,
          fsharp: false,
          g: false,
          gsharp: false,
        },
        root: 'a',
      },
    },
    {
      name: 'Other selection',
      color: 'red',
      deletable: true,
      selection: {
        selected: {
          a: true,
          asharp: false,
          b: false,
          c: false,
          csharp: false,
          d: false,
          dsharp: false,
          e: false,
          f: false,
          fsharp: false,
          g: false,
          gsharp: false,
        },
        root: 'a',
      },
    },
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
    toggleNoteSelection: (state, action: LayerNoteAction) => {
      console.log('action', action);
      const noteId = action.payload.noteId;
      const layerIdx = action.payload.layerIdx;
      const wasSelected = state.layers[layerIdx].selection.selected[noteId];
      state.layers[layerIdx].selection.selected[noteId] = !wasSelected;
    },
    toggleRootSelection: (
      state,
      { payload: { layerIdx, noteId } }: LayerNoteAction,
    ) => {
      console.log('toggling root on layer[' + layerIdx + '] to ' + noteId);
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

export type NoteSelectionLayer = {
  selection: NoteSelection;
  name: string;
  color: string;
  deletable: boolean;
};

