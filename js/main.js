// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Typing Effect
const phrases = ['AI & Data Science Engineer', 'Full-Stack Developer', 'ML Practitioner', 'Data Architect'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Initialize typing effect
if (typingElement) {
    setTimeout(typeEffect, 1000);
}



// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
        navbar.classList.add('bg-slate-900/90');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.remove('bg-slate-900/90');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, article, .glass').forEach((el) => {
    // skip elements that are navbars or in the hero so they don't break design
    if (el.tagName.toLowerCase() === 'nav' || el.closest('#navbar') || el.closest('#mobile-menu') || el.classList.contains('scroll-track') || el.tagName.toLowerCase() === 'a') return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set active navigation link based on current path
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === './')) {
            link.classList.add('active');
            link.classList.remove('text-gray-300');
            link.classList.add('text-white');
        }
    });
});

// Admin Mode Logic
document.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.getElementById('admin-btn');
    if (!adminBtn) return;

    adminBtn.addEventListener('click', () => {
        // If already in edit mode, ignore
        if (document.body.classList.contains('edit-mode-active')) return;

        const storedPwdHash = adminBtn.getAttribute('data-admin-pwd');
        const userPwd = prompt("Enter Admin Password:");
        
        if (userPwd === null) return; // cancelled

        if (btoa(userPwd) === storedPwdHash) {
            activateEditMode();
        } else {
            alert("Incorrect password.");
        }
    });

    function activateEditMode() {
        document.body.classList.add('edit-mode-active');
        
        // Find all text-bearing elements
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, li, button, strong');
        elements.forEach(el => {
            // Text node check
            const hasText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0);
            if(hasText) {
                // ignore navbar and admin elements
                if (el.closest('nav') || el.closest('#admin-toolbar')) return;
                el.setAttribute('contenteditable', 'true');
                el.style.outline = '1px dashed #a855f7';
                el.style.outlineOffset = '2px';
            }
        });

        // Inject Toolbar
        const toolbar = document.createElement('div');
        toolbar.id = 'admin-toolbar';
        toolbar.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] glass px-6 py-3 rounded-full flex gap-4 items-center shadow-lg border border-purple-500/50';
        toolbar.innerHTML = `
            <span class="text-purple-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2"><i class="fas fa-edit"></i> Edit Mode</span>
            <div class="h-4 w-[1px] bg-gray-600 mx-2"></div>
            <button id="admin-save" class="text-sm px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition font-medium">Save Page</button>
            <button id="admin-pwd" class="text-sm px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium">Change Password</button>
            <button id="admin-exit" class="text-sm px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition font-medium">Exit</button>
        `;
        document.body.appendChild(toolbar);

        // Toolbar Handlers
        document.getElementById('admin-exit').addEventListener('click', () => {
            if(confirm("Exit without saving?")) {
                location.reload();
            }
        });

        document.getElementById('admin-pwd').addEventListener('click', () => {
            const newPwd = prompt("Enter new password:");
            if (newPwd && newPwd.trim().length > 0) {
                adminBtn.setAttribute('data-admin-pwd', btoa(newPwd));
                alert("Password updated! It will be permanently changed when you 'Save Page'.");
            }
        });

        document.getElementById('admin-save').addEventListener('click', async () => {
            // Cleanup UI
            toolbar.remove();
            
            // Remove contenteditable and outlines
            document.querySelectorAll('[contenteditable="true"]').forEach(el => {
                el.removeAttribute('contenteditable');
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
            document.body.classList.remove('edit-mode-active');

            // Save via Local Backend
            const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
            const currentFile = window.location.pathname.split("/").pop() || 'index.html';
            
            try {
                const response = await fetch('http://localhost:3000/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: currentFile, content: htmlContent })
                });

                if (response.ok) {
                    alert("Page saved perfectly! Changes are now permanent.");
                } else {
                    throw new Error("Server rejected save");
                }
            } catch (err) {
                console.error(err);
                alert("Could not connect to local save server. Make sure you are running 'node js/server.js' in the terminal!");
            }
            
            // Reactivate for further edits
            activateEditMode();
        });
    }
});
