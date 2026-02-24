# Stamp Description Page Conversion Guide

> Learned from converting `description/stamps/india_1997.html`
> All changes are CSS-only via `css/pages/content.css`. No content modifications allowed per CLAUDE.md.

---

## 1. HTML Head Replacement

### Old head structure:
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "...">
<html lang="en"><head>
<title>...</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<link rel="stylesheet" type="text/css" href="../../main.css" media="all">
<link rel="stylesheet" type="text/css" href="../../colorschemes/colorscheme3/colorscheme.css" media="all">
<link rel="stylesheet" type="text/css" href="../../style.css" media="all">
<script type="text/javascript" src="../../live_tinc.js"></script>
```

### New head structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="...">  <!-- KEEP ORIGINAL -->
    <meta name="description" content="...">  <!-- KEEP ORIGINAL -->
    <meta name="author" content="Michael Kogan">
    <title>...</title>  <!-- KEEP ORIGINAL -->
    <link rel="shortcut icon" href="../../images/others/paleophilatelie.ico">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" href="../../css/pages/content.css">
    <link rel="stylesheet" href="../../components/header/header.css">
    <link rel="stylesheet" href="../../components/footer/footer.css">

    <!-- Google Analytics (KEEP ORIGINAL) -->
    ...

    <!-- Google Ads Activation (KEEP ORIGINAL but remove <amp-ad> block from head) -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4596122187608197"
    crossorigin="anonymous"></script>
</head>
```

**Key changes:**
- Replace old CSS imports (main.css, colorscheme.css, style.css) with new ones (css/main.css, css/pages/content.css, components/header/header.css, components/footer/footer.css)
- Remove `live_tinc.js` and `script.js`
- Remove the `<amp-ad>` block from `<head>` (the one with `data-auto-format="mcrspv"`)
- Keep Google Analytics and Google Ads activation script
- Add Google Fonts preconnect and import

---

## 2. Body Wrapper Structure

### Old body:
```html
<body>
<!-- Old inline header HTML with navigation, search, translate widget, etc. -->
<div id="container">
    ... page content ...
</div>
<!-- Old inline footer HTML -->
</body>
```

### New body:
```html
<body>
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Header Component (loaded dynamically) -->
    <div id="header-placeholder"></div>

    <main id="main-content" class="content-page">
        <div class="container">

            ... page content (UNCHANGED) ...

        </div>
    </main>

    <!-- Footer Component (loaded dynamically) -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="../../scripts/component-loader.js"></script>
    <script src="../../scripts/main.js"></script>
    <script src="../../components/header/header.js"></script>
    <script src="../../components/footer/footer.js"></script>
    <script src="../../components/gallery/gallery.js"></script>
    <script src="../../scripts/products-lightbox.js"></script>
</body>
```

**Key changes:**
- Remove ALL old header/footer HTML (everything before and after `<div id="container">`)
- Replace with `#header-placeholder` and `#footer-placeholder` divs
- Wrap content in `<main id="main-content" class="content-page"><div class="container">`
- Add scripts at bottom: component-loader.js, main.js, header.js, footer.js, gallery.js, products-lightbox.js
- Add skip link for accessibility

---

## 3. CSS Classes to Add (HTML changes)

These classes must be added to specific tables. **Only add class attributes — never change content.**

### Navigation tables (prev / back to index / next):
```html
<!-- OLD -->
<table align="center" border="0" cellpadding="3" cellspacing="0" width="100%">

<!-- NEW: Add class="stamp-nav" -->
<table class="stamp-nav" width="100%">
```
- There are typically TWO of these: one at the top, one at the bottom
- The `align`, `border`, `cellpadding`, `cellspacing` attributes can be removed since CSS handles it, but keeping them is also fine

### Technical details card:
```html
<!-- OLD -->
<table align="right" border="1" cellpadding="3" cellspacing="4" width="50%" style="...">

<!-- NEW: Add class="stamp-details-card", change border to "0", remove cellpadding/cellspacing -->
<table class="stamp-details-card" align="right" border="0" cellpadding="0" cellspacing="0" width="50%">
```
- Keep `align="right"` and `width="50%"` as fallbacks
- Change `border="1"` to `border="0"` so the CSS `table[border="1"]` rules don't apply (the card has its own styling)

### Products gallery table:
```html
<!-- OLD -->
<table>
    <tbody style="text-align: center;">

<!-- NEW: Add class="products-gallery" -->
<table class="products-gallery">
    <tbody style="text-align: center;">
```

---

## 4. Critical CSS Fixes & Learnings

All styling is in `css/pages/content.css`. These are the key issues encountered and solutions:

### 4.1 Float Layout — Text Wrapping Around Images

**Problem:** `base.css` sets `table { width: 100% }` and `img { max-width: 100%; display: block }` which breaks legacy float patterns where `table[align="right"] width="200px"` wraps text around images.

**Solution:** Three CSS rules work together:
```css
/* 1. Table shrinks to match image width */
.content-page table[align="right"] { width: min-content; }
.content-page table[align="left"]  { width: min-content; }

/* 2. Images keep their HTML width (prevent shrink during min-content calc) */
.content-page table[align="right"] img,
.content-page table[align="left"] img  { max-width: none; }

/* 3. Remove td borders/padding from base.css */
.content-page table[align="right"] td,
.content-page table[align="left"] td  { border-bottom: none; padding: 0; }
```

### 4.2 Consecutive `<br>` Tags

**Problem:** Legacy HTML uses multiple `<br>` tags for spacing. New `line-height: 1.75` makes each `<br>` much taller.

**Solution:**
```css
.content-page br + br {
    display: block;
    content: '';
    margin: 0;
    line-height: 0;
    font-size: 0;
    height: 0.375rem;
}
```

### 4.3 Products Gallery — Google Ads Height Issue

**Problem:** `<ins class="adsbygoogle" style="display:inline-block;width:300px;height:300px">` forces the table row to 300px even when ads don't load, creating huge gaps between images and captions.

**Solution:** Multiple approaches combined:
```css
/* Hide ads elements completely */
.content-page table.products-gallery ins,
.content-page table.products-gallery .adsbygoogle,
.content-page table.products-gallery amp-ad {
    display: none !important;
    position: absolute !important;
    height: 0 !important; width: 0 !important;
}

/* Collapse the 3rd column (ads) */
.content-page table.products-gallery td:nth-child(3) {
    width: 0 !important; max-width: 0 !important;
    padding: 0 !important; overflow: hidden;
}
```

### 4.4 Products Gallery — Image-Caption Vertical Gap

**Problem:** Even after hiding ads, gap persists between images and their caption text below.

**Solution:** Use `border-collapse: collapse` (zero row spacing) + `vertical-align: bottom` + inline-level elements:
```css
.content-page table.products-gallery {
    border-collapse: collapse;  /* NOT separate — zero vertical gap */
}
.content-page table.products-gallery td {
    vertical-align: bottom !important;
}
/* <a> must be inline (NOT block) so td vertical-align can push it down */
.content-page table.products-gallery a:has(img) {
    display: inline;
    line-height: 0;
}
/* Images inline-block + vertical-align:bottom kills descender gap */
.content-page table.products-gallery img {
    display: inline-block;
    vertical-align: bottom;
}
```

### 4.5 Products Gallery — Black Background with Horizontal Gaps

**Problem:** `border-collapse: collapse` removes ALL spacing. Need horizontal gaps between image cells but zero vertical gap.

**Solution:** Use padding + `background-clip: content-box`:
```css
.content-page table.products-gallery td:has(a > img) {
    background: #000 !important;
    background-clip: content-box !important;  /* Background only inside padding */
    padding: 0 0.5rem !important;             /* Horizontal padding = visible gap */
    border-radius: 0.5rem;
}
```

### 4.6 Stamp Details Card — Prevent base.css Interference

The `.stamp-details-card` class needs explicit overrides to prevent `table[border="1"]` rules from applying:
- Change `border="1"` to `border="0"` in the HTML
- Override tr backgrounds, hover states, td:first-child styles
- Reset `<small>` font-size to `1em` (otherwise caption styles from `table[align] small` bleed in)

### 4.8 Standalone Image + Caption — Match Caption Width to Image

**Problem:** A common legacy pattern is a large `<img align="center">` followed by `<br>` tags and a `<small><em>` caption as loose siblings. The caption spans the full container width instead of matching the image, and the `<br>` tags create excessive vertical gap between image and caption.

**Solution:** Wrap the image `<a>` and caption in a `<figure class="inline-image-caption">`, with the caption inside a `<figcaption>`. Remove the `<br>` tags between them.

**Before:**
```html
<a href="..."><img align="center" width="950px" src="..." alt="..."></a>
<br>
 <small><em>Caption text here...</em></small>
<br>
```

**After:**
```html
<figure class="inline-image-caption">
<a href="..."><img align="center" width="950px" src="..." alt="..."></a>
<figcaption><small><em>Caption text here...</em></small></figcaption>
</figure>
```

**CSS:** Uses `display: table` + `display: table-caption` trick to shrink-wrap:
```css
/* Figure shrinks to image width */
.content-page figure.inline-image-caption {
    display: table;
    margin: 1rem auto;
    padding: 0;
}

/* Remove extra margin from align="center" since figure handles centering */
.content-page figure.inline-image-caption img[align="center"] {
    margin: 0;
}

/* Caption constrained to exact image width via table-caption */
.content-page figure.inline-image-caption figcaption {
    display: table-caption;
    caption-side: bottom;
    margin-top: 0.375rem;
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #57534e);
}
```

**Why `display: table` + `table-caption`?**
- `display: table` on the figure makes it shrink-wrap to the width of its content (the image)
- `display: table-caption; caption-side: bottom` on the figcaption forces it to match the table's (figure's) computed width exactly — the text wraps within the image boundaries
- This is a well-supported CSS technique that works across all modern browsers

**When to use:** Any standalone image with a descriptive caption below it that isn't already inside a layout table. Look for the pattern: `<img>` followed by `<br>` then `<small><em>` caption text.

### 4.7 Hero Section — Image + Table Side by Side

**Problem:** With 1200px container, the stamp image looks too small next to the 50% table.

**Solution:**
```css
/* Image scales to fill available space beside the table */
.content-page table.stamp-details-card ~ center {
    text-align: left;       /* Top-aligns image with table */
    margin-bottom: 0;
}
.content-page table.stamp-details-card ~ center img {
    width: calc(50% - 2rem);
    max-width: calc(50% - 2rem);
}
```

---

## 5. Elements to Remove from Old HTML

1. **Entire old header** — everything from `<body>` to the start of page content (includes nav, search box, Google Translate widget, landscape warning, etc.)
2. **Entire old footer** — everything after page content to `</body>`
3. **Old CSS links** — `main.css`, `colorscheme.css`, `style.css` (old paths)
4. **Old scripts** — `live_tinc.js`, `script.js`
5. **`<amp-ad>` block in `<head>`** — the auto-format responsive ad
6. **`<amp-ad>` custom element script** — `amp-ad-0.1.js`
7. **"Back to Top" button and related scripts**
8. **FreeFind search box HTML**
9. **Google Translate widget**

---

## 6. Elements to KEEP Unchanged

- ALL text content, descriptions, data
- ALL image `src` paths (even if files don't exist locally)
- ALL `alt` and `title` attributes on images
- ALL links (`href` values)
- ALL Google Ads `<ins>` blocks within the page body (CSS hides them when not loaded)
- ALL `<amp-ad>` elements within the page body
- Google Analytics tracking code
- Google Ads activation `<script>` in head

---

## 7. Navigation Button Design

The stamp-nav tables get styled as pill buttons:
- Uppercase text, 500 weight, 0.8125rem
- Border: 1px solid gray-300, border-radius: 0.25rem
- Hover: black border + golden-yellow (#f4c542) background
- Separator lines above/below the nav bar
- Equal-width columns (33.33%)

---

## 8. References & Acknowledgements Design

Both headings get:
- Uppercase, 1.125rem, 600 weight
- Golden-yellow bottom border (2px solid #f4c542)
- `display: block; width: fit-content` (for Acknowledgements, so text starts on next line)

---

## 9. Products Gallery Lightbox

The "Products and associated philatelic items" section uses a `table.products-gallery` with clickable images (FDCs, covers, postmarks). These open in a full-featured lightbox instead of navigating to the raw image.

### How it works

Two scripts power this (both must be included on stamp pages):

1. **`components/gallery/gallery.js`** — Full lightbox component with:
   - Prev/next navigation arrows (looping)
   - Thumbnail strip at bottom
   - Keyboard support (Escape, Arrow keys, Home, End)
   - Touch/swipe support on mobile
   - Image counter (e.g., "3 / 8")
   - Caption display
   - Loading spinner with image preloading
   - Public API: `window.Gallery.openWith(images, startIndex)`

2. **`scripts/products-lightbox.js`** — Lightweight script that:
   - Scans `.products-gallery` tables for image links
   - Parses the table structure to extract proper captions (see below)
   - Intercepts clicks → prevents default → calls `Gallery.openWith()`
   - Adds `cursor: zoom-in` hint to image links

**CSS**: `gallery.css` is already loaded via `main.css` (line 19: `@import '../components/gallery/gallery.css'`), so no extra CSS link is needed.

### Caption extraction from table structure

The products-gallery has a complex table layout with title rows, image rows, caption rows, and spacer rows. The `products-lightbox.js` script parses this structure to build proper captions for each image:

**Row classification:**
- **Spacer row**: Single cell with inline `height` style — resets title context
- **Image row**: Contains `<a><img></a>` — collects images and maps them to columns
- **Caption row**: Contains `<small>` with non-empty text (after an image row) — appends to image titles
- **Title row**: Everything else (text before images) — sets the section title per column

**Colspan expansion for titles:**
A title like `<td colspan="2">FDC with commemorative postmark</td>` is expanded to cover columns 1 and 2. Each image in the row below gets the title from its matching column position.

**Caption composition:**
- Section title from the title row above (mapped by column with colspan expansion)
- Individual caption from `<small><em>` row below (appended with em-dash separator)
- Fallback to `img.title` or `img.alt` if no table title is found

**Example result for India 1951:**
| Image | Caption |
|-------|---------|
| 1 | The commemorative postmark of the Indian Geological Survey |
| 2 | FDC with commemorative postmark |
| 3 | FDC with commemorative postmark |
| 4 | FDC with regular postmark — Produced by Bombay Philatelic Company |
| 5 | FDC with regular postmark — Produced by Novelties Company |
| 6 | FDC with regular postmark — Produced by the Philatelic Club of Ahmedabad |
| 7 | Example of Circulated Covers |
| 8 | Example of Circulated Covers — The letter was cancelled with "Experimental P.O."... |

### Key implementation details

- **Double-init guard**: Both `gallery.js` (`eventsAttached` flag) and `products-lightbox.js` (`initialized` flag) prevent duplicate event listeners when `init()` is called twice (DOMContentLoaded + `componentsLoaded` event).
- **Image load error fallback**: `gallery.js`'s `loadImage()` clears the previous image immediately (`imgEl.src = ''`) before loading the next one, and falls back to the thumbnail if the full-size image 404s. This prevents stale images from lingering.
- **Scope**: Only images inside `.products-gallery` tables are intercepted. Other images on the page (inline article images, main stamp image) still navigate normally to the full-size file.
- **No content changes**: The script reads the existing HTML structure. No classes, attributes, or content need to be added to the table itself (only `class="products-gallery"` on the table element, which is already part of the conversion).

---

## 10. Depth-Relative Paths

Stamp pages at `description/stamps/xxx.html` use `../../` prefix for all paths:
- CSS: `../../css/main.css`
- Components: `../../components/header/header.css`
- Scripts: `../../scripts/component-loader.js`
- Images: `../../images/...`

Pages in subdirectories (e.g., `description/stamps/others/`) use `../../../` prefix.

---

## 11. Conversion Checklist

- [ ] Replace `<!DOCTYPE>` and `<head>` section
- [ ] Remove old header HTML, add `#header-placeholder`
- [ ] Remove old footer HTML, add `#footer-placeholder`
- [ ] Wrap content in `<main class="content-page"><div class="container">`
- [ ] Add skip link
- [ ] Add scripts at bottom (component-loader, main, header, footer, gallery, products-lightbox)
- [ ] Add `class="stamp-nav"` to prev/next navigation tables (top and bottom)
- [ ] Add `class="stamp-details-card"` to technical details table, change `border="1"` to `border="0"`
- [ ] Add `class="products-gallery"` to products/philatelic items table
- [ ] Verify all image paths are UNCHANGED
- [ ] Wrap standalone image+caption pairs in `<figure class="inline-image-caption">` (see 4.8)
- [ ] Verify all text content is UNCHANGED
- [ ] Test in browser — check float wrapping, image sizes, gallery layout
- [ ] Test products gallery lightbox — click images, verify prev/next navigation, captions, and thumbnails
