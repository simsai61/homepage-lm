/**
 * Die vier Szenen der Instagram-Anzeige.
 *
 * Aufbau der Argumentation — bewusst in dieser Reihenfolge:
 *   1. Hook: der Termin, unter dem der Zuschauer selbst steht
 *   2. der Beweis: dasselbe Lokal vorher und nachher
 *   3./4. was er davon hat — einer statt fünf Firmen, ein Auftritt
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
 * `groesse` nur setzen, wenn eine Zeile sonst zu breit wird (Standard 74).
 */

/** Was in der Szene zu sehen ist */
export type AdMedium =
  | {
      readonly art: "video";
      readonly file: string;
      /** Startbild in der Quelldatei (30 Bilder je Sekunde), von Hand gewählt */
      readonly startFrom: number;
    }
  | {
      readonly art: "bild";
      readonly datei: string;
      /** Bildausschnitt, falls die Mitte nicht das Wichtigste zeigt */
      readonly position?: string;
    }
  | {
      readonly art: "vorher-nachher";
      readonly vorher: string;
      readonly nachher: string;
      readonly vorherPosition?: string;
      readonly nachherPosition?: string;
      /** Bild, auf dem umgeschaltet wird (innerhalb der Szene) */
      readonly wechselBei: number;
    };

export type AdSzene = {
  readonly id: string;
  readonly medium: AdMedium;
  readonly zeilen: readonly string[];
  readonly unterzeile?: string;
  readonly groesse?: number;
};

// Tempo: Die erste Fassung lief mit 2,17 s je Szene. Zu schnell — die Bilder
// wechselten, bevor der Text gelesen war. Jetzt acht Schläge (4,33 s) je Szene
// und zwölf für die Endkarte. Dafür ist eine Szene weggefallen, sonst wäre die
// Anzeige auf 26 Sekunden gewachsen: „pünktlich zur Eröffnung" steckt jetzt in
// der Unterzeile der letzten Szene.
export const SZENE_DAUER = 130; // 4,33 s — acht Schläge der Tonspur
export const ENDKARTE_DAUER = 195; // 6,5 s — Zeit zum Lesen vor dem Formular

export const AD_SZENEN: readonly AdSzene[] = [
  {
    id: "hook",
    medium: {
      art: "bild",
      // Aus dem Kranmaterial laesst sich kein ruhiges Bild schneiden: die
      // laengste stillstehende Stelle dauert eine halbe Sekunde, dazwischen
      // liegt jedes Mal eine Schwenkunschaerfe. Das Foto desselben Pylons
      // steht dagegen so lange, wie der Text zum Lesen braucht.
      datei: "ct-automotive-pylon-1.webp",
    },
    zeilen: ["ERÖFFNUNG IN", "*6 WOCHEN*?"],
  },
  {
    id: "beweis",
    medium: {
      art: "vorher-nachher",
      vorher: "ay-vorher.webp",
      nachher: "ay-nachher.webp",
      // Das Vorher-Foto ist querformatig: der Hochkant-Ausschnitt zeigt nur
      // knapp die Haelfte der Breite. Ohne die Verschiebung nach links faellt
      // der Schriftzug des alten Vordachs ganz aus dem Bild.
      // (Die zweite Zahl bleibt wirkungslos — bei diesem Seitenverhaeltnis
      // beschneidet "cover" nur waagrecht.)
      vorherPosition: "30% 50%",
      wechselBei: 55, // 1,8 s vorher, 2,5 s nachher
    },
    zeilen: ["*IN 6 WOCHEN*", "STEHT ALLES."],
    unterzeile: "AY Restaurant · neues Vordach, neue Leuchtschrift",
  },
  {
    id: "ansprechpartner",
    medium: {
      art: "bild",
      datei: "sait-portrait.webp", // Sait auf dem Geruest, hinter seinem Banner
    },
    zeilen: ["*EINER* KÜMMERT SICH.", "NICHT FÜNF FIRMEN."],
    unterzeile: "Sie bekommen den Chef, kein Callcenter.",
    groesse: 62,
  },
  {
    id: "auftritt",
    medium: {
      art: "video",
      file: "sait-baustelle.mp4",
      startFrom: 444, // Neon-Schriftzug im Lokal, angezuendet
    },
    zeilen: ["ALLES IM", "*GLEICHEN LOOK*."],
    unterzeile: "Vom Logo bis zum Firmenauto · pünktlich zur Eröffnung",
  },
];
