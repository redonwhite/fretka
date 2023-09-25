import { initial } from "lodash";
import { makeObservable, observable } from "mobx";

export type ToolType = 'selectTool' | 'playSoundTool'

export class ToolSelection {
  currentTool : ToolType;

  constructor() {
    this.currentTool = 'selectTool';

    makeObservable(this, {
      currentTool: observable
    })
  }
}