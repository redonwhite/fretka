import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";
import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./store/app-state";

import "./vars.scss";
import styles from "./App.module.scss";
import { allScaleLikes } from "./fretka/library";
import { autorun, computed, makeObservable } from "mobx";
import { ScaleLike } from "./fretka/scales";
import {
  EnharmonicHistogram,
  getEnharmonicHistogramForSelection,
  isEqualCanditate,
  isSubsetCandidate,
} from "./fretka/histograms";
import { isNoteSelectionLayer } from "./fretka/layers/fretka-layer";
import _ from "lodash";

export const appState = new AppStateStore();

const suggestions = {
  get selectionHistogram(): EnharmonicHistogram {
    const currentLayer = appState.layerStore.currentLayer;
    if (currentLayer && isNoteSelectionLayer(currentLayer)) {
      return getEnharmonicHistogramForSelection(currentLayer.selection);
    }
    return [0, 0, 0, 0, 0, 0, 0];
  },
  get supersets() {
    return allScaleLikes.filter(s =>
      isSubsetCandidate(s.histogram, this.selectionHistogram)
    );
  },
  get matches() {
    return allScaleLikes.filter(s =>
      isEqualCanditate(s.histogram, this.selectionHistogram)
    );
  },
};

makeObservable(suggestions, { selectionHistogram: computed }, { deep: true });

autorun(() => console.log(suggestions.supersets.map(s => s.name)));
autorun(() => console.log(suggestions.matches.map(s => s.name)));

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
