import React from 'react';
import { notes } from '../../fretka/fretka';
import type { NoteAbsolute, NoteClass } from '../../fretka/fretka';
import { Fret } from './fret';

// import styles from './fretboardstring.module.scss';

export function FretboardString(props: {
  tuning: NoteAbsolute;
  fretCount: number;
}) {
  const { tuning, fretCount } = props;

  const fretNotes: Array<NoteAbsolute> = Array.from(
    { length: fretCount },
    (_, idx) => tuning.absIdx + idx,
  ).map((absIdx) => {
    const idx = absIdx % 12;
    const note = notes.basicNotesArray[idx];
    return {
      ...note,
      absIdx: absIdx,
    };
  });

  return (
    <div className="string">
      {fretNotes.map((note, idx) => (
        <Fret note={note} fretNumber={idx} key={idx} />
      ))}
    </div>
  );
}
