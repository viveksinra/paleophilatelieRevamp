/**
 * Breadcrumb-to-Navbar Migration Script
 *
 * Migrates standalone <nav class="breadcrumb"> blocks into the
 * data-breadcrumb attribute on #header-placeholder, so the
 * component-loader.js renders them inside the navbar toolbar.
 *
 * Usage:
 *   node scripts/migrate-breadcrumbs.js            # dry-run (preview)
 *   node scripts/migrate-breadcrumbs.js --apply     # write changes
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = !process.argv.includes('--apply');

// Directories to scan
const SCAN_DIRS = [
    path.join(ROOT, 'country'),
    path.join(ROOT, 'year'),
    path.join(ROOT, 'description', 'stamps'),
    path.join(ROOT, 'description', 'stamps2'),
];

// Collect all .html files from the scan directories (non-recursive for country/year,
// non-recursive for description/stamps and description/stamps2)
function collectHtmlFiles() {
    const files = [];
    for (const dir of SCAN_DIRS) {
        if (!fs.existsSync(dir)) {
            console.warn(`[WARN] Directory not found: ${dir}`);
            continue;
        }
        for (const entry of fs.readdirSync(dir)) {
            if (entry.toLowerCase().endsWith('.html')) {
                files.push(path.join(dir, entry));
            }
        }
    }
    return files;
}

/**
 * Parse breadcrumb items from the <nav class="breadcrumb"> block.
 * Returns an array of { label, url? } objects, or null if no breadcrumb found.
 */
function parseBreadcrumbItems(navBlock) {
    const items = [];

    // Match <a ... class="breadcrumb__link">Label</a>
    const linkRe = /<a\s[^>]*class="breadcrumb__link"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    // Match <span class="breadcrumb__current">Label</span>
    const currentRe = /<span\s[^>]*class="breadcrumb__current"[^>]*>([\s\S]*?)<\/span>/gi;

    // We need to find all <li> items in order
    const liRe = /<li\s[^>]*class="breadcrumb__item"[^>]*>([\s\S]*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRe.exec(navBlock)) !== null) {
        const liContent = liMatch[1];

        // Check if it contains a link
        const linkMatch = /<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i.exec(liContent);
        if (linkMatch) {
            items.push({ label: linkMatch[2].trim(), url: linkMatch[1] });
            continue;
        }

        // Check if it contains a current span
        const spanMatch = /<span[^>]*>([\s\S]*?)<\/span>/i.exec(liContent);
        if (spanMatch) {
            items.push({ label: spanMatch[1].trim() });
            continue;
        }
    }

    return items.length > 0 ? items : null;
}

/**
 * Build the data-breadcrumb attribute value from parsed items.
 * Format: Label::URL|Label::URL|CurrentLabel
 */
function buildDataBreadcrumb(items) {
    return items.map(item => {
        if (item.url) {
            return `${item.label}::${item.url}`;
        }
        return item.label;
    }).join('|');
}

/**
 * HTML-encode characters that could break the attribute value.
 * The labels and URLs from the original HTML should already be safe,
 * but let's be defensive about double quotes and ampersands.
 */
function escapeAttr(value) {
    // Don't re-encode existing &amp; etc. — just handle raw quotes
    return value.replace(/"/g, '&quot;');
}

/**
 * Process a single HTML file.
 * Returns { changed: boolean, breadcrumbValue: string|null, error: string|null }
 */
function processFile(filePath) {
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
    let html = fs.readFileSync(filePath, 'utf-8');

    // Skip files that already have data-breadcrumb
    if (/data-breadcrumb\s*=/.test(html)) {
        return { changed: false, skipped: 'already has data-breadcrumb', relPath };
    }

    // Find the <nav class="breadcrumb"...>...</nav> block
    // Allow optional aria-label and other attributes
    const navRe = /[ \t]*<nav\s+class="breadcrumb"[^>]*>[\s\S]*?<\/nav>\s*/;
    const navMatch = navRe.exec(html);

    if (!navMatch) {
        return { changed: false, skipped: 'no breadcrumb nav found', relPath };
    }

    const navBlock = navMatch[0];

    // Parse breadcrumb items
    const items = parseBreadcrumbItems(navBlock);
    if (!items || items.length === 0) {
        return { changed: false, error: 'breadcrumb nav found but could not parse items', relPath };
    }

    const dataValue = escapeAttr(buildDataBreadcrumb(items));

    // Replace header-placeholder: add data-breadcrumb attribute
    const placeholderRe = /<div\s+id="header-placeholder"\s*><\/div>/;
    if (!placeholderRe.test(html)) {
        return { changed: false, error: 'could not find <div id="header-placeholder"></div>', relPath };
    }

    html = html.replace(
        placeholderRe,
        `<div id="header-placeholder" data-breadcrumb="${dataValue}"></div>`
    );

    // Remove the entire <nav class="breadcrumb"...>...</nav> block
    // Also remove the <!-- Breadcrumb --> comment if it appears right before
    const commentAndNavRe = /[ \t]*(?:<!--\s*Breadcrumb\s*-->\s*)?<nav\s+class="breadcrumb"[^>]*>[\s\S]*?<\/nav>\s*/;
    html = html.replace(commentAndNavRe, '\n');

    if (!DRY_RUN) {
        fs.writeFileSync(filePath, html, 'utf-8');
    }

    return { changed: true, breadcrumbValue: dataValue, relPath };
}

// Main
function main() {
    console.log(`\n=== Breadcrumb Migration ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);

    const files = collectHtmlFiles();
    console.log(`Found ${files.length} HTML files to process.\n`);

    let changed = 0;
    let skipped = 0;
    let errors = 0;

    for (const filePath of files) {
        const result = processFile(filePath);

        if (result.error) {
            console.log(`[ERROR] ${result.relPath}: ${result.error}`);
            errors++;
        } else if (result.changed) {
            console.log(`[${DRY_RUN ? 'WOULD CHANGE' : 'CHANGED'}] ${result.relPath}`);
            console.log(`         data-breadcrumb="${result.breadcrumbValue}"`);
            changed++;
        } else {
            console.log(`[SKIP]  ${result.relPath}: ${result.skipped}`);
            skipped++;
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Changed: ${changed}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors:  ${errors}`);
    console.log(`Total:   ${files.length}`);

    if (DRY_RUN && changed > 0) {
        console.log(`\nRun with --apply to write changes.`);
    }
}

main();
