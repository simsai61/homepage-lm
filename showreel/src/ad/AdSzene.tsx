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
import { BODY, BRAND_GRADIENT, COLORS } from "../showreel/theme";
import { AdMedium } from "./AdMedium";
import type { AdSzene as Szene } from "./adSzenen";
import { AdZeile } from "./AdText";

const SAFE_X = 80;

/**
 * Eine Szene der Anzeige: Filmausschnitt mit Aussage darüber.
 *
 * Die Schrift steht im oberen Drittel — anders als beim Showreel, wo die
 * Bauchbinde unten sitzt. Bei einer Anzeige liegt unten der Knopf zum
 * Formular, dazu Name und Text des Beitrags; alles unterhalb von etwa
 * 1480 px wird verdeckt oder zieht den Blick vom Knopf weg.
 *
 * Der Text erscheint in acht Bildern (0,27 s). Bei 2,17 s je Szene bleibt
 * sonst keine Zeit zum Lesen — und gelesen wird er, weil Anzeigen auf
 * Instagram überwiegend ohne Ton laufen.
 */
export const AdSzene: React.FC<{ readonly szene: Szene }> = ({ szene }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      <AdMedium medium={szene.medium} />

      {/* Abdunklung oben, damit die Aussage auf jedem Motiv lesbar bleibt */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(20,23,31,.92) 0%, rgba(20,23,31,.72) 34%, rgba(20,23,31,0) 62%)",
        }}
      />

      <AbsoluteFill style={{ padding: `104px ${SAFE_X}px 0`, alignItems: "flex-end" }}>
        <Img src={staticFile("logo.svg")} style={{ width: 230, opacity: 0.9 }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: `330px ${SAFE_X}px 0` }}>
        <Interactive.Div
          name="Aussage"
          style={{
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 12], ["0px 30px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div
            style={{
              height: 6,
              borderRadius: 3,
              marginBottom: 26,
              backgroundImage: BRAND_GRADIENT,
              width: interpolate(frame, [2, 16], [0, 120], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          {szene.zeilen.map((zeile) => (
            <AdZeile key={zeile} text={zeile} groesse={szene.groesse ?? 74} />
          ))}
          {szene.unterzeile ? (
            <div
              style={{
                marginTop: 18,
                fontFamily: BODY,
                fontWeight: 500,
                fontSize: 34,
                color: COLORS.text,
                opacity: interpolate(frame, [8, 18], [0, 0.8], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                textShadow: "0 2px 18px rgba(0,0,0,.7)",
              }}
            >
              {szene.unterzeile}
            </div>
          ) : null}
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
