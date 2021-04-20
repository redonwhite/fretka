import React from 'react';
import { layerColorsArray } from "../../fretka/layers/fretka-layer";

export function SvgPatterns() {
  return (
    <svg style={{ position: "absolute" }} width="0" height="0">
      {/* prettier-ignore */}
      <defs>
        {layerColorsArray.map((color, idx) => (
          <pattern
            key={idx}
            id={`beadsPattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-70) scale(2) "
          >
            <circle cx="0" cy="0" r="5" stroke={color.value} strokeWidth="8" strokeOpacity=".6" fill="none" />
            <circle cx="10" cy="10" r="5" stroke={color.value} strokeWidth="8" strokeOpacity=".6" fill="none"/>
          </pattern>
        ))}
        {layerColorsArray.map((color, idx) => (
          <pattern
            key={idx}
            id={`fansPattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30) scale(1.5) "
          >
            {/* <circle cx="0" cy="0" r="10" fill={color.value} fillOpacity=".2" /> */}
            <circle cx="10" cy="10" r="20" fill={color.value} fillOpacity=".1" />
            <circle cx="10" cy="10" r="10" fill={color.value} fillOpacity=".3" />
            <circle cx="10" cy="10" r="7" fill={color.value} fillOpacity=".5" />
            <circle cx="10" cy="10" r="4" fill={color.value} fillOpacity=".7" />
          </pattern>
        ))}
        {layerColorsArray.map((color, idx) => (
          <pattern
            key={idx}
            id={`wanStripesPattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45) scale(2)"
          >
            <rect x="0" y="0" width="5" height="10" fill={color.value} fillOpacity={.7}/>
            <rect x="5.5" y="0" width="1" height="10" fill={color.value} fillOpacity={.7}/>
            <rect x="7" y="0" width="1" height="10" fill={color.value} fillOpacity={.7}/>
            <rect x="8.5" y="0" width="1" height="10" fill={color.value} fillOpacity={.7}/>
          </pattern>
        ))}
        {layerColorsArray.map((color, idx) => (
          <pattern
            key={idx}
            id={`thickStripesPattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-45) scale(1)"
          >
            <rect x="0" y="0" width="9" height="10" fill={color.value} fillOpacity={.7}/>
          </pattern>
        ))}
        {layerColorsArray.map((color, idx) => (
          <pattern
            key={idx}
            id={`lightStripesPattern_${color.id}`}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30) scale(.4)"
          >
            <rect x="0" y="0" width="2" height="10" fill={color.value} />
          </pattern>
        ))}
      </defs>
    </svg>
  );
}
