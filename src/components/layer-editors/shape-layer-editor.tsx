import { PopSelector } from "./pop-selector";
import {
  basicNoteOptions,
  absoluteStringSpecOptions,
  shapeTypeOptions,
} from "./pop-selector-options";
import { RelativeFretCoordEditor } from "./relative-fret-coord-editor";
import React, { useState } from "react";
import { ShapeAppearanceSample } from "./shape-appearance-sample";
import { observer } from "mobx-react-lite";
import { ShapeLayer } from "../../fretka/layers/shape-layer";

import ui from '../ui.module.scss';
import styles from "./layer-editor.module.scss";

export const ShapeLayerEditor = observer((props: { layer: ShapeLayer }) => {
  const { layer } = props;
  const { shape } = layer;
  const colorClass = ` layerColor layerColor-${layer.color}`;
  const [showTailEditor, setShowTailEditor] = useState(false);
  const [shapeHead, ...shapetail] = shape.segments;
  const shapeHeadStringSpec = shapeHead[0];
  const shapeHeadFretSpec = shapeHead[1];

  return (
    <div className={styles.shapeEditor + " " + styles.layerContentEditor}>
      {/* prettier-ignore */}
      <div className={styles.shapeEditorHead}>
        <ShapeAppearanceSample layer={layer} />
        <span>
          <span className={styles.fieldLabel}>Root:</span>
          <span className={`${styles.shapeRootButton} ${ui.compositeButton}`}>
            <PopSelector
              popoverClassName={colorClass}
              buttonClassName={styles.prominentButton + colorClass}
              selection={shapeHeadFretSpec}
              setSelection={fretSpec => shape.setHeadFretSpec(fretSpec)}
              options={basicNoteOptions}
            />
            <PopSelector
              popoverClassName={colorClass}
              buttonClassName={styles.prominentButton + colorClass}
              selection={shapeHeadStringSpec}
              setSelection={stringSpec => shape.setHeadStringSpec(stringSpec)}
              options={absoluteStringSpecOptions}
            />
          </span>
        </span>
        {/* <br /> */}
        <span>
          <span className={styles.fieldLabel}>Type:</span>
          <span className={ui.compositeButton}>
            <PopSelector
              popoverClassName={colorClass}
              selection={shape.type}
              setSelection={() => {}}
              options={shapeTypeOptions}
              />
            <button
              className={ui.popSelButton}
              onClick={() => setShowTailEditor(!showTailEditor)}
              >
              {showTailEditor ? "close" : "edit"}
            </button>
          </span>
        </span>
      </div>
      {showTailEditor && (
        <div className={styles.shapeEditorTail}>
          {shapetail.map((coord, idx) => (
            <RelativeFretCoordEditor
              key={idx}
              shapeCoord={coord}
              color={layer.color}
            />
          ))}
        </div>
      )}
    </div>
  );
});
