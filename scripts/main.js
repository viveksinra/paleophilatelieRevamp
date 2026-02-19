/**
 * MAIN JAVASCRIPT
 * Core functionality for the Paleophilatelie.eu website
 */

(function() {
    'use strict';

    /**
     * Initialize when DOM is ready
     */
    function init() {
        initStickyHeader();
        initToolbarSticky();
        initSmoothScroll();
        initImageLazyLoad();
        initMobileMenu();
        initYearAutoTOC();
    }

    /**
     * Sticky Header - Add shadow when scrolled
     */
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 10) {
                header.classList.add('site-header--scrolled');
            } else {
                header.classList.remove('site-header--scrolled');
            }

            // Hide/show header on scroll direction (optional)
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('site-header--hidden');
            } else {
                header.classList.remove('site-header--hidden');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Toolbar sticky toggle - pin/unpin the search & translate bar
     */
    function initToolbarSticky() {
        const toolbar = document.querySelector('.header-toolbar');
        const checkbox = document.getElementById('toolbar-sticky-checkbox');
        const headerTop = document.querySelector('.header-top');
        if (!toolbar || !checkbox) return;

        // Measure header-top height and set CSS variable
        function updateHeaderHeight() {
            if (headerTop) {
                const h = headerTop.offsetHeight;
                document.documentElement.style.setProperty('--header-top-height', h + 'px');
            }
        }
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight, { passive: true });

        // Apply saved preference
        var saved = false;
        try { saved = localStorage.getItem('toolbarSticky') === 'true'; } catch(e) {}
        if (saved) {
            toolbar.classList.add('header-toolbar--sticky');
            checkbox.checked = true;
        }

        // Toggle handler
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                updateHeaderHeight();
                toolbar.classList.add('header-toolbar--sticky');
            } else {
                toolbar.classList.remove('header-toolbar--sticky');
            }
            try { localStorage.setItem('toolbarSticky', this.checked); } catch(e) {}
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Lazy load images with native loading="lazy" fallback
     */
    function initImageLazyLoad() {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
            });
        } else {
            // Fallback with Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Mobile menu toggle
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.main-nav');

        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('main-nav--open');
            menuToggle.classList.toggle('menu-toggle--active');
            menuToggle.setAttribute('aria-expanded', isOpen);

            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open', isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('main-nav--open');
                menuToggle.classList.remove('menu-toggle--active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('main-nav--open')) {
                nav.classList.remove('main-nav--open');
                menuToggle.classList.remove('menu-toggle--active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    }

    /**
     * Auto-populate sidebar TOC on year pages
     * Scans .year-main for sections with id attributes and builds TOC links
     */
    function initYearAutoTOC() {
        var tocList = document.querySelector('.year-toc__list');
        if (!tocList || tocList.children.length > 0) return;

        var yearMain = document.querySelector('.year-main');
        if (!yearMain) return;

        var sections = yearMain.querySelectorAll('section[id]');
        sections.forEach(function(section) {
            var h2 = section.querySelector('h2');
            if (!h2) return;

            var title = h2.textContent.trim();
            var id = section.getAttribute('id');

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = title;
            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Hide sidebar if no TOC items were generated
        if (tocList.children.length === 0) {
            var sidebar = document.querySelector('.year-sidebar');
            if (sidebar) sidebar.style.display = 'none';
        }
    }

    /**
     * Lightbox for stamp images
     */
    window.openLightbox = function(src, title) {
        // Check if lightbox already exists
        let lightbox = document.querySelector('.lightbox');

        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox__backdrop"></div>
                <div class="lightbox__content">
                    <button class="lightbox__close" aria-label="Close">&times;</button>
                    <img class="lightbox__image" src="" alt="">
                    <div class="lightbox__caption"></div>
                </div>
            `;
            document.body.appendChild(lightbox);

            // Close handlers
            lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });
        }

        // Set content and show
        lightbox.querySelector('.lightbox__image').src = src;
        lightbox.querySelector('.lightbox__image').alt = title || '';
        lightbox.querySelector('.lightbox__caption').textContent = title || '';
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        }
    };

    /**
     * Copy to clipboard utility
     */
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        }

        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve();
    };

    /**
     * Debounce utility
     */
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also initialize after components are loaded
    document.addEventListener('componentsLoaded', init);
})();
