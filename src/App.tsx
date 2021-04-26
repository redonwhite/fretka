import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";
import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./store/app-state";

import "./vars.scss";
import styles from "./App.module.scss";

export const appState = new AppStateStore();

function App() {
  return (
    <>
      <SvgPatterns />
      <div className={styles.appContainer}>
        <div className={styles.fretboardArea}>
          <SvgFretboard fretboardDefinition={ appState.fretboardDefinition } layerStore={ appState.layerStore }/>
        </div>
        <div className={styles.noteSelectorArea}>
          <LayerStackEditor layerStore={appState.layerStore} />
        </div>
      </div>
    </>
  );
}

export default App;
