# Paleophilatelie Website Redesign — Handover Documentation

## Project Overview

This project modernized the Paleophilatelie.eu website's design and CSS architecture while preserving 100% of the original content (text, links, images, alt text). All changes are CSS/layout/structural only.

---

## What Was Changed

### 1. Global Header & Footer (All Pages)

**Before:** Each page had ~100 lines of hardcoded header HTML (navigation, search box, Google Translate, "Back to Top" button, footer with last-update text).

**After:** A single `component-loader.js` dynamically injects the header and footer at runtime. Pages only need:
```html
<div id="header-placeholder"></div>
<!-- page content -->
<div id="footer-placeholder"></div>
<script src="scripts/component-loader.js"></script>
```

**Key files:**
- `scripts/component-loader.js` — Contains header & footer HTML templates, breadcrumb builder, nav highlighting rules
- `components/header/header.css` — Header styles (black bar, toolbar, mobile hamburger)
- `components/footer/footer.css` — Footer styles (6-column grid, social links, badges)
- `components/header/header.js` — Mobile menu toggle, dropdown behavior
- `components/footer/footer.js` — Back-to-top button, copyright year
- `scripts/main.js` — Sticky toolbar, nav highlighting, search overlay

### 2. CSS Architecture (New)

**Before:** 3 monolithic CSS files (`main.css`, `colorscheme.css`, `style.css`).

**After:** Modular system:

```
css/
├── main.css              ← Entry point (imports base + variables + components)
├── base.css              ← Global resets, typography, grid, utilities
├── variables.css         ← Design tokens (colors, fonts, spacing, shadows)
├── components/           ← Shared reusable component styles
│   ├── stamp-cards.css   ← .stamps-grid, .stamp-entry (3→2→1 col)
│   ├── books-grid.css    ← .year-books-grid, .year-book-card (4→2→1 col)
│   ├── prev-next-nav.css ← .year-prev-next, .bottom-nav
│   ├── callout-box.css   ← .ack-section, .ack-box, .year-announcement
│   └── content-section.css ← .year-content-section, alternating bg
└── pages/                ← Page-type-specific styles
    ├── homepage.css      ← Homepage editorial design
    ├── content.css       ← Stamp description pages
    ├── country.css       ← Country pages
    ├── year.css          ← Year/chronology pages
    ├── sitemap.css       ← Sitemap page
    └── (others...)       ← Various supporting page styles
```

### 3. Design Language

- **Color palette:** Black/White/Golden Yellow (#f4c542) — museum editorial style
- **Typography:** Crimson Pro (serif headings) + DM Sans (sans-serif body)
- **Cards:** White background, 1px border, 8px radius, hover lift with yellow accent
- **Links:** Golden underline accent (#d4a72c) with hover darkening
- **Responsive:** Mobile-first breakpoints at 480px, 576px, 768px, 1024px

### 4. HTML Modernization (Per Page)

Each converted page received these structural changes (content untouched):

| Change | Old | New |
|--------|-----|-----|
| DOCTYPE | `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">` | `<!DOCTYPE html>` |
| Charset | `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">` | `<meta charset="UTF-8">` |
| CSS imports | `main.css`, `colorscheme.css`, `style.css` | `css/main.css` + page-specific CSS |
| Fonts | Roboto (or none) | Crimson Pro + DM Sans via Google Fonts |
| Header | ~100 lines inline HTML | `<div id="header-placeholder">` |
| Footer | ~30 lines inline HTML | `<div id="footer-placeholder">` |
| Content wrapper | `<div id="container">` | `<main id="main-content" class="content-page">` |
| Accessibility | None | Skip link, aria-labels, breadcrumbs |
| Scripts removed | `live_tinc.js`, `script.js`, inline `myFunction()`, `<amp-ad>` in head | N/A |
| Scripts added | N/A | `component-loader.js`, `main.js`, `header.js`, `footer.js` |

### 5. Facebook Image — Moved to Footer

The Facebook group image (`images/others/facebook.jpg`) was previously embedded in the References section of every stamp/year page. It is now in the global footer (via `component-loader.js`), visible on ALL pages. The old `<table>` block referencing `facebook.jpg` should be removed from individual pages during conversion.

---

## Pages Already Converted

### Fully Styled (Use as Design Reference)

| Page | File | CSS | Notes |
|------|------|-----|-------|
| Homepage | `index.html` | `css/pages/homepage.css` | Museum editorial design, 10+ sections |
| Year 2025 | `year/2025.html` | `css/pages/year.css` | TOC sidebar, stamps grid, books grid, floating TOC button |
| India (country) | `country/india.html` | `css/pages/country.css` | Hero, sidebar, stamp gallery, floating TOC |
| India 1951 (stamp) | `description/stamps/india_1951.html` | `css/pages/content.css` | Breadcrumb, details card, products gallery lightbox |
| Legend | `legend.html` | `css/pages/content.css` | Simple informational page |
| Sitemap | `sitemap.html` | `css/pages/sitemap.css` | Search, collapsible sections, quick nav cards |
| About | `about.html` | `css/pages/content.css` | Simple content page |

### Partially Styled (Head/Footer Updated)

- `about_website.html`, `about_how-to-help.html`, `awards.html`, `contact.html`
- `links.html`, `links_forums.html`, `links_paleo.html`, `links_postal_resources.html`
- `news.html`, `news_archive.html`, `milestones.html`
- Various article pages in `articles/`

---

## Pages Needing Conversion

### High Volume (Use Conversion Scripts)

| Page Type | Count | Directory | Script |
|-----------|-------|-----------|--------|
| Stamp descriptions | ~590 | `description/stamps/`, `description/stamps2/`, `description/letters/`, `description/pm/`, `description/covers/` + subdirs | `convert-stamp-page.js` |
| Country pages | ~232 | `country/` | Manual (complex layout restructure) |
| Year pages | ~40 | `year/` | Manual (needs TOC sidebar, sections) |
| Root pages | ~15 | Root directory | `convert-generic-page.js` |

---

## How to Use Conversion Scripts

See `Handover/CONVERSION-GUIDE.md` for detailed instructions.

### Quick Start

```bash
# Convert a single stamp page
node Handover/scripts/convert-stamp-page.js description/stamps/india_1997.html

# Convert all stamp pages in a directory
node Handover/scripts/convert-stamp-page.js description/stamps/

# Convert a root-level page
node Handover/scripts/convert-generic-page.js awards.html

# Dry run (preview without writing)
node Handover/scripts/convert-stamp-page.js --dry-run description/stamps/india_1997.html
```

### After Running Scripts

The scripts handle ~80% of the conversion. Manual steps still needed:

1. **Add table classes** (stamp pages):
   - `class="stamp-nav"` on prev/back/next navigation tables
   - `class="stamp-details-card"` on technical details table (change `border="1"` to `border="0"`)
   - `class="products-gallery"` on products/philatelic items table

2. **Wrap standalone image+caption pairs** in `<figure class="inline-image-caption">` (see CONVERSION-GUIDE.md Section 7)

3. **Verify breadcrumb** data-attribute on `#header-placeholder` is correct

4. **Test in browser** — check float wrapping, image sizes, gallery layout, lightbox

---

## Architecture Notes

### Critical: Header/Footer Source

The live header/footer HTML is in `scripts/component-loader.js` (NOT in `components/header/header.html`). The HTML files in `components/` are reference copies only. Always edit `component-loader.js` for header/footer changes.

### CSS Cascade Order

```
1. css/variables.css     ← Design tokens
2. css/base.css          ← Resets (BREAKS legacy HTML — see below)
3. css/components/*.css  ← Shared components (loaded via main.css @import)
4. css/pages/*.css       ← Page-specific overrides (loaded via <link> tag — wins cascade)
```

### base.css Legacy HTML Breakage

`base.css` sets aggressive defaults that break old HTML patterns:

| Rule | Problem | Fix (in page CSS) |
|------|---------|-------------------|
| `table { width: 100% }` | Float tables expand to full width | `.scope table { width: auto }` |
| `img { display: block }` | Images lose inline flow, `<center>` centering breaks | `.scope img { display: inline }` |
| `td { border-bottom: 1px solid }` | Layout tables get visible borders | `.scope td { border-bottom: none }` |

These overrides are already in `content.css`, `country.css`, and `year.css` — scoped to `.content-page`, `.country-main`, and `.year-main` respectively.

### Breadcrumb System

Breadcrumbs are rendered inside the header toolbar via `data-breadcrumb` attribute:
```html
<div id="header-placeholder" data-breadcrumb="Home::../../index.html|Catalogue::../../phil_catalogue_main.html|India 1951"></div>
```

Format: `Label::URL|Label::URL|...|CurrentPageLabel` (last item has no URL = current page).

### Products Gallery Lightbox

Stamp description pages include `gallery.js` + `products-lightbox.js` which intercept clicks on images in `.products-gallery` tables and open them in a full lightbox with prev/next navigation, thumbnails, and captions.

---

## File Inventory

### New Files Created

```
css/main.css                    ← CSS entry point
css/base.css                    ← Global resets & utilities
css/variables.css               ← Design tokens
css/components/stamp-cards.css  ← Stamp card grid component
css/components/books-grid.css   ← Book card grid component
css/components/prev-next-nav.css ← Prev/next navigation component
css/components/callout-box.css  ← Callout/announcement component
css/components/content-section.css ← Content section component
css/pages/homepage.css          ← Homepage styles
css/pages/content.css           ← Stamp description page styles
css/pages/country.css           ← Country page styles
css/pages/year.css              ← Year page styles
css/pages/sitemap.css           ← Sitemap page styles
css/pages/country-index.css     ← Country index page
css/pages/stamps-index.css      ← Stamps index page
scripts/component-loader.js     ← Dynamic header/footer loader
scripts/main.js                 ← Sticky toolbar, nav highlighting
scripts/products-lightbox.js    ← Products gallery lightbox integration
components/header/header.css    ← Header component styles
components/header/header.js     ← Header interaction (mobile menu, dropdowns)
components/footer/footer.css    ← Footer component styles
components/footer/footer.js     ← Footer interaction (back-to-top)
components/gallery/gallery.js   ← Full-featured image lightbox
components/gallery/gallery.css  ← Lightbox styles
```

### Old Files No Longer Needed (Can Be Archived)

```
main.css (old root-level)       ← Replaced by css/main.css
style.css                       ← Replaced by page-specific CSS
colorschemes/                   ← Replaced by css/variables.css
live_tinc.js                    ← Removed (legacy tracking)
script.js (old root-level)      ← Replaced by scripts/main.js
```

---

## Contact

For questions about this conversion, refer to:
- `.claude/conversionKnowledge/` — Detailed conversion guides per page type
- `Handover/CONVERSION-GUIDE.md` — Step-by-step conversion instructions
- Reference implementations: `index.html`, `year/2025.html`, `country/india.html`, `description/stamps/india_1951.html`
