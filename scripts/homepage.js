/**
 * Homepage JavaScript
 * Handles homepage-specific interactions and animations
 */

(function() {
    'use strict';

    /**
     * Initialize all homepage functionality
     */
    function init() {
        initCounterAnimation();
        initSmoothScrollLinks();
        initCardHoverEffects();
    }

    /**
     * Animate statistics counters when they come into view
     */
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-card__number[data-count]');

        if (counters.length === 0) return;

        // Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        counters.forEach(counter => observer.observe(counter));
    }

    /**
     * Animate a single counter from 0 to its target value
     */
    function animateCounter(element) {
        const target = element.getAttribute('data-count');
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        const hasS = originalText.toLowerCase().includes('s');

        // Parse numeric value
        let targetNum = parseInt(target.replace(/\D/g, ''), 10);
        if (isNaN(targetNum)) {
            targetNum = 0;
        }

        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(startValue + (targetNum - startValue) * easeOut);

            // Format the display value
            let displayValue = currentValue.toString();
            if (hasPlus) displayValue += '+';
            if (hasS && !hasPlus) displayValue += 's';

            element.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Restore original text format
                element.textContent = originalText;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Add smooth scrolling for internal anchor links
     */
    function initSmoothScrollLinks() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '#top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Enhanced hover effects for cards
     */
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.explore-card, .category-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
            });

            card.addEventListener('mouseleave', function() {
                this.style.willChange = 'auto';
            });
        });
    }

    /**
     * Parallax effect for hero background (optional, performance-conscious)
     */
    function initParallaxHero() {
        const hero = document.querySelector('.hero--home');
        const bgImage = hero?.querySelector('.hero__bg-image');

        if (!hero || !bgImage) return;

        // Only enable on larger screens for performance
        if (window.innerWidth < 768) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const yPos = scrolled * 0.3;
                bgImage.style.transform = `translateY(${yPos}px)`;
            }

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize after components are loaded
    document.addEventListener('componentsLoaded', function() {
        // Reinitialize any features that depend on component content
        initSmoothScrollLinks();
    });
})();
