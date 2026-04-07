const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'skills.html', 'projects.html', 'blog.html', 'contact.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Backgrounds
    content = content.replace(/style="background-color:\s*#[0-9a-fA-F]+;"/g, '');
    content = content.replace(/grid-bg/g, '');
    
    // 2. Ambient Orbs (replacing grain-overlay)
    const orbsHtml = `
        <div class="ambient-container">
            <div class="orb orb-1"></div>
            <div class="orb orb-2"></div>
            <div class="orb orb-3"></div>
            <div class="orb orb-4"></div>
        </div>
    `;
    if (content.includes('grain-overlay')) {
        content = content.replace(/<div class="grain-overlay"><\/div>/g, orbsHtml);
    } else if (!content.includes('ambient-container')) {
        content = content.replace(/<body[^>]*>/, `$&$\n${orbsHtml}`);
    }

    // 3. Navigation elements
    content = content.replace(/nav class="([^"]*)brutal-card([^"]*)"/g, 'nav class="$1glass-nav$2"');
    
    // Logo
    content = content.replace(/w-8 h-8 bg-accent text-dark border-2 border-border brutal-shadow rounded-none-none/g, 
        'w-8 h-8 glass-panel border border-white/20 rounded-full text-white');
    content = content.replace(/w-8 h-8 bg-accent text-dark border-2 border-white\/10 brutal-shadow rounded-[a-zA-Z0-9-]+/g, 
        'w-8 h-8 glass-panel border border-white/20 rounded-full text-white'); // handling multiple runs

    // 4. Buttons globally
    content = content.replace(/bg-accent text-dark border-2 border-border brutal-shadow-sm/g, 'glass-button-primary text-black');
    content = content.replace(/bg-accent text-dark border-2 border-white\/10 brutal-shadow-sm/g, 'glass-button-primary text-black');
    content = content.replace(/hover:bg-primary/g, ''); // we handle hover in CSS for glass buttons now

    // Brutal card specific replace 
    content = content.replace(/brutal-card/g, 'glass-panel rounded-3xl p-6'); // default padding
    content = content.replace(/brutal-shadow-sm/g, 'shadow-lg');
    content = content.replace(/brutal-shadow/g, 'shadow-xl');

    // Buttons like Resume and Social Links
    content = content.replace(/w-12 h-12 rounded-none-none glass-panel rounded-3xl p-6/g, 'w-12 h-12 rounded-full glass-button');
    content = content.replace(/w-12 h-12 rounded-[a-zA-Z0-9-]+ glass-panel rounded-[a-zA-Z0-9-]+ p-6/g, 'w-12 h-12 rounded-full glass-button');

    // General replacements for shapes and colors
    content = content.replace(/rounded-none-none/g, 'rounded-full');
    content = content.replace(/rounded-none/g, 'rounded-2xl');
    
    content = content.replace(/border-border/g, 'border-white/10');
    content = content.replace(/bg-surface/g, 'bg-white/5');
    
    // Project and Skill cards (brutal overrides)
    content = content.replace(/skill-card/g, 'glass-panel rounded-3xl p-6');
    content = content.replace(/project-card/g, 'glass-panel rounded-3xl overflow-hidden');

    // Clean up inline styles that might conflict or use text-accent
    content = content.replace(/text-accent/g, 'text-blue-400');
    
    // Check if project cards had p-6 accidentally stripped or duplicated
    // Form inputs
    content = content.replace(/bg-surface border-2 border-border/g, 'glass-panel border-white/10 text-white rounded-2xl');

    fs.writeFileSync(filePath, content);
});
console.log('Refactored liquid glass HTML elements');
