import React from "react";
import styles from "./layer-editor.module.scss";
import { PopSelector } from "./pop-selector";
import {
  relativeStringSpecOptions,
  basicIntervalOptions,
  intervalDirectionOptions,
} from "./pop-selector-options";

export function ShapeCoordEditor(props: any) {
  const { shapeCoord } = props;
  const [relStringSpec, interval, direction] = shapeCoord;

  return (
    <span className={styles.compositeButton + " " + styles.sequenceButton}>
      <PopSelector
        className={styles.stringSelector}
        sel={relStringSpec}
        setSel={() => {}}
        options={relativeStringSpecOptions}
      />
      <PopSelector
        sel={interval}
        setSel={() => {}}
        options={basicIntervalOptions}
      />
      <PopSelector
        sel={direction}
        setSel={() => {}}
        options={intervalDirectionOptions}
      />
    </span>
  );
}
