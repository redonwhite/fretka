import classNames from "classnames";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import {
  basicNotesArray,
  getPrettyNoteName,
  NoteClass,
} from "../../fretka/notes";

import styles from "./layer-editor.module.scss";

export function NoteSelector() {
  const [isRootPopoverOpen, setIsRootPopoverOpen] = useState(false);
  const notes = basicNotesArray;

  const getButtonClass = (_note: NoteClass) => {
    return classNames({
      [styles.noteButton]: true,
    });
  };

  return (
    <Popover
      isOpen={isRootPopoverOpen}
      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
      content={
        <div className={styles.selectorPopover}>
          asdf
          <div className={styles.noteButtonWrapper}>
            {notes.map((note, idx) => (
              <div className={styles.noteButtonSet} key={idx}>
                <button className={getButtonClass(note)}>
                  {getPrettyNoteName(note)}
                </button>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <button
        onClick={() => (
          console.log("click"), setIsRootPopoverOpen(!isRootPopoverOpen)
        )}
      >
        Click me!
      </button>
    </Popover>
  );
}
