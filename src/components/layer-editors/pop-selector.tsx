import React, { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import { Popover } from "react-tiny-popover";

import styles from "./pop-selector.module.scss";

type PopSelectorProps<Tvalue extends string | number> = PropsWithChildren<{
  className?: string;
  sel: Tvalue;
  setSel: (_sel: Tvalue) => any;
  options: Array<{
    value: Tvalue;
    label: string | React.ReactElement;
    choiceLabel?: string | React.ReactElement;
    buttonLabel?: string | React.ReactElement;
  }>;
}>;

export function PopSelector<Tvalue extends string | number>(
  props: PopSelectorProps<Tvalue>
) {
  const { sel, setSel, options } = props;
  const [isRootPopoverOpen, setIsRootPopoverOpen] = useState(false);

  const currentOption = options.find(opt => opt.value === sel);

  const getChoiceButtonClass = (_value: string | number) => {
    return classNames({
      [styles.noteButton]: true,
      [styles.compact]: true,
    });
  };

  const closePopover = () => setIsRootPopoverOpen(false);

  const flip = () => setIsRootPopoverOpen(!isRootPopoverOpen);

  const pick = (value: Tvalue) => {
    flip();
    setSel(value);
  };

  return (
    <Popover
      containerClassName={styles.selectorPopover}
      onClickOutside={closePopover}
      positions={["right", "left"]}
      align="center"
      // contentLocation={{ top: 200, left: 100 }}
      isOpen={isRootPopoverOpen}
      content={
        <>
          {options.map((option, idx) => (
            <button
              className={getChoiceButtonClass(option.value)}
              onClick={() => pick(option.value)}
            >
              {option.choiceLabel ?? option.label}
            </button>
          ))}
        </>
      }
    >
      <button className={getMainButtonClass()} onClick={flip}>
        <span className={styles.label}>{currentOption?.buttonLabel ?? currentOption?.label ?? 'select one'}</span>
      </button>
    </Popover>
  );

  function getMainButtonClass(): string | undefined {
    return styles.popSelButton + ' ' + props.className;
  }
}
