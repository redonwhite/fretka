import React from 'react';
import { SvgFretboardString } from './svg-fretboard-string';
import { observer } from 'mobx-react-lite';
import { FretboardDefinition } from '../../fretka/fretboard';
import { LayerStore } from "../../store/app-state";
import { SvgShapeLayer } from './svg-shape-layer';

import stylesSvg from './svg-fretboard.module.scss';

export const SvgFretboard = observer(
  (props: {
    fretboardDefinition: FretboardDefinition;
    layerStore: LayerStore;
  }) => {
    const { fretboardDefinition, layerStore } = props;

    return (
      <svg
        className={stylesSvg.fretSvg}
        style={{
          width: fretboardDefinition.svgWidth + "px",
          height: fretboardDefinition.svgHeight + "px",
        }}
      >
        {layerStore.shapeLayers.map(layer => (
          <SvgShapeLayer
            fretboardDefinition={fretboardDefinition}
            layer={layer}
            key={layer.id}
          />
        ))}
        {
          // frets:
          Array.from(Array(fretboardDefinition.fretCount + 1).keys()).map(
            (_, idx) => (
              <line
                key={"fret" + idx}
                id={"fret" + idx}
                className={stylesSvg.fret}
                stroke={fretboardDefinition.fretColor}
                strokeWidth={fretboardDefinition.fretStrokeWidth}
                x1={fretboardDefinition.getFretPosX(idx)}
                x2={fretboardDefinition.getFretPosX(idx)}
                y1={fretboardDefinition.fretTopY}
                y2={fretboardDefinition.fretBottomY}
                shapeRendering="crispEdges"
              />
            )
          )
        }
        {
          // strings, including note selections:
          Array.from(fretboardDefinition.tuning.stringTunings).map(
            (stringTuning, idx) => (
              <SvgFretboardString
                layerStore={layerStore}
                fretboardDefinition={fretboardDefinition}
                key={"string " + (idx + 1)}
                fromX={fretboardDefinition.stringPosX}
                fromY={fretboardDefinition.getStringPosY(idx)}
                toX={
                  fretboardDefinition.stringPosX +
                  fretboardDefinition.fretboardWidth
                }
                toY={fretboardDefinition.getStringPosY(idx)}
                height={fretboardDefinition.stringDistance}
                stringTuning={stringTuning}
                fretCount={fretboardDefinition.fretCount}
                strokeWidth={fretboardDefinition.stringStrokeWidth}
              />
            )
          )
        }
      </svg>
    );
  }
);
