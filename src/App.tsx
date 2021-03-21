import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Fretboard } from './components/fretboard/fretboard';
import { guitarTunings } from './domain/notes';

interface AppProps {}

function App({}: AppProps) {

  return <Fretboard tuning={guitarTunings.standard} />;
}

export default App;
