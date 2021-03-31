import type { NoteSelection, FretkaLayersState } from './note-selection';

export type FretkaLayerType = 'noteSelection' | 'shape';
export type FretkaLayerBase = {
  name: string;
  color: string;
  deletable: boolean;
  layerType: FretkaLayerType;
};;;
export type NoteSelectionLayer = FretkaLayerBase & {
  layerType: 'noteSelection';
  selection: NoteSelection;
};
export type ShapeLayer = FretkaLayerBase & { layerType: 'shape' };

export type FretkaLayer = NoteSelectionLayer | ShapeLayer;

export type FretkaLayerWithIndex = FretkaLayer & { idx: number };
export type NoteSelectionLayerWithIndex = NoteSelectionLayer & { idx: number };

export function getIndexedLayers(sel: FretkaLayersState): FretkaLayerWithIndex[] {
  return sel.layers.map((layer, idx) => ({ ...layer, idx }));
}

const layerColors = ['black', 'red', 'green', 'blue', 'gray'];

export function createEmptyNoteSelectionLayer(
  targetIdx: number,
  overrides?: Partial<NoteSelectionLayer>,
): NoteSelectionLayer {
  return {
    layerType: 'noteSelection',
    name: 'My selection layer',
    color: layerColors[targetIdx % layerColors.length],
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
    ...overrides,
  };
}
