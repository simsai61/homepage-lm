# Showreel — Ländle Blitz Marketing

Ein Film aus den acht Projektfilmen, die auf der Startseite unter „Einblicke"
liegen. Gebaut mit [Remotion](https://www.remotion.dev): Der Film ist Code,
Änderungen an Reihenfolge, Ausschnitten oder Texten sind eine Zeile im Editor
und kein neuer Schnitt.

**Format:** 1080 × 1920 (hochkant), 30 Bilder/s, 41 Sekunden.
Passt so für Instagram Reels und TikTok und lässt sich auf der Website einbinden.

## Aufbau

| Abschnitt | Länge | Inhalt |
|---|---|---|
| Auftakt | 2,5 s | Der Blitz schlägt ein, es blitzt auf, der Claim flackert an |
| Acht Projektfilme | je 4,3 s | Ausschnitt mit Bauchbinde: Projektname, Leistung, Zähler „01 / 08" |
| Abbinder | 4,7 s | „Sie eröffnen. Wir machen Sie sichtbar.", Logo, Kontakt |

Zwischen den Filmen wird hart geschnitten, auf dem Schnitt liegt ein Aufblitzen
im Markenverlauf. Reihenfolge, Titel und Unterzeilen sind wortgleich mit der
Website (Hanako zuerst, wie festgelegt).

## Befehle

```bash
npm i            # einmalig
npm run dev      # Vorschau im Browser (Remotion Studio)
npm run render   # Film bauen -> out/showreel.mp4
```

`npm run dev` öffnet einen Editor, in dem der Film abspielbar ist und in dem
sich Texte und Positionen anklicken und verschieben lassen — die Änderungen
landen direkt im Code.

## Woher die Filme kommen

`public/videos` und `public/fonts` sind **Verweise** (Symlinks) auf
`../assets/videos` und `../assets/fonts`. Die 41 MB Videomaterial liegen also
nur einmal im Projekt. Wer die Dateien austauscht, tauscht sie in `assets/` aus.

## Was sich wo ändern lässt

- **`src/showreel/clips.ts`** — die acht Filme: Reihenfolge, Anfangsbild
  (`startFrom`, in Einzelbildern zu 1/30 Sekunde), Titel, Unterzeile.
  `CLIP_DURATION` bestimmt, wie lange jeder Film läuft.
- **`src/showreel/theme.ts`** — Farben und Schriften, identisch mit der Website.
- **`src/showreel/Intro.tsx` / `Outro.tsx`** — Auftakt und Abbinder.
- **`src/showreel/ClipScene.tsx`** — die Bauchbinde.

### Anfangsbilder aussuchen

Die Ausschnitte wurden von Hand gesetzt, nicht geraten. Dafür gibt es die
Komposition **`Kontaktbogen`**: sie legt ein Standbild je Sekunde nebeneinander.

```bash
npx remotion still Kontaktbogen out/bogen.png \
  --props='{"file":"hanako.mp4","seconds":21}'
```

Zwei Fallen stecken im Material und sind der Grund, warum die Ausschnitte so
liegen, wie sie liegen:

1. **Die meisten Clips enden mit einer weißen Abbinder-Karte** mit Logo
   (Hanako ab ca. 20 s, Can'ss ab 33 s, Stadion ab 28 s). Der Ausschnitt darf
   nicht hineinlaufen.
2. **Mehrere Clips beginnen mit einer Ansprache in die Kamera**, teils mit
   eingebrannten Textzeilen oder sichtbarer Kamera-Bedienoberfläche
   (CT Automotive · Fassade, Sekunde 3 bis 5). Gezeigt wird stattdessen die
   Arbeit und das Ergebnis.

## Ton

Der Originalton ist **stumm geschaltet** (`muted` in `ClipScene.tsx`). Es sind
Handyaufnahmen von der Baustelle — Wind, Maschinen, Gespräche — und teilweise
liegt fremde Musik darunter. Musik gehört beim Hochladen in Instagram oder
TikTok darübergelegt: dort ist sie lizenziert, in einer selbst gerenderten
Datei wäre sie es nicht. Soll doch der Originalton laufen, reicht es,
`muted` zu entfernen.

## Rendern auf einem Rechner ohne eigenes Chrome

Remotion lädt beim ersten Rendern eine eigene Chrome-Version herunter. Wo das
nicht geht, lässt sich ein vorhandener Browser angeben:

```bash
npx remotion render Showreel out/showreel.mp4 --browser-executable=<pfad>
```

Für kleinere Dateien `--crf=23` mitgeben (Standard ist feiner und größer).

## Lizenz

Remotion ist für Firmen bis drei Mitarbeiter kostenlos, darüber
kostenpflichtig. Bedingungen: <https://www.remotion.pro/license>
