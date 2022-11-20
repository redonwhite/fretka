import React from "react";
import { observer } from "mobx-react-lite";
import { KeyboardDefinition } from "../../fretka/keyboard-definition";
import { NoteAbsolute, SharpNoteClassId } from "../../fretka/notes";
import { LayerStore } from "../../store/layer-store";
import { layerColors } from "../../fretka/layers/fretka-layer";

export const Key = observer(
  (props: {
    x: number;
    note: NoteAbsolute;
    keyboardDefinition: KeyboardDefinition;
    layerStore: LayerStore;
  }) => {
    const { x, note, keyboardDefinition, layerStore } = props;
    const natWidth = keyboardDefinition.naturalKeyWidth;
    const gap = natWidth / 10;
    const rx = natWidth / 7;
    
    const selections = layerStore.getSelectionsForNote(note.id);
    
    const overrideColor = (selections.length > 0) ?
      layerColors[selections[selections.length-1].layer.color].id : undefined;


    if (note.isNatural) {
      // natural note - white key
      return (
        <React.Fragment key={'key' + note.id + note.absIdx}>
          <rect
            fill={overrideColor ?? "#efefef"}
            x={x + gap + "%"}
            y="-10%"
            rx={rx + "%"}
            width={natWidth - 2 * gap + "%"}
            height="110%"
          />
          {/* <text x={x + natWidth / 2 + "%"} y="50%">
            {note.id}
          </text> */}
        </React.Fragment>
      );
    } else {
      // sharp note - black key
      let xoffset =
        keyboardDefinition.sharpKeyOffsets[note.id as SharpNoteClassId];
      return (
        <>
          <rect
            fill={overrideColor ?? "#efefef"}
            strokeWidth={2.5 * gap + "%"}
            stroke="white"
            x={x + xoffset + "%"}
            y={-10 + "%"}
            width={keyboardDefinition.sharpKeyWidth + "%"}
            rx={rx + "%"}
            height="70%"
          />
        </>
      );
    }
  }
);
