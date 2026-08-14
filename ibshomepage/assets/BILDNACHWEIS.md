# Bildnachweis

Alle Fotos über Adobe Stock lizenziert (Konto I.B.S. / Sait Simsek).
Originale liegen nicht im Repo — hier stehen nur die aufbereiteten WebP-Dateien.

| Datei | Adobe-Stock-ID | Motiv | Verwendung |
|---|---|---|---|
| `hafen-hero.webp` | 314039797 | Containerterminal, Kräne als Silhouette im Gegenlicht | Hero, Vollbild |
| `fertigung-schweissen.webp` | 1442170548 | Schweißer an Stahlprofilen, Funkenflug | Abschnitt „Fertigung" |
| `seq-schiff.webp` | 506727011 | Containerschiff aus der Vogelperspektive | Bildsequenz, Schritt 1 |
| `seq-stapler.webp` | 238579281 | Reachstacker hebt Seecontainer | Bildsequenz, Schritt 2 |
| `seq-lkw.webp` | 49975472 | Sattelzug mit Seecontainer auf der Autobahn | Bildsequenz, Schritt 3 |

## Aufbereitung

Zuschnitt und Umwandlung mit Pillow, je zwei Größen (1920px und 1100px, Suffix `-1100`),
WebP Qualität 80. Eingebunden per `srcset`/`sizes`.

**Wichtig bei `seq-schiff.webp`:** Das Original trägt den eingebrannten Schriftzug
„DELIVERY BY SHIP" ab etwa 62 % der Bildhöhe. Der Zuschnitt endet deshalb bei 61,5 % —
wird das Bild neu aufbereitet, muss diese Grenze eingehalten werden, sonst steht
englischer Fremdtext auf der Seite.

**Zuschnitt-Anker:** `seq-stapler` wird bei 18 % der Höhe angesetzt (nicht mittig),
sonst fällt die Oberkante des gehobenen Containers weg. `hafen-hero` bei 55 %,
damit die Kräne vollständig im Bild bleiben.
