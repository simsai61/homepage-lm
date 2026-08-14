#!/usr/bin/env python3
"""Erzeugt index-standalone.html aus index.html.

Alle Bilder wandern als data-URI ins Dokument, damit die Datei ohne den
Ordner assets/ funktioniert — zum Verschicken und Anschauen.

Gepflegt wird index.html. Diese Ausgabe nie von Hand bearbeiten, sie wird
bei jedem Lauf überschrieben:

    python3 bau-einzeldatei.py
"""
import base64
import os
import re

HIER = os.path.dirname(os.path.abspath(__file__))
QUELLE = os.path.join(HIER, 'index.html')
ZIEL = os.path.join(HIER, 'index-standalone.html')

HINWEIS = (
    '<!-- EINZELDATEI-FASSUNG — automatisch erzeugt von bau-einzeldatei.py.\n'
    '     Bilder stecken als data-URI im Dokument, damit die Datei ohne den\n'
    '     Ordner assets/ läuft. Änderungen gehören in index.html. -->\n'
)


def bauen():
    html = open(QUELLE, encoding='utf-8').read()

    # preload zeigt auf eine Datei, die es in der Einzelfassung nicht gibt
    html = re.sub(r'<link rel="preload".*?>\s*', '', html, flags=re.S)
    # nur eine Bildgröße im Dokument, also keine Auswahl mehr nötig
    html = re.sub(r'\s*srcset="[^"]*"', '', html)
    html = re.sub(r'\s*sizes="[^"]*"', '', html)

    def einbetten(treffer):
        pfad = os.path.join(HIER, treffer.group(1))
        with open(pfad, 'rb') as f:
            b64 = base64.b64encode(f.read()).decode()
        endung = 'webp' if pfad.endswith('.webp') else 'png'
        return f'src="data:image/{endung};base64,{b64}"'

    html, anzahl = re.subn(r'src="(assets/(?:bilder|frei)/[^"]+\.(?:webp|png))"',
                           einbetten, html)
    if anzahl == 0:
        raise SystemExit('Kein einziges Bild eingebettet — Pfade geprüft?')

    html = html.replace('<title>', HINWEIS + '<title>', 1)
    open(ZIEL, 'w', encoding='utf-8').write(html)

    # Gegenprobe: es darf kein Verweis auf assets/ übrig bleiben
    rest = re.findall(r'(?:src|href)="(assets/[^"]+)"', html)
    if rest:
        raise SystemExit(f'Noch offene Verweise auf Dateien: {rest}')

    mb = os.path.getsize(ZIEL) / 1024 / 1024
    print(f'{anzahl} Bilder eingebettet · {mb:.2f} MB · {ZIEL}')


if __name__ == '__main__':
    bauen()
