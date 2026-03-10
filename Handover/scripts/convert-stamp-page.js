#!/usr/bin/env node
/**
 * Stamp Description Page Converter
 *
 * Converts old-style stamp description pages to the new design.
 * Handles: head replacement, header/footer removal, content wrapping,
 *          Facebook image removal, breadcrumb generation.
 *
 * Usage:
 *   node convert-stamp-page.js <file-or-directory>
 *   node convert-stamp-page.js --dry-run <file-or-directory>
 *   node convert-stamp-page.js description/stamps/india_1997.html
 *   node convert-stamp-page.js description/stamps/
 *
 * Reference: description/stamps/india_1951.html (already converted)
 */

const fs = require('fs');
const path = require('path');

// ===== Configuration =====

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

const DRY_RUN = process.argv.includes('--dry-run');
const args = process.argv.filter(a => a !== '--dry-run').slice(2);

if (args.length === 0) {
    console.log('Usage: node convert-stamp-page.js [--dry-run] <file-or-directory>');
    console.log('');
    console.log('Examples:');
    console.log('  node convert-stamp-page.js description/stamps/india_1997.html');
    console.log('  node convert-stamp-page.js description/stamps/');
    console.log('  node convert-stamp-page.js --dry-run description/stamps/india_1997.html');
    process.exit(1);
}

// ===== Main =====

const target = path.resolve(PROJECT_ROOT, args[0]);

if (fs.statSync(target).isDirectory()) {
    const files = findHtmlFiles(target);
    console.log(`Found ${files.length} HTML files in ${target}`);
    let converted = 0, skipped = 0, errors = 0;
    for (const file of files) {
        try {
            if (isAlreadyConverted(file)) {
                skipped++;
                continue;
            }
            convertFile(file);
            converted++;
        } catch (err) {
            console.error(`  ERROR: ${path.relative(PROJECT_ROOT, file)}: ${err.message}`);
            errors++;
        }
    }
    console.log(`\nDone. Converted: ${converted}, Skipped (already converted): ${skipped}, Errors: ${errors}`);
} else {
    if (isAlreadyConverted(target)) {
        console.log(`Skipping (already converted): ${path.relative(PROJECT_ROOT, target)}`);
    } else {
        convertFile(target);
    }
}

// ===== Functions =====

function findHtmlFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Skip hidden dirs and reference dirs
            if (!entry.name.startsWith('.')) {
                results.push(...findHtmlFiles(fullPath));
            }
        } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
            results.push(fullPath);
        }
    }
    return results;
}

function isAlreadyConverted(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Check for new CSS imports (sign of conversion)
    return content.includes('css/main.css') && content.includes('component-loader.js');
}

function convertFile(filePath) {
    const relPath = path.relative(PROJECT_ROOT, filePath);
    console.log(`  Converting: ${relPath}`);

    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Extract metadata from old head
    const title = extractBetween(html, '<title>', '</title>') || 'Paleophilatelie.eu';
    const keywords = extractMetaContent(html, 'keywords') || '';
    const description = extractMetaContent(html, 'description') || '';

    // 2. Determine path prefix based on depth from project root
    const relDir = path.relative(PROJECT_ROOT, path.dirname(filePath));
    const depth = relDir.split(path.sep).filter(Boolean).length;
    const prefix = '../'.repeat(depth);

    // 3. Extract page content (between old header and old footer)
    let content = extractPageContent(html);

    // 4. Remove Facebook image table
    content = removeFacebookTable(content);

    // 5. Generate breadcrumb
    const breadcrumb = generateBreadcrumb(title, prefix, relDir);

    // 6. Build new HTML
    const newHtml = buildNewHtml({
        title, keywords, description, prefix, breadcrumb, content
    });

    // 7. Write or preview
    if (DRY_RUN) {
        console.log(`    [DRY RUN] Would write ${newHtml.length} chars to ${relPath}`);
        console.log(`    Title: ${title}`);
        console.log(`    Breadcrumb: ${breadcrumb}`);
    } else {
        fs.writeFileSync(filePath, newHtml, 'utf8');
        console.log(`    Written: ${relPath} (${newHtml.length} chars)`);
    }
}

function extractBetween(html, startTag, endTag) {
    const startIdx = html.indexOf(startTag);
    if (startIdx === -1) return null;
    const contentStart = startIdx + startTag.length;
    const endIdx = html.indexOf(endTag, contentStart);
    if (endIdx === -1) return null;
    return html.substring(contentStart, endIdx).trim();
}

function extractMetaContent(html, name) {
    // Match <meta name="keywords" content="..."> in various formats
    const regex = new RegExp(
        '<meta\\s+name=["\']' + name + '["\']\\s+content=["\']([^"\']*)["\']',
        'i'
    );
    let match = html.match(regex);
    if (match) return match[1];

    // Try reverse order: content before name
    const regex2 = new RegExp(
        '<meta\\s+content=["\']([^"\']*)["\']\\s+name=["\']' + name + '["\']',
        'i'
    );
    match = html.match(regex2);
    if (match) return match[1];

    // Try multiline content attribute
    const regex3 = new RegExp(
        '<meta\\s+name=["\']' + name + '["\']\\s+content=["\']([\\s\\S]*?)["\']',
        'i'
    );
    match = html.match(regex3);
    if (match) return match[1].replace(/\s+/g, ' ').trim();

    return null;
}

function extractPageContent(html) {
    // Strategy: Find content between old header end and old footer start
    //
    // Content start markers (try in order):
    //   1. <a name="top"> — most reliable
    //   2. First <center><h1> after the header
    //   3. First <table...width="100%"> after the header (nav table)
    //
    // Content end markers (try in order):
    //   1. <!-- Bottom Menue START -->
    //   2. <div><ul id="main_nav_list"> (bottom nav)
    //   3. <!--Footer START-->
    //   4. <div id="footer">

    let contentStart = -1;
    let contentEnd = -1;

    // Find content start
    // Look for <a name="top"> as the primary marker
    const topAnchorMatch = html.match(/<a\s+name\s*=\s*"top"\s*>/i);
    if (topAnchorMatch) {
        contentStart = topAnchorMatch.index;
    } else {
        // Fallback: find the end of the old header area
        // The old header ends after the search/translate table area
        // Look for the closing of sub_nav_container divs
        const bodyMatch = html.match(/<body[^>]*>/i);
        if (bodyMatch) {
            const bodyEnd = bodyMatch.index + bodyMatch[0].length;
            // Find the first <center> or <h1> after body that's likely content
            const centerH1 = html.indexOf('<center>', bodyEnd);
            const h1Tag = html.indexOf('<h1>', bodyEnd);
            if (centerH1 !== -1 && (h1Tag === -1 || centerH1 < h1Tag)) {
                // But we need to skip past the header — look for it well after body
                // Find after the header navigation ends (look for </ul>\n</div> pattern repeated)
                const navEnd = html.indexOf('</div>\n</div>', bodyEnd + 200);
                if (navEnd !== -1) {
                    const firstCenter = html.indexOf('<center>', navEnd);
                    const firstH1 = html.indexOf('<h1>', navEnd);
                    contentStart = Math.min(
                        firstCenter !== -1 ? firstCenter : Infinity,
                        firstH1 !== -1 ? firstH1 : Infinity
                    );
                    if (contentStart === Infinity) contentStart = -1;
                }
            }
        }
    }

    // Find content end
    const bottomMenuMarkers = [
        '<!-- Bottom Menue START -->',
        '<!-- Bottom Menue START-->',
        '<!-- Bottom Menu START -->',
        '<!-- Bottom Menu START-->',
    ];
    for (const marker of bottomMenuMarkers) {
        const idx = html.indexOf(marker);
        if (idx !== -1) {
            contentEnd = idx;
            break;
        }
    }

    if (contentEnd === -1) {
        // Fallback: look for bottom nav list
        const bottomNavMatch = html.match(/<div>\s*\n?\s*<ul\s+id="main_nav_list">/i);
        if (bottomNavMatch) {
            contentEnd = bottomNavMatch.index;
        }
    }

    if (contentEnd === -1) {
        // Fallback: look for footer
        const footerMarkers = ['<!--Footer START-->', '<!-- Footer START -->', '<div id="footer">'];
        for (const marker of footerMarkers) {
            const idx = html.indexOf(marker);
            if (idx !== -1) {
                contentEnd = idx;
                break;
            }
        }
    }

    if (contentStart === -1 || contentEnd === -1) {
        throw new Error('Could not identify content boundaries. Manual conversion needed.');
    }

    // Extract and clean the content
    let content = html.substring(contentStart, contentEnd);

    // Remove trailing <br> tags and whitespace
    content = content.replace(/(\s*<br\s*\/?>\s*)+$/i, '');

    return content;
}

function removeFacebookTable(content) {
    // Remove the Facebook image table block.
    // We cannot use a simple regex like /<table[^>]*>[\s\S]*?facebook\.jpg[\s\S]*?<\/table>/
    // because [\s\S]*? will match across nested tables, potentially removing huge chunks.
    //
    // Instead, find "facebook.jpg", then search backward for the nearest <table and
    // forward for the nearest </table> to remove only the innermost table.

    const fbIndex = content.indexOf('facebook.jpg');
    if (fbIndex === -1) return content; // No Facebook image found

    // Search backward for the nearest <table
    const beforeFb = content.substring(0, fbIndex);
    const tableStartIdx = beforeFb.lastIndexOf('<table');
    if (tableStartIdx === -1) return content;

    // Search forward for the nearest </table> after facebook.jpg
    const afterFb = content.indexOf('</table>', fbIndex);
    if (afterFb === -1) return content;

    const tableEndIdx = afterFb + '</table>'.length;

    // Remove the table and any surrounding whitespace/newlines
    const before = content.substring(0, tableStartIdx).replace(/\s+$/, '\n');
    const after = content.substring(tableEndIdx).replace(/^\s+/, '\n');

    return before + after;
}

function generateBreadcrumb(title, prefix, relDir) {
    // Extract meaningful breadcrumb from the title
    // Title format: "Paleophilatelie.eu - India 1951 - Centeray of Geological Survey of India, postage stamp"
    // We want: "India 1951" or similar
    let pageLabel = title;

    // Remove common prefix
    pageLabel = pageLabel.replace(/^Paleophilatelie\.eu\s*[-–—]\s*/i, '');

    // Take first segment before second dash (country + year)
    const dashParts = pageLabel.split(/\s*[-–—]\s*/);
    if (dashParts.length > 1) {
        pageLabel = dashParts[0].trim();
    }

    // Keep it reasonable length
    if (pageLabel.length > 60) {
        pageLabel = pageLabel.substring(0, 57) + '...';
    }

    // Build breadcrumb path based on directory
    // description/stamps/ → Home > Catalogue > Description > Official Stamps > {PageTitle}
    // description/letters/ → Home > Catalogue > Description > Letters > {PageTitle}
    // description/pm/ → Home > Catalogue > Description > Postmarks > {PageTitle}
    // description/covers/ → Home > Catalogue > Description > Covers > {PageTitle}

    const parts = [`Home::${prefix}index.html`];
    parts.push(`Catalogue::${prefix}phil_catalogue_main.html`);

    const normalizedDir = relDir.replace(/\\/g, '/');
    if (normalizedDir.startsWith('description/stamps')) {
        parts.push(`Description::${prefix}description/index.html`);
        if (normalizedDir.includes('stamps/others') || normalizedDir.includes('stamps/personalized')) {
            parts.push(`Stamps::${prefix}description/stamps/index.html`);
        }
    } else if (normalizedDir.startsWith('description/letters')) {
        parts.push(`Letters::${prefix}description/letters/index.html`);
    } else if (normalizedDir.startsWith('description/pm')) {
        parts.push(`Postmarks::${prefix}description/pm/index.html`);
    } else if (normalizedDir.startsWith('description/covers')) {
        parts.push(`Covers::${prefix}description/covers/index.html`);
    } else {
        parts.push(`Description::${prefix}description/index.html`);
    }

    parts.push(pageLabel); // Current page (no URL)

    return parts.join('|');
}

function buildNewHtml({ title, keywords, description, prefix, breadcrumb, content }) {
    // Indent content by 8 spaces (inside <main><div class="container">)
    const indentedContent = content.split('\n')
        .map(line => line) // Keep original indentation
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="${escapeAttr(keywords)}">
    <meta name="description" content="${escapeAttr(description)}">
    <meta name="author" content="Michael Kogan">
    <title>${escapeHtml(title)}</title>
    <link rel="shortcut icon" href="${prefix}images/others/paleophilatelie.ico">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="${prefix}css/main.css">
    <link rel="stylesheet" href="${prefix}css/pages/content.css">
    <link rel="stylesheet" href="${prefix}components/header/header.css">
    <link rel="stylesheet" href="${prefix}components/footer/footer.css">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38036920-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-38036920-2');
    </script>

    <!-- Google Ads Activation -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4596122187608197"
    crossorigin="anonymous"></script>
</head>
<body>
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Header Component (loaded dynamically) -->
    <div id="header-placeholder" data-breadcrumb="${escapeAttr(breadcrumb)}"></div>

    <main id="main-content" class="content-page">
        <div class="container">

${indentedContent}

        </div>
    </main>

    <!-- Footer Component (loaded dynamically) -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="${prefix}scripts/component-loader.js"></script>
    <script src="${prefix}scripts/main.js"></script>
    <script src="${prefix}components/header/header.js"></script>
    <script src="${prefix}components/footer/footer.js"></script>
    <script src="${prefix}components/gallery/gallery.js"></script>
    <script src="${prefix}scripts/products-lightbox.js"></script>
</body>
</html>
`;
}

function escapeHtml(str) {
    return str.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');
}

function escapeAttr(str) {
    return str.replace(/"/g, '&quot;');
}
