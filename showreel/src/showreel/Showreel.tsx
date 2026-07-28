import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from "react";
import { AbsoluteFill } from "remotion";
import { ClipScene } from "./ClipScene";
import { CLIP_DURATION, CLIPS } from "./clips";
import { FLASH_DURATION, FlashCut } from "./FlashCut";
import { Intro, INTRO_DURATION } from "./Intro";
import { Outro, OUTRO_DURATION } from "./Outro";
import { COLORS } from "./theme";

const FADE = 12;

export const SHOWREEL_DURATION =
  INTRO_DURATION +
  CLIPS.length * CLIP_DURATION +
  OUTRO_DURATION -
  2 * FADE; // Blenden ueberlappen und verkuerzen die Gesamtlaenge

/**
 * Der ganze Film: Blitz-Auftakt, acht Projektfilme mit Bauchbinde,
 * Abbinder mit Logo und Kontakt. Zwischen den Filmen wird hart geschnitten,
 * das Aufblitzen liegt als Overlay auf dem Schnitt.
 */
export const Showreel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />

        {CLIPS.flatMap((clip, i) => {
          const scene = (
            <TransitionSeries.Sequence
              key={clip.id}
              durationInFrames={CLIP_DURATION}
            >
              <ClipScene clip={clip} index={i} total={CLIPS.length} />
            </TransitionSeries.Sequence>
          );

          if (i === 0) {
            return [scene];
          }

          return [
            <TransitionSeries.Overlay
              key={`${clip.id}-flash`}
              durationInFrames={FLASH_DURATION}
            >
              <FlashCut />
            </TransitionSeries.Overlay>,
            scene,
          ];
        })}

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />

        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
