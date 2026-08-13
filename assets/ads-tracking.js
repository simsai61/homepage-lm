/* Google-Ads-Conversion-Tracking für lm-agentur.at
 *
 * Zweck: Meldet Klicks auf WhatsApp- und Telefon-Links als Conversions an
 * Google Ads, damit die Kampagne "Werbetechnik Vorarlberg — Suche" endlich
 * misst, was die Klicks bringen.
 *
 * AKTIVIERUNG (solange ADS_ID leer ist, tut dieses Skript exakt nichts):
 * 1. In Google Ads: Zielvorhaben → Conversions → Neue Conversion-Aktion
 *    → Website → manuell: "WhatsApp-Klick" (Lead) und "Anruf-Klick Website" (Lead)
 * 2. Bei "Tag einrichten" → "Selbst einrichten": Conversion-ID (AW-…) und
 *    die beiden Labels ablesen und unten eintragen.
 * 3. Vor dem Livegang: Datenschutzerklärung um Google-Ads-Absatz ergänzen.
 *
 * Datenschutz: Consent Mode v2, ad_storage standardmäßig DENIED — es werden
 * keine Werbe-Cookies gesetzt, Conversions laufen als cookielose Pings.
 */
(function () {
  var ADS_ID = '';          // z. B. 'AW-123456789'  — leer = Skript inaktiv
  var LABEL_WHATSAPP = '';  // Label der Aktion "WhatsApp-Klick"
  var LABEL_ANRUF = '';     // Label der Aktion "Anruf-Klick Website"

  if (!ADS_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  gtag('js', new Date());
  gtag('config', ADS_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
  document.head.appendChild(s);

  function melden(label) {
    if (label) gtag('event', 'conversion', { send_to: ADS_ID + '/' + label });
  }

  // Capture-Phase, damit auch dynamisch befüllte CTAs (kontakt.html) erfasst werden
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el || !el.href) return;
    if (el.href.indexOf('wa.me/') !== -1 || el.href.indexOf('api.whatsapp.com') !== -1) {
      melden(LABEL_WHATSAPP);
    } else if (el.href.indexOf('tel:') === 0) {
      melden(LABEL_ANRUF);
    }
  }, true);
})();
