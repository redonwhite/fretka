import "./App.module.scss";
// import { SvgFretboard } from "./components/fretboard/svg-fretboard";
// import { guitarTunings } from "./fretka/notes";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";

import "./vars.scss";
import styles from "./App.module.scss";

import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./fretka/state/stores";
import { autorun } from "mobx";

const appState = new AppStateStore();

autorun(() => console.log('layers in layer store: ' + appState.layerStore.layers));

appState.layerStore.addShapeLayer();
appState.layerStore.addNoteSelectionLayer();
appState.layerStore.addShapeLayer();
appState.layerStore.addShapeLayer();



function App() {
  return (
    <>
      <SvgPatterns />
      <div className={styles.appContainer}>
        {/*<div className={styles.fretboardArea}>
          <SvgFretboard tuning={guitarTunings.standard} />
  </div>*/}
        <div className={styles.noteSelectorArea}>
          <LayerStackEditor layerStore={appState.layerStore}   />
        </div>
      </div>
    </>
  );
}

export default App;
