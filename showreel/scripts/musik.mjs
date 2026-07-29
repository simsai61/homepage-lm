/**
 * Erzeugt die Tonspur des Showreels: public/audio/showreel-musik.wav
 *
 *   node scripts/musik.mjs
 *
 * Warum selbst gebaut und nicht eingekauft: Musik aus einer Bibliothek braucht
 * eine Lizenz, Musik aus Instagram darf nicht in einer eigenen Datei landen.
 * Diese Spur entsteht rein rechnerisch aus Sinus- und Rauschgeneratoren
 * (siehe klang.mjs) — daran hat niemand Rechte.
 *
 * Das Tempo ist kein Zufall: Ein Schlag dauert 16,25 Einzelbilder, acht Schläge
 * sind damit genau ein Projektfilm (130 Bilder). Jeder Schnitt fällt auf eine
 * Eins, jeder Film bekommt seinen eigenen Akkord.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HZ, neueSpur } from "./klang.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const ZIEL = join(HIER, "..", "public", "audio", "showreel-musik.wav");

const FPS = 30;

// Muss mit src/showreel/ uebereinstimmen
const INTRO = 75;
const CLIP = 130;
const ANZAHL_CLIPS = 8;
const OUTRO = 140;
const BLENDE = 12;

const GESAMT_BILDER = INTRO + ANZAHL_CLIPS * CLIP + OUTRO - 2 * BLENDE;
const ERSTER_CLIP = INTRO - BLENDE; // Bild, auf dem der erste Film beginnt

const SCHLAG = CLIP / 8 / FPS; // 0,5417 s — acht Schlaege je Film
const NULL_ZEIT = ERSTER_CLIP / FPS; // die erste Eins liegt auf dem ersten Schnitt
const DAUER = GESAMT_BILDER / FPS + 0.1;

const zeit = (schlag) => NULL_ZEIT + schlag * SCHLAG;

const spur = neueSpur({ dauer: DAUER });
const { kick, klatschen, hut, bass, flaeche, zupfen, einschlag, anlauf } = spur;

// Ein Akkord je Projektfilm, c-Moll
const AKKORDE = [
  { grund: HZ.C2, toene: [HZ.C3, HZ.Eb3, HZ.G3], arp: [HZ.C4, HZ.Eb4, HZ.G4, HZ.Eb4] },
  { grund: HZ.Ab2, toene: [HZ.Ab3, HZ.C4, HZ.Eb4], arp: [HZ.Ab4, HZ.C4, HZ.Eb4, HZ.C4] },
  { grund: HZ.Eb2, toene: [HZ.Eb3, HZ.G3, HZ.Bb3], arp: [HZ.Eb4, HZ.G4, HZ.Bb4, HZ.G4] },
  { grund: HZ.Bb2, toene: [HZ.Bb3, HZ.Eb4, HZ.G4], arp: [HZ.Bb4, HZ.G4, HZ.Eb4, HZ.G4] },
  { grund: HZ.C2, toene: [HZ.C3, HZ.Eb3, HZ.G3], arp: [HZ.C4, HZ.G4, HZ.Eb4, HZ.G4] },
  { grund: HZ.Ab2, toene: [HZ.Ab3, HZ.C4, HZ.Eb4], arp: [HZ.C4, HZ.Ab4, HZ.Eb4, HZ.Ab4] },
  { grund: HZ.Eb2, toene: [HZ.Eb3, HZ.G3, HZ.Bb3], arp: [HZ.Bb4, HZ.Eb4, HZ.G4, HZ.Eb4] },
  { grund: HZ.Bb2, toene: [HZ.Bb3, HZ.Eb4, HZ.G4], arp: [HZ.Bb4, HZ.Eb4, HZ.G4, HZ.Bb4] },
];

// Vorlauf: der Blitz schlaegt ein, danach zieht das Rauschen zur ersten Eins
einschlag(8 / FPS, 1.15);
flaeche(0.1, NULL_ZEIT - 0.1, [HZ.C3, HZ.Eb3, HZ.G3], 0.8);
anlauf(0.35, NULL_ZEIT - 0.35, 0.85);

for (let c = 0; c < ANZAHL_CLIPS; c++) {
  const akkord = AKKORDE[c];
  const start = c * 8;

  // Aufbau: die ersten beiden Filme bleiben ruhig, ab dann kommt das Schlagwerk
  const trommeln = c >= 2;
  const voll = c >= 4;

  einschlag(zeit(start), c === 0 ? 0.9 : 0.6);
  flaeche(zeit(start), 8 * SCHLAG, akkord.toene, voll ? 1 : 0.8);

  for (let b = 0; b < 8; b++) {
    const t = zeit(start + b);

    bass(t, SCHLAG * 0.9, akkord.grund, voll ? 1 : 0.75);
    if (b % 2 === 1) bass(t + SCHLAG * 0.5, SCHLAG * 0.4, akkord.grund * 2, 0.35);

    if (trommeln) {
      kick(t, voll ? 1 : 0.8);
      if (b % 4 === 2) klatschen(t, voll ? 1 : 0.7);
      hut(t + SCHLAG * 0.5, 0.9, b % 2 === 0 ? -0.35 : 0.35);
      if (voll) hut(t + SCHLAG * 0.25, 0.4, 0.2);
    }

    // Achtel-Figur aus den Akkordtoenen
    if (c >= 1) {
      zupfen(t, akkord.arp[b % 4], voll ? 1 : 0.7, -0.25);
      if (voll) zupfen(t + SCHLAG * 0.5, akkord.arp[(b + 2) % 4], 0.6, 0.3);
    }
  }
}

// Abbinder: letzter Schlag auf den Schnitt, dann steht nur noch die Flaeche
const AB = ANZAHL_CLIPS * 8;
einschlag(zeit(AB), 1.2);
bass(zeit(AB), SCHLAG * 6, HZ.C2, 1);
flaeche(zeit(AB), 8 * SCHLAG, [HZ.C3, HZ.Eb3, HZ.G3, HZ.C4], 1.15);
kick(zeit(AB), 1);
for (let b = 0; b < 4; b++) zupfen(zeit(AB + b), [HZ.C4, HZ.G4, HZ.Eb4, HZ.C4][b], 0.7, 0);

const { bytes, dauer } = spur.schreiben(ZIEL, {
  endeBei: GESAMT_BILDER / FPS,
  ausblenden: 2.2,
});

console.log(
  `${ZIEL}\n${dauer.toFixed(2)} s · ${(60 / SCHLAG).toFixed(2)} bpm · ` +
    `erste Eins bei ${NULL_ZEIT.toFixed(2)} s (Bild ${ERSTER_CLIP}) · ` +
    `${(bytes / 1024 / 1024).toFixed(1)} MB`,
);
