import { computed, makeObservable, observable } from "mobx";
import { GuitarTuning } from "./guitar-tunings";
import type { GridSpaceCoordSet, XyCoordSet } from "./shapes";

export class FretboardDefinition {
  fretCount: number;
  tuning: GuitarTuning;
  stringDistance_px: number = 30;
  get fretboardWidth_percent() {
    return 100 - this.marginRight_percent - this.marginLeft_percent;
  }
  marginTop_px: number = 20;
  marginBottom_px: number = 40;
  marginRight_percent: number = 0;
  marginLeft_percent: number = 0;
  stringStrokeWidth: number = 1;
  fretStrokeWidth: number = 1;
  fretColor: string = "black";
  stringColor: string = "black";

  get stringCount() {
    return this.tuning.stringTunings.length;
  }

  get fretboardHeight_px() {
    return (this.stringCount - 1) * this.stringDistance_px - 1;
  }

  get fretWidth_percent() {
    return this.fretboardWidth_percent / this.fretCount;
  }

  svgWidth: number = 100; //this.marginLeft + this.fretboardWidth + this.marginRight;

  get svgHeight_px() {
    return this.marginTop_px + this.fretboardHeight_px + this.marginBottom_px;
  }

  get stringPosX_percent() {
    return Math.round(this.marginLeft_percent);
  }

  get fretTopY_px() {
    return this.getStringPosY_px(this.tuning.stringTunings.length - 1);
  }

  get fretBottomY_percent() {
    return this.getStringPosY_px(0);
  }

  constructor(tuning: GuitarTuning, fretCount: number = 24) {
    this.tuning = tuning;
    console.log({ tuning: this.tuning })
    this.fretCount = fretCount;

    makeObservable(this, {
      fretCount: observable,
      tuning: observable,
      stringDistance_px: observable,
      marginTop_px: observable,
      marginRight_percent: observable,
      marginLeft_percent: observable,
      stringStrokeWidth: observable,
      fretStrokeWidth: observable,
      svgWidth: observable,
      
      fretboardWidth_percent: computed,
      stringCount: computed,
      fretboardHeight_px: computed,
      fretWidth_percent: computed,
      svgHeight_px: computed,
      stringPosX_percent: computed,
      fretTopY_px: computed,
      fretBottomY_percent: computed,
    });
  }

  public getFretCenterPosX_percent(fretIdx: number) {
    return this.marginLeft_percent + (0.5 + fretIdx) * this.fretWidth_percent;
  }

  public getFretPosX_percent(fretIdx: number) {
    return this.marginLeft_percent + fretIdx * this.fretWidth_percent;
  }

  public getStringPosY_px(idx: number): number {
    return Math.round(
      this.marginTop_px +
        (this.tuning.stringTunings.length - 1 - idx) * this.stringDistance_px
    );
  }

  public gridSpaceToXySpace(coordSet: GridSpaceCoordSet): XyCoordSet {
    return coordSet.map(coord => [
      this.getFretCenterPosX_percent(coord[1]),
      (coord[0] / (this.stringCount - 1)) * 100
    ]);
  }
}
