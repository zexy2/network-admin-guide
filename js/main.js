// Network Admin Guide - Main JS
// GSAP animations and interactions

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

let animationsLoaded = false;
let currentLanguage = 'tr';

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initCustomCursor();
    initLoadingScreen();
    initParticleSystem();
    initLanguageSystem();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initProblemCardAnimations();
    initNetworkBackgroundAnimation();
    animationsLoaded = true;
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (!cursor || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Show cursors after a small delay
    setTimeout(() => {
        cursor.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    }, 1000);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor follow
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth outline follow with GSAP
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .problem-card, .stat-card, .nav-button, .lang-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-outline-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-outline-hover');
        });
    });
}

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    triggerHeroAnimations();
                }
            });
        }, 1500);
    });
}

// Floating particles
function initParticleSystem() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // GSAP animation for complex movement
    gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-50, 50)`,
        duration: duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay
    });
}

// Language switching (TR/EN)
function initLanguageSystem() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'tr';
    setLanguage(savedLang);
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update all text elements with smooth transition
    const textElements = document.querySelectorAll('[data-tr][data-en]');
    
    textElements.forEach(element => {
        const newText = lang === 'tr' ? element.getAttribute('data-tr') : element.getAttribute('data-en');
        
        // Smooth text change animation
        gsap.to(element, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                element.textContent = newText;
                gsap.to(element, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    });
    
    // Update problem links
    updateProblemLinks(lang);
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

function updateProblemLinks(lang) {
    document.querySelectorAll('.problem-link').forEach(link => {
        const trHref = link.getAttribute('data-tr-href');
        const enHref = link.getAttribute('data-en-href');
        
        if (trHref && enHref) {
            link.setAttribute('href', lang === 'en' ? enHref : trHref);
        }
    });
}

// Navbar scroll behavior
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Show navbar on scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {className: "visible", targets: navbar}
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 0.2,
                        scrollTo: {y: target, offsetY: 80},
                        ease: "power2.out"
                    });
                }
            }
        });
    });
    
    // Enhanced hero CTA button effects
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('mouseenter', () => {
            gsap.to(heroCta, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        heroCta.addEventListener('mouseleave', () => {
            gsap.to(heroCta, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        heroCta.addEventListener('click', () => {
            // Button click animation
            gsap.to(heroCta, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(heroCta, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "back.out(1.7)"
                    });
                }
            });
        });
    }
}

// Hero section
function initHeroAnimations() {
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta'], {
        opacity: 0,
        y: 50
    });
}

function triggerHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3");
    
    gsap.to('.hero::before', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Stats counter animation
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        const number = card.querySelector('.stat-number');
        const targetValue = parseInt(card.getAttribute('data-stat')) || 0;
        
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.fromTo(card, {
                    opacity: 0,
                    y: 30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                });
                
                // Animate the number counting
                gsap.fromTo(number, {
                    innerHTML: 0
                }, {
                    innerHTML: targetValue,
                    duration: 2,
                    delay: index * 0.1,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        number.innerHTML = Math.ceil(number.innerHTML);
                    }
                });
            }
        });
    });
    
    // Section animations
    document.querySelectorAll('.section').forEach((section, index) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true
            }
        });
    });
}

// Problem card animations
function initProblemCardAnimations() {
    document.querySelectorAll('.problem-card').forEach((card, index) => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Scroll-triggered entrance animation
        ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.fromTo(card, {
                    opacity: 0,
                    y: 50,
                    rotationX: 15
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    delay: (index % 3) * 0.1, // Stagger by row
                    ease: "power3.out"
                });
            }
        });
        
        // Problem number animation
        const problemNumber = card.querySelector('.problem-number');
        if (problemNumber) {
            card.addEventListener('mouseenter', () => {
                gsap.to(problemNumber, {
                    rotation: 360,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
        }
    });
}

// Background network animation (hero section)
function initNetworkBackgroundAnimation() {
    const svg = document.querySelector('.network-bg');
    if (!svg) return;
    
    // Animate network nodes (pulsing effect)
    const nodes = svg.querySelectorAll('[id^="node"]');
    nodes.forEach((node, index) => {
        gsap.to(node, {
            scale: 1.3,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
        });
    });
    
    // Animate data packets moving along connections
    animateDataPackets();
}

function animateDataPackets() {
    const svg = document.querySelector('.network-bg');
    if (!svg) return;
    
    // Define packet routes
    const routes = [
        { packet: '#packet1', path: [{x: 100, y: 100}, {x: 300, y: 150}, {x: 500, y: 100}] },
        { packet: '#packet2', path: [{x: 300, y: 150}, {x: 600, y: 350}, {x: 200, y: 300}] },
        { packet: '#packet3', path: [{x: 500, y: 100}, {x: 700, y: 200}, {x: 600, y: 350}] }
    ];
    
    routes.forEach((route, index) => {
        const packet = svg.querySelector(route.packet);
        if (!packet) return;
        
        const tl = gsap.timeline({ repeat: -1, delay: index * 2 });
        
        route.path.forEach((point, i) => {
            if (i === 0) {
                tl.set(packet, { cx: point.x, cy: point.y, opacity: 0.8 });
            } else {
                tl.to(packet, {
                    cx: point.x,
                    cy: point.y,
                    duration: 2,
                    ease: "power2.inOut"
                });
            }
        });
        
        // Fade out and restart
        tl.to(packet, {
            opacity: 0,
            duration: 0.5
        }).to(packet, {
            opacity: 0.8,
            duration: 0.5
        });
    });
}

// ========================================
// SVG ANIMATION UTILITIES
// ========================================
function createScrollTriggeredSVGAnimation(triggerElement, svgElement, animationFunc) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        end: "bottom 20%",
        once: true,
        onEnter: () => animationFunc(svgElement)
    });
}

// ========================================
// SMOOTH SCROLL POLYFILL
// ========================================
function initSmoothScroll() {
    // Enhance scroll behavior for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// ========================================
// RESPONSIVE HANDLER
// ========================================
function handleResize() {
    // Recalculate positions for mobile
    if (window.innerWidth < 768) {
        // Mobile optimizations
        ScrollTrigger.refresh();
    }
}

// Debounced resize handler
window.addEventListener('resize', debounce(handleResize, 250));

// GSAP error handling
gsap.config({ 
    nullTargetWarn: false,
    trialWarn: false 
});

// Export for external use
window.NetworkAdminGuide = {
    setLanguage,
    animationsLoaded: () => animationsLoaded,
    refreshAnimations: () => ScrollTrigger.refresh()
}; 