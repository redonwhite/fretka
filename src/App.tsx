import { AppStateStore } from "./store/app-state";
import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";
import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { Tonnetz } from "./components/tonnetz/tonnetz";

import "./vars.scss";
import styles from "./App.module.scss";
import { observer } from "mobx-react-lite";
import { Keyboard } from "./components/keyboard/keyboard";
import { ChordFinderUi } from "./components/chord-finder/chord-finder-ui";

import * as Tone from "tone";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
// import {injectStores} from '@mobx-devtools/tools';

export const appState = new AppStateStore();

// for Mobx debugging extension for Chrome DevTools. 
// Seems to have a heavy performance impact!
// injectStores({
//   appState,
// });

// const synth = new Tone.Synth().toDestination();

const makeASound = () => {
  // create two monophonic synths
  const synthA = new Tone.FMSynth().toDestination();
  const synthB = new Tone.AMSynth().toDestination();
  //play a note every quarter-note
  new Tone.Loop(time => {
    synthA.triggerAttackRelease("C2", "8n", time);
  }, "4n").start(0);
  //play another note every off quarter-note, by starting it "8n"
  new Tone.Loop(time => {
    synthB.triggerAttackRelease("C4", "8n", time);
  }, "4n").start("8n");
  // the loops start when the Transport is started
  Tone.Transport.start();
  // ramp up to 800 bpm over 10 seconds
  //Tone.Transport.bpm.rampTo(800, 10);
  Tone.Transport.stop(3);
};

const App = observer(() => {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (
      result.source.droppableId === 'layerStore'
      && result.destination?.droppableId === 'layerStore'
    ) {
      appState.layerStore.reorderLayer(result.source.index, result.destination.index);
    }
  };

  return (
    <>
      <SvgPatterns />
      <button onClick={() => makeASound()}>klik mi</button>
      <hr></hr>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.appContainer}>
          
          <div className={styles.tonnetzArea}>
            <Tonnetz layerStore={appState.layerStore} />
          </div>
          
          <div className={styles.keyboardArea}>
            <Keyboard
            keyboardDefinition={appState.keyboardDefinition}
            layerStore={appState.layerStore}
            />
          </div>

          <div className={styles.fretboardArea}>
            <SvgFretboard
              fretboardDefinition={appState.fretboardDefinition}
              layerStore={appState.layerStore}
            />
          </div>

          <div className={styles.noteSelectorArea}>
            <LayerStackEditor layerStore={appState.layerStore} />
          </div>

          <div className={styles.matchesArea}>
            <ChordFinderUi
              layerStore={appState.layerStore}
              chordFinder={appState.chordFinder}
            />
          </div>
        </div>
      </DragDropContext>
    </>
  );
});

export default App;
