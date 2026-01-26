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
report += `> **THIS IS OLD SITE ANALYSIS - FOR REFERENCE ONLY**\n`;
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
console.log('\nRemember: This analysis is for REFERENCE ONLY - create NEW modern designs!');
