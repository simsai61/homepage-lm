# Erklärvideo mit Sprecherstimme — Drehbuch (Reel, 9:16, ca. 45 s)

Stand 30.07.2026. Umsetzung, sobald das Higgsfield-Guthaben aktiv ist.
Bausteine: vorhandener Screencast (Zeitplaner + Funnel), KI-Clip AY-Nachtfoto,
deutsche KI-Erklärstimme (Higgsfield `generate_audio`), Zusammenbau über
`explainer_video` (Blöcke à Clip + Sprecher-Take, eingebrannte Untertitel).

## Blöcke

| # | Bild (Clip) | Sprechertext (Erklärstimme, Deutsch, ruhig) |
|---|---|---|
| 1 | AY-Nachtclip (KI, neu in 5 s / 1080p) | „Wer nicht wirbt, stirbt. Wir machen Vorarlbergs Neueröffnungen sichtbar." |
| 2 | Screencast: Zeitplaner, Termin wird gesetzt | „Sie eröffnen bald? Tragen Sie Ihren Termin ein — der Zeitplaner rechnet zurück, wann Sie starten müssen." |
| 3 | Screencast: Einschätzung „Es wird knapp" | „Und er sagt ehrlich, wenn es eng wird — und was wir dann vorziehen, damit Sie sichtbar eröffnen." |
| 4 | Screencast: Funnel, drei Fragen | „Angebot anfragen? Drei Fragen genügen. Kein Formular, keine Anmeldung." |
| 5 | Screencast: fertige WhatsApp-Nachricht | „Am Ende steht Ihre Nachricht fertig da — und landet direkt bei Sait. Ländle Blitz Marketing, Meiningen." |

## Technischer Ablauf (wenn Guthaben da)
1. AY-Clip neu: `kling3_0_turbo`, 5 s, 9:16, 1080p (~10 Credits)
2. Screencast in 4 Blöcke schneiden (ffmpeg, lokal, kostenlos)
3. Stimme: `generate_audio`, deutsche ruhige Männer- oder Frauenstimme, 5 Takes
4. `explainer_video`: 5 Blöcke + Takes, Untertitel-Font `patrick` (0,05 Cr/Block)
5. Grob geschätzt: 15–25 Credits gesamt, je nach Stimme/Retakes

## Offene Entscheidung für Sait
- Männliche oder weibliche Stimme? (Vorschlag: männlich, ruhig — passt zum
  „Sie bekommen mich"-Ton, auch wenn es nicht Saits echte Stimme ist.
  Alternative: Sait spricht die 5 Sätze selbst per Handymemo ein — am
  glaubwürdigsten und kostenlos; Datei reicht als Sprachnachricht.)
