import React from 'react';

export function SvgPatterns() {
  return (
    <svg style={{ position: 'absolute' }} width="0" height="0">
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

        <pattern
          id="lightStripePattern"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30) scale(.4)"
        >
          {/* <rect x="0" y="0" width="10" height="3" fill="black" /> */}
          <rect x="0" y="0" width="3" height="10" fill="darkgray" />
        </pattern>
      </defs>
    </svg>
  );
}
