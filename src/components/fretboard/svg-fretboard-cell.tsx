import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { Point } from '../../fretka/fretka-svg';
import type { NoteAbsolute } from '../../fretka/notes';
import { noteSelectionSelector } from '../../fretka/store';
import classNames from 'classnames';
import type { NoteSelectionLayerWithIndex } from '../../fretka/note-selection-layers';

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
  
  const getCellDotClass = (layer: NoteSelectionLayerWithIndex) => {
    const selProps = noteSelection.notes[note.id].selPropsByLayer[layer.idx];
    return classNames({
      layerColor: true,
      root: selProps.root,
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
      {/* prettier-ignore */}
      {
        noteSelection.notes[note.id].selPropsByLayer.map((selProps, idx) => {
          const dotx = center.x - (selProps.nthSel - selProps.nSelMax / 2) * r * 1.5;
          const doty = center.y;
          return (
            <React.Fragment key={idx}>
              <circle
                key={'root' + selProps.layer.idx}
                cx={dotx}
                cy={doty}
                r={selProps.root && selProps.selected ? r + 1 : 0}
                className={'fretCellRootDot ' + getCellDotClass(selProps.layer)}
              />
              <circle
                key={selProps.layer.idx}
                cx={dotx}
                cy={doty}
                r={selProps.selected ? (selProps.root ? r - 3 : r) : 0}
                className={'fretCellDot ' + getCellDotClass(selProps.layer)}
              />
            </React.Fragment>
          );
        })
      }
    </React.Fragment>
  );
}
