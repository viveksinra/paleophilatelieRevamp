/**
 * OLD CONTENT EXTRACTOR
 * Purpose: Extract content (text, links) from old site for reference
 * Output: Goes to docs/OLD-SITE-EXTRACTED/ - FOR REFERENCE ONLY
 *
 * WARNING: These extractions are to understand WHAT CONTENT exists,
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
referenceDoc += `> **IMPORTANT: FOR CONTENT REFERENCE ONLY**\n\n`;
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

// Also copy style.css if it exists
const stylePath = path.join(OLD_SITE_PATH, 'style.css');
if (fs.existsSync(stylePath)) {
    fs.copyFileSync(stylePath, path.join(OUTPUT_PATH, 'old-style.css'));
    referenceDoc += `### old-style.css\n`;
    referenceDoc += `Additional old stylesheet. Review for reference only.\n\n`;
}

// Extract country list (for new navigation)
const countryFolder = path.join(OLD_SITE_PATH, 'country');
if (fs.existsSync(countryFolder)) {
    const countries = fs.readdirSync(countryFolder)
        .filter(f => f.endsWith('.html'))
        .map(f => ({
            filename: f,
            name: f.replace('.html', '').replace(/_/g, ' ').replace(/-/g, ' ')
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

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
    referenceDoc += `List of all year pages (${years.length} years: ${years[0]} - ${years[years.length - 1]}). Use for new year navigation.\n\n`;
}

// Extract exhibition list
const exhibitionFolder = path.join(OLD_SITE_PATH, 'exhibitions');
if (fs.existsSync(exhibitionFolder)) {
    const exhibitions = fs.readdirSync(exhibitionFolder)
        .filter(f => f.endsWith('.html'))
        .map(f => ({
            filename: f,
            name: f.replace('.html', '').replace(/_/g, ' ').replace(/-/g, ' ')
        }));

    fs.writeFileSync(
        path.join(OUTPUT_PATH, 'old-exhibition-list.json'),
        JSON.stringify(exhibitions, null, 2)
    );

    referenceDoc += `### old-exhibition-list.json\n`;
    referenceDoc += `List of all exhibition pages (${exhibitions.length} exhibitions).\n\n`;
}

// Extract topics list
const topicsFolder = path.join(OLD_SITE_PATH, 'topics');
if (fs.existsSync(topicsFolder)) {
    const topics = fs.readdirSync(topicsFolder)
        .filter(f => f.endsWith('.html'))
        .map(f => ({
            filename: f,
            name: f.replace('.html', '').replace(/_/g, ' ').replace(/-/g, ' ')
        }));

    fs.writeFileSync(
        path.join(OUTPUT_PATH, 'old-topics-list.json'),
        JSON.stringify(topics, null, 2)
    );

    referenceDoc += `### old-topics-list.json\n`;
    referenceDoc += `List of all topic pages (${topics.length} topics).\n\n`;
}

// Extract description categories
const descriptionFolder = path.join(OLD_SITE_PATH, 'description');
if (fs.existsSync(descriptionFolder)) {
    const descCategories = fs.readdirSync(descriptionFolder)
        .filter(f => fs.statSync(path.join(descriptionFolder, f)).isDirectory());

    const descriptionData = {};
    descCategories.forEach(cat => {
        const catPath = path.join(descriptionFolder, cat);
        const files = fs.readdirSync(catPath)
            .filter(f => f.endsWith('.html'));
        descriptionData[cat] = {
            count: files.length,
            sampleFiles: files.slice(0, 5)
        };
    });

    fs.writeFileSync(
        path.join(OUTPUT_PATH, 'old-description-categories.json'),
        JSON.stringify(descriptionData, null, 2)
    );

    referenceDoc += `### old-description-categories.json\n`;
    referenceDoc += `Description page categories: ${descCategories.join(', ')}.\n\n`;
}

// Save reference document
fs.writeFileSync(path.join(OUTPUT_PATH, 'README.md'), referenceDoc);

console.log('Old content extraction complete!');
console.log(`Output saved to: ${OUTPUT_PATH}/`);
console.log('\nRemember: Use these for CONTENT reference only - create NEW designs!');
