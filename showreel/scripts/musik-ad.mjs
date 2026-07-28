/**
 * Erzeugt die Tonspur der Instagram-Anzeige: public/audio/ad-musik.wav
 *
 *   node scripts/musik-ad.mjs
 *
 * Gleiches Tempo wie das Showreel (110,77 bpm), acht Schläge je Szene
 * (130 Bilder). Die Anzeige läuft von der ersten Sekunde an mit vollem
 * Schlagwerk — bei einer Anzeige gibt es kein Vorspiel, wer nach zwei
 * Sekunden nicht hängen bleibt, ist weg.
 *
 * Zum Schluss setzt das Schlagwerk aus und nur die Fläche steht: Der Blick
 * soll dann auf dem Formular-Hinweis liegen, nicht mehr auf dem Rhythmus.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HZ, neueSpur } from "./klang.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const ZIEL = join(HIER, "..", "public", "audio", "ad-musik.wav");

const FPS = 30;

// Muss mit src/ad/adSzenen.ts uebereinstimmen
const SZENE = 130;
const ANZAHL_SZENEN = 4;
const ENDKARTE = 195;

const GESAMT_BILDER = ANZAHL_SZENEN * SZENE + ENDKARTE;
const SCHLAG = SZENE / 8 / FPS; // 0,5417 s — acht Schlaege je Szene
const DAUER = GESAMT_BILDER / FPS + 0.1;

const zeit = (schlag) => schlag * SCHLAG;

const spur = neueSpur({ dauer: DAUER, saat: 20260729 });
const { kick, klatschen, hut, bass, flaeche, zupfen, einschlag } = spur;

// Zwei Akkorde je Szene, damit acht Schlaege nicht auf der Stelle treten
const AKKORDE = [
  [
    { grund: HZ.C2, toene: [HZ.C3, HZ.Eb3, HZ.G3], arp: [HZ.C4, HZ.G4, HZ.Eb4, HZ.G4] },
    { grund: HZ.Ab2, toene: [HZ.Ab3, HZ.C4, HZ.Eb4], arp: [HZ.Ab4, HZ.Eb4, HZ.C4, HZ.Eb4] },
  ],
  [
    { grund: HZ.Eb2, toene: [HZ.Eb3, HZ.G3, HZ.Bb3], arp: [HZ.Bb4, HZ.G4, HZ.Eb4, HZ.G4] },
    { grund: HZ.Bb2, toene: [HZ.Bb3, HZ.Eb4, HZ.G4], arp: [HZ.Bb4, HZ.Eb4, HZ.G4, HZ.Bb4] },
  ],
  [
    { grund: HZ.C2, toene: [HZ.C3, HZ.Eb3, HZ.G3], arp: [HZ.C4, HZ.Eb4, HZ.G4, HZ.C4] },
    { grund: HZ.Ab2, toene: [HZ.Ab3, HZ.C4, HZ.Eb4], arp: [HZ.C4, HZ.Ab4, HZ.Eb4, HZ.Ab4] },
  ],
  [
    { grund: HZ.Eb2, toene: [HZ.Eb3, HZ.G3, HZ.Bb3], arp: [HZ.Eb4, HZ.G4, HZ.Bb4, HZ.G4] },
    { grund: HZ.Bb2, toene: [HZ.Bb3, HZ.Eb4, HZ.G4], arp: [HZ.Bb4, HZ.G4, HZ.Eb4, HZ.G4] },
  ],
];

for (let s = 0; s < ANZAHL_SZENEN; s++) {
  const start = s * 8;
  einschlag(zeit(start), s === 0 ? 1.15 : 0.7);

  for (const [haelfte, akkord] of AKKORDE[s].entries()) {
    const von = start + haelfte * 4;
    flaeche(zeit(von), 4 * SCHLAG, akkord.toene, 1);

    for (let b = 0; b < 4; b++) {
      const t = zeit(von + b);

      kick(t, 1);
      bass(t, SCHLAG * 0.9, akkord.grund, 1);
      if (b % 2 === 1) bass(t + SCHLAG * 0.5, SCHLAG * 0.4, akkord.grund * 2, 0.4);

      if (b % 2 === 0) klatschen(t + SCHLAG, 0.85);
      hut(t + SCHLAG * 0.5, 0.95, b % 2 === 0 ? -0.35 : 0.35);
      hut(t + SCHLAG * 0.25, 0.45, 0.25);

      zupfen(t, akkord.arp[b % 4], s === 0 && haelfte === 0 ? 0.75 : 1, -0.25);
      if (s >= 1) zupfen(t + SCHLAG * 0.5, akkord.arp[(b + 2) % 4], 0.65, 0.3);
    }
  }
}

// Endkarte: ein letzter Schlag, vier Schlaege Rhythmus, dann steht nur die
// Flaeche — Ruhe unter dem Aufruf zum Formular.
const AB = ANZAHL_SZENEN * 8;
einschlag(zeit(AB), 1.25);
flaeche(zeit(AB), 12 * SCHLAG, [HZ.C3, HZ.Eb3, HZ.G3, HZ.C4], 1.2);
bass(zeit(AB), SCHLAG * 4, HZ.C2, 1);

for (let b = 0; b < 4; b++) {
  const t = zeit(AB + b);
  kick(t, b === 0 ? 1 : 0.8);
  if (b % 2 === 0) klatschen(t + SCHLAG, 0.7);
  hut(t + SCHLAG * 0.5, 0.6, b % 2 === 0 ? -0.3 : 0.3);
  zupfen(t, [HZ.C4, HZ.G4, HZ.Eb4, HZ.C4][b], 0.8, 0);
}
zupfen(zeit(AB + 4), HZ.C4, 0.6, 0);
zupfen(zeit(AB + 6), HZ.G4, 0.45, 0);
bass(zeit(AB + 6), SCHLAG * 2, HZ.C2, 0.6);

const { bytes, dauer } = spur.schreiben(ZIEL, {
  endeBei: GESAMT_BILDER / FPS,
  ausblenden: 1.8,
});

console.log(
  `${ZIEL}\n${dauer.toFixed(2)} s · ${(60 / SCHLAG).toFixed(2)} bpm · ` +
    `${GESAMT_BILDER} Bilder · ${(bytes / 1024 / 1024).toFixed(1)} MB`,
);
