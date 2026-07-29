/**
 * Die Klangmaschine hinter den Tonspuren — Generatoren, Hall, WAV-Datei.
 * Die eigentlichen Stücke stehen daneben und benutzen nur diese Bausteine:
 *
 *   scripts/musik.mjs      Tonspur des Showreels (41 s)
 *   scripts/musik-ad.mjs   Tonspur der Instagram-Anzeige (15 s)
 *
 * Alles wird gerechnet, nichts ist gesampelt oder eingekauft — daran hat
 * niemand Rechte. Der Zufallsgenerator ist absichtlich ein billiger, fest
 * ausgesäter: dieselbe Eingabe ergibt immer dieselbe Datei.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const RATE = 44100;

/** Tonhöhen in Hertz, c-Moll-Umfeld */
export const HZ = {
  C2: 65.41, Eb2: 77.78, G2: 98.0, Ab2: 103.83, Bb2: 116.54,
  C3: 130.81, Eb3: 155.56, F3: 174.61, G3: 196.0, Ab3: 207.65, Bb3: 233.08,
  C4: 261.63, Eb4: 311.13, G4: 392.0, Ab4: 415.3, Bb4: 466.16,
};

export const neueSpur = ({ dauer, saat = 20260728 }) => {
  const N = Math.ceil(dauer * RATE);
  const links = new Float64Array(N);
  const rechts = new Float64Array(N);
  const hall = new Float64Array(N); // Sendeweg, wird am Ende verhallt dazugemischt

  let zustand = saat;
  const zufall = () => {
    zustand = (zustand * 1664525 + 1013904223) % 4294967296;
    return (zustand / 4294967296) * 2 - 1;
  };

  const misch = (start, laenge, gibProbe, { pan = 0, send = 0 } = {}) => {
    const von = Math.max(0, Math.floor(start * RATE));
    const bis = Math.min(N, Math.ceil((start + laenge) * RATE));
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

  const huelle = (t, anstieg, abfall) =>
    t < anstieg ? t / anstieg : Math.exp(-(t - anstieg) / abfall);

  const kick = (start, lautstaerke = 1) => {
    misch(start, 0.45, (t) => {
      const f = 48 + 90 * Math.exp(-t / 0.028); // Klick, dann Bauch
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
        (t) => zufall() * Math.exp(-t / 0.055) * 0.3 * gewicht * lautstaerke,
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

  const bass = (start, laenge, frequenz, lautstaerke = 1) => {
    misch(start, laenge + 0.2, (t) => {
      const h =
        huelle(t, 0.01, 0.55) * (t > laenge ? Math.exp(-(t - laenge) / 0.06) : 1);
      const grund = Math.sin(2 * Math.PI * frequenz * t);
      const ober = Math.sin(4 * Math.PI * frequenz * t) * 0.18;
      return Math.tanh((grund + ober) * 1.4) * h * 0.5 * lautstaerke;
    });
  };

  const flaeche = (start, laenge, frequenzen, lautstaerke = 1) => {
    // Weiche Flaeche aus wenigen Teiltoenen, leicht verstimmt fuer Breite
    for (const [nr, f] of frequenzen.entries()) {
      for (const seite of [-1, 1]) {
        misch(
          start,
          laenge + 0.9,
          (t) => {
            const an = Math.min(1, t / 0.7);
            const ab = t > laenge ? Math.exp(-(t - laenge) / 0.5) : 1;
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
    misch(start, 0.6, (t) => zufall() * Math.exp(-t / 0.06) * 0.22 * lautstaerke, {
      send: 0.6,
    });
  };

  const anlauf = (start, laenge, lautstaerke = 1) => {
    // Rauschen, das anschwillt — fuehrt in einen Schnitt hinein
    let tief = 0;
    misch(
      start,
      laenge,
      (t, anteil) => {
        const rohes = zufall();
        tief += 0.06 * (rohes - tief);
        const band = rohes - tief;
        return band * Math.pow(anteil, 2.4) * 0.5 * lautstaerke;
      },
      { send: 0.5 },
    );
  };

  // --- Hall, Begrenzung, Datei ------------------------------------------

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

  const schreiben = (ziel, { endeBei, ausblenden = 2.2 }) => {
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

    for (let i = 0; i < N; i++) {
      const t = i / RATE;
      const ab =
        t > endeBei - ausblenden
          ? Math.max(0, (endeBei - t) / ausblenden)
          : 1;
      const an = Math.min(1, t / 0.05);
      links[i] *= ab * an;
      rechts[i] *= ab * an;
    }

    let spitze = 0;
    for (let i = 0; i < N; i++) {
      spitze = Math.max(spitze, Math.abs(links[i]), Math.abs(rechts[i]));
    }
    // Weich begrenzen (tanh) statt hart abschneiden, danach auf -0,4 dBFS
    // ziehen. Ohne den zweiten Schritt bleibt die Spur zu leise fuers Handy.
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

    mkdirSync(dirname(ziel), { recursive: true });
    writeFileSync(ziel, puffer);
    return { bytes: puffer.length, dauer: N / RATE };
  };

  return {
    kick, klatschen, hut, bass, flaeche, zupfen, einschlag, anlauf, schreiben,
  };
};
