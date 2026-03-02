/**
 * Header Component JavaScript
 * Smithsonian Magazine Style - Handles mobile menu, search overlay, and scroll behavior
 */

(function() {
    'use strict';

    // DOM Elements
    let header, menuToggle, mainNav, navClose, searchToggle, searchOverlay, searchClose, searchInput;
    let isMenuOpen = false;

    /**
     * Initialize header functionality
     */
    function init() {
        // Get DOM elements
        header = document.querySelector('.site-header');
        menuToggle = document.getElementById('menu-toggle');
        mainNav = document.getElementById('main-nav');
        navClose = document.getElementById('nav-close');
        searchToggle = document.getElementById('search-toggle');
        searchOverlay = document.getElementById('search-overlay');
        searchClose = document.getElementById('search-close');
        searchInput = searchOverlay ? searchOverlay.querySelector('.search-overlay-input') : null;

        if (!header) return;

        // Initialize features
        initMobileMenu();
        initMobileDropdowns();
        initSearchOverlay();
        initStickyHeader();
        highlightActiveNavLink();
    }

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', toggleMenu);

        // Close button inside drawer
        if (navClose) {
            navClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking overlay (the ::before pseudo-element)
        mainNav.addEventListener('click', (e) => {
            if (e.target === mainNav) {
                closeMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 992 && isMenuOpen) {
                closeMenu();
            }
        }, 100));
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        mainNav.classList.toggle('is-open', isMenuOpen);
        document.body.classList.toggle('menu-open', isMenuOpen);
    }

    function closeMenu() {
        isMenuOpen = false;
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        document.body.classList.remove('menu-open');

        // Close all mobile dropdowns when menu closes
        const openDropdowns = document.querySelectorAll('.nav-item.has-dropdown.is-open');
        openDropdowns.forEach(item => item.classList.remove('is-open'));
    }

    /**
     * Mobile Dropdown Toggle (for touch/click on mobile)
     */
    function initMobileDropdowns() {
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');

            // On mobile, clicking the nav link toggles dropdown instead of navigating
            link.addEventListener('click', (e) => {
                // Only intercept on mobile (when menu toggle is visible)
                if (window.innerWidth < 992) {
                    e.preventDefault();

                    // Close other open dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('is-open')) {
                            otherItem.classList.remove('is-open');
                        }
                    });

                    // Toggle current dropdown
                    item.classList.toggle('is-open');
                }
            });
        });

        // Nested sub-dropdowns
        const subdropdownItems = document.querySelectorAll('.has-subdropdown');

        subdropdownItems.forEach(item => {
            const link = item.querySelector('.nav-dropdown__link');

            link.addEventListener('click', (e) => {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other open sub-dropdowns at the same level
                    subdropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('is-open')) {
                            otherItem.classList.remove('is-open');
                        }
                    });

                    // Toggle current sub-dropdown
                    item.classList.toggle('is-open');
                }
            });
        });
    }

    /**
     * Search Overlay Toggle
     */
    function initSearchOverlay() {
        if (!searchToggle || !searchOverlay) return;

        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openSearchOverlay();
        });

        if (searchClose) {
            searchClose.addEventListener('click', closeSearchOverlay);
        }

        // Close when clicking overlay background
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearchOverlay();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
                closeSearchOverlay();
            }
        });
    }

    function openSearchOverlay() {
        searchOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // Focus on input
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }

    function closeSearchOverlay() {
        searchOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    /**
     * Sticky header with scroll behavior
     */
    function initStickyHeader() {
        const headerTop = document.querySelector('.header-top');
        if (!headerTop) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScrollY > 10) {
                headerTop.classList.add('scrolled');
            } else {
                headerTop.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    /**
     * Highlight active navigation link based on centralized config
     */
    function highlightActiveNavLink() {
        var rule = window.getNavHighlightRule ? window.getNavHighlightRule() : null;
        if (!rule) return;

        // Build a set of target hrefs (lowercased, no hash)
        var targets = {};
        for (var i = 0; i < rule.nav.length; i++) {
            targets[rule.nav[i].toLowerCase().split('#')[0]] = true;
        }

        // Helper: normalize a link's href to site-root-relative form
        function normalizeHref(href) {
            if (!href) return '';
            return href.replace(/\.\.\//g, '').split('#')[0].toLowerCase();
        }

        // Scan all nav links at every level
        var allLinks = document.querySelectorAll('.nav-link, .nav-dropdown__link, .nav-subdropdown__link');
        allLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href || href === '#') return;
            var norm = normalizeHref(href);
            if (!targets[norm]) return;

            // Determine link type and apply the correct active class
            if (link.classList.contains('nav-subdropdown__link')) {
                link.classList.add('nav-subdropdown__link--active');
            } else if (link.classList.contains('nav-dropdown__link')) {
                // Only activate if the parent top-level nav's href is also in the target set
                var parentItem = link.closest('.nav-item.has-dropdown');
                if (parentItem) {
                    var parentLink = parentItem.querySelector(':scope > .nav-link');
                    if (parentLink) {
                        var parentNorm = normalizeHref(parentLink.getAttribute('href'));
                        if (targets[parentNorm]) {
                            link.classList.add('nav-dropdown__link--active');
                        }
                    }
                }
            } else if (link.classList.contains('nav-link')) {
                link.classList.add('nav-link--active');
            }
        });
    }

    /**
     * Debounce utility
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize after components are loaded
    document.addEventListener('componentsLoaded', init);
})();
