# Bildnachweis

Alle Fotos über Adobe Stock lizenziert (Konto I.B.S. / Sait Simsek).
Originale liegen nicht im Repo — hier stehen nur die aufbereiteten WebP-Dateien.

### `assets/bilder/` — Fotos

| Datei | Adobe-Stock-ID | Motiv | Verwendung |
|---|---|---|---|
| `hafen-hero.webp` | 314039797 | Containerterminal, Kräne als Silhouette im Gegenlicht | Hero, Vollbild |
| `fertigung-schweissen.webp` | 1442170548 | Schweißer an Stahlprofilen, Funkenflug | Abschnitt „Fertigung" |

### `assets/videos/` — die drei Szenen im Abschnitt „Der Weg"

KI-generiert mit Higgsfield (Bild: Nano Banana 2, Video: 5 s, Kamera statisch)
über das Kundenkonto, am 14.08.2026. Keine Stock-Lizenzen nötig.

| Datei | Motiv | Szene |
|---|---|---|
| `schiff.mp4/.webm` | Containerschiff von oben, rote Container, Kielwasser | 01 — Verschifft |
| `stapler.mp4/.webm` | Roter Reachstacker verlädt Container auf roten LKW | 02 — Umgeschlagen |
| `lkw.mp4/.webm` | Kirschroter Sattelzug mit Container auf Landstraße | 03 — Zugestellt |

Die Fahrzeuge wurden gezielt in Kirschrot (Markenfarbe #BE1622) bestellt.

### `assets/` — Marke

`ibslogo.svg` (Original vom Kunden), `ibslogo-hell.svg` (Schwarz→Weiß für dunkle
Flächen), `favicon.svg` (Bildzeichen per viewBox-Zuschnitt).

## Aufbereitung

Fotos: Zuschnitt und Umwandlung mit Pillow, je zwei Größen (1920px und 1100px,
Suffix `-1100`), WebP Qualität 80, eingebunden per `srcset`/`sizes`.
`hafen-hero` beim Zuschnitt bei 55 % der Höhe ansetzen, damit die Kräne im Bild bleiben.

Videos: Quelle 1928×1076 → 1280px, H.264 CRF 26 + WebP-Poster; zusätzlich eine
VP9/WebM-Spur (CRF 34) für Browser ohne H.264 (Linux-Firefox/Chromium und der
Playwright-Chromium der Tests — dort war „no supported sources" der Hinweis).
Es spielt immer nur das Video der aktiven Szene; außerhalb der Sektion wird pausiert.

Frühere Fassungen dieser Sektion (Fotowechsel, dann freigestellte, scrollbewegte
Motive) sind durch die Videos ersetzt; die Freistell-Fallstricke stehen in der
Git-Historie dieser Datei.
