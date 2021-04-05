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

  const closePopover = () => setIsRootPopoverOpen(false);

  return (
    <Popover
      containerClassName={styles.selectorPopover}
      onClickOutside={closePopover}
      positions={['right']}
      isOpen={isRootPopoverOpen}
      content={
        <>
          <div className={styles.noteButtonWrapper}>
            {notes.map((note, idx) => (
              <div className={styles.noteButtonSet} key={idx}>
                <button className={getButtonClass(note)}>
                  {getPrettyNoteName(note)}
                </button>
              </div>
            ))}
          </div>
        </>
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
