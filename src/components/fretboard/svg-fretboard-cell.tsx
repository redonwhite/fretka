import React from 'react';
import type { NoteAbsolute } from '../../fretka/notes';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { appState } from '../../App';
import { addSemitones } from '../../fretka/interval-functions';
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';
import { LayerStore } from "../../store/layer-store";
import { action } from "mobx";
import { SvgNoteCell } from '../note-cell/note-cell';

import styles from './svg-fretboard.module.scss';

export const SvgFretboardCell = observer(
  (props: {
    layerStore: LayerStore;
    note: NoteAbsolute;
    stringTuning: NoteAbsolute;
    fretNumber: number;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
  }) => {
    const note = addSemitones(props.stringTuning, props.fretNumber);
    return <SvgNoteCell {...props} note={note} widthUnit='%'/>
  }
);
