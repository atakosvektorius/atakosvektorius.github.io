/**
 * Atakos Vektorius — Bendroji aplikacijos ir aplinkų konfigūracija
 * Automatiškai nustato aplinką pagal `window.location.hostname`.
 */
(function (global) {
  'use strict';

  var hostname = (global.location && global.location.hostname) || '';
  var port = (global.location && global.location.port) || '';
  var isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

  var config = {
    // Aplinkos nustatymas
    isDev: isLocal,

    // API bazinis adresas:
    // - Local dev (Wrangler Assets portas 8787) arba produkcijoje: '' (Same-Origin)
    // - Local dev (Live Server portas 5500 ir pan.): 'http://localhost:8787'
    apiBaseUrl: (port === '8787' || !isLocal) ? '' : 'http://localhost:8787',

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
