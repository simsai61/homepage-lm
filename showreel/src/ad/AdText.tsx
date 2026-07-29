import React from "react";
import { COLORS, DISPLAY } from "../showreel/theme";

/**
 * Eine Textzeile der Anzeige. Was zwischen *Sternchen* steht, wird im
 * Markenton hervorgehoben — so lässt sich der Text in `adSzenen.ts` ändern,
 * ohne im Markup zu hantieren.
 */
export const AdZeile: React.FC<{
  readonly text: string;
  readonly groesse: number;
}> = ({ text, groesse }) => {
  const teile = text.split("*");

  return (
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: groesse,
        lineHeight: 1.08,
        letterSpacing: "-0.015em",
        color: COLORS.text,
        textShadow: "0 3px 26px rgba(0,0,0,.6)",
      }}
    >
      {teile.map((teil, i) =>
        i % 2 === 1 ? (
          <span key={i} style={{ color: COLORS.peach }}>
            {teil}
          </span>
        ) : (
          <React.Fragment key={i}>{teil}</React.Fragment>
        ),
      )}
    </div>
  );
};
