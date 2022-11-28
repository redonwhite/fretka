import { makeObservable, observable } from "mobx";
import { ChordFinder } from "../fretka/chord-finder";
import { FretboardDefinition } from "../fretka/fretboard-definition";
import { guitarTuningsLibrary } from "../fretka/guitar-tunings";
import { KeyboardDefinition } from "../fretka/keyboard-definition";

import { c1 } from "../fretka/notes";
import { LayerStore, RootStore } from "./layer-store";

export class AppStateStore extends RootStore {
  layerStore: LayerStore;
  fretboardDefinition: FretboardDefinition;
  keyboardDefinition: KeyboardDefinition;
  chordFinder: ChordFinder;

  constructor() {
    super();
    this.layerStore = new LayerStore(this);
    this.fretboardDefinition = new FretboardDefinition(
      guitarTuningsLibrary.standard
    );
    this.keyboardDefinition = new KeyboardDefinition(12 * 3, c1);
    this.chordFinder = new ChordFinder(this.layerStore);
    makeObservable(this, {
      layerStore: observable,
      fretboardDefinition: observable,
    });
  }
}
