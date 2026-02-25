# Year Page Conversion Guide

> Learned from converting `year/2025.html`
> CSS changes are in `css/pages/year.css`. No content modifications per CLAUDE.md.

---

## 1. Problem: base.css Breaks Legacy HTML Patterns

Year pages mix modern BEM-styled sections (stamp-entry cards, TOC sidebar, ack-box) with legacy HTML patterns (float tables, `<center>` tags, inline images with captions). The global `base.css` rules break these legacy patterns:

| base.css rule | Effect on legacy HTML |
|---|---|
| `table { width: 100% }` | Float tables expand to full width instead of shrinking to image |
| `img { display: block }` | Images lose inline flow; `<center>` text-align stops working |
| `td { border-bottom: 1px solid }` | Layout tables get unwanted borders |
| `td { padding: var(--space-3) }` | Float table cells get unwanted padding |

## 2. Solution: Year-Main Scoped Overrides

All legacy HTML lives inside `.year-main` (the main content column in the sidebar+main layout). CSS fixes are scoped there to avoid affecting properly-styled components.

### 2.1 Base Overrides

```css
.year-main table { width: auto; max-width: 100%; }
.year-main img { display: inline; }
.year-main td { border-bottom: none; }
.year-main a:has(img) { text-decoration: none; }
```

### 2.2 Float Tables — Respect HTML Width Attributes

```css
.year-main table[align="right"] {
    float: right;
    margin: 0.5rem 0 1rem 1.5rem;
    max-width: 55%;
}
.year-main table[align="right"] td { padding: 0; border-bottom: none; }
.year-main table[align="right"] img { max-width: 100%; height: auto; }
.year-main table[align="right"] small {
    display: block;
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #57534e);
}
```

**Why NOT `width: min-content`?** (previous approach, replaced)
- `width: min-content` overrides the HTML `width="500px"` attribute, causing unpredictable table sizing
- Tables with multi-row layouts (e.g., EUROPA notes with a 500px banner + two stamp images below) calculate min-content differently than the intended HTML width
- This made the Notes section layout appear "random" — text and images not positioned correctly

**Correct approach:**
- Do NOT set `width` at all — let the HTML `width` attribute take effect (base.css `width: 100%` is already overridden by `.year-main table { width: auto }`)
- Use `max-width: 55%` to cap the float table so text always has room to wrap beside it
- Use `max-width: 100%; height: auto` on images so they scale down within the table but respect their HTML dimensions when there's space

### 2.3 Centered Large Images

```css
.year-main center { text-align: center; display: block; }
.year-main center img { display: inline-block; max-width: 100%; height: auto; }
```

The `display: inline-block` on `<img>` is needed so `text-align: center` on `<center>` can center it (block-level elements ignore text-align).

### 2.4 Consecutive `<br>` Collapse

Same technique as content.css — collapse extra `<br>` tags to a small fixed height:
```css
.year-main br + br { height: 0.375rem; line-height: 0; font-size: 0; }
```

### 2.5 Float Clearing

Each section's container clears its own floats so they don't leak into the next section:
```css
.year-main .year-content-section .container::after {
    content: ''; display: table; clear: both;
}
```

### 2.6 Mobile Responsive

At 768px and below, float tables unfloat and go full-width:
```css
@media (max-width: 768px) {
    .year-main table[align="right"],
    .year-main table[align="left"] {
        float: none;
        width: 100%;
        max-width: 100%;
    }
    .year-main table[align="right"] img,
    .year-main table[align="left"] img {
        max-width: 100%;
    }
}
```

## 3. Why .year-main Scope Is Safe

- **Stamp-entry cards** use flex containers (`.stamp-entry__image { display: flex }`), so `img { display: inline }` gets overridden by flex item blockification
- **BEM-styled sections** (fb-promo, year-nav, ack-box) don't use legacy `table[align]` or `<center>` patterns, so the fixes don't affect them
- **The sidebar** (`.year-sidebar`) is a sibling of `.year-main`, so it's unaffected

## 4. Legacy HTML Patterns Found in Year Pages

| Pattern | Location in 2025.html | CSS Fix |
|---|---|---|
| `table align="right" width="500px"` with image | Announcements (awards), EUROPA notes | Float table fix (2.2) |
| `table align="right" width="300px"` with Facebook img | References section | Float table fix (2.2) |
| `<center><img width="950px">` | Kyrgyzstan banner, France stamps | Centered image fix (2.3) |
| `<table width="950px">` with book images | Books section | Base override `width: auto; max-width: 100%` |
| Multiple `<br>` tags between paragraphs | Throughout notes text | br collapse (2.4) |

## 5. TOC List Items with Mixed Content (Link + Plain Text)

Some `<li>` items in the TOC have both `<a>` links and plain text, e.g.:
```html
<li><a href="#official">Official stamps</a> related to Paleontology and Paleoanthropology</li>
<li>Some <a href="#pers">personalized stamps</a> related to Paleontology and Paleoanthropology</li>
```

**Problem:** If font-size/font-family is set only on `.year-toc__list a` (with `display: block`), the non-linked text inherits a larger default size from the parent, making mixed-content items look inconsistent.

**Fix:** Move font styling (`font-family`, `font-size`, `color`, `padding`, `border-left`) to `.year-toc__list li` instead. The `<a>` should NOT have `display: block` — keep it inline so mixed content flows naturally.

```css
.year-toc__list li {
    margin-bottom: 0.25rem;
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--hp-text-light);
    padding: 0.375rem 0.75rem;
    border-left: 3px solid transparent;
    border-radius: 0 4px 4px 0;
}
.year-toc__list a {
    color: var(--hp-text-light);
    text-decoration: none;
    transition: color 0.15s ease;
}
```

## 6. Yellow Underline on All Text Links

All clickable text links in `.year-main` should have a consistent yellow underline. Instead of adding it to every specific selector, use a general rule:

```css
.year-main a {
    color: var(--hp-black);
    text-decoration: underline;
    text-decoration-color: var(--hp-yellow);
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
    transition: all 0.2s ease;
}
.year-main a:hover { color: var(--hp-yellow-dark); }
.year-main a:has(img) { text-decoration: none; }  /* exclude image links */
```

**Safe because:**
- Image links are excluded by `a:has(img)`
- Button-style nav links (`.year-prev-next a`, `.bottom-nav a`) already have `text-decoration: none` with higher specificity
- TOC links are outside `.year-main` (in `.year-sidebar`)
- Links with inline `style="color:white"` keep their color (inline > class), yellow underline still applies
- Existing specific selectors (`.year-note a`, `.stamp-entry__header a`, etc.) already had yellow underlines, so the general rule is just a consistent fallback

## 7. "Undesired" Stamps Section Placement

The "Paleontology related stamps of countries who issue too many stamps per year..." disclaimer and its stamp grid (e.g., Togo) belong **inside** the Official stamps section, placed between the stamps grid and the Kyrgyzstan ad banner — NOT as a separate `<section>` after the Notes.

**Correct order inside the Official stamps section container:**
1. `<h2>` section title
2. `<div class="stamps-grid">` — official stamp entries
3. **Undesired disclaimer `<p>` + its own `<div class="stamps-grid">`** (e.g., Togo)
4. Kyrgyzstan ad banner (`<center>`)
5. Notes (`<strong>Notes:</strong>` + [1], [2], [3]...)

**Full disclaimer text (do not truncate):**
```html
<p><strong>Paleontology related stamps of countries who issue too many stamps per year,
stamps with prehistoric animals or their fossils without any relation to the issuing country
or stamps with inaccurate reconstruction of prehistoric animals.</strong><br>
<em>These stamps are not recommended for serious collectors and are
<a href="../legend.html#unrec">Undesired</a> at serious philatelic exhibits.</em></p>
```

## 8. Key Difference from Stamp Page (content.css)

- Stamp pages use `<main class="content-page">` → content.css applies
- Year pages use `<main id="main-content">` (no `.content-page`) → need separate rules in year.css
- Year pages load both `content.css` and `year.css`, but the `.content-page` scoped rules don't match
- Year page image handling is scoped to `.year-main` instead of `.content-page`
