import React, { PropsWithChildren, ReactElement, useState } from "react";
import classNames from "classnames";
import { Popover } from "react-tiny-popover";

import { observer } from "mobx-react-lite";
import styles from "./layer-editor.module.scss";
import ui from "../ui.module.scss";

export type PickFunction<Tvalue extends OptionValue> = (
  _selection: Tvalue
) => void;
  

type OptionValue = string | number | undefined;
export type ContentFactory<Tvalue extends OptionValue> = (
  _pickFunction: PickFunction<Tvalue>
) => ReactElement;

type PopSelectorProps<Tvalue extends OptionValue> = PropsWithChildren<{
  buttonClassName?: string;
  wrapperClassName?: string;
  popoverClassName?: string;
  selection: Tvalue;
  setSelection: PickFunction<Tvalue>;
  contentFactory?: ContentFactory<Tvalue>;
  options?: Array<{
    value: Tvalue;
    label: string | React.ReactElement;
    choiceLabel?: string | React.ReactElement;
    buttonLabel?: string | React.ReactElement;
  }>;
}>;

export const PopSelector = observer(<Tvalue extends OptionValue>(
  props: PopSelectorProps<Tvalue>
) => {
  const { selection: sel, setSelection: setSel, options, popoverClassName } = props;
  const [isRootPopoverOpen, setIsRootPopoverOpen] = useState(false);
  const hasChildren = props.children !== undefined;

  const currentOption = options
    ? options.find(opt => opt.value === sel)
    : undefined;

  const getChoiceButtonClass = (_value: Tvalue) => {
    return classNames({
      // [styles.noteButton]: true,
      // [styles.compact]: true,
    });
  };

  const closePopover = () => setIsRootPopoverOpen(false);

  const flip = () => setIsRootPopoverOpen(!isRootPopoverOpen);

  const pick = (value: Tvalue) => {
    flip();
    setSel(value);
  };

  const getContentFromOptions = () =>
    options &&
    options.map((option, idx) => (
      <button
        key={idx}
        className={getChoiceButtonClass(option.value)}
        onClick={() => pick(option.value)}
      >
        {option.choiceLabel ?? option.label}
      </button>
    ));

  const usesOptions = props.options !== undefined;
  const getContentFromFactory = () =>
    props.contentFactory && props.contentFactory(pick);
  const content = usesOptions
    ? getContentFromOptions()
    : getContentFromFactory();

  return (
    <Popover
      containerClassName={ui.selectorPopover + ' ' + (popoverClassName ?? '') }
      onClickOutside={closePopover}
      positions={["right", "left"]}
      align="center"
      // contentLocation={{ top: 200, left: 100 }}
      isOpen={isRootPopoverOpen}
      content={<>{content}</>}
    >
      <span className={ui.popSelButtonWrapper + ' ' + props.wrapperClassName}>
        {hasChildren && (
          <button className={getMainButtonClass()} onClick={flip}>
            {props.children}
          </button>
        )}
        {!hasChildren && (
          <button className={getMainButtonClass()} onClick={flip}>
            <span className={styles.label}>
              {currentOption?.buttonLabel ??
                currentOption?.label ??
                "select one"}
            </span>
          </button>
        )}
      </span>
    </Popover>
  );

  function getMainButtonClass(): string | undefined {
    return ui.popSelButton + " " + props.buttonClassName;
  }
});
