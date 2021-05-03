import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";
import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./store/app-state";

import "./vars.scss";
import styles from "./App.module.scss";
import { allScaleLikes } from "./fretka/library";
import { autorun, computed, makeObservable } from "mobx";
import { findRootedScaleMatchesForSelection, isScaleSubsetOfSelection, isSelectionSubsetOfScale, RootedScaleLike } from "./fretka/scales";
import {
  EnharmonicHistogram,
  getEnharmonicHistogramForSelection,
  isEqualCanditate,
  isSubsetCandidate,
} from "./fretka/histograms";
import { isNoteSelectionLayer } from "./fretka/layers/fretka-layer";
import _ from "lodash";
import { getPrettyNoteName, NoteClassId } from "./fretka/notes";
import { observer } from "mobx-react-lite";

export const appState = new AppStateStore();

const suggestions = {
  
  get selectionHistogram(): EnharmonicHistogram {
    const currentLayer = appState.layerStore.currentLayer;
    if (currentLayer && isNoteSelectionLayer(currentLayer)) {
      return getEnharmonicHistogramForSelection(currentLayer.selection);
    }
    return [0, 0, 0, 0, 0, 0, 0];
  },

  get subsets() {
    const matches = [] as RootedScaleLike[];
    const currentLayer = appState.layerStore.currentLayer;
    if (currentLayer && isNoteSelectionLayer(currentLayer)) {
      const sel = currentLayer.selection;
      const canditdateScales = allScaleLikes.filter(s =>
        isSubsetCandidate(this.selectionHistogram, s.histogram)
      );
      const selNoteIds = Object.keys(sel).filter(
        key => sel[key as NoteClassId]
      ) as NoteClassId[];
      canditdateScales.forEach(scale =>
        matches.push(
          ...findRootedScaleMatchesForSelection(scale, selNoteIds, null, isScaleSubsetOfSelection)
        )
      );
    }
    return matches;
  },

  get matches() {
    const matches = [] as RootedScaleLike[];
    const currentLayer = appState.layerStore.currentLayer;
    if (currentLayer && isNoteSelectionLayer(currentLayer)) {
      const sel = currentLayer.selection;
      
      const canditdateScales = allScaleLikes.filter(s =>
        isEqualCanditate(s.histogram, this.selectionHistogram)
      );
      const selNoteIds = Object.keys(sel).filter(key => sel[key as NoteClassId]) as NoteClassId[];
      canditdateScales.forEach(scale =>
        matches.push(...findRootedScaleMatchesForSelection(scale, selNoteIds, currentLayer.root, isSelectionSubsetOfScale))
      );
    }
    return matches;
  },
};

makeObservable(suggestions, { selectionHistogram: computed, subsets: computed, matches: computed }, { deep: true });

const App = observer(() => {
  return (
    <>
      <SvgPatterns />
      <div className={styles.appContainer}>
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
          <ul>
            {suggestions.matches.map(match => (
              <li key={"match " + match.root.id + " " + match.name}>
                {getPrettyNoteName(match.root)} {match.name}
              </li>
            ))}
          </ul>
          <hr />
          <ul>
            {suggestions.subsets.map(subset => (
              <li key={"sub " + subset.root.id + " " + subset.name}>
                {getPrettyNoteName(subset.root)} {subset.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

export default App;
