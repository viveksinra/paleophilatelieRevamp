# Fix Legacy Header/Footer and Layout Issues on Paleophilatelie Pages

## Project Summary
15 pages on the Paleophilatelie website have been partially migrated to the new component-based header/footer system but still contain duplicate legacy header HTML and use old `<div id="container">` layout wrappers instead of the new `<main>` + `<div class="container">` structure. Each task below fixes one page by removing the old inline header block and replacing the legacy container wrappers with the new layout structure. The already-fixed `about_website.html` serves as the reference implementation.

## Important Constraints
- Do NOT modify any page content (text, data, links, images) -- only fix structural/layout wrapping per CLAUDE.md rules
- Do NOT remove the landscape-suggestion block -- it is a legitimate feature, not part of the old header
- The old header block starts at `<div id="header">` and includes: key_visual, logo, slogan, main_nav_container, sub_nav_container, Google Translate, freefind search, and AddThis social buttons
- The legacy wrapper pattern is: `<div id="container">` + `<div align="left">` wrapping page content
- The new pattern is: `<main>` + `<div class="container">` wrapping page content
- Some pages reference `components/component-loader.js` -- the correct path (matching the fixed reference page) is `scripts/component-loader.js`

## Reference: Target page structure after fix
```html
<div id="header-placeholder"></div>

<!-- landscape-suggestion block stays if present -->

<main>
<div class="container">
  ... page content here (unchanged) ...
</div>
</main>

<div id="footer-placeholder"></div>

<script src="scripts/component-loader.js"></script>
<script src="components/header/header.js"></script>
<script src="components/footer/footer.js"></script>
```

---

# Task 1: Fix year/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `year/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\year\index.html`
- Locate and remove the entire old `<div id="header">` block (from `<div id="header">` through its closing tag, including slogan, key_visual, logo, main_nav, sub_nav, Google Translate, freefind search, AddThis)
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers around it
- Add `<main>` and `<div class="container">` to wrap the page content (everything between the header-placeholder and footer-placeholder)
- Update closing `</div>` tags at the end to match: close `</div>` for container, then `</main>` before the footer-placeholder
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present alongside the footer-placeholder
- Do NOT modify any page content (text, data, links)

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\year\index.html`
- Reference fixed page: `D:\Projects\Paleophilatelie\FinalOneToSubmit\about_website.html`
- The old header block is typically ~120 lines containing navigation, search, translate, and social buttons
- The landscape-suggestion block (if present) should be preserved -- it is NOT part of the old header

---

# Task 2: Fix topics/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `topics/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\index.html`
- Locate and remove the entire old `<div id="header">` block (from `<div id="header">` through its closing tag, including slogan, key_visual, logo, main_nav, sub_nav, Google Translate, freefind search, AddThis)
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers around it
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present alongside the footer-placeholder
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\index.html`
- Reference fixed page: `D:\Projects\Paleophilatelie\FinalOneToSubmit\about_website.html`

---

# Task 3: Fix topics/paleo/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `topics/paleo/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\paleo\index.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\paleo\index.html`
- This is a subdirectory page -- CSS/script paths use `../../` prefix for relative references
- Reference fixed page: `D:\Projects\Paleophilatelie\FinalOneToSubmit\about_website.html`

---

# Task 4: Fix topics/anthro/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `topics/anthro/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\anthro\index.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\anthro\index.html`
- This is a subdirectory page -- CSS/script paths use `../../` prefix for relative references

---

# Task 5: Fix exhibitions/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `exhibitions/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\exhibitions\index.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\exhibitions\index.html`
- This is a subdirectory page -- CSS/script paths use `../` prefix for relative references

---

# Task 6: Fix description/stamps/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `description/stamps/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\stamps\index.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\stamps\index.html`
- This is a subdirectory page -- CSS/script paths use `../../` prefix for relative references
- This is a large page (~3300 lines) with many stamp description links

---

# Task 7: Fix description/letters/index.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `description/letters/index.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\letters\index.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\letters\index.html`
- This is a subdirectory page -- CSS/script paths use `../../` prefix for relative references

---

# Task 8: Fix phil_catalogue_main.html - Verify already-fixed page structure

## Objective
Verify that `phil_catalogue_main.html` is already correctly structured with the new component system, since grep results showed it already uses `<main>` and `<div class="container">` without any `<div id="header">` block. If any issues are found, fix them.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_main.html`
- Verify it has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- Verify page content uses `<main>` + `<div class="container">` (not `<div id="container">`)
- Verify it has `<div id="footer-placeholder"></div>` and no old footer block
- Verify script reference uses `scripts/component-loader.js`
- If any issues are found, fix them following the same pattern as other tasks
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` (not `<div id="container">`)
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>`
- [ ] If already correct, confirm with a brief status note

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_main.html`
- Initial grep results suggest this page may already be fixed (showed `<main>` and `<div class="container">` without `<div id="header">`)
- Still needs verification as it was in the original list of pages to fix

---

# Task 9: Fix phil_catalogue_species.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `phil_catalogue_species.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_species.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_species.html`
- Root-level page -- no path prefix needed for CSS/script references

---

# Task 10: Fix phil_glossary.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `phil_glossary.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_glossary.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_glossary.html`
- Root-level page -- no path prefix needed for CSS/script references

---

# Task 11: Fix news.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `news.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\news.html`
- Locate and remove the entire old `<div id="header">` block (lines ~106-218 based on analysis, containing slogan, main_nav, sub_nav, Google Translate, freefind search, AddThis)
- Remove the legacy `<div id="container">` opening tag (line ~103) and `<div align="left">` / `<div align="center">` wrappers around it (lines ~100-105)
- Add `<main>` and `<div class="container">` to wrap the page content starting after the landscape-suggestion block
- Update closing tags at the bottom of the page before the footer-placeholder
- Fix the script reference from `components/component-loader.js` to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] The landscape-suggestion block is preserved
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js` (was `components/component-loader.js`)
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\news.html`
- Root-level page -- no path prefix needed for CSS/script references
- This is a long page (~1057 lines) with extensive news history content
- Currently uses `components/component-loader.js` which needs to be changed to `scripts/component-loader.js`

---

# Task 12: Fix about.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `about.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\about.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\about.html`
- Root-level page -- no path prefix needed for CSS/script references
- This is the "About the Author" page (different from `about_website.html` which is already fixed)

---

# Task 13: Fix links.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `links.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\links.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\links.html`
- Root-level page -- no path prefix needed for CSS/script references

---

# Task 14: Fix sitemap.html - Remove legacy header and fix layout containers

## Objective
Remove the duplicate old inline header block from `sitemap.html` and replace legacy `<div id="container">` / `<div align="left">` wrappers with `<main>` + `<div class="container">`.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\sitemap.html`
- Locate and remove the entire old `<div id="header">` block
- Remove the legacy `<div id="container">` opening tag and any `<div align="left">` / `<div align="center">` wrappers
- Add `<main>` and `<div class="container">` to wrap the page content
- Update closing tags accordingly
- If the script reference is `components/component-loader.js`, update it to `scripts/component-loader.js`
- Check for and remove any old `<div id="footer">` block if present
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` instead of `<div id="container">`
- [ ] No orphaned `</div>` tags from removed elements
- [ ] Page content (text, links, images) is completely unchanged
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>` with no old footer block

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\sitemap.html`
- Root-level page -- no path prefix needed for CSS/script references
- This is a large page (~1544 lines) listing all site pages

---

# Task 15: Verify country/index.html is fully fixed

## Objective
Verify that `country/index.html` is already correctly structured with the new component system, since grep results showed it already uses `<main>` and `<div class="container">` without any `<div id="header">` block. If any issues are found, fix them.

## Requirements
- Read `D:\Projects\Paleophilatelie\FinalOneToSubmit\country\index.html`
- Verify it has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- Verify page content uses `<main>` + `<div class="container">` (not `<div id="container">`)
- Verify it has `<div id="footer-placeholder"></div>` and no old footer block
- Verify script reference uses `scripts/component-loader.js`
- If any issues are found, fix them following the same pattern as other tasks
- Do NOT modify any page content

## Acceptance Criteria
- [ ] Page has `<div id="header-placeholder"></div>` and NO `<div id="header">` block
- [ ] Page content is wrapped in `<main>` + `<div class="container">` (not `<div id="container">`)
- [ ] Script reference uses `scripts/component-loader.js`
- [ ] Footer uses only `<div id="footer-placeholder"></div>`
- [ ] If already correct, confirm with a brief status note

## Context
- File path: `D:\Projects\Paleophilatelie\FinalOneToSubmit\country\index.html`
- Initial grep results suggest this page is already fully rebuilt (showed `<main>` and `<div class="container">` with no `<div id="header">`)
- This is a subdirectory page -- CSS/script paths use `../` prefix for relative references

---

# Task 16: Final verification sweep across all 15 pages

## Objective
Run a final verification across all 15 pages to confirm every page has been correctly migrated and no legacy patterns remain.

## Requirements
- For each of the 15 pages, verify:
  1. No `<div id="header">` block exists
  2. `<div id="header-placeholder"></div>` is present
  3. Page content is wrapped in `<main>` + `<div class="container">`
  4. No `<div id="container">` exists
  5. `<div id="footer-placeholder"></div>` is present with no old footer block
  6. Script reference is `scripts/component-loader.js` (not `components/component-loader.js`)
- Report any pages that still have issues
- Fix any remaining issues found

## Acceptance Criteria
- [ ] All 15 pages pass verification for no `<div id="header">` block
- [ ] All 15 pages pass verification for `<main>` + `<div class="container">` layout
- [ ] All 15 pages have correct `scripts/component-loader.js` reference
- [ ] All 15 pages have `<div id="footer-placeholder"></div>` with no old footer
- [ ] A summary report is provided listing pass/fail status for each page

## Context
- Full page list:
  1. `D:\Projects\Paleophilatelie\FinalOneToSubmit\country\index.html`
  2. `D:\Projects\Paleophilatelie\FinalOneToSubmit\year\index.html`
  3. `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\index.html`
  4. `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\paleo\index.html`
  5. `D:\Projects\Paleophilatelie\FinalOneToSubmit\topics\anthro\index.html`
  6. `D:\Projects\Paleophilatelie\FinalOneToSubmit\exhibitions\index.html`
  7. `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\stamps\index.html`
  8. `D:\Projects\Paleophilatelie\FinalOneToSubmit\description\letters\index.html`
  9. `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_main.html`
  10. `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_catalogue_species.html`
  11. `D:\Projects\Paleophilatelie\FinalOneToSubmit\phil_glossary.html`
  12. `D:\Projects\Paleophilatelie\FinalOneToSubmit\news.html`
  13. `D:\Projects\Paleophilatelie\FinalOneToSubmit\about.html`
  14. `D:\Projects\Paleophilatelie\FinalOneToSubmit\links.html`
  15. `D:\Projects\Paleophilatelie\FinalOneToSubmit\sitemap.html`
- Use grep commands to efficiently scan all pages at once rather than reading each file individually

---

## Assumptions
1. The `country/index.html` and `phil_catalogue_main.html` pages appear to already be fully fixed based on initial analysis. Tasks 15 and 8 are verification-only tasks that confirm this and fix if needed.
2. None of the 15 target pages have an old `<div id="footer">` block -- they all already have `<div id="footer-placeholder"></div>`. The footer check is included as a safety measure.
3. The landscape-suggestion block (`<div id="landscape-suggestion">`) present on some pages is a legitimate feature and should NOT be removed.
4. Some pages use `components/component-loader.js` instead of the correct `scripts/component-loader.js` -- this should be normalized across all pages.
5. Legacy CSS references (main.css, colorscheme.css, style.css) in the `<head>` are left as-is for now, since removing them could break page-specific styling. That is a separate future task.
6. The `<div align="center">` wrappers found in some pages (e.g., news.html lines 100-102) are part of the old layout scaffolding and should be removed along with `<div id="container">`.

## Task Parallelization Notes
- Tasks 1-14 are independent of each other and can be executed in any order or in parallel.
- Task 15 (country/index.html verification) is independent and can run in parallel with others.
- Task 16 (final verification) must run after ALL other tasks are complete.
