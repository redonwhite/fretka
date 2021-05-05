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

const getCellDotClass = (layer : NoteSelectionLayer, isRoot: boolean) => {
  return classNames({
    layerColor: true,
    fretCellRootDot: isRoot,
    fretCellDot: !isRoot,
    [`layerColor-${layer.color}`]: true,
  });
};


type DotArrangementType = 'shadow' | 'side-by-side';
const getStartDotPosition = (
  centerX: number,
  centerY: number,
  selCount: number,
  r: number,
  _style: DotArrangementType = 'shadow'
) => {
  const deltaR = 2;
  return {
    x: centerX - (deltaR * (selCount - 1)) / 2,
    y: centerY + (deltaR * (selCount - 1)) / 2
  }
}
const getNthDotPosition = (
  start: { x: number, y: number },
  n: number,
  _selCount: number,
  _r: number,
  _style: DotArrangementType) =>
{
  const deltaR = 2;
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
    const r = 5;
    const arrangement = "shadow";
    const start = getStartDotPosition(props.centerX, props.centerY, selCount, r, arrangement);
    
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
          const dotPos = getNthDotPosition(start, idx, selCount, r, arrangement);
          return (
            <React.Fragment key={"selfrag" + sel.layer.id}>
              <circle
                key={"sel" + sel.layer.id}
                cx={dotPos.x}
                cy={dotPos.y}
                r={sel.interval ? 1.5 * r : r}
                className={getCellDotClass(sel.layer, sel.root)}
                onClick={() => {
                  sel.root
                    ? sel.layer.toggleRoot(note.id)
                    : sel.layer.toggleNote(note.id);
                }}
              />
              <text
                className={styles.noteText}
                style={{ fontSize: r * 2 }}
                x={dotPos.x}
                y={dotPos.y + 0.75 * r}
              >
                {sel.interval?.dotAbbr ?? sel.interval?.abbr}
              </text>
            </React.Fragment>
          );
        })}
        {/* {selections.onlySelectedIn.map(layer => (
          <circle
            key={"sel" + layer.id}
            cx={props.centerX}
            cy={props.centerY}
            r={r}
            className={getCellDotClass(layer, false)}
            onClick={() => layer.toggleNote(note.id)}
          />
        ))}
        {selections.rootOf.map(layer => (
          <circle
            key={"sel" + layer.id}
            cx={props.centerX}
            cy={props.centerY}
            r={r}
            className={getCellDotClass(layer, true)}
            onClick={() => layer.toggleRoot(note.id)}
          />
        ))} */}
      </React.Fragment>
    );
  }
);
