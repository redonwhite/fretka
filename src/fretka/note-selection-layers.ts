import type { NoteSelection, NoteSelectionState } from './note-selection';

export type NoteSelectionLayer = {
  selection: NoteSelection;
  name: string;
  color: string;
  deletable: boolean;
};

export type NoteSelectionLayerWithIndex = NoteSelectionLayer & { idx: number };

export function getIndexedLayers(
  sel: NoteSelectionState,
): NoteSelectionLayerWithIndex[] {
  return sel.layers.map((layer, idx) => ({ ...layer, idx }));
}

const layerColors = ['black', 'red', 'green', 'blue', 'gray'];

export function createEmptyNoteSelectionLayer(
  targetIdx: number,
  overrides?: Partial<NoteSelectionLayer>,
): NoteSelectionLayer {
  return {
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
