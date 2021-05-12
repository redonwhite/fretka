import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";
import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./store/app-state";

import "./vars.scss";
import styles from "./App.module.scss";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Keyboard } from "./components/keyboard/keyboard";
import { ChordFinderUi } from "./components/chord-finder/chord-finder-ui";

export const appState = new AppStateStore();

const App = observer(() => {
  return (
    <>
      <SvgPatterns />

      <div className={styles.appContainer}>
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
    </>
  );
});

export default App;
