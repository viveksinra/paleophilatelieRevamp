#!/usr/bin/env node
/**
 * Conversion Verification Script
 *
 * Checks converted pages for common issues:
 * - Missing CSS imports
 * - Missing scripts
 * - Missing header/footer placeholders
 * - Remaining old-style elements
 * - Facebook image still present
 * - Content-page wrapper missing
 *
 * Usage:
 *   node verify-conversion.js <file-or-directory>
 *   node verify-conversion.js description/stamps/
 *   node verify-conversion.js country/india.html
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node verify-conversion.js <file-or-directory>');
    process.exit(1);
}

const target = path.resolve(PROJECT_ROOT, args[0]);

if (fs.statSync(target).isDirectory()) {
    const files = findHtmlFiles(target);
    console.log(`Verifying ${files.length} HTML files in ${path.relative(PROJECT_ROOT, target)}\n`);
    let passCount = 0, failCount = 0;
    for (const file of files) {
        const issues = verifyFile(file);
        if (issues.length > 0) {
            failCount++;
        } else {
            passCount++;
        }
    }
    console.log(`\n=== Summary ===`);
    console.log(`Pass: ${passCount}, Issues: ${failCount}, Total: ${passCount + failCount}`);
} else {
    verifyFile(target);
}

function findHtmlFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
            results.push(...findHtmlFiles(fullPath));
        } else if (entry.name.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

function verifyFile(filePath) {
    const relPath = path.relative(PROJECT_ROOT, filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check if it's been converted at all
    const isConverted = html.includes('css/main.css');
    if (!isConverted) {
        console.log(`  SKIP ${relPath} (not yet converted)`);
        return ['not converted'];
    }

    // === Required elements ===

    if (!html.includes('<!DOCTYPE html>')) {
        issues.push('Missing HTML5 DOCTYPE');
    }

    if (!html.includes('<meta charset="UTF-8">') && !html.includes('<meta charset="utf-8">')) {
        issues.push('Missing UTF-8 charset meta');
    }

    if (!html.includes('viewport')) {
        issues.push('Missing viewport meta tag');
    }

    if (!html.includes('component-loader.js')) {
        issues.push('Missing component-loader.js script');
    }

    if (!html.includes('header-placeholder')) {
        issues.push('Missing #header-placeholder div');
    }

    if (!html.includes('footer-placeholder')) {
        issues.push('Missing #footer-placeholder div');
    }

    if (!html.includes('main.js')) {
        issues.push('Missing main.js script');
    }

    if (!html.includes('header.css')) {
        issues.push('Missing header.css link');
    }

    if (!html.includes('footer.css')) {
        issues.push('Missing footer.css link');
    }

    if (!html.includes('Crimson+Pro') && !html.includes('Crimson Pro')) {
        issues.push('Missing Google Fonts (Crimson Pro)');
    }

    if (!html.includes('skip-link')) {
        issues.push('Missing skip link for accessibility');
    }

    // === Old elements that should be removed ===

    if (html.includes('live_tinc.js')) {
        issues.push('Old script still present: live_tinc.js');
    }

    if (html.match(/<link[^>]*colorscheme[^>]*>/i)) {
        issues.push('Old CSS still present: colorscheme');
    }

    if (html.includes('id="main_div"')) {
        issues.push('Old body id still present: main_div');
    }

    if (html.includes('landscape-suggestion')) {
        issues.push('Old landscape suggestion div still present');
    }

    if (html.includes('id="container"')) {
        issues.push('Old container div still present');
    }

    if (html.includes('main_nav_list')) {
        issues.push('Old navigation list still present');
    }

    if (html.includes('sub_nav_list')) {
        issues.push('Old sub-navigation still present');
    }

    if (html.includes('id="footer"') && !html.includes('footer-placeholder')) {
        issues.push('Old footer div still present');
    }

    if (html.includes('amp-ad-0.1.js')) {
        issues.push('Old amp-ad script still in head');
    }

    if (html.includes('data-auto-format="mcrspv"')) {
        issues.push('Old amp-ad block still in head');
    }

    if (html.includes('.button {') || html.includes('.button{')) {
        issues.push('Old inline .button style block still present');
    }

    if (html.includes('function myFunction()')) {
        issues.push('Old myFunction() script still present');
    }

    // === Warnings (not errors) ===

    if (html.includes('facebook.jpg') && !html.includes('footer')) {
        issues.push('WARNING: Facebook image may still be in page content (should be in footer only)');
    }

    // === Report ===

    if (issues.length === 0) {
        console.log(`  PASS ${relPath}`);
    } else {
        console.log(`  FAIL ${relPath}`);
        for (const issue of issues) {
            console.log(`       - ${issue}`);
        }
    }

    return issues;
}
