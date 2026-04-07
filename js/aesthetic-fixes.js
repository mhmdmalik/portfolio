const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'skills.html', 'projects.html', 'blog.html', 'contact.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix resume button readability
    content = content.replace(/text-white glass-button-primary text-black/g, 'glass-button-primary text-black');
    content = content.replace(/glass-button-primary text-black text-white/g, 'glass-button-primary text-black');
    
    fs.writeFileSync(filePath, content);
});

// Fix skills.html icons -> make them aesthetic iOS squircles
let skillsPath = path.join(__dirname, '..', 'skills.html');
if (fs.existsSync(skillsPath)) {
    let skillsContent = fs.readFileSync(skillsPath, 'utf8');
    
    // Replace rounded-full icon circles with squircles and add drop-shadow glow
    skillsContent = skillsContent.replace(/w-12 h-12 bg-blue-500\/20 rounded-full/g, 'w-14 h-14 glass-button border border-blue-500/30 rounded-2xl');
    skillsContent = skillsContent.replace(/fas fa-code text-blue-400 text-xl/g, 'fas fa-laptop-code text-blue-400 text-2xl drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]');

    skillsContent = skillsContent.replace(/w-12 h-12 bg-purple-500\/20 rounded-full/g, 'w-14 h-14 glass-button border border-purple-500/30 rounded-2xl');
    skillsContent = skillsContent.replace(/fas fa-brain text-purple-400 text-xl/g, 'fas fa-network-wired text-purple-400 text-2xl drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]');

    skillsContent = skillsContent.replace(/w-12 h-12 bg-green-500\/20 rounded-full/g, 'w-14 h-14 glass-button border border-green-500/30 rounded-2xl');
    skillsContent = skillsContent.replace(/fas fa-server text-green-400 text-xl/g, 'fas fa-database text-green-400 text-2xl drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]');

    skillsContent = skillsContent.replace(/w-12 h-12 bg-orange-500\/20 rounded-full/g, 'w-14 h-14 glass-button border border-orange-500/30 rounded-2xl');
    skillsContent = skillsContent.replace(/fas fa-database text-orange-400 text-xl/g, 'fas fa-cloud text-orange-400 text-2xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]');

    fs.writeFileSync(skillsPath, skillsContent);
}

// Fix projects.html icons -> make them aesthetic floating glass orbs
let projectsPath = path.join(__dirname, '..', 'projects.html');
if (fs.existsSync(projectsPath)) {
    let projectsContent = fs.readFileSync(projectsPath, 'utf8');

    // Instead of a giant transparent icon, create a floating glass orb in the center
    const orbReplacement = `<div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-24 h-24 glass-panel border border-white/30 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-500">
                                    <i class="$1 text-4xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></i>
                                </div>
                            </div>`;
    
    // The previous structure was: <div class="absolute inset-0 flex items-center justify-center"><i class="fas fa-graduation-cap text-6xl text-white/20 group-hover:scale-110 transition duration-500"></i></div>
    projectsContent = projectsContent.replace(/<div class="absolute inset-0 flex items-center justify-center">\s*<i class="(fas fa-[a-zA-Z-]+)[^>]*><\/i>\s*<\/div>/g, orbReplacement);

    fs.writeFileSync(projectsPath, projectsContent);
}

console.log('Fixed aesthetic icons and resume button.');
