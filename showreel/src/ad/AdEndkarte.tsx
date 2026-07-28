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
import { BODY, COLORS, DISPLAY, MONO } from "../showreel/theme";
import { TrianglePattern } from "../showreel/TrianglePattern";

/**
 * Die Endkarte — der Teil, an dem die Anzeige verdient oder nicht.
 *
 * Vier Dinge, in dieser Reihenfolge und mit Absicht:
 *   1. eine Frage, die der Zuschauer sich selbst stellt
 *   2. was er tun soll, in einem Satz, mit dem, was er dafür bekommt
 *   3. was es kostet: nichts, unverbindlich (die häufigste Bremse)
 *   4. der Zeigefinger auf den Knopf, der unter der Anzeige sitzt
 *
 * Der Bereich unterhalb von etwa 1480 px bleibt frei: Dort blendet Instagram
 * den Knopf zum Formular ein. Der Pfeil zeigt genau dorthin.
 */
export const AdEndkarte: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "500px 80px 0",
      }}
    >
      <TrianglePattern patternId="triAd" />

      <Interactive.Div
        name="Frage"
        style={{
          textAlign: "center",
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 86,
          lineHeight: 1.06,
          letterSpacing: "-0.015em",
          color: COLORS.text,
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 20], ["0px 26px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        REICHT IHRE
        <br />
        ZEIT NOCH<span style={{ color: COLORS.peach }}>?</span>
      </Interactive.Div>

      <Interactive.Div
        name="Aufforderung"
        style={{
          marginTop: 34,
          maxWidth: 800,
          textAlign: "center",
          fontFamily: BODY,
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1.34,
          color: COLORS.text,
          opacity: interpolate(frame, [14, 28], [0, 0.88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Eröffnungstermin eintragen — wir sagen Ihnen, was bis dahin steht.
      </Interactive.Div>

      <Interactive.Div
        name="Kostenhinweis"
        style={{
          marginTop: 26,
          fontFamily: MONO,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: "0.16em",
          color: COLORS.glow,
          opacity: interpolate(frame, [30, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        KOSTENLOS UND UNVERBINDLICH
      </Interactive.Div>

      <Interactive.Div
        name="Logo"
        style={{
          marginTop: 60,
          opacity: interpolate(frame, [46, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Img src={staticFile("logo.svg")} style={{ width: 420 }} />
      </Interactive.Div>

      {/* Zeigt auf den Knopf, den Instagram unter der Anzeige einblendet */}
      <Interactive.Div
        name="Hinweis auf das Formular"
        style={{
          position: "absolute",
          bottom: 430,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: interpolate(frame, [62, 78], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          // Ruhiges Auf und Ab, damit der Blick dem Pfeil folgt
          translate: `0px ${(Math.sin((frame - 62) / 8) * 9).toFixed(2)}px`,
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 42,
            letterSpacing: "0.01em",
            color: COLORS.text,
          }}
        >
          Formular ausfüllen
        </div>
        <svg width={64} height={64} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v14m0 0 6-6m-6 6-6-6"
            stroke={COLORS.peach}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
