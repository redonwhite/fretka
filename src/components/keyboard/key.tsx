import React from "react";
import { observer } from "mobx-react-lite";
import { KeyboardDefinition } from "../../fretka/keyboard-definition";
import { NoteAbsolute } from "../../fretka/notes";

export const Key = observer(
  (props: {
    x: number;
    note: NoteAbsolute;
    keyboardDefinition: KeyboardDefinition;
  }) => {
    const { x, note, keyboardDefinition } = props;
    const natWidth = keyboardDefinition.naturalKeyWidth;

    if (note.isNatural) {
      return (
        <>
          <rect
            stroke="black"
            strokeWidth="2"
            fill="white"
            x={x + "%"}
            width={natWidth + "%"}
            height="100%"
          />
          <text x={x + natWidth / 2 + "%"} y="50%">
            {note.id}
          </text>
        </>
      );
    }
    return null;
  }
);
