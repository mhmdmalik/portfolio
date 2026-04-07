const fs = require('fs');
const path = require('path');
const files = ['index.html', 'about.html', 'skills.html', 'projects.html', 'blog.html', 'contact.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/bg-accent text-dark border-2 border-white\/10 shadow-xl/g, 'glass-panel text-white');
    content = content.replace(/bg-accent text-dark border-2 border-border brutal-shadow/g, 'glass-panel text-white');
    content = content.replace(/bg-surface/g, 'glass-panel');

    fs.writeFileSync(filePath, content);
});
console.log('Cleanup 2 completed');
