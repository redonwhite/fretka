import React from "react";
import { observer } from "mobx-react-lite";
import { KeyboardDefinition } from "../../fretka/keyboard-definition";
import { NoteAbsolute, SharpNoteClassId } from "../../fretka/notes";

export const Key = observer(
  (props: {
    x: number;
    note: NoteAbsolute;
    keyboardDefinition: KeyboardDefinition;
  }) => {
    const { x, note, keyboardDefinition } = props;
    const natWidth = keyboardDefinition.naturalKeyWidth;
    const gap = natWidth / 20;
    const rx = natWidth / 7;
    
    if (note.isNatural) {
      // natural note - white key
      return (
        <>
          <rect
            fill="lightgray"
            x={x + gap + "%"}
            y="-10%"
            rx={rx + "%"}
            width={natWidth - 2 * gap + "%"}
            height="110%"
          />
          {/* <text x={x + natWidth / 2 + "%"} y="50%">
            {note.id}
          </text> */}
        </>
      );
    } else {
      // sharp note - black key
      let xoffset =
        keyboardDefinition.sharpKeyOffsets[note.id as SharpNoteClassId];
      return (
        <>
          <rect
            fill="lightgray"
            strokeWidth="3"
            stroke="white"
            x={x + xoffset + "%"}
            y={-10 + "%"}
            width={keyboardDefinition.sharpKeyWidth + "%"}
            rx={rx + "%"}
            height="65%"
          />
        </>
      );
    }
  }
);
