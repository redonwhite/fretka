import classNames from 'classnames';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { noteSelectionSelector } from '../../fretka/store';
import { NoteSelector } from './noteselector';

export function LayeredNoteSelector() {
  const noteSelection = useSelector(noteSelectionSelector);

  return (
    <React.Fragment>
      {noteSelection.layers.map((_layer, idx) => (
        <NoteSelector layerIdx={idx} key={idx} />
      ))}
    </React.Fragment>
  );
}
