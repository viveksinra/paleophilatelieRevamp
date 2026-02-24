/**
 * Gallery & Lightbox Component JavaScript
 * Handles gallery filtering, view switching, and lightbox functionality
 */

(function() {
    'use strict';

    // State
    let currentIndex = 0;
    let galleryImages = [];
    let lightbox = null;
    let isOpen = false;
    let eventsAttached = false;

    /**
     * Initialize gallery functionality
     */
    function init() {
        initGalleryFilters();
        initViewToggle();
        initLightbox();
    }

    /**
     * Gallery Filter Buttons
     */
    function initGalleryFilters() {
        const filterBtns = document.querySelectorAll('.gallery__filter-btn');
        const galleryItems = document.querySelectorAll('.gallery__item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active button
                filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
                btn.classList.add('gallery__filter-btn--active');

                // Filter items
                galleryItems.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                        item.classList.remove('gallery__item--hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('gallery__item--hidden');
                    }
                });

                // Update lightbox images array
                updateGalleryImages();
            });
        });
    }

    /**
     * View Toggle (Grid/List)
     */
    function initViewToggle() {
        const viewBtns = document.querySelectorAll('.gallery__view-btn');
        const gallery = document.querySelector('.gallery');

        if (!gallery) return;

        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;

                // Update active button
                viewBtns.forEach(b => b.classList.remove('gallery__view-btn--active'));
                btn.classList.add('gallery__view-btn--active');

                // Update gallery class
                gallery.classList.remove('gallery--list', 'gallery--grid');
                gallery.classList.add(`gallery--${view}`);
            });
        });
    }

    /**
     * Initialize Lightbox
     */
    function initLightbox() {
        lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            createLightbox();
            lightbox = document.getElementById('lightbox');
        }

        // Get all gallery links
        updateGalleryImages();

        // Only attach event listeners once
        if (eventsAttached) return;
        eventsAttached = true;

        // Attach click handlers to gallery links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.gallery__link[data-lightbox]');
            if (link) {
                e.preventDefault();
                const index = galleryImages.findIndex(img => img.src === link.href);
                openLightbox(index >= 0 ? index : 0);
            }
        });

        // Close button
        const closeBtn = lightbox.querySelector('.lightbox__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        // Backdrop click
        const backdrop = lightbox.querySelector('.lightbox__backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeLightbox);
        }

        // Navigation
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');

        if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

        // Touch/Swipe support
        initTouchSupport();

        // Keyboard navigation
        initKeyboardNavigation();
    }

    /**
     * Create lightbox element if it doesn't exist
     */
    function createLightbox() {
        const lightboxHtml = `
            <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox">
                <div class="lightbox__backdrop"></div>
                <div class="lightbox__container">
                    <button class="lightbox__close" aria-label="Close lightbox">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <button class="lightbox__nav lightbox__nav--next" aria-label="Next image">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                    <div class="lightbox__content">
                        <div class="lightbox__image-wrapper">
                            <img src="" alt="" class="lightbox__image">
                            <div class="lightbox__loader">
                                <div class="lightbox__spinner"></div>
                            </div>
                        </div>
                    </div>
                    <div class="lightbox__footer">
                        <div class="lightbox__caption"></div>
                        <div class="lightbox__counter">
                            <span class="lightbox__current">1</span> / <span class="lightbox__total">1</span>
                        </div>
                    </div>
                    <div class="lightbox__thumbnails">
                        <div class="lightbox__thumbs-track"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    /**
     * Update gallery images array
     */
    function updateGalleryImages() {
        galleryImages = [];
        const links = document.querySelectorAll('.gallery__link[data-lightbox]:not(.gallery__item--hidden .gallery__link)');

        links.forEach(link => {
            const item = link.closest('.gallery__item');
            if (item && !item.classList.contains('gallery__item--hidden') && item.style.display !== 'none') {
                galleryImages.push({
                    src: link.href,
                    thumb: link.querySelector('img')?.src || link.href,
                    title: link.dataset.title || '',
                    alt: link.querySelector('img')?.alt || ''
                });
            }
        });
    }

    /**
     * Open lightbox
     */
    function openLightbox(index) {
        if (!lightbox || galleryImages.length === 0) return;

        currentIndex = index;
        isOpen = true;

        // Show lightbox
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';

        // Load image
        loadImage(currentIndex);

        // Build thumbnails
        buildThumbnails();

        // Update counter
        updateCounter();

        // Focus management
        lightbox.focus();
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        if (!lightbox) return;

        isOpen = false;
        lightbox.classList.remove('lightbox--open');
        document.body.style.overflow = '';
    }

    /**
     * Navigate to previous/next image
     */
    function navigate(direction) {
        if (galleryImages.length === 0) return;

        currentIndex += direction;

        // Loop around
        if (currentIndex < 0) currentIndex = galleryImages.length - 1;
        if (currentIndex >= galleryImages.length) currentIndex = 0;

        loadImage(currentIndex);
        updateCounter();
        updateThumbnails();
    }

    /**
     * Load image into lightbox
     */
    function loadImage(index) {
        const image = galleryImages[index];
        if (!image) return;

        const imgEl = lightbox.querySelector('.lightbox__image');
        const captionEl = lightbox.querySelector('.lightbox__caption');

        // Show loader and clear previous image so stale content never lingers
        lightbox.classList.add('lightbox--loading');
        imgEl.src = '';

        // Create new image to preload
        const newImg = new Image();
        newImg.onload = () => {
            imgEl.src = newImg.src;
            imgEl.alt = image.alt || image.title;
            lightbox.classList.remove('lightbox--loading');
        };
        newImg.onerror = () => {
            // Fallback to thumbnail if full-size image fails to load
            imgEl.src = image.thumb || image.src;
            imgEl.alt = image.alt || image.title;
            lightbox.classList.remove('lightbox--loading');
        };
        newImg.src = image.src;

        // Update caption
        if (captionEl) {
            captionEl.textContent = image.title;
        }

        // Update navigation buttons
        updateNavButtons();
    }

    /**
     * Update navigation button states
     */
    function updateNavButtons() {
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');

        // For now, always enable (loop navigation)
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }

    /**
     * Update counter display
     */
    function updateCounter() {
        const currentEl = lightbox.querySelector('.lightbox__current');
        const totalEl = lightbox.querySelector('.lightbox__total');

        if (currentEl) currentEl.textContent = currentIndex + 1;
        if (totalEl) totalEl.textContent = galleryImages.length;
    }

    /**
     * Build thumbnails strip
     */
    function buildThumbnails() {
        const track = lightbox.querySelector('.lightbox__thumbs-track');
        if (!track) return;

        track.innerHTML = galleryImages.map((img, i) => `
            <button class="lightbox__thumb ${i === currentIndex ? 'lightbox__thumb--active' : ''}"
                    data-index="${i}" aria-label="View image ${i + 1}">
                <img src="${img.thumb}" alt="">
            </button>
        `).join('');

        // Attach click handlers
        track.querySelectorAll('.lightbox__thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index, 10);
                currentIndex = index;
                loadImage(index);
                updateCounter();
                updateThumbnails();
            });
        });
    }

    /**
     * Update active thumbnail
     */
    function updateThumbnails() {
        const thumbs = lightbox.querySelectorAll('.lightbox__thumb');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('lightbox__thumb--active', i === currentIndex);
        });

        // Scroll active thumbnail into view
        const activeThumb = lightbox.querySelector('.lightbox__thumb--active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    /**
     * Keyboard navigation
     */
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(1);
                    break;
                case 'Home':
                    currentIndex = 0;
                    loadImage(0);
                    updateCounter();
                    updateThumbnails();
                    break;
                case 'End':
                    currentIndex = galleryImages.length - 1;
                    loadImage(currentIndex);
                    updateCounter();
                    updateThumbnails();
                    break;
            }
        });
    }

    /**
     * Touch/Swipe support
     */
    function initTouchSupport() {
        if (!lightbox) return;

        let touchStartX = 0;
        let touchEndX = 0;

        const content = lightbox.querySelector('.lightbox__content');
        if (!content) return;

        content.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        content.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigate(1); // Swipe left = next
                } else {
                    navigate(-1); // Swipe right = prev
                }
            }
        }
    }

    // Public API
    window.Gallery = {
        open: openLightbox,
        close: closeLightbox,
        next: () => navigate(1),
        prev: () => navigate(-1),
        refresh: updateGalleryImages,
        openWith: function(images, startIndex) {
            galleryImages = images;
            openLightbox(startIndex || 0);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize after components are loaded
    document.addEventListener('componentsLoaded', init);
})();
