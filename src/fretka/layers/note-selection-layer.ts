import { makeObservable, override, observable, action } from "mobx";
import { basicNoteIds, NoteClassId } from "../notes";
import {
  getNotesFromRootAndSpans,
  RootedScaleLike,
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

  public transposeUp() {
    this.selection = {
      a: this.selection.gsharp,
      asharp: this.selection.a,
      b: this.selection.asharp,
      c: this.selection.b,
      csharp: this.selection.c,
      d: this.selection.csharp,
      dsharp: this.selection.d,
      e: this.selection.dsharp,
      f: this.selection.e,
      fsharp: this.selection.f,
      g: this.selection.fsharp,
      gsharp: this.selection.a
    }
  }

  public transposeDown() {
    this.selection = {
      a: this.selection.asharp,
      asharp: this.selection.b,
      b: this.selection.c,
      c: this.selection.csharp,
      csharp: this.selection.d,
      d: this.selection.dsharp,
      dsharp: this.selection.e,
      e: this.selection.f,
      f: this.selection.fsharp,
      fsharp: this.selection.g,
      g: this.selection.gsharp,
	    gsharp: this.selection.a
    }
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
