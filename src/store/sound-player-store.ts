import { action, makeObservable } from "mobx";
import { NoteAbsolute, getScientificNotationName } from "../fretka/notes";
import { RootStore } from "./layer-store";

import * as Tone from "tone";

const synth = new Tone.Sampler(
  {
    E4: 'samples/guitar/e4.mp3',
    B3: 'samples/guitar/b3.mp3',
    G3: 'samples/guitar/g3.mp3',
    D3: 'samples/guitar/d3.mp3',
    A2: 'samples/guitar/a2.mp3',
    E2: 'samples/guitar/e2.mp3'
  }, 
  ).toDestination();

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