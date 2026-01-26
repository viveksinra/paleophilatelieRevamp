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
        } else if (file.folder.startsWith('description') || file.path.includes('description')) {
            pageCategories.descriptionPages.push(analysis);
        } else if (file.path.match(/catalogue|catalog/i)) {
            pageCategories.cataloguePages.push(analysis);
        } else if (file.folder === 'topics') {
            pageCategories.topicPages.push(analysis);
        } else if (file.folder === 'exhibitions') {
            pageCategories.exhibitionPages.push(analysis);
        } else if (file.path.match(/about|contact|links|news|faq|awards|legend|resources|milestones|logo|sitemap/i)) {
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
report += `> **FOR REFERENCE ONLY** - This shows what page TYPES exist.\n`;
report += `> We will create NEW templates for each category with MODERN design.\n\n`;

Object.keys(pageCategories).forEach(category => {
    const pages = pageCategories[category];
    report += `## ${category} (${pages.length} pages)\n\n`;
    report += `**NEW Template Needed:** \`templates/${category.replace('Pages', '')}-template.html\`\n\n`;

    if (pages.length > 0) {
        report += `Sample pages from old site:\n`;
        pages.slice(0, 5).forEach(p => {
            report += `- \`${p.path}\` - "${p.title}"\n`;
        });
        if (pages.length > 5) {
            report += `- ... and ${pages.length - 5} more\n`;
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
