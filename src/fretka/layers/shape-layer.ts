import { computed, makeObservable, observable, override } from "mobx";

import { FretShapeSpec, getDomPatternId, IFretShapeSpec } from "../shapes";
import {
  FretkaLayer,
  getOriginalState,
  LayerColorId,
  layerColors,
} from "./fretka-layer";

export class ShapeLayer extends FretkaLayer {
  originalState: Omit<ShapeLayer, "id">;
  layerType: "shape";
  shape: FretShapeSpec;

  get appearance() {
    const patternId = this.shape.appearance.patternId;
    const fill = patternId
      ? `url(#${getDomPatternId(patternId, this.color)})`
      : layerColors[this.color].value;

    return {
      strokeWidth: this.shape.appearance.strokeWidth,
      stroke: this.shape.appearance.stroke,
      fill,
    };
  }

  constructor(
    color: LayerColorId,
    name: string = "New shape",
    shape?: IFretShapeSpec
  ) {
    super(color, name);
    this.layerType = "shape";
    this.shape = new FretShapeSpec("sequence of intervals");
    
    if (shape) this.shape.resetTo(shape);

    this.originalState = getOriginalState(this);

    makeObservable(this, {
      shape: observable,
      appearance: computed,
      reset: override,
    });
  }

  reset = () => {
    super.resetTo(this.originalState);
    this.shape.resetTo(this.originalState.shape);
  };
}
