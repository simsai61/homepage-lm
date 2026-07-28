/**
 * Die fünf Szenen der Instagram-Anzeige.
 *
 * Aufbau der Argumentation — bewusst in dieser Reihenfolge:
 *   1. Hook: der Termin, unter dem der Zuschauer selbst steht
 *   2./3./4. die Rechnung, die er noch nicht gemacht hat (echte Vorlaufzeiten)
 *   5. die Antwort darauf: alles aus einer Hand
 *   danach die Endkarte mit dem Aufruf zum Formular
 *
 * Alle Zahlen stammen aus den tatsächlichen Vorlaufzeiten (siehe CLAUDE.md):
 * Leuchtschild 3 Wochen Produktion / 7 Wochen gesamt, Pylon und Komplettpaket
 * 5 / 9. Nichts davon ist aufgerundet oder erfunden — die Anzeige verspricht
 * genau das, was der Zeitplaner auf der Website auch rechnet.
 *
 * `*Sternchen*` heben ein Wort im Markenton hervor.
 * `startFrom` ist das Startbild in der Quelldatei (30 Bilder je Sekunde),
 * ausgesucht wie beim Showreel über die Komposition "Kontaktbogen".
 */
export type AdSzene = {
  readonly id: string;
  readonly file: string;
  readonly startFrom: number;
  readonly zeilen: readonly string[];
  readonly unterzeile?: string;
};

export const SZENE_DAUER = 65; // 2,17 s — vier Schläge der Tonspur
export const ENDKARTE_DAUER = 130; // 4,33 s

export const AD_SZENEN: readonly AdSzene[] = [
  {
    id: "hook",
    file: "ct-pylon-montage.mp4",
    startFrom: 306, // Pylon haengt scharf am Kran — staerkstes Bild zuerst
    zeilen: ["ERÖFFNUNG IN", "*6 WOCHEN*?"],
  },
  {
    id: "produktion",
    file: "bellanapoli-montage.mp4",
    startFrom: 255, // der Schriftzug leuchtet
    zeilen: ["IHR LEUCHTSCHILD", "BRAUCHT *3 DAVON*."],
    unterzeile: "reine Produktionszeit",
  },
  {
    id: "dazu",
    file: "hanako.mp4",
    startFrom: 435, // fertig foliertes Schaufenster
    zeilen: ["DAZU GESTALTUNG,", "AUFMASS, MONTAGE."],
  },
  {
    id: "vorlauf",
    file: "sait-baustelle.mp4",
    startFrom: 444, // Neon-Schriftzug im Lokal, angezuendet
    zeilen: ["MACHT *7 BIS 9*", "*WOCHEN* VORLAUF."],
    unterzeile: "Leuchtschild 7 · Pylon 9 · Komplettpaket 9",
  },
  {
    id: "handwerk",
    file: "sait-buero.mp4",
    startFrom: 780, // eigene Produktion, Plotter
    zeilen: ["*ALLES AUS*", "*EINER HAND.*"],
    unterzeile: "Logo · Schilder · Fahrzeug · Kleidung",
  },
];
