const fs = require('fs');
const path = require('path');

const filesToUpdate = ['index.html', 'about.html', 'skills.html', 'projects.html', 'blog.html', 'contact.html'];

const newFontLink = `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`;
const oldFontRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^>]*>/g;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Update Resume.pdf path
    content = content.replace(/href="Resume.pdf"/g, 'href="assets/Resume.pdf"');
    
    // 2. Update Fonts
    content = content.replace(oldFontRegex, newFontLink);

    // 3. Remove Particles HTML
    content = content.replace(/<!-- Animated Particles -->[\s\S]*?<\/div>[\s\S]*?<\/div>/, '<div class="grain-overlay"></div>');

    // 4. Transform generic Tailwind classes to Neo-Brutalist
    // Backgrounds and colors
    content = content.replace(/bg-gradient-to-br from-blue-500 to-purple-600/g, 'bg-accent text-dark border-2 border-border brutal-shadow');
    content = content.replace(/bg-gradient-to-r from-blue-600 to-purple-600/g, 'bg-accent text-dark border-2 border-border brutal-shadow');
    content = content.replace(/bg-blue-600/g, 'bg-accent text-dark border-2 border-border brutal-shadow-sm');
    content = content.replace(/text-blue-400/g, 'text-accent');
    content = content.replace(/border-blue-500\/20/g, 'border-border');
    content = content.replace(/bg-blue-500\/10/g, 'bg-surface');
    
    // Hover states
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-primary');
    content = content.replace(/hover:text-blue-400/g, 'hover:text-accent');
    content = content.replace(/hover:border-blue-400/g, 'hover:border-accent');
    
    // Borders
    content = content.replace(/border-gray-800/g, 'border-border');
    content = content.replace(/border-gray-700/g, 'border-border');
    content = content.replace(/glass/g, 'brutal-card');
    
    // Typography headings
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span.font-bold'];
    content = content.replace(/class="(.*?)text-5xl(.*?)"/g, 'class="$1text-5xl font-heading$2"');
    content = content.replace(/class="(.*?)text-4xl(.*?)"/g, 'class="$1text-4xl font-heading$2"');
    content = content.replace(/class="(.*?)text-3xl(.*?)"/g, 'class="$1text-3xl font-heading$2"');
    content = content.replace(/class="(.*?)text-2xl(.*?)"/g, 'class="$1text-2xl font-heading$2"');

    // Hard corners
    content = content.replace(/rounded-full/g, 'rounded-none');
    content = content.replace(/rounded-lg/g, 'rounded-none');
    content = content.replace(/rounded-md/g, 'rounded-none');
    content = content.replace(/rounded/g, 'rounded-none');

    // Shadows
    content = content.replace(/shadow-lg/g, 'brutal-shadow');
    content = content.replace(/shadow-blue-500\/30/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("HTML files updated for Neo-Brutalism.");

// Update main.js to remove particle generation
const mainJsPath = path.join(__dirname, '..', 'js', 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');
mainJs = mainJs.replace(/\/\/ Particle Animation[\s\S]*?createParticles\(\);/, '');
mainJs = mainJs.replace(/el\.closest\('\.particle'\) \|\| /g, '');
fs.writeFileSync(mainJsPath, mainJs, 'utf8');
console.log("main.js updated (particles removed).");
