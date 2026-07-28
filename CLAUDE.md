# Website-Relaunch — Ländle Blitz Marketing

**Status:** Fiktiver Gestaltungsentwurf, nicht live. Die bestehende Seite (www.lm-agentur.at) ist ca. 3 Jahre alt und soll ersetzt werden.

**Sprache:** Alle Inhalte und die Kommunikation auf Deutsch (Österreich). Antworten knapp halten.

---

## 1. Das Unternehmen

- **Inhaber:** Sait Simsek
- **Firma:** Ländle Blitz Marketing, Full-Service-Werbeagentur
- **Standort:** Tannenfeldstrasse 3, 6812 Meiningen, Vorarlberg
- **Kontakt:** +43 664 372 48 08 · info@lm-agentur.at · www.lm-agentur.at
- **Instagram:** @laendleblitzmarketing
- **Gegründet:** 2018

### Kerngeschäft
**Komplettpakete für Neueröffnungen.** Wenn ein Kunde bei null anfängt und Logo, Printmedien, Arbeitsbekleidung, Werbeartikel, Beschilderung und Fahrzeugbeschriftung auf einmal braucht. Damit wird der meiste Umsatz gemacht — das muss die Seite in den Mittelpunkt stellen.

### Zielgruppe
Lokale Unternehmer, die in wenigen Wochen aufsperren. Sie wollen wissen: Was kostet es, wie lange dauert es, wird es rechtzeitig fertig. **Keine Designdirektoren** — die Seite darf wertig wirken, aber nicht wie eine Kunstinstallation.

### Produktion
Arbeitsbekleidung, Werbeartikel und Fahrzeugbeschriftung entstehen im Haus. Beschilderung läuft über europäische Produktionspartner. Montagen macht Sait selbst vor Ort.

### Vorlaufzeiten (für den Zeitplaner relevant)
- Leuchtschild: ca. 3 Wochen Produktion
- Werbepylon: ca. 5 Wochen Produktion
- Komplettpaket: ca. 5 Wochen Produktion

---

## 2. Corporate Design

### Farben (CSS-Variablen, in jeder Datei identisch)
```css
--bg:        #14171F   /* Seitenhintergrund, dunkles Anthrazit-Navy */
--surface:   #1B1F2A   /* abgesetzte Flächen */
--glow:      #E8628F   /* Pink, Hauptakzent */
--glow-dim:  #6B3346   /* gedämpftes Pink für aktive Zustände */
--peach:     #F2A65A   /* Orange/Peach, zweiter Akzent */
--magenta:   #C93C77   /* dunkles Magenta */
--text:      #F2F1EA
--muted:     #8A8F9E
--line:      #2C3140   /* Raster- und Rahmenlinien */
```

**Markenverlauf:** `linear-gradient(135deg, #F2A65A 0%, #E8628F 55%, #C93C77 100%)`
Stammt direkt vom Dreiecksmuster der Visitenkarte.

### Schriften
- **Space Grotesk** (600/700) — Überschriften, Wortmarke
- **Inter** (400/500/600) — Fließtext
- **IBM Plex Mono** — Labels, Zeitangaben, Kleinstschrift mit Sperrung

### Logo — WICHTIGE REGELN
- Der **Blitz ersetzt das Z** in "BLITZ" → geschrieben wird `BLIT⚡MARKETING`, niemals `BLITZ⚡`
- Die Rahmenbox umschließt **beide Zeilen gemeinsam** (LÄNDLE + BLIT⚡MARKETING), nicht nur die obere
- Links und rechts außerhalb der Box sitzen kleine Striche auf Höhe der Unterzeile
- Umsetzung siehe `.brandmark` in jeder Datei

### Claim
**"Wer nicht wirbt, stirbt."** — steht als Vorzeile über der Hero-Headline und in der Fußzeile.

### Dreiecksmuster
Als dezentes Eckelement oben rechts im Hero jeder Seite, 16 % Deckkraft, mit weicher Maske. SVG-`<pattern>`, IDs pro Datei eindeutig (`tri4`, `tri5`, …), sonst kollidieren sie.

---

## 3. Dateien

Alle Seiten sind **eigenständige HTML-Dateien ohne Build-Schritt**. Kein Framework, kein Bundler.

| Datei | Inhalt | Signature-Moment | Leitfarbe |
|---|---|---|---|
| `lm-agentur-relaunch.html` | Startseite | Headline als Leuchtschild, das angeht | Pink |
| `lm-agentur-relaunch-sperre.html` | **Vergleichsfassung** — Referenzen als gepinnte Querstrecke | Bildstreifen wandert beim Scrollen | Pink |
| `lm-agentur-grafik-logodesign.html` | Grafik & Logodesign | Skizze zeichnet sich selbst, wird zum Vektor | Peach |
| `lm-agentur-arbeitsbekleidung.html` | Arbeitsbekleidung | Blitz wird Stich für Stich gestickt | Magenta |
| `lm-agentur-kfz-folierung.html` | KFZ-Folierung | Rakel foliert einen Firmenbus | Voller Verlauf |
| `lm-agentur-werbeartikel.html` | Werbeartikel | Presse stempelt den Blitz auf wechselnde Artikel | Peach/Pink |

**Grundidee:** Jede Leistung bekommt einen Moment, der *zeigt* statt behauptet, was gemacht wird. Beim Ausbau weiterer Unterseiten dieses Prinzip fortführen.

### Aufbau der Startseite (Stand: 27.07.2026, CRO/SEO-Umbau)
1. Hero — Claim, Headline, **Schild-Schalter**; Ghost-Button führt jetzt zum Zeitplaner („Reicht meine Zeit noch?")
2. **Komplettpaket für Neueröffnungen** — **Silvio-Slider (Beweis) zuerst**, dann Bento-Raster, dann WhatsApp-CTA-Zeile
3. **Referenzen** — Projektkarten (AY zuerst) + Basecamp-Slider, danach CTA-Zeile (WhatsApp + Zeitplaner-Link)
4. **Leuchtreklame** — Bella Napoli, Überblendung unbeleuchtet → beleuchtet.
   Am 27.07. hinter die Referenzen gezogen: gehört inhaltlich zum Beweisblock und doppelte davor
   den Schild-Schalter des Heros direkt nach dem Hero.
   Seit 26.07.2026 zeigen beide Fotos **dasselbe Schild an derselben Stelle** (Querformat, vom Kunden
   nachgeliefert) — davor waren es zwei verschiedene Standorte und der Text musste darum herumformulieren.
   Jetzt ist es ein echtes Vorher/Nachher, entsprechend darf der Text das auch behaupten.
5. Prozess — Zeitleiste
6. **Eröffnungs-Zeitplaner** — interaktiv. Am 27.07. gemeinsam mit Prozess **vor die Leistungen** gezogen:
   die sechs Unterseiten-Links der Leistungen wirkten als Ausstiegsrampe vor dem stärksten Verkaufsmoment.
7. Leistungen — sechs Kacheln
8. **Inhaber** — Portraitfoto Sait, Direktkontakt inkl. WhatsApp, Einzugsgebiets-Absatz (Feldkirch, Dornbirn, Bludenz, Frastanz, Warth)
9. **Einblicke** — Projektfilme hochkant + Verweis auf Instagram
10. Kontakt + Kontaktkarte (WhatsApp jetzt erster Button, Erreichbarkeits-Zeile darunter)
11. Fußzeile (jetzt mit Leistungen-Spalte: 6 Unterseiten-Links, auf allen Seiten)

Nav- und Footer-Anker folgen dem Scrollweg: Komplettpaket → Referenzen → Leuchtreklame → Zeitplaner → Leistungen.
Im Mobilmenü gibt es zusätzlich den Punkt „Angebot anfragen" (`.nav-kontakt`, desktop ausgeblendet).

**Stand Unterseiten (26.07.2026): alle vier sind auf das neue Design umgestellt.**

| Seite | Signature-Moment | Interaktion |
|---|---|---|
| KFZ-Folierung | Rakel zieht Folie über den Bus | Vollfolierung / Beschriftung |
| Grafik & Logodesign | Skizze zeichnet sich und wird Vektor | Belastungstest in vier Anwendungen |
| Arbeitsbekleidung | Blitz wird Stich für Stich gestickt | Stickerei / Druck |
| Werbeartikel | Presse stempelt den Blitz auf | fünf Artikel zur Auswahl |

Alle vier Signature-Momente starten erst beim Hereinscrollen (`IntersectionObserver`) statt beim
Laden — vorher liefen sie ungesehen ab, wenn sie unterhalb des Bildschirms lagen.
Alle Skripte sind in `(function(){…})()` gekapselt, keine `onclick`-Attribute mehr im Markup.

Zwei unterschiedliche Ansätze, bewusst gewählt:
- **KFZ-Folierung** lebt von **echten Fotos** (Mamma Mia, Silvio) — ein foliertes Auto muss man sehen.
- **Grafik & Logodesign** kommt **ohne Kundenfotos** aus (so gewünscht) und zeigt stattdessen
  den *Prozess*: eine Skizze zeichnet sich selbst und wird zum Vektor, dazu ein interaktiver
  Belastungstest, der das **eigene** Logo als Leuchtschild, Visitenkarte, Stickerei und auf
  Papier durchspielt. Ein Logo ist ein Prozess, kein Produktfoto.

**Fallstrick beim Zeichnen-Effekt:** `stroke-dasharray` muss der echten Pfadlänge entsprechen,
sonst stimmt die Animation nicht. Deshalb wird sie zur Laufzeit gemessen
(`getTotalLength()`) und als CSS-Variable gesetzt — nicht schätzen.

**Fallstrick beim Seitenbau:** Die `.sub-hero`-Regeln (zweispaltiger Unterseiten-Hero) stehen
**nicht** im Startseiten-CSS, sondern werden pro Unterseite ergänzt. Beim Bau der Logodesign-Seite
zunächst vergessen — der Hero war einspaltig. Bei jeder weiteren Unterseite mitnehmen.

### So werden Unterseiten gebaut
Kopf, Fuß, CSS und die gemeinsamen Skripte werden **wörtlich aus der Startseite übernommen**
(per Skript extrahiert), damit nichts auseinanderläuft. Nur zwei Dinge werden angepasst:
- **Navigation umbiegen:** `href="#xyz"` → `href="lm-agentur-relaunch.html#xyz"`.
  Ausnahme: `#kontakt` bleibt, weil es die Unterseite selbst hat.
- **Muster-ID eindeutig machen:** jede Datei braucht ein eigenes `<pattern id="...">`
  (Startseite `triHero`, KFZ `triKfz`), sonst kollidieren sie.

Übernommen werden: Logo-Sprite-Loader, Reveal-System, Header/Mobilmenü, Slider, WhatsApp-Knopf.
**Nicht** übernommen: Hero-Schild-Schalter, Blitz-Intro, Neon-Sektion, Zeitplaner, Videos —
die gehören nur auf die Startseite. Die Unterseite bekommt ein eigenes, schlankes Hero-Skript.

### Assets (neu)
```
assets/logo.svg          Volles Logo, fill="currentColor" (aus logo2.svg des Kunden bereinigt)
assets/logo-signet.svg   Nur der Blitz — Favicon, mobiler Header, kleine Größen
assets/sprite.html       <symbol id="lbm-logo"> + <symbol id="lbm-bolt">, per fetch nachgeladen
assets/bilder/*.webp     Referenzfotos, je 1280px + 720px Variante (Suffix -720)
assets/videos/*.mp4      3 Clips à 6–7 MB + Poster als .webp (noch nicht eingebunden)
```
Originale liegen unter `fotos/` und `videos/`. Aufbereitung mit `ffmpeg` + `cwebp`.
Das Logo wird über `<use href="#lbm-logo">` eingebunden und erbt die Farbe via `currentColor`
(Fallback auf Schrifttext, falls das Sprite nicht lädt).

### Showreel (`showreel/`, 28.07.2026)
Ein Film aus den acht Projektfilmen, gebaut mit **Remotion** (React → Video). Eigenes
npm-Projekt neben der Website, berührt die HTML-Dateien nicht. 1080×1920 hochkant,
30 fps, 41 Sekunden: Blitz-Auftakt → acht Ausschnitte à 4,3 s mit Bauchbinde →
Abbinder mit Logo und Kontakt. Farben, Schriften, Reihenfolge und Bildunterschriften
sind wortgleich mit der Startseite.

- `showreel/src/showreel/clips.ts` — die acht Filme mit Anfangsbild und Text
- `showreel/public/videos` und `public/fonts` sind **Symlinks** nach `assets/`,
  das Material liegt also nur einmal im Projekt
- `npm run dev` = Editor mit Vorschau, `npm run render` = Datei nach `out/`
- Details, Fallstricke und Lizenzfrage: `showreel/README.md`

**Zwei Dinge, die im Material stecken** und beim Setzen der Ausschnitte umgangen
werden müssen: Die meisten Clips **enden mit einer weißen Abbinder-Karte mit Logo**
(Hanako ab ca. 20 s, Can'ss ab 33 s, Stadion ab 28 s), und mehrere **beginnen mit
einer Ansprache in die Kamera**, teils mit eingebrannten Textzeilen oder sichtbarer
Kamera-Bedienoberfläche (CT Fassade, Sekunde 3–5). Zum Aussuchen gibt es die
Komposition `Kontaktbogen` (ein Standbild je Sekunde).

**Ton ist stumm.** Baustellengeräusche, teils fremde Musik. Musik gehört beim
Hochladen in Instagram darübergelegt — dort ist sie lizenziert.

---

## 4. Technische Konventionen und Stolperfallen

Diese Punkte sind in dieser Sitzung durch Fehler gelernt worden — bitte einhalten:

### Skripte immer kapseln
Jeder `<script>`-Block wird in `(function(){ ... })();` gewickelt. **Grund:** Auf der Startseite liegen mehrere Blöcke. Zwei davon hatten je eine Funktion `render()` — die zweite überschrieb die erste global und legte die Szenen-Animation lahm. Funktionen, die von Inline-`onclick` gebraucht werden, explizit exportieren:
```js
window.replayScene = replayScene;
```

### Keine CSS-Variablen in SVG-Attributen
`fill="var(--peach)"` **funktioniert nicht** in SVG-Präsentationsattributen. Dort immer den Hex-Wert schreiben. In `<style>`-Regeln sind Variablen dagegen in Ordnung.

### IntersectionObserver bei hohen Sektionen
Eine Schwelle von 0.35 auf eine Sektion, die höher als der Bildschirm ist, wird **nie** erreicht. Deshalb:
- das sichtbare Element beobachten (z. B. `.scene-frame`), nicht die ganze Sektion
- Schwelle niedrig halten (0.12)
- zusätzlich Scroll-Listener als Auffangnetz
- plus `setTimeout`, der nach einigen Sekunden alles einblendet

### Reveals dürfen Inhalte nie dauerhaft verstecken
Die Ausblend-Regeln hängen an `html.rv`. Diese Klasse setzt ein kurzes Skript im `<head>`. Läuft kein JavaScript, wird sie nie gesetzt und alles bleibt sichtbar.

### Gestrichelte Linien fortlaufend aufdecken
`stroke-dashoffset` auf einem Pfad mit `stroke-dasharray` lässt das Muster nur **wandern**, nicht entstehen. Für echtes Stich-für-Stich (Stickerei) braucht es eine `<mask>` mit einem Pfad, dessen Dashoffset animiert wird.

### Reveal-Regel muss die Versteck-Regel überbieten
`html.rv .rev { opacity:0 }` hat Spezifität (0,2,1), `.rev.in { opacity:1 }` nur (0,2,0) —
die Versteck-Regel **gewinnt** und die ganze Seite bleibt unsichtbar. Deshalb zwingend:
```css
html.rv .rev.in { opacity:1; transform:none; }   /* (0,3,1) — schlägt die Versteck-Regel */
```
Dieser Fehler hat beim Neubau alles unterhalb des Heros ausgeblendet.

### Einblendung und Zustand trennen
Der Hero hat drei unabhängige Klassen: `.intro` (Text ist hochgeschoben, wird nie entfernt),
`.lit` (Schild leuchtet, per Schalter umschaltbar) und `.intro-done` (Maske freigegeben).
Hinge das Hochschieben an `.lit`, würde der Schalter den Text aus dem Bild schieben.

### Zeilenmaske kappt Umlaute und Leuchtschein
`overflow:hidden` auf der Zeile für den Hochschiebe-Effekt schneidet bei `line-height` < 1
die Umlautpunkte ab. Lösung: `padding:.14em 0 .1em` plus gleich großes negatives `margin`.
Nach der Animation die Maske freigeben (`.intro-done .ln{overflow:visible}`), sonst wird
der `text-shadow`-Leuchtschein rechteckig abgeschnitten.

### Mobilmenü: max-height großzügig wählen
Die Aufklapp-Animation läuft über `max-height`. Ein zu knapper Wert kappt den letzten
Menüpunkt, sobald einer dazukommt — lieber deutlich über der Inhaltshöhe ansetzen (aktuell 560px
bei 351px Inhalt).

### Hohe Motive im Bildausschnitt
`object-fit:cover` in einem 4:3-Rahmen schneidet bei hochformatigen Motiven oben ab
(Pylon-Spitze, Fassaden-Oberkante). Für solche Bilder `.ref-media.from-top` setzen
→ `object-position:center top`.

### Blitz-Intro (Ladeanimation)
Blitz schlägt ein → Aufblitzen → Claim „Wer nicht wirbt, stirbt!" flackert an und hält →
Seite erscheint → Blitz schrumpft ins Header-Logo. Gesamt ca. 2,4 Sekunden.

**Wann es läuft** — Steuerung über `document.referrer`, nicht über gespeicherte Zustände:

| Situation | Intro |
|---|---|
| Aufruf über Google, Instagram, getippte Adresse | ✔ läuft |
| Startseite neu laden (F5) | ✔ läuft |
| Von einer Unterseite zurück zur Startseite | ✘ übersprungen — der Besucher ist schon mittendrin |

Die Prüfung schließt bewusst den Selbstverweis aus (`referrer === aktuelle Seite`), sonst würde
ein Neuladen als „interne Navigation" gelten und das Intro unterdrücken.

Drei weitere Regeln, die nicht aufgeweicht werden dürfen:
- **Nie blockierend.** Die Seite ist darunter fertig gerendert, das Intro ist nur eine Schicht
  darüber. Ohne JavaScript wird `html.bolt-on` nie gesetzt → gar kein Overlay.
- **Überspringbar** per Klick, Tipp oder Taste. Zusätzlich eine Reißleine (`setTimeout`, 4,5 s),
  die das Overlay auf jeden Fall entfernt.
- **`prefers-reduced-motion`** überspringt das Intro komplett.

Der Blitz ist im Intro **inline** eingebettet, nicht aus `assets/sprite.html` — das Sprite wird
per `fetch` nachgeladen und wäre zum Startzeitpunkt noch nicht da.

### Videos: nichts vorladen
Die drei Clips liegen bei 6,5–7,8 MB. Sie stehen mit `preload="none"` und einem `poster`-Standbild
im Dokument — beim Seitenaufruf wird **kein einziges Byte Video** geladen, erst der Klick holt die
Datei. Ohne das würden 21 MB mitgeladen. Weiter: `playsinline` (sonst öffnet iOS den Vollbildplayer),
es läuft immer nur ein Clip, und beim Verlassen des Bildausschnitts wird pausiert.

Inhaltlich sind es durchgehend **Projektfilme**, keine Selfie-Clips. Acht Stück, Reihenfolge fix
(Hanako zuerst, so gewünscht): Hanako · CT Pylon (Kran) · Bella Napoli Dornbirn · Can'ss Feldkirch ·
CT Buchstaben · Profi Group Messestand · Stadion · eigene Produktion.

**Standbilder immer von Hand wählen.** Automatisch aus dem Videoanfang gegriffene Bilder waren
durchweg unbrauchbar — dunkel, verwackelt oder mit Retro-Filter-Overlay. Aktuelle Zeitpunkte:
hanako 19 s · ct-pylon 10 s · ct-buchstaben 5 s · bellanapoli 11 s · messestand 1 s ·
can'ss 26 s · stadion 21 s · büro 32 s. Vorgehen: mit `ffmpeg ... tile=6x2` ein Übersichtsraster
bauen, scharfen Moment aussuchen, dann gezielt extrahieren.

**Achtung bei der Dauer:** Nach dem Komprimieren sind manche Clips kürzer als die Quelle
(CT Pylon: 21 s → 16 s). Zeitstempel für Standbilder immer an der *komprimierten* Datei prüfen.

Layout: vier Spalten ab 1100 px, drei darunter, ab 860 px eine wischbare Reihe.

### Ein Projekt = eine Karte
Mehrere Fotos desselben Kunden werden **nicht** als getrennte Karten gezeigt, sondern in einer
Mini-Galerie innerhalb der Karte (`.gal.gal-card`). Sonst wirkt die Referenzliste aufgebläht und
ein Projekt sieht aus wie drei. Der Slider-Code ist derselbe wie bei den großen Strecken —
nur die Optik ist kompakt: Pfeile über dem Bild (bei Touch dauerhaft sichtbar, sonst bei Hover),
Punkte unten, Zähler oben rechts (`.gal-tag`).

**Automatischer Bildwechsel:** Galerien mit `data-auto="<ms>"` blättern von selbst weiter,
solange sie im Bild sind (Karten 3,6 s · große Strecken 5,6 s). Damit sieht der Besucher alle
Fotos, ohne klicken zu müssen — das war das eigentliche Problem, nicht dass er zu schnell scrollt.
Sobald er selbst tippt, wischt, klickt oder die Tastatur benutzt, hört der Automatikbetrieb
**dauerhaft** auf (`aufgeben`-Flag). Bei Hover pausiert er, bei `prefers-reduced-motion` läuft er nie.

**Kein Scroll-Blockieren — entschieden und abgehakt (26.07.2026).**
Der Wunsch, den Nutzer zum Anschauen aller Bilder zu zwingen, wird über den Automatikbetrieb
gelöst. Eine Sperr-Variante wurde als `lm-agentur-relaunch-sperre.html` tatsächlich gebaut und
verglichen: gepinnte Querstrecke mit allen 16 Fotos, technisch sauber (natives Scrollen, kein
Event-Abfangen). **Ergebnis: verworfen** — bei 16 Bildern braucht sie 6390px Scrollweg
(7,1 Bildschirmhöhen) und wirkt dadurch chaotisch statt beeindruckend.
Nicht erneut vorschlagen.

**Bildunterschriften auf schmalen Bildschirmen (≤680px)** stehen **unter** dem Foto, nicht darüber
(`.gal-cap{position:static}`). Als Overlay verdecken sie auf dem Handy das halbe Bild.

Aktueller Stand: 8 Projektkarten, davon 5 mit Galerie, insgesamt 16 Fotos.
Basecamp (4 Bilder) und Silvio (3 Bilder) bleiben bewusst große Strecken mit Bildunterschriften,
weil dort die Reihenfolge eine Geschichte erzählt.

### Scrollgesteuerte Bewegung statt abgespielter Sequenzen
Die Karten im Kerngeschäft fliegen von links/rechts herein (`.fly.from-l` / `.fly.from-r`),
die Leistungskacheln steigen auf (`.rise`). Beides hängt über `animation-timeline: view()`
direkt am Scrollstand — der Nutzer fährt die Bewegung selbst, nichts wird abgespielt.
Wo der Browser das nicht kann, greift der bestehende IntersectionObserver-Weg (`.in`).

**Bewusste Entscheidung gegen Scroll-Sperre:** Die Idee, den Nutzer bis zum Ende der Animation
am Weiterscrollen zu hindern, wurde verworfen. Zielgruppe sind Unternehmer unter Zeitdruck;
außerdem würden die Ankerlinks der Navigation (`#komplettpaket`, `#leistungen`) genau dort
in die Sperre laufen. Scrollgesteuert wirkt hochwertiger und hält niemanden fest.

### Barrierefreiheit
Jede Animation prüft `prefers-reduced-motion` und springt dann direkt in den Endzustand.

### Lenis (sanftes Scrollen)
Auf der Startseite eingebunden, feste Version über CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js"></script>
```
Fällt sauber auf natives Scrollen zurück, wenn die Bibliothek nicht lädt. Auf Touch-Geräten bleibt das Scrollen absichtlich nativ.
**Für die echte Seite:** Datei selbst hosten statt vom CDN laden — schneller und datenschutzrechtlich sauberer.

---

## 5. Inhaltliche Entscheidungen

### Hero-Headline (festgelegt)
```
WER NICHT WIRBT, STIRBT.        ← Vorzeile, klein, Mono
SIE ERÖFFNEN.
WIR MACHEN SIE
SICHTBAR.                        ← leuchtet in Peach auf
```

### Leistungen — bewusst NICHT aufgeführt
Suchmaschinenoptimierung, Online-Shops und Social Media Marketing wurden entfernt. Nicht wieder aufnehmen.

Aktuell gelistet: Grafik & Logodesign · Printmedien · Arbeitsbekleidung · Werbeartikel · KFZ-Folierung · Webdesign

### Eröffnungs-Zeitplaner — Rechenlogik
Gesamter Vorlauf = Produktionsdauer + 4 Wochen (Erstgespräch 1 + Gestaltung 2 + Aufmaß/Freigabe 1 + Montage 1, teils überlappend).

| Modus | Produktion | Gesamt |
|---|---|---|
| Leuchtschild | 3 Wochen | 7 Wochen |
| Werbepylon | 5 Wochen | 9 Wochen |
| Komplettpaket | 5 Wochen | 9 Wochen |

Drei Einschätzungen: "gut dran" / "passt, ohne Puffer" / "es wird knapp — X Wochen fehlen". Beim Knapp-Fall wird konkret genannt, was vorgezogen wird (Logo, Printmedien, Arbeitsbekleidung zuerst; Beschilderung und Folierung danach).

### Entfernt
Die Zahlenleiste mit "500+ zufriedene Kunden" wurde gestrichen — geschätzte Rundzahlen wirken schwächer als ein konkreter Satz. An ihrer Stelle steht jetzt der Zeitplaner. Das Gründungsjahr 2018 ist in die Fußzeile gewandert.

---

## 6. Offene Punkte

### Conversion: Zeitplaner-Abschluss und WhatsApp (26.07.2026)
Der Zeitplaner endete bisher in einer **Sackgasse** — er sagte „Es wird knapp, 6 Wochen fehlen"
und bot dann nichts an. Genau dort ist der stärkste Verkaufsmoment der Seite.

Jetzt schließt `.planner-cta` daran an und **übernimmt Termin und Vorhaben in die Anfrage**:
Die WhatsApp-Nachricht und der E-Mail-Betreff sind vorausgefüllt („Ich eröffne am 16.08.2026 und
interessiere mich für: Komplettpaket. Laut Ihrem Zeitplaner brauche ich rund 9 Wochen Vorlauf.").
Der begleitende Satz richtet sich nach der Einschätzung — bei „knapp" drängt er, bei „gut dran" nicht.

**WhatsApp statt Chatbot.** Zielgruppe sind Gastronomen und Handwerker in Vorarlberg, die schreiben
WhatsApp. Ein `wa.me`-Link lädt **keine Meta-Skripte und setzt keine Cookies** — anders als ein
eingebettetes Widget braucht er also keinen Cookie-Hinweis.
Nummer: `436643724808` — von Sait am 26.07.2026 als seine WhatsApp-Nummer bestätigt.

Bewusst **nicht** gebaut: ein KI-Chatbot. Begründung — er widerspricht dem eigenen Versprechen
„Sie bekommen mich. Nicht ein Callcenter.", ein Sprachmodell erfindet Termine und Preise
(Geschäftsrisiko bei Eröffnungsterminen), und die Seite hat keinen Server für einen API-Schlüssel.

### Offen: Kontaktformular
Bewusst zurückgestellt. **Hoster ist World4You** — der kann PHP, ein echtes Formular ist also ohne
Fremddienst wie Formspree machbar. Vorlage dafür existiert bereits als
`/Users/lm/Downloads/Bedarfsanalyse.html` (internes Aufmaß-Werkzeug von Sait, sehr gut für den
Vor-Ort-Termin, aber zu lang und zu fachlich für eine öffentliche Erstanfrage).
**Achtung bei der Übernahme:** Dieses Werkzeug rechnet nur mit der reinen Produktionszeit
(Leuchtschild 21 Tage), der Zeitplaner auf der Website mit Gesamtvorlauf (7 Wochen).
Beide würden demselben Kunden Unterschiedliches sagen — vor einer Zusammenführung klären.

### Erledigt (27.07.2026) — CRO/SEO-Durchgang über alle 7 Seiten
Basis: 4-dimensionales Audit (Reihenfolge/CRO, SEO-Inhalt, SEO-Technik, CTA/Vertrauen), jeder Befund adversarial verifiziert.
- **Reihenfolge**: Silvio-Beweis an den Sektionsanfang, Leuchtreklame hinter die Referenzen, Prozess+Zeitplaner vor die Leistungen (Begründungen oben)
- **Zahlen-Widerspruch behoben**: Bento-Kachel sagte „5 Wochen inkl. Montage", Zeitplaner rechnet 9 — Kachel jetzt „Produktionszeit 5 Wochen" + Verweis auf 9 Wochen gesamt
- **CTA-Lücke geschlossen**: WhatsApp-CTA-Zeilen am Ende von Komplettpaket und Referenzen (`.sec-cta`), Mobilmenü-Punkt „Angebot anfragen", WhatsApp im Inhaber-Block, Kontaktband mit WhatsApp zuerst
- **Zeitplaner**: Verknappungsfloskel („bevor die Produktion ausgebucht ist") ersetzt, WhatsApp-Nachricht verzweigt jetzt im Knapp-Fall, Hinweiszeile erklärt Vorbefüllung/Unverbindlichkeit, h4→h3 (Hierarchie)
- **Kosten-Frage adressiert** (ohne Preise): Kontaktband-Subline + Zeitplaner-Hint versprechen Richtwert im Erstgespräch — **Wortlaut mit Sait bestätigen**
- **SEO**: Title/Description neu (Werbetechnik + Vorarlberg vorn), H2 Referenzen/Leuchtreklame keyword-tragend, Einzugsgebiets-Absatz, alt-Texte mit Orten (nur belegte), JSON-LD LocalBusiness (ohne Rating/Öffnungszeiten), OG/Twitter-Tags, canonical-Platzhalter, Favicon (`assets/favicon.svg` + PNGs), theme-color, lang="de-AT" — alles auf allen 7 Seiten
- **Neue Assets**: `assets/bilder/og-image.jpg` (1200×630, aus AY-Nachtfoto), `assets/favicon.svg`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`
- Backup davor: `_backup-vor-relaunch/2026-07-27-vor-cro-seo/`

### Erledigt (26.07.2026)
- Echtes Logo als SVG eingebunden (Voll- und Signet-Variante, per CSS einfärbbar)
- Referenzen-Sektion mit echten Fotos
- Inhaber-Vorstellung mit Portraitfoto
- Leuchtreklame-Sektion mit Ein/Aus-Überblendung
- Wiederverwendbarer Slider (Silvio-Projektstrecke, Basecamp-Strecke)

### Als Nächstes geplant
1. **Die vier Leistungs-Unterseiten auf das neue Design umstellen** — sie nutzen noch den alten
   CSS-Nachbau des Logos und passen optisch nicht zur Startseite. Höchste Priorität.
2. **Showreel verwenden** — liegt fertig unter `showreel/`, gerendert nach
   `showreel/out/showreel.mp4`. Naheliegend: als Reel auf Instagram und im
   Abschnitt „Einblicke" der Startseite über die Clip-Reihe gesetzt.
3. **Instagram sehr präsent einbauen.** Ein Live-Feed wurde vorerst zurückgestellt, ist aber gewünscht.
4. Restliche Unterseiten: Webdesign, Printmedien.

### Dafür wird vom Kunden noch gebraucht
- **Jahreszahlen** zu den Referenzprojekten (stehen aktuell nicht auf der Seite)
- **Freigabe zur Namensnennung** für CT Automotive, Biedenkapp, SARK, Basecamp, Glühwürmchen,
  Bella Napoli und Hausmeisterdienste Silvio — die Namen stehen bereits auf der Seite
- Nach Möglichkeit **Vorher-Fotos** — bei Werbetechnik der stärkste Beweis
- Höher aufgelöste Fotos, falls vorhanden (aktuelle stammen aus Instagram-Auflösung, ~1300px)

### Hinweise zum Instagram-Feed
Die alte Instagram-Schnittstelle für private Konten wurde am 4. Dezember 2024 abgeschaltet. Ein Live-Feed setzt heute ein Creator- oder Business-Konto voraus. Praktikabel ist ein Widget-Dienst (Behold, LightWidget, SnapWidget), der Anmeldung und Token-Erneuerung übernimmt. **Achtung:** Solche Widgets laden Skripte von Meta nach — auf der echten Seite ist dafür ein Cookie-Hinweis nötig. Dienste bevorzugen, die Bilder auf eigenen Servern zwischenspeichern.

---

## 7. Arbeitsweise

- Bestehende Konventionen aus den vorhandenen Dateien übernehmen, nicht neu erfinden
- Jede neue Unterseite bekommt einen eigenen Signature-Moment und eine eigene Leitfarbe aus der Markenfamilie
- Kopfzeile, Fußzeile, Kontaktkarte und Prozess-Zeitleiste sind auf allen Seiten baugleich
- Nach jeder Änderung an einer Datei mit mehreren Skriptblöcken auf globale Namenskollisionen prüfen
- Effekte sparsam dosieren: Die Seite verkauft Handwerk, nicht Webdesign
