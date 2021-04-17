import React from 'react';
import { notes } from '../../fretka/notes';
import type { NoteAbsolute, NoteClass } from '../../fretka/notes';
import type { Point } from '../../fretka/svg';
import { SvgFretboardCell } from './svg-fretboard-cell';

// import styles from './fretboardstring.module.scss';

export function SvgFretboardString(props: {
  tuning: NoteAbsolute;
  fretCount: number;
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  strokeWidth: number;
  height: number;
}) {
  const {

       tuning,

       fretCount,

       strokeWidth,

       height,
   
    fromX,
   
    fromY,
   
    toX,
   
    toY,

  } = props;

  const fretNotes: Array<NoteAbsolute> = Array.from(
    { length: fretCount },
    (_, idx) => tuning.absIdx + idx
  ).map(absIdx => {
    const idx = absIdx % 12;
    const note = notes.basicNotesArray[idx];
    return {
      ...note,
      absIdx: absIdx,
    };
  });

  const cellWidth = (toX - fromX) / fretCount;

  return (
    <>
      <line
        stroke="black"
        strokeWidth={strokeWidth}
        x1={fromX}
        x2={toX}
        y1={fromY}
        y2={toY}
        className="string"
        shapeRendering="crispEdges"
      />
      {fretNotes.map((note, idx) => (
        <SvgFretboardCell
          key={idx}
          note={note}
          fretNumber={idx}
          stringTuning={tuning}
          width={cellWidth}
          height={height}
          center={{ x: fromX + cellWidth * (idx + 0.5), y: fromY }}
        />
      ))}
    </>
  );
}
