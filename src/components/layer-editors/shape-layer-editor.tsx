import { PopSelector } from "./pop-selector";
import styles from "./layer-editor.module.scss";
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

export const ShapeLayerEditor = observer((props: { layer: ShapeLayer }) => {
  const { layer } = props;
  const { shape } = layer;

  const [showTailEditor, setShowTailEditor] = useState(false);
  const [shapeHead, ...shapetail] = shape.segments;
  const shapeHeadStringSpec = shapeHead[0];
  const shapeHeadFretSpec = shapeHead[1];

  return (
    <div className={styles.shapeEditor + " " + styles.layerContentEditor}>
      {/* prettier-ignore */}
      <div className={styles.shapeSample}>
        <ShapeAppearanceSample layer={layer} />
      </div>
      <div className={styles.shapeEditorHead}>
        <div className={styles.inner}>
          <span className={styles.fieldLabel}>Root:</span>
          <span className={styles.shapeRootButton}>
            <PopSelector
              className={styles.prominentButton}
              selection={shapeHeadFretSpec}
              setSelection={fretSpec => shape.setHeadFretSpec(fretSpec)}
              options={basicNoteOptions}
            />
            <PopSelector
              className={styles.prominentButton}
              selection={shapeHeadStringSpec}
              setSelection={stringSpec => shape.setHeadStringSpec(stringSpec)}
              options={absoluteStringSpecOptions}
            />
          </span>
          {/* <br /> */}
          <span className={styles.fieldLabel}>Type:</span>
          <span className={styles.compositeButton}>
            <PopSelector
              selection={shape.type}
              setSelection={() => {}}
              options={shapeTypeOptions}
            />
            <button
              className={styles.popSelButton}
              onClick={() => setShowTailEditor(!showTailEditor)}
            >
              {showTailEditor ? "hide editor" : "edit"}
            </button>
          </span>
        </div>
      </div>
      {showTailEditor && (
        <div className={styles.shapeEditorTail}>
          {shapetail.map((coord, idx) => (
            <RelativeFretCoordEditor key={idx} shapeCoord={coord} />
          ))}
        </div>
      )}
    </div>
  );
});
