/**
 * Bulk Convert Year Pages to Sidebar TOC Layout
 *
 * This script restructures year HTML files to use a two-column layout
 * with a sticky sidebar TOC on the left and main content on the right,
 * matching the 2025.html design.
 *
 * It preserves ALL inner content verbatim and only restructures the
 * outer wrapper (moving sections into year-main, adding sidebar).
 *
 * Usage: node scripts/convert-year-pages.js
 */

const fs = require('fs');
const path = require('path');

const YEAR_DIR = path.join(__dirname, '..', 'year');

// Files to skip (already converted or special pages)
const SKIP_FILES = new Set([
    '2025.html',   // already has sidebar layout
    'index.html',  // special page
    'darwin_200.html', // special page
    'empty.html'   // template page
]);

// Stats
const stats = { converted: 0, skipped: 0, errors: [] };

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Find the closing tag position for a given opening tag position.
 * Handles nested tags of the same type.
 */
function findClosingTag(html, tagName, openPos) {
    const openPattern = new RegExp('<' + tagName + '[\\s>]', 'gi');
    const closePattern = new RegExp('</' + tagName + '\\s*>', 'gi');

    let depth = 1;
    let searchFrom = openPos + 1;

    while (depth > 0) {
        openPattern.lastIndex = searchFrom;
        closePattern.lastIndex = searchFrom;

        const nextOpen = openPattern.exec(html);
        const nextClose = closePattern.exec(html);

        if (!nextClose) return -1; // malformed HTML

        if (nextOpen && nextOpen.index < nextClose.index) {
            depth++;
            searchFrom = nextOpen.index + 1;
        } else {
            depth--;
            if (depth === 0) {
                return nextClose.index + nextClose[0].length;
            }
            searchFrom = nextClose.index + 1;
        }
    }
    return -1;
}

/**
 * Extract a block by matching an opening tag pattern and finding its close.
 * Returns { start, end, content } or null.
 */
function extractBlock(html, openRegex, tagName, searchFrom) {
    openRegex.lastIndex = searchFrom || 0;
    const m = openRegex.exec(html);
    if (!m) return null;

    const start = m.index;
    const end = findClosingTag(html, tagName, start);
    if (end === -1) return null;

    return {
        start,
        end,
        outerHTML: html.substring(start, end),
        innerHTML: html.substring(start + m[0].length, html.lastIndexOf('</' + tagName, end))
    };
}

// ─── CONVERSION ──────────────────────────────────────────────────────────────

function convertFile(filePath) {
    const filename = path.basename(filePath);
    let html = fs.readFileSync(filePath, 'utf-8');

    // Skip if already has the sidebar layout
    if (html.includes('year-content-layout') || html.includes('year-sidebar')) {
        return { skipped: true, reason: 'already has sidebar layout' };
    }

    // Must have <main> tag
    const mainOpenMatch = html.match(/<main\s[^>]*id=["']main-content["'][^>]*>/i);
    if (!mainOpenMatch) {
        return { skipped: true, reason: 'no <main> tag found' };
    }

    // Extract the content between <main> and </main>
    const mainStart = mainOpenMatch.index + mainOpenMatch[0].length;
    const mainEnd = html.indexOf('</main>', mainStart);
    if (mainEnd === -1) {
        return { skipped: true, reason: 'no closing </main> tag' };
    }

    const mainContent = html.substring(mainStart, mainEnd);

    // ── Parse structural blocks ──

    // 1. Breadcrumb
    const breadcrumbBlock = extractBlock(mainContent, /<nav\s+class=["']breadcrumb["']/gi, 'nav', 0);

    // 2. Year Hero
    const heroBlock = extractBlock(mainContent, /<section\s+class=["']year-hero["']/gi, 'section', 0);
    if (!heroBlock) {
        return { skipped: true, reason: 'no year-hero section found' };
    }

    // Check if stamps-grid is inside the hero
    let heroStampsGrid = '';
    let heroClean = heroBlock.outerHTML;

    const heroGridMatch = heroBlock.outerHTML.match(/<div\s+class=["']stamps-grid["']/i);
    if (heroGridMatch) {
        // Extract the stamps-grid from inside the hero
        const gridBlock = extractBlock(heroBlock.outerHTML, /<div\s+class=["']stamps-grid["']/gi, 'div', 0);
        if (gridBlock) {
            heroStampsGrid = gridBlock.outerHTML;
            // Remove the stamps-grid from the hero
            heroClean = heroBlock.outerHTML.substring(0, gridBlock.start) +
                        heroBlock.outerHTML.substring(gridBlock.end);
            // Clean up any empty whitespace/newlines left behind
            heroClean = heroClean.replace(/\n\s*\n\s*\n/g, '\n\n');
        }
    }

    // 3. Year TOC (old-style, to be removed — replaced by auto-TOC)
    const tocBlock = extractBlock(mainContent, /<section\s+class=["']year-toc["']/gi, 'section', 0);

    // 4. Year Nav Section
    const navBlock = extractBlock(mainContent, /<section\s+class=["']year-nav-section["']/gi, 'section', 0);

    // 5. Bottom Nav Section
    const bottomNavBlock = extractBlock(mainContent, /<section\s+class=["']bottom-nav-section["']/gi, 'section', 0);

    // 6. Collect everything between hero/nav/toc and bottom-nav into "middle content"
    //    This includes: fb-promo, ad-banners, content-sections, stamps-sections,
    //    ack-sections, bare stamps-grids, announcements, etc.

    // Determine where middle content starts
    let middleStart = heroBlock.end;
    // Skip past year-toc if present
    if (tocBlock && tocBlock.start >= middleStart) {
        middleStart = Math.max(middleStart, tocBlock.end);
    }
    // Skip past year-nav-section if it comes right after hero/toc
    if (navBlock && navBlock.start < middleStart + 200) {
        // Nav section is right after hero/toc — it will be placed inside year-main
        // But we still skip past it for the middle content extraction since
        // we'll re-insert it separately
    }

    // Determine where middle content ends (before bottom-nav or end of main)
    let middleEnd = mainContent.length;
    if (bottomNavBlock) {
        middleEnd = bottomNavBlock.start;
    }

    // Now collect all the pieces that go into year-main, in order
    // We need to walk the mainContent from after the hero to before bottom-nav,
    // collecting everything except the breadcrumb, hero, and year-toc

    // Build a list of "excluded" ranges (breadcrumb, hero, toc, bottom-nav)
    const excludedRanges = [];
    if (breadcrumbBlock) excludedRanges.push({ start: breadcrumbBlock.start, end: breadcrumbBlock.end });
    excludedRanges.push({ start: heroBlock.start, end: heroBlock.end });
    if (tocBlock) excludedRanges.push({ start: tocBlock.start, end: tocBlock.end });
    if (bottomNavBlock) excludedRanges.push({ start: bottomNavBlock.start, end: bottomNavBlock.end });

    // Sort ranges
    excludedRanges.sort((a, b) => a.start - b.start);

    // Collect non-excluded content from after the hero to before bottom-nav
    let yearMainContent = '';
    let pos = heroBlock.end;
    const endPos = bottomNavBlock ? bottomNavBlock.start : mainContent.length;

    // Walk forward, skipping excluded ranges
    while (pos < endPos) {
        // Find the next excluded range that overlaps or is ahead
        let nextExcluded = null;
        for (const range of excludedRanges) {
            if (range.end > pos) {
                nextExcluded = range;
                break;
            }
        }

        if (nextExcluded && nextExcluded.start <= pos) {
            // We're inside an excluded range, skip past it
            pos = nextExcluded.end;
        } else if (nextExcluded && nextExcluded.start < endPos) {
            // Collect content up to the excluded range
            yearMainContent += mainContent.substring(pos, nextExcluded.start);
            pos = nextExcluded.end;
        } else {
            // No more excluded ranges, collect the rest
            yearMainContent += mainContent.substring(pos, endPos);
            pos = endPos;
        }
    }

    // If there was a stamps-grid extracted from the hero, prepend it to year-main
    if (heroStampsGrid) {
        yearMainContent = '\n                    ' + heroStampsGrid + '\n' + yearMainContent;
    }

    // Trim excessive whitespace but preserve content
    yearMainContent = yearMainContent.replace(/^\n+/, '\n').replace(/\n+$/, '\n');

    // ── Reassemble ──

    let newMainContent = '\n';

    // Breadcrumb
    if (breadcrumbBlock) {
        newMainContent += '        ' + breadcrumbBlock.outerHTML + '\n\n';
    }

    // Hero (cleaned — no stamps-grid)
    newMainContent += '        ' + heroClean.replace(/\s+$/, '') + '\n\n';

    // Container with sidebar layout
    newMainContent += '        <!-- Main Content Area with Sidebar -->\n';
    newMainContent += '        <div class="container">\n';
    newMainContent += '            <div class="year-content-layout">\n';
    newMainContent += '                <!-- Sidebar: Table of Contents -->\n';
    newMainContent += '                <aside class="year-sidebar">\n';
    newMainContent += '                    <nav class="year-toc__box" aria-label="Table of contents">\n';
    newMainContent += '                        <div class="year-toc__title">Contents:</div>\n';
    newMainContent += '                        <ul class="year-toc__list"></ul>\n';
    newMainContent += '                    </nav>\n';
    newMainContent += '                </aside>\n\n';
    newMainContent += '                <!-- Main Content -->\n';
    newMainContent += '                <div class="year-main">\n';
    newMainContent += yearMainContent;
    newMainContent += '                </div><!-- /.year-main -->\n';
    newMainContent += '            </div><!-- /.year-content-layout -->\n';
    newMainContent += '        </div><!-- /.container -->\n\n';

    // Bottom Navigation
    if (bottomNavBlock) {
        newMainContent += '        ' + bottomNavBlock.outerHTML + '\n';
    }

    newMainContent += '    ';

    // Replace the main content
    const newHtml = html.substring(0, mainStart) + newMainContent + html.substring(mainEnd);

    // Write converted file
    fs.writeFileSync(filePath, newHtml);

    return { skipped: false };
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────

function main() {
    console.log('=== Year Page Conversion Script ===\n');

    const files = fs.readdirSync(YEAR_DIR)
        .filter(f => f.endsWith('.html'))
        .filter(f => !SKIP_FILES.has(f))
        .sort();

    console.log(`Found ${files.length} HTML files to process\n`);

    for (const file of files) {
        const filePath = path.join(YEAR_DIR, file);

        try {
            const result = convertFile(filePath);
            if (result.skipped) {
                stats.skipped++;
                console.log(`  SKIP  ${file} - ${result.reason}`);
            } else {
                stats.converted++;
                console.log(`  OK    ${file}`);
            }
        } catch (err) {
            stats.errors.push({ file, reason: err.message });
            console.log(`  ERROR ${file} - ${err.message}`);
        }
    }

    console.log('\n=== Summary ===');
    console.log(`Converted: ${stats.converted}`);
    console.log(`Skipped:   ${stats.skipped}`);

    if (stats.errors.length > 0) {
        console.log('\nErrors:');
        for (const { file, reason } of stats.errors) {
            console.log(`  - ${file}: ${reason}`);
        }
    }

    console.log('\nDone!');
}

main();
