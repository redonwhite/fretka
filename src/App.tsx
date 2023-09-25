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
} from '@hello-pangea/dnd';
// import {injectStores} from '@mobx-devtools/tools';

export const appState = new AppStateStore();

// for Mobx debugging extension for Chrome DevTools. 
// Seems to have a heavy performance impact!
// injectStores({
//   appState,
// });

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
            <button onClick={() => {appState.handleToolPick('playSoundTool')}}>play</button>&nbsp;
            <button onClick={() => {appState.handleToolPick('selectTool')}}>select</button>
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
