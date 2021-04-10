import { useDispatch } from "react-redux";
import type { ShapeLayerWithIndex } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";
import {
  NoteClassId,
} from "../../fretka/notes";
import { PopSelector } from "./pop-selector";
import styles from './layer-editor.module.scss';
import { basicNoteOptions, absoluteStringSpecOptions, shapeTypeOptions } from "./pop-selector-options";
import { RelativeFretCoordEditor } from "./relative-fret-coord-editor";
import React, { useState } from "react";
import { ShapeAppearanceSample } from "./shape-appearance-sample";



export function ShapeLayerEditor(props: { layer: ShapeLayerWithIndex }) {
  const { layer } = props;
  const { shape } = layer;
  const dispatch = useDispatch();
  const [showTailEditor, setShowTailEditor] = useState(false);
  
  const setShapeRoot = (noteId: NoteClassId | number) =>
    dispatch(
      actions.setShapeRootFretSpec({
        layerIdx: layer.idx,
        noteId: noteId as NoteClassId,
      })
    );

  const [shapeRoot, ...shapeCoords] = shape.segments;
  
  
  return (
    <div className={styles.shapeEditor}>
      {/* prettier-ignore */}
      <div className={styles.shapeSample}>
        <ShapeAppearanceSample shape={shape} layer={layer} />
      </div>
      <div className={styles.shapeEditorHead}>
        <div className={styles.inner}>
          <span className={styles.fieldLabel}>Root:</span>
          <span className={styles.shapeRootButton}>
            <PopSelector
              className={styles.prominentButton}
              sel={shapeRoot[1]}
              setSel={setShapeRoot}
              options={basicNoteOptions}
            />
            <PopSelector
              className={styles.prominentButton}
              sel={shapeRoot[0]}
              setSel={() => {}}
              options={absoluteStringSpecOptions}
            />
          </span>
          {/* <br /> */}
          <span className={styles.fieldLabel}>Type:</span>
          <span className={styles.compositeButton}>
            <PopSelector
              sel={shape.type}
              setSel={() => {}}
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
          {shapeCoords.map(coord => (
            <RelativeFretCoordEditor shapeCoord={coord} />
          ))}
        </div>
      )}
    </div>
  );
}
