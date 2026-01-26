# Paleophilatelie.eu Website Revamp - Developer Sprint Plan

## Project Overview

**Client:** paleophilatelie.eu  
**Objective:** Complete redesign of a 750+ page philatelic website using a component-based HTML/CSS/JS architecture  
**Design References:** [National Geographic](https://www.nationalgeographic.com/), [2-Clicks-Stamps](https://www.2-clicks-stamps.com/) but make sure we don't make the dark theme, take inspiration from above in terms of layout but we will use the light theme always

### Design Direction
- **Primary Color:** Red (#C41E3A) - Main brand color, used for headers, CTAs, accents
- **Secondary Color:** Yellow/Gold (#FFD700) - Supporting accent color
- **Theme:** Light/White background 
- **Goal:** Create a professional, modern website that rivals top philatelic and educational sites

### Key Constraints
- use best of html css and JS 
- Must preserve ALL existing content - no content deletion
- Keep images in their exact current locations to preserve links
- Maintain Google Translate and FreeFind search integration (improve if possible)

---

## Content Migration Strategy

### What Needs to Be Copied from Old Site

The `.paleophilatelieOldSiteForReference/` folder contains the complete old website. You need to copy certain files/folders to the main project root so they work with the new design.

#### Already Copied (in repository):
These folders have already been copied to the project root:
- `colorschemes/` ✅
- `images/` ✅
- `media/` ✅

#### Need to Copy (Sprint 1):
These folders contain content pages that need to be converted to new templates:

```bash
# Run these commands from project root (FinalOneToSubmit/)

# Copy content folders (these will be converted to new templates later)
cp -r .paleophilatelieOldSiteForReference/country ./country
cp -r .paleophilatelieOldSiteForReference/description ./description
cp -r .paleophilatelieOldSiteForReference/exhibitions ./exhibitions
cp -r .paleophilatelieOldSiteForReference/topics ./topics
cp -r .paleophilatelieOldSiteForReference/year ./year

# Copy root-level HTML files (will be redesigned)
cp .paleophilatelieOldSiteForReference/*.html ./

# Copy other necessary assets
cp .paleophilatelieOldSiteForReference/.htaccess ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/ads.txt ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/*.xml ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/*.js ./ 2>/dev/null || true
```

#### Important Notes:
1. **Keep original file names** - Don't rename HTML files (URLs must stay the same)
2. **Keep folder structure** - The `country/`, `year/`, etc. folders must stay at same paths
3. **Images stay in place** - All image references in HTML will still work
4. **Old CSS will be replaced** - We'll create new `css/` folder with modern styles

### Migration Workflow

```
OLD SITE REFERENCE                    NEW SITE (Main Project)
─────────────────                    ─────────────────────────
.paleophilatelieOldSiteForReference/
├── country/india.html      ──COPY──►  country/india.html (then convert with new template)
├── year/2024.html          ──COPY──►  year/2024.html (then convert with new template)
├── images/                 ──COPY──►  images/ (already done)
├── index.html              ──COPY──►  index.html (then redesign completely)
└── main.css                ──IGNORE─  (we create new css/main.css)
```

### When to Copy

| Sprint | Action |
|--------|--------|
| Sprint 1 | Copy all folders and files (as shown above) |
| Sprint 6-10 | Convert copied HTML files to use new templates |
| Sprint 11-12 | Run bulk conversion scripts on all pages |

---

## Repository Structure

```
FinalOneToSubmit/
├── .claude/
├── .paleophilatelieOldSiteForReference/    # ⚠️ OLD SITE - READ ONLY - FOR REFERENCE ONLY
│   ├── colorschemes/
│   ├── country/
│   ├── description/
│   ├── exhibitions/
│   ├── images/
│   ├── media/
│   ├── topics/
│   ├── year/
│   ├── index.html
│   ├── phil_catalogue_main.html
│   ├── main.css
│   └── ... (750+ HTML files)
│
├── docs/
│   ├── OLD-SITE-ANALYSIS/                  # ⚠️ Analysis of old site - FOR REFERENCE ONLY
│   │   ├── file-inventory.json
│   │   ├── template-patterns.json
│   │   └── ...
│   ├── OLD-SITE-EXTRACTED/                 # ⚠️ Extracted from old site - FOR REFERENCE ONLY
│   │   ├── old-head-section.html
│   │   ├── old-navigation.html
│   │   ├── old-footer.html
│   │   ├── old-main.css
│   │   └── ...
│   └── design-system.md                    # ✅ NEW design system to follow
│
├── css/                                    # ✅ NEW styles
├── components/                             # ✅ NEW components
├── scripts/                                # Build/conversion scripts
├── templates/                              # ✅ NEW page templates
│
├── colorschemes/                           # Copied from old site (keep as-is)
├── images/                                 # Copied from old site (keep as-is)
├── media/                                  # Copied from old site (keep as-is)
│
├── index.html                              # ✅ NEW homepage
├── .gitignore
├── settings.local.json
└── README.md                               # This file
```

### Important Naming Conventions

| Prefix/Location | Meaning |
|-----------------|---------|
| `OLD-SITE-*` | Analysis/extraction from old site - **FOR REFERENCE ONLY** |
| `old-*` | Files extracted from old site - **DO NOT COPY DIRECTLY** |
| `.paleophilatelieOldSiteForReference/` | Original old site - **READ ONLY** |
| `docs/design-system.md` | **NEW design to follow** |
| `css/`, `components/`, `templates/` | **NEW code to create** |

> ⚠️ **IMPORTANT:** The old site analysis is only to understand what content exists and needs to be preserved. We are NOT replicating the old design - we are creating a completely NEW, modern design inspired by National Geographic and 2-Clicks-Stamps.

---

## Sprint Plan

Each sprint = 5 working days

---

# PHASE 1: ANALYSIS & SETUP (Sprint 1-2)

---

## Sprint 1: Codebase Analysis & Documentation

### Objective
Analyze the old codebase to understand what content exists, identify all page types, and document findings. This is purely for understanding - NOT for replicating.

### Tasks

#### Task 1.0: Copy Content from Old Site to Main Project
First, copy all the necessary files and folders from the old site reference to the main project. This ensures all content is available for conversion.

```bash
# Navigate to project root
cd FinalOneToSubmit/

# Create backup of what's already there (optional)
# mkdir -p _backup && cp -r *.html _backup/ 2>/dev/null || true

# ===== COPY CONTENT FOLDERS =====
# These contain the actual pages that will be converted to new templates

cp -r .paleophilatelieOldSiteForReference/country ./country
cp -r .paleophilatelieOldSiteForReference/description ./description
cp -r .paleophilatelieOldSiteForReference/exhibitions ./exhibitions
cp -r .paleophilatelieOldSiteForReference/topics ./topics
cp -r .paleophilatelieOldSiteForReference/year ./year

# ===== COPY ROOT HTML FILES =====
# These are the main pages (homepage, catalogue, about, etc.)

cp .paleophilatelieOldSiteForReference/*.html ./

# ===== COPY OTHER NECESSARY FILES =====
# Config files, sitemaps, scripts that need to be preserved

cp .paleophilatelieOldSiteForReference/.htaccess ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/ads.txt ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/*.xml ./ 2>/dev/null || true
cp .paleophilatelieOldSiteForReference/live_tinc.js ./ 2>/dev/null || true

# ===== VERIFY THE COPY =====
echo "Copied folders:"
ls -d */ | grep -v "^\." | grep -v "node_modules" | grep -v "docs" | grep -v "css" | grep -v "components" | grep -v "scripts" | grep -v "templates"

echo ""
echo "Copied HTML files in root:"
ls *.html | wc -l
echo "HTML files"
```

**Expected Result:**
After running these commands, your project structure should look like:
```
FinalOneToSubmit/
├── country/           # ← Copied from old site
├── description/       # ← Copied from old site
├── exhibitions/       # ← Copied from old site
├── topics/            # ← Copied from old site
├── year/              # ← Copied from old site
├── colorschemes/      # ← Already copied
├── images/            # ← Already copied
├── media/             # ← Already copied
├── index.html         # ← Copied (will be redesigned)
├── about.html         # ← Copied (will be redesigned)
├── phil_catalogue_main.html  # ← Copied (will be redesigned)
├── ... (other HTML files)
├── .paleophilatelieOldSiteForReference/  # ← Keep as reference
├── docs/              # ← New (for analysis output)
├── css/               # ← New (for new styles)
├── components/        # ← New (for new components)
└── scripts/           # ← New (for build scripts)
```

> ⚠️ **IMPORTANT:** The copied HTML files still have the OLD design. We will convert them to use NEW templates in later sprints. For now, they serve as the content source.

#### Task 1.1: Create Analysis Folder Structure
```bash
mkdir -p docs/OLD-SITE-ANALYSIS
mkdir -p docs/OLD-SITE-EXTRACTED
mkdir -p scripts
```

#### Task 1.2: Generate Complete File Inventory
Create a script to catalog all HTML files in the old site.

**File:** `scripts/analyze-old-site.js`
```javascript
/**
 * OLD SITE ANALYZER
 * Purpose: Understand what content exists in the old site
 * Output: Goes to docs/OLD-SITE-ANALYSIS/ - FOR REFERENCE ONLY
 */

const fs = require('fs');
const path = require('path');

const OLD_SITE_PATH = './.paleophilatelieOldSiteForReference';
const OUTPUT_PATH = './docs/OLD-SITE-ANALYSIS';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

const inventory = {
    htmlFiles: [],
    folders: [],
    cssFiles: [],
    jsFiles: [],
    imageCount: 0,
    totalFiles: 0
};

function scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            inventory.folders.push(relPath);
            scanDirectory(fullPath, relPath);
        } else {
            inventory.totalFiles++;
            const ext = path.extname(item).toLowerCase();
            
            if (ext === '.html' || ext === '.htm') {
                inventory.htmlFiles.push({
                    path: relPath,
                    size: stat.size,
                    folder: relativePath || 'root'
                });
            } else if (ext === '.css') {
                inventory.cssFiles.push(relPath);
            } else if (ext === '.js') {
                inventory.jsFiles.push(relPath);
            } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
                inventory.imageCount++;
            }
        }
    });
}

scanDirectory(OLD_SITE_PATH);

// Generate summary
const summary = {
    generatedAt: new Date().toISOString(),
    note: 'THIS IS OLD SITE ANALYSIS - FOR REFERENCE ONLY - DO NOT REPLICATE DESIGN',
    totalHTMLFiles: inventory.htmlFiles.length,
    totalFolders: inventory.folders.length,
    totalCSSFiles: inventory.cssFiles.length,
    totalJSFiles: inventory.jsFiles.length,
    totalImages: inventory.imageCount,
    totalFiles: inventory.totalFiles,
    
    // Group HTML files by folder
    htmlByFolder: inventory.htmlFiles.reduce((acc, file) => {
        acc[file.folder] = acc[file.folder] || [];
        acc[file.folder].push(file.path);
        return acc;
    }, {})
};

// Save inventory
fs.writeFileSync(
    path.join(OUTPUT_PATH, 'old-site-file-inventory.json'),
    JSON.stringify(inventory, null, 2)
);

fs.writeFileSync(
    path.join(OUTPUT_PATH, 'old-site-summary.json'),
    JSON.stringify(summary, null, 2)
);

// Generate readable report
let report = `# Old Site Inventory Report\n\n`;
report += `> ⚠️ **THIS IS OLD SITE ANALYSIS - FOR REFERENCE ONLY**\n`;
report += `> Use this to understand what CONTENT exists, NOT to copy the design.\n\n`;
report += `Generated: ${new Date().toISOString()}\n\n`;
report += `## Summary\n`;
report += `- Total HTML Files: ${summary.totalHTMLFiles}\n`;
report += `- Total Folders: ${summary.totalFolders}\n`;
report += `- Total CSS Files: ${summary.totalCSSFiles}\n`;
report += `- Total JS Files: ${summary.totalJSFiles}\n`;
report += `- Total Images: ${summary.totalImages}\n`;
report += `- Total Files: ${summary.totalFiles}\n\n`;

report += `## Folders in Old Site\n`;
inventory.folders.forEach(f => report += `- ${f}\n`);

report += `\n## HTML Files by Folder (Content to Migrate)\n`;
Object.keys(summary.htmlByFolder).forEach(folder => {
    report += `\n### ${folder || 'Root'} (${summary.htmlByFolder[folder].length} files)\n`;
    summary.htmlByFolder[folder].slice(0, 10).forEach(f => report += `- ${f}\n`);
    if (summary.htmlByFolder[folder].length > 10) {
        report += `- ... and ${summary.htmlByFolder[folder].length - 10} more files\n`;
    }
});

fs.writeFileSync(path.join(OUTPUT_PATH, 'old-site-inventory-report.md'), report);

console.log('Old site analysis complete!');
console.log(`Output saved to: ${OUTPUT_PATH}/`);
console.log(`Found ${summary.totalHTMLFiles} HTML files in ${summary.totalFolders} folders.`);
console.log('\n⚠️ Remember: This analysis is for REFERENCE ONLY - create NEW modern designs!');
```

**Run:**
```bash
node scripts/analyze-old-site.js
```

#### Task 1.3: Identify Page Template Categories
Create a script to categorize pages by type (to understand what templates we need to create).

**File:** `scripts/categorize-old-pages.js`
```javascript
/**
 * OLD PAGE CATEGORIZER
 * Purpose: Identify different page TYPES so we know what NEW templates to create
 * Output: Goes to docs/OLD-SITE-ANALYSIS/ - FOR REFERENCE ONLY
 */

const fs = require('fs');
const path = require('path');

const OLD_SITE_PATH = './.paleophilatelieOldSiteForReference';
const OUTPUT_PATH = './docs/OLD-SITE-ANALYSIS';

// Read inventory from previous script
const inventory = JSON.parse(
    fs.readFileSync(path.join(OUTPUT_PATH, 'old-site-file-inventory.json'), 'utf8')
);

const pageCategories = {
    homepage: [],
    countryPages: [],
    yearPages: [],
    descriptionPages: [],
    cataloguePages: [],
    topicPages: [],
    exhibitionPages: [],
    utilityPages: [],  // about, contact, links, etc.
    otherPages: []
};

// Categorize each HTML file
inventory.htmlFiles.forEach(file => {
    const fullPath = path.join(OLD_SITE_PATH, file.path);
    
    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Extract basic info
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'No title';
        
        const analysis = {
            path: file.path,
            folder: file.folder,
            title: title,
            hasImages: content.includes('<img'),
            hasTable: content.includes('<table'),
            approximateSize: file.size
        };
        
        // Categorize by folder and filename patterns
        if (file.path === 'index.html') {
            pageCategories.homepage.push(analysis);
        } else if (file.folder === 'country' || file.path.match(/country/i)) {
            pageCategories.countryPages.push(analysis);
        } else if (file.folder === 'year' || file.path.match(/^\d{4}\.html$/)) {
            pageCategories.yearPages.push(analysis);
        } else if (file.folder === 'description') {
            pageCategories.descriptionPages.push(analysis);
        } else if (file.path.match(/catalogue|catalog/i)) {
            pageCategories.cataloguePages.push(analysis);
        } else if (file.folder === 'topics') {
            pageCategories.topicPages.push(analysis);
        } else if (file.folder === 'exhibitions') {
            pageCategories.exhibitionPages.push(analysis);
        } else if (file.path.match(/about|contact|links|news|faq/i)) {
            pageCategories.utilityPages.push(analysis);
        } else {
            pageCategories.otherPages.push(analysis);
        }
        
    } catch (err) {
        console.error(`Error reading ${file.path}: ${err.message}`);
    }
});

// Save categorization
fs.writeFileSync(
    path.join(OUTPUT_PATH, 'old-site-page-categories.json'),
    JSON.stringify(pageCategories, null, 2)
);

// Generate report
let report = `# Old Site Page Categories\n\n`;
report += `> ⚠️ **FOR REFERENCE ONLY** - This shows what page TYPES exist.\n`;
report += `> We will create NEW templates for each category with MODERN design.\n\n`;

Object.keys(pageCategories).forEach(category => {
    const pages = pageCategories[category];
    report += `## ${category} (${pages.length} pages)\n\n`;
    report += `**NEW Template Needed:** \`templates/${category.replace('Pages', '')}-template.html\`\n\n`;
    
    if (pages.length > 0) {
        report += `Sample pages from old site:\n`;
        pages.slice(0, 3).forEach(p => {
            report += `- \`${p.path}\` - "${p.title}"\n`;
        });
        if (pages.length > 3) {
            report += `- ... and ${pages.length - 3} more\n`;
        }
        report += `\n`;
    }
});

fs.writeFileSync(path.join(OUTPUT_PATH, 'old-site-page-categories-report.md'), report);

console.log('Page categorization complete!');
console.log(`\nCategories found:`);
Object.keys(pageCategories).forEach(cat => {
    console.log(`  ${cat}: ${pageCategories[cat].length} pages`);
});
```

**Run:**
```bash
node scripts/categorize-old-pages.js
```

#### Task 1.4: Extract Old Components for Content Reference
Extract header/footer/navigation from old site - **FOR CONTENT REFERENCE ONLY** (to know what links exist, what text to preserve, etc.)

**File:** `scripts/extract-old-content.js`
```javascript
/**
 * OLD CONTENT EXTRACTOR
 * Purpose: Extract content (text, links) from old site for reference
 * Output: Goes to docs/OLD-SITE-EXTRACTED/ - FOR REFERENCE ONLY
 * 
 * ⚠️ WARNING: These extractions are to understand WHAT CONTENT exists,
 *    NOT to copy the HTML/CSS structure!
 */

const fs = require('fs');
const path = require('path');

const OLD_SITE_PATH = './.paleophilatelieOldSiteForReference';
const OUTPUT_PATH = './docs/OLD-SITE-EXTRACTED';

if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

// Read the homepage as reference
const homepagePath = path.join(OLD_SITE_PATH, 'index.html');
const homepage = fs.readFileSync(homepagePath, 'utf8');

// Create a reference file explaining what we extracted
let referenceDoc = `# Old Site Content Extractions\n\n`;
referenceDoc += `> ⚠️ **IMPORTANT: FOR CONTENT REFERENCE ONLY**\n\n`;
referenceDoc += `These files show what CONTENT exists in the old site.\n`;
referenceDoc += `- Use these to understand what text/links need to be preserved\n`;
referenceDoc += `- **DO NOT** copy the HTML structure or CSS styles\n`;
referenceDoc += `- Create completely NEW, modern designs\n\n`;

// Extract navigation links (what menu items exist)
const navLinks = [];
const linkMatches = homepage.matchAll(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi);
for (const match of linkMatches) {
    navLinks.push({
        href: match[1],
        text: match[2].replace(/<[^>]*>/g, '').trim()
    });
}

fs.writeFileSync(
    path.join(OUTPUT_PATH, 'old-navigation-links.json'),
    JSON.stringify(navLinks.slice(0, 50), null, 2)  // First 50 links
);

referenceDoc += `## Extracted Files\n\n`;
referenceDoc += `### old-navigation-links.json\n`;
referenceDoc += `Navigation links from the old site. Use to ensure all sections are accessible in new design.\n\n`;

// Extract the old CSS for analysis (what colors/fonts were used)
const cssPath = path.join(OLD_SITE_PATH, 'main.css');
if (fs.existsSync(cssPath)) {
    fs.copyFileSync(cssPath, path.join(OUTPUT_PATH, 'old-main.css'));
    referenceDoc += `### old-main.css\n`;
    referenceDoc += `Old stylesheet. Review to understand existing color scheme, but create NEW styles.\n\n`;
}

// Extract country list (for new navigation)
const countryFolder = path.join(OLD_SITE_PATH, 'country');
if (fs.existsSync(countryFolder)) {
    const countries = fs.readdirSync(countryFolder)
        .filter(f => f.endsWith('.html'))
        .map(f => ({
            filename: f,
            name: f.replace('.html', '').replace(/_/g, ' ').replace(/-/g, ' ')
        }));
    
    fs.writeFileSync(
        path.join(OUTPUT_PATH, 'old-country-list.json'),
        JSON.stringify(countries, null, 2)
    );
    
    referenceDoc += `### old-country-list.json\n`;
    referenceDoc += `List of all country pages (${countries.length} countries). Use for new country navigation.\n\n`;
}

// Extract year list
const yearFolder = path.join(OLD_SITE_PATH, 'year');
if (fs.existsSync(yearFolder)) {
    const years = fs.readdirSync(yearFolder)
        .filter(f => f.endsWith('.html'))
        .map(f => f.replace('.html', ''))
        .filter(y => /^\d{4}$/.test(y))
        .sort();
    
    fs.writeFileSync(
        path.join(OUTPUT_PATH, 'old-year-list.json'),
        JSON.stringify(years, null, 2)
    );
    
    referenceDoc += `### old-year-list.json\n`;
    referenceDoc += `List of all year pages (${years.length} years: ${years[0]} - ${years[years.length-1]}). Use for new year navigation.\n\n`;
}

// Save reference document
fs.writeFileSync(path.join(OUTPUT_PATH, 'README.md'), referenceDoc);

console.log('Old content extraction complete!');
console.log(`Output saved to: ${OUTPUT_PATH}/`);
console.log('\n⚠️ Remember: Use these for CONTENT reference only - create NEW designs!');
```

**Run:**
```bash
node scripts/extract-old-content.js
```

### Deliverables for Sprint 1

**Copied Content (from old site to main project):**
| Folder/Files | Purpose |
|--------------|---------|
| `country/` | Country pages - to be converted |
| `description/` | Stamp description pages - to be converted |
| `exhibitions/` | Exhibition pages - to be converted |
| `topics/` | Topic pages - to be converted |
| `year/` | Year pages - to be converted |
| `*.html` (root) | Main pages - to be redesigned |
| `.htaccess`, `*.xml`, etc. | Config files - keep as-is |

**Analysis Outputs (go to `docs/OLD-SITE-ANALYSIS/` and `docs/OLD-SITE-EXTRACTED/`):**

| File | Purpose |
|------|---------|
| `old-site-file-inventory.json` | Complete file listing - understand scope |
| `old-site-summary.json` | Statistics - understand scale |
| `old-site-inventory-report.md` | Human-readable inventory |
| `old-site-page-categories.json` | Page types - what templates we need |
| `old-site-page-categories-report.md` | Template planning guide |
| `old-navigation-links.json` | Links to preserve in new design |
| `old-country-list.json` | Countries for new navigation |
| `old-year-list.json` | Years for new navigation |
| `old-main.css` | Old styles - color reference only |

### Acceptance Criteria
- [ ] All content folders copied from old site (country, description, exhibitions, topics, year)
- [ ] All root HTML files copied from old site
- [ ] All scripts run without errors
- [ ] Complete inventory of all 750+ HTML files
- [ ] Pages categorized into template types
- [ ] Country and year lists extracted
- [ ] All output clearly marked as "OLD SITE" reference material

---

## Sprint 2: NEW Design System & Component Architecture

### Objective
Define the NEW design system (colors, typography, spacing) and create the component architecture framework. This is where we establish the MODERN design direction.

### Prerequisites
- Sprint 1 completed
- Review design references: [National Geographic](https://www.nationalgeographic.com/), [2-Clicks-Stamps](https://www.2-clicks-stamps.com/)
- Review `docs/OLD-SITE-EXTRACTED/old-country-list.json` and `old-year-list.json` for content needs

### Tasks

#### Task 2.1: Create NEW Design System Documentation

**File:** `docs/design-system.md`
```markdown
# Paleophilatelie.eu - NEW Design System

> ✅ **THIS IS THE NEW DESIGN SYSTEM TO FOLLOW**
> Inspired by National Geographic and 2-Clicks-Stamps

## Brand Identity

### Logo
- Keep existing logo but display it cleanly on white background
- Ensure proper spacing around logo

### Tagline
"The place where Paleontology and Paleoanthropology meets Philately"

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Red | `#C41E3A` | Headers, buttons, CTAs, accents |
| Primary Red Dark | `#A01830` | Hover states, borders |
| Primary Red Light | `#DC3545` | Highlights |

### Secondary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gold/Yellow | `#FFD700` | Secondary accents, highlights, badges |
| Gold Dark | `#E6C200` | Hover states |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Background |
| Off-White | `#F8F9FA` | Section backgrounds, cards |
| Light Gray | `#E9ECEF` | Borders, dividers |
| Medium Gray | `#6C757D` | Secondary text |
| Dark Gray | `#343A40` | Primary text |
| Black | `#212529` | Headings, footer background |

### Functional Colors
| Name | Hex | Usage |
|------|-----|-------|
| Link Blue | `#0066CC` | Text links |
| Link Hover | `#004499` | Link hover state |
| Success | `#28A745` | Success messages |
| Warning | `#FFC107` | Warnings |
| Error | `#DC3545` | Errors |

## Typography

### Font Stack
```css
/* Primary font - clean, readable, widely supported */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             'Helvetica Neue', Arial, sans-serif;

/* Heading font - slightly more distinctive */
font-family: 'Georgia', 'Times New Roman', serif;  /* For special headings only */
```

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 | 1.2 |
| H2 | 2rem (32px) | 600 | 1.25 |
| H3 | 1.5rem (24px) | 600 | 1.3 |
| H4 | 1.25rem (20px) | 600 | 1.35 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

## Spacing System

Use consistent spacing based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Default spacing |
| `--space-5` | 24px | Medium spacing |
| `--space-6` | 32px | Large spacing |
| `--space-7` | 48px | Section spacing |
| `--space-8` | 64px | Large sections |

## Layout

### Container
- Max width: 1200px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Centered with auto margins

### Grid
- 12-column grid for complex layouts
- CSS Grid for modern browsers
- Flexbox for simpler layouts

### Breakpoints
| Name | Width | Target |
|------|-------|--------|
| Mobile | < 576px | Small phones |
| Mobile Large | 576px - 767px | Large phones |
| Tablet | 768px - 991px | Tablets |
| Desktop | 992px - 1199px | Small desktops |
| Desktop Large | ≥ 1200px | Large screens |

## Components

### Buttons
- Primary: Red background, white text
- Secondary: White background, red border, red text
- Border radius: 4px
- Padding: 12px 24px
- Hover: Darken background 10%

### Cards
- White background
- Border: 1px solid light gray
- Border radius: 8px
- Box shadow: subtle (0 2px 4px rgba(0,0,0,0.1))
- Padding: 24px

### Navigation
- Sticky header
- White background with subtle shadow when scrolled
- Red active/hover states
- Dropdown menus for sub-navigation

### Images
- Border radius: 4px for thumbnails
- Hover effect: slight scale (1.02) with shadow
- Lightbox for full-size viewing

## Iconography
- Use simple, clean icons
- Emoji can be used for visual interest (🦕 🌍 📅 etc.)
- Keep icons consistent in style and size

## Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Focus states visible on all interactive elements
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigable
```

#### Task 2.2: Create CSS Variables File

**File:** `css/variables.css`
```css
/**
 * NEW DESIGN SYSTEM - CSS Custom Properties
 * ✅ Use these variables throughout the project
 */

:root {
    /* ===== PRIMARY COLORS ===== */
    --color-primary: #C41E3A;
    --color-primary-dark: #A01830;
    --color-primary-light: #DC3545;
    
    /* ===== SECONDARY COLORS ===== */
    --color-secondary: #FFD700;
    --color-secondary-dark: #E6C200;
    --color-secondary-light: #FFE44D;
    
    /* ===== NEUTRAL COLORS ===== */
    --color-white: #FFFFFF;
    --color-off-white: #F8F9FA;
    --color-gray-100: #F1F3F5;
    --color-gray-200: #E9ECEF;
    --color-gray-300: #DEE2E6;
    --color-gray-400: #CED4DA;
    --color-gray-500: #ADB5BD;
    --color-gray-600: #6C757D;
    --color-gray-700: #495057;
    --color-gray-800: #343A40;
    --color-gray-900: #212529;
    --color-black: #000000;
    
    /* ===== SEMANTIC COLORS ===== */
    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-600);
    --color-text-muted: var(--color-gray-500);
    --color-text-inverse: var(--color-white);
    
    --color-background: var(--color-white);
    --color-background-alt: var(--color-off-white);
    --color-surface: var(--color-white);
    --color-border: var(--color-gray-200);
    
    --color-link: #0066CC;
    --color-link-hover: #004499;
    
    --color-success: #28A745;
    --color-warning: #FFC107;
    --color-error: #DC3545;
    
    /* ===== TYPOGRAPHY ===== */
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                        'Helvetica Neue', Arial, sans-serif;
    --font-family-heading: var(--font-family-base);
    
    --font-size-xs: 0.75rem;    /* 12px */
    --font-size-sm: 0.875rem;   /* 14px */
    --font-size-base: 1rem;     /* 16px */
    --font-size-lg: 1.125rem;   /* 18px */
    --font-size-xl: 1.25rem;    /* 20px */
    --font-size-2xl: 1.5rem;    /* 24px */
    --font-size-3xl: 2rem;      /* 32px */
    --font-size-4xl: 2.5rem;    /* 40px */
    
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --line-height-tight: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    
    /* ===== SPACING ===== */
    --space-1: 0.25rem;  /* 4px */
    --space-2: 0.5rem;   /* 8px */
    --space-3: 0.75rem;  /* 12px */
    --space-4: 1rem;     /* 16px */
    --space-5: 1.5rem;   /* 24px */
    --space-6: 2rem;     /* 32px */
    --space-7: 3rem;     /* 48px */
    --space-8: 4rem;     /* 64px */
    
    /* ===== BORDERS ===== */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-full: 9999px;
    
    /* ===== SHADOWS ===== */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    /* ===== TRANSITIONS ===== */
    --transition-fast: 150ms ease;
    --transition-normal: 250ms ease;
    --transition-slow: 350ms ease;
    
    /* ===== LAYOUT ===== */
    --container-max-width: 1200px;
    --header-height: 72px;
    
    /* ===== Z-INDEX ===== */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-fixed: 300;
    --z-modal-backdrop: 400;
    --z-modal: 500;
    --z-tooltip: 600;
}
```

#### Task 2.3: Create Base CSS Reset and Utilities

**File:** `css/base.css`
```css
/**
 * BASE STYLES
 * Reset and foundational styles for the new design
 */

/* ===== CSS RESET ===== */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
}

body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-primary);
    background-color: var(--color-background);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ===== TYPOGRAPHY ===== */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

p {
    margin-bottom: var(--space-4);
}

p:last-child {
    margin-bottom: 0;
}

a {
    color: var(--color-link);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
}

strong, b {
    font-weight: var(--font-weight-semibold);
}

small {
    font-size: var(--font-size-sm);
}

/* ===== IMAGES ===== */
img {
    max-width: 100%;
    height: auto;
    display: block;
}

figure {
    margin: 0;
}

figcaption {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: var(--space-2);
}

/* ===== LISTS ===== */
ul, ol {
    padding-left: var(--space-5);
    margin-bottom: var(--space-4);
}

li {
    margin-bottom: var(--space-2);
}

/* ===== LAYOUT UTILITIES ===== */
.container {
    width: 100%;
    max-width: var(--container-max-width);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--space-4);
    padding-right: var(--space-4);
}

@media (min-width: 768px) {
    .container {
        padding-left: var(--space-5);
        padding-right: var(--space-5);
    }
}

@media (min-width: 1200px) {
    .container {
        padding-left: var(--space-6);
        padding-right: var(--space-6);
    }
}

main {
    flex: 1;
}

/* ===== BUTTONS ===== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.btn:hover {
    text-decoration: none;
}

.btn-primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
}

.btn-primary:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    color: var(--color-white);
}

.btn-secondary {
    background-color: transparent;
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.btn-secondary:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.btn-outline-light {
    background-color: transparent;
    border-color: var(--color-white);
    color: var(--color-white);
}

.btn-outline-light:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
}

/* ===== ACCESSIBILITY ===== */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Focus styles */
:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Skip link */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: var(--color-white);
    padding: var(--space-2) var(--space-4);
    z-index: 1000;
}

.skip-link:focus {
    top: 0;
}

/* ===== UTILITY CLASSES ===== */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-muted { color: var(--color-text-muted); }

.bg-white { background-color: var(--color-white); }
.bg-light { background-color: var(--color-background-alt); }
.bg-primary { background-color: var(--color-primary); }
.bg-dark { background-color: var(--color-gray-900); }

.mt-0 { margin-top: 0; }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mb-0 { margin-bottom: 0; }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }

.py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }
```

#### Task 2.4: Create Component Folder Structure

```bash
mkdir -p components/header
mkdir -p components/footer
mkdir -p components/navigation
mkdir -p components/gallery
mkdir -p components/card
mkdir -p components/breadcrumb
mkdir -p components/pagination
mkdir -p css/pages
mkdir -p templates
```

#### Task 2.5: Create Component Documentation

**File:** `components/README.md`
```markdown
# Component Library

> ✅ **NEW Components for Paleophilatelie.eu**

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
| header | Sticky header with nav, search, translate | 🔲 Pending |
| footer | Site footer with links and copyright | 🔲 Pending |
| navigation | Dropdown navigation menu | 🔲 Pending |
| gallery | Image grid with lightbox | 🔲 Pending |
| card | Content cards for listings | 🔲 Pending |
| breadcrumb | Breadcrumb navigation | 🔲 Pending |
| pagination | Previous/Next navigation | 🔲 Pending |

## How to Use

Include components using the component loader:

```html
<div data-component="header"></div>
```

Or include directly by copying the HTML.

## Design Guidelines

All components follow the design system in `docs/design-system.md`:
- Use CSS variables from `css/variables.css`
- Follow the color palette (Primary Red, Secondary Gold)
- Maintain consistent spacing
- Ensure responsive behavior
- Meet accessibility standards
```

#### Task 2.6: Create Component Loader Script

**File:** `scripts/components.js`
```javascript
/**
 * Component Loader
 * Dynamically loads HTML components into pages
 */

(function() {
    'use strict';
    
    const componentCache = {};
    
    async function loadComponent(name) {
        if (componentCache[name]) {
            return componentCache[name];
        }
        
        try {
            // Try multiple paths
            const paths = [
                `components/${name}/${name}.html`,
                `../components/${name}/${name}.html`,
                `../../components/${name}/${name}.html`
            ];
            
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        const html = await response.text();
                        componentCache[name] = html;
                        return html;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            throw new Error(`Component not found: ${name}`);
        } catch (error) {
            console.error(`Failed to load component: ${name}`, error);
            return `<!-- Component ${name} failed to load -->`;
        }
    }
    
    async function initComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        
        for (const element of componentElements) {
            const componentName = element.getAttribute('data-component');
            const html = await loadComponent(componentName);
            element.outerHTML = html;
        }
        
        // Dispatch event when all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }
    
    // Expose for manual initialization
    window.loadComponent = loadComponent;
    window.initComponents = initComponents;
})();
```

### Deliverables for Sprint 2

| File | Purpose |
|------|---------|
| `docs/design-system.md` | ✅ NEW design system to follow |
| `css/variables.css` | CSS custom properties |
| `css/base.css` | Reset and base styles |
| `components/README.md` | Component documentation |
| `scripts/components.js` | Component loader |
| Component folder structure | Ready for development |

### Acceptance Criteria
- [ ] Design system document complete with all specifications
- [ ] CSS variables file with all design tokens
- [ ] Base CSS with reset, typography, buttons, utilities
- [ ] Component folder structure created
- [ ] Component loader script working
- [ ] All new files clearly marked as NEW design (not old site reference)

---

# PHASE 2: CORE COMPONENTS (Sprint 3-5)

## Sprint 3: Header Component
Create modern, responsive, sticky header with navigation, search, and translation.

## Sprint 4: Footer Component  
Create responsive footer with navigation links, about text, and copyright.

## Sprint 5: Gallery & Lightbox Component
Create image gallery with modern lightbox functionality for stamp viewing.

---

# PHASE 3: PAGE TEMPLATES (Sprint 6-10)

## Sprint 6: Homepage Redesign
Create completely NEW, modern homepage inspired by National Geographic.

## Sprint 7: Country Page Template
Create reusable template for all country pages.

## Sprint 8: Catalogue Main Page
Redesign main catalogue page with card-based layout.

## Sprint 9: Year Page Template
Create template for year-based pages.

## Sprint 10: Stamp Detail Template
Create template for individual stamp descriptions.

---

# PHASE 4: BULK CONVERSION & FINALIZATION (Sprint 11-15)

## Sprint 11-12: Bulk Page Conversion
Run conversion scripts on all pages.

## Sprint 13: CSS Compilation & Optimization
Compile all CSS into organized main.css.

## Sprint 14: Cross-Browser Testing
Test on Chrome, Firefox, Safari, Edge, mobile browsers.

## Sprint 15: Final Polish & Documentation
Final fixes and complete documentation.

---

# UTILITY SCRIPTS

## Link Validator

**File:** `scripts/validate-links.js`
```javascript
/**
 * Validate internal links across all HTML files
 */

const fs = require('fs');
const path = require('path');

const rootPath = '.';
const allFiles = new Set();
const brokenLinks = [];

function collectFiles(dir, relativeTo = rootPath) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        if (item.startsWith('.')) return;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            collectFiles(fullPath, relativeTo);
        } else if (item.endsWith('.html')) {
            const relPath = path.relative(relativeTo, fullPath);
            allFiles.add(relPath);
        }
    });
}

function checkLinks(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        if (item.startsWith('.')) return;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            checkLinks(fullPath);
        } else if (item.endsWith('.html')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const linkMatches = content.matchAll(/href="([^"#]+)"/gi);
            
            for (const match of linkMatches) {
                const href = match[1];
                
                if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
                    continue;
                }
                
                const fileDir = path.dirname(fullPath);
                const targetPath = path.normalize(path.join(fileDir, href));
                const relTarget = path.relative(rootPath, targetPath);
                
                if (!allFiles.has(relTarget) && !fs.existsSync(targetPath)) {
                    brokenLinks.push({
                        file: fullPath,
                        link: href,
                        expected: relTarget
                    });
                }
            }
        }
    });
}

collectFiles(rootPath);
checkLinks(rootPath);

if (brokenLinks.length === 0) {
    console.log('✓ All internal links are valid!');
} else {
    console.log(`Found ${brokenLinks.length} broken links:\n`);
    brokenLinks.forEach(({file, link, expected}) => {
        console.log(`File: ${file}`);
        console.log(`  Broken link: ${link}\n`);
    });
}
```

## Bulk Find & Replace

**File:** `scripts/bulk-replace.js`
```javascript
/**
 * Bulk Find and Replace across HTML files
 * Usage: node scripts/bulk-replace.js "old-text" "new-text" "./folder"
 */

const fs = require('fs');
const path = require('path');

const [,, searchText, replaceText, targetFolder = '.'] = process.argv;

if (!searchText || replaceText === undefined) {
    console.log('Usage: node bulk-replace.js "search" "replace" [folder]');
    process.exit(1);
}

function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    let count = 0;
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.')) {
            count += processDirectory(fullPath);
        } else if (item.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(searchText)) {
                content = content.split(searchText).join(replaceText);
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
                count++;
            }
        }
    });
    
    return count;
}

const totalUpdated = processDirectory(targetFolder);
console.log(`\nTotal files updated: ${totalUpdated}`);
```

---

# IMPORTANT REMINDERS

## Content Migration Checklist

Before starting any design work, ensure all content is copied:

```bash
# Quick verification - run from project root
echo "=== Checking copied folders ==="
for folder in country description exhibitions topics year; do
    if [ -d "$folder" ]; then
        echo "✓ $folder/ exists ($(find $folder -name '*.html' | wc -l) HTML files)"
    else
        echo "✗ $folder/ MISSING - need to copy from old site!"
    fi
done

echo ""
echo "=== Root HTML files ==="
ls -1 *.html 2>/dev/null | wc -l
echo "HTML files in root"
```

## For the Developer

### DO ✅
- Create completely NEW, modern designs
- Follow the design system in `docs/design-system.md`
- Use CSS variables from `css/variables.css`
- Preserve ALL content from old pages
- Keep image paths exactly as they are
- Test on multiple devices and browsers
- Commit after each major task

### DON'T ❌
- Don't copy HTML/CSS structure from old site
- Don't replicate the old design
- Don't delete any existing content
- Don't change image file locations
- Don't use the old styling - create fresh, modern look

### Naming Convention Reminder

| Prefix | Meaning |
|--------|---------|
| `old-*` | Reference from old site - DO NOT COPY |
| `OLD-SITE-*` | Analysis folder - FOR REFERENCE ONLY |
| `.paleophilatelieOldSiteForReference/` | Original old site - READ ONLY |

## Design References

Study these sites for inspiration:
1. **National Geographic** - Clean layout, strong imagery, professional feel
2. **2-Clicks-Stamps** - Stamp-specific design patterns, catalogue organization

## Questions?

If anything is unclear about the requirements or design direction, ask before implementing.

---

*Document Version: 2.0*  
*Last Updated: January 2026*  
*Created by: Softechinfra*
