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
  RelativeFretSpec,
  RelativeStringSpec,
  StringSpec,
} from '../../fretka/fret-shapes';
import { addInterval, addSemitones, basicIntervals, getPositiveSteps, getShortestDelta } from '../../fretka/intervals';

type FretboardCoords = [number, number];

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

  const stringPositions = Object.fromEntries(
    tuning.stringTunings.map((_note, stringIdx) => [
      `string${stringIdx + 1}`,
      getStringPosY(1),
    ]),
  );

  const fretPositions = Array(fretCount)
    .fill(0)
    .map((_, fretIdx) => {
      return marginLeft + fretWidth / 2 + fretIdx * fretWidth;
    });

  function getStringIndexesFromAbsSpec(
    stringSpec: AbsoluteStringSpec,
  ): Array<number> {
    switch (stringSpec) {
      case 'allStrings':
        const r = Object.values(stringPositions)
          .map((_, idx) => idx)
          .reverse();
        console.log(r);
        return r;
      case 'string1':
        return [1];
      case 'string2':
        return [2];
      case 'string3':
        return [3];
      case 'string4':
        return [4];
      case 'string5':
        return [5];
      case 'string6':
        return [6];
    }
    throw new Error('unknown stirng specifier');
  }

  function getStringIndexFromRelSpec(relStringSpec: RelativeStringSpec, fromStringIdx: number): number {
    switch (relStringSpec) {
      case '1up':
        return fromStringIdx + 1;
      case '2up':
        return fromStringIdx + 2;
      case '3up':
        return fromStringIdx + 3;
      case '4up':
        return fromStringIdx + 4;
      case '5up':
        return fromStringIdx + 5;
      case '1down':
        return fromStringIdx - 1;
      case '2down':
        return fromStringIdx - 2;
      case '3down':
        return fromStringIdx - 3;
      case '4down':
        return fromStringIdx - 4;
      case '5down':
        return fromStringIdx - 5;
    }
  }

  function getFretIndexesFromAbsoluteFretSpec(
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
    return fretIndexes;
  }

  function getFretIndexAndNoteFromRelSpec(
    relFretSpec: RelativeFretSpec,
    fromFretIdx: number,
    fromNote: NoteClass,
    toStringIdx: number
  ): [toFretIdx: number, toNote: NoteClass]
  {
    const toStringNote = tuning.stringTunings[toStringIdx];
    console.log('t', toStringNote, toStringIdx);
    const fromNoteSameFretOnToString = addSemitones(toStringNote, fromFretIdx);
    const toNote = addInterval(fromNote, relFretSpec);
    const deltaFrets = getShortestDelta(fromNoteSameFretOnToString, toNote);
    
    return [ fromFretIdx + deltaFrets, toNote ];
  }

  function getStringPosY(idx: number): number {
    return Math.round(marginTop + (tuning.stringTunings.length - 1 - idx) * stringDistance);
  }

  function convertFromFretSpace(shape: FretShapeCoords) : [number, number][][] {
    let shapeHead = shape[0];
    let headStringSpec = shapeHead[0];
    let headFretSpec = shapeHead[1];

    let stringIndexes = getStringIndexesFromAbsSpec(headStringSpec);

    const gridCoordSets: Array<Array<[number, number]>> = [];

    stringIndexes.map((stringIdx) => {
      const startingFretIdxs = getFretIndexesFromAbsoluteFretSpec(
        tuning.stringTunings[stringIdx],
        headFretSpec,
      );
      
      startingFretIdxs.forEach((fretIdx) =>
        gridCoordSets.push([[stringIdx, fretIdx]]),
      );

    });

    const legalGridCoordSets: Array<Array<[number, number]>> = [];

    gridCoordSets.forEach((coordSet) => {
      const [_, ...shapeTail] = shape;
      if (!shapeTail) return;

      let [fromStringIdx, fromFretIdx] = coordSet[0];
      console.log(
        ';',
        [fromStringIdx, fromFretIdx],
        tuning.stringTunings[fromStringIdx],
      );
      let fromNote = addSemitones(tuning.stringTunings[fromStringIdx], fromFretIdx);

      let isLegalSet = true;

      for (const [relStringSpec, relFretSpec] of shapeTail) {
        
        const toStringIdx = getStringIndexFromRelSpec(relStringSpec, fromStringIdx);
        
        if (toStringIdx < 0 || toStringIdx >= tuning.stringTunings.length) {
          break;
        }

        const [ toFretIdx, toNote ] = getFretIndexAndNoteFromRelSpec(
          relFretSpec,fromFretIdx,fromNote,toStringIdx
        );
        
        coordSet.push([toStringIdx, toFretIdx]);

        fromNote = toNote;
        fromStringIdx = toStringIdx;
        fromFretIdx = toFretIdx;
      }

    });
    
    return gridCoordSets.map(coordSet =>
      coordSet.map(coord =>
        [
          getFretCenterPosX(coord[1]),
          getStringPosY(coord[0]),
        ]
      ));
    

  }

  function gridCoordSetToPathD(gridCoordSet: Array<[number, number]>): string {
    return 'M ' + gridCoordSet.map(coord => coord[0] + ' ' + coord[1] + ' ');
  }

  function getFretCenterPosX(fretIdx: number) {
    return Math.round(marginLeft + (.5 + fretIdx) * fretWidth);
  }

  const shapes = convertFromFretSpace([
    ['allStrings', 'e'],
    ['1up', 'maj3'],
    ['1up', 'min3'],
  ]);
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
          d={gridCoordSetToPathD(shape)}
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

