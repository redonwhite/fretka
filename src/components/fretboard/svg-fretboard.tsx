import React from 'react';
import stylesSvg from './svg-fretboard.module.scss';
import { SvgFretboardString } from './svg-fretboard-string';
import { observer } from 'mobx-react-lite';
import { FretboardDefinition } from '../../fretka/fretboard';

export const SvgFretboard = observer((props: {
  fretboardDefinition: FretboardDefinition
}) => {

  const { fretboardDefinition } = props;

  return (
    <svg
      className={stylesSvg.fretSvg}
      style={{
        width: fretboardDefinition.svgWidth + "px",
        height: fretboardDefinition.svgHeight + "px",
      }}
    >
      {/* {noteState.layers
        .filter(layer => layer.layerType === "shape")
        .map((layer, layerIdx) => {
          const layerAsShape = layer as ShapeLayerWithIndex;
          return (
            <SvgShapeLayer
              layer={layerAsShape}
              key={"shapelayer_" + layerIdx}
            />
          );
        })} */}
      {
        // frets:
        Array.from(Array(fretboardDefinition.fretCount + 1).keys()).map((_, idx) => (
          <line
            key={"fret" + idx}
            id={"fret" + idx}
            stroke="black"
            strokeWidth={fretboardDefinition.fretStrokeWidth}
            x1={fretboardDefinition.getFretPosX(idx)}
            x2={fretboardDefinition.getFretPosX(idx)}
            y1={fretboardDefinition.fretTopY}
            y2={fretboardDefinition.fretBottomY}
            shapeRendering="crispEdges"
          />
        ))
      }
      {
        // strings, including note selections:
        Array.from(fretboardDefinition.tuning.stringTunings).map((stringTuning, idx) => (
          <SvgFretboardString
            key={"string " + (idx + 1)}
            fromX={fretboardDefinition.stringPosX}
            fromY={fretboardDefinition.getStringPosY(idx)}
            toX={fretboardDefinition.stringPosX + fretboardDefinition.fretboardWidth}
            toY={fretboardDefinition.getStringPosY(idx)}
            height={fretboardDefinition.stringDistance}
            stringTuning={stringTuning}
            fretCount={fretboardDefinition.fretCount}
            strokeWidth={fretboardDefinition.stringStrokeWidth}
          />
        ))
      }
    </svg>
  );
});
