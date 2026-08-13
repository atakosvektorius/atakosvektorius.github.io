/**
 * CookieConsent Configuration & Integration
 * Atakos vektorius (https://atakosvektorius.lt)
 */

function consentGranted() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'analytics_storage': 'granted'
        });
    }
    // Microsoft Clarity — pirmas užkrovimas po sutikimo
    if (!window.clarity) {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "wsit95fqbp");
    }
    if (typeof clarity === 'function') {
        clarity('consentv2', {
            ad_Storage: 'denied',
            analytics_Storage: 'granted'
        });
    }
}

function consentDenied() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
        });
    }
    if (window.clarity) {
        clarity('consentv2', {
            ad_Storage: 'denied',
            analytics_Storage: 'denied'
        });
    }
}

window.addEventListener('load', function () {
    if (typeof initCookieConsent !== 'function') return;
    var cookieconsent = initCookieConsent();
    cookieconsent.run({
        delay: 3500,
        autorun: true,
        current_lang: 'en',
        theme_css: '/css/cookieconsent.css',
        autoclear_cookies: true,
        page_scripts: true,
        onAccept: function (cookie) {
            if (cookieconsent.allowedCategory('analytics')) {
                consentGranted();
            }
        },

        onChange: function (cookie, changed_preferences) {
            if (cookieconsent.allowedCategory('analytics')) {
                consentGranted();
            } else {
                consentDenied();
                cookieconsent.eraseCookies(['cc_cookie', '_ga', '_ga_MM3XFZX1JX', '_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM']);
            }
        },

        languages: {
            en: {
                consent_modal: {
                    title: '<a href="javascript:void(0);" aria-label="Peržiūrėti privatumo politiką" data-cc="c-settings">Privatumo politika</a> ',
                    description: 'Sveiki atvykę,<br>norime paprašyti Jūsų sutikimo aktyvuoti Google ir Microsoft analitikos įrankius.',
                    primary_btn: {
                        text: 'Sutinku',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Nesutinku',
                        role: 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Privatumo politikos nustatymai',
                    save_settings_btn: 'Užsaugoti pakeitimus',
                    accept_all_btn: 'Priimti visus',
                    reject_all_btn: 'Išvalyti',
                    cookie_table_headers: [
                        { col1: 'Name' },
                        { col2: 'Domain' },
                        { col3: 'Expiration' },
                        { col5: 'Type' }
                    ],
                    blocks: [
                        {
                            title: 'Slapukų naudojimas',
                            description: 'Ši svetainė naudoja Google Analytics ir Microsoft Clarity įrankius svetainės lankomumo bei naudotojų sąveikos analizei. Google Analytics renka anoniminius statistinius duomenis apie apsilankymus ir naršymo srautą, o Microsoft Clarity papildomai užfiksuoja anonimines sesijų atkartojimo įžvalgas (šilumos žemėlapius, paspaudimų ir slinkimo duomenis) — tai padeda mums tobulinti svetainės naudotojo patirtį. Slapukai („cookies“) naudojami tik gavus Jūsų aiškų sutikimą ir saugomi Jūsų naršyklėje; statistiniai duomenys saugomi atitinkamai Google bei Microsoft sistemose. Daugiau informacijos: Google privatumo politika https://policies.google.com/privacy ir Microsoft privatumo pareiškimas https://privacy.microsoft.com/lt-lt/privacystatement. Galite bet kada valdyti slapukų nustatymus arba atšaukti savo sutikimą naršyklės nustatymuose.'
                        }, {
                            title: 'Būtini slapukai',
                            description: 'Šie slapukai skirti rezervacijos sistemai Cal.com veikti bei atpažinti, ar lankytojas sutiko su analitikos įrankių (Google Analytics, Microsoft Clarity) prašymu. Taip užtikrinamas banerio pasirodymas naujiems arba nerodymas sugrįžtantiems lankytojams.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }

                        },
                        {
                            title: 'Analitikos slapukai (Google + Microsoft)',
                            description: 'Šie slapukai skirti analitikos paslaugoms. Google Analytics identifikuoja naršyklės sesiją ir renka statistiką apie lankytojų veiksmus — kuriuose polapiuose lankomasi ir kurios nuorodos spaudžiamos. Microsoft Clarity anonimiškai fiksuoja sesijų sąveiką (šilumos žemėlapius, paspaudimus, slinkimą), kad galėtume tobulinti svetainės naudotojo patirtį. Visi duomenys yra anonimiški ir negali būti naudojami tapatybei nustatyti.',
                            toggle: {
                                value: 'analytics',
                                enabled: false,
                                readonly: false,
                                reload: 'on_disable'

                            },
                            cookie_table: [
                                {
                                    col1: '_ga',
                                    col2: 'atakosvektorius.lt',
                                    col3: '2 metai',
                                    col5: 'Permanent cookie',
                                    is_regex: true
                                },
                                {
                                    col1: '_ga_MM3XFZX1JX',
                                    col2: 'atakosvektorius.lt',
                                    col3: '2 metai',
                                    col5: 'Permanent cookie'
                                },
                                {
                                    col1: '_clck',
                                    col2: 'atakosvektorius.lt',
                                    col3: '1 metai',
                                    col5: 'Permanent cookie'
                                },
                                {
                                    col1: '_clsk',
                                    col2: 'atakosvektorius.lt',
                                    col3: '1 diena',
                                    col5: 'Permanent cookie'
                                }
                            ]
                        }, {
                            title: 'Registracijos duomenų saugojimas',
                            description: 'Užpildžius DAST skenavimo arba konsultacijos registracijos formą, pateikti duomenys (domeno vardas, el. pašto adresas, pasirinkta data ir laikas) yra saugomi saugioje laikinoje saugykloje iki 48 valandų. Jei per šį laikotarpį nepridedama DNS TXT patvirtinimo reikšmė prie domeno arba neatliekamas skenavimas, duomenys laikomi neaktualiais ir visi susiję failai bei informacija yra visam laikui ištrinami automatiškai.'
                        }, {
                            title: 'Pašalinti slapukus',
                            description: 'Pašalinti analitikos įrankių (Google Analytics, Microsoft Clarity) sukurtus slapukus spauskite „Išvalyti“. Kiti klausimai elektroniniu paštu.',
                        }
                    ]
                }
            }
        }
    });

    // „Išvalyti" mygtuko fix: bibliotekos onChange nešaudo, kai būsena nepasikeičia
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('button');
        if (!btn || btn.textContent.trim() !== 'Išvalyti') return;
        setTimeout(function () {
            cookieconsent.eraseCookies(['cc_cookie', '_ga', '_ga_MM3XFZX1JX', '_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM']);
            location.reload();
        }, 200);
    });
});
