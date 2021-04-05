import React from 'react';
import './App.module.scss';
import { SvgFretboard } from './components/fretboard/svg-fretboard';
import { guitarTunings } from './fretka/notes';
import store from './fretka/store';
import { Provider } from 'react-redux';
import { LayerStackEditor } from './components/layer-editors/layer-stack-editor';

import "./vars.scss";
import styles from './App.module.scss';

import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { SvgPatternPreview } from './components/svg-patterns/svg-pattern-preview';

interface AppProps {}

function App({ }: AppProps) {
  
  return (
    <Provider store={store}>
      <SvgPatterns />
      <div className={styles.appContainer}>
        <div className={styles.fretboardArea}>
          {/* <SvgPatternPreview /> */}
          <SvgFretboard tuning={guitarTunings.standard} />
        </div>
        <div className={styles.noteSelectorArea}>
          <LayerStackEditor />
        </div>
      </div>
    </Provider>
  );
}

export default App;
