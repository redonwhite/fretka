import React from 'react';
import './App.module.scss';
import { SvgFretboard } from './components/fretboard/svg-fretboard';
import { guitarTunings } from './fretka/notes';
import store from './fretka/store';
import { Provider } from 'react-redux';
import { LayerEditor } from './components/noteselector/layer-editor';

import styles from './App.module.scss';

interface AppProps {}

function App({ }: AppProps) {
  
  return (
    <Provider store={store}>
      <div className={styles.appContainer}>
        <div className={styles.fretboardArea}>
          <SvgFretboard tuning={guitarTunings.standard} />
        </div>
        <div className={styles.noteSelectorArea}>
          <LayerEditor />
        </div>
      </div>
    </Provider>
  );
}

export default App;
