import React from 'react';

import { NoteAbsolute, notes } from '../../fretka/notes';
import { observer } from 'mobx-react-lite';
import { SvgFretboardCell } from './svg-fretboard-cell';

export const SvgFretboardString = observer((props: {
  stringTuning: NoteAbsolute;
  fretCount: number;
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  strokeWidth: number;
  height: number;
}) => {

  const fretNotes: Array<NoteAbsolute> = Array.from(
    { length: props.fretCount },
    (_, idx) => props.stringTuning.absIdx + idx
  ).map(absIdx => {
    const idx = absIdx % 12;
    const note = notes.basicNotesArray[idx];
    return {
      ...note,
      absIdx: absIdx,
    };
  });

  const cellWidth = (props.toX - props.fromX) / props.fretCount;

  return (
    <>
      <line
        key="string line"
        stroke="black"
        strokeWidth={props.strokeWidth}
        x1={props.fromX}
        x2={props.toX}
        y1={props.fromY}
        y2={props.toY}
        className="string"
        shapeRendering="crispEdges"
      />
      {
        fretNotes.map((note, idx) => (
          <SvgFretboardCell
            key={note.id + ' ' + note.absIdx + ' fret ' + idx}
            note={note}
            fretNumber={idx}
            stringTuning={props.stringTuning}
            width={cellWidth}
            height={props.height}
            centerX={props.fromX + cellWidth * (idx + 0.5)}
            centerY={ props.fromY }
        />
      ))}
    </>
  );
});
