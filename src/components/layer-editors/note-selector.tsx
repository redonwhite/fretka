import classNames from "classnames";
import React, { FC, FunctionComponent, PropsWithChildren, useState } from "react";
import { Popover } from "react-tiny-popover";
import {
  basicNotesArray,
  getPrettyNoteName,
  NoteClass,
} from "../../fretka/notes";

import styles from "./layer-editor.module.scss";

type PopSelectorProps<Tvalue extends string | number> = PropsWithChildren<{
  sel: Tvalue;
  setSel: (_sel: Tvalue) => any;
  options: Array<{ value: Tvalue, label: string }>;
}>;

export function PopSelector<Tvalue extends string | number>(props : PopSelectorProps<Tvalue>) {
  
  const { sel, setSel, options } = props;
  const [isRootPopoverOpen, setIsRootPopoverOpen] = useState(false);
    
  const currentLabel = options.find(opt => opt.value === sel)?.label;

  const getButtonClass = (_value : string | number) => {
    return classNames({
      [styles.noteButton]: true,
    });
  };

  const closePopover = () => setIsRootPopoverOpen(false);

  const buttonWrapperClasses = classNames({
    [styles.noteButtonWrapper]: true,
    [styles.compact]: true,
  });

  const flip = () => setIsRootPopoverOpen(!isRootPopoverOpen);

  const pick = (value: Tvalue) => {
    flip();
    setSel(value);
  }


  return (
    <Popover
      containerClassName={styles.selectorPopover}
      onClickOutside={closePopover}
      positions={["top", "bottom", "right", "left"]}
      align="center"
      // contentLocation={{ top: 200, left: 100 }}
      isOpen={isRootPopoverOpen}
      content={
        <>
          <div className={buttonWrapperClasses}>
            {options.map((option, idx) => (
              <div className={styles.noteButtonSet} key={idx}>
                <button
                  className={getButtonClass(option.value)}
                  onClick={() => pick(option.value)}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        </>
      }
    >
      <button onClick={flip}>{currentLabel}</button>
    </Popover>
  );
}
