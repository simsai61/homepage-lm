/**
 * Die acht Projektfilme. Reihenfolge wie auf der Website festgelegt
 * (Hanako zuerst), Titel und Unterzeile wortgleich mit den figcaptions
 * in lm-agentur-relaunch.html.
 *
 * startFrom = Startbild in der Quelldatei (30 fps), von Hand ausgesucht ueber
 * die Komposition "Kontaktbogen" (ein Standbild je Sekunde).
 *
 * Zwei Dinge waren dabei zu umgehen: Die meisten Clips enden mit einer weissen
 * Abbinder-Karte mit dem Logo (Hanako ab ca. 20 s, Can'ss ab 33 s, Stadion ab
 * 28 s) — die darf im Ausschnitt nicht mehr vorkommen. Und mehrere Clips
 * beginnen mit einer Ansprache in die Kamera, teils mit eingebrannten
 * Textzeilen; gezeigt wird stattdessen die Arbeit und das Ergebnis.
 */
export type Clip = {
  readonly id: string;
  readonly file: string;
  readonly title: string;
  readonly subtitle: string;
  readonly startFrom: number;
};

export const CLIP_DURATION = 130; // 4,33 s je Film

export const CLIPS: readonly Clip[] = [
  {
    id: "hanako",
    file: "hanako.mp4",
    title: "Hanako",
    subtitle: "Fensterfolierung, Wandgrafik, Schriftzug",
    startFrom: 435, // Schaufenster fertig foliert, Aussenansicht (14,5-18,8 s)
  },
  {
    id: "ct-pylon",
    file: "ct-pylon-montage.mp4",
    title: "CT Automotive · Pylon",
    subtitle: "Mit dem Kran gesetzt",
    startFrom: 270, // Pylon haengt am Kran und wird gesetzt (9,0-13,3 s)
  },
  {
    id: "bellanapoli",
    file: "bellanapoli-montage.mp4",
    title: "Bella Napoli, Dornbirn",
    subtitle: "Montage des Neonschilds",
    startFrom: 225, // Schriftzug wird montiert, dann leuchtet er (7,5-11,8 s)
  },
  {
    id: "canss",
    file: "sait-baustelle.mp4",
    title: "Can'ss, Feldkirch",
    subtitle: "Leuchtschild, Neon-Wandbild, Türgrafiken",
    startFrom: 405, // Neon-Wandbild wird gesetzt und geht an (13,5-17,8 s)
  },
  {
    id: "ct-buchstaben",
    file: "ct-buchstaben-montage.mp4",
    title: "CT Automotive · Fassade",
    subtitle: "3D-Buchstaben am Vordach",
    startFrom: 219, // 3D-Buchstaben werden am Vordach gesetzt (7,3-11,6 s)
  },
  {
    id: "messestand",
    file: "profigroup-messestand.mp4",
    title: "Profi Group · Messestand",
    subtitle: "Aufbau in der Messehalle",
    startFrom: 0, // Fertiger Messestand in der Halle (0-4,3 s)
  },
  {
    id: "stadion",
    file: "sait-stadion.mp4",
    title: "Werbebanden im Stadion",
    subtitle: "Sponsorentafeln beschriftet und montiert",
    startFrom: 600, // Beschriftete Werbebanden rund um das Spielfeld (20,0-24,3 s)
  },
  {
    id: "haus",
    file: "sait-buero.mp4",
    title: "Bei uns im Haus",
    subtitle: "Plotter, Transferpresse, 3D-Buchstaben",
    startFrom: 780, // Plotter, Druck, Folie wird entgittert (26,0-30,3 s)
  },
];
