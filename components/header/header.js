/**
 * Header Component JavaScript
 * Handles mobile menu, search panel, dropdowns, and scroll behavior
 */

(function() {
    'use strict';

    // DOM Elements
    let header, menuToggle, mainNav, searchToggle, searchPanel;
    let lastScrollY = 0;
    let isMenuOpen = false;

    /**
     * Initialize header functionality
     */
    function init() {
        // Get DOM elements
        header = document.querySelector('.site-header');
        menuToggle = document.getElementById('menu-toggle');
        mainNav = document.getElementById('main-nav');
        searchToggle = document.getElementById('search-toggle');
        searchPanel = document.getElementById('search-panel');

        if (!header) return;

        // Initialize features
        initMobileMenu();
        initSearch();
        initDropdowns();
        initStickyHeader();
    }

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', toggleMenu);

        // Close button inside drawer
        const navClose = document.getElementById('nav-close');
        if (navClose) {
            navClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking overlay
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

        menuToggle.classList.toggle('menu-toggle--active', isMenuOpen);
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        mainNav.classList.toggle('main-nav--open', isMenuOpen);
        document.body.classList.toggle('menu-open', isMenuOpen);
    }

    function closeMenu() {
        isMenuOpen = false;
        menuToggle.classList.remove('menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('main-nav--open');
        document.body.classList.remove('menu-open');
    }

    /**
     * Search Panel Toggle
     */
    function initSearch() {
        if (!searchToggle || !searchPanel) return;

        searchToggle.addEventListener('click', toggleSearch);

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchPanel.contains(e.target) && !searchToggle.contains(e.target)) {
                closeSearch();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSearch();
            }
        });

        // Focus input when opening
        searchPanel.addEventListener('transitionend', () => {
            if (searchPanel.classList.contains('header-search__panel--open')) {
                const input = searchPanel.querySelector('.header-search__input');
                if (input) input.focus();
            }
        });
    }

    function toggleSearch() {
        const isCurrentlyHidden = searchPanel.hasAttribute('hidden');

        if (isCurrentlyHidden) {
            searchPanel.removeAttribute('hidden');
            searchPanel.classList.add('header-search__panel--open');
            searchToggle.setAttribute('aria-expanded', 'true');
            // Focus on input
            const input = searchPanel.querySelector('.header-search__input');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        } else {
            searchPanel.setAttribute('hidden', '');
            searchPanel.classList.remove('header-search__panel--open');
            searchToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function closeSearch() {
        searchPanel.setAttribute('hidden', '');
        searchPanel.classList.remove('header-search__panel--open');
        searchToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Dropdown handling for mobile
     */
    function initDropdowns() {
        const dropdownItems = document.querySelectorAll('.main-nav__item--has-dropdown');

        dropdownItems.forEach(item => {
            const link = item.querySelector('.main-nav__link');

            link.addEventListener('click', (e) => {
                // Only handle on mobile
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    item.classList.toggle('is-open');

                    // Close other dropdowns
                    dropdownItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('is-open');
                        }
                    });
                }
            });
        });
    }

    /**
     * Sticky header with scroll behavior
     */
    function initStickyHeader() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScrollY > 10) {
                header.classList.add('site-header--scrolled');
            } else {
                header.classList.remove('site-header--scrolled');
            }

            // Hide/show on scroll direction (optional - uncomment to enable)
            // if (currentScrollY > lastScrollY && currentScrollY > 100) {
            //     header.classList.add('site-header--hidden');
            // } else {
            //     header.classList.remove('site-header--hidden');
            // }

            lastScrollY = currentScrollY;
        }, { passive: true });
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
