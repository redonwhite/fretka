import { makeObservable, observable, action, computed } from "mobx";
import { computedFn } from "mobx-utils";
import { getBasicIntervalBetween } from "../fretka/interval-functions";
import {
  FretkaLayer,
  isShapeLayer,
  LayerColorId,
  layerColorRotation,
  isNoteSelectionLayer,
} from "../fretka/layers/fretka-layer";
import { makeNoteSelectionLayerFromScale, NoteSelectionLayer } from "../fretka/layers/note-selection-layer";
import { ShapeLayer } from "../fretka/layers/shape-layer";
import { NoteClassId, NoteAbsolute } from "../fretka/notes";
import { RootedScaleLike } from "../fretka/scales";
import { SingleStringId, IFretShapeSpec } from "../fretka/shapes";
import { AppStateStore } from "./app-state";

export type LayerStateInStore = "normal" | "leaving";
export type NoteSelectionProps = ReturnType<LayerStore["getSelectionsForNote"]>;

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

export class LayerStore extends Store {
  
  layers: FretkaLayer[] = [];

  layerStates: Map<string, LayerStateInStore>;
  currentLayer: FretkaLayer | null;
  rootStore: AppStateStore;
  
  getSelectionsForNote = computedFn(function selForNote(
    this: LayerStore,
    noteId: NoteClassId
  ) {
    return this.noteSelectionLayers
      .filter(l => l.selection[noteId])
      .map(l => ({
        layer: l,
        selected: !!l.selection[noteId],
        root: !!(l.root === noteId),
        interval: l.root ? getBasicIntervalBetween(l.root, noteId) : null,
      }));
  });

  useCurrentLayer = () => {
    if (this.currentLayer && this.layers.includes(this.currentLayer)) {
      return this.currentLayer;
    }

    if (this.noteSelectionLayers.length > 0) {
      this.currentLayer = this.noteSelectionLayers[0];
      return this.currentLayer;
    }

    return undefined;
  };

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

  constructor(appStateStore: AppStateStore) {
    super(appStateStore);
    this.rootStore = appStateStore;
    this.layerStates = new Map<string, LayerStateInStore>();
    this.currentLayer = null;

    makeObservable(this, {
      layers: observable,
      layerStates: observable,
      useCurrentLayer: action,
      currentLayer: observable,
      noteSelectionLayers: computed,
      shapeLayers: computed,
      nextLayerColor: computed,
      addNoteSelectionLayer: action,
      addShapeLayer: action,
      removeLayer: action,
      animatedRemoveLayer: action,
      handleNoteSelect: action,
      addScalePreview: action,
      addScalePermanently: action,
      clearTempLayers: action,
    });
  }

  handleNoteSelect = (
    note: NoteAbsolute,
    _string?: SingleStringId,
    _fretNumber?: number
  ) => {
    const current = this.useCurrentLayer();
    if (isNoteSelectionLayer(current)) {
      current.toggleNote(note.id);
    }
  };

  animatedRemoveLayer = (layer: FretkaLayer) => {
    this.useCurrentLayer();
    this.layerStates.set(layer.id, "leaving");
    setTimeout(() => this.removeLayer(layer), 250);
  };

  removeLayer = (layer: FretkaLayer) => {
    this.layers.splice(this.layers.indexOf(layer), 1);
  };

  addNoteSelectionLayer = () => {
    this.layers.push(new NoteSelectionLayer(this.nextLayerColor));
    this.useCurrentLayer();
  };

  addShapeLayer = (
    name: string = "New shape layer",
    shape?: IFretShapeSpec
  ) => {
    this.layers.push(new ShapeLayer(this.nextLayerColor, name, shape));
  };

  reorderLayer = (fromIndex: number, toIndex: number) => {
    this.layers.splice(toIndex, 0, this.layers.splice(fromIndex, 1)[0]);
  };

  clearTempLayers = () => {
    this
      .layers
      .filter(layer => layer.isTemporary)
      .forEach(layer => this.removeLayer(layer));
  }

  addScalePreview = (scale: RootedScaleLike) => {
    this.clearTempLayers();
    this.layers.push(
      makeNoteSelectionLayerFromScale(scale, "purple", true)
    )
  }

  addScalePermanently = (scale: RootedScaleLike) => {
    this.clearTempLayers();
    this.layers.push(
      makeNoteSelectionLayerFromScale(scale, this.nextLayerColor, false)
    )
  }
}
