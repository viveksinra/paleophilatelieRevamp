/**
 * Content Page Image Lightbox
 * Wires up all image links on stamp description pages to the Gallery lightbox.
 *
 * Two groups:
 *   1. Products gallery images (.products-gallery) — captions parsed from table structure
 *   2. All other content images (.content-page a>img) — captions from img title/alt
 *
 * Requires components/gallery/gallery.js to be loaded first.
 */
(function () {
    'use strict';

    var initialized = false;
    var IMAGE_RE = /\.(jpe?g|png|gif|webp|bmp|svg)(\?|$)/i;

    // ── Helpers for products-gallery caption extraction ──

    function classifyRow(row) {
        var cells = row.cells;
        if (!cells || !cells.length) return 'spacer';
        if (cells.length === 1 && cells[0].style.height) return 'spacer';
        if (row.querySelector('a > img')) return 'image';
        for (var i = 0; i < cells.length; i++) {
            var small = cells[i].querySelector('small');
            if (small && small.textContent.trim()) return 'caption';
        }
        return 'title';
    }

    function expandColumns(row) {
        var map = {};
        var col = 0;
        var cells = row.cells;
        for (var c = 0; c < cells.length; c++) {
            var td = cells[c];
            var colspan = parseInt(td.getAttribute('colspan')) || 1;
            var text = td.textContent.trim();
            for (var i = 0; i < colspan; i++) {
                if (text) map[col + i] = text;
            }
            col += colspan;
        }
        return map;
    }

    // ── Products gallery: extract images with table-parsed captions ──

    function extractGalleryImages(table) {
        var images = [];
        var linkEls = [];
        var rows = table.querySelectorAll('tr');
        var titleMap = {};
        var lastImageIndices = {};
        var prevRowType = '';

        for (var r = 0; r < rows.length; r++) {
            var row = rows[r];
            var type = classifyRow(row);

            if (type === 'spacer') {
                titleMap = {};
                lastImageIndices = {};
                prevRowType = 'spacer';
                continue;
            }

            if (type === 'title') {
                titleMap = expandColumns(row);
                prevRowType = 'title';
                continue;
            }

            if (type === 'image') {
                lastImageIndices = {};
                var cells = row.cells;
                var col = 0;
                for (var c = 0; c < cells.length; c++) {
                    var td = cells[c];
                    var colspan = parseInt(td.getAttribute('colspan')) || 1;
                    var a = td.querySelector('a');
                    var img = a ? a.querySelector('img') : null;

                    if (a && img) {
                        var href = a.getAttribute('href') || '';
                        if (IMAGE_RE.test(href)) {
                            images.push({
                                src: a.href,
                                thumb: img.src,
                                title: titleMap[col] || img.getAttribute('title') || img.getAttribute('alt') || '',
                                alt: img.getAttribute('alt') || ''
                            });
                            linkEls.push(a);
                            lastImageIndices[col] = images.length - 1;
                        }
                    }
                    col += colspan;
                }
                prevRowType = 'image';
                continue;
            }

            if (type === 'caption' && (prevRowType === 'image' || prevRowType === 'caption')) {
                var cells = row.cells;
                var col = 0;
                for (var c = 0; c < cells.length; c++) {
                    var td = cells[c];
                    var colspan = parseInt(td.getAttribute('colspan')) || 1;
                    var text = td.textContent.trim();
                    if (text && lastImageIndices[col] !== undefined) {
                        var idx = lastImageIndices[col];
                        if (images[idx].title) {
                            images[idx].title += ' \u2014 ' + text;
                        } else {
                            images[idx].title = text;
                        }
                    }
                    col += colspan;
                }
                prevRowType = 'caption';
                continue;
            }
        }

        return { images: images, linkEls: linkEls };
    }

    // ── Content images: all other <a><img> links on the page ──

    function extractContentImages(contentPage, galleryLinksSet) {
        var images = [];
        var linkEls = [];

        var anchors = contentPage.querySelectorAll('a');
        for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i];

            // Skip links already handled by the products gallery
            if (galleryLinksSet.has(a)) continue;

            var img = a.querySelector('img');
            if (!img) continue;

            // Only intercept local image links (relative paths), not external URLs
            var href = a.getAttribute('href') || '';
            if (/^https?:\/\//i.test(href)) continue;
            if (!IMAGE_RE.test(href)) continue;

            images.push({
                src: a.href,
                thumb: img.src,
                title: img.getAttribute('title') || img.getAttribute('alt') || '',
                alt: img.getAttribute('alt') || ''
            });
            linkEls.push(a);
        }

        return { images: images, linkEls: linkEls };
    }

    // ── Wire up click handlers for an image group ──

    function wireUp(images, linkEls) {
        if (!images.length) return;

        linkEls.forEach(function (a, idx) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.Gallery && window.Gallery.openWith) {
                    window.Gallery.openWith(images, idx);
                }
            });
            a.style.cursor = 'zoom-in';
        });
    }

    // ── Main init ──

    function init() {
        if (initialized) return;

        var contentPage = document.querySelector('.content-page');
        if (!contentPage) return;

        initialized = true;

        // 1. Products gallery images (with table-parsed captions)
        var galleryLinksSet = new Set();
        var tables = contentPage.querySelectorAll('.products-gallery');

        tables.forEach(function (table) {
            var result = extractGalleryImages(table);
            wireUp(result.images, result.linkEls);
            result.linkEls.forEach(function (a) { galleryLinksSet.add(a); });
        });

        // 2. All other content images (captions from img title/alt)
        var contentResult = extractContentImages(contentPage, galleryLinksSet);
        wireUp(contentResult.images, contentResult.linkEls);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('componentsLoaded', init);
})();
