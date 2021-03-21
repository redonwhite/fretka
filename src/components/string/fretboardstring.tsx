import React from 'react';
import { notes } from '../../domain/notes';
import type { NoteAbsolute, NoteClass } from '../../domain/notes';
import { Fret } from '../fret/fret';

import styles from './fretboardstring.module.scss';

export function FretboardString(props: { tuning: NoteAbsolute; fretCount: number}) {
  
  const { tuning, fretCount } = props;

  const fretNotes: Array<NoteAbsolute> =
    Array.from({ length: fretCount }, (_, idx) => tuning.absIdx + idx)
      .map(absIdx => {
        const idx = absIdx % 12;
        const note = notes.basicNotesArray[idx];
        return {
          ...note,
          absIdx: absIdx
        }
      });

  return <div className={styles.string}>{fretNotes.map((note, idx) => <Fret note={note} fretNumber={idx} />)}</div>;

}