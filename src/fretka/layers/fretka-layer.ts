import { FretShapeSpec } from "../shapes";
import { nanoid } from "nanoid";
import { action, makeObservable, observable, override } from "mobx";
import cloneDeep from "lodash/cloneDeep";
import { NoteClassId } from "../notes";

export type FretkaLayerType = "noteSelection" | "shape";

export abstract class FretkaLayer {
  id: string;
  abstract layerType: FretkaLayerType;
  color: LayerColorId;
  name: string;

  constructor(color: LayerColorId, name: string = "New layer", id = nanoid()) {
    this.id = id;
    this.name = name;
    this.color = color;

    makeObservable(this, {
      id: observable,
      layerType: observable,
      color: observable,
      name: observable,
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

export const layerColors: {
  [key in LayerColorId]: { id: key } & LayerColor;
} = {
  black: {
    id: "black",
    value: "black",
  },
  blue: {
    id: "blue",
    value: "blue",
  },
  gray: {
    id: "gray",
    value: "gray",
  },
  red: {
    id: "red",
    value: "red",
  },
  green: {
    id: "green",
    value: "darkturquoise",
  },
};
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

export type LayerColorId = "black" | "red" | "green" | "blue" | "gray";

export type LayerColor = {
  id: LayerColorId;
  value: string;
};
