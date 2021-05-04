import React from 'react';
import type { Point } from '../../fretka/svg';
import type { NoteAbsolute } from '../../fretka/notes';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { appState } from '../../App';
import { addInterval, addSemitones } from '../../fretka/interval-functions';
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';
import { LayerStore } from '../../store/app-state';
import { FretkaLayer } from '../../fretka/layers/fretka-layer';
import { action } from "mobx";

const getCellDotClass = (layer : NoteSelectionLayer, isRoot: boolean) => {
  return classNames({
    layerColor: true,
    fretCellRootDot: isRoot,
    fretCellDot: !isRoot,
    [`layerColor-${layer.color}`]: true,
  });
};

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
    const selections = appState.layerStore.getSelectionsForNote(note.id)
      .selections;
    const selCount = selections.length;
    const r = 7;
    const deltaR = 2;
    const startY = props.centerY + (deltaR * (selCount-1)) / 2;
    const startX = props.centerX - (deltaR * (selCount-1)) / 2;
    
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
        {selections.map((sel, idx) => (
          <circle
            key={"sel" + sel.layer.id}
            cx={startX + idx * deltaR}
            cy={startY - idx * deltaR}
            r={r}
            className={getCellDotClass(sel.layer, sel.root)}
            onClick={() =>

                           sel.root
               
                ? sel.layer.toggleRoot(note.id)
              
                 : sel.layer.toggleNote(note.id)
            
            }
          />
        ))}
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
