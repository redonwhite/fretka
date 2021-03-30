import React from 'react';
import type { GuitarTuning } from '../../fretka/notes';

import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import {
  convertFromFretSpace as specSpaceToGridSpace,
  FretShapeCoords,
  GridSpaceCoord,
  GridSpaceCoordSet,
  XyCoordSet,
} from '../../fretka/fret-shapes';

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

  function getFretCenterPosX(fretIdx: number) {
    return Math.round(marginLeft + (0.5 + fretIdx) * fretWidth);
  }

  function getStringPosY(idx: number): number {
    return Math.round(marginTop + (tuning.stringTunings.length - 1 - idx) * stringDistance);
  }

  function gridSpaceToXySpace(coordSet: GridSpaceCoordSet) : XyCoordSet {
    return coordSet.map(coord =>
      [
        getFretCenterPosX(coord[1]),
        getStringPosY(coord[0]),
      ]
    );
  }

  function xyCoordSetToPathD(xyCoordSet: XyCoordSet): string {
    return 'M ' + xyCoordSet.map(coord => coord[0] + ' ' + coord[1] + ' ');
  }

  const testShapeSpec : FretShapeCoords = [
    ['string1', 'g'],
    ['1up', 'perf4'],
    ['1up', 'perf4'],
    ['1up', 'perf4'],
    ['1up', 'maj3'],
    ['1up', 'perf4'],
    ['same', 'maj3'],
  ];

  const shapes = specSpaceToGridSpace(
    testShapeSpec, tuning, fretCount
  ).map(
    gridCoordSet => gridSpaceToXySpace(gridCoordSet)
  );
  
  const stringPosX = Math.round(marginLeft);

  return (
    <svg
      className={stylesSvg.fretSvg}
      style={{ width: svgWidth + 'px', height: svgHeight + 'px' }}
    >
      {shapes.map((shape, idx) => (
        <path
          stroke="red"
          strokeWidth="4"
          fill="none"
          d={xyCoordSetToPathD(shape)}
          key={idx}
        />
      ))}
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
          .map((tuning, idx) => (
            <SvgFretboardString
              key={'string' + idx}
              fromPoint={{
                x: stringPosX,
                y: getStringPosY(idx),
              }}
              toPoint={{
                x: stringPosX + fretboardWidth,
                y: getStringPosY(idx),
              }}
              height={stringDistance}
              tuning={tuning}
              fretCount={fretCount}
              strokeWidth={stringStrokeWidth}
            />
          ))
      }
    </svg>
  );
}

