import React from 'react';
import { basicNotes, GuitarTuning, NoteClass } from '../../fretka/notes';

import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import { FretSpaceShape } from './fret-space-shape';
import { SvgShape } from './svg-shape';
import type {
  AbsoluteFretSpec,
  AbsoluteStringSpec,
  FretShapeCoords,
  StringSpec,
} from '../../fretka/fret-shapes';
import { getPositiveSteps } from '../../fretka/intervals';

type FretboardCoords = [number, number];

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;

  const fretCount: number = props.fretCount ?? 12;
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

  const stringPositions = Object.fromEntries(
    tuning.stringTunings.map((_note, stringIdx) => [
      `string${stringIdx + 1}`,
      getStringPosY(1),
    ]),
  );
  
  const fretPositions = Array(fretCount).fill(0).map((_, fretIdx) => {
    return marginLeft + fretWidth / 2 + fretIdx * fretWidth;
  });

  function getStringIndexesFromAbsSpec(
    stringSpec: AbsoluteStringSpec,
  ): Array<number> {
    switch (stringSpec) {
      case 'allStrings':
        return Object.values(stringPositions).map((_, idx) => idx).reverse();
      case 'string1':
        return [stringCount - 1];
      case 'string2':
        return [stringCount - 2];
      case 'string3':
        return [stringCount - 3];
      case 'string4':
        return [stringCount - 4];
      case 'string5':
        return [stringCount - 5];
      case 'string6':
        return [stringCount - 6];
    }
    throw new Error('unknown stirng specifier');
  }



  function getFretXsFromAbsoluteFretSpec(
    stringNote: NoteClass,
    fret: AbsoluteFretSpec,
  ): number[] {
    if (typeof fret === 'number') {
      return [fretPositions[fret]];
    }
    let currentFretIdx = getPositiveSteps(stringNote, basicNotes[fret]);
    const fretIndexes = [];
    while (currentFretIdx < fretCount) {
      fretIndexes.push(currentFretIdx);
      currentFretIdx += 12;
    }
    return fretIndexes.map((fretIdx) => fretPositions[fretIdx]);
  }

  function convertFromFretSpace(coords: FretShapeCoords) {

    let startingCoord = coords[0];
    let stringSpec = startingCoord[0];
    let fretSpec = startingCoord[1];

    let stringIndexes = getStringIndexesFromAbsSpec(stringSpec);

    const svgCoordSets: Array<Array<[number, number]>> = [];

    stringIndexes.map((stringIdx) => {
      const startingY = getStringPosY(stringIdx);
      const startingXs = getFretXsFromAbsoluteFretSpec(
        tuning.stringTunings[stringIdx],
        fretSpec,
      );
      startingXs.forEach((startingX) =>
        svgCoordSets.push([[startingX, startingY]]),
      );
    });

    return svgCoordSets;
  }

  const shapes = convertFromFretSpace([['allStrings', 'e']]);
  const stringPosX = Math.round(marginLeft - fretStrokeWidth / 2);

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
                x: stringPosX,
                y: getStringPosY(idx),
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
      <SvgShape />
      { shapes.map((shape, idx) => <circle r="4" cx={shape[0][0]} cy={shape[0][1]} fill="red" key={idx } />) }
    </svg>
  );

  function getStringPosY(idx: number): number {
    return Math.round(marginTop + idx * stringDistance);
  }
}

