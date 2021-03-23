import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import type { Point } from 'src/fretka/fretka-svg';
import {
  NoteSelectionContext,
  NoteSelectionReactContextType,
  useNoteSelection,
  useNoteSelection as useNoteSelectionContext,
} from '../../fretka/contexts';
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
  const isRoot = isNoteSelected && noteSelection[note.id]?.isRoot;
  const fretClassNames = classNames({
    fretCellDot: true,
    selected: isNoteSelected,
  });



  return (
    <>
      <rect
        x={center.x - width / 2}
        y={center.y - height / 2}
        width={width}
        height={height}
        onClick={() => toggleNote(note)}
        fill="transparent"
        cursor="pointer"
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={isNoteSelected ? ((isRoot ? 7 : 5)) : 0}
        fill={true ? 'black' : 'red'}
        className={fretClassNames}
      />
    </>
  );
}
