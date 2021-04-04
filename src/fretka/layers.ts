import type { NoteSelection, FretkaLayersState } from './note-selection';
import {
  pentatonicMinorPos1,
  pentatonicMinorPos2,
  pentatonicMinorPos3,
  pentatonicMinorPos4,
  pentatonicMinorPos5,
} from './shape-library';
import type { FretShapeSpec } from './shapes';

export type FretkaLayerType = 'noteSelection' | 'shape';

export type FretkaLayerBase = {
  name: string;
  color: string;
  deletable: boolean;
  layerType: FretkaLayerType;
};

export type NoteSelectionLayer = FretkaLayerBase & {
  originalState?: NoteSelectionLayer;
  layerType: 'noteSelection';
  selection: NoteSelection;
};

export type ShapeLayer = FretkaLayerBase & {
  originalState?: ShapeLayer;
  layerType: 'shape';
  shape: FretShapeSpec;
};

export type FretkaLayer = NoteSelectionLayer | ShapeLayer;

export type FretkaLayerWithIndex = FretkaLayer & { idx: number };
export type NoteSelectionLayerWithIndex = NoteSelectionLayer & { idx: number };
export type ShapeLayerWithIndex = ShapeLayer & { idx: number };

export function getIndexedLayers(sel: FretkaLayersState): FretkaLayerWithIndex[] {
  return sel.layers.map((layer, idx) => ({ ...layer, idx }));
}

const layerColors = ['black', 'red', 'green', 'blue', 'gray'];

const defaultNoteSelection: NoteSelection = {
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
};

export function createEmptyNoteSelectionLayer(
  targetIdx: number,
  overrides?: Partial<NoteSelectionLayer>,
): NoteSelectionLayer {
  const layer: NoteSelectionLayer = {
    layerType: 'noteSelection',
    name: 'My selection layer',
    color: layerColors[targetIdx % layerColors.length],
    deletable: true,
    selection: defaultNoteSelection,
    ...overrides,
  };
  layer.originalState = { ...layer };
  return layer as NoteSelectionLayer;
}

export function createEmptyShapeLayer(
  targetIdx: number,
  overrides?: Partial<ShapeLayer>,
): ShapeLayer {
  const layer: ShapeLayer = {
    layerType: 'shape',
    name: 'My shape layer',
    color: layerColors[targetIdx % layerColors.length],
    deletable: true,
    shape: pentatonicMinorPos5,
    ...overrides,
  };
  layer.originalState = { ...layer };
  return layer;
}
