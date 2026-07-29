import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { FLASH_DURATION, FlashCut } from "../showreel/FlashCut";
import { COLORS } from "../showreel/theme";
import { AdEndkarte } from "./AdEndkarte";
import { AdSzene } from "./AdSzene";
import { AD_SZENEN, ENDKARTE_DAUER, SZENE_DAUER } from "./adSzenen";

export const AD_DAUER = AD_SZENEN.length * SZENE_DAUER + ENDKARTE_DAUER;

/**
 * Die Instagram-Anzeige: 15 Sekunden, fünf Szenen und eine Endkarte.
 *
 * Kein Vorspann und keine Blende am Anfang — anders als beim Showreel.
 * Bild eins ist bereits die Aussage; wer in den ersten beiden Sekunden nicht
 * hängen bleibt, wischt weiter. Auch zwischen den Szenen wird nur hart
 * geschnitten (mit dem Aufblitzen darauf), nichts wird überblendet: Blenden
 * kosten Zeit, und Zeit gibt es in einer Anzeige nicht.
 */
export const Ad: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Eigene Tonspur, erzeugt von scripts/musik-ad.mjs — vier Schläge je
          Szene, jeder Schnitt fällt auf eine Eins. Die Anzeige muss aber auch
          ohne Ton funktionieren, deshalb steht jede Aussage als Schrift im
          Bild. */}
      <Audio name="Musik" src={staticFile("audio/ad-musik.wav")} />

      <TransitionSeries>
        {AD_SZENEN.flatMap((szene, i) => {
          const bild = (
            <TransitionSeries.Sequence
              key={szene.id}
              durationInFrames={SZENE_DAUER}
            >
              <AdSzene szene={szene} />
            </TransitionSeries.Sequence>
          );

          if (i === 0) {
            return [bild];
          }

          return [
            <TransitionSeries.Overlay
              key={`${szene.id}-flash`}
              durationInFrames={FLASH_DURATION}
            >
              <FlashCut />
            </TransitionSeries.Overlay>,
            bild,
          ];
        })}

        <TransitionSeries.Overlay durationInFrames={FLASH_DURATION}>
          <FlashCut />
        </TransitionSeries.Overlay>

        <TransitionSeries.Sequence durationInFrames={ENDKARTE_DAUER}>
          <AdEndkarte />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
