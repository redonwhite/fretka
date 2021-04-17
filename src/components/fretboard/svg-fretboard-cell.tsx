import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { Point } from '../../fretka/svg';
import type { NoteAbsolute } from '../../fretka/notes';
import { noteStateSelector } from '../../fretka/store';
import classNames from 'classnames';
import type { FretkaLayerWithIndex, NoteSelectionLayerWithIndex } from '../../fretka/layers';

const getCellDotClass = (selProps: any) => {
  const layer = selProps.layer;
  return classNames({
    layerColor: true,
    root: selProps.root,
    [`layerColor-${layer.color}`]: true,
  });
};

export function SvgFretboardCell(props: {
  note: NoteAbsolute;
  stringTuning: NoteAbsolute;
  fretNumber: number;
  center: Point;
  width: number,
  height: number
}) {
  const { center, note, fretNumber, width, height } = props;
  // console.log('rendering cell');
  const r = 7;
  const noteSelection = useSelector(noteStateSelector);
  


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
                className={'fretCellRootDot ' + getCellDotClass(selProps)}
              />
              <circle
                key={selProps.layer.idx}
                cx={dotx}
                cy={doty}
                r={selProps.selected ? (selProps.root ? r - 3 : r) : 0}
                className={'fretCellDot ' + getCellDotClass(selProps)}
              />
            </React.Fragment>
          );
        })
      }
    </React.Fragment>
  );
}
