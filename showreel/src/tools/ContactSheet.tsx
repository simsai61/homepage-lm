import { Video } from "@remotion/media";
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { COLORS, MONO } from "../showreel/theme";

/**
 * Werkzeug, kein Teil des Films: legt einen Kontaktbogen eines Projektfilms an
 * (ein Standbild je Sekunde). Damit lassen sich brauchbare Anfangsbilder
 * aussuchen, ohne ffmpeg. Rendern z. B. mit:
 *
 *   npx remotion still Kontaktbogen out/bogen.png \
 *     --props='{"file":"hanako.mp4","seconds":21}'
 */
export type ContactSheetProps = {
  readonly file: string;
  readonly seconds: number;
  /** Erstes Standbild in Sekunden (Standard 0) */
  readonly ab?: number;
  /** Abstand zwischen den Standbildern in Sekunden (Standard 1) */
  readonly schritt?: number;
};

export const ContactSheet: React.FC<ContactSheetProps> = ({
  file,
  seconds,
  ab = 0,
  schritt = 1,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
      }}
    >
      {new Array(seconds).fill(true).map((_, i) => (
        <div key={i} style={{ width: 200, height: 380, position: "relative" }}>
          <Video
            src={staticFile(`videos/${file}`)}
            trimBefore={Math.round((ab + i * schritt) * 30)}
            muted
            objectFit="cover"
            style={{ width: 200, height: 356 }}
          />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              color: COLORS.text,
              textAlign: "center",
            }}
          >
            {(ab + i * schritt).toFixed(2)} s
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
