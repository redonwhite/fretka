import React from 'react';
import type { ShapeLayerWithIndex } from '../../fretka/layers';
import { NoteSelector } from './note-selector';


export function ShapeLayerEditor(props: { layer: ShapeLayerWithIndex }) {
  

  return (
    <div>
      This is a shape editor.
      <NoteSelector ></NoteSelector>
    </div>
  );
}
