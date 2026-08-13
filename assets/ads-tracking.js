/* Lead-Messung auf allen Seiten — Ergänzung zum Anfrage-Funnel (kontakt.html).
 *
 * Zweck: Die Google-Ads-Anzeigen führen auf die Leistungsseiten. Dort gibt es
 * WhatsApp- und Telefon-Knöpfe, aber bisher meldete nur der Anfrage-Funnel
 * einen Lead. Dieses Skript meldet Kontakt-Klicks auf ALLEN Seiten als
 * „generate_lead" an Google Analytics (dort Schlüsselereignis, mit dem
 * Google-Ads-Konto verknüpft) und als „Lead" an das Meta-Pixel.
 *
 * Datenschutz: Es wird NICHTS geladen und NICHTS übertragen, solange der
 * Besucher nicht im Cookie-Banner zugestimmt hat — ohne Zustimmung existieren
 * window.gtag/window.fbq nicht, und dieses Skript tut dann exakt nichts.
 * Das entspricht dem Versprechen der Datenschutzerklärung.
 *
 * Hinweis: Der Anfrage-Funnel (kontakt.html) meldet seine eigenen CTA-Klicks
 * selbst (Bereich .fn-cta) — diese Klicks werden hier übersprungen, damit
 * kein Lead doppelt gezählt wird.
 *
 * Nicht verwendet, aber dokumentiert: Google-Ads-Conversion-ID AW-18360926524
 * (falls später direktes Ads-Tagging statt GA4-Import gewünscht ist).
 */
(function () {
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el || !el.href) return;

    // Funnel-Klicks meldet kontakt.html selbst — nicht doppelt zählen
    if (el.closest && el.closest('.fn-cta')) return;

    var kanal = null;
    if (el.href.indexOf('wa.me/') !== -1 || el.href.indexOf('api.whatsapp.com') !== -1) kanal = 'WhatsApp';
    else if (el.href.indexOf('tel:') === 0) kanal = 'Anruf';
    else if (el.href.indexOf('mailto:') === 0) kanal = 'E-Mail';
    if (!kanal) return;

    // Nur nach Zustimmung existieren gtag/fbq (siehe Consent-Banner-Skript)
    if (window.gtag) gtag('event', 'generate_lead', { kanal: kanal, quelle: 'seite' });
    if (window.fbq) fbq('track', 'Lead');
  }, true);
})();
