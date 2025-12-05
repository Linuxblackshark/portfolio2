/* ========================================
   FUTURISTIC PORTFOLIO - JAVASCRIPT
   c0mrade | Cybersecurity & Full-Stack Dev
   ======================================== */

// ===== TYPEWRITER ANIMATION =====
class TypeWriter {
    constructor(elementId, words, speed = 100, delay = 500) {
        this.element = document.getElementById(elementId);
        this.words = words;
        this.speed = speed;
        this.delay = delay;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const word = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = word.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = word.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.charIndex === word.length) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = this.speed;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== PARTICLE EFFECT =====
class ParticleSystem {
    constructor(containerId, particleCount = 50) {
        this.container = document.getElementById(containerId);
        this.particleCount = particleCount;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const tx = (Math.random() - 0.5) * 100;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--duration', (Math.random() * 6 + 4) + 's');
        
        this.container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, (Math.random() * 6 + 4) * 1000);
    }
}

// ===== THEME TOGGLE =====
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        this.isDarkMode = !localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.toggle.addEventListener('change', () => this.toggleTheme());
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    applyTheme() {
        const body = document.body;
        const icon = document.querySelector('.toggle-icon');
        
        if (this.isDarkMode) {
            body.classList.remove('light-mode');
            this.toggle.checked = false;
            icon.textContent = '🌙';
        } else {
            body.classList.add('light-mode');
            this.toggle.checked = true;
            icon.textContent = '☀️';
        }
    }
}

// ===== SMOOTH SCROLL WITH PARALLAX =====
class ScrollManager {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.initParallax();
    }

    initParallax() {
        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        this.parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            const multiplier = 0.5;
            el.style.transform = `translateY(${distance * multiplier}px)`;
        });
    }
}

// ===== SCROLL REVEAL ANIMATION =====
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.reveal());
        // Initial check
        this.reveal();
    }

    reveal() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight && elementBottom > 0) {
                element.classList.add('revealed');
            }
        });
    }
}

// ===== SMOOTH ANCHOR LINK SCROLLING =====
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== INTERACTIVE HOVER EFFECTS =====
class HoverEffects {
    constructor() {
        this.glassCards = document.querySelectorAll('.glass-card');
        this.projectCards = document.querySelectorAll('.project-card');
        this.skillBadges = document.querySelectorAll('.skill-badge');
        this.init();
    }

    init() {
        this.setupCardHover();
        this.setupBadgeHover();
    }

    setupCardHover() {
        const cards = [...this.glassCards, ...this.projectCards];
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    setupBadgeHover() {
        this.skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = '';
                }, 10);
            });
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * 5;
        const rotateY = (x / rect.width - 0.5) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    handleMouseEnter(e, card) {
        card.style.transition = 'all 0.3s ease';
    }

    handleMouseLeave(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.transition = 'all 0.6s ease';
    }
}

// ===== ACTIVE NAV LINK TRACKING =====
class NavLinkTracker {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        let current = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== GLITCH TEXT EFFECT =====
class GlitchEffect {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        this.originalText = this.element.textContent;
        this.setupGlitch();
    }

    setupGlitch() {
        this.element.addEventListener('mouseenter', () => this.triggerGlitch());
    }

    triggerGlitch() {
        const chars = 'ｦｧｳｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789!@#$%^&*';
        let iterations = 0;

        const glitchInterval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return this.originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= this.originalText.length) {
                clearInterval(glitchInterval);
                this.element.textContent = this.originalText;
            }

            iterations += 1 / 3;
        }, 50);
    }
}

// ===== PERFORMANCE OPTIMIZED SCROLL LISTENER =====
class OptimizedScroll {
    constructor() {
        this.ticking = false;
        this.lastScrollY = 0;
        window.addEventListener('scroll', () => this.requestTick());
    }

    requestTick() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }

    update() {
        this.lastScrollY = window.pageYOffset;
        this.ticking = false;
    }
}

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-lazy]').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== KEYBOARD SHORTCUTS =====
class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Alt + L for Light Mode Toggle
            if (e.altKey && e.key === 'l') {
                document.getElementById('theme-toggle').click();
            }
            // Alt + H for Home
            if (e.altKey && e.key === 'h') {
                window.location.hash = '#hero';
            }
        });
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🔐 c0mrade Portfolio Loaded', 'color: #00ffff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');

    // Initialize all systems
    new TypeWriter('typewriter', [
        '> c0mrade',
        '> Red Team Trainee',
        '> Cybersecurity Expert',
        '> Full-Stack Developer',
        '> Ethical Hacker',
        '> Security Researcher'
    ], 80, 1500);

    new ParticleSystem('particles', 60);
    new ThemeToggle();
    new ScrollManager();
    new ScrollReveal();
    new SmoothScroll();
    new HoverEffects();
    new NavLinkTracker();
    new GlitchEffect('typewriter');
    new OptimizedScroll();
    new LazyLoader();
    new KeyboardShortcuts();

    // Add data-reveal attributes to skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        el.setAttribute('data-reveal', 'true');
    });

    // Add data-reveal attributes to project cards
    document.querySelectorAll('.project-card').forEach(el => {
        el.setAttribute('data-reveal', 'true');
    });

    // Add custom animations on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fade-in-up 1s ease-out';
    }

    // Performance monitoring (optional)
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #84cc16; font-size: 12px;');
    });

    // Mobile menu optimization
    if (window.innerWidth < 768) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                // Close menu or perform mobile-specific actions
            });
        });
    }

    // Easter egg
    let keySequence = '';
    document.addEventListener('keydown', (e) => {
        keySequence += e.key;
        if (keySequence.includes('c0mrade')) {
            console.log('%c🎉 EASTER EGG UNLOCKED! Welcome to the cyber realm, fellow hacker!', 
                'color: #ff00ff; font-size: 14px; font-weight: bold; text-shadow: 0 0 20px #ff00ff;');
            keySequence = '';
        }
    });
});

// Performance enhancement - Reduce animation on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.animationDuration = '0.01ms !important';
}

// Log when user interacts
document.addEventListener('click', () => {
    if (Math.random() < 0.01) {
        console.log('%c💻 System Online - Awaiting Command', 'color: #00ffff; font-size: 12px;');
    }
});
