import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { KeyboardDefinition } from "../../fretka/keyboard-definition";
import { basicNotesArray } from "../../fretka/notes";
import { LayerStore } from "../../store/layer-store";
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

    const naturalKeys: ReactElement[] = [];
    const sharpKeys: ReactElement[] = [];

    for (let keyIdx = 0, x = 0; keyIdx < keyCount; keyIdx++) {
      const absIdx = startAbsIdx + keyIdx;
      const note = basicNotesArray[(startClassIdx + keyIdx) % 12];
      const noteAbs = { ...note, absIdx };
      const keyElement = (
        <Key
          x={x}
          keyboardDefinition={keyboardDefinition}
          note={noteAbs}
          key={"key note " + note.id + " (" + absIdx + ")"}
          layerStore={layerStore}
        />
      );
      if (note.isNatural) {
        x += keyboardDefinition.naturalKeyWidth;
        naturalKeys.push(keyElement);
      } else {
        sharpKeys.push(keyElement);
      }
    }

    const keys = [...naturalKeys, ...sharpKeys];

    return (
      <svg style={{ width: "100%", height: "90px" }}>
        {keys}
        <rect
          x="0"
          width="100%"
          height="100%"
          y="0"
          fill="white"
          opacity=".7"
        />
      </svg>
    );
  }
);
