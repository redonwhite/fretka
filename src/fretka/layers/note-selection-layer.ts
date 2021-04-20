import { cloneDeep } from "lodash";
import { makeObservable, override, observable, action } from "mobx";
import { NoteClassId } from "../notes";
import { FretkaLayer, getOriginalState, LayerColorId } from "./fretka-layer";

export class NoteSelectionLayer extends FretkaLayer {
  originalState: Omit<NoteSelectionLayer, "id">;
  layerType: "noteSelection";
  root: NoteClassId | null;
  selection: Set<NoteClassId>;

  constructor(color: LayerColorId, name: string = "New note selection") {
    super(color, name);
    this.layerType = "noteSelection";
    this.root = null;
    this.selection = new Set([]);
    this.originalState = getOriginalState(this);

    makeObservable(this, {
      reset: override,
      root: observable,
      selection: observable,
      toggleRoot: action,
      toggleNote: action,
    });
  }

  public toggleRoot(noteId: NoteClassId) {
    this.root === noteId ? (this.root = null) : (this.root = noteId);
  }

  public toggleNote(noteId: NoteClassId) {
    this.selection.has(noteId)
      ? this.selection.delete(noteId)
      : this.selection.add(noteId);
  }

  public reset() {
    super.resetTo(this.originalState);
    this.root = this.originalState.root;
    this.selection = new Set(this.originalState.selection);
  }
}
