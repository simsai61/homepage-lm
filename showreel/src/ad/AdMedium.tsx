import { Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { FlashCut } from "../showreel/FlashCut";
import { COLORS, MONO } from "../showreel/theme";
import type { AdMedium as Medium } from "./adSzenen";
import { SZENE_DAUER } from "./adSzenen";

/** Langsame Fahrt ins Bild, damit ein Standbild nicht steht */
const fahrt = (frame: number, von: number, bis: number, dauer: number) =>
  interpolate(frame, [0, dauer], [von, bis], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

const Etikett: React.FC<{ readonly text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      left: 80,
      bottom: 520,
      padding: "14px 26px",
      borderRadius: 999,
      border: `2px solid ${COLORS.line}`,
      backgroundColor: "rgba(20,23,31,.82)",
      fontFamily: MONO,
      fontWeight: 500,
      fontSize: 30,
      letterSpacing: "0.22em",
      color: COLORS.text,
    }}
  >
    {text}
  </div>
);

/**
 * Das Bildmaterial einer Szene: Filmausschnitt, Standbild oder ein
 * Vorher/Nachher-Paar.
 *
 * Vorher/Nachher ist der stärkste Beweis, den Werbetechnik hat — man sieht in
 * zwei Sekunden, was gemacht wurde. Umgeschaltet wird hart, mit demselben
 * Aufblitzen wie an den Schnitten; eine weiche Blende würde den Vergleich
 * verwischen.
 */
export const AdMedium: React.FC<{ readonly medium: Medium }> = ({ medium }) => {
  const frame = useCurrentFrame();

  if (medium.art === "video") {
    return (
      <Video
        src={staticFile(`videos/${medium.file}`)}
        trimBefore={medium.startFrom}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          scale: fahrt(frame, 1.03, 1.09, SZENE_DAUER),
        }}
      />
    );
  }

  if (medium.art === "bild") {
    return (
      <Img
        src={staticFile(`bilder/${medium.datei}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: medium.position ?? "center",
          scale: fahrt(frame, 1.04, 1.12, SZENE_DAUER),
        }}
      />
    );
  }

  const nachher = frame >= medium.wechselBei;

  return (
    <AbsoluteFill>
      <Img
        src={staticFile(
          `bilder/${nachher ? medium.nachher : medium.vorher}`,
        )}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition:
            (nachher ? medium.nachherPosition : medium.vorherPosition) ??
            "center",
          scale: nachher
            ? fahrt(frame - medium.wechselBei, 1.04, 1.1, SZENE_DAUER - medium.wechselBei)
            : fahrt(frame, 1.04, 1.09, medium.wechselBei),
        }}
      />
      <Etikett text={nachher ? "NACHHER" : "VORHER"} />
      <Sequence from={medium.wechselBei - 2} durationInFrames={9} layout="none">
        <FlashCut />
      </Sequence>
    </AbsoluteFill>
  );
};
