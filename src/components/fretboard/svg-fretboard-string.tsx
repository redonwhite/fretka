import React from 'react';
import { notes } from '../../fretka/fretka';
import type { NoteAbsolute, NoteClass } from '../../fretka/fretka';
import { Point } from '../../fretka/fretka-svg';
import { SvgFretboardCell } from './svg-fretboard-cell';

// import styles from './fretboardstring.module.scss';

export function SvgFretboardString(props: {
  tuning: NoteAbsolute;
  fretCount: number;
  fromPoint: Point;
  toPoint: Point;
  strokeWidth: number;
  height: number;
}) {
  const { tuning, fretCount, fromPoint, toPoint, strokeWidth, height } = props;

  const fretNotes: Array<NoteAbsolute> = Array.from(
    { length: fretCount },
    (_, idx) => tuning.absIdx + idx,
  ).map((absIdx) => {
    const idx = absIdx % 12;
    const note = notes.basicNotesArray[idx];
    return {
      ...note,
      absIdx: absIdx,
    };
  });

  const cellWidth = (toPoint.x - fromPoint.x) / fretCount;

  return (
    <>
      <line
        stroke="black"
        strokeWidth={strokeWidth}
        x1={fromPoint.x}
        x2={toPoint.x}
        y1={fromPoint.y}
        y2={toPoint.y}
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
          center={new Point(fromPoint.x + cellWidth * (idx + 0.5), fromPoint.y)}
        />
      ))}
    </>
  );
}
