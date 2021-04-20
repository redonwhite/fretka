export {};

// import type {
//   FretkaLayer,
//   FretkaLayerWithIndex,
// } from './layers';
// import { basicNotesArray, NoteClass, NoteClassId } from './notes';

// type AllNoteProperties = {
//   [key in NoteClassId]: NoteProperties;
// };

// export const getPropertiesForAllNotes: (
//   layerState: FretkaLayersState,
// ) => AllNoteProperties = (layerState: FretkaLayersState) => {
//   const entries = basicNotesArray.map((note) => [
//     note.id,
//     getPropertiesForNote(layerState, note),
//   ]);
//   const properties = Object.fromEntries(entries);
//   console.log("finished running getPropertiesForAllNotes");
//   return properties;
// };

// type NoteProperties = ReturnType<typeof getPropertiesForNote>;

// export const getPropertiesForNote = (
//   layerState: FretkaLayersState,
//   note: NoteClass,
// ) => {
//   const layers = getIndexedLayers(layerState);
//   const properties = {
//     ...note,
//     isNoteSelected: isNoteSelected(layerState, note),
//     isNoteRoot: isNoteRoot(layerState, note),
//     selPropsByLayer: getSelPropsByLayer(layerState, layers, note),
//     rootInLayers: layers.filter(
//       (layer) =>
//         layer.layerType === 'noteSelection' && layer.selection.root === note.id,
//     ),
//     colors: layers
//       .filter(
//         (layer) =>
//           layer.layerType === 'noteSelection' &&
//           (layer.selection.selected[note.id] ||
//             layer.selection.root === note.id),
//       )
//       .map((layer) => ({ layer: layer, color: layer.color })),
//   };
//   return properties;
// };

// export const isNoteSelected = (
//   layerState: FretkaLayersState,
//   note: NoteClass,
// ) => {
//   return layerState.layers.some(
//     (layer) =>
//       layer.layerType === 'noteSelection' && layer.selection.selected[note.id],
//   );
// };

// export const isNoteSelectedInLayer = (note: NoteClass, layer: FretkaLayer) => {
//   if (layer.layerType !== 'noteSelection') return false;
//   return layer.selection.selected[note.id];
// };

// export const isNoteRootInLayerByIdx = (
//   layerState: FretkaLayersState,
//   note: NoteClass,
//   layerIdx: number,
// ) => {
//   const layer = layerState.layers[layerIdx];
//   return isNoteRootInLayer(note, layer);
// };

// export const isNoteRootInLayer = (note: NoteClass, layer: FretkaLayer) => {
//   return (
//     layer.layerType === 'noteSelection' && layer.selection.root === note.id
//   );
// };

// export const isNoteRoot = (layerState: FretkaLayersState, note: NoteClass) => {
//   return layerState.layers.some((_layer, layerIdx) =>
//     isNoteRootInLayerByIdx(layerState, note, layerIdx),
//   );
// };

// export type LayerAction = {
//   payload: {
//     layerId: string;
//   };
// };

// export type NoteAction = {
//   payload: {
//     noteId: NoteClassId;
//   };
// };

// export type LayerNoteAction = LayerAction & NoteAction;

// export class NoteSelection {

//   }
// };

// function getSelPropsByLayer(
//   layerState: FretkaLayersState,
//   layers: FretkaLayerWithIndex[],
//   note: NoteClass,
// ) {
//   let nthSel = 0;
//   let selPropses: {
//     layer: FretkaLayerWithIndex;
//     selected: boolean;
//     root: boolean;
//     nthSel: number;
//     nSelMax: number;
//   }[] = [];
//   layers.map((layer) => {

//     const root = isNoteRootInLayer(note, layer);
//     const selected = isNoteSelectedInLayer(note, layer);

//     selPropses.push({
//       layer,
//       selected,
//       root,
//       nthSel: selected ? nthSel++ : nthSel,
//       nSelMax: 0,
//     });
//   });

//   const nSelMax = Math.max(0, nthSel - 1);
//   selPropses.forEach((el) => (el.nSelMax = nSelMax));
//   return selPropses;
// }
