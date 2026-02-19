/**
 * CATALOGUE FRAMED - 3-Panel Navigator Logic
 * A) Year navigation — click handler, active state, iframe src
 * B) Country navigation — A-Z letters, embedded data, styled rendering
 * C) Mobile toggles — slide-out sidebars, overlay, body scroll lock
 */

(function () {
    'use strict';

    var iframe = document.getElementById('catalogue-iframe');
    var yearsSidebar = document.querySelector('.catalogue-sidebar--years');
    var countriesSidebar = document.querySelector('.catalogue-sidebar--countries');
    var overlay = document.getElementById('catalogue-overlay');

    // ========== A) YEAR NAVIGATION ==========

    function initYearNavigation() {
        var yearLinks = yearsSidebar.querySelectorAll('.year-list__link');

        yearLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var href = this.getAttribute('data-href');
                if (href && iframe) {
                    iframe.src = href;
                    // Update active state
                    yearLinks.forEach(function (l) { l.classList.remove('year-list__link--active'); });
                    this.classList.add('year-list__link--active');
                    // Close mobile sidebar
                    closeSidebars();
                }
            });
        });
    }

    // ========== B) COUNTRY DATA & NAVIGATION ==========

    var COUNTRY_DATA = {
        "A": [
            { href: "country/abkhazia.html", text: "Abkhazia" },
            { href: "country/djibouti.html", text: "(Djibouti)" },
            { href: "country/afghanistan.html", text: "Afghanistan" },
            { href: "country/aland.html", text: "Aland" },
            { href: "country/albania.html", text: "Albania" },
            { href: "country/algeria.html", text: "Algeria" },
            { href: "country/andorra.html", text: "Andorra" },
            { href: "country/angola.html", text: "Angola" },
            { href: "country/antigua.html", text: "Antigua and Barbuda" },
            { href: "country/argentina.html", text: "Argentina" },
            { href: "country/armenia.html", text: "Armenia" },
            { href: "country/ascension.html", text: "Ascension Island" },
            { href: "country/australia.html", text: "Australia" },
            { href: "country/austria.html", text: "Austria" },
            { href: "country/azerbaijan.html", text: "Azerbaijan" }
        ],
        "B": [
            { href: "country/barbados.html", text: "Barbados" },
            { href: "country/antigua.html#barbuda", text: "(Antigua and Barbuda)" },
            { href: "country/belarus.html", text: "Belarus" },
            { href: "country/belgium.html", text: "Belgium" },
            { href: "country/benin.html", text: "Benin" },
            { href: "country/st_vincent.html#Bequia", text: "(Saint Vincent and the Grenadines)" },
            { href: "country/bhutan.html", text: "Bhutan" },
            { href: "country/bat.html", text: "British Antarctic Territory" },
            { href: "country/biot.html", text: "British Indian Ocean Territory" },
            { href: "country/bolivia.html", text: "Bolivia" },
            { href: "country/bophuthatswana.html", text: "Bophuthatswana" },
            { href: "country/bosnia_herzegovina.html", text: "Bosnia and Herzegovina" },
            { href: "country/brazil.html", text: "Brazil" },
            { href: "country/bulgaria.html", text: "Bulgaria" },
            { href: "country/burundi.html", text: "Burundi" }
        ],
        "C": [
            { href: "country/cambodia.html", text: "Cambodia" },
            { href: "country/canada.html", text: "Canada" },
            { href: "country/cape_verde.html", text: "Cabo Verde / (Cape Verde)" },
            { href: "country/car.html", text: "Central African Republic" },
            { href: "country/chad.html", text: "Chad" },
            { href: "country/chile.html", text: "Chile" },
            { href: "country/china.html", text: "China" },
            { href: "country/christmas_isl.html", text: "Christmas Islands" },
            { href: "country/cocos_isl.html", text: "Cocos Islands" },
            { href: "country/colombia.html", text: "Colombia" },
            { href: "country/comoros_isl.html", text: "Comoros Islands" },
            { href: "country/congo_b.html", text: "Congo Brazzaville" },
            { href: "country/congo_k.html", text: "Congo Kinshasa" },
            { href: "country/cook_isl.html", text: "Cook Islands" },
            { href: "country/costa_rica.html", text: "Costa Rica" },
            { href: "country/croatia.html", text: "Croatia" },
            { href: "country/cuba.html", text: "Cuba" },
            { href: "country/curacao.html", text: "Curacao" },
            { href: "country/cyprus.html", text: "Cyprus" },
            { href: "country/cyprus_north.html", text: "Cyprus Northern" },
            { href: "country/czech.html", text: "Czech Republic" },
            { href: "country/czechoslovakia.html", text: "Czechoslovakia" }
        ],
        "D": [
            { href: "country/benin.html", text: "(Benin)" },
            { href: "country/denmark.html", text: "Denmark" },
            { href: "country/djibouti.html", text: "Djibouti" },
            { href: "country/dominica.html", text: "Dominica" },
            { href: "country/dominicana.html", text: "The Dominican Republic" },
            { href: "country/dpr.html", text: "Donetsk People's Republic" }
        ],
        "E": [
            { href: "country/ecuador.html", text: "Ecuador" },
            { href: "country/egypt.html", text: "Egypt" },
            { href: "country/el_salvador.html", text: "El Salvador" },
            { href: "country/eq_guinea.html", text: "Equatorial Guinea" },
            { href: "country/estonia.html", text: "Estonia" },
            { href: "country/ethiopia.html", text: "Ethiopia" }
        ],
        "F": [
            { href: "country/falkland_islands.html", text: "Falkland Islands" },
            { href: "country/faroe_islands.html", text: "Faroe Islands" },
            { href: "country/finland.html", text: "Finland" },
            { href: "country/france.html", text: "France" },
            { href: "country/french_polynesia.html", text: "French Polynesia" },
            { href: "country/taaf.html", text: "(TAAF)" },
            { href: "country/fujeira.html", text: "Fujeira" }
        ],
        "G": [
            { href: "country/gabon.html", text: "Gabon" },
            { href: "country/gambia.html", text: "Gambia" },
            { href: "country/georgia.html", text: "Georgia" },
            { href: "country/germany.html", text: "Germany" },
            { href: "country/germany.html#berlin", text: "Germany (Berlin West)" },
            { href: "country/germany_gdr.html", text: "Germany DDR/GDR" },
            { href: "country/ghana.html", text: "Ghana" },
            { href: "country/gibraltar.html", text: "Gibraltar" },
            { href: "country/uk.html", text: "(UK)" },
            { href: "country/greece.html", text: "Greece" },
            { href: "country/greenland.html", text: "Greenland" },
            { href: "country/grenada.html", text: "Grenada" },
            { href: "country/guernsey.html", text: "Guernsey" },
            { href: "country/guinea.html", text: "Guinea" },
            { href: "country/guinea_b.html", text: "Guinea Bissau" },
            { href: "country/eq_guinea.html", text: "(Equatorial Guinea)" },
            { href: "country/guyana.html", text: "Guyana" }
        ],
        "H": [
            { href: "country/hong_kong.html", text: "Hong Kong" },
            { href: "country/hungary.html", text: "Hungary" }
        ],
        "I": [
            { href: "country/iceland.html", text: "Iceland" },
            { href: "country/india.html", text: "India" },
            { href: "country/indonesia.html", text: "Indonesia" },
            { href: "country/iran.html", text: "Iran" },
            { href: "country/iraq.html", text: "Iraq" },
            { href: "country/ireland.html", text: "Ireland" },
            { href: "country/isle_of_man.html", text: "Isle of Man" },
            { href: "country/israel.html", text: "Israel" },
            { href: "country/italy.html", text: "Italy" },
            { href: "country/ivory_coast.html", text: "Ivory Coast" }
        ],
        "J": [
            { href: "country/japan.html", text: "Japan" },
            { href: "country/jersey.html", text: "Jersey" },
            { href: "country/jordan.html", text: "Jordan" },
            { href: "country/yugoslavia.html", text: "(Yugoslavia)" }
        ],
        "K": [
            { href: "country/cambodia.html", text: "(Cambodia)" },
            { href: "country/kazakhstan.html", text: "Kazakhstan" },
            { href: "country/kenya.html", text: "Kenya" },
            { href: "country/kenya.html", text: "Kenya Tanzania Uganda" },
            { href: "country/kiribati.html", text: "Kiribati" },
            { href: "country/korea_north.html", text: "Korea North" },
            { href: "country/korea_south.html", text: "Korea South" },
            { href: "country/kuwait.html", text: "Kuwait" },
            { href: "country/kyrgyzstan.html", text: "Kyrgyzstan" }
        ],
        "L": [
            { href: "country/laos.html", text: "Laos" },
            { href: "country/latvia.html", text: "Latvia" },
            { href: "country/lebanon.html", text: "Lebanon" },
            { href: "country/lesotho.html", text: "Lesotho" },
            { href: "country/liberia.html", text: "Liberia" },
            { href: "country/libya.html", text: "Libya" },
            { href: "country/liechtenstein.html", text: "Liechtenstein" },
            { href: "country/lithuania.html", text: "Lithuania" },
            { href: "country/luxembourg.html", text: "Luxembourg" }
        ],
        "M": [
            { href: "country/macau.html", text: "Macau" },
            { href: "country/macedonia.html", text: "Macedonia" },
            { href: "country/madagascar.html", text: "Madagascar" },
            { href: "country/malawi.html", text: "Malawi" },
            { href: "country/malaysia.html", text: "Malaysia" },
            { href: "country/maldives.html", text: "Maldives" },
            { href: "country/mali.html", text: "Mali" },
            { href: "country/malta.html", text: "Malta" },
            { href: "country/isle_of_man.html", text: "(Isle of Man)" },
            { href: "country/manama.html", text: "Manama" },
            { href: "country/marshall_islands.html", text: "Marshall Islands" },
            { href: "country/mauritania.html", text: "Mauritania" },
            { href: "country/mauritius.html", text: "Mauritius" },
            { href: "country/mexico.html", text: "Mexico" },
            { href: "country/micronesia.html", text: "Micronesia" },
            { href: "country/moldova.html", text: "Moldova" },
            { href: "country/monaco.html", text: "Monaco" },
            { href: "country/mongolia.html", text: "Mongolia" },
            { href: "country/montserrat.html", text: "Montserrat" },
            { href: "country/morocco.html", text: "Morocco" },
            { href: "country/mozambique.html", text: "Mozambique" }
        ],
        "N": [
            { href: "country/namibia.html", text: "Namibia" },
            { href: "country/nauru.html", text: "Nauru" },
            { href: "country/nepal.html", text: "Nepal" },
            { href: "country/netherlands.html", text: "Netherlands" },
            { href: "country/nevis.html", text: "Nevis" },
            { href: "country/new_caledonia.html", text: "New Caledonia" },
            { href: "country/new_zealand.html", text: "New Zealand" },
            { href: "country/nicaragua.html", text: "Nicaragua" },
            { href: "country/niger.html", text: "Niger" },
            { href: "country/niuafoou.html", text: "Niuafoou" },
            { href: "country/macedonia.html", text: "North Macedonia" },
            { href: "country/norway.html", text: "Norway" }
        ],
        "O": [
            { href: "country/oman.html", text: "Oman" }
        ],
        "P": [
            { href: "country/pabay_isl.html", text: "Pabay Island" },
            { href: "country/palau.html", text: "Palau" },
            { href: "country/papua_new_guinea.html", text: "Papua New Guinea" },
            { href: "country/paraguay.html", text: "Paraguay" },
            { href: "country/peru.html", text: "Peru" },
            { href: "country/pitcairn_islands.html", text: "Pitcairn Islands" },
            { href: "country/poland.html", text: "Poland" },
            { href: "country/portugal.html", text: "Portugal" }
        ],
        "Q": [
            { href: "country/quaiti.html", text: "Quaiti State of Hadhramaut" }
        ],
        "R": [
            { href: "country/romania.html", text: "Romania" },
            { href: "country/ross.html", text: "The Ross Dependency" },
            { href: "country/russia.html", text: "Russia" }
        ],
        "S": [
            { href: "country/st_helena.html", text: "Saint Helena" },
            { href: "country/st_kitts.html", text: "Saint Kitts" },
            { href: "country/st_vincent.html", text: "Saint Vincent" },
            { href: "country/el_salvador.html", text: "(El Salvador)" },
            { href: "country/san_marino.html", text: "San Marino" },
            { href: "country/sao_tome.html", text: "Sao Tome and Principe" },
            { href: "country/senegal.html", text: "Senegal" },
            { href: "country/serbia.html", text: "Serbia" },
            { href: "country/seychelles.html", text: "Seychelles" },
            { href: "country/sierra_leone.html", text: "Sierra Leone" },
            { href: "country/singapore.html", text: "Singapore" },
            { href: "country/slovakia.html", text: "Slovakia" },
            { href: "country/slovenia.html", text: "Slovenia" },
            { href: "country/solomon_isl.html", text: "Solomon Islands" },
            { href: "country/somalia.html", text: "Somalia" },
            { href: "country/ussr.html", text: "(USSR)" },
            { href: "country/south_africa.html", text: "South Africa" },
            { href: "country/south_georgia.html", text: "South Georgia and the South Sandwich Islands" },
            { href: "country/namibia.html#swa", text: "(Namibia)" },
            { href: "country/spain.html", text: "Spain" },
            { href: "country/sri_lanka.html", text: "Sri Lanka" },
            { href: "country/suriname.html", text: "Suriname" },
            { href: "country/sweden.html", text: "Sweden" },
            { href: "country/switzerland.html", text: "Switzerland" }
        ],
        "T": [
            { href: "country/taaf.html", text: "TAAF" },
            { href: "country/taiwan.html", text: "Taiwan" },
            { href: "country/tajikistan.html", text: "Tajikistan" },
            { href: "country/tanzania.html", text: "Tanzania" },
            { href: "country/chad.html", text: "(Chad)" },
            { href: "country/thailand.html", text: "Thailand" },
            { href: "country/togo.html", text: "Togo" },
            { href: "country/tonga.html", text: "Tonga" },
            { href: "country/transkei.html", text: "Transkei" },
            { href: "country/transnistria.html", text: "Transnistria" },
            { href: "country/tristan_da_cunha.html", text: "Tristan da Cunha" },
            { href: "country/tunisia.html", text: "Tunisia" },
            { href: "country/turkey.html", text: "Turkey" },
            { href: "country/cyprus_north.html", text: "(Northern Cyprus)" },
            { href: "country/turkmenistan.html", text: "Turkmenistan" },
            { href: "country/turks_and_caicos.html", text: "Turks and Caicos Islands" },
            { href: "country/tuvalu.html", text: "Tuvalu" }
        ],
        "U": [
            { href: "country/uganda.html", text: "Uganda" },
            { href: "country/uk.html", text: "UK" },
            { href: "country/ukraine.html", text: "Ukraine" },
            { href: "country/st_vincent.html#Union", text: "(Saint Vincent and the Grenadines)" },
            { href: "country/un.html", text: "United Nations" },
            { href: "country/uruguay.html", text: "Uruguay" },
            { href: "country/usa.html", text: "USA" },
            { href: "country/ussr.html", text: "USSR" },
            { href: "country/uzbekistan.html", text: "Uzbekistan" }
        ],
        "V": [
            { href: "country/vanuatu.html", text: "Vanuatu" },
            { href: "country/vietnam.html", text: "Vietnam" }
        ],
        "W": [
            { href: "country/wallis.html", text: "Wallis and Futuna" }
        ],
        "Y": [
            { href: "country/yemen.html", text: "Yemen" },
            { href: "country/yugoslavia.html", text: "Yugoslavia" }
        ],
        "Z": [
            { href: "country/congo_k.html#zaire", text: "(Congo Kinshasa)" },
            { href: "country/zambia.html", text: "Zambia" },
            { href: "country/zimbabwe.html", text: "Zimbabwe" }
        ]
    };

    var countryListEl = document.getElementById('country-list');

    function initCountryNavigation() {
        var letterBtns = document.querySelectorAll('.az-letter-btn');

        letterBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var letter = this.getAttribute('data-letter');
                if (!letter) return;

                // Update active letter button
                letterBtns.forEach(function (b) { b.classList.remove('az-letter-btn--active'); });
                this.classList.add('az-letter-btn--active');

                renderCountries(COUNTRY_DATA[letter] || [], letter);
            });
        });
    }

    function renderCountries(countries, letter) {
        if (!countryListEl) return;

        if (countries.length === 0) {
            countryListEl.innerHTML = '<div class="country-empty">No countries for "' + letter + '"</div>';
            return;
        }

        var sectionHtml = '<div class="country-list-section">';
        sectionHtml += '<div class="country-list-section__header">Countries \u2014 ' + letter + '</div>';

        countries.forEach(function (c) {
            sectionHtml += '<a class="country-link" href="' + c.href + '" data-country-href="' + c.href + '">' + c.text + '</a>';
        });

        sectionHtml += '</div>';
        countryListEl.innerHTML = sectionHtml;

        // Attach click handlers to country links
        var countryLinks = countryListEl.querySelectorAll('.country-link');
        countryLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var href = this.getAttribute('data-country-href');
                if (href && iframe) {
                    iframe.src = href;
                    // Update active state
                    countryLinks.forEach(function (l) { l.classList.remove('country-link--active'); });
                    this.classList.add('country-link--active');
                    // Close mobile sidebar
                    closeSidebars();
                }
            });
        });
    }

    // ========== C) MOBILE TOGGLES ==========

    function initMobileToggles() {
        var btnYears = document.getElementById('toggle-years');
        var btnCountries = document.getElementById('toggle-countries');
        var closeYears = document.getElementById('close-years');
        var closeCountries = document.getElementById('close-countries');

        if (btnYears) {
            btnYears.addEventListener('click', function () {
                openSidebar(yearsSidebar);
            });
        }

        if (btnCountries) {
            btnCountries.addEventListener('click', function () {
                openSidebar(countriesSidebar);
            });
        }

        if (closeYears) {
            closeYears.addEventListener('click', function () {
                closeSidebars();
            });
        }

        if (closeCountries) {
            closeCountries.addEventListener('click', function () {
                closeSidebars();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function () {
                closeSidebars();
            });
        }
    }

    function openSidebar(sidebar) {
        closeSidebars();
        if (sidebar) {
            sidebar.classList.add('is-open');
        }
        if (overlay) {
            overlay.classList.add('catalogue-overlay--visible');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeSidebars() {
        if (yearsSidebar) yearsSidebar.classList.remove('is-open');
        if (countriesSidebar) countriesSidebar.classList.remove('is-open');
        if (overlay) overlay.classList.remove('catalogue-overlay--visible');
        document.body.style.overflow = '';
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSidebars();
        }
    });

    // ========== INIT ==========

    function init() {
        initYearNavigation();
        initCountryNavigation();
        initMobileToggles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
