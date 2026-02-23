/**
 * Sitemap Enhancement Script
 * Transforms the flat sitemap into an interactive, grouped, searchable directory
 * Two-column layout: left = search + directory, right = original images sidebar
 * Preserves all original content — only adds structural wrappers and interactivity
 */
(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        var contentPage = document.querySelector('.container.content-page');
        if (!contentPage) return;
        contentPage.classList.add('sitemap-page-wrap');

        buildHero(contentPage);
        buildQuickNav(contentPage);
        buildTwoColumnLayout(contentPage);
    }

    /* ===== HERO ===== */
    function buildHero(container) {
        var center = container.querySelector('center');
        if (!center) return;

        // Extract h1 text and meta from center
        var h1 = center.querySelector('h1');
        var h1Text = h1 ? h1.textContent : 'Site Map';
        var metaHTML = '';
        if (h1) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = center.innerHTML;
            var tempH1 = tempDiv.querySelector('h1');
            if (tempH1) tempH1.remove();
            metaHTML = tempDiv.innerHTML.trim();
        }

        // Collect loose nodes between </center> and <table> for the stat line
        var introHTML = '';
        var nodesToRemove = [];
        var node = center.nextSibling;
        while (node) {
            if (node.nodeType === 1 && node.tagName === 'TABLE') break;
            nodesToRemove.push(node);
            if (node.nodeType === 1 && node.tagName !== 'BR') {
                introHTML += node.outerHTML;
            } else if (node.nodeType === 3 && node.textContent.trim()) {
                introHTML += node.textContent.trim() + ' ';
            }
            node = node.nextSibling;
        }

        var hero = document.createElement('div');
        hero.className = 'sitemap-hero';
        hero.innerHTML =
            '<div class="sitemap-hero__inner">' +
                '<span class="sitemap-hero__label">Complete Site Index</span>' +
                '<h1>' + h1Text + '</h1>' +
                '<p class="sitemap-hero__meta">' + metaHTML + '</p>' +
                (introHTML.trim() ? '<div class="sitemap-hero__stat">' + introHTML.trim() + '</div>' : '') +
            '</div>';

        container.insertBefore(hero, center);
        center.remove();
        nodesToRemove.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    }

    /* ===== QUICK NAV ===== */
    function buildQuickNav(container) {
        var nav = document.createElement('div');
        nav.className = 'sitemap-quicknav';

        var cards = [
            { icon: '\uD83C\uDF0D', label: 'Country Catalogue', desc: '170+ countries', href: 'country/index.html' },
            { icon: '\uD83D\uDCC5', label: 'Year Chronology', desc: '1840s\u20132025', href: 'year/index.html' },
            { icon: '\uD83D\uDD0D', label: 'Stamp Descriptions', desc: 'Detailed analysis', href: 'description/stamps/index.html' },
            { icon: '\uD83C\uDFDB\uFE0F', label: 'Exhibitions', desc: 'Philatelic exhibits', href: 'exhibitions/index.html' },
            { icon: '\uD83E\uDDB4', label: 'Topics', desc: 'Paleontology & more', href: 'topics/index.html' },
            { icon: '\uD83D\uDDBC\uFE0F', label: 'Image Galleries', desc: '6,000+ images', href: 'images/index.html' }
        ];

        var html = '<div class="sitemap-quicknav__inner">' +
            '<div class="sitemap-quicknav__title">Quick Navigation</div>' +
            '<div class="sitemap-quicknav__grid">';

        cards.forEach(function (c) {
            html += '<a href="' + c.href + '" class="sitemap-qcard">' +
                '<div class="sitemap-qcard__icon">' + c.icon + '</div>' +
                '<div class="sitemap-qcard__label">' + c.label + '</div>' +
                '<div class="sitemap-qcard__count">' + c.desc + '</div>' +
            '</a>';
        });

        html += '</div></div>';
        nav.innerHTML = html;

        var hero = container.querySelector('.sitemap-hero');
        if (hero) hero.after(nav);
        else container.insertBefore(nav, container.firstChild);
    }

    /* ===== TWO-COLUMN LAYOUT: LEFT = DIRECTORY, RIGHT = SIDEBAR IMAGES ===== */
    function buildTwoColumnLayout(container) {
        var sidebarTable = container.querySelector('table[align="right"]');
        var ol = container.querySelector('ol');
        if (!ol) return;

        // Find the UL (subdirectories list) before the OL
        var subdirUL = null;
        var el = ol.previousElementSibling;
        while (el) {
            if (el.tagName === 'UL') { subdirUL = el; break; }
            el = el.previousElementSibling;
        }

        // Parse items into groups
        var items = ol.querySelectorAll('li');
        var groupConfig = [
            { key: 'root', icon: '\uD83C\uDFE0', label: 'Root Pages', test: function(h){ return !/^\.\/(country|description|exhibitions|images|media|topics|year)\//.test(h); } },
            { key: 'country', icon: '\uD83C\uDF0D', label: 'Country Catalogue', test: function(h){ return /^\.\/country\//.test(h); } },
            { key: 'desc-stamps', icon: '\uD83D\uDCEC', label: 'Stamp Descriptions', test: function(h){ return /^\.\/description\/stamps\//.test(h); } },
            { key: 'desc-covers', icon: '\u2709\uFE0F', label: 'Cover Descriptions', test: function(h){ return /^\.\/description\/covers\//.test(h); } },
            { key: 'desc-letters', icon: '\uD83D\uDCDC', label: 'Letter Descriptions', test: function(h){ return /^\.\/description\/letters\//.test(h); } },
            { key: 'desc-pm', icon: '\uD83D\uDCEE', label: 'Postmark Descriptions', test: function(h){ return /^\.\/description\/pm\//.test(h); } },
            { key: 'desc-ps', icon: '\uD83D\uDCE8', label: 'Postal Stationery Desc.', test: function(h){ return /^\.\/description\/ps\//.test(h); } },
            { key: 'exhibitions', icon: '\uD83C\uDFDB\uFE0F', label: 'Exhibitions', test: function(h){ return /^\.\/exhibitions\//.test(h); } },
            { key: 'images', icon: '\uD83D\uDDBC\uFE0F', label: 'Image Galleries', test: function(h){ return /^\.\/images\//.test(h); } },
            { key: 'media', icon: '\uD83D\uDCDA', label: 'Media & Books', test: function(h){ return /^\.\/media\//.test(h); } },
            { key: 'topics', icon: '\uD83E\uDDB4', label: 'Topics', test: function(h){ return /^\.\/topics\//.test(h); } },
            { key: 'year', icon: '\uD83D\uDCC5', label: 'Year Chronology', test: function(h){ return /^\.\/year\//.test(h); } }
        ];

        var groups = {};
        groupConfig.forEach(function (g) { groups[g.key] = []; });

        items.forEach(function (li) {
            var a = li.querySelector('a');
            if (!a) return;
            var href = a.getAttribute('href') || '';
            var text = a.textContent || '';

            var matched = false;
            for (var i = 1; i < groupConfig.length; i++) {
                if (groupConfig[i].test(href)) {
                    groups[groupConfig[i].key].push({ href: href, text: text, html: a.outerHTML });
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                groups['root'].push({ href: href, text: text, html: a.outerHTML });
            }
        });

        // Build directory HTML (left column content)
        var dirHTML = '';

        // Subdirectories pills
        if (subdirUL) {
            dirHTML += '<div class="sitemap-subdirs">' +
                '<div class="sitemap-subdirs__label">Main Sections</div>' +
                subdirUL.outerHTML +
            '</div>';
        }

        // Search
        dirHTML += '<div class="sitemap-search" id="sitemap-search">' +
            '<div class="sitemap-search__wrap">' +
                '<div class="sitemap-search__input-wrap">' +
                    '<svg class="sitemap-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
                    '<input type="text" class="sitemap-search__input" id="sitemap-filter" placeholder="Search pages\u2026 (e.g. argentina, darwin, 2020)" autocomplete="off">' +
                '</div>' +
                '<span class="sitemap-search__info" id="sitemap-count">' + items.length + ' pages total</span>' +
                '<div class="sitemap-search__actions">' +
                    '<button class="sitemap-btn" id="sitemap-expand-all">Expand All</button>' +
                    '<button class="sitemap-btn" id="sitemap-collapse-all">Collapse All</button>' +
                '</div>' +
            '</div>' +
        '</div>';

        // Sections
        groupConfig.forEach(function (cfg) {
            var list = groups[cfg.key];
            if (list.length === 0) return;

            dirHTML += '<div class="sitemap-section" data-group="' + cfg.key + '">' +
                '<button class="sitemap-section__header" aria-expanded="false">' +
                    '<svg class="sitemap-section__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>' +
                    '<span class="sitemap-section__icon">' + cfg.icon + '</span>' +
                    '<span class="sitemap-section__name">' + cfg.label + '</span>' +
                    '<span class="sitemap-section__badge">' + list.length + '</span>' +
                '</button>' +
                '<div class="sitemap-section__body"><ul class="sitemap-section__list">';

            list.forEach(function (item) {
                dirHTML += '<li data-path="' + escapeAttr(item.text.toLowerCase()) + '">' + item.html + '</li>';
            });

            dirHTML += '</ul></div></div>';
        });

        dirHTML += '<div class="sitemap-no-results" id="sitemap-no-results">' +
            '<div class="sitemap-no-results__icon">\uD83D\uDD0D</div>' +
            '<div class="sitemap-no-results__text">No pages match your search.</div>' +
        '</div>';

        // Create the two-column layout
        var layout = document.createElement('div');
        layout.className = 'sitemap-layout';

        // Left column — directory
        var mainCol = document.createElement('div');
        mainCol.className = 'sitemap-main';
        mainCol.innerHTML = dirHTML;

        // Right column — sidebar with images
        var sidebarCol = document.createElement('div');
        sidebarCol.className = 'sitemap-sidebar';
        if (sidebarTable) {
            sidebarTable.removeAttribute('width');
            sidebarCol.appendChild(sidebarTable);
        }

        layout.appendChild(mainCol);
        layout.appendChild(sidebarCol);

        // Remove old directory content (text, UL, BIG, OL)
        removeOldDirectoryContent(container, subdirUL, ol);

        container.appendChild(layout);
        setupInteractivity();
    }

    function removeOldDirectoryContent(container, subdirUL, ol) {
        var children = Array.prototype.slice.call(container.childNodes);
        var removing = false;

        for (var i = 0; i < children.length; i++) {
            var child = children[i];

            if (child === ol || child === subdirUL) {
                removing = true;
                container.removeChild(child);
                continue;
            }

            if (!removing && child.nodeType === 3 && child.textContent.indexOf('Most of the pages') > -1) {
                removing = true;
                container.removeChild(child);
                continue;
            }

            if (!removing && child.nodeType === 1 && child.tagName === 'BIG') {
                removing = true;
                container.removeChild(child);
                continue;
            }

            if (removing) {
                if (child.nodeType === 1 && (
                    child.classList.contains('sitemap-hero') ||
                    child.classList.contains('sitemap-quicknav') ||
                    child.classList.contains('sitemap-layout')
                )) continue;

                container.removeChild(child);
            }
        }
    }

    function setupInteractivity() {
        // Section toggle
        document.querySelectorAll('.sitemap-section__header').forEach(function (header) {
            header.addEventListener('click', function () {
                var section = this.closest('.sitemap-section');
                section.classList.toggle('is-open');
                this.setAttribute('aria-expanded', String(section.classList.contains('is-open')));
            });
        });

        // Expand / Collapse all
        var expandBtn = document.getElementById('sitemap-expand-all');
        var collapseBtn = document.getElementById('sitemap-collapse-all');

        if (expandBtn) {
            expandBtn.addEventListener('click', function () {
                document.querySelectorAll('.sitemap-section').forEach(function (s) {
                    s.classList.add('is-open');
                    s.querySelector('.sitemap-section__header').setAttribute('aria-expanded', 'true');
                });
            });
        }
        if (collapseBtn) {
            collapseBtn.addEventListener('click', function () {
                document.querySelectorAll('.sitemap-section').forEach(function (s) {
                    s.classList.remove('is-open');
                    s.querySelector('.sitemap-section__header').setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Search
        var input = document.getElementById('sitemap-filter');
        var countEl = document.getElementById('sitemap-count');
        var noResults = document.getElementById('sitemap-no-results');
        var timer;

        if (input) {
            input.addEventListener('input', function () {
                clearTimeout(timer);
                var val = input.value;
                timer = setTimeout(function () { filterPages(val, countEl, noResults); }, 120);
            });
        }
    }

    function filterPages(query, countEl, noResults) {
        var q = query.toLowerCase().trim();
        var sections = document.querySelectorAll('.sitemap-section');
        var totalVisible = 0;

        sections.forEach(function (section) {
            var items = section.querySelectorAll('.sitemap-section__list li');
            var vis = 0;

            items.forEach(function (li) {
                var path = li.getAttribute('data-path') || '';
                if (!q || path.indexOf(q) > -1) {
                    li.classList.remove('is-hidden');
                    vis++;
                } else {
                    li.classList.add('is-hidden');
                }
            });

            var badge = section.querySelector('.sitemap-section__badge');
            if (badge) badge.textContent = q ? (vis + '/' + items.length) : String(items.length);

            if (q) {
                if (vis > 0) {
                    section.classList.add('is-open');
                    section.style.display = '';
                } else {
                    section.classList.remove('is-open');
                    section.style.display = 'none';
                }
            } else {
                section.style.display = '';
            }

            totalVisible += vis;
        });

        if (countEl) countEl.textContent = q ? (totalVisible + ' results') : (totalVisible + ' pages total');
        if (noResults) {
            noResults.classList.toggle('is-visible', q && totalVisible === 0);
        }
    }

    function escapeAttr(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

})();
