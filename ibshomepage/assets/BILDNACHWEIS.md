# Bildnachweis

Alle Fotos über Adobe Stock lizenziert (Konto I.B.S. / Sait Simsek).
Originale liegen nicht im Repo — hier stehen nur die aufbereiteten WebP-Dateien.

### `assets/bilder/` — ganze Fotos

| Datei | Adobe-Stock-ID | Motiv | Verwendung |
|---|---|---|---|
| `hafen-hero.webp` | 314039797 | Containerterminal, Kräne als Silhouette im Gegenlicht | Hero, Vollbild |
| `fertigung-schweissen.webp` | 1442170548 | Schweißer an Stahlprofilen, Funkenflug | Abschnitt „Fertigung" |
| `ozean.webp` | 506727011 | leere Wasserfläche (oberes Drittel des Originals) | Untergrund der Schiff-Szene |

### `assets/frei/` — freigestellte Motive, mit Transparenz

| Datei | Adobe-Stock-ID | Motiv | Verwendung |
|---|---|---|---|
| `schiff.webp` | 506727011 | Containerschiff von oben, ohne Wasser | Szene 01, fährt quer durchs Bild |
| `stapler.webp` | 238579281 | Reachstacker mit gehobenem Container | Szene 02, fährt herein und hebt |
| `lkw.webp` | 49975472 | Sattelzug mit Container | Szene 03, fährt durchs Bild |

## Aufbereitung

Ganze Fotos: Zuschnitt und Umwandlung mit Pillow, je zwei Größen (1920px und 1100px,
Suffix `-1100`), WebP Qualität 80, eingebunden per `srcset`/`sizes`.

Freistellung mit `rembg` (Modell `isnet-general-use`), danach als WebP mit Alphakanal —
zusammen rund 280 KB. Die drei Motive liegen auf gezeichneten Untergründen (Ozeanfoto,
Hof-Verlauf, Fahrbahn) und werden per Scrollstand bewegt; sie brauchen deshalb saubere
Kanten und dürfen keinen Rest des Originalhintergrunds tragen.

## Fallstricke, alle beim Bauen aufgetreten

**Schriftzug im Schiff-Foto.** Das Original trägt „DELIVERY BY SHIP" ab etwa 62 % der
Bildhöhe. Wird das Bild ohne vorherigen Zuschnitt durch die Freistellung geschickt,
erkennt sie den Schriftzug als Motiv und nimmt ihn mit. Deshalb: **erst auf 60 % der
Höhe beschneiden, dann freistellen.**

**Leitplanke im LKW-Foto.** Die Freistellung nimmt die Leitplanke am Straßenrand mit,
weil sie am Fahrzeug anschließt. Sie wird über die Spaltenhöhe der Deckkraft entfernt:
Spalten mit weniger als 250 px Motivhöhe gehören zur Planke, nicht zum LKW.

**Zuschnitt-Anker.** `hafen-hero` bei 55 % der Höhe ansetzen, damit die Kräne
vollständig im Bild bleiben. Beim Stapler-Original bei 18 %, sonst fällt die
Oberkante des gehobenen Containers weg.
