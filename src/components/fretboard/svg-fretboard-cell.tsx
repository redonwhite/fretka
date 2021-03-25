import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { Point } from '../../fretka/fretka-svg';
import { isNoteSelected } from '../../fretka/note-selection';
import type { getPrettyNoteName, NoteAbsolute } from '../../fretka/fretka';
import { noteSelectionSelector } from '../../store';

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
  
  const noteSelection = useSelector(noteSelectionSelector);
  console.log(noteSelection);
  const fretClassNames = classNames({
    fretCellDot: true,
    selected: isNoteSelected(noteSelection, note)
  });

  return (
    (
    <React.Fragment>
        <rect
          x={center.x - width / 2}
          y={center.y - height / 2}
          width={width}
          height={height}
          // onClick={() => toggleNote(note)}
          fill="transparent"
          cursor="pointer"
        ></rect>
        <circle
          cx={center.x}
          cy={center.y}
          r={isNoteSelected(noteSelection, note) ? 5 : 0}
          fill="black"
          className={fretClassNames}
        />
      </React.Fragment>
    )
  );
}
