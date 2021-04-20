import { action, computed, makeObservable, observable, override } from "mobx";

import { FretShapeSpec, getDomPatternId } from "../shapes";
import { FretkaLayer, getOriginalState, LayerColorId } from "./fretka-layer";

export class ShapeLayer extends FretkaLayer {
  originalState: Omit<ShapeLayer, "id">;
  layerType: "shape";
  shape: FretShapeSpec;

  get appearance() {
    const patternId = this.shape.appearance.patternId;
    const fill = patternId
      ? `url(#${getDomPatternId(patternId, this.color)})`
      : undefined;

    return {
      strokeWidth: this.shape.appearance.strokeWidth,
      stroke: this.shape.appearance.stroke,
      fill,
    };
  }

  constructor(
    color: LayerColorId,
    name: string = "New shape",
    shape?: FretShapeSpec
  ) {
    super(color, name);
    this.layerType = "shape";
    this.shape = shape ?? new FretShapeSpec("sequence of intervals");

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
