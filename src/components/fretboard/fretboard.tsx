import React from 'react';
import type { GuitarTuning } from '../../fretka/fretka';
import { guitarTunings } from '../../fretka/fretka';
import { FretboardString } from './fretboardstring';

import styles from './fretboard.module.scss';
import stylesSvg from './fretboard-svg.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import { Point } from '../../fretka/fretka-svg';

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;

  const fretCount: number = props.fretCount ?? 24;
  const stringDistance = 25;
  const stringCount = tuning.stringTunings.length;

  const fretboardHeight = (stringCount - 1) * stringDistance - 1;
  const fretboardWidth = 1398;

  const fretWidth = fretboardWidth / fretCount;

  const marginTop = 10;
  const marginBottom = marginTop;
  const marginLeft = 1;
  const marginRight = marginLeft;

  const stringStrokeWidth = 2;
  const fretStrokeWidth = 2;

  const svgWidth = marginLeft + fretboardWidth + marginRight;
  const svgHeight = marginTop + fretboardHeight + marginBottom;

  return (
    <div>
      <div className={styles.fretboardContainer}>
        <div className="fretboard">
          {Array.from(tuning.stringTunings)
            .reverse()
            .map((tuning, idx) => (
              <FretboardString
                tuning={tuning}
                fretCount={fretCount}
                key={idx}
              />
            ))}
        </div>
      </div>

      <svg
        className={stylesSvg.fretSvg}
        style={{ width: svgWidth + 'px', height: svgHeight + 'px' }}
      >
        {Array.from(Array(fretCount + 1).keys()).map((_, idx) => (
          <line
            key={'fret' + idx}
            id={'fret' + idx}
            stroke="black"
            strokeWidth={fretStrokeWidth}
            x1={Math.round(marginLeft + idx * fretWidth)}
            x2={Math.round(marginLeft + idx * fretWidth)}
            y1={Math.round(marginTop - fretStrokeWidth / 2)}
            y2={Math.round(marginTop + fretboardHeight + fretStrokeWidth / 2)}
            shapeRendering="crispEdges"
          />
        ))}

        {Array.from(tuning.stringTunings)
          .reverse()
          .map((tuning, idx) => (
            <SvgFretboardString
              key={'string' + idx}
              fromPoint={
                new Point(
                  Math.round(marginLeft - fretStrokeWidth / 2),
                  Math.round(marginTop + idx * stringDistance),
                )
              }
              toPoint={
                new Point(
                  marginLeft + fretboardWidth + fretStrokeWidth / 2,
                  marginTop + idx * stringDistance,
                )
              }
              height={stringDistance}
              tuning={tuning}
              fretCount={fretCount}
              strokeWidth={stringStrokeWidth}
            />
          ))}
      </svg>
    </div>
  );
}
