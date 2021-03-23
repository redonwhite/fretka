import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import {
  NoteSelectionContext,
  NoteSelectionReactContextType,
  useNoteSelection,
} from '../../fretka/contexts';
import type { getPrettyNoteName, NoteAbsolute } from '../../fretka/fretka';

// import styles from './fret.module.scss';

export function Fret(props: { note: NoteAbsolute; fretNumber: number }) {
  const { note, fretNumber } = props;

  const { noteSelection } = useNoteSelection();

  const toggleNote = useCallback(() => {
  }, []);

  const isNoteSelected = note.id in noteSelection;
  const fretClassNames = classNames({
    fret: true,
    selected: isNoteSelected
  });

  return (
    <span className={fretClassNames} onClick={toggleNote}>
      <span className="fret-border" />
      <span className="string-on-fret" />
      <div className="selectionDot">{/*getPrettyNoteName(note)*/}</div>
    </span>
  );
}
