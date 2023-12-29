import { makeObservable, override, observable, action } from "mobx";
import { basicNoteIds, NoteClassId } from "../notes";
import {
  getNotesFromRootAndSpans,
  RootedScaleLike,
  ScaleLike,
} from "../scales";
import { FretkaLayer, getOriginalState, LayerColorId } from "./fretka-layer";

export type NoteSelection = {
  [_noteId in NoteClassId]?: boolean;
};

export function createEmptySelection<Tkey extends string>(keys: Tkey[]) {
  return Object.fromEntries(keys.map(key => [key, false])) as {
    [_key in Tkey]: false;
  };
}

export function makeNoteSelectionLayerFromScale(
  scale: RootedScaleLike,
  color: LayerColorId,
  isTemporary: boolean = false
): NoteSelectionLayer {
  const layer = new NoteSelectionLayer(color, scale.name, isTemporary);
  const selectedNoteIds = getNotesFromRootAndSpans(
    scale.root.id,
    scale.intervals.map(i => i.span)
  );
  layer.root = scale.root.id;
  for (let noteId of selectedNoteIds) {
    layer.selection[noteId] = true;
  }
  return layer;
}

export class NoteSelectionLayer extends FretkaLayer {
  originalState: Omit<NoteSelectionLayer, "id">;
  layerType: "noteSelection";
  root: NoteClassId | null;
  selection: NoteSelection;
  
  constructor(
    color: LayerColorId,
    name: string = "New note selection",
    isTemporary: boolean = false
  ) {
    super(color, name, isTemporary);
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
