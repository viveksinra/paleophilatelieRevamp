/**
 * Country Page JavaScript
 * Handles country page specific interactions
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        headerHeight: 70,
        scrollOffset: 20,
        tocActiveClass: 'toc__link--active',
        backToTopVisibleClass: 'back-to-top--visible',
        tocMobileOpenClass: 'toc--mobile-open'
    };

    /**
     * Initialize all country page functionality
     */
    function init() {
        initTableOfContents();
        initBackToTop();
        initSmoothScroll();
        initLightboxTriggers();
        initMobileTocToggle();
        initStickyElements();
    }

    /**
     * Table of Contents - Active state on scroll
     */
    function initTableOfContents() {
        const toc = document.querySelector('.toc');
        const tocLinks = document.querySelectorAll('.toc__link');
        const sections = document.querySelectorAll('.country-section');

        if (!toc || tocLinks.length === 0 || sections.length === 0) return;

        // Create a map of section IDs to their elements
        const sectionMap = new Map();
        sections.forEach(section => {
            if (section.id) {
                sectionMap.set(section.id, section);
            }
        });

        // Intersection Observer for section visibility
        const observerOptions = {
            root: null,
            rootMargin: `-${config.headerHeight + config.scrollOffset}px 0px -50% 0px`,
            threshold: 0
        };

        let currentActiveLink = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    updateActiveLink(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });

        function updateActiveLink(sectionId) {
            // Remove active class from current link
            if (currentActiveLink) {
                currentActiveLink.classList.remove(config.tocActiveClass);
            }

            // Find and activate new link
            const newActiveLink = document.querySelector(`.toc__link[href="#${sectionId}"]`);
            if (newActiveLink) {
                newActiveLink.classList.add(config.tocActiveClass);
                currentActiveLink = newActiveLink;

                // Scroll TOC to keep active link visible
                scrollTocToActiveLink(newActiveLink);
            }
        }

        function scrollTocToActiveLink(link) {
            const tocList = toc.querySelector('.toc__list');
            if (!tocList) return;

            const linkRect = link.getBoundingClientRect();
            const tocRect = toc.getBoundingClientRect();

            if (linkRect.top < tocRect.top || linkRect.bottom > tocRect.bottom) {
                link.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }

    /**
     * Back to Top Button
     */
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        const showThreshold = 300;
        let ticking = false;

        function updateBackToTopVisibility() {
            if (window.pageYOffset > showThreshold) {
                backToTopBtn.classList.add(config.backToTopVisibleClass);
            } else {
                backToTopBtn.classList.remove(config.backToTopVisibleClass);
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTopVisibility);
                ticking = true;
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                // Handle special cases
                if (targetId === '#' || targetId === '#top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    const targetPosition = targetElement.getBoundingClientRect().top +
                                         window.pageYOffset -
                                         config.headerHeight -
                                         config.scrollOffset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);

                    // Close mobile TOC if open
                    closeMobileToc();
                }
            });
        });
    }

    /**
     * Lightbox Triggers for Stamp Images
     */
    function initLightboxTriggers() {
        // Find all stamp images that should open in lightbox
        const stampImages = document.querySelectorAll('.stamp-item__image, .stamp-table img, .gallery-image');

        stampImages.forEach((img, index) => {
            // Make images clickable if they aren't already wrapped in a link
            if (!img.closest('a')) {
                img.style.cursor = 'pointer';
                img.setAttribute('tabindex', '0');
                img.setAttribute('role', 'button');
                img.setAttribute('aria-label', 'Click to enlarge');
            }

            // Add data attributes for lightbox if not present
            if (!img.hasAttribute('data-lightbox')) {
                img.setAttribute('data-lightbox', 'country-stamps');
                img.setAttribute('data-index', index);
            }
        });

        // Initialize lightbox if gallery.js is loaded
        if (typeof window.initLightbox === 'function') {
            window.initLightbox();
        }
    }

    /**
     * Mobile TOC Toggle
     */
    function initMobileTocToggle() {
        // Create mobile TOC toggle button
        const tocToggle = document.createElement('button');
        tocToggle.className = 'toc-toggle';
        tocToggle.innerHTML = '<span class="toc-toggle__icon">☰</span> Contents';
        tocToggle.setAttribute('aria-label', 'Toggle table of contents');
        tocToggle.setAttribute('aria-expanded', 'false');

        // Insert toggle before main content on mobile
        const countryContent = document.querySelector('.country-content');
        if (countryContent) {
            countryContent.insertAdjacentElement('beforebegin', tocToggle);
        }

        // Add mobile-specific styles
        addMobileTocStyles();

        // Toggle functionality
        tocToggle.addEventListener('click', toggleMobileToc);
    }

    function toggleMobileToc() {
        const toc = document.querySelector('.toc');
        const toggle = document.querySelector('.toc-toggle');

        if (!toc || !toggle) return;

        const isOpen = toc.classList.contains(config.tocMobileOpenClass);

        if (isOpen) {
            closeMobileToc();
        } else {
            toc.classList.add(config.tocMobileOpenClass);
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileToc() {
        const toc = document.querySelector('.toc');
        const toggle = document.querySelector('.toc-toggle');

        if (toc) {
            toc.classList.remove(config.tocMobileOpenClass);
        }
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    function addMobileTocStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toc-toggle {
                display: none;
                width: 100%;
                padding: var(--space-3) var(--space-4);
                background: var(--color-white);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-md);
                font-size: var(--font-size-base);
                font-weight: var(--font-weight-medium);
                color: var(--color-text-primary);
                cursor: pointer;
                margin-bottom: var(--space-4);
                text-align: left;
            }

            .toc-toggle__icon {
                margin-right: var(--space-2);
            }

            @media (max-width: 1024px) {
                .toc-toggle {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Sticky Elements Handler
     */
    function initStickyElements() {
        const sidebar = document.querySelector('.country-sidebar');
        if (!sidebar) return;

        // Get actual header height
        const header = document.querySelector('.site-header');
        if (header) {
            config.headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${config.headerHeight}px`);
        }

        // Update on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (header) {
                    config.headerHeight = header.offsetHeight;
                    document.documentElement.style.setProperty('--header-height', `${config.headerHeight}px`);
                }
            }, 100);
        }, { passive: true });
    }

    /**
     * Stamp Year Navigation
     * Adds quick year navigation if multiple years are present
     */
    function initYearNavigation() {
        const yearSections = document.querySelectorAll('.year-section');
        if (yearSections.length <= 1) return;

        const yearNav = document.createElement('div');
        yearNav.className = 'year-quick-nav';
        yearNav.innerHTML = '<span class="year-quick-nav__label">Jump to year:</span>';

        const yearList = document.createElement('div');
        yearList.className = 'year-quick-nav__list';

        yearSections.forEach(section => {
            const yearBadge = section.querySelector('.year-section__badge');
            const yearId = section.id;

            if (yearBadge && yearId) {
                const yearLink = document.createElement('a');
                yearLink.href = `#${yearId}`;
                yearLink.className = 'year-quick-nav__link';
                yearLink.textContent = yearBadge.textContent;
                yearList.appendChild(yearLink);
            }
        });

        yearNav.appendChild(yearList);

        // Insert before stamps section
        const stampsSection = document.getElementById('stamps');
        if (stampsSection) {
            const stampsContent = stampsSection.querySelector('.country-section__content');
            if (stampsContent) {
                stampsContent.insertAdjacentElement('afterbegin', yearNav);
            }
        }

        // Add styles
        addYearNavStyles();
    }

    function addYearNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .year-quick-nav {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: var(--space-2);
                padding: var(--space-3);
                background: var(--color-background-alt);
                border-radius: var(--border-radius-md);
                margin-bottom: var(--space-5);
            }

            .year-quick-nav__label {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                font-weight: var(--font-weight-medium);
            }

            .year-quick-nav__list {
                display: flex;
                flex-wrap: wrap;
                gap: var(--space-1);
            }

            .year-quick-nav__link {
                display: inline-block;
                padding: var(--space-1) var(--space-2);
                background: var(--color-white);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-sm);
                font-size: var(--font-size-sm);
                color: var(--color-text-primary);
                text-decoration: none;
                transition: all var(--transition-fast);
            }

            .year-quick-nav__link:hover {
                background: var(--color-primary);
                border-color: var(--color-primary);
                color: var(--color-white);
                text-decoration: none;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Image Lazy Loading Enhancement
     */
    function initLazyLoading() {
        // Use native lazy loading if available
        const images = document.querySelectorAll('.stamp-item__image, .stamp-table img');

        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });

        // Fallback for older browsers using Intersection Observer
        if ('IntersectionObserver' in window && !('loading' in HTMLImageElement.prototype)) {
            const lazyImages = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Print Handler
     */
    function initPrintHandler() {
        // Before print - expand all sections, show all images
        window.addEventListener('beforeprint', () => {
            // Ensure all images are loaded
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        });
    }

    /**
     * Keyboard Navigation
     */
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile TOC
            if (e.key === 'Escape') {
                closeMobileToc();
            }

            // Arrow keys for country navigation
            if (e.altKey) {
                const prevLink = document.querySelector('.country-nav__link--prev');
                const nextLink = document.querySelector('.country-nav__link--next');

                if (e.key === 'ArrowLeft' && prevLink) {
                    window.location.href = prevLink.href;
                } else if (e.key === 'ArrowRight' && nextLink) {
                    window.location.href = nextLink.href;
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initYearNavigation();
            initLazyLoading();
            initPrintHandler();
            initKeyboardNavigation();
        });
    } else {
        init();
        initYearNavigation();
        initLazyLoading();
        initPrintHandler();
        initKeyboardNavigation();
    }

    // Export for external use
    window.CountryPage = {
        scrollToSection: function(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const targetPosition = section.getBoundingClientRect().top +
                                     window.pageYOffset -
                                     config.headerHeight -
                                     config.scrollOffset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        },
        toggleToc: toggleMobileToc,
        closeToc: closeMobileToc
    };
})();
