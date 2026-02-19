/**
 * Bulk Convert Legacy Country Pages to Modern Design
 *
 * This script converts HTML 4.01 Transitional country pages to the modern
 * design system matching abkhazia.html. It preserves ALL inner content
 * verbatim and only replaces the outer wrapper (head, header, hero,
 * breadcrumb, nav, sidebar TOC, footer).
 *
 * Usage: node scripts/convert-country-pages.js
 */

const fs = require('fs');
const path = require('path');

const COUNTRY_DIR = path.join(__dirname, '..', 'country');

// Files to skip
const SKIP_FILES = new Set(['abkhazia.html']);
const SKIP_PREFIXES = ['index'];

// Stats
const stats = { converted: 0, skipped: 0, errors: [] };

// ─── TEMPLATE ────────────────────────────────────────────────────────────────

function buildTemplate(data) {
    const {
        title, description, keywords,
        countryName, subtitle,
        prevHref, prevName, nextHref, nextName,
        tocItems, mainContent
    } = data;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeAttr(description)}">
    <meta name="keywords" content="${escapeAttr(keywords)}">
    <meta name="author" content="Michael Kogan">
    <title>${escapeHtml(title)}</title>
    <link rel="shortcut icon" href="../images/others/paleophilatelie.ico">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/pages/homepage.css">
    <link rel="stylesheet" href="../css/pages/content.css">
    <link rel="stylesheet" href="../css/pages/country.css">
    <link rel="stylesheet" href="../components/header/header.css">
    <link rel="stylesheet" href="../components/footer/footer.css">
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38036920-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-38036920-2');
    </script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4596122187608197"
           crossorigin="anonymous"></script>
</head>
<body class="country-page">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div id="header-placeholder"></div>
    <main id="main-content">
        <section class="country-hero">
            <div class="container">
                <div class="country-hero__content">
                    <div class="country-hero__text">
                        <h1 class="country-hero__title">${countryName}</h1>
                        <p class="country-hero__subtitle">${subtitle}</p>
                    </div>
                </div>
            </div>
        </section>
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <div class="container">
                <ol class="breadcrumb__list">
                    <li class="breadcrumb__item"><a href="../index.html" class="breadcrumb__link">Home</a></li>
                    <li class="breadcrumb__item"><a href="../phil_catalogue_main.html" class="breadcrumb__link">Catalogue</a></li>
                    <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Country</a></li>
                    <li class="breadcrumb__item"><span class="breadcrumb__current">${countryName}</span></li>
                </ol>
            </div>
        </nav>
        <nav class="country-nav" aria-label="Country navigation">
            <div class="container">
                <ul class="country-nav__list">
                    <li class="country-nav__item country-nav__item--prev">
                        <a href="${prevHref}" class="country-nav__link country-nav__link--prev">${prevName}</a>
                    </li>
                    <li class="country-nav__item country-nav__item--current">
                        <a href="index.html" class="country-nav__current">Back to Index</a>
                    </li>
                    <li class="country-nav__item country-nav__item--next">
                        <a href="${nextHref}" class="country-nav__link country-nav__link--next">${nextName}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <div class="country-content">
                <aside class="country-sidebar">
                    <nav class="toc" aria-label="Table of contents">
                        <h2 class="toc__title">Contents</h2>
                        <ul class="toc__list">
${tocItems}
                        </ul>
                    </nav>
                </aside>
                <div class="country-main">
${mainContent}
                </div>
            </div>
        </div>
        <nav class="country-nav" aria-label="Country navigation">
            <div class="container">
                <ul class="country-nav__list">
                    <li class="country-nav__item country-nav__item--prev">
                        <a href="${prevHref}" class="country-nav__link country-nav__link--prev">${prevName}</a>
                    </li>
                    <li class="country-nav__item country-nav__item--current">
                        <a href="index.html" class="country-nav__current">Back to Index</a>
                    </li>
                    <li class="country-nav__item country-nav__item--next">
                        <a href="${nextHref}" class="country-nav__link country-nav__link--next">${nextName}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </main>
    <div id="footer-placeholder"></div>
    <script src="../scripts/component-loader.js"></script>
    <script src="../scripts/main.js"></script>
    <script src="../components/header/header.js"></script>
    <script src="../components/footer/footer.js"></script>
</body>
</html>
`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripHtml(str) {
    return str.replace(/<[^>]*>/g, '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function addLazyLoading(html) {
    // Add loading="lazy" to <img tags that don't already have it
    return html.replace(/<img\b(?![^>]*loading=)/gi, '<img loading="lazy"');
}

// ─── EXTRACTION FUNCTIONS ────────────────────────────────────────────────────

function extractMetadata(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/is);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is);
    const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/is);

    return {
        title: titleMatch ? titleMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : '',
        keywords: keywordsMatch ? keywordsMatch[1].trim() : ''
    };
}

function extractH1(html) {
    // Pattern 1: <h1><u>CountryName</u>...<em>subtitle</em></h1>
    let m = html.match(/<h1>\s*<u>([\s\S]*?)<\/u>[\s\S]*?<em>([\s\S]*?)<\/em>[\s\S]*?<\/h1>/i);
    if (m) {
        return {
            countryName: stripHtml(m[1]).trim(),
            subtitle: stripHtml(m[2]).trim()
        };
    }

    // Pattern 2: <h1>CountryName <br>...<em>subtitle</em></h1> (kyrgyzstan pattern, no <u>)
    m = html.match(/<h1>([\s\S]*?)<br[\s/]*>[\s\S]*?<em>([\s\S]*?)<\/em>[\s\S]*?<\/h1>/i);
    if (m) {
        let name = stripHtml(m[1]).trim();
        // Remove trailing <br> artifacts
        name = name.replace(/<br[\s/]*>/gi, '').trim();
        return {
            countryName: name,
            subtitle: stripHtml(m[2]).trim()
        };
    }

    return null;
}

function extractNavigation(html) {
    // Find the first <table width="100%"> after the H1 that contains prev/next navigation
    // Pattern: <a href="xxx.html">&lt;&lt; previous country</a>
    //          <a href="yyy.html">next country &gt;&gt;</a>
    const prevMatch = html.match(/<a\s+href=["'](.*?)["']>\s*&lt;&lt;\s*previous\s+country/i);
    const nextMatch = html.match(/<a\s+href=["'](.*?)["']>\s*next\s+country\s*&gt;&gt;/i);

    if (!prevMatch || !nextMatch) return null;

    // Extract country names from the filenames
    const prevHref = prevMatch[1];
    const nextHref = nextMatch[1];
    const prevName = hrefToName(prevHref);
    const nextName = hrefToName(nextHref);

    return { prevHref, prevName, nextHref, nextName };
}

function hrefToName(href) {
    // Convert filename like "south_africa.html" to "South Africa"
    const base = href.replace('.html', '');
    return base
        .split('_')
        .map(word => {
            // Handle special abbreviations
            if (word.toLowerCase() === 'gdr') return 'GDR';
            if (word.toLowerCase() === 'usa') return 'USA';
            if (word.toLowerCase() === 'ussr') return 'USSR';
            if (word.toLowerCase() === 'uk') return 'UK';
            if (word.toLowerCase() === 'uae') return 'UAE';
            if (word.toLowerCase() === 'bat') return 'BAT';
            if (word.toLowerCase() === 'fyr') return 'FYR';
            // Handle "of", "and", "the" in middle of name
            if (['of', 'and', 'the', 'de', 'du', 'el'].includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

function extractTOC(html) {
    // Find TOC section - two patterns:
    // Pattern 1: <big><strong>Contents:</strong></big> followed by <ul>
    // Pattern 2: <h2>Contents:</h2> followed by multiple <ul> and <h3> blocks

    let tocStartIdx = -1;
    let isH2Pattern = false;

    // Try Pattern 2 first (h2)
    const h2Match = html.match(/<h2>\s*Contents:\s*<\/h2>/i);
    if (h2Match) {
        tocStartIdx = h2Match.index + h2Match[0].length;
        isH2Pattern = true;
    }

    // Try Pattern 1 (<big><strong>Contents:</strong></big>)
    if (tocStartIdx === -1) {
        const bigMatch = html.match(/<big>\s*<strong>\s*Contents:\s*<\/strong>\s*<\/big>/i);
        if (bigMatch) {
            tocStartIdx = bigMatch.index + bigMatch[0].length;
        }
    }

    if (tocStartIdx === -1) {
        return { tocItems: '', tocEndIdx: -1 };
    }

    // For h2 pattern (germany, kyrgyzstan), the TOC spans multiple <ul> and <h3> blocks
    // until we hit the first <a name="..."> or <br><br><a name="
    // For simple pattern, it's just the single <ul>...</ul>

    if (isH2Pattern) {
        return extractH2TOC(html, tocStartIdx);
    } else {
        return extractSimpleTOC(html, tocStartIdx);
    }
}

function extractSimpleTOC(html, startIdx) {
    // Find the <ul>...</ul> after Contents:
    const afterTOC = html.substring(startIdx);
    const ulMatch = afterTOC.match(/<ul>([\s\S]*?)<\/ul>/i);

    if (!ulMatch) {
        return { tocItems: '', tocEndIdx: startIdx };
    }

    const tocEndIdx = startIdx + ulMatch.index + ulMatch[0].length;
    const ulContent = ulMatch[1];

    // Extract all <li> items
    const items = [];
    const liRegex = /<li>([\s\S]*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRegex.exec(ulContent)) !== null) {
        items.push(convertTocItem(liMatch[1]));
    }

    const tocItems = items.map(item => `                            ${item}`).join('\n');
    return { tocItems, tocEndIdx };
}

function extractH2TOC(html, startIdx) {
    // For the h2 pattern, TOC contains multiple <ul> blocks and <h3> headers
    // We need to find where the TOC ends - it ends at the first <a name="country">
    // or similar content anchor
    const afterTOC = html.substring(startIdx);

    // Find end: look for <a name="country"> or <br><br>\n<a name=
    const endMatch = afterTOC.match(/(?:<br\s*\/?>\s*)*<a\s+name=["']country["']/i);
    let tocEndIdx;
    if (endMatch) {
        tocEndIdx = startIdx + endMatch.index;
    } else {
        // Fallback: find last </ul> before main content
        tocEndIdx = startIdx + 500; // rough fallback
    }

    const tocBlock = html.substring(startIdx, tocEndIdx);

    // Extract all items: both <h3> headers and <li> items from <ul> blocks
    const items = [];

    // Process the block sequentially
    const h3Regex = /<h3>\s*([\s\S]*?)\s*<\/h3>/gi;
    const ulRegex = /<ul(?:\s[^>]*)?>([\s\S]*?)<\/ul>/gi;

    // Collect all h3 and ul with their positions
    const elements = [];
    let match;

    while ((match = h3Regex.exec(tocBlock)) !== null) {
        elements.push({ type: 'h3', content: match[1], index: match.index });
    }
    while ((match = ulRegex.exec(tocBlock)) !== null) {
        elements.push({ type: 'ul', content: match[1], index: match.index });
    }

    // Sort by position
    elements.sort((a, b) => a.index - b.index);

    for (const el of elements) {
        if (el.type === 'h3') {
            // Convert h3 to a toc item (it usually contains an <a href>)
            const linkMatch = el.content.match(/<a\s+href=["'](#[^"']+)["']\s*>([\s\S]*?)<\/a>/i);
            if (linkMatch) {
                const text = stripHtml(linkMatch[2]).trim();
                // Also include any text after the </a>
                const afterLink = el.content.substring(el.content.indexOf('</a>') + 4);
                const extraText = stripHtml(afterLink).trim();
                const fullText = extraText ? `${text} ${extraText}` : text;
                items.push(`<li class="toc__item toc__item--section"><a href="${linkMatch[1]}" class="toc__link">${fullText}</a></li>`);
            } else {
                const text = stripHtml(el.content).trim();
                if (text) {
                    items.push(`<li class="toc__item toc__item--section"><span class="toc__link">${text}</span></li>`);
                }
            }
        } else {
            // Extract <li> items from <ul>
            const liRegex2 = /<li>([\s\S]*?)<\/li>/gi;
            let liMatch;
            while ((liMatch = liRegex2.exec(el.content)) !== null) {
                items.push(convertTocItem(liMatch[1]));
            }
        }
    }

    const tocItems = items.map(item => `                            ${item}`).join('\n');
    return { tocItems, tocEndIdx };
}

function convertTocItem(liContent) {
    // Convert a TOC <li> inner content to modern format
    // The li may contain: <a href="#id">Text</a> extra text
    // Or just plain text

    const linkMatch = liContent.match(/<a\s+href=["'](#[^"']+)["']\s*>([\s\S]*?)<\/a>/i);
    if (linkMatch) {
        const href = linkMatch[1];
        const linkText = stripHtml(linkMatch[2]).trim();
        // Get any text after the </a>
        const afterIdx = liContent.indexOf('</a>') + 4;
        const afterText = stripHtml(liContent.substring(afterIdx)).trim();
        const fullText = afterText ? `${linkText} ${afterText}` : linkText;
        return `<li class="toc__item"><a href="${href}" class="toc__link">${fullText}</a></li>`;
    }

    // No link - just text
    const text = stripHtml(liContent).trim();
    return `<li class="toc__item"><span class="toc__link">${text}</span></li>`;
}

function extractMainContent(html) {
    // Main content starts at the first <a name="..."> anchor after the TOC
    // and ends at the second navigation table (bottom prev/next)

    // Find the TOC end first
    const { tocEndIdx } = extractTOC(html);

    let searchFrom;
    if (tocEndIdx > 0) {
        searchFrom = tocEndIdx;
    } else {
        // No TOC found, look for content start after the first nav table
        const navEnd = html.indexOf('</table>', html.indexOf('previous country'));
        searchFrom = navEnd > 0 ? navEnd + 8 : 0;
    }

    // Content starts right after the TOC, skipping only leading whitespace/br tags
    // (Some pages have tables or images between TOC and first anchor)
    const afterTOC = html.substring(searchFrom);
    const contentStartMatch = afterTOC.match(/^[\s]*(?:<br\s*\/?>[\s]*)*/i);
    let contentStartIdx = searchFrom;
    if (contentStartMatch) {
        contentStartIdx = searchFrom + contentStartMatch[0].length;
    }

    // Find the bottom navigation table
    // Strategy: find ALL <table width="100%"> occurrences, then check which ones
    // directly contain "previous country" (without nesting other tables)
    const tableStartPattern = /<table\s+width=["']100%["']\s*>/gi;
    let lastNavTableIdx = -1;
    let tableMatch;
    while ((tableMatch = tableStartPattern.exec(html)) !== null) {
        // From this <table>, find the matching </table> without nesting
        const tableStart = tableMatch.index;
        const afterTable = html.substring(tableStart + tableMatch[0].length);
        // Find the first </table> that isn't preceded by another <table
        let depth = 1;
        let pos = 0;
        while (depth > 0 && pos < afterTable.length) {
            const nextOpen = afterTable.indexOf('<table', pos);
            const nextClose = afterTable.indexOf('</table>', pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = nextOpen + 6;
            } else {
                depth--;
                if (depth === 0) {
                    const tableContent = afterTable.substring(0, nextClose);
                    if (/previous\s+country/i.test(tableContent)) {
                        lastNavTableIdx = tableStart;
                    }
                }
                pos = nextClose + 8;
            }
        }
    }

    let contentEndIdx;
    if (lastNavTableIdx >= 0) {
        contentEndIdx = lastNavTableIdx;
    } else {
        // Fallback: end at footer
        const footerMatch = html.match(/<!--Footer START-->/i);
        contentEndIdx = footerMatch ? footerMatch.index : html.length;
    }

    // Extract content between boundaries
    let content = html.substring(contentStartIdx, contentEndIdx).trim();

    // Clean up trailing <br> tags before the bottom nav
    content = content.replace(/(\s*<br\s*\/?>)+\s*$/i, '');

    // Add lazy loading to images
    content = addLazyLoading(content);

    return content;
}

// ─── MAIN CONVERSION ────────────────────────────────────────────────────────

function convertFile(filePath) {
    const filename = path.basename(filePath);
    const html = fs.readFileSync(filePath, 'utf-8');

    // Safety check: skip if already modern DOCTYPE
    if (html.trimStart().startsWith('<!DOCTYPE html>')) {
        return { skipped: true, reason: 'already modern DOCTYPE' };
    }

    // Extract all pieces
    const metadata = extractMetadata(html);
    if (!metadata.title) {
        return { skipped: true, reason: 'could not extract title' };
    }

    const h1Data = extractH1(html);
    if (!h1Data) {
        return { skipped: true, reason: 'could not extract H1/country name' };
    }

    const navData = extractNavigation(html);
    if (!navData) {
        return { skipped: true, reason: 'could not extract prev/next navigation' };
    }

    const { tocItems } = extractTOC(html);
    const mainContent = extractMainContent(html);

    if (!mainContent || mainContent.length < 50) {
        return { skipped: true, reason: 'main content too short or missing' };
    }

    // Build new HTML
    const newHtml = buildTemplate({
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        countryName: h1Data.countryName,
        subtitle: h1Data.subtitle,
        prevHref: navData.prevHref,
        prevName: navData.prevName,
        nextHref: navData.nextHref,
        nextName: navData.nextName,
        tocItems: tocItems,
        mainContent: mainContent
    });

    // Create backup
    fs.writeFileSync(filePath + '.bak', html);

    // Write converted file
    fs.writeFileSync(filePath, newHtml);

    return { skipped: false };
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────

function main() {
    console.log('=== Country Page Conversion Script ===\n');

    const files = fs.readdirSync(COUNTRY_DIR)
        .filter(f => f.endsWith('.html'))
        .filter(f => !SKIP_FILES.has(f))
        .filter(f => !SKIP_PREFIXES.some(prefix => f.startsWith(prefix)))
        .sort();

    console.log(`Found ${files.length} HTML files to process\n`);

    for (const file of files) {
        const filePath = path.join(COUNTRY_DIR, file);

        try {
            const result = convertFile(filePath);
            if (result.skipped) {
                stats.skipped++;
                stats.errors.push({ file, reason: result.reason });
                console.log(`  SKIP  ${file} - ${result.reason}`);
            } else {
                stats.converted++;
                console.log(`  OK    ${file}`);
            }
        } catch (err) {
            stats.skipped++;
            stats.errors.push({ file, reason: err.message });
            console.log(`  ERROR ${file} - ${err.message}`);
        }
    }

    console.log('\n=== Summary ===');
    console.log(`Converted: ${stats.converted}`);
    console.log(`Skipped:   ${stats.skipped}`);

    if (stats.errors.length > 0) {
        console.log('\nSkipped files:');
        for (const { file, reason } of stats.errors) {
            console.log(`  - ${file}: ${reason}`);
        }
    }

    console.log('\nBackup files created with .bak extension');
    console.log('Done!');
}

main();
