# Page Templates

> **NEW Templates for Paleophilatelie.eu**

This folder contains all page templates for the website.

## Available Templates

| Template | Description | Status |
|----------|-------------|--------|
| `base-template.html` | Base HTML structure for all pages | Pending |
| `homepage-template.html` | Homepage layout | Pending |
| `country-template.html` | Country pages (232 pages) | Pending |
| `year-template.html` | Year-based listings (60 pages) | Pending |
| `description-template.html` | Stamp descriptions (366 pages) | Pending |
| `catalogue-template.html` | Catalogue pages | Pending |
| `exhibition-template.html` | Exhibition pages (47 pages) | Pending |
| `utility-template.html` | About, contact, links, etc. | Pending |

## Template Structure

Each template should include:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{PAGE_DESCRIPTION}}">
    <title>{{PAGE_TITLE}} - Paleophilatelie.eu</title>

    <!-- Styles -->
    <link rel="stylesheet" href="css/main.css">

    <!-- Favicon -->
    <link rel="icon" href="images/favicon.ico">
</head>
<body>
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Header Component -->
    <div data-component="header"></div>

    <!-- Main Content -->
    <main id="main-content">
        {{PAGE_CONTENT}}
    </main>

    <!-- Footer Component -->
    <div data-component="footer"></div>

    <!-- Scripts -->
    <script src="scripts/components.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>
```

## Template Variables

Templates use placeholder variables that get replaced during conversion:

| Variable | Description |
|----------|-------------|
| `{{PAGE_TITLE}}` | Page title for `<title>` tag |
| `{{PAGE_DESCRIPTION}}` | Meta description |
| `{{PAGE_CONTENT}}` | Main page content |
| `{{BREADCRUMB}}` | Breadcrumb navigation |
| `{{COUNTRY_NAME}}` | Country name (for country pages) |
| `{{YEAR}}` | Year (for year pages) |

## Using Templates

### For New Pages
1. Copy the appropriate template
2. Replace placeholder variables
3. Add page-specific content

### For Converting Old Pages
The conversion script in `scripts/` will:
1. Extract content from old HTML files
2. Apply the new template
3. Save the converted file

## Related Files

- `css/main.css` - All styles
- `components/` - Reusable components
- `scripts/` - JavaScript and conversion tools
- `docs/design-system.md` - Design specifications
