import { createSlice } from '@reduxjs/toolkit';
import type { NoteClass, NoteClassId } from './fretka';

type NoteSelectionState = {
  layers: Array<NoteSelectionLayer>;
};

const initialNoteSelection: NoteSelectionState = {
  layers: [
    {
      name: 'Your selection',
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
    toggleNoteSelection: (
      state,
      { payload: { layerIdx, noteId } }: LayerNoteAction,
    ) => {
      state.layers[layerIdx].selection.selected[noteId] = !state.layers[
        layerIdx
      ].selection.selected[noteId];
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

export type NoteSelectionLayer = {
  selection: NoteSelection;
  name: string;
};

// export function useNoteSelection(): NoteSelectionContext {
//   const [noteSelection, updateNoteSelection] = React.useContext(
//     NoteSelectionContext,
//   ) as NoteSelectionReactContextType;

//   const toggleNote = useCallback(
//     (note: NoteClass) => {
//       const newSelection = { ...noteSelection };
//       note.id in noteSelection
//         ? delete newSelection[note.id]
//         : (newSelection[note.id] = { selected: true });
//       updateNoteSelection(newSelection);
//     },
//     [noteSelection, updateNoteSelection],
//   );

//   const toggleRoot = useCallback(
//     (note: NoteClass) => {
//       const newSelection: NoteSelection = { ...noteSelection };

//       if (!(note.id in noteSelection)) {
//         newSelection[note.id] = {
//           selected: true,
//           isRoot: true,
//         };
//       }

//       Object.keys(newSelection).map((key) => {
//         const nid = key as NoteClassId;
//         if (nid === note.id && !noteSelection[nid]?.isRoot) {
//           newSelection[nid]!.isRoot = true;
//         } else {
//           delete newSelection[nid]?.isRoot;
//         }
//       });

//       updateNoteSelection(newSelection);
//     },
//     [noteSelection, updateNoteSelection],
//   );

//   return { noteSelection, updateNoteSelection, toggleNote, toggleRoot };
// }

// const defaultLayerSelector = (state) => state.layers[0].selection;
