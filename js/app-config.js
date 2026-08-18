/**
 * Atakos Vektorius — Bendroji aplikacijos ir aplinkų konfigūracija
 * Automatiškai nustato aplinką pagal `window.location.hostname`.
 */
(function (global) {
  'use strict';

  var hostname = (global.location && global.location.hostname) || '';
  var isLocal = hostname === 'localhost';

  var config = {
    // Aplinkos nustatymas
    isDev: isLocal,

    // API bazinis adresas:
    // - Local dev: http://localhost:8787 (Wrangler local worker)
    // - Production: '' (santykinis kelias /api/* tame pačiame domene)
    apiBaseUrl: isLocal ? 'http://localhost:8787' : '',

    // Cloudflare Turnstile Site Key:
    // - Local dev: 1x00000000000000000000AA (Cloudflare Always-Pass testinis raktas)
    // - Production: 0x4AAAAAAETBE__x1lWtXIPj (Gamybinis Atakos Vektorius raktas)
    turnstileSiteKey: isLocal ? '1x00000000000000000000AA' : '0x4AAAAAAETBE__x1lWtXIPj',
  };

  /**
   * Automatinis Turnstile elementų data-sitekey inicializavimas pagal esamą aplinką
   */
  config.initTurnstile = function () {
    var turnstileElements = document.querySelectorAll('.cf-turnstile');
    for (var i = 0; i < turnstileElements.length; i++) {
      turnstileElements[i].setAttribute('data-sitekey', config.turnstileSiteKey);
    }
  };

  // Užtikriname paleidimą vos užkrovus DOM
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', config.initTurnstile);
    } else {
      config.initTurnstile();
    }
  }

  global.appConfig = config;
})(typeof window !== 'undefined' ? window : this);
