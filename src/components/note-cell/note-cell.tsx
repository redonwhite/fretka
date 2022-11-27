import React from 'react';
import type { NoteAbsolute } from '../../fretka/notes';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { appState } from '../../App';
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';
import { LayerStore } from "../../store/layer-store";
import { action } from "mobx";

import styles from './note-cell.module.scss';

const r = 11;
const dx = 0.4;
const rBig = 11;
const fontSize = 1.2 * rBig;
type DotArrangementType =
  | "shadow"
  | "side-by-side"
  | "side-by-side with overlap";
const overlap = 0.01;
const deltaR = 0.02;
const arrangement: DotArrangementType = "side-by-side";

const getCellDotClass = (layer : NoteSelectionLayer, isRoot: boolean) => {
  return classNames({
    layerColor: true,
    noteCellRootDot: isRoot,
    noteCellDot: true,
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
      x: centerX - dx * (selCount - 1),
      y: centerY,
    };
  }
  if (style === "side-by-side with overlap") {
    return {
      x: centerX - (selCount - 1) * (dx - overlap / 2),
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
      x: start.x + dx * n * 2,
      y: start.y,
    };
  }
  if (style === 'side-by-side with overlap') {
    return {
      x: start.x + (dx * 2 - overlap) * n,
      y: start.y,
    };
  }
  return {
    x: start.x + n * deltaR,
    y: start.y - n * deltaR,
  }
}

export const SvgNoteCell = observer(
  (props: {
    layerStore : LayerStore,
    note : NoteAbsolute,
    centerX: number,
    centerY: number,
    width: number,
    widthUnit: 'px' | '%',
    height: number
  }) => {
    const { layerStore, note, centerX, centerY, width, height, widthUnit } = props;
    
    const selections =
      appState.layerStore.getSelectionsForNote(note.id);
  
    const selCount = selections.length;
    const start = getStartDotPosition(props.centerX, props.centerY, selCount, r, arrangement);
  
  const toggle: (_sel: typeof selections[0]) => void = sel => {
    sel.root ? sel.layer.toggleRoot(note.id) : sel.layer.toggleNote(note.id);
  };

  const parsedWidthUnit = widthUnit == 'px' ? '' : '%';

  return (
      <React.Fragment>
        <rect
          key="clickarea"
          x={props.centerX - props.width / 2 + parsedWidthUnit}
          y={props.centerY - props.height / 2}
          width={props.width + parsedWidthUnit}
          height={props.height}
          onClick={action(() => props.layerStore.handleNotePick(note))} // 🤔 do I need to pass layerStore via props?
          fill="transparent"
          cursor="pointer"
        />
        {selections.map((sel, idx) => {
          const dotPos = getNthDotPosition(start, idx, selCount, r, arrangement);
          return (
            <React.Fragment key={"selfrag" + sel.layer.id}>
              <circle
                key={"sel" + sel.layer.id}
                cx={dotPos.x + parsedWidthUnit}
                cy={dotPos.y}
                r={sel.interval ? rBig : r}
                className={getCellDotClass(sel.layer, sel.root)}
                onClick={() => toggle(sel)}
              ></circle>
              <text
                className={styles.noteText}
                style={{ fontSize }}
                x={dotPos.x + parsedWidthUnit}
                y={dotPos.y + fontSize * 0.34}
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