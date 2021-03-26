import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { Point } from '../../fretka/fretka-svg';
import { isNoteSelected, NoteSelectionLayer } from '../../fretka/note-selection';
import type { getPrettyNoteName, NoteAbsolute } from '../../fretka/fretka';
import { noteSelectionSelector } from '../../fretka/store';
import classNames from 'classnames';

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

  const baseFretDotClasses : any = {
    fretCellDot: true,
    selected: isNoteSelected(noteSelection, note),
  };
  
  const getCellDotClass = (layer: NoteSelectionLayer & { idx: number }) => {
    return classNames({
      ...baseFretDotClasses,
      [`layerColor-${layer.color}`]: true,
    });
  }

  return (
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
      {
        noteSelection.notes[note.id].selectedInLayers.map(layer => 
          <circle
            cx={center.x}
            cy={center.y}
            r={isNoteSelected(noteSelection, note) ? 5 : 0}
            className={getCellDotClass(layer)}
          />
        )
      }
    </React.Fragment>
  );
}
