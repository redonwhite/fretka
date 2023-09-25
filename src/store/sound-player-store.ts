import { action, makeObservable } from "mobx";
import { NoteAbsolute, getScientificNotationName } from "../fretka/notes";
import { RootStore } from "./layer-store";

import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

export class SoundPlayerStore extends RootStore {
  
  public playNote(note : NoteAbsolute) {
    Tone.start();
    console.log(note);
    console.log(getScientificNotationName(note));
    synth.triggerAttackRelease(getScientificNotationName(note), 1);
  }
  
  public constructor() {
    super();
    makeObservable(this, {
      playNote: action
    })
  }
}