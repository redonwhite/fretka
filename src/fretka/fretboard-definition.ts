import { computed, makeObservable, observable } from "mobx";
import { GuitarTuning } from "./guitar-tunings";
import type { GridSpaceCoordSet, XyCoordSet } from "./shapes";

export class FretboardDefinition {
  fretCount: number;
  tuning: GuitarTuning;
  stringDistance: number = 25;
  fretboardWidth: number = 1398;
  marginTop: number = 20;
  marginBottom: number = 40;
  marginRight: number = 1;
  marginLeft: number = 1;
  stringStrokeWidth: number = 1;
  fretStrokeWidth: number = 2;
  fretColor: string = "transparent";
  stringColor: string = "black";

  get stringCount() {
    return this.tuning.stringTunings.length;
  }

  get fretboardHeight() {
    return (this.stringCount - 1) * this.stringDistance - 1;
  }

  get fretWidth() {
    return this.fretboardWidth / this.fretCount;
  }

  get svgWidth() {
    return this.marginLeft + this.fretboardWidth + this.marginRight;
  }

  get svgHeight() {
    return this.marginTop + this.fretboardHeight + this.marginBottom;
  }

  get stringPosX() {
    return Math.round(this.marginLeft);
  }

  get fretTopY() {
    return this.getStringPosY(this.tuning.stringTunings.length - 1);
  }

  get fretBottomY() {
    return this.getStringPosY(0);
  }

  constructor(tuning: GuitarTuning, fretCount: number = 24) {
    this.tuning = tuning;
    this.fretCount = fretCount;

    makeObservable(this, {
      fretCount: observable,
      tuning: observable,
      stringDistance: observable,
      fretboardWidth: observable,
      marginTop: observable,
      marginRight: observable,
      marginLeft: observable,
      stringStrokeWidth: observable,
      fretStrokeWidth: observable,

      stringCount: computed,
      fretboardHeight: computed,
      fretWidth: computed,
      svgWidth: computed,
      svgHeight: computed,
      stringPosX: computed,
      fretTopY: computed,
      fretBottomY: computed,
    });
  }

  public getFretCenterPosX(fretIdx: number) {
    return Math.round(this.marginLeft + (0.5 + fretIdx) * this.fretWidth);
  }

  public getFretPosX(fretIdx: number) {
    return Math.round(this.marginLeft + fretIdx * this.fretWidth);
  }

  public getStringPosY(idx: number): number {
    return Math.round(
      this.marginTop +
        (this.tuning.stringTunings.length - 1 - idx) * this.stringDistance
    );
  }

  public gridSpaceToXySpace(coordSet: GridSpaceCoordSet): XyCoordSet {
    return coordSet.map(coord => [
      this.getFretCenterPosX(coord[1]),
      this.getStringPosY(coord[0]),
    ]);
  }
}
