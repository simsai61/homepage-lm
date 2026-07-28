/**
 * Die fünf Szenen der Instagram-Anzeige.
 *
 * Aufbau der Argumentation — bewusst in dieser Reihenfolge:
 *   1. Hook: der Termin, unter dem der Zuschauer selbst steht
 *   2. das Versprechen: in sechs Wochen steht alles
 *   3./4./5. was er davon hat — einer statt fünf, ein Auftritt, pünktlich
 *   danach die Endkarte mit dem Aufruf zum Formular
 *
 * Die erste Fassung erklärte dem Zuschauer nur sein Problem (Vorlaufzeiten,
 * die er nicht mehr schafft) und ließ offen, warum er ausgerechnet hier
 * kaufen soll. Jetzt steht in jeder Szene ein Nutzen.
 *
 * ACHTUNG, ZAHL MIT FOLGEN: Die Anzeige nennt **6 Wochen gesamt**. Der
 * Zeitplaner auf der Website rechnet mit 7 Wochen (Leuchtschild) und
 * 9 Wochen (Pylon, Komplettpaket). Beide Zahlen sehen dieselben Leute.
 * Wer hier etwas ändert, muss den Zeitplaner mitziehen — oder umgekehrt.
 *
 * Alles Übrige ist belegt: Montage macht Sait selbst, Arbeitsbekleidung,
 * Werbeartikel und Folierung entstehen im Haus, gegründet 2018.
 *
 * `*Sternchen*` heben ein Wort im Markenton hervor.
 * `startFrom` ist das Startbild in der Quelldatei (30 Bilder je Sekunde),
 * ausgesucht wie beim Showreel über die Komposition "Kontaktbogen".
 * `groesse` nur setzen, wenn eine Zeile sonst zu breit wird (Standard 74).
 */
export type AdSzene = {
  readonly id: string;
  readonly file: string;
  readonly startFrom: number;
  readonly zeilen: readonly string[];
  readonly unterzeile?: string;
  readonly groesse?: number;
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
    id: "versprechen",
    file: "hanako.mp4",
    startFrom: 435, // fertig foliertes Schaufenster — das Ergebnis
    zeilen: ["*IN 6 WOCHEN*", "STEHT ALLES."],
    unterzeile: "Logo · Schilder · Fahrzeug · Arbeitskleidung",
  },
  {
    id: "ansprechpartner",
    file: "sait-buero.mp4",
    startFrom: 648, // Sait an der Presse, am Ende haelt er das fertige Shirt
    zeilen: ["*EINER* KÜMMERT SICH.", "NICHT FÜNF FIRMEN."],
    unterzeile: "Sie bekommen den Chef, kein Callcenter.",
    groesse: 62,
  },
  {
    id: "auftritt",
    file: "sait-baustelle.mp4",
    startFrom: 444, // Neon-Schriftzug im Lokal, angezuendet
    zeilen: ["ALLES IM", "*GLEICHEN LOOK*."],
    unterzeile: "Vom Logo bis zur Fahrzeugbeschriftung",
  },
  {
    id: "puenktlich",
    file: "bellanapoli-montage.mp4",
    startFrom: 255, // der Schriftzug leuchtet
    zeilen: ["PÜNKTLICH ZUR", "*ERÖFFNUNG*."],
    unterzeile: "Montage macht der Chef selbst · seit 2018",
  },
];
