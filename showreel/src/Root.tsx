import "./index.css";
import { Composition } from "remotion";
import { Showreel, SHOWREEL_DURATION } from "./showreel/Showreel";
import { ContactSheet } from "./tools/ContactSheet";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Hochkant 1080x1920 — Format fuer Instagram Reels und die Website */}
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={SHOWREEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Werkzeug zum Aussuchen der Anfangsbilder, nicht Teil des Films */}
      <Composition
        id="Kontaktbogen"
        component={ContactSheet}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1900}
        defaultProps={{ file: "hanako.mp4", seconds: 21 }}
      />
    </>
  );
};
