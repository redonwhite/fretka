import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { Point } from '../../fretka/fretka-svg';
import type { NoteAbsolute } from '../../fretka/notes';
import { noteSelectionSelector } from '../../fretka/store';
import classNames from 'classnames';
import type { NoteSelectionLayer, NoteSelectionLayerWithIndex } from '../../fretka/note-selection-layers';

export function SvgFretboardCell(props: {
  note: NoteAbsolute;
  stringTuning: NoteAbsolute;
  fretNumber: number;
  center: Point;
  width: number,
  height: number
}) {
  const { center, note, fretNumber, width, height } = props;
  const r = 7;
  const noteSelection = useSelector(noteSelectionSelector);

  const baseFretDotClasses : any = {
    fretCellDot: true,
    selected: noteSelection.notes[note.id].isNoteSelected
  };
  
  const getCellDotClass = (layer: NoteSelectionLayerWithIndex) => {
    return classNames({
      ...baseFretDotClasses,
      layerColor: true,
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
        // noteSelection.notes[note.id].selectedInLayers.map(
        noteSelection.notes[note.id].selectedInLayers 
          .map((selProps) => (
            <circle key={selProps.layer.idx}
              cx={
                center.x - (selProps.nthSel - selProps.nSelMax / 2) * r * 1.5
              }
              cy={center.y}
              r={selProps.selected ? r : 0}
              className={getCellDotClass(selProps.layer)}
            />
          ))
      }
    </React.Fragment>
  );
}
