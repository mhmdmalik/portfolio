const fs = require('fs');
const path = require('path');
const files = ['index.html', 'about.html', 'skills.html', 'projects.html', 'blog.html', 'contact.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, '..', f);
    let s = fs.readFileSync(filePath, 'utf8');
    s = s.replace(/<div class="particle"[^>]*><\/div>/g, '');
    s = s.replace(/<div id="particles"[^>]*><\/div>/g, '');
    // Some tags got duplicated or leftover closing tags
    s = s.replace(/<div class="grain-overlay"><\/div><\/div>/g, '<div class="grain-overlay"></div>');
    fs.writeFileSync(filePath, s);
});
console.log("Cleanup done.");
