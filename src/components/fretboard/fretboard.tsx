import React from 'react';
import type { GuitarTuning } from '../../fretka/fretka';
import { guitarTunings } from '../../fretka/fretka';
import { FretboardString } from './fretboardstring';

import styles from './fretboard.module.scss';

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;

  const fretCount: number = props.fretCount ?? 24;

  return (
    <div className={styles.fretboardContainer}>
      <div className="fretboard">
        {Array.from(tuning.stringTunings)
          .reverse()
          .map((tuning) => (
            <FretboardString tuning={tuning} fretCount={fretCount} />
          ))}
      </div>
    </div>
  );
}
