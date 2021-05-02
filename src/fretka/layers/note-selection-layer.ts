import { makeObservable, override, observable, action } from "mobx";
import { basicNoteIds, NoteClassId } from "../notes";
import { FretkaLayer, getOriginalState, LayerColorId } from "./fretka-layer";

export type NoteSelection = {
  [_noteId in NoteClassId]?: boolean;
};

export function createEmptySelection<Tkey extends string>(keys: Tkey[]) {
  return Object.fromEntries(keys.map(key => [key, false])) as {
    [_key in Tkey]: false;
  };
}

export class NoteSelectionLayer extends FretkaLayer {
  originalState: Omit<NoteSelectionLayer, "id">;
  layerType: "noteSelection";
  root: NoteClassId | null;
  selection: NoteSelection;

  constructor(color: LayerColorId, name: string = "New note selection") {
    super(color, name);
    this.layerType = "noteSelection";
    this.root = null;
    this.selection = createEmptySelection(basicNoteIds);
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
    this.selection[noteId] = !this.selection[noteId];
  }

  public reset() {
    super.resetTo(this.originalState);
    this.root = this.originalState.root;
    this.selection = { ...this.originalState.selection };
  }
}
