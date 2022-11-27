import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './tonnetz.module.scss';
import { LayerStore } from '../../store/layer-store';
import * as notes from '../../fretka/notes';
import * as intervals from '../../fretka/intervals';
import * as intervalFunctions from '../../fretka/interval-functions';
import { SvgNoteCell } from '../note-cell/note-cell';
import { appState } from '../../App';


const semitoneDeltaX_px = 10;
const tonnetzDimensions = {
  svgHeight_px: 300,
  maj3_px: semitoneDeltaX_px * intervals.maj3.span,
  min3_px: semitoneDeltaX_px * intervals.min3.span,
  perf5_px: semitoneDeltaX_px * intervals.perf5.span,
  rowDeltaY_px: 0.71 * semitoneDeltaX_px * intervals.perf5.span,
}

export const NoteCircle = observer(
  (props : { 
    x_px: number,
    y_px: number,
    r_px: number,
    note: notes.NoteAbsolute
  }) => {
    const { x_px, y_px, r_px, note } = props;

    return <React.Fragment>
      <circle cx={ x_px + "px"} cy={y_px + "px"} r={r_px + "px"} />
      <text x={x_px + "px"} y={y_px + "px"} className={styles.noteText}>{notes.getPrettyNoteName(note)}</text>
    </React.Fragment>
  }
);

export const NoteRow = observer(
  (props : { 
    xStart_px: number,
    yStart_px: number,
    r_px: number,
    startNote: notes.NoteAbsolute
    noteCount: number
  }) => {

    const { xStart_px, yStart_px, r_px, startNote, noteCount } = props;

    const noteIndexes = Array.from(Array(noteCount).keys());

    const rowNotes = noteIndexes.map(
      (val, idx) => intervalFunctions.addSemitones(startNote, idx * intervals.perf5.span)
    );

    return <React.Fragment key={"note row " + startNote.id + " " + startNote.absIdx}> {
      rowNotes.map(
            (note, noteIdx) => {
              const noteProps = {
                centerX: xStart_px + noteIdx * tonnetzDimensions.perf5_px,
                centerY: yStart_px,
                width: 20,
                height: 20,
                note,
                layerStore: appState.layerStore,
                key: 'cell ' + note.id + note.absIdx
              } 
              return <SvgNoteCell {...noteProps} widthUnit='px'/>
            }
          )
      }
    </React.Fragment>
  }
);




export const Tonnetz = observer(
  (props : { layerStore : LayerStore }) => {
    
    const tonnetzStartNote = notes.c1;
    
    const rowCount = 10;
    const noteCount = 30;
    const r_px = 12;

    const rowIndexes = Array.from(Array(rowCount).keys());

    console.log(rowIndexes)

    const rowDefinitions = rowIndexes.map(
      rowIndex => ({
        xStart_px: rowIndex * tonnetzDimensions.maj3_px + r_px,
        yStart_px: tonnetzDimensions.svgHeight_px - r_px - rowIndex * tonnetzDimensions.rowDeltaY_px,
        startNote: intervalFunctions.addSemitones(tonnetzStartNote, rowIndex * intervals.maj3.span),
        r_px,
        noteCount
      })
    );

    console.log(rowDefinitions);

    return <svg width="400" height={tonnetzDimensions.svgHeight_px} className={styles.tonnetz}> 
      { rowDefinitions.map(noteRowProps => <NoteRow {...noteRowProps} />) }
    </svg>
  }
);