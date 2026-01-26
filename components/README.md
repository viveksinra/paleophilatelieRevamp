# Component Library

> **NEW Components for Paleophilatelie.eu**

This folder contains all reusable components for the website.

## Component Structure

Each component folder contains:
- `{component}.html` - The HTML markup
- `{component}.css` - Component-specific styles
- `{component}.js` - Component JavaScript (if needed)
- `README.md` - Usage documentation

## Available Components

| Component | Description | Status |
|-----------|-------------|--------|
| header | Sticky header with nav, search, translate | Pending |
| footer | Site footer with links and copyright | Pending |
| navigation | Dropdown navigation menu | Pending |
| gallery | Image grid with lightbox | Pending |
| card | Content cards for listings | Pending |
| breadcrumb | Breadcrumb navigation | Pending |
| pagination | Previous/Next navigation | Pending |

## How to Use

### Method 1: Include Component Script
Include the component loader and use data attributes:

```html
<head>
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
</head>
<body>
    <div data-component="header"></div>

    <main>
        <!-- Page content -->
    </main>

    <div data-component="footer"></div>

    <script src="scripts/components.js"></script>
</body>
```

### Method 2: Direct Include
Copy the HTML directly from the component file:

```html
<!-- Copy from components/header/header.html -->
<header class="site-header">
    ...
</header>
```

## Design Guidelines

All components follow the design system in `docs/design-system.md`:
- Use CSS variables from `css/variables.css`
- Follow the color palette (Primary Red #C41E3A, Secondary Gold #FFD700)
- Maintain consistent spacing using space tokens
- Ensure responsive behavior
- Meet accessibility standards (WCAG 2.1 AA)

## Creating New Components

1. Create a folder: `components/{component-name}/`
2. Add the HTML file: `{component-name}.html`
3. Add the CSS file: `{component-name}.css` (if needed)
4. Add the JS file: `{component-name}.js` (if needed)
5. Update this README with the new component

## CSS Naming Convention

Use BEM-like naming:
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

Example:
```css
.card { }
.card__image { }
.card__title { }
.card__body { }
.card--featured { }
```
