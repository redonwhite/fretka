import { action, computed, makeObservable, observable } from "mobx";
import {
  FretkaLayer,
  LayerColorId,
  layerColorRotation,
  layerColorsArray,
} from "../layers/fretka-layer";
import { NoteSelectionLayer } from "../layers/note-selection-layer";
import { ShapeLayer } from "../layers/shape-layer";

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

  constructor() {
    super();
    this.layerStore = new LayerStore(this);
    makeObservable(this, {
      layerStore: observable,
    });
  }
}

export class LayerStore extends Store {
  layers: FretkaLayer[] = [];

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
    ).sort((color1, color2) => color2.idx - color1.idx)[0].color;
    
    return leastRecentlyUsedColor;
  }

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.rootStore = rootStore;

    makeObservable(this, {
      layers: observable,
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

  addShapeLayer = () => {
    this.layers.push(new ShapeLayer(this.nextLayerColor));
  };
}
