import React from 'react';

import { NoteAbsolute, notes } from '../../fretka/notes';
import { observer } from 'mobx-react-lite';
import { SvgFretboardCell } from './svg-fretboard-cell';
import { FretboardDefinition } from "../../fretka/fretboard-definition";
import { LayerStore } from "../../store/layer-store";

import stylesSvg from "./svg-fretboard.module.scss";

export const SvgFretboardString = observer(
  (props: {
    layerStore: LayerStore;
    fretboardDefinition: FretboardDefinition;
    stringTuning: NoteAbsolute;
    fretCount: number;
    fromX: number;
    toX: number;
    fromY: number;
    toY: number;
    strokeWidth: number;
    height: number;
  }) => {
    console.log('STRING mapping string ', props.stringTuning);
    const fretNotes: Array<NoteAbsolute> = Array.from(
      { length: props.fretCount },
      (_, idx) => props.stringTuning.absIdx + idx
    ).map(absIdx => {

      const idx = absIdx % 12;
      const note = notes.basicNotesArray[idx];

      console.log('mapping absIdx ' + absIdx + ' to note ', note)
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
          stroke={props.fretboardDefinition.stringColor}
          strokeWidth={props.fretboardDefinition.stringStrokeWidth}
          x1={(props.fromX) + "%"}
          x2={props.toX + "%"}
          y1={props.fromY}
          y2={props.toY}
          className={stylesSvg.string}
          shapeRendering="crispEdges"
        />
        {fretNotes.map((note, idx) => (
          <SvgFretboardCell
            layerStore={props.layerStore}
            key={note.id + " " + note.absIdx + " fret " + idx}
            note={note}
            fretNumber={idx}
            stringTuning={props.stringTuning}
            width={cellWidth}
            height={props.height}
            centerX={props.fromX + cellWidth * (idx + 0.5)}
            centerY={props.fromY}
          />
        ))}
      </>
    );
  }
);
