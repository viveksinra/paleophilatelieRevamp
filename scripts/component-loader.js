/**
 * Component Loader
 * Embeds header and footer components into pages
 * Adjusts paths based on page location (root vs subfolders)
 */

(function() {
    'use strict';

    // Header HTML template
    const headerHTML = `
<!-- Header Component - Smithsonian Magazine Style (Black/White/Yellow) -->
<header class="site-header" id="site-header" role="banner">
    <!-- Slogan Strip -->
    <div class="header-slogan">
        <div class="container">
            <span class="header-slogan__text">Paleophilatelie <span class="header-slogan__separator">&ndash;</span> the place where Paleontology and Paleoanthropology meet Philately</span>
        </div>
    </div>
    <!-- Top Black Bar with Logo and Navigation -->
    <div class="header-top">
        <div class="container">
            <div class="header-top__content">
                <!-- Logo -->
                <a href="{{BASE}}index.html" class="site-logo" aria-label="Paleophilatelie Home">
                    <img src="{{BASE}}images/others/paleophilatelie.ico" alt="Paleophilatelie Logo" class="site-logo__image">
                    <span class="site-logo__text">Paleophilatelie</span>
                </a>

                <!-- Main Navigation -->
                <nav class="main-nav" id="main-nav" role="navigation" aria-label="Main navigation">
                    <!-- Mobile Close Button -->
                    <button class="main-nav__close" id="nav-close" aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                    <ul class="nav-list">
                <!-- Home -->
                <li class="nav-item">
                    <a href="{{BASE}}index.html" class="nav-link">Home</a>
                </li>

                <!-- Catalogue with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}phil_catalogue_main.html" class="nav-link">Catalogue</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}milestones.html" class="nav-dropdown__link">Milestones</a></li>
                        <li><a href="{{BASE}}country/index.html" class="nav-dropdown__link">Country</a></li>
                        <li><a href="{{BASE}}year/index.html" class="nav-dropdown__link">Year</a></li>
                        <li><a href="{{BASE}}description/stamps/index.html" class="nav-dropdown__link">Descriptions</a></li>
                        <li><a href="{{BASE}}description/letters/index.html" class="nav-dropdown__link">Letters</a></li>
                        <li><a href="{{BASE}}images/checklist_stamps.html" class="nav-dropdown__link">Checklist</a></li>
                        <li><a href="{{BASE}}phil_catalogue_species.html" class="nav-dropdown__link">Species</a></li>
                        <li><a href="{{BASE}}legend.html" class="nav-dropdown__link">Legend</a></li>
                        <li><a href="{{BASE}}phil_glossary.html" class="nav-dropdown__link">Glossary</a></li>
                    </ul>
                </li>

                <!-- Gallery with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}images/index.html" class="nav-link">Gallery</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}images/stamps.html" class="nav-dropdown__link">Stamps</a></li>
                        <li><a href="{{BASE}}images/ps.html" class="nav-dropdown__link">Postal Stationeries</a></li>
                        <li><a href="{{BASE}}images/fdc.html" class="nav-dropdown__link">FDC</a></li>
                        <li><a href="{{BASE}}images/pm.html" class="nav-dropdown__link">Postmarks</a></li>
                        <li><a href="{{BASE}}images/stamps_used.html" class="nav-dropdown__link">Mailed Covers and Cards</a></li>
                        <li><a href="{{BASE}}exhibitions/index.html" class="nav-dropdown__link">Exhibits</a></li>
                    </ul>
                </li>

                <!-- Topics with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}topics/index.html" class="nav-link">Topics</a>
                    <ul class="nav-dropdown">
                        <li class="has-subdropdown">
                            <a href="{{BASE}}topics/paleo/index.html" class="nav-dropdown__link">Paleontology</a>
                            <ul class="nav-subdropdown">
                                <li><a href="{{BASE}}topics/paleo/paleontologist.html" class="nav-subdropdown__link">Paleontologists</a></li>
                                <li><a href="{{BASE}}topics/paleo/contributors.html" class="nav-subdropdown__link">Contributors</a></li>
                                <li><a href="{{BASE}}topics/paleo/museums.html" class="nav-subdropdown__link">Museums</a></li>
                                <li><a href="{{BASE}}topics/paleo/sites.html" class="nav-subdropdown__link">Fossil Sites</a></li>
                                <li><a href="{{BASE}}topics/paleo/vertebrate/index.html" class="nav-subdropdown__link">Vertebrate</a></li>
                            </ul>
                        </li>
                        <li class="has-subdropdown">
                            <a href="{{BASE}}topics/anthro/index.html" class="nav-dropdown__link">Paleoanthropology</a>
                            <ul class="nav-subdropdown">
                                <li><a href="{{BASE}}topics/anthro/antropologist.html" class="nav-subdropdown__link">Paleoanthropologists</a></li>
                                <li><a href="{{BASE}}topics/anthro/contributors.html" class="nav-subdropdown__link">Contributors</a></li>
                                <li><a href="{{BASE}}topics/anthro/museums.html" class="nav-subdropdown__link">Museums</a></li>
                                <li><a href="{{BASE}}topics/anthro/sites.html" class="nav-subdropdown__link">Fossil Sites</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <!-- Resources with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}articles/index.html" class="nav-link">Resources</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}articles/index.html" class="nav-dropdown__link">Articles</a></li>
                        <li><a href="{{BASE}}links_paleo.html" class="nav-dropdown__link">Links - Paleontology</a></li>
                        <li><a href="{{BASE}}links.html" class="nav-dropdown__link">Links - Philately</a></li>
                        <li><a href="{{BASE}}links_postal_resources.html" class="nav-dropdown__link">Links - Postal Resources</a></li>
                        <li><a href="{{BASE}}links_forums.html" class="nav-dropdown__link">Links - Forums</a></li>
                        <li><a href="{{BASE}}media/books.html" class="nav-dropdown__link">Books</a></li>
                        <li><a href="{{BASE}}media/paleoart.html" class="nav-dropdown__link">Paleoart</a></li>
                        <li><a href="{{BASE}}media/videos.html" class="nav-dropdown__link">Videos</a></li>
                    </ul>
                </li>

                <!-- About with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}about_website.html" class="nav-link">About</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}about_website.html" class="nav-dropdown__link">About Website</a></li>
                        <li><a href="{{BASE}}about.html" class="nav-dropdown__link">About Author</a></li>
                        <li><a href="{{BASE}}news.html" class="nav-dropdown__link">News</a></li>
                        <li><a href="{{BASE}}awards.html" class="nav-dropdown__link">Awards</a></li>
                        <li><a href="{{BASE}}exhibitions/index.html" class="nav-dropdown__link">Exhibitions</a></li>
                        <li><a href="{{BASE}}contact.html" class="nav-dropdown__link">Contact</a></li>
                        <li><a href="{{BASE}}sitemap.html" class="nav-dropdown__link">Sitemap</a></li>
                    </ul>
                </li>

                <!-- Login (homepage only) -->
                <li class="nav-item nav-item--login">
                    <a href="{{BASE}}mk/index.html" class="nav-link">Login</a>
                </li>
            </ul>
        </nav>

                <!-- Mobile Menu Toggle -->
                <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                    <span class="menu-toggle__bar"></span>
                    <span class="menu-toggle__bar"></span>
                    <span class="menu-toggle__bar"></span>
                </button>
            </div>
        </div>
    </div>

    <!-- Second Bar: Google Translate and Search -->
    <div class="header-toolbar">
        <div class="container">
            <div class="header-toolbar__content">
                <!-- Left column: Translate + Breadcrumb -->
                <div class="header-toolbar__left">
                    <div id="google_translate_element"></div>
                    <div id="header-breadcrumb-slot"></div>
                </div>

                <!-- Right column: Search Form -->
                <div class="header-search-wrapper">
                    <form action="https://search.freefind.com/find.html" method="get" accept-charset="UTF-8" class="header-search-form">
                        <input type="hidden" name="si" value="14323397">
                        <input type="hidden" name="pid" value="r">
                        <input type="text" name="query" class="header-search-input" placeholder="Search stamps, countries, years..." aria-label="Search" autocomplete="off">
                        <button type="submit" class="header-search-button" aria-label="Search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                    <div class="header-search-links">
                        <a href="https://www.freefind.com/searchtipspop.html" target="_blank" rel="noopener noreferrer" class="header-search-links__item">search tips</a>
                        <span class="header-search-credit"><a href="https://www.freefind.com" target="_blank" rel="noopener noreferrer">search engine</a> by <a href="https://www.freefind.com" target="_blank" rel="noopener noreferrer">freefind</a></span>
                        <a href="https://search.freefind.com/find.html?si=14323397&amp;pid=a" class="header-search-links__item">advanced search</a>
                    </div>
                </div>

                <!-- Sticky Toggle -->
                <label class="toolbar-sticky-toggle" title="Pin toolbar to top">
                    <input type="checkbox" id="toolbar-sticky-checkbox">
                    <span class="toolbar-sticky-toggle__pin">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 3a1 1 0 0 1 .117 1.993L16 5h-.39l-1.45 4.36A3.5 3.5 0 0 1 16 12.5V14h-3v7l-1 1-1-1v-7H8v-1.5a3.5 3.5 0 0 1 1.84-3.14L8.39 5H8a1 1 0 0 1-.117-1.993L8 3h8z"/>
                        </svg>
                    </span>
                </label>
            </div>
        </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-overlay" id="search-overlay">
        <div class="search-overlay-content">
            <form action="https://search.freefind.com/find.html" method="get" accept-charset="UTF-8">
                <input type="hidden" name="si" value="14323397">
                <input type="hidden" name="pid" value="r">
                <input type="text" name="query" class="search-overlay-input" placeholder="Search stamps, countries, years..." aria-label="Search" autocomplete="off">
            </form>
        </div>
        <button class="search-overlay-close" id="search-close" aria-label="Close search">&times;</button>
    </div>
</header>
`;

    // Footer HTML template
    const footerHTML = `
<!-- Site Footer Component -->
<footer class="site-footer" id="site-footer">
    <!-- Main Footer -->
    <div class="footer-main">
        <div class="container">
            <div class="footer-grid">
                <!-- About Column -->
                <div class="footer-col footer-col--about">
                    <a href="{{BASE}}index.html" class="footer-logo">
                        <img src="{{BASE}}images/others/paleophilatelie.ico" alt="Paleophilatelie" class="footer-logo__image">
                        <span class="footer-logo__text">Paleophilatelie<span class="footer-logo__tld">.eu</span></span>
                    </a>
                    <p class="footer-about">
                        The place where Paleontology and Paleoanthropology meets Philately.
                        Explore the world's most comprehensive collection of prehistoric life on stamps.
                    </p>
                    <div class="footer-social">
                        <a href="mailto:admin@paleophilatelie.eu" class="footer-social__link" aria-label="Email">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </a>
                        <a href="https://x.com/PaleoPhilatelis" class="footer-social__link" aria-label="Follow us on X" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="footer-badges footer-badges--homepage">
                        <a href="https://www.pwmo.org/" target="_blank" rel="noopener noreferrer">
                            <img src="{{BASE}}images/others/pwo-logo.gif"
                                 alt="Philatelic Webmasters Organization"
                                 class="footer-badges__img"
                                 loading="lazy">
                        </a>
                        <a href="https://www.webwiki.com/paleophilatelie.eu" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.webwiki.com/etc/rating/widget/254787400/paleophilatelie-eu-rating-round-150.png"
                                 alt="WebWiki Rating for paleophilatelie.eu"
                                 class="footer-badges__img"
                                 loading="lazy">
                        </a>
                    </div>
                    <div class="footer-badges footer-badges--other">
                        <a href="{{BASE}}images/others/qrcode_www.paleophilatelie.eu.png">
                            <img src="{{BASE}}images/others/qrcode_www.paleophilatelie.eu.png"
                                 alt="QR code of PaleoPhilatelie.eu website"
                                 class="footer-badges__img"
                                 loading="lazy">
                        </a>
                        <a href="https://www.facebook.com/groups/889825297731726/" target="_blank" rel="noopener noreferrer">
                            <img src="{{BASE}}images/others/logo_qr_code_fb.png"
                                 alt="QR code of Paleophilately Facebook group"
                                 class="footer-badges__img"
                                 loading="lazy">
                        </a>
                    </div>
                    <div class="footer-badges footer-badges--facebook">
                        <a href="https://www.facebook.com/groups/889825297731726/" target="_blank" rel="noopener noreferrer">
                            <img src="{{BASE}}images/others/facebook.jpg"
                                 alt="PaleoPhilatelie.eu on Facebook - Welcome to join !"
                                 title="PaleoPhilatelie.eu on Facebook - Welcome to join !"
                                 class="footer-badges__img footer-badges__img--facebook"
                                 loading="lazy">
                        </a>
                    </div>
                </div>

                <!-- Catalogue Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Catalogue</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}milestones.html">Milestones</a></li>
                        <li><a href="{{BASE}}country/index.html">Country</a></li>
                        <li><a href="{{BASE}}year/index.html">Year</a></li>
                        <li><a href="{{BASE}}description/stamps/index.html">Descriptions</a></li>
                        <li><a href="{{BASE}}description/letters/index.html">Letters</a></li>
                        <li><a href="{{BASE}}images/checklist_stamps.html">Checklist</a></li>
                        <li><a href="{{BASE}}phil_catalogue_species.html">Species</a></li>
                        <li><a href="{{BASE}}legend.html">Legend</a></li>
                        <li><a href="{{BASE}}phil_glossary.html">Glossary</a></li>
                    </ul>
                </div>

                <!-- Gallery Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Gallery</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}images/stamps.html">Stamps</a></li>
                        <li><a href="{{BASE}}images/ps.html">Postal Stationeries</a></li>
                        <li><a href="{{BASE}}images/fdc.html">FDC</a></li>
                        <li><a href="{{BASE}}images/pm.html">Postmarks</a></li>
                        <li><a href="{{BASE}}images/stamps_used.html">Mailed Covers and Cards</a></li>
                        <li><a href="{{BASE}}exhibitions/index.html">Exhibits</a></li>
                    </ul>
                </div>

                <!-- Topics Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Topics</h3>
                    <h4 class="footer-col__subtitle"><a href="{{BASE}}topics/paleo/index.html">Paleontology</a></h4>
                    <ul class="footer-links footer-links--nested">
                        <li><a href="{{BASE}}topics/paleo/paleontologist.html">Paleontologists</a></li>
                        <li><a href="{{BASE}}topics/paleo/contributors.html">Contributors</a></li>
                        <li><a href="{{BASE}}topics/paleo/museums.html">Museums</a></li>
                        <li><a href="{{BASE}}topics/paleo/sites.html">Fossil Sites</a></li>
                        <li><a href="{{BASE}}topics/paleo/vertebrate/index.html">Vertebrate</a></li>
                    </ul>
                    <h4 class="footer-col__subtitle"><a href="{{BASE}}topics/anthro/index.html">Paleoanthropology</a></h4>
                    <ul class="footer-links footer-links--nested">
                        <li><a href="{{BASE}}topics/anthro/antropologist.html">Paleoanthropologists</a></li>
                        <li><a href="{{BASE}}topics/anthro/contributors.html">Contributors</a></li>
                        <li><a href="{{BASE}}topics/anthro/museums.html">Museums</a></li>
                        <li><a href="{{BASE}}topics/anthro/sites.html">Fossil Sites</a></li>
                    </ul>
                </div>

                <!-- Resources Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Resources</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}articles/index.html">Articles</a></li>
                        <li><a href="{{BASE}}links_paleo.html">Links - Paleontology</a></li>
                        <li><a href="{{BASE}}links.html">Links - Philately</a></li>
                        <li><a href="{{BASE}}links_postal_resources.html">Links - Postal Resources</a></li>
                        <li><a href="{{BASE}}links_forums.html">Links - Forums</a></li>
                        <li><a href="{{BASE}}media/books.html">Books</a></li>
                        <li><a href="{{BASE}}media/paleoart.html">Paleoart</a></li>
                        <li><a href="{{BASE}}media/videos.html">Videos</a></li>
                    </ul>
                </div>

                <!-- About Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">About</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}about_website.html">About Website</a></li>
                        <li><a href="{{BASE}}about.html">About Author</a></li>
                        <li><a href="{{BASE}}news.html">News</a></li>
                        <li><a href="{{BASE}}awards.html">Awards</a></li>
                        <li><a href="{{BASE}}exhibitions/index.html">Exhibitions</a></li>
                        <li><a href="{{BASE}}contact.html">Contact</a></li>
                        <li><a href="{{BASE}}sitemap.html">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-bottom__content">
                <p class="footer-copyright">
                    &copy; 2010&ndash;<span id="currentYear"></span> Paleophilatelie. All rights reserved. Contact for any issue: <a href="mailto:admin@paleophilatelie.eu">admin@paleophilatelie.eu</a>
                </p>
                <div class="footer-bottom__links">
                    <a href="{{BASE}}paleophilatelie_site_map.html">Sitemap</a>
                    <span class="footer-bottom__divider">|</span>
                    <a href="{{BASE}}about_how-to-help.html">How to Help</a>
                    <span class="footer-bottom__divider">|</span>
                    <a href="{{BASE}}legend.html">Legend</a>
                    <span class="footer-bottom__divider">|</span>
                    <a href="{{BASE}}mk/index.html">Login</a>
                </div>
            </div>
            <p class="footer-developer">
                Designed &amp; Developed by <a href="https://softechinfra.com" target="_blank" rel="noopener noreferrer">SoftechInfra</a>
            </p>
        </div>
    </div>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    </button>
</footer>
`;

    // ===== Centralized Navigation Highlighting Config =====
    // Each rule maps a page (by exact path or prefix) to the nav hrefs that should be highlighted.
    // nav array: [top-level href, dropdown href, subdropdown href] — only include what applies.
    // Exact paths are checked before prefixes (order matters within each type).
    window.NAV_HIGHLIGHT_RULES = [
        // HOME
        { path: "index.html", nav: ["index.html"] },

        // CATALOGUE (top-level href: phil_catalogue_main.html)
        { path: "phil_catalogue_main.html", nav: ["phil_catalogue_main.html"] },
        { path: "milestones.html", nav: ["phil_catalogue_main.html", "milestones.html"] },
        { path: "images/checklist_stamps.html", nav: ["phil_catalogue_main.html", "images/checklist_stamps.html"] },
        { path: "phil_catalogue_species.html", nav: ["phil_catalogue_main.html", "phil_catalogue_species.html"] },
        { path: "legend.html", nav: ["phil_catalogue_main.html", "legend.html"] },
        { path: "phil_glossary.html", nav: ["phil_catalogue_main.html", "phil_glossary.html"] },
        { prefix: "country/", nav: ["phil_catalogue_main.html", "country/index.html"] },
        { prefix: "year/", nav: ["phil_catalogue_main.html", "year/index.html"] },
        { prefix: "description/stamps/", nav: ["phil_catalogue_main.html", "description/stamps/index.html"] },
        { prefix: "description/letters/", nav: ["phil_catalogue_main.html", "description/letters/index.html"] },

        // GALLERY (top-level href: images/index.html)
        { path: "images/index.html", nav: ["images/index.html"] },
        { path: "images/stamps.html", nav: ["images/index.html", "images/stamps.html"] },
        { path: "images/stamps_others.html", nav: ["images/index.html", "images/stamps.html"] },
        { path: "images/ps.html", nav: ["images/index.html", "images/ps.html"] },
        { path: "images/fdc.html", nav: ["images/index.html", "images/fdc.html"] },
        { path: "images/pm.html", nav: ["images/index.html", "images/pm.html"] },
        { path: "images/stamps_used.html", nav: ["images/index.html", "images/stamps_used.html"] },
        { prefix: "exhibitions/", nav: ["images/index.html", "exhibitions/index.html"] },

        // TOPICS > PALEONTOLOGY
        { path: "topics/index.html", nav: ["topics/index.html"] },
        { path: "topics/paleo/index.html", nav: ["topics/index.html", "topics/paleo/index.html"] },
        { path: "topics/paleo/paleontologist.html", nav: ["topics/index.html", "topics/paleo/index.html", "topics/paleo/paleontologist.html"] },
        { path: "topics/paleo/contributors.html", nav: ["topics/index.html", "topics/paleo/index.html", "topics/paleo/contributors.html"] },
        { path: "topics/paleo/museums.html", nav: ["topics/index.html", "topics/paleo/index.html", "topics/paleo/museums.html"] },
        { path: "topics/paleo/sites.html", nav: ["topics/index.html", "topics/paleo/index.html", "topics/paleo/sites.html"] },
        { prefix: "topics/paleo/vertebrate/", nav: ["topics/index.html", "topics/paleo/index.html", "topics/paleo/vertebrate/index.html"] },
        { prefix: "topics/paleo/", nav: ["topics/index.html", "topics/paleo/index.html"] },

        // TOPICS > PALEOANTHROPOLOGY
        { path: "topics/anthro/index.html", nav: ["topics/index.html", "topics/anthro/index.html"] },
        { path: "topics/anthro/antropologist.html", nav: ["topics/index.html", "topics/anthro/index.html", "topics/anthro/antropologist.html"] },
        { path: "topics/anthro/contributors.html", nav: ["topics/index.html", "topics/anthro/index.html", "topics/anthro/contributors.html"] },
        { path: "topics/anthro/museums.html", nav: ["topics/index.html", "topics/anthro/index.html", "topics/anthro/museums.html"] },
        { path: "topics/anthro/sites.html", nav: ["topics/index.html", "topics/anthro/index.html", "topics/anthro/sites.html"] },
        { prefix: "topics/anthro/", nav: ["topics/index.html", "topics/anthro/index.html"] },

        // RESOURCES (top-level href: articles/index.html)
        { prefix: "articles/", nav: ["articles/index.html"] },
        { path: "links_paleo.html", nav: ["articles/index.html", "links_paleo.html"] },
        { path: "links.html", nav: ["articles/index.html", "links.html"] },
        { path: "links_postal_resources.html", nav: ["articles/index.html", "links_postal_resources.html"] },
        { path: "links_forums.html", nav: ["articles/index.html", "links_forums.html"] },
        { path: "media/books.html", nav: ["articles/index.html", "media/books.html"] },
        { path: "media/paleoart.html", nav: ["articles/index.html", "media/paleoart.html"] },
        { path: "media/videos.html", nav: ["articles/index.html", "media/videos.html"] },
        { prefix: "media/", nav: ["articles/index.html"] },

        // ABOUT (top-level href: about_website.html)
        { path: "about_website.html", nav: ["about_website.html"] },
        { path: "about.html", nav: ["about_website.html", "about.html"] },
        { path: "news.html", nav: ["about_website.html", "news.html"] },
        { path: "awards.html", nav: ["about_website.html", "awards.html"] },
        { path: "contact.html", nav: ["about_website.html", "contact.html"] },
        { path: "sitemap.html", nav: ["about_website.html", "sitemap.html"] },
        { path: "paleophilatelie_site_map.html", nav: ["about_website.html", "sitemap.html"] },
        { path: "about_how-to-help.html", nav: ["about_website.html"] },

        // LOGIN
        { prefix: "mk/", nav: ["mk/index.html"] },
    ];

    // Get the site-root-relative path of the current page
    window.getSiteRelativePath = function() {
        var pathname = window.location.pathname.replace(/\\/g, '/');
        // Known site subfolders — used to find the site root in the URL
        var folders = ['country', 'year', 'topics', 'images', 'description', 'exhibitions', 'articles', 'media', 'mk'];
        for (var i = 0; i < folders.length; i++) {
            var marker = '/' + folders[i] + '/';
            var idx = pathname.indexOf(marker);
            if (idx !== -1) {
                return pathname.substring(idx + 1); // e.g. "country/afghanistan.html"
            }
        }
        // Root-level page — return just the filename
        var parts = pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    };

    // Find the matching highlight rule for the current page
    window.getNavHighlightRule = function() {
        var pagePath = window.getSiteRelativePath().toLowerCase();
        var rules = window.NAV_HIGHLIGHT_RULES;
        // Exact path matches first
        for (var i = 0; i < rules.length; i++) {
            if (rules[i].path && pagePath === rules[i].path.toLowerCase()) {
                return rules[i];
            }
        }
        // Prefix matches second
        for (var i = 0; i < rules.length; i++) {
            if (rules[i].prefix && pagePath.indexOf(rules[i].prefix.toLowerCase()) === 0) {
                return rules[i];
            }
        }
        return null;
    };

    // Determine the base path based on current page location
    function getBasePath() {
        const path = window.location.pathname;

        // Check if we're in a subfolder by looking at common subfolder names
        const subfolders = ['country', 'year', 'topics', 'images', 'description', 'exhibitions', 'articles', 'media'];
        let basePath = '';

        for (const folder of subfolders) {
            if (path.includes('/' + folder + '/') || path.includes('\\' + folder + '\\')) {
                // Count how deep we are
                const normalizedPath = path.replace(/\\/g, '/');
                const afterFolder = normalizedPath.split('/' + folder + '/')[1] || '';
                const subDepth = (afterFolder.match(/\//g) || []).length;
                basePath = '../'.repeat(subDepth + 1);
                break;
            }
        }

        return basePath;
    }

    // Replace base path placeholders in HTML
    function applyBasePath(html, basePath) {
        return html.replace(/\{\{BASE\}\}/g, basePath);
    }

    // Load header component
    function loadHeader(basePath) {
        const element = document.getElementById('header-placeholder');
        if (!element) return;

        element.innerHTML = applyBasePath(headerHTML, basePath);

        // Show login button only on the root homepage
        const pageName = window.location.pathname.replace(/\\/g, '/').split('/').pop();
        const isHomepage = (pageName === 'index.html' || pageName === 'index.htm' || pageName === '') && basePath === '';
        const loginItem = element.querySelector('.nav-item--login');
        if (loginItem && !isHomepage) {
            loginItem.style.display = 'none';
        }

        // Build breadcrumb from data attribute
        var breadcrumbData = element.getAttribute('data-breadcrumb');
        var slot = element.querySelector('#header-breadcrumb-slot');
        if (breadcrumbData && slot) {
            var items = breadcrumbData.split('|');
            var lis = items.map(function(item) {
                var parts = item.split('::');
                var label = parts[0];
                var url = parts[1];
                if (url) {
                    return '<li class="breadcrumb__item"><a href="' + url + '" class="breadcrumb__link">' + label + '</a></li>';
                }
                return '<li class="breadcrumb__item"><span class="breadcrumb__current">' + label + '</span></li>';
            }).join('');
            slot.innerHTML = '<nav class="breadcrumb" aria-label="Breadcrumb"><ol class="breadcrumb__list">' + lis + '</ol></nav>';
        }
    }

    // Load footer component
    function loadFooter(basePath) {
        const element = document.getElementById('footer-placeholder');
        if (!element) return;

        element.innerHTML = applyBasePath(footerHTML, basePath);

        // Detect homepage and show the appropriate footer badges
        const path = window.location.pathname;
        const isHomepage = path === '/' || path.endsWith('/index.html') || path.endsWith('/index.htm') || path === '';
        const homepageBadges = element.querySelector('.footer-badges--homepage');
        const otherBadges = element.querySelector('.footer-badges--other');

        if (homepageBadges && otherBadges) {
            if (isHomepage) {
                otherBadges.style.display = 'none';
            } else {
                homepageBadges.style.display = 'none';
            }
        }
    }

    // Load Google Translate script
    function loadGoogleTranslate() {
        // Define the callback function globally
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
            }, 'google_translate_element');
        };

        // Load the script (use https explicitly for file:// protocol compatibility)
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }

    // Main initialization
    function init() {
        // Skip header/footer when loaded inside an iframe (e.g. 3-panel navigator)
        const isInIframe = window !== window.top;

        const basePath = getBasePath();

        // Load components (skip if inside iframe to avoid double header/footer)
        if (!isInIframe) {
            loadHeader(basePath);
            loadFooter(basePath);

            // Load Google Translate after header is loaded
            loadGoogleTranslate();

            // Update copyright year
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }

        // Dispatch event to notify other scripts that components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
