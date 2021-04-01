import React, { useMemo } from 'react';
import type { GuitarTuning, guitarTunings } from '../../fretka/notes';

import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import type {
  GridSpaceCoordSet,
  XyCoordSet,
} from '../../fretka/shapes';


export const FretboardContext = React.createContext<FretboardDef|null>(null);

export type FretboardDef = ReturnType<typeof useFretboard>;

export function useFretboard(tuning: GuitarTuning, fretCount: number = 24) {
  const fretboard = useMemo(() => {
    const stringDistance = 25;
    const fretboardWidth = 1398;
    const marginTop = 20;
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
        marginTop + (tuning.stringTunings.length - 1 - idx) * stringDistance,
      );
    }

    const fretTopY = getStringPosY(tuning.stringTunings.length - 1);
    const fretBottomY = getStringPosY(0);

    function gridSpaceToXySpace(coordSet: GridSpaceCoordSet): XyCoordSet {
      return coordSet.map((coord) => [
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
    }
  }, [fretCount, tuning]);
  return fretboard;
}

export function Fretboard(props: { tuning: GuitarTuning; fretCount?: number }) {
  const { tuning } = props;
  const f = useFretboard(tuning, props.fretCount);

  function xyCoordSetToPathD(xyCoordSet: XyCoordSet): string {
    return 'M ' + xyCoordSet.map(coord => coord[0] + ' ' + coord[1] + ' ');
  }

  // const shapes = specSpaceToGridSpace(
  //   testShapeSpec, tuning, fretCount
  // ).map(
  //   gridCoordSet => gridSpaceToXySpace(gridCoordSet)
  // );
  
  return (
    <FretboardContext.Provider value={f}>
      <svg
        className={stylesSvg.fretSvg}
        style={{ width: f.svgWidth + 'px', height: f.svgHeight + 'px' }}
      >
        {/* {shapes.map((shape, idx) => (
          <path
            stroke="red"
            strokeWidth="4"
            fill="none"
            d={xyCoordSetToPathD(shape)}
            key={idx}
          />
        ))} */}
        {
          // frets:
          Array.from(Array(f.fretCount + 1).keys()).map((_, idx) => (
            <line
              key={'fret' + idx}
              id={'fret' + idx}
              stroke="black"
              strokeWidth={f.fretStrokeWidth}
              x1={f.getFretPosX(idx)}
              x2={f.getFretPosX(idx)}
              y1={f.fretTopY}
              y2={f.fretBottomY}
              shapeRendering="crispEdges"
            />
          ))
        }
        {
          // strings:
          Array.from(tuning.stringTunings).map((tuning, idx) => (
            <SvgFretboardString
              key={'string' + idx}
              fromPoint={{
                x: f.stringPosX,
                y: f.getStringPosY(idx),
              }}
              toPoint={{
                x: f.stringPosX + f.fretboardWidth,
                y: f.getStringPosY(idx),
              }}
              height={f.stringDistance}
              tuning={tuning}
              fretCount={f.fretCount}
              strokeWidth={f.stringStrokeWidth}
            />
          ))
        }
      </svg>
    </FretboardContext.Provider>
  );
}

