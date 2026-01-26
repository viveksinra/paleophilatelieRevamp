/**
 * Component Loader
 * Dynamically loads HTML components into pages
 */

(function() {
    'use strict';

    const componentCache = {};

    /**
     * Get the base path for components based on current page location
     */
    function getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;

        if (depth <= 0) return '';
        return '../'.repeat(depth);
    }

    /**
     * Load a component by name
     */
    async function loadComponent(name) {
        if (componentCache[name]) {
            return componentCache[name];
        }

        const basePath = getBasePath();

        // Try multiple paths to find the component
        const paths = [
            `${basePath}components/${name}/${name}.html`,
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

        console.error(`Component not found: ${name}`);
        return `<!-- Component ${name} not found -->`;
    }

    /**
     * Process template variables in component HTML
     */
    function processTemplate(html, data) {
        if (!data) return html;

        return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });
    }

    /**
     * Initialize all components on the page
     */
    async function initComponents() {
        const componentElements = document.querySelectorAll('[data-component]');

        const loadPromises = Array.from(componentElements).map(async (element) => {
            const componentName = element.getAttribute('data-component');
            const componentData = element.dataset;

            let html = await loadComponent(componentName);
            html = processTemplate(html, componentData);

            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Replace the placeholder with the actual component
            while (temp.firstChild) {
                element.parentNode.insertBefore(temp.firstChild, element);
            }
            element.parentNode.removeChild(element);
        });

        await Promise.all(loadPromises);

        // Load component-specific CSS
        await loadComponentStyles();

        // Dispatch event when all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    /**
     * Load CSS files for loaded components
     */
    async function loadComponentStyles() {
        const loadedComponents = Object.keys(componentCache);
        const basePath = getBasePath();

        for (const name of loadedComponents) {
            const cssPath = `${basePath}components/${name}/${name}.css`;

            // Check if CSS already loaded
            if (document.querySelector(`link[href="${cssPath}"]`)) {
                continue;
            }

            try {
                const response = await fetch(cssPath, { method: 'HEAD' });
                if (response.ok) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = cssPath;
                    document.head.appendChild(link);
                }
            } catch (e) {
                // CSS file doesn't exist, that's okay
            }
        }
    }

    /**
     * Load component-specific JavaScript
     */
    async function loadComponentScripts() {
        const loadedComponents = Object.keys(componentCache);
        const basePath = getBasePath();

        for (const name of loadedComponents) {
            const jsPath = `${basePath}components/${name}/${name}.js`;

            // Check if script already loaded
            if (document.querySelector(`script[src="${jsPath}"]`)) {
                continue;
            }

            try {
                const response = await fetch(jsPath, { method: 'HEAD' });
                if (response.ok) {
                    const script = document.createElement('script');
                    script.src = jsPath;
                    document.body.appendChild(script);
                }
            } catch (e) {
                // JS file doesn't exist, that's okay
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

    // After components loaded, load their scripts
    document.addEventListener('componentsLoaded', loadComponentScripts);

    // Expose for manual initialization
    window.ComponentLoader = {
        load: loadComponent,
        init: initComponents,
        getBasePath: getBasePath
    };
})();
