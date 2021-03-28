import React from 'react';
import type { GuitarTuning } from '../../fretka/notes';

import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import { SvgShape } from './svg-shape';

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;

  const fretCount: number = props.fretCount ?? 24;
  const stringDistance = 25;
  const stringCount = tuning.stringTunings.length;

  const fretboardHeight = (stringCount - 1) * stringDistance - 1;
  const fretboardWidth = 1398;

  const fretWidth = fretboardWidth / fretCount;

  const marginTop = 20;
  const marginBottom = marginTop;
  const marginLeft = 1;
  const marginRight = marginLeft;

  const stringStrokeWidth = 2;
  const fretStrokeWidth = 2;

  const svgWidth = marginLeft + fretboardWidth + marginRight;
  const svgHeight = marginTop + fretboardHeight + marginBottom;

  return (
    <svg
      className={stylesSvg.fretSvg}
      style={{ width: svgWidth + 'px', height: svgHeight + 'px' }}
    >
      {
        // frets:
        Array.from(Array(fretCount + 1).keys()).map((_, idx) => (
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
        ))
      }
      {
        // strings:
        Array.from(tuning.stringTunings)
          .reverse()
          .map((tuning, idx) => (
            <SvgFretboardString
              key={'string' + idx}
              fromPoint={{
                x: Math.round(marginLeft - fretStrokeWidth / 2),
                y: Math.round(marginTop + idx * stringDistance),
              }}
              toPoint={{
                x: marginLeft + fretboardWidth + fretStrokeWidth / 2,
                y: marginTop + idx * stringDistance,
              }}
              height={stringDistance}
              tuning={tuning}
              fretCount={fretCount}
              strokeWidth={stringStrokeWidth}
            />
          ))
      }
      <SvgShape
        shape={{
          segments: [
            ['string1', 'c'],
            ['string6', 'c'],
          ],
          appearance: {
            stroke: 'red',
          },
        }}
      />
    </svg>
  );
}

