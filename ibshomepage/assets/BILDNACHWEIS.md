# Bildnachweis

Alle Fotos über Adobe Stock lizenziert (Konto I.B.S. / Sait Simsek).
Originale liegen nicht im Repo — hier stehen nur die aufbereiteten WebP-Dateien.

### `assets/bilder/` — Fotos

| Datei | Adobe-Stock-ID | Motiv | Verwendung |
|---|---|---|---|
| `hafen-hero.webp` | 314039797 | Containerterminal, Kräne als Silhouette im Gegenlicht | Hero, Vollbild |
| `fertigung-schweissen.webp` | 1442170548 | Schweißer an Stahlprofilen, Funkenflug | Abschnitt „Fertigung" |

### `assets/schnitt/` — freigestellte Motive für die offene Scroll-Bühne „Der Weg"

Nach dem Vorbild des Referenz-Reels fahren die Motive **frei auf der weißen
Seite** (keine Box, kein Video) — der Scrollstand treibt die Bewegung.

| Datei | Quelle (Adobe Stock) | Bearbeitung |
|---|---|---|
| `schiff.webp` | 506727011 | freigestellt (rembg), Text-/Wasserbereich abgeschnitten |
| `stapler.webp` | 238579281 | freigestellt, **gespiegelt**, Container Blau→Kirschrot umgefärbt |
| `lkw.webp` | 49975472 | freigestellt, Leitplanke entfernt, Kabine Blau→Kirschrot umgefärbt |

Umfärbung: HSV-Drehung nur für satte Blautöne (H 0,52–0,75 · S>0,25) nach
Kirschrot — Glasflächen bleiben unberührt, weil sie zu wenig Sättigung haben.

### `assets/videos/` — Higgsfield-Clips (aktuell nicht eingebunden)

KI-generiert am 14.08.2026 über das Kundenkonto (je 5 s, 1280px, H.264+VP9).
Waren als Szenen eingebaut, wurden zugunsten der offenen Scroll-Bühne wieder
ausgebaut — behalten für spätere Verwendung (z. B. Social Media, Hero).

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
