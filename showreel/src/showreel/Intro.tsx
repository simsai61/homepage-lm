import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Bolt } from "./Bolt";
import { COLORS, MONO } from "./theme";
import { TrianglePattern } from "./TrianglePattern";

export const INTRO_DURATION = 75;

/**
 * Auftakt wie die Ladeanimation der Website: Der Blitz schlaegt ein,
 * es blitzt auf, danach flackert der Claim an und bleibt stehen.
 */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Neon-Flackern beim Anspringen des Claims — bewusst harte Aussetzer
  // auf einzelnen Bildern statt einer weichen Blende.
  const flicker = [16, 19, 24].includes(frame) ? 0.2 : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <TrianglePattern patternId="triIntro" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 70,
        }}
      >
        <Interactive.Div
          name="Blitz"
          style={{
            translate: interpolate(frame, [0, 8], ["0px -1100px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.32, 0, 0.12, 1),
            }),
            scale: interpolate(frame, [8, 26], [1.28, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 14 }),
              output: "perceptual-scale",
            }),
            filter: `drop-shadow(0 0 ${interpolate(frame, [8, 30], [90, 34], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px rgba(232,98,143,.55))`,
          }}
        >
          <Bolt gradientId="boltIntro" style={{ height: 540, width: 326 }} />
        </Interactive.Div>

        <Interactive.Div
          name="Claim"
          style={{
            opacity:
              flicker *
              interpolate(frame, [14, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            translate: interpolate(frame, [14, 26], ["0px 26px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 46,
            letterSpacing: "0.16em",
            color: COLORS.text,
            textShadow: "0 0 28px rgba(232,98,143,.75)",
            textAlign: "center",
          }}
        >
          WER NICHT WIRBT, STIRBT.
        </Interactive.Div>
      </AbsoluteFill>

      {/* Das Aufblitzen im Moment des Einschlags */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.text,
          opacity: interpolate(frame, [7, 9, 22], [0, 0.92, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
