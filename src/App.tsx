import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.module.scss';
import { Fretboard } from './components/fretboard/fretboard';
import { guitarTunings, NoteClassId } from './fretka/fretka';
import { NoteSelection, NoteSelectionContext } from './fretka/contexts';
import { NoteSelector } from './components/noteselector/noteselector';

interface AppProps {}

function App({}: AppProps) {
  
  const noteSelectionState = useState<NoteSelection>({});

  return (
    <NoteSelectionContext.Provider value={noteSelectionState}>
      <div className="app-container">
        <Fretboard tuning={guitarTunings.standard} />
        <NoteSelector />
      </div>
    </NoteSelectionContext.Provider>
  ); 
}

export default App;
