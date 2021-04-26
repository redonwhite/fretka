import { action, computed, makeObservable, observable } from "mobx";
import { computedFn } from "mobx-utils";
import { FretboardDefinition } from "../fretka/fretboard";
import { guitarTuningsLibrary } from "../fretka/guitar-tunings";
import {
  FretkaLayer,
  isShapeLayer,
  LayerColorId,
  layerColorRotation,
} from "../fretka/layers/fretka-layer";

import { NoteSelectionLayer } from "../fretka/layers/note-selection-layer";
import { ShapeLayer } from "../fretka/layers/shape-layer";
import { NoteClassId } from "../fretka/notes";
import { IFretShapeSpec } from "../fretka/shapes";

export abstract class RootStore {}

export abstract class Store extends RootStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super();
    this.rootStore = rootStore;
    makeObservable(this, {
      rootStore: observable,
    });
  }
}

export class AppStateStore extends RootStore {
  layerStore: LayerStore;
  fretboardDefinition: FretboardDefinition;

  constructor() {
    super();
    this.layerStore = new LayerStore(this);
    this.fretboardDefinition = new FretboardDefinition(
      guitarTuningsLibrary.standard
    );

    makeObservable(this, {
      layerStore: observable,
      fretboardDefinition: observable,
    });
  }
}

export class LayerStore extends Store {
  layers: FretkaLayer[] = [];

  selectionByNote = () => {};

  getSelectionsForNote = computedFn(function selForNote(
    this: LayerStore,
    noteId: NoteClassId
  ) {
    return {
      selectedIn: this.noteSelectionLayers.filter(l => l.selection[noteId]),
      rootOf: this.noteSelectionLayers.filter(l => l.root === noteId),
      onlySelectedIn: this.noteSelectionLayers.filter(
        l => l.selection[noteId] && l.root !== noteId
      ),
    };
  });

  get noteSelectionLayers(): NoteSelectionLayer[] {
    return this.layers.filter(
      l => l.layerType === "noteSelection"
    ) as NoteSelectionLayer[];
  }
  get shapeLayers(): ShapeLayer[] {
    return this.layers.filter(l => isShapeLayer(l)) as ShapeLayer[];
  }

  get nextLayerColor(): LayerColorId {
    const revLayers = [...this.layers].reverse();
    console.log(revLayers);

    let leastRecentlyUsedColor = layerColorRotation
      .map(color => ({
        idx: revLayers.findIndex(l => l.color === color),
        color: color,
      }))
      .map(res =>
        res.idx >= 0 ? res : { idx: this.layers.length, color: res.color }
      )
      .sort((color1, color2) => color2.idx - color1.idx)[0].color;

    return leastRecentlyUsedColor;
  }

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.rootStore = rootStore;

    makeObservable(this, {
      layers: observable,
      noteSelectionLayers: computed,
      shapeLayers: computed,
      nextLayerColor: computed,
      addNoteSelectionLayer: action,
      addShapeLayer: action,
      removeLayer: action,
    });
  }

  removeLayer = (layer: FretkaLayer) => {
    this.layers.splice(this.layers.indexOf(layer), 1);
  };

  addNoteSelectionLayer = () => {
    this.layers.push(new NoteSelectionLayer(this.nextLayerColor));
  };

  addShapeLayer = (name : string = "New shape layer", shape?: IFretShapeSpec) => {
    this.layers.push(new ShapeLayer(this.nextLayerColor, name, shape));
  };
}
