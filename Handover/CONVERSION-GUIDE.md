# Page Conversion Guide

This guide explains how to convert remaining old pages to the new design. Use the automated scripts where possible, then apply manual fixes.

---

## Page Type Reference

| Page Type | Scope Class | CSS File | Body Class | Reference Page |
|-----------|-------------|----------|------------|----------------|
| Stamp description | `.content-page` | `css/pages/content.css` | (none) | `description/stamps/india_1951.html` |
| Country | `.country-main` | `css/pages/country.css` | `country-page` | `country/india.html` |
| Year | `.year-main` | `css/pages/year.css` | (none) | `year/2025.html` |
| Root/generic | `.content-page` or `intro-section` | `css/pages/content.css` | (none) | `about.html` |

---

## 1. Stamp Description Pages (Automated)

### Run the Script

```bash
# Single file
node Handover/scripts/convert-stamp-page.js description/stamps/india_1997.html

# Entire directory
node Handover/scripts/convert-stamp-page.js description/stamps/

# Preview without writing
node Handover/scripts/convert-stamp-page.js --dry-run description/stamps/india_1997.html
```

### What the Script Does

1. Replaces `<!DOCTYPE>` and entire `<head>` with modern HTML5 head
2. Preserves `<title>`, `<meta name="keywords">`, `<meta name="description">` content
3. Adds Google Fonts (Crimson Pro + DM Sans)
4. Links new CSS files (`css/main.css`, `css/pages/content.css`, `components/header/header.css`, `components/footer/footer.css`)
5. Keeps Google Analytics and Google Ads activation script
6. Removes old header HTML (everything from `<body>` to content start)
7. Removes old footer HTML (bottom menu, old footer div)
8. Adds `<div id="header-placeholder">` with breadcrumb data
9. Wraps content in `<main id="main-content" class="content-page"><div class="container">`
10. Adds footer placeholder and new scripts at bottom
11. Removes Facebook image table from References section
12. Adds skip link for accessibility

### Manual Steps After Script

#### A. Add Table Classes

Open the converted file and add these classes:

**Navigation tables** (prev / back to index / next) — there are usually TWO per page:
```html
<!-- Find tables like this -->
<table align="center" border="0" cellpadding="3" cellspacing="0" width="100%">
  <tr>
    <td style="text-align: left;"><a href="...">&lt;&lt; prev</a></td>
    <td style="text-align: center;"><a href="index.html">back to index</a></td>
    <td style="text-align: right;"><a href="...">next &gt;&gt;</a></td>
  </tr>
</table>

<!-- Add class="stamp-nav" -->
<table class="stamp-nav" width="100%">
```

**Technical details card** (right-floated table with stamp specs):
```html
<!-- Find table like this -->
<table align="right" border="1" cellpadding="3" cellspacing="4" width="50%" style="...">

<!-- Add class, change border to 0 -->
<table class="stamp-details-card" align="right" border="0" cellpadding="0" cellspacing="0" width="50%">
```

**Products gallery** (table with stamp/FDC/postmark images):
```html
<!-- Find table with centered image grid -->
<table>
  <tbody style="text-align: center;">

<!-- Add class="products-gallery" -->
<table class="products-gallery">
```

#### B. Wrap Image+Caption Pairs (Optional Enhancement)

Look for standalone images followed by `<br>` tags and `<small><em>` captions:

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

#### C. Verify Breadcrumb

Check the `data-breadcrumb` attribute on `#header-placeholder`. The script generates it from the page title, but verify:
- The country name matches
- The path separators are correct
- The current page label is meaningful

**Standard stamp page breadcrumb:**
```
Home::../../index.html|Catalogue::../../phil_catalogue_main.html|Description::../index.html|Official Stamps – Main Topics::./index.html|{PageTitle}
```

**For pages in subdirectories** (`description/stamps/others/`, `description/stamps/personalized/`):
```
Home::../../../index.html|Catalogue::../../../phil_catalogue_main.html|...
```

#### D. Test

1. Open in browser
2. Check float tables wrap text correctly
3. Check products gallery lightbox (click images)
4. Check breadcrumb links
5. Check mobile responsive layout

---

## 2. Root-Level Pages (Semi-Automated)

### Run the Script

```bash
node Handover/scripts/convert-generic-page.js awards.html
```

### What the Script Does

Same as stamp page script but:
- Uses root-level paths (no `../../` prefix)
- Uses `css/pages/content.css` and `css/pages/homepage.css`
- No breadcrumb data attribute
- Wraps content in `<main id="main-content"><section class="intro-section"><div class="container content-page">`

### Manual Steps

- Add any page-specific classes needed
- Verify layout in browser

---

## 3. Country Pages (Manual Conversion)

Country pages require significant layout restructuring and cannot be fully automated. Use `country/india.html` as the reference.

### Structure to Create

```html
<body class="country-page">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div id="header-placeholder" data-breadcrumb="Home::../index.html|Catalogue::../phil_catalogue_main.html|Country::index.html|{CountryName}"></div>

    <main id="main-content">
        <!-- Hero Section -->
        <section class="country-hero">
            <div class="container">
                <div class="country-hero__content">
                    <div class="country-hero__text">
                        <h1 class="country-hero__title">{CountryName}</h1>
                        <p class="country-hero__subtitle">{Extract from first paragraph}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Prev/Next Navigation -->
        <nav class="country-nav" aria-label="Country navigation">
            <div class="container">
                <ul class="country-nav__list">
                    <li class="country-nav__item country-nav__item--prev">
                        <a href="{prev}.html" class="country-nav__link country-nav__link--prev">{PrevCountry}</a>
                    </li>
                    <li class="country-nav__item country-nav__item--current">
                        <a href="index.html" class="country-nav__current">Back to Index</a>
                    </li>
                    <li class="country-nav__item country-nav__item--next">
                        <a href="{next}.html" class="country-nav__link country-nav__link--next">{NextCountry}</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Content Area with Sidebar -->
        <div class="container">
            <div class="country-content">
                <!-- Sidebar (TOC + Video) -->
                <aside class="country-sidebar">
                    <nav class="toc" aria-label="Table of contents">
                        <h2 class="toc__title">Contents</h2>
                        <ul class="toc__list">
                            <li class="toc__item"><a href="#section" class="toc__link">Section Name</a></li>
                            <!-- ... more items ... -->
                        </ul>
                    </nav>
                    <!-- Optional: YouTube embed -->
                    <div class="sidebar-video">...</div>
                </aside>

                <!-- Main Content -->
                <div class="country-main">
                    <!-- PASTE OLD PAGE CONTENT HERE -->
                    <!-- (everything between old header and old footer) -->
                </div>
            </div>
        </div>
    </main>

    <!-- Floating TOC Button (for mobile) -->
    <!-- Copy the FAB/popup HTML+JS from country/india.html lines 880-935 -->

    <div id="footer-placeholder"></div>
    <script src="../scripts/component-loader.js"></script>
    <script src="../scripts/main.js"></script>
    <script src="../components/header/header.js"></script>
    <script src="../components/footer/footer.js"></script>
</body>
```

### CSS Files to Include

```html
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/pages/homepage.css">
<link rel="stylesheet" href="../css/pages/content.css">
<link rel="stylesheet" href="../css/pages/country.css">
<link rel="stylesheet" href="../components/header/header.css">
<link rel="stylesheet" href="../components/footer/footer.css">
```

### Key Steps

1. Extract content from old page (between old header and old `<!-- Bottom Menue START -->`)
2. Build TOC from section headings (`<a name="...">` anchors in the old content)
3. Extract prev/next country links from old navigation
4. Paste content inside `.country-main`
5. Remove Facebook image table from content
6. Add floating TOC button HTML+JS (copy from `country/india.html`)
7. Test layout

---

## 4. Year Pages (Manual Conversion)

Year pages also need layout restructuring. Use `year/2025.html` as the reference.

### Structure to Create

```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div id="header-placeholder" data-breadcrumb="Home::../index.html|Catalogue::../phil_catalogue_main.html|Year::index.html|{Year}"></div>

    <main id="main-content">
        <!-- Hero -->
        <section class="year-hero">
            <div class="container">
                <h1><a name="top"></a>{Year}
                    <span>{Full description text}</span>
                </h1>
                <p class="year-subtitle">{Subtitle}</p>
                <p class="year-note">{Note about contributions}</p>
            </div>
        </section>

        <!-- Content with Sidebar -->
        <div class="container">
            <div class="year-content-layout">
                <!-- Sidebar: TOC -->
                <aside class="year-sidebar">
                    <nav class="year-toc__box" aria-label="Table of contents">
                        <div class="year-toc__title">Contents:</div>
                        <ul class="year-toc__list">
                            <li><a href="#section">Section Name</a></li>
                        </ul>
                    </nav>
                </aside>

                <!-- Main Content -->
                <div class="year-main">
                    <!-- Prev/Next Navigation (top) -->
                    <div class="year-nav-section">
                        <nav class="year-prev-next">
                            <a href="{prev}.html">&lt;&lt; {PrevYear}</a>
                            <a href="index.html">Year Overview</a>
                            <a href="{next}.html">{NextYear} &gt;&gt;</a>
                        </nav>
                    </div>

                    <!-- Content Sections -->
                    <section class="year-content-section" id="section-id">
                        <div class="container">
                            <h2 class="year-content-section__title">Section Title</h2>
                            <!-- OLD CONTENT HERE -->
                        </div>
                    </section>

                    <!-- More sections... -->

                    <!-- Bottom Navigation -->
                    <section class="bottom-nav-section">
                        <nav class="bottom-nav container">
                            <a href="{prev}.html">&lt;&lt; {PrevYear}</a>
                            <div class="bottom-nav__center">
                                <a href="index.html">Year Overview</a>
                            </div>
                            <a href="{next}.html">{NextYear} &gt;&gt;</a>
                        </nav>
                    </section>
                </div>
            </div>
        </div>
    </main>

    <!-- Floating TOC Button (copy from year/2025.html) -->
    <!-- Footer + Scripts -->
</body>
```

### CSS Files to Include

```html
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/pages/content.css">
<link rel="stylesheet" href="../css/pages/homepage.css">
<link rel="stylesheet" href="../css/pages/year.css">
<link rel="stylesheet" href="../components/header/header.css">
<link rel="stylesheet" href="../components/footer/footer.css">
```

### Key Steps

1. Extract content sections from old page
2. Wrap each section in `<section class="year-content-section" id="..."><div class="container">`
3. Build TOC sidebar from section headings
4. Add prev/next year navigation (top and bottom)
5. Wrap stamp entries in `.stamps-grid` > `.stamp-entry` cards (if using card layout)
6. Wrap book entries in `.year-books-grid` > `.year-book-card` cards (if applicable)
7. Remove Facebook image table
8. Add floating TOC button HTML+JS
9. Test layout

---

## 5. Elements to Remove from Every Old Page

1. **Entire old header** — from `<body>` through landscape suggestion div, `<div id="container">`, navigation lists, search box, Google Translate widget
2. **Old footer** — `<!-- Bottom Menue START -->` through `<!-- Footer END -->`, closing `</div>` wrappers
3. **Old CSS imports** — `main.css` (old path), `colorscheme.css`, `style.css`
4. **Old scripts** — `live_tinc.js`, `script.js` (old), `runActiveContent.js`
5. **`<amp-ad>` block in `<head>`** and `amp-ad-0.1.js` script
6. **Inline `<style>` block** with `.button` class
7. **Inline `<script>` block** with `myFunction()`
8. **Landscape suggestion div** (`#landscape-suggestion`)
9. **Facebook image table** in References section

---

## 6. Elements to KEEP Unchanged

- ALL text content, descriptions, data
- ALL image `src` paths (even if files don't exist locally)
- ALL `alt` and `title` attributes
- ALL links (`href` values)
- ALL Google Ads `<ins>` blocks within page body
- Google Analytics tracking code
- Google Ads activation `<script>` in head

---

## 7. Common Patterns Reference

### Float Table Fix (Already in CSS — No HTML Changes Needed)

CSS handles `table[align="right"]` and `table[align="left"]` automatically:
- Table gets `width: min-content` (stamp pages) or `width: auto` (year pages)
- Images get `max-width: none` to prevent shrinking
- `td` borders/padding from base.css are removed

### Consecutive `<br>` Tags (Already in CSS)

CSS collapses multiple `<br>` tags to small fixed spacing. No HTML changes needed.

### Centered Images (Already in CSS)

`<center>` tags with images work automatically. CSS sets `img { display: inline-block }` inside `<center>` elements.

### Products Gallery Card Styling (Already in CSS)

Products gallery tables with `class="products-gallery"` get card-styled image cells, hidden ad columns, and responsive stacking. Just add the class.

---

## 8. Testing Checklist

After converting any page:

- [ ] Page loads without errors in browser console
- [ ] Header appears with correct navigation highlighting
- [ ] Footer appears with all links working
- [ ] Breadcrumb shows correct path (if applicable)
- [ ] Float tables wrap text correctly (not full-width)
- [ ] Images display at proper sizes
- [ ] Products gallery lightbox works (stamp pages)
- [ ] Mobile layout is responsive (resize browser)
- [ ] Links are golden/yellow color (not blue)
- [ ] No content was changed (compare with original)
