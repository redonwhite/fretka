import React from 'react';
import { useDispatch } from "react-redux";
import type { ShapeLayerWithIndex } from '../../fretka/layers';
import { actions, layerSlice } from "../../fretka/layers-slice";
import {
  basicNotes,
  basicNotesArray,
  getPrettyNoteName,
  NoteClassId,
} from "../../fretka/notes";
import { getStringIndexesFromAbsSpec } from "../../fretka/shapes";
import { PopSelector } from "./note-selector";

const basicNoteOptions = basicNotesArray.map(n => ({
  value: n.id,
  label: getPrettyNoteName(n).toUpperCase(),
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
    <div>
      <div>Shape type: {shape.type}</div>
      <div>
        Shape root:
        <PopSelector
          sel={shapeRoot[0]}
          setSel={() => {}}
          options={basicNoteOptions}
        />
        <PopSelector
          sel={shapeRoot[1]}
          setSel={setShapeRoot}
          options={basicNoteOptions}
        />
      </div>
      <div>
        Shape start: {shapeStart[0]} {shapeStart[1]} {shapeStart[2]}
      </div>
      {shapeTail.map(([stringSpec, interval, direction]) => (
        <div>
          {stringSpec} {interval} {direction}
        </div>
      ))}
    </div>
  );
}
