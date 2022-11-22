import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './tonnetz.module.scss';
import { LayerStore } from '../../store/layer-store';
import * as notes from '../../fretka/notes';
import * as intervals from '../../fretka/intervals';
import * as intervalFunctions from '../../fretka/interval-functions';

export const Tonnetz = observer(
  (props : { layerStore : LayerStore }) => {
    
    const idxes = Array.from(Array(30).keys());
    const startNote = notes.c1;
    const baseNotes = idxes.map(
      (val, idx) => intervalFunctions.addSemitones(startNote, idx * intervals.perf5.span)
    );

    console.log(baseNotes);

    return <React.Fragment>
      asdfasdfasdf asfd fsd
      <svg width="100%" height="200">
        {
          baseNotes.map((note, noteIdx) => <circle cx={noteIdx * 50 + "px"} cy="10px" r="10px">
            <text>a</text>
          </circle>)
        }
      </svg>
    </React.Fragment>
  }
);