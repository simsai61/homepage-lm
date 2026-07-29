import { Video } from "@remotion/media";
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
import { BRAND_GRADIENT, BODY, COLORS, DISPLAY, MONO } from "./theme";
import type { Clip } from "./clips";
import { CLIP_DURATION } from "./clips";

const SAFE_X = 80;

/**
 * Ein Projektfilm mit Bauchbinde.
 *
 * Der Ton der Originalclips ist stummgeschaltet: Es sind Handyaufnahmen von
 * der Baustelle (Wind, Maschinen, Gespraeche) und teils fremde Musik. Musik
 * wird beim Hochladen in Instagram/TikTok darunter gelegt — dort ist sie
 * lizenziert. Soll doch der Originalton laufen: `muted` entfernen.
 */
export const ClipScene: React.FC<{
  readonly clip: Clip;
  readonly index: number;
  readonly total: number;
}> = ({ clip, index, total }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      <Video
        name={clip.title}
        src={staticFile(`videos/${clip.file}`)}
        trimBefore={clip.startFrom}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          // Langsame Fahrt ins Bild, damit die Hochskalierung von 720p
          // auf 1080p nicht als Stillstand wirkt.
          scale: interpolate(frame, [0, CLIP_DURATION], [1, 1.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      />

      {/* Abdunklung oben und unten, damit Schrift auf jedem Motiv steht */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(20,23,31,.82) 0%, rgba(20,23,31,0) 22%, rgba(20,23,31,0) 48%, rgba(20,23,31,.92) 88%)",
        }}
      />

      <AbsoluteFill
        style={{
          padding: `104px ${SAFE_X}px 0`,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Interactive.Div
          name="Zaehler"
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: "0.2em",
            color: COLORS.text,
            opacity: 0.72,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Interactive.Div>

        <Img
          src={staticFile("logo.svg")}
          style={{ width: 300, opacity: 0.92 }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: `0 ${SAFE_X}px 300px`,
          justifyContent: "flex-end",
        }}
      >
        <Interactive.Div
          name="Bauchbinde"
          style={{
            opacity: interpolate(
              frame,
              [4, 18, CLIP_DURATION - 12, CLIP_DURATION],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            translate: interpolate(frame, [4, 22], ["0px 34px", "0px 0px"], {
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
              marginBottom: 30,
              backgroundImage: BRAND_GRADIENT,
              width: interpolate(frame, [8, 30], [0, 132], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
              color: COLORS.text,
            }}
          >
            {clip.title}
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: 38,
              lineHeight: 1.3,
              color: COLORS.text,
              opacity: 0.78,
            }}
          >
            {clip.subtitle}
          </div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
