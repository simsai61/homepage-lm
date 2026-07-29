import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { COLORS, DISPLAY, MONO } from "./theme";
import { TrianglePattern } from "./TrianglePattern";

export const OUTRO_DURATION = 140;

/**
 * Eine Zeile der Headline. Die Zeile wird hinter einer Maske hochgeschoben.
 * Das Polster oben und unten (plus gleich grosser negativer Aussenabstand)
 * verhindert, dass die Maske Umlautpunkte und den Leuchtschein abschneidet —
 * derselbe Fallstrick wie im Hero der Website.
 */
const Line: React.FC<{
  readonly from: number;
  readonly color: string;
  readonly glow?: boolean;
  readonly children: React.ReactNode;
}> = ({ from, color, glow, children }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        overflow: "hidden",
        padding: "0.14em 0 0.1em",
        margin: "-0.14em 0 -0.1em",
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 92,
          lineHeight: 1.04,
          letterSpacing: "-0.015em",
          color,
          textShadow: glow ? "0 0 46px rgba(242,166,90,.55)" : undefined,
          // 118px ≈ eine Zeilenhöhe, die Zeile startet also knapp unter der Maske
          translate: interpolate(frame, [from, from + 18], ["0px 118px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Abbinder: die Hero-Headline der Website, darunter Logo und Direktkontakt.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TrianglePattern patternId="triOutro" />

      <Interactive.Div
        name="Headline"
        style={{ textAlign: "center", paddingInline: 80 }}
      >
        <Line from={0} color={COLORS.text}>
          SIE ERÖFFNEN.
        </Line>
        <Line from={6} color={COLORS.text}>
          WIR MACHEN SIE
        </Line>
        <Line from={12} color={COLORS.peach} glow>
          SICHTBAR.
        </Line>
      </Interactive.Div>

      <Interactive.Div
        name="Logo"
        style={{
          marginTop: 90,
          opacity: interpolate(frame, [40, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [40, 60], ["0px 22px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Img src={staticFile("logo.svg")} style={{ width: 540 }} />
      </Interactive.Div>

      <Interactive.Div
        name="Kontakt"
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 44,
          letterSpacing: "0.04em",
          color: COLORS.text,
          opacity: interpolate(frame, [58, 74], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [58, 78], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div>lm-agentur.at</div>
        <div>+43 664 372 48 08</div>
        <div style={{ color: COLORS.glow }}>@laendleblitzmarketing</div>
      </Interactive.Div>

      <Interactive.Div
        name="Claim"
        style={{
          position: "absolute",
          bottom: 150,
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 28,
          letterSpacing: "0.22em",
          color: COLORS.muted,
          opacity: interpolate(frame, [78, 94], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        WER NICHT WIRBT, STIRBT.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
