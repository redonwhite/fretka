import React from 'react';
import { SvgFretboardString } from './svg-fretboard-string';
import { observer } from 'mobx-react-lite';
import { FretboardDefinition } from "../../fretka/fretboard-definition";
import { LayerStore } from "../../store/layer-store";
import { SvgShapeLayer } from './svg-shape-layer';

import stylesSvg from './svg-fretboard.module.scss';

export const SvgFretboard = observer(
  (props: {
    fretboardDefinition: FretboardDefinition;
    layerStore: LayerStore;
  }) => {
    const { fretboardDefinition, layerStore } = props;

    return (
      <>
        <svg
          className={stylesSvg.fretboardSvg}
          style={{
            width: "100%",
            height: fretboardDefinition.svgHeight_px + "px",
          }}
        >
          <svg
            y={fretboardDefinition.marginTop_px + "px"}
            height={fretboardDefinition.fretboardHeight_px + "px"}
            width="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
//            vectorEffect="non-scaling-stroke"
          >
            <rect x={0} y="0" width="100" height="100" className={stylesSvg.fretboardHeadBg} />
            <rect x={100 / fretboardDefinition.fretCount} y="0" width="100" height="100" className={stylesSvg.fretboardBg} />
            {layerStore.shapeLayers.map(layer => (
              <SvgShapeLayer
                fretboardDefinition={fretboardDefinition}
                layer={layer}
                key={layer.id}
              />
            ))}
          </svg>
          {
            // frets:
            Array.from(Array(fretboardDefinition.fretCount + 1).keys()).map(
              (_, idx) => (
                <line
                  key={"fret" + idx}
                  id={"fret" + idx}
                  className={stylesSvg.fret}
                  stroke={fretboardDefinition.fretColor}
                  strokeWidth={idx === 0 ? 0 : idx === 1 ? 1 * fretboardDefinition.fretStrokeWidth : fretboardDefinition.fretStrokeWidth}
                  x1={fretboardDefinition.getFretPosX_percent(idx) + "%"}
                  x2={fretboardDefinition.getFretPosX_percent(idx) + "%"}
                  y1={fretboardDefinition.fretTopY_px}
                  y2={fretboardDefinition.fretBottomY_percent}
                  // shapeRendering="crispEdges"
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
                  fromX={fretboardDefinition.stringPosX_percent}
                  fromY={fretboardDefinition.getStringPosY_px(idx)}
                  toX={
                    fretboardDefinition.stringPosX_percent +
                    fretboardDefinition.fretboardWidth_percent
                  }
                  toY={fretboardDefinition.getStringPosY_px(idx)}
                  height={fretboardDefinition.stringDistance_px}
                  stringTuning={stringTuning}
                  fretCount={fretboardDefinition.fretCount}
                  strokeWidth={fretboardDefinition.stringStrokeWidth}
                />
              )
            )
          }
        </svg>
      </>
    );
  }
);
