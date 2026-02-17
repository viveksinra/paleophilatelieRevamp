# Project Guidelines for Claude

## Content Policy — STRICT, NO EXCEPTIONS
- **NEVER modify any page content** — this includes text, descriptions, data, links, URLs, image references, alt text, titles, labels, table data, or any other non-styling markup. Not even small or seemingly insignificant changes.
- This project is **design and styling only**. All work must be limited to CSS, layout, visual presentation, and structural HTML changes that do not alter content.
- If a design change would require touching content, **stop and ask the user first** — do not make the change on your own.
- When editing HTML, preserve all existing content exactly as-is. Only modify classes, IDs, wrapper elements, or attributes related to styling/layout.
- **Image paths are content — NEVER change them.** Many HTML files reference images that may not exist locally in `D:\Projects\Paleophilatelie\FinalOneToSubmit\images`. Do NOT modify, fix, or update any image `src` path regardless of whether the image file exists or not. Always keep the exact original path as-is.
- **Original content references** — if you ever need to verify or cross-check original content, use these two sources:
  - **Live original site:** http://www.paleophilatelie.eu/
  - **Local reference copy:** `D:\Projects\Paleophilatelie\FinalOneToSubmit\.paleophilatelieOldSiteForReference`

## Project Context
This is a Paleophilately website focused on stamps and postal history related to paleontology/fossils.

## Architecture Notes
- **Header and Footer are rendered from `scripts/component-loader.js`**, NOT from `components/header/header.html` or `components/footer/footer.html`. The component-loader has inline HTML that gets injected at runtime. Always update `component-loader.js` when making HTML changes to the header or footer.
- `components/header/header.html` and `components/header/header.css` exist as reference/source files, but the **live HTML** comes from `component-loader.js`.
- CSS files in `components/` are still loaded directly and do take effect — only the HTML is duplicated in the component loader.
