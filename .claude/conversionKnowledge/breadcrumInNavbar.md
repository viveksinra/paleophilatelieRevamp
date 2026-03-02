# Breadcrumb in Navbar — Conversion Guide

## Overview
Breadcrumbs are rendered **inside the header toolbar** (the gray bar with Google Translate and Search). They are NOT a separate component. The breadcrumb data is passed via a `data-breadcrumb` attribute on `#header-placeholder`, and `component-loader.js` builds the HTML inside the toolbar.

## How It Works

### 1. Page HTML — `data-breadcrumb` attribute
Instead of a separate `<nav class="breadcrumb">` element, pages pass breadcrumb data on the header placeholder:

```html
<div id="header-placeholder" data-breadcrumb="Home::../../index.html|Catalogue::../../phil_catalogue_main.html|Description::../index.html|Official Stamps – Main Topics::./index.html|India 1951"></div>
```

**Format:** `Label::URL|Label::URL|...|CurrentPageLabel`
- Items separated by `|`
- Each item: `Label::URL` for links, or just `Label` for the current page (last item, no URL)
- URLs are relative paths from the page's location

### 2. Component Loader — `scripts/component-loader.js`
In the `loadHeader()` function, after injecting the header HTML, it reads `data-breadcrumb` and builds the breadcrumb inside `#header-breadcrumb-slot`:

```javascript
var breadcrumbData = element.getAttribute('data-breadcrumb');
var slot = element.querySelector('#header-breadcrumb-slot');
if (breadcrumbData && slot) {
    var items = breadcrumbData.split('|');
    var lis = items.map(function(item) {
        var parts = item.split('::');
        var label = parts[0];
        var url = parts[1];
        if (url) {
            return '<li class="breadcrumb__item"><a href="' + url + '" class="breadcrumb__link">' + label + '</a></li>';
        }
        return '<li class="breadcrumb__item"><span class="breadcrumb__current">' + label + '</span></li>';
    }).join('');
    slot.innerHTML = '<nav class="breadcrumb" aria-label="Breadcrumb"><ol class="breadcrumb__list">' + lis + '</ol></nav>';
}
```

### 3. Header Template Structure
The `#header-breadcrumb-slot` is inside `.header-toolbar__left`, which stacks vertically with the Google Translate element:

```html
<div class="header-toolbar__content">
    <div class="header-toolbar__left">
        <div id="google_translate_element"></div>
        <div id="header-breadcrumb-slot"></div>
    </div>
    <div class="header-search-wrapper">...</div>
    <label class="toolbar-sticky-toggle">...</label>
</div>
```

### 4. CSS (in `components/header/header.css`)
```css
.header-toolbar__left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-right: auto;
    min-width: 0;
}

#header-breadcrumb-slot:empty {
    display: none;
}

#header-breadcrumb-slot .breadcrumb__list {
    font-size: 0.8rem;
}
```

Breadcrumb base styles in `css/main.css`:
```css
.breadcrumb {
    padding: 0;
    background: none;
    border: none;
}
```

## Conversion Steps — Per Page

### What to REMOVE
Delete the entire separate `<nav class="breadcrumb">` block:
```html
<!-- DELETE THIS ENTIRE BLOCK -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="..." class="breadcrumb__link">Home</a></li>
            ...
        </ol>
    </div>
</nav>
```

### What to CHANGE
Add `data-breadcrumb` to the existing `#header-placeholder`:

**Before:**
```html
<div id="header-placeholder"></div>
```

**After:**
```html
<div id="header-placeholder" data-breadcrumb="Home::../../index.html|Catalogue::../../phil_catalogue_main.html|Description::../index.html|Official Stamps – Main Topics::./index.html|India 1951"></div>
```

### Common Breadcrumb Paths

**Stamp pages** (`description/stamps/*.html`):
```
Home::../../index.html|Catalogue::../../phil_catalogue_main.html|Description::../index.html|Official Stamps – Main Topics::./index.html|{PageTitle}
```

**Country pages** (`country/*.html`):
```
Home::../index.html|Catalogue::../phil_catalogue_main.html|Country::index.html|{CountryName}
```

**Year pages** (`year/*.html`):
```
Home::../index.html|Catalogue::../phil_catalogue_main.html|Year::index.html|{Year}
```

## Pages Without Breadcrumbs
Pages that don't set `data-breadcrumb` simply won't show any breadcrumb — `#header-breadcrumb-slot` stays empty and is hidden via `display: none`.

## Reference Implementation
See `description/stamps/india_1951.html` as the first converted page.
