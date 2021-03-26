import React from 'react';
import './App.module.scss';
import { Fretboard } from './components/fretboard/fretboard';
import { guitarTunings } from './fretka/fretka';
import { NoteSelector } from './components/noteselector/noteselector';
import store from './fretka/store';
import { Provider } from 'react-redux';
import { LayeredNoteSelector } from './components/noteselector/layered-noteselector';

interface AppProps {}

function App({ }: AppProps) {
  
  return (
    <Provider store={store}>
      <div className="app-container">
        <Fretboard tuning={guitarTunings.standard} />
        <LayeredNoteSelector />
      </div>
    </Provider>
  );
}

export default App;
