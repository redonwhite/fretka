import React, { useMemo } from 'react';
import type { GuitarTuning, guitarTunings } from '../../fretka/notes';
import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import { FretboardContext, useFretboard } from '../../fretka/fretboard';
import { useSelector } from 'react-redux';
import { noteStateSelector } from '../../fretka/store';
import { SvgFretSpaceShape } from './svg-fret-space-shape';
import type { ShapeLayer } from '../../fretka/layers';



export function SvgFretboard(props: {
  tuning: GuitarTuning;
  fretCount?: number;
}) {
  const { tuning } = props;
  const f = useFretboard(tuning, props.fretCount);
  const noteState = useSelector(noteStateSelector);

  return (
    <FretboardContext.Provider value={f}>
      <svg
        className={stylesSvg.fretSvg}
        style={{ width: f.svgWidth + 'px', height: f.svgHeight + 'px' }}
      >
        {noteState.layers
          .filter((layer) => layer.layerType === 'shape')
          .map((layer, layerIdx) => {
            console.log(layer);
            return (
              <SvgFretSpaceShape
                shape={(layer as ShapeLayer).shape}
                key={'shape_' + layerIdx}
              />
            );
          })}
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
          // strings, including note selections:
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

