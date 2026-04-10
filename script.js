// ============================================
// SHUVAH — שובה
// Interactive Business Plan Website
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ── Particles ──
    const particleField = document.getElementById('particles');
    if (particleField) {
        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            particleField.appendChild(p);
        }
    }

    // ── Navbar scroll ──
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (scroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scroll;
    }, { passive: true });

    // ── Mobile nav toggle ──
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Scroll reveal ──
    const revealElements = document.querySelectorAll(
        '.stat-card, .artist-card, .prod-card, .ticket-tier, .legal-card, ' +
        '.phase-card, .city-card, .inv-card, .sponsor-card, .step-card, ' +
        '.timeline-item, .mt-item, .tate-phase, .reason, .cost-row, ' +
        '.finance-block, .revenue-breakdown, .breakeven-box, ' +
        '.sponsor-hero, .profit-split-block, .growth-section, ' +
        '.venue-comparison, .artist-headliner, .artist-cohead, .lineup-total'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ── Bar chart animation ──
    const barFills = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--target-width', width);
                entry.target.classList.add('animated');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    barFills.forEach(bar => barObserver.observe(bar));

    // ── Number counter animation ──
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const text = el.textContent;
        const hasPrefix = text.startsWith('$');
        const hasSuffix = text.endsWith('%');
        const cleanNum = parseInt(text.replace(/[$%,]/g, ''));
        if (isNaN(cleanNum)) return;

        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(cleanNum * eased);

            let formatted = current.toLocaleString('en-US');
            if (hasPrefix) formatted = '$' + formatted;
            if (hasSuffix) formatted = formatted + '%';

            el.textContent = formatted;

            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ── Active nav highlight ──
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + current) {
                a.style.color = '#D4A843';
            }
        });
    }, { passive: true });

});
