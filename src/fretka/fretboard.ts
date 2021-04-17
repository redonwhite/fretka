import React, { useMemo } from 'react';
import type { GuitarTuning } from './notes';
import type { GridSpaceCoordSet, XyCoordSet } from './shapes';

export type FretboardDef = ReturnType<typeof useFretboard>;
export const FretboardContext = React.createContext<FretboardDef | null>(null);

export function useFretboard(tuning: GuitarTuning, fretCount: number = 24) {
  const fretboard = useMemo(() => {
    const stringDistance = 25;
    const fretboardWidth = 1398;
    const marginTop = 50;
    const marginLeft = 1;
    const stringStrokeWidth = 2;
    const fretStrokeWidth = 2;

    const marginBottom = marginTop;
    const marginRight = marginLeft;
    const stringCount = tuning.stringTunings.length;
    const fretboardHeight = (stringCount - 1) * stringDistance - 1;
    const fretWidth = fretboardWidth / fretCount;

    const svgWidth = marginLeft + fretboardWidth + marginRight;
    const svgHeight = marginTop + fretboardHeight + marginBottom;
    const stringPosX = Math.round(marginLeft);

    function getFretCenterPosX(fretIdx: number) {
      return Math.round(marginLeft + (0.5 + fretIdx) * fretWidth);
    }

    function getFretPosX(fretIdx: number) {
      return Math.round(marginLeft + fretIdx * fretWidth);
    }

    function getStringPosY(idx: number): number {
      return Math.round(
        marginTop + (tuning.stringTunings.length - 1 - idx) * stringDistance
      );
    }

    const fretTopY = getStringPosY(tuning.stringTunings.length - 1);
    const fretBottomY = getStringPosY(0);

    function gridSpaceToXySpace(coordSet: GridSpaceCoordSet): XyCoordSet {
      return coordSet.map(coord => [
        getFretCenterPosX(coord[1]),
        getStringPosY(coord[0]),
      ]);
    }

    return {
      gridSpaceToXySpace,
      getFretCenterPosX,
      getFretPosX,
      getStringPosY,
      svgHeight,
      svgWidth,
      fretCount,
      fretTopY,
      fretBottomY,
      fretStrokeWidth,
      stringDistance,
      stringStrokeWidth,
      stringPosX,
      fretboardWidth,
      fretboardHeight,
      tuning,
    };
  }, [fretCount, tuning]);
  return fretboard;
}
