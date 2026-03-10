# 2025 Year Page — Conversion Knowledge

Reference page: `year/2025.html`
CSS: `css/pages/year.css` + shared components in `css/components/`

## Component Extraction Map

Reusable CSS was extracted from the monolithic `year.css` into shared component files loaded via `css/main.css`. Year pages still load `year.css` for page-specific styles.

| Component File | Classes Extracted | Lines |
|---|---|---|
| `css/components/stamp-cards.css` | `.stamps-section`, `.stamps-grid`, `.stamp-entry`, `.stamp-entry__header`, `.stamp-entry__image` + responsive | ~100 |
| `css/components/books-grid.css` | `.year-books-section`, `.year-books-grid`, `.year-book-card`, `.year-book-card img`, `.year-book-card__info` + responsive | ~86 |
| `css/components/prev-next-nav.css` | `.year-prev-next`, `.bottom-nav-section`, `.bottom-nav`, `.bottom-nav a`, `.bottom-nav__center` | ~89 |
| `css/components/callout-box.css` | `.ack-section`, `.ack-box`, `.year-announcement`, `.year-announcement__box`, `.year-announcement__title`, `.year-announcement__images` + responsive | ~119 |
| `css/components/content-section.css` | `.year-content-section`, `.year-content-section--compact`, `.year-content-section__title`, `.year-content-section__subtitle` + responsive | ~70 |

### What stays in `year.css` (~666 lines):
- Year Hero (`.year-hero`, `.year-subtitle`, `.year-note`)
- Year Nav Section container (`.year-nav-section`)
- Year Content Layout (`.year-content-layout`, `.year-sidebar`, `.year-main`)
- TOC Box + FAB Button + Popup (`.year-toc__*`, `.year-toc-fab`, `.year-toc-popup*`)
- Notes/Footnotes (`.year-notes`, `.year-notes__box`)
- FB Promo (`.year-fb-promo*`)
- Ad Banner (`.year-ad-banner`)
- Awards Banner (`.year-awards-banner`)
- All `.year-main` scoped legacy HTML overrides (float tables, center images, br collapse)
- Year-specific responsive adjustments

## CSS Changes Made During This Session

### 1. Stamps Grid
- 3-column grid at desktop, 2-col at 1024px, 1-col at 576px
- Cards: white bg, 1px border, 8px radius, hover lift + yellow border
- Image area: `300px × 300px` with `object-fit: contain` on cream background
- Header: warm-white bg with 3px yellow bottom border

### 2. Books Grid
- 4-column grid at desktop, 2-col at 1024px, 1-col at 576px
- Book images: `height: 280px` (200px on mobile ≤480px), `object-fit: contain`
- Info panel: 3px yellow top border, 0.875rem text

### 3. Section Padding (Reduced Gaps)
- `.year-content-section`: `1rem 0` base (was previously larger)
- `--compact` variant: `1.5rem 0`
- Responsive: `var(--space-5)` at 768px, `var(--space-4)` at 480px
- Year hero uses `var(--space-6)` for breathing room

### 4. Float Table Image Fixes
- Tables with `align="right"` or `align="left"` float with proper margins
- `border-collapse: collapse` to eliminate spacing between image rows and caption rows
- Images with explicit `height` attribute → `height: 280px; object-fit: contain` for equal sizing
- Colspan images (banners) → `height: auto; width: 100%`
- Spacer cells `td[style*="height"]` → `height: 4px !important`

### 5. Caption Spacing
- `<small>` in float tables: `padding-top: 0; padding-bottom: 0.5rem` — tight above, breathing room below
- `font-size: 0.8125rem`, `line-height: 1.3`, secondary text color

### 6. Centered Images
- `<center>` elements: `display: block` with `0.5rem` vertical margins
- Inner `img`: `display: inline-block` so `text-align: center` works
- `img + br`: `line-height: 0.25` to reduce gap after images

### 7. Consecutive `<br>` Collapse
- `br + br`: `height: 0.375rem`, `line-height: 0`, `font-size: 0` — prevents ballooning whitespace

### 8. Float Clearing
- `.year-main .year-content-section .container::after` clears floats

### 9. Mobile Unfloat
- At ≤768px: float tables become `float: none; width: 100%`
- Data tables get `overflow-x: auto` with minimum 500px inner width

## Rules for Consistent Spacing

| Element | Spacing |
|---|---|
| Content sections | `1rem 0` (reduced from default) |
| Content sections (compact) | `1.5rem 0` |
| Hero section | `var(--space-6) 0` (2rem) |
| Grid gap (stamps) | `0.75rem` |
| Grid gap (books) | `0.5rem` |
| Grid margin-bottom | `0.75rem` |
| Callout box padding | `2rem 2.25rem` (desktop), `1.5rem` (tablet), `1rem` (mobile) |
| Paragraph bottom margin | `0.5rem` (in `.year-main .container p`) |
| Float table margin (right) | `0.5rem 0 1rem 1.5rem` |
| Float table margin (left) | `0.5rem 1.5rem 1rem 0` |

## Image Sizing Rules

| Context | Rule |
|---|---|
| Stamp card images | `width: 300px; height: 300px; object-fit: contain` |
| Book card images | `height: 280px` (desktop) / `200px` (≤480px), `object-fit: contain` |
| Float table images (general) | `max-width: 100%; height: auto` |
| Float table images with `height` attr | `height: 280px; width: auto; object-fit: contain` |
| Float table colspan images | `height: auto; width: 100%` |
| Centered images | `max-width: 100%; height: auto; display: inline-block` |
| Announcement images | `max-width: 400px; height: auto` |
| Awards banner images | `max-width: 120px; height: auto` |

## Card-Style Image Grid Tables (Shared Pattern)

Image grid tables on stamp detail pages and country pages use a consistent "card box" pattern where each image cell becomes a card with hover effects. This avoids touching HTML — pure CSS via `:has()` selectors.

### How It Works
1. **Table**: `border-collapse: separate; border-spacing: 0.5rem` — enables border-radius on cells, adds breathing room
2. **Image cells** (`td:has(> a > img)`): cream background, 1px border, 8px radius, hover lift + shadow + yellow border
3. **Section headers** (`td[colspan]`): warm-white bg, 3px yellow bottom border, centered bold text
4. **img inside card cells**: border/bg/padding removed (card styling is on the td now)
5. **Fallback**: base `img` rule keeps card styling for browsers without `:has()` support

### Where Applied
| Page Type | CSS File | Selector Scope | Notes |
|---|---|---|---|
| Stamp detail pages | `content.css` | `.content-page table.products-gallery` | `td:has(> a > img)` for card cells |
| Country pages | `country.css` | `.country-main > table:not([align])` | `td:has(> a > img.slist)` for card cells |

### Section Header Variants
- **Colspan cells** (`td[colspan]`): full-width section divider with yellow accent bar
- **Inline text-align override**: `tr[style*="text-align"] small { text-align: inherit }` — lets long captions opt into left-align via HTML inline style

### Ad Cell Collapse
Both page types hide Google Ads cells with the same pattern:
```css
td:has(amp-ad), td:has(.adsbygoogle) {
    width: 0 !important; max-width: 0 !important;
    padding: 0 !important; overflow: hidden;
}
```

### Mobile Behavior
- **Stamp detail pages** (`≤768px`): cells become `display: block; width: 100%`, card cells get `max-width: 320px; margin: 0 auto`
- **Country pages** (`≤768px`): table becomes horizontally scrollable (`overflow-x: auto`)

## Quick Reference: Applying to Other Year Pages

### HTML Structure Required
```html
<main id="main-content">
  <section class="year-hero">...</section>
  <div class="year-nav-section container">
    <nav class="year-prev-next">...</nav>
  </div>
  <div class="year-content-layout container">
    <aside class="year-sidebar">
      <div class="year-toc__box">...</div>
    </aside>
    <div class="year-main">
      <section class="year-content-section" id="section-name">
        <div class="container">
          <h2 class="year-content-section__title">Title</h2>
          <!-- legacy HTML content here -->
        </div>
      </section>
      <!-- more sections... -->
    </div>
  </div>
  <section class="bottom-nav-section">
    <nav class="bottom-nav container">...</nav>
  </section>
</main>
```

### CSS Files to Include
```html
<link rel="stylesheet" href="../css/main.css">      <!-- loads components -->
<link rel="stylesheet" href="../css/pages/year.css"> <!-- year-specific -->
```

### Key base.css Overrides (in year.css, scoped to .year-main)
- `table { width: auto }` — prevents base.css `width: 100%` from stretching layout tables
- `img { display: inline }` — prevents base.css `display: block` from breaking inline images
- `td { border-bottom: none }` — removes base.css borders from layout table cells

### Cascade Order
1. `variables.css` — design tokens
2. `base.css` — resets (breaks legacy HTML)
3. Component CSS (`stamp-cards.css`, etc.) — loaded via `main.css`
4. `year.css` — year-specific overrides win the cascade
