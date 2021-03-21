import React from 'react';
import type { NoteAbsolute } from 'src/domain/notes';

import styles from './fret.module.scss';

export function Fret(props: { note: NoteAbsolute; fretNumber: number }) {
  const { fretNumber } = props;
  return (
    <span className={styles.fret}>
      <span className={styles.string} />
    </span>
  );
}
