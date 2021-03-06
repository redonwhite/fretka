import { nanoid } from "nanoid";
import { action, makeObservable, observable } from "mobx";
import cloneDeep from "lodash/cloneDeep";
import { NoteSelectionLayer } from "./note-selection-layer";
import { ShapeLayer } from "./shape-layer";

export type FretkaLayerType = "noteSelection" | "shape";

export function isNoteSelectionLayer(
  layer: FretkaLayer | undefined
): layer is NoteSelectionLayer {
  return layer?.layerType === "noteSelection";
}
export function isShapeLayer(
  layer: FretkaLayer | undefined
): layer is ShapeLayer {
  return layer?.layerType === "shape";
}

export abstract class FretkaLayer {
  id: string;
  abstract layerType: FretkaLayerType;
  color: LayerColorId;
  name: string;
  isTemporary: boolean;

  constructor(
    color: LayerColorId,
    name: string = "New layer",
    isTemporary = false,
    id = nanoid()
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.isTemporary = isTemporary;

    makeObservable(this, {
      id: observable,
      layerType: observable,
      color: observable,
      name: observable,
      isTemporary: observable,
      reset: action,
      resetTo: action,
      setColor: action,
      setName: action,
    });
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public setColor(newColor: LayerColorId) {
    this.color = newColor;
  }

  public reset() {}

  public resetTo(state: Omit<FretkaLayer, "id">) {
    this.layerType = state.layerType;
    this.color = state.color;
    this.name = state.name;
  }
}

export const permanentLayerColors: {
  [key in PermanentLayerColorId]: { id: key } & LayerColor;
} = {
  black: {
    id: "black",
    value: "black",
  },
  blue: {
    id: "blue",
    value: "rgb(17, 140, 255)",
  },
  gray: {
    id: "gray",
    value: "#999",
  },
  red: {
    id: "red",
    value: "red",
  },
  green: {
    id: "green",
    value: "rgb(31, 216, 77)",
  },
};

export const layerColors: {
  [key in LayerColorId]: { id: key } & LayerColor;
} = {
  ...permanentLayerColors,
  purple: {
    id: "purple",
    value: "#e3f",
  },
};

export const permanentLayerColorsArray = Object.values(permanentLayerColors);
export const layerColorsArray = Object.values(layerColors);
export const layerColorRotation: LayerColorId[] = [
  "black",
  "red",
  "green",
  "blue",
  "gray",
];

export function getOriginalState<T extends { id: string }>(layer: T) {
  let { id: _id, ...clone } = cloneDeep(layer);
  return clone;
}

export type PermanentLayerColorId = "black" | "red" | "green" | "blue" | "gray";

export type LayerColorId = PermanentLayerColorId | "purple";

export type LayerColor = {
  id: LayerColorId;
  value: string;
};
