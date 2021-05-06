import React from 'react';
import type { NoteAbsolute } from '../../fretka/notes';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { appState } from '../../App';
import { addSemitones } from '../../fretka/interval-functions';
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';
import { LayerStore } from '../../store/app-state';
import { action } from "mobx";

import styles from './svg-fretboard.module.scss';

const r = 11;
const rBig = 11;
const fontSize = 1.2 * rBig;
type DotArrangementType =
  | "shadow"
  | "side-by-side"
  | "side-by-side with overlap";
const overlap = r*1.5;
const deltaR = r/2;
const arrangement: DotArrangementType = "side-by-side with overlap";

const getCellDotClass = (layer : NoteSelectionLayer, isRoot: boolean) => {
  return classNames({
    layerColor: true,
    fretCellRootDot: isRoot,
    fretCellDot: true,
    [`layerColor-${layer.color}`]: true,
  });
};




const getStartDotPosition = (
  centerX: number,
  centerY: number,
  selCount: number,
  r: number,
  style: DotArrangementType = 'shadow'
) => {
  if (style === 'side-by-side') {
    return {
      x: centerX - r * (selCount-1),
      y: centerY,
    };
  }
  if (style === 'side-by-side with overlap') {
    
    return {
      x: centerX - (selCount - 1) * ( r - overlap/2),
      y: centerY,
    };
  }
  
  return {
    x: centerX - (deltaR * (selCount - 1)) / 2,
    y: centerY + (deltaR * (selCount - 1)) / 2
  }
}

const getNthDotPosition = (
  start: { x: number, y: number },
  n: number,
  _selCount: number,
  r: number,
  style: DotArrangementType) =>
{
  if (style === "side-by-side") {
    return {
      x: start.x + r * n * 2,
      y: start.y,
    };
  }
  if (style === 'side-by-side with overlap') {
    return {
      x: start.x + (r * 2 - overlap) * n,
      y: start.y,
    };
  }
  return {
    x: start.x + n * deltaR,
    y: start.y - n * deltaR,
  }
}

export const SvgFretboardCell = observer(
  (props: {
    layerStore: LayerStore;
    note: NoteAbsolute;
    stringTuning: NoteAbsolute;
    fretNumber: number;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
  }) => {
    const note = addSemitones(props.stringTuning, props.fretNumber);
    const selections =
      appState.layerStore.getSelectionsForNote(note.id);
    
    const selCount = selections.length;
    const start = getStartDotPosition(props.centerX, props.centerY, selCount, r, arrangement);
    
    const toggle: (_sel: typeof selections[0]) => void = sel => {
      sel.root ? sel.layer.toggleRoot(note.id) : sel.layer.toggleNote(note.id);
    };

    return (
      <React.Fragment>
        <rect
          key="clickarea"
          x={props.centerX - props.width / 2}
          y={props.centerY - props.height / 2}
          width={props.width}
          height={props.height}
          onClick={action(() => props.layerStore.handleNotePick(note))}
          fill="transparent"
          cursor="pointer"
        />
        {selections.map((sel, idx) => {
          const dotPos = getNthDotPosition(
            start,
            idx,
            selCount,
            r,
            arrangement
          );
          return (
            <React.Fragment key={"selfrag" + sel.layer.id}>
              <circle
                key={"sel" + sel.layer.id}
                cx={dotPos.x}
                cy={dotPos.y}
                r={sel.interval ? rBig : r}
                className={getCellDotClass(sel.layer, sel.root)}
                onClick={() => toggle(sel)}
              >
              </circle>
              <text
                className={styles.noteText}
                style={{ fontSize }}
                x={dotPos.x}
                y={dotPos.y + fontSize * .34}
                onClick={() => toggle(sel)}
              >
                {sel.interval?.dotAbbr ?? sel.interval?.abbr}
                </text>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
);
