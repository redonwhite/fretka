import { useDispatch } from "react-redux";
import type { ShapeLayerWithIndex } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";
import {
  NoteClassId,
} from "../../fretka/notes";
import { PopSelector } from "./pop-selector";
import styles from './layer-editor.module.scss';
import { basicNoteOptions, absoluteStringSpecOptions, shapeTypeOptions } from "./pop-selector-options";
import { ShapeCoordEditor } from "./shape-coord-editor";



export function ShapeLayerEditor(props: { layer: ShapeLayerWithIndex }) {
  const { layer } = props;
  const { shape } = layer;
  const dispatch = useDispatch();

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
        <svg width="100%" height="100%">
          <rect x="0" y="0" rx="3" width="100%" height="100%" {...shape.appearance}/>
        </svg>
      </div>
      <div className={styles.shapeEditorHead}>
        <div className={styles.inner}>
          <span className={styles.fieldLabel}>Root:</span>
          <span className={styles.compositeButton}>
            <PopSelector
              sel={shapeRoot[1]}
              setSel={setShapeRoot}
              options={basicNoteOptions}
            />
            <PopSelector
              sel={shapeRoot[0]}
              setSel={() => {}}
              options={absoluteStringSpecOptions}
            />
          </span>
          <br />
          <span className={styles.fieldLabel}>Type:</span>
          <span className={styles.compositeButton}>
            <PopSelector
              sel={shape.type}
              setSel={() => {}}
              options={shapeTypeOptions}
            />
          </span>
        </div>
      </div>
      <div className={styles.shapeEditorTail}>
        {shapeCoords.map(coord => <ShapeCoordEditor shapeCoord={coord} />)}
      </div>
    </div>
  );
}
