/**
 * Erzeugt die Tonspur des Showreels: public/audio/showreel-musik.wav
 *
 *   node scripts/musik.mjs
 *
 * Warum selbst gebaut und nicht eingekauft: Musik aus einer Bibliothek braucht
 * eine Lizenz, Musik aus Instagram darf nicht in einer eigenen Datei landen.
 * Diese Spur entsteht rein rechnerisch aus Sinus- und Rauschgeneratoren —
 * daran hat niemand Rechte, sie darf überall verwendet werden.
 *
 * Das Tempo ist kein Zufall: Ein Schlag dauert 16,25 Einzelbilder, acht Schläge
 * sind damit genau ein Projektfilm (130 Bilder). Jeder Schnitt fällt auf eine
 * Eins, jeder Film bekommt seinen eigenen Akkord.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HIER = dirname(fileURLToPath(import.meta.url));
const ZIEL = join(HIER, "..", "public", "audio", "showreel-musik.wav");

const RATE = 44100;
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
const SCHLAEGE = ANZAHL_CLIPS * 8 + 8; // acht Filme plus Abbinder
const DAUER = GESAMT_BILDER / FPS + 0.1;

const N = Math.ceil(DAUER * RATE);
const links = new Float64Array(N);
const rechts = new Float64Array(N);
const hall = new Float64Array(N); // Sendeweg, wird am Ende verhallt dazugemischt

const zeit = (schlag) => NULL_ZEIT + schlag * SCHLAG;

// Deterministischer Zufall, damit jede Ausfuehrung dieselbe Datei ergibt
let saat = 20260728;
const zufall = () => {
  saat = (saat * 1664525 + 1013904223) % 4294967296;
  return (saat / 4294967296) * 2 - 1;
};

const misch = (start, dauer, gibProbe, { pan = 0, send = 0 } = {}) => {
  const von = Math.max(0, Math.floor(start * RATE));
  const bis = Math.min(N, Math.ceil((start + dauer) * RATE));
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = von; i < bis; i++) {
    const t = (i - start * RATE) / RATE;
    const s = gibProbe(t, (i - von) / (bis - von));
    links[i] += s * gl;
    rechts[i] += s * gr;
    if (send > 0) hall[i] += s * send;
  }
};

// --- Klangerzeuger -------------------------------------------------------

const huelle = (t, anstieg, abfall) =>
  t < anstieg ? t / anstieg : Math.exp(-(t - anstieg) / abfall);

const kick = (start, lautstaerke = 1) => {
  misch(start, 0.45, (t) => {
    const f = 48 + 90 * Math.exp(-t / 0.028); // Tonhoehenverlauf: Klick, dann Bauch
    return (
      Math.sin(2 * Math.PI * f * t) * Math.exp(-t / 0.13) * 0.9 * lautstaerke
    );
  });
};

const klatschen = (start, lautstaerke = 1) => {
  // Drei kurze Rauschstoesse hintereinander, wie eine Hand voll Leute
  for (const [versatz, gewicht] of [
    [0, 0.7],
    [0.011, 0.9],
    [0.023, 1],
  ]) {
    misch(
      start + versatz,
      0.3,
      (t) => {
        const rohes = zufall();
        return rohes * Math.exp(-t / 0.055) * 0.3 * gewicht * lautstaerke;
      },
      { send: 0.5 },
    );
  }
};

const hut = (start, lautstaerke = 1, pan = 0) => {
  let vorher = 0;
  misch(
    start,
    0.12,
    (t) => {
      const rohes = zufall();
      const hoch = rohes - vorher; // grobe Hoehenanhebung
      vorher = rohes;
      return hoch * Math.exp(-t / 0.018) * 0.26 * lautstaerke;
    },
    { pan, send: 0.12 },
  );
};

const bass = (start, dauer, frequenz, lautstaerke = 1) => {
  misch(start, dauer + 0.2, (t) => {
    const h = huelle(t, 0.01, 0.55) * (t > dauer ? Math.exp(-(t - dauer) / 0.06) : 1);
    const grund = Math.sin(2 * Math.PI * frequenz * t);
    const ober = Math.sin(4 * Math.PI * frequenz * t) * 0.18;
    return Math.tanh((grund + ober) * 1.4) * h * 0.5 * lautstaerke;
  });
};

const flaeche = (start, dauer, frequenzen, lautstaerke = 1) => {
  // Weiche Flaeche aus wenigen Teiltoenen, leicht verstimmt fuer Breite
  for (const [nr, f] of frequenzen.entries()) {
    for (const seite of [-1, 1]) {
      misch(
        start,
        dauer + 0.9,
        (t) => {
          const an = Math.min(1, t / 0.7);
          const ab = t > dauer ? Math.exp(-(t - dauer) / 0.5) : 1;
          const schweben = 1 + 0.0016 * seite * (nr + 1);
          const ton =
            Math.sin(2 * Math.PI * f * schweben * t) +
            0.28 * Math.sin(4 * Math.PI * f * schweben * t) +
            0.12 * Math.sin(6 * Math.PI * f * schweben * t);
          const atmen = 1 + 0.06 * Math.sin(2 * Math.PI * 0.13 * t + nr);
          return ton * an * ab * atmen * 0.052 * lautstaerke;
        },
        { pan: seite * 0.55, send: 0.4 },
      );
    }
  }
};

const zupfen = (start, frequenz, lautstaerke = 1, pan = 0) => {
  misch(
    start,
    0.5,
    (t) => {
      const h = Math.exp(-t / 0.09);
      const ton =
        Math.sin(2 * Math.PI * frequenz * t) * 0.7 +
        Math.sin(4 * Math.PI * frequenz * t) * 0.25 +
        Math.sin(6 * Math.PI * frequenz * t) * 0.1;
      return ton * h * 0.2 * lautstaerke;
    },
    { pan, send: 0.35 },
  );
};

const einschlag = (start, lautstaerke = 1) => {
  // Der Schlag auf den Schnitt: tiefer Sinus plus kurzer Rauschknall
  misch(start, 1.2, (t) => {
    const f = 62 + 150 * Math.exp(-t / 0.05);
    const tief = Math.sin(2 * Math.PI * f * t) * Math.exp(-t / 0.28);
    return tief * 0.55 * lautstaerke;
  });
  misch(
    start,
    0.6,
    (t) => zufall() * Math.exp(-t / 0.06) * 0.22 * lautstaerke,
    { send: 0.6 },
  );
};

const anlauf = (start, dauer, lautstaerke = 1) => {
  // Rauschen, das anschwillt — fuehrt in den ersten Schnitt hinein
  let tief = 0;
  misch(
    start,
    dauer,
    (t, anteil) => {
      const rohes = zufall();
      tief += 0.06 * (rohes - tief);
      const band = rohes - tief;
      return band * Math.pow(anteil, 2.4) * 0.5 * lautstaerke;
    },
    { send: 0.5 },
  );
};

// --- Arrangement ---------------------------------------------------------

const HZ = {
  C2: 65.41, Eb2: 77.78, G2: 98.0, Ab2: 103.83, Bb2: 116.54,
  C3: 130.81, Eb3: 155.56, F3: 174.61, G3: 196.0, Ab3: 207.65, Bb3: 233.08,
  C4: 261.63, Eb4: 311.13, G4: 392.0, Ab4: 415.3, Bb4: 466.16,
};

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

// --- Hall ----------------------------------------------------------------

const kamm = (eingang, verzoegerung, rueck, daempfung) => {
  const ausgang = new Float64Array(N);
  const d = Math.floor(verzoegerung * RATE);
  let speicher = 0;
  for (let i = 0; i < N; i++) {
    const alt = i >= d ? ausgang[i - d] : 0;
    speicher += daempfung * (alt - speicher);
    ausgang[i] = eingang[i] + speicher * rueck;
  }
  return ausgang;
};

const allpass = (eingang, verzoegerung, staerke) => {
  const ausgang = new Float64Array(N);
  const d = Math.floor(verzoegerung * RATE);
  for (let i = 0; i < N; i++) {
    const alt = i >= d ? ausgang[i - d] : 0;
    const rein = i >= d ? eingang[i - d] : 0;
    ausgang[i] = -staerke * eingang[i] + rein + staerke * alt;
  }
  return ausgang;
};

let nass = new Float64Array(N);
for (const [d, r] of [
  [0.0297, 0.79],
  [0.0371, 0.77],
  [0.0411, 0.75],
  [0.0437, 0.73],
]) {
  const k = kamm(hall, d, r, 0.32);
  for (let i = 0; i < N; i++) nass[i] += k[i] * 0.25;
}
nass = allpass(allpass(nass, 0.005, 0.7), 0.0017, 0.7);

for (let i = 0; i < N; i++) {
  links[i] += nass[i] * 0.3;
  rechts[i] += nass[Math.max(0, i - 220)] * 0.3; // rechts minimal spaeter = Breite
}

// --- Ausblenden, Begrenzen, Schreiben -----------------------------------

const ENDE = GESAMT_BILDER / FPS;
const AUSBLENDEN = 2.2;
for (let i = 0; i < N; i++) {
  const t = i / RATE;
  const ab = t > ENDE - AUSBLENDEN ? Math.max(0, (ENDE - t) / AUSBLENDEN) : 1;
  const an = Math.min(1, t / 0.05);
  links[i] *= ab * an;
  rechts[i] *= ab * an;
}

let spitze = 0;
for (let i = 0; i < N; i++) {
  spitze = Math.max(spitze, Math.abs(links[i]), Math.abs(rechts[i]));
}
// Weich begrenzen (tanh) statt hart abschneiden, danach auf -0,4 dBFS ziehen.
// Ohne den zweiten Schritt bleibt die Spur zu leise fuer eine Handy-Wiedergabe.
const vor = 1.3 / spitze;
let spitzeDanach = 0;
for (let i = 0; i < N; i++) {
  spitzeDanach = Math.max(
    spitzeDanach,
    Math.abs(Math.tanh(links[i] * vor)),
    Math.abs(Math.tanh(rechts[i] * vor)),
  );
}
const nach = 0.955 / spitzeDanach;

const puffer = Buffer.alloc(44 + N * 4);
puffer.write("RIFF", 0);
puffer.writeUInt32LE(36 + N * 4, 4);
puffer.write("WAVEfmt ", 8);
puffer.writeUInt32LE(16, 16);
puffer.writeUInt16LE(1, 20); // PCM
puffer.writeUInt16LE(2, 22); // stereo
puffer.writeUInt32LE(RATE, 24);
puffer.writeUInt32LE(RATE * 4, 28);
puffer.writeUInt16LE(4, 32);
puffer.writeUInt16LE(16, 34);
puffer.write("data", 36);
puffer.writeUInt32LE(N * 4, 40);

const begrenzen = (x) => Math.tanh(x * vor) * nach;
for (let i = 0; i < N; i++) {
  puffer.writeInt16LE(Math.round(begrenzen(links[i]) * 32767), 44 + i * 4);
  puffer.writeInt16LE(Math.round(begrenzen(rechts[i]) * 32767), 46 + i * 4);
}

mkdirSync(dirname(ZIEL), { recursive: true });
writeFileSync(ZIEL, puffer);

console.log(
  `${ZIEL}\n${(DAUER).toFixed(2)} s · ${SCHLAEGE} Schlaege · ` +
    `${(60 / SCHLAG).toFixed(2)} bpm · erste Eins bei ${NULL_ZEIT.toFixed(2)} s ` +
    `(Bild ${ERSTER_CLIP}) · ${(puffer.length / 1024 / 1024).toFixed(1)} MB`,
);
