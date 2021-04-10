import React from 'react';
import { layerColorsArray } from "../../fretka/layers";


export function SvgPatterns() {
  return (
    <svg style={{ position: "absolute" }} width="0" height="0">
      <defs>
        <pattern
          id="pj1"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(20) scale(2)"
        >
          <rect x="0" y="0" width="10" height="8" fill="red" opacity=".2" />
          <rect x="0" y="0" width="8" height="10" fill="red" opacity=".2" />
        </pattern>
        {layerColorsArray.map(color => (
          <pattern
            id={`lightStripePattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30) scale(.4)"
          >
            {/* <rect x="0" y="0" width="10" height="3" fill="black" /> */}
            <rect x="0" y="0" width="3" height="10" fill={ color.value } />
          </pattern>
        ))}
      </defs>
    </svg>
  );
}
