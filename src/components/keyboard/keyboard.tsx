import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { KeyboardDefinition } from "../../fretka/keyboard-definition";
import { basicNotesArray } from "../../fretka/notes";
import { LayerStore } from "../../store/app-state";
import { Key } from "./key";

import styles from "./svg-keyboard.module.scss";

export const Keyboard = observer(
  (props: {
    keyboardDefinition: KeyboardDefinition;
    layerStore: LayerStore;
  }) => {
    const { keyboardDefinition, layerStore } = props;
    const keyCount = keyboardDefinition.keyCount;
    const startingNote = keyboardDefinition.startingNote;
    const startAbsIdx = startingNote.absIdx;
    const startClassIdx = startingNote.idx;

    const keys: ReactElement[] = [];

    for (let keyIdx = 0, x = 0; keyIdx < keyCount; keyIdx++) {
      const absIdx = startAbsIdx + keyIdx;
      const note = basicNotesArray[(startClassIdx + keyIdx) % 12];
      const noteAbs = { ...note, absIdx };
      keys.push(
        <Key
          x={x}
          keyboardDefinition={keyboardDefinition}
          note={noteAbs}
          key={"key note " + note.id + " (" + absIdx + ")"}
        />
      );
      if (note.isNatural) x += keyboardDefinition.naturalKeyWidth;
    }

    return (
      <svg style={{ width: "100%", height: "75px" }}>
        <rect x="0" width="100%" y="0" height="100%" fill="green" />
        {keys}
      </svg>
    );
  }
);
