import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import type { Point } from 'src/fretka/fretka-svg';
import { NoteSelectionContext, NoteSelectionContextType } from '../../contexts';
import type { getPrettyNoteName, NoteAbsolute } from '../../fretka/fretka';

// import styles from './fret.module.scss';

export function SvgFretboardCell(props: {
  note: NoteAbsolute;
  stringTuning: NoteAbsolute;
  fretNumber: number;
  center: Point;
}) {
  const { center, note, fretNumber } = props;

  const [noteSelection, updateNoteSelection] = useContext(
    NoteSelectionContext,
  ) as NoteSelectionContextType;

  const toggleNote = useCallback(() => {}, []);

  const isNoteSelected = note.id in noteSelection;
  const fretClassNames = classNames({
    fret: true,
    selected: isNoteSelected,
  });

  return (
    <circle
      cx={center.x}
      cy={center.y}
      r={isNoteSelected ? 5 : 0}
      fill="black"
      cursor="pointer"
    />
  );
}
