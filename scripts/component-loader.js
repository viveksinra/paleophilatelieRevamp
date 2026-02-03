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
                        <li><a href="{{BASE}}phil_catalogue_main.html#milestones" class="nav-dropdown__link">Milestones</a></li>
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
                        <li><a href="{{BASE}}images/fdc.html" class="nav-dropdown__link">First Day Covers</a></li>
                        <li><a href="{{BASE}}images/pm.html" class="nav-dropdown__link">Postmarks</a></li>
                        <li><a href="{{BASE}}images/ps.html" class="nav-dropdown__link">Postal Stationery</a></li>
                        <li><a href="{{BASE}}images/checklist_stamps.html" class="nav-dropdown__link">Stamps Checklist</a></li>
                        <li><a href="{{BASE}}images/checklist_pm.html" class="nav-dropdown__link">Postmarks Checklist</a></li>
                    </ul>
                </li>

                <!-- Topics with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}topics/index.html" class="nav-link">Topics</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}topics/paleo/index.html" class="nav-dropdown__link">Paleontology</a></li>
                        <li><a href="{{BASE}}topics/anthro/index.html" class="nav-dropdown__link">Paleoanthropology</a></li>
                        <li><a href="{{BASE}}topics/darwin/index.html" class="nav-dropdown__link">Charles Darwin</a></li>
                        <li><a href="{{BASE}}topics/scientists/index.html" class="nav-dropdown__link">Scientists</a></li>
                        <li><a href="{{BASE}}topics/museums/index.html" class="nav-dropdown__link">Museums</a></li>
                    </ul>
                </li>

                <!-- Resources with Dropdown -->
                <li class="nav-item has-dropdown">
                    <a href="{{BASE}}articles/index.html" class="nav-link">Resources</a>
                    <ul class="nav-dropdown">
                        <li><a href="{{BASE}}articles/index.html" class="nav-dropdown__link">Articles</a></li>
                        <li><a href="{{BASE}}articles/how_to_start.html" class="nav-dropdown__link">How to Start</a></li>
                        <li><a href="{{BASE}}articles/how_to_collect.html" class="nav-dropdown__link">How to Collect</a></li>
                        <li><a href="{{BASE}}articles/faq.html" class="nav-dropdown__link">FAQ</a></li>
                        <li><a href="{{BASE}}links.html" class="nav-dropdown__link">External Links</a></li>
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

                <!-- Login -->
                <li class="nav-item">
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
                <!-- Google Translate -->
                <div id="google_translate_element"></div>

                <!-- Search Form -->
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
                        <a href="https://www.facebook.com/groups/889825297731726/" class="footer-social__link" target="_blank" rel="noopener noreferrer" aria-label="Facebook Group">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="mailto:admin@paleophilatelie.eu" class="footer-social__link" aria-label="Email">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </a>
                        <a href="{{BASE}}contact.html#follow" class="footer-social__link" aria-label="Follow Us">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Catalogue Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Catalogue</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}phil_catalogue_main.html">Browse Catalogue</a></li>
                        <li><a href="{{BASE}}country/index.html">By Country</a></li>
                        <li><a href="{{BASE}}year/index.html">By Year</a></li>
                        <li><a href="{{BASE}}phil_catalogue_species.html">By Species</a></li>
                        <li><a href="{{BASE}}year/current.html">New Issues</a></li>
                    </ul>
                </div>

                <!-- Gallery Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Gallery</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}images/index.html">All Images</a></li>
                        <li><a href="{{BASE}}images/stamps.html">Stamps</a></li>
                        <li><a href="{{BASE}}images/fdc.html">First Day Covers</a></li>
                        <li><a href="{{BASE}}images/pm.html">Postmarks</a></li>
                        <li><a href="{{BASE}}images/ps.html">Postal Stationery</a></li>
                    </ul>
                </div>

                <!-- Explore Column -->
                <div class="footer-col">
                    <h3 class="footer-col__title">Explore</h3>
                    <ul class="footer-links">
                        <li><a href="{{BASE}}topics/paleo/index.html">Paleontology</a></li>
                        <li><a href="{{BASE}}topics/anthro/index.html">Paleoanthropology</a></li>
                        <li><a href="{{BASE}}exhibitions/index.html">Exhibitions</a></li>
                        <li><a href="{{BASE}}phil_glossary.html">Glossary</a></li>
                        <li><a href="{{BASE}}links.html">External Links</a></li>
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
                        <li><a href="{{BASE}}contact.html">Contact</a></li>
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
                    &copy; 2006&ndash;<span id="currentYear"></span> <a href="{{BASE}}about.html">Michael Kogan</a>. All rights reserved.
                </p>
                <div class="footer-bottom__links">
                    <a href="{{BASE}}paleophilatelie_site_map.html">Sitemap</a>
                    <span class="footer-bottom__divider">|</span>
                    <a href="{{BASE}}about_how-to-help.html">How to Help</a>
                    <span class="footer-bottom__divider">|</span>
                    <a href="{{BASE}}legend.html">Legend</a>
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
    }

    // Load footer component
    function loadFooter(basePath) {
        const element = document.getElementById('footer-placeholder');
        if (!element) return;

        element.innerHTML = applyBasePath(footerHTML, basePath);
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
        const basePath = getBasePath();

        // Load components
        loadHeader(basePath);
        loadFooter(basePath);

        // Load Google Translate after header is loaded
        loadGoogleTranslate();

        // Update copyright year
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
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
