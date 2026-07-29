import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Corporate Design von Ländle Blitz Marketing.
 * Werte identisch mit den CSS-Variablen der Website.
 */
export const COLORS = {
  bg: "#14171F",
  surface: "#1B1F2A",
  glow: "#E8628F",
  glowDim: "#6B3346",
  peach: "#F2A65A",
  magenta: "#C93C77",
  text: "#F2F1EA",
  muted: "#8A8F9E",
  line: "#2C3140",
} as const;

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #F2A65A 0%, #E8628F 55%, #C93C77 100%)";

export const DISPLAY = "Space Grotesk";
export const BODY = "Inter";
export const MONO = "IBM Plex Mono";

// Schriften aus assets/fonts (per Symlink in public/fonts).
// loadFont haelt den Render intern per delayRender an, bis die Datei da ist.
const font = (family: string, file: string, weight: string) => {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, format: "woff2" });
};

font(DISPLAY, "space-grotesk-600-latin.woff2", "600");
font(DISPLAY, "space-grotesk-700-latin.woff2", "700");
font(BODY, "inter-400-latin.woff2", "400");
font(BODY, "inter-500-latin.woff2", "500");
font(BODY, "inter-600-latin.woff2", "600");
font(MONO, "ibm-plex-mono-400-latin.woff2", "400");
font(MONO, "ibm-plex-mono-500-latin.woff2", "500");
