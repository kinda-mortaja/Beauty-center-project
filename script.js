// ===== Page Navigation =====
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('mobileToggle').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        observeElements();
        if (page === 'home') startCounters();
    }, 120);
}

// ===== Mobile Menu =====
function toggleMobile() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('mobileToggle').classList.toggle('active');
}

// ===== Navbar Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    scrollTop.classList.toggle('show', window.scrollY > 500);
});

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ===== Scroll Animations =====
function observeElements() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ===== Counters =====
function animateCounter(id, target, suffix = '+') {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
    }, 28);
}
function startCounters() {
    animateCounter('counter1', 5000, '+');
    animateCounter('counter2', 10, '+');
    animateCounter('counter3', 50, '+');
    animateCounter('counter4', 25, '+');
}

// ===== Form Submit =====
function handleSubmit(e) {
    e.preventDefault();
    const msg = document.getElementById('successMsg');
    msg.classList.add('show');
    e.target.reset();
    setTimeout(() => msg.classList.remove('show'), 5000);
}

// ===== Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 5 + 3;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 12 + 8}s;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.4 + 0.1};
            background: ${Math.random() > 0.5 ? 'rgba(255,255,255,0.4)' : 'rgba(240,201,122,0.5)'};
        `;
        container.appendChild(p);
    }
}

// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1600);
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    startCounters();
    createParticles();
});
