import React from "react";
import { RelativeFretCoord } from "../../fretka/shapes";
import styles from "./layer-editor.module.scss";
import { PopSelector } from "./pop-selector";
import {
  relativeStringSpecOptions,
  basicIntervalOptions,
  intervalDirectionOptions,
} from "./pop-selector-options";

export function RelativeFretCoordEditor(props: {
  shapeCoord: RelativeFretCoord;
}) {
  const { shapeCoord } = props;
  const [relStringSpec, interval, direction] = shapeCoord;

  return (
    <span className={styles.compositeButton + " " + styles.sequenceButton}>
      <PopSelector
        key="string selector"
        className={styles.stringSelector}
        selection={relStringSpec}
        setSelection={() => {}}
        options={relativeStringSpecOptions}
      />
      <PopSelector
        key="interval selector"
        selection={interval}
        setSelection={() => {}}
        options={basicIntervalOptions}
      />
      <PopSelector
        key="dir selector"
        selection={direction}
        setSelection={() => {}}
        options={intervalDirectionOptions}
      />
    </span>
  );
}
