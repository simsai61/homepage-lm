import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND_GRADIENT, COLORS } from "./theme";

export const FLASH_DURATION = 9;

/**
 * Der Schnitt zwischen zwei Projektfilmen: harter Schnitt plus ein Aufblitzen
 * im Markenverlauf. Liegt als Overlay ueber dem Schnittpunkt und verkuerzt
 * die Gesamtlaenge deshalb nicht.
 */
export const FlashCut: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage: BRAND_GRADIENT,
          opacity: interpolate(frame, [0, 2, FLASH_DURATION], [0, 0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.text,
          opacity: interpolate(frame, [0, 2, 5], [0, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
