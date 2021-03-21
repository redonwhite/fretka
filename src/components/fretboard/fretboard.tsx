import React from 'react';
import type { GuitarTuning } from './../../domain/notes';
import { guitarTunings } from './../../domain/notes';
import { FretboardString } from '../string/fretboardstring';

import styles from './fretboard.module.scss';

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;

  const fretCount: number = props.fretCount ?? 24;

  return (
    <div className={styles.fretboardContainer}>
      <div className={styles.fretboard}>
        {Array.from(tuning.stringTunings)
          .reverse()
          .map((tuning) => (
            <FretboardString tuning={tuning} fretCount={fretCount} />
          ))}
      </div>
    </div>
  );
}
