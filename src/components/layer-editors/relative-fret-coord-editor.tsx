import { observer } from "mobx-react-lite";
import React from "react";
import { RelativeFretCoord } from "../../fretka/shapes";
import { PopSelector } from "./pop-selector";
import {
  relativeStringSpecOptions,
  basicIntervalOptions,
  intervalDirectionOptions,
} from "./pop-selector-options";

import styles from "./layer-editor.module.scss";
import ui from "../ui.module.scss";
import { LayerColorId } from "../../fretka/layers/fretka-layer";

export const RelativeFretCoordEditor = observer((props: {
  shapeCoord: RelativeFretCoord;
  color: LayerColorId;
}) => {
  const { shapeCoord, color } = props;
  const colorClass = ` layerColor layerColor-${color}`;
  const [relStringSpec, interval, direction] = shapeCoord;

  return (
    <span className={ui.compositeButton + " " + ui.sequenceButton}>
      <PopSelector
        key="string selector"
        wrapperClassName={colorClass}
        popoverClassName={ui.stringSelector + colorClass}
        selection={relStringSpec}
        setSelection={stringSel => (shapeCoord[0] = stringSel)}
        options={relativeStringSpecOptions}
        />
      <PopSelector
        key="interval selector"
        wrapperClassName={colorClass}
        popoverClassName={colorClass}
        selection={interval}
        setSelection={intervalSel => (shapeCoord[1] = intervalSel)}
        options={basicIntervalOptions}
        />
      <PopSelector
        key="dir selector"
        wrapperClassName={colorClass}
        popoverClassName={colorClass}
        selection={direction}
        setSelection={dirSel => (shapeCoord[2] = dirSel)}
        options={intervalDirectionOptions}
      />
    </span>
  );

});
