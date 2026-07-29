import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./theme";

/**
 * Das Dreiecksmuster der Visitenkarte, wie auf der Website als Eckelement
 * oben rechts. Pattern-ID je Einsatzort eindeutig halten.
 */
export const TrianglePattern: React.FC<{
  readonly patternId: string;
  readonly opacity?: number;
}> = ({ patternId, opacity = 0.16 }) => {
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern
            id={patternId}
            width={52}
            height={46}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M26 0 L52 46 L0 46 Z"
              fill="none"
              stroke={COLORS.glow}
              strokeWidth={2}
            />
          </pattern>
          <linearGradient id={`${patternId}-mask`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="55%" stopColor="white" stopOpacity={0} />
          </linearGradient>
          <mask id={`${patternId}-m`}>
            <rect
              width="100%"
              height="100%"
              fill={`url(#${patternId}-mask)`}
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={`url(#${patternId}-m)`}
        />
      </svg>
    </AbsoluteFill>
  );
};
