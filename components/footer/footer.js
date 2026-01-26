/**
 * Footer Component JavaScript
 * Handles back-to-top button functionality
 */

(function() {
    'use strict';

    let backToTopBtn;
    let isVisible = false;

    /**
     * Initialize footer functionality
     */
    function init() {
        backToTopBtn = document.getElementById('back-to-top');

        if (!backToTopBtn) return;

        initBackToTop();
    }

    /**
     * Back to Top Button
     */
    function initBackToTop() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const shouldShow = scrollY > 400;

            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                backToTopBtn.classList.toggle('back-to-top--visible', isVisible);
            }
        }, { passive: true });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    /**
     * Smooth scroll to top
     */
    function scrollToTop() {
        // Check for smooth scroll support
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            smoothScrollTo(0, 500);
        }
    }

    /**
     * Fallback smooth scroll animation
     */
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + difference * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    /**
     * Update copyright year automatically
     */
    function updateCopyrightYear() {
        const copyrightElements = document.querySelectorAll('.footer-copyright');
        const currentYear = new Date().getFullYear();

        copyrightElements.forEach(el => {
            el.innerHTML = el.innerHTML.replace(/2026/g, currentYear);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            updateCopyrightYear();
        });
    } else {
        init();
        updateCopyrightYear();
    }

    // Re-initialize after components are loaded
    document.addEventListener('componentsLoaded', () => {
        init();
        updateCopyrightYear();
    });
})();
