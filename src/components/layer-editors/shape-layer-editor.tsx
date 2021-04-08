import { useDispatch } from "react-redux";
import {
  basicIntervalsArray,
  intervalDirectionArray,
} from "../../fretka/intervals";
import type { ShapeLayerWithIndex } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";
import {
  basicNotesArray,
  getPrettyNoteName,
  NoteClassId,
} from "../../fretka/notes";
import {
  absoluteStringSpecArray,
  relativeStringSpecArray,
} from "../../fretka/shapes";

import { PopSelector } from "./pop-selector";
import styles from './layer-editor.module.scss';

const basicNoteOptions = basicNotesArray.map(n => ({
  value: n.id,
  label: getPrettyNoteName(n).toUpperCase(),
}));

const basicIntervalOptions = basicIntervalsArray.map(i => ({
  value: i.id,
  label: i.abbr,
}));

const absoluteStringSpecOptions = absoluteStringSpecArray.map(s => ({
  value: s.id,
  label: s.name,
}));

const relativeStringSpecOptions = relativeStringSpecArray.map(s => ({
  value: s.id,
  label: s.name,
}));

const intervalDirectionOptions = intervalDirectionArray.map(d => ({
  value: d.id,
  label: d.name,
}));

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

  const [shapeRoot, shapeStart, ...shapeTail] = shape.segments;

  
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
          <span className={styles.fieldLabel}>Type:</span>
          <span className={styles.fieldValue}>{shape.type}</span>
          <div>
            Root:
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
            Shape start:
            <PopSelector
              sel={shapeStart[0]}
              setSel={() => {}}
              options={relativeStringSpecOptions}
            />
            <PopSelector
              sel={shapeStart[1]}
              setSel={() => {}}
              options={basicIntervalOptions}
            />
            <PopSelector
              sel={shapeStart[2]}
              setSel={() => {}}
              options={intervalDirectionOptions}
            />
          </div>
        </div>
      </div>
      <div className={styles.shapeEditorTail}>
        {shapeTail.map(([relStringSpec, interval, direction]) => (
          <span className={styles.shapeStep}>
            <PopSelector
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
        ))}
      </div>
    </div>
  );
}
