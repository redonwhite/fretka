import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import type { Point } from 'src/fretka/fretka-svg';
import {
  NoteSelectionContext,
  NoteSelectionReactContextType,
  useNoteSelection,
  useNoteSelection as useNoteSelectionContext,
} from '../../contexts';
import type { getPrettyNoteName, NoteAbsolute } from '../../fretka/fretka';

// import styles from './fret.module.scss';

export function SvgFretboardCell(props: {
  note: NoteAbsolute;
  stringTuning: NoteAbsolute;
  fretNumber: number;
  center: Point;
  width: number,
  height: number
}) {
  const { center, note, fretNumber, width, height } = props;
  const { noteSelection, toggleNote } = useNoteSelection();
  const isNoteSelected = note.id in noteSelection;

  const fretClassNames = classNames({
    fret: true,
    selected: isNoteSelected,
  });



  return (
    <>
      <rect
        cx={center.x}
        cy={center.y}
        width={width}
        height={height}
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={isNoteSelected ? 5 : 0}
        fill={isNoteSelected ? 'black' : 'red'}
        onClick={() => toggleNote(note)}
        cursor="pointer"
      />
    </>
  );
}
