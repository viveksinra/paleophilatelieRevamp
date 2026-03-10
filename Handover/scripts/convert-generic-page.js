#!/usr/bin/env node
/**
 * Generic Page Converter
 *
 * Converts old-style root-level pages (about.html, awards.html, etc.)
 * to the new design. Handles head replacement, header/footer removal,
 * and content wrapping.
 *
 * Usage:
 *   node convert-generic-page.js <file-or-directory>
 *   node convert-generic-page.js --dry-run awards.html
 *   node convert-generic-page.js about.html
 *
 * Reference: about.html (already converted)
 */

const fs = require('fs');
const path = require('path');

// ===== Configuration =====

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

const DRY_RUN = process.argv.includes('--dry-run');
const args = process.argv.filter(a => a !== '--dry-run').slice(2);

if (args.length === 0) {
    console.log('Usage: node convert-generic-page.js [--dry-run] <file>');
    console.log('');
    console.log('For root-level pages like about.html, awards.html, contact.html, etc.');
    console.log('');
    console.log('Examples:');
    console.log('  node convert-generic-page.js awards.html');
    console.log('  node convert-generic-page.js --dry-run contact.html');
    process.exit(1);
}

// ===== Main =====

const target = path.resolve(PROJECT_ROOT, args[0]);

if (!fs.existsSync(target)) {
    console.error(`File not found: ${target}`);
    process.exit(1);
}

if (isAlreadyConverted(target)) {
    console.log(`Skipping (already converted): ${path.relative(PROJECT_ROOT, target)}`);
    process.exit(0);
}

convertFile(target);

// ===== Functions =====

function isAlreadyConverted(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('css/main.css') && content.includes('component-loader.js');
}

function convertFile(filePath) {
    const relPath = path.relative(PROJECT_ROOT, filePath);
    console.log(`Converting: ${relPath}`);

    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Extract metadata
    const title = extractBetween(html, '<title>', '</title>') || 'Paleophilatelie.eu';
    const keywords = extractMetaContent(html, 'keywords') || '';
    const description = extractMetaContent(html, 'description') || '';

    // 2. Determine path prefix
    const relDir = path.relative(PROJECT_ROOT, path.dirname(filePath));
    const depth = relDir ? relDir.split(path.sep).filter(Boolean).length : 0;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';

    // 3. Extract page content
    let content = extractPageContent(html);

    // 4. Remove Facebook image table
    content = removeFacebookTable(content);

    // 5. Build new HTML
    const newHtml = buildNewHtml({
        title, keywords, description, prefix, content
    });

    // 6. Write or preview
    if (DRY_RUN) {
        console.log(`  [DRY RUN] Would write ${newHtml.length} chars to ${relPath}`);
        console.log(`  Title: ${title}`);
    } else {
        fs.writeFileSync(filePath, newHtml, 'utf8');
        console.log(`  Written: ${relPath} (${newHtml.length} chars)`);
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
    const regex = new RegExp(
        '<meta\\s+name=["\']' + name + '["\']\\s+content=["\']([^"\']*)["\']',
        'i'
    );
    let match = html.match(regex);
    if (match) return match[1];

    const regex2 = new RegExp(
        '<meta\\s+content=["\']([^"\']*)["\']\\s+name=["\']' + name + '["\']',
        'i'
    );
    match = html.match(regex2);
    if (match) return match[1];

    const regex3 = new RegExp(
        '<meta\\s+name=["\']' + name + '["\']\\s+content=["\']([\\s\\S]*?)["\']',
        'i'
    );
    match = html.match(regex3);
    if (match) return match[1].replace(/\s+/g, ' ').trim();

    return null;
}

function extractPageContent(html) {
    let contentStart = -1;
    let contentEnd = -1;

    // Find content start — look for <a name="top"> or first <center>/<h1> after header
    const topAnchorMatch = html.match(/<a\s+name\s*=\s*"top"\s*>/i);
    if (topAnchorMatch) {
        contentStart = topAnchorMatch.index;
    }

    if (contentStart === -1) {
        // Look for end of old header navigation and start of actual content
        // The header typically ends with closing </div> tags after sub_nav
        // Look for the first <center>, <h1>, <h2>, or <p> after the header area
        const bodyMatch = html.match(/<body[^>]*>/i);
        if (bodyMatch) {
            const bodyEnd = bodyMatch.index + bodyMatch[0].length;
            // Skip past the navigation (look for repeated </div></div> blocks)
            // Find content after the header/nav section
            const headerEndPatterns = [
                '</div>\n</div>\n</div>',    // Common nested div closing
                '<!-- End Header -->',
                '<!-- Content Start -->',
            ];
            let afterHeader = bodyEnd + 400; // Skip at least 400 chars (past landscape div)

            for (const pattern of headerEndPatterns) {
                const idx = html.indexOf(pattern, bodyEnd);
                if (idx !== -1 && idx > afterHeader) {
                    afterHeader = idx + pattern.length;
                    break;
                }
            }

            // Find first content element after header area
            const contentPatterns = [
                { regex: /<center>/i },
                { regex: /<h1[^>]*>/i },
                { regex: /<h2[^>]*>/i },
                { regex: /<table[^>]*>/i },
            ];

            let earliest = Infinity;
            for (const { regex } of contentPatterns) {
                const remaining = html.substring(afterHeader);
                const match = remaining.match(regex);
                if (match) {
                    const pos = afterHeader + match.index;
                    if (pos < earliest) earliest = pos;
                }
            }
            if (earliest !== Infinity) {
                contentStart = earliest;
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
        const footerMarkers = ['<!--Footer START-->', '<!-- Footer START -->', '<div id="footer">'];
        for (const marker of footerMarkers) {
            const idx = html.indexOf(marker);
            if (idx !== -1) {
                contentEnd = idx;
                break;
            }
        }
    }

    if (contentEnd === -1) {
        // Last resort: find the closing </body>
        const bodyClose = html.indexOf('</body>');
        if (bodyClose !== -1) contentEnd = bodyClose;
    }

    if (contentStart === -1 || contentEnd === -1) {
        throw new Error('Could not identify content boundaries. Manual conversion needed.');
    }

    let content = html.substring(contentStart, contentEnd);
    content = content.replace(/(\s*<br\s*\/?>\s*)+$/i, '');

    return content;
}

function removeFacebookTable(content) {
    // Find "facebook.jpg", then remove the innermost table around it
    const fbIndex = content.indexOf('facebook.jpg');
    if (fbIndex === -1) return content;

    const beforeFb = content.substring(0, fbIndex);
    const tableStartIdx = beforeFb.lastIndexOf('<table');
    if (tableStartIdx === -1) return content;

    const afterFb = content.indexOf('</table>', fbIndex);
    if (afterFb === -1) return content;

    const tableEndIdx = afterFb + '</table>'.length;
    const before = content.substring(0, tableStartIdx).replace(/\s+$/, '\n');
    const after = content.substring(tableEndIdx).replace(/^\s+/, '\n');

    return before + after;
}

function buildNewHtml({ title, keywords, description, prefix, content }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeAttr(description)}">
    <meta name="keywords" content="${escapeAttr(keywords)}">
    <meta name="author" content="Michael Kogan">
    <title>${escapeHtml(title)}</title>
    <link rel="shortcut icon" href="${prefix}images/others/paleophilatelie.ico">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="${prefix}css/main.css">
    <link rel="stylesheet" href="${prefix}css/pages/homepage.css">
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
</head>
<body>
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Header Component (loaded dynamically) -->
    <div id="header-placeholder"></div>

    <main id="main-content">
        <section class="intro-section">
            <div class="container content-page">

${content}

            </div>
        </section>
    </main>

    <!-- Footer Component (loaded dynamically) -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="${prefix}scripts/component-loader.js"></script>
    <script src="${prefix}scripts/main.js"></script>
    <script src="${prefix}components/header/header.js"></script>
    <script src="${prefix}components/footer/footer.js"></script>
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
