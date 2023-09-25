import { action, makeObservable, observable } from "mobx";
import { ChordFinder } from "../fretka/chord-finder";
import { FretboardDefinition } from "../fretka/fretboard-definition";
import { guitarTuningsLibrary } from "../fretka/guitar-tunings";
import { KeyboardDefinition } from "../fretka/keyboard-definition";

import { NoteAbsolute, c1 } from "../fretka/notes";
import { LayerStore, RootStore } from "./layer-store";
import { ToolSelection, ToolType } from "../tools/tool-selection";
import { SoundPlayerStore } from "./sound-player-store";

export class AppStateStore extends RootStore {
  layerStore: LayerStore;
  fretboardDefinition: FretboardDefinition;
  keyboardDefinition: KeyboardDefinition;
  chordFinder: ChordFinder;
  toolSelection: ToolSelection;
  soundPlayerStore: SoundPlayerStore;

  handleToolPick = (tool : ToolType) => {
    this.toolSelection.currentTool = tool;
  }

  handleNotePick = (note : NoteAbsolute) => {

    switch(this.toolSelection.currentTool) {
      case "playSoundTool":
        this.soundPlayerStore.playNote(note);
        break;
        
      case "selectTool":
        this.layerStore.handleNoteSelect(note);
        break;
    }
  }

  constructor() {
    super();
    this.layerStore = new LayerStore(this);
    this.fretboardDefinition = new FretboardDefinition(
      guitarTuningsLibrary.standard
    );
    this.keyboardDefinition = new KeyboardDefinition(12 * 3, c1);
    this.chordFinder = new ChordFinder(this.layerStore);
    this.toolSelection = new ToolSelection();
    this.soundPlayerStore = new SoundPlayerStore();

    makeObservable(this, {
      handleNotePick: action,
      handleToolPick: action,

      layerStore: observable,
      fretboardDefinition: observable,
      keyboardDefinition: observable,
      chordFinder: observable,
      toolSelection: observable,
      soundPlayerStore: observable
    });
  }
}
