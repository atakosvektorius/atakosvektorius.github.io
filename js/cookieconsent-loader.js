/**
 * CookieConsent Lazy Loader on User Interaction
 * Atakos vektorius (https://atakosvektorius.lt)
 */
(function () {
    var loaded = false;
    var queueOpenSettings = false;

    function loadCookieConsent(openSettings) {
        if (openSettings) {
            queueOpenSettings = true;
        }

        if (loaded) {
            if (queueOpenSettings && typeof initCookieConsent === 'function') {
                var cc = initCookieConsent();
                if (cc && typeof cc.showSettings === 'function') {
                    cc.showSettings(0);
                    queueOpenSettings = false;
                }
            }
            return;
        }
        loaded = true;

        // Pašaliname klausytojus po pirmos sąveikos
        var events = ['scroll', 'keydown', 'touchstart', 'pointerdown', 'mousemove'];
        events.forEach(function (evt) {
            window.removeEventListener(evt, onUserInteraction, { passive: true });
        });

        // 1. Įkeliame stilių
        if (!document.getElementById('cc-styles')) {
            var link = document.createElement('link');
            link.id = 'cc-styles';
            link.rel = 'stylesheet';
            link.href = '/css/cookieconsent.css';
            document.head.appendChild(link);
        }

        // 2. Įkeliame biblioteką
        var scriptCore = document.createElement('script');
        scriptCore.src = '/js/cookieconsent.js';
        scriptCore.onload = function () {
            // 3. Įkeliame konfigūraciją
            var scriptConfig = document.createElement('script');
            scriptConfig.src = '/js/cookieconsent-config.js';
            scriptConfig.onload = function () {
                if (queueOpenSettings && typeof initCookieConsent === 'function') {
                    var cc = initCookieConsent();
                    if (cc && typeof cc.showSettings === 'function') {
                        cc.showSettings(0);
                        queueOpenSettings = false;
                    }
                }
            };
            document.body.appendChild(scriptConfig);
        };
        document.body.appendChild(scriptCore);
    }

    function onUserInteraction() {
        loadCookieConsent(false);
    }

    // Registruojame vartotojo sąveikos įvykius
    var interactionEvents = ['scroll', 'keydown', 'touchstart', 'pointerdown', 'mousemove'];
    interactionEvents.forEach(function (evt) {
        window.addEventListener(evt, onUserInteraction, { passive: true, once: true });
    });

    // Pervedame paspaudimus ant slapukų nustatymų nuorodų tiesiogiai į modalinio lango atidarymą
    document.addEventListener('click', function (e) {
        var triggerEl = e.target && e.target.closest && e.target.closest('[data-cc="c-settings"], [data-cc="open-settings"]');
        if (triggerEl) {
            e.preventDefault();
            loadCookieConsent(true);
        }
    });

    // Globali funkcija išoriniam iškvietimui
    window.loadCookieConsent = loadCookieConsent;
})();
