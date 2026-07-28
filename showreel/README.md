# Filme — Ländle Blitz Marketing

Zwei Filme aus demselben Material und demselben Corporate Design:

| Komposition | Länge | Zweck |
|---|---|---|
| **Showreel** | 41 s | Vorstellung der Arbeit — Instagram, Website |
| **Ad** | 15 s | Anzeige mit Formular, sammelt Anfragen |

```bash
npm run render       # Showreel -> out/showreel.mp4
npm run render:ad    # Anzeige  -> out/ad-instagram.mp4
```

---

# Showreel

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

**Der Originalton der Clips ist stumm geschaltet** (`muted` in `ClipScene.tsx`).
Es sind Handyaufnahmen von der Baustelle — Wind, Maschinen, Gespräche — und
teilweise liegt fremde Musik darunter, die in einer eigenen Datei nicht
lizenziert wäre. Soll er doch laufen, reicht es, `muted` zu entfernen.

**Darunter liegt eine eigene Musikspur**, erzeugt von `scripts/musik.mjs`:

```bash
node scripts/musik.mjs   # schreibt public/audio/showreel-musik.wav
```

Das Skript rechnet die Spur aus Sinus- und Rauschgeneratoren aus — Kick, Bass,
Fläche, Hi-Hat, Klatschen, eine Achtelfigur und ein Hall. Nichts davon ist
eingekauft oder gesampelt, an dem Ergebnis hat **niemand Rechte**. Das ist der
ganze Grund für den Aufwand: gekaufte Bibliotheksmusik braucht eine Lizenz,
Instagram-Musik darf nicht in eine gerenderte Datei.

Das Tempo ist an den Schnitt gebunden: **110,77 bpm**, damit acht Schläge genau
einen Projektfilm ergeben (130 Bilder). Die erste Eins liegt auf dem ersten
Schnitt bei Sekunde 2,1, jeder weitere Schnitt fällt auf eine Eins, und jeder
Film bekommt seinen eigenen Akkord (c-Moll: Cm – A♭ – E♭ – B♭, zweimal
durch). Der Aufbau geht mit: die ersten beiden Filme laufen ohne Schlagwerk,
ab dem dritten kommt es dazu, ab dem fünften alles. Ausgeblendet wird in den
letzten 2,2 Sekunden.

Wer am Tempo, an der Tonart oder am Aufbau dreht, ändert das Skript und lässt
es neu laufen. **Ändert sich die Länge der Filme (`CLIP_DURATION`), muss die
Musik neu erzeugt werden** — die Konstanten oben im Skript müssen mit
`src/showreel/clips.ts` übereinstimmen.

Wenn stattdessen eine lizenzierte Spur vorliegt: Datei nach `public/audio/`
legen und den Dateinamen in `src/showreel/Showreel.tsx` austauschen.

## Rendern auf einem Rechner ohne eigenes Chrome

Remotion lädt beim ersten Rendern eine eigene Chrome-Version herunter. Wo das
nicht geht, lässt sich ein vorhandener Browser angeben:

```bash
npx remotion render Showreel out/showreel.mp4 --browser-executable=<pfad>
```

Für kleinere Dateien `--crf=23` mitgeben (Standard ist feiner und größer).

---

# Anzeige (`Ad`)

15 Sekunden, hochkant, gedacht als Reels-Anzeige mit angehängtem
Lead-Formular. Sie ist **kein kurzes Showreel** — sie ist anders gebaut, weil
sie eine andere Aufgabe hat.

## Aufbau

| | Länge | Bild | Aussage | Nutzen für den Kunden |
|---|---|---|---|---|
| 1 | 2,2 s | Pylon hängt am Kran | „Eröffnung in **6 Wochen**?" | spricht seinen Termin an |
| 2 | 2,2 s | Foliertes Schaufenster | „**In 6 Wochen** steht alles." | er wird rechtzeitig fertig |
| 3 | 2,2 s | Sait mit fertigem Shirt | „**Einer** kümmert sich. Nicht fünf Firmen." | er muss nichts koordinieren |
| 4 | 2,2 s | Neon im Lokal | „Alles im **gleichen Look**." | ein Auftritt statt Flickwerk |
| 5 | 2,2 s | Neon-Schriftzug leuchtet | „Pünktlich zur **Eröffnung**." | der Termin hält |
| Ende | 4,3 s | Endkarte | „Reicht Ihre Zeit noch?" + Aufruf zum Formular | |

In jeder Szene steht, was der Kunde davon hat — nicht, was die Agentur kann.
Die erste Fassung rechnete ihm nur seine Vorlaufzeiten vor und ließ offen,
warum er ausgerechnet hier kaufen soll.

> **Achtung, Zahl mit Folgen:** Die Anzeige nennt **6 Wochen gesamt**. Der
> Zeitplaner auf der Website rechnet mit **7 Wochen** (Leuchtschild) und
> **9 Wochen** (Pylon, Komplettpaket) — die Produktion allein dauert 3 bzw.
> 5 Wochen, dazu kommen Gestaltung, Freigabe und Montage. Dieselben Leute
> sehen beide Zahlen: Wer über die Anzeige kommt und danach den Zeitplaner
> benutzt, bekommt eine andere Auskunft. Entweder wird der Zeitplaner
> nachgezogen oder die Anzeige. Beides nebeneinander stehen zu lassen kostet
> Vertrauen an genau der Stelle, an der es zählt.

Alles Übrige in der Anzeige ist belegt: Montage macht Sait selbst,
Arbeitsbekleidung, Werbeartikel und Folierung entstehen im Haus, gegründet
2018.

## Warum sie so aussieht, wie sie aussieht

- **Kein Vorspann.** Bild eins ist bereits die Aussage. Der Blitz-Auftakt des
  Showreels würde die ersten zweieinhalb Sekunden kosten — genau die, in denen
  entschieden wird, ob weitergewischt wird.
- **Jede Aussage steht als Schrift im Bild.** Anzeigen laufen überwiegend
  ohne Ton. Die Anzeige muss stumm vollständig funktionieren; die Musik ist
  Zugabe.
- **Schrift im oberen Drittel**, nicht unten wie beim Showreel. Unten liegen
  der Knopf zum Formular, Name und Beitragstext. Alles unterhalb von etwa
  1480 px wird verdeckt oder zieht den Blick vom Knopf weg.
- **Harte Schnitte, keine Blenden.** Blenden kosten Zeit.
- **Der Pfeil am Schluss** zeigt auf den Knopf, den Instagram unter der
  Anzeige einblendet.

## Text ändern

Alles steht in `src/ad/adSzenen.ts` — eine Zeile je Szene. Was zwischen
`*Sternchen*` steht, wird im Markenton hervorgehoben:

```ts
zeilen: ["MACHT *7 BIS 9*", "*WOCHEN* VORLAUF."],
```

Der Zeilenumbruch wird von Hand gesetzt, nicht automatisch: Bei 74 px passen
rund 18 Großbuchstaben in eine Zeile. Wer längere Zeilen schreibt, muss die
Schriftgröße in `AdSzene.tsx` mitziehen.

## Was noch dazugehört (nicht im Video)

Die Anzeige ist nur die Hälfte. Vorschlag für den Rest, zum Übernehmen und
Anpassen:

**Primärtext**

> Sie sperren in sechs Wochen auf. Bis dahin steht alles: Logo, Schilder,
> Fahrzeugbeschriftung, Arbeitskleidung.
>
> Sie rufen nicht bei fünf Firmen an und rechnen keine Angebote gegeneinander.
> Sie bekommen den Chef, kein Callcenter — und alles im selben Look, vom Logo
> bis zum Firmenauto. Die Montage macht Sait selbst.
>
> Sagen Sie uns Ihren Eröffnungstermin. Wir sagen Ihnen, was bis dahin steht.
>
> Ländle Blitz Marketing, Meiningen. Seit 2018 in Vorarlberg.

**Überschrift:** Reicht Ihre Zeit bis zur Eröffnung?
**Knopf:** Angebot einholen

**Formular — kurz halten, jede Frage kostet Abschlüsse:**

1. Name, Telefonnummer (füllt Instagram selbst aus)
2. **Wann eröffnen Sie?** (Datum) — die eine Frage, die zählt: Sie sehen
   sofort, ob es dringend ist
3. Was brauchen Sie? (Mehrfachauswahl: Komplettpaket · Beschilderung ·
   Fahrzeugbeschriftung · Arbeitskleidung und Werbeartikel · Logo und Print)
4. Ort

Mehr nicht. Alles Weitere klärt das Telefonat.

**Zum Nachrechnen für die Anzeigenschaltung:** Die Zielgruppe sind Leute, die
in Vorarlberg gerade ein Lokal oder Geschäft aufmachen — ein sehr kleiner
Kreis. Ein enger Umkreis um Meiningen und Feldkirch trifft besser als eine
breite Streuung.

---

## Lizenz

Remotion ist für Firmen bis drei Mitarbeiter kostenlos, darüber
kostenpflichtig. Bedingungen: <https://www.remotion.pro/license>
