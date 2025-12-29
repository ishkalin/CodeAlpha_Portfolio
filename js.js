// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links (accounts for fixed navbar)
function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetPos = target.getBoundingClientRect().top + window.scrollY;
    const scrollTo = Math.max(targetPos - navHeight - 12, 0);
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        e.preventDefault();
        smoothScrollTo(href);
        // close mobile nav if open
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        // update URL hash without jumping
        history.pushState(null, '', href);
    });
});

// If page loads with a hash, scroll to it with offset
window.addEventListener('load', () => {
    if (location.hash) {
        setTimeout(() => smoothScrollTo(location.hash), 80);
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Animate Skill Bars on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, observerOptions);
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add Fade-in Animation for Project Cards
const projectCards = document.querySelectorAll('.project-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    fadeInObserver.observe(card);
});

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    revealObserver.observe(section);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

console.log('Portfolio loaded successfully!');

// Resume Download Functionality
const downloadResumeButtons = document.querySelectorAll('#downloadResume, #downloadResumeHero');

downloadResumeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        generateResumePDF();
    });
});

function generateResumePDF() {
    // Create resume content
    const resumeContent = `
NILAKSHI GUPTA
Greater Noida, Uttar Pradesh, India
Email: pg741154@gmail.com | Phone: +91-7897677067
LinkedIn: linkedin.com/in/nilakshi-gupta

═══════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════
Software Developer with expertise in Java, MySQL, Web Development, and CRM systems. 
Skilled in full stack development, JDBC, Object-Oriented Programming, and Agile methodologies. 
Published researcher with strong project management and team leadership abilities. 
IEEE member with hands-on experience in software engineering and database management.

═══════════════════════════════════════════════════════════

TECHNICAL SKILLS
═══════════════════════════════════════════════════════════
Programming: Java, C, JavaScript, HTML5, CSS, SQL, OOP, Software Development

Database: MySQL, JDBC, SQL, Database Design, RDBMS, Query Optimization, 
Data Modeling, Database Management

Tools & Technologies: Version Control (GitHub), SDLC, Software Engineering

Networking: CCNA, Cisco Routing and Switching, Network Security, 
Cybersecurity, TCP/IP, Network Administration

Soft Skills: Project Management, Team Leadership, Problem Solving, 
Communication, Collaboration, Analytical Skills

═══════════════════════════════════════════════════════════

EDUCATION
═══════════════════════════════════════════════════════════
Master of Computer Applications (MCA)
Galgotias University
September 2024 - September 2026

Bachelor of Computer Applications (BCA)
Babu Banarsi Das University
October 2021 - July 2024

═══════════════════════════════════════════════════════════

PROJECTS
═══════════════════════════════════════════════════════════

CRM System for Client Relationship Management
Technologies: Java, JDBC, MySQL, SQL, OOP

• Developed Customer Relationship Management application using Java and MySQL 
  for client data management, lead tracking, and sales pipeline automation
• Designed database schema and implemented contact management, lead pipeline 
  tracking, and analytics dashboard using JDBC connectivity
• Optimized SQL queries and applied database indexing reducing data retrieval 
  time by 40%
• Applied Object-Oriented Programming and MVC design pattern for scalable architecture
• Implemented CRUD operations with data validation and error handling mechanisms

───────────────────────────────────────────────────────────

Database-Driven Web Applications
Technologies: HTML5, CSS, JavaScript, Java, JDBC, MySQL

• Built full stack web applications integrating HTML5, CSS, JavaScript frontend 
  with Java backend and MySQL database
• Developed CRUD functionality with form validation, user authentication, 
  and session management
• Designed normalized database schemas and wrote optimized SQL queries for 
  data integrity

═══════════════════════════════════════════════════════════

PUBLICATION
═══════════════════════════════════════════════════════════
Co-Author: "Problems Faced During the Software Development Cycle"
IJSREM Journal

• Researched software development lifecycle challenges including requirements 
  analysis, design, coding, testing, and deployment
• Proposed Agile methodologies and quality assurance practices to improve 
  development efficiency and code quality

═══════════════════════════════════════════════════════════

LEADERSHIP AND PROFESSIONAL ACTIVITIES
═══════════════════════════════════════════════════════════
IEEE Graduate Student Member - Multiple Societies
September 2024 - Present

• Active member of IEEE Computer Society, Women in Engineering, 
  Young Professionals, Education Society, Electronics Packaging Society
• Led software development teams using Agile methodologies and project 
  management techniques

═══════════════════════════════════════════════════════════

CERTIFICATIONS
═══════════════════════════════════════════════════════════
• Programming in C
• Introduction to Programming Using Java
• Cisco CCNA Routing & Switching
• Database Fundamentals
• Cybersecurity Workshop Certification

═══════════════════════════════════════════════════════════
Generated from: nilakshigupta.com
    `;

    // Create a Blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nilakshi_Gupta_Resume.txt';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Resume downloaded successfully!');
}

// Sample video's first visible frame and set hero background color
function setHeroBgFromVideo() {
    const video = document.getElementById('heroBgVideo');
    if (!video) return;

    const applyColor = (r, g, b) => {
        const hex = `rgb(${r}, ${g}, ${b})`;
        document.documentElement.style.setProperty('--hero-bg', hex);
    };

    const sampleFrame = () => {
        try {
            const w = Math.min(160, video.videoWidth || 160);
            const h = Math.min(90, video.videoHeight || 90);
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, w, h);
            const data = ctx.getImageData(0, 0, w, h).data;
            let r = 0, g = 0, b = 0, count = 0;
            // sample center area to avoid edges
            const sx = Math.floor(w * 0.25), sy = Math.floor(h * 0.25);
            const ex = Math.floor(w * 0.75), ey = Math.floor(h * 0.75);
            for (let y = sy; y < ey; y += 2) {
                for (let x = sx; x < ex; x += 2) {
                    const idx = (y * w + x) * 4;
                    r += data[idx];
                    g += data[idx + 1];
                    b += data[idx + 2];
                    count++;
                }
            }
            if (count > 0) {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                applyColor(r, g, b);
            }
            canvas.remove();
        } catch (e) {
            // CORS or read errors — fallback to default
            console.warn('Could not sample video frame:', e);
        }
    };

    if (video.readyState >= 2) {
        sampleFrame();
    } else {
        video.addEventListener('loadeddata', () => {
            // small delay to allow first frame render
            setTimeout(sampleFrame, 150);
        }, { once: true });
    }
}

// Initialize sampling on DOMContentLoaded
window.addEventListener('DOMContentLoaded', setHeroBgFromVideo);

// Scroll-to-top button behavior
(() => {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    const toggleVisibility = () => {
        if (window.scrollY > 300) btn.classList.add('show');
        else btn.classList.remove('show');
    };

    window.addEventListener('scroll', toggleVisibility);
    // initial check
    toggleVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();