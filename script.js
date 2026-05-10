(function () {
    const loader = document.getElementById('loader');

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        loader.classList.add('exit');

        setTimeout(() => {
            loader.classList.add('gone');
            document.body.style.overflow = '';
            document.getElementById('home').classList.add('loaded');

            setTimeout(startTypewriter, 400);
        }, 950);
    }, 2200);
})();

function startTypewriter() {
    const el   = document.getElementById('hero-typewriter');
    const text = 'Mahasiswa Teknik Informatika Semester 4, Fakultas Teknik UNSRAT — tertarik pada pengembangan perangkat lunak dan teknologi terbaru.';
    let i = 0;

    el.style.opacity = '1';

    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(type, 14);
        } else {
            el.classList.add('typing-done');
        }
    }
    type();
}

const progressBar = document.getElementById('progress-bar');
function updateProgress() {
    const scrollTop = window.scrollY;
    const docH      = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docH * 100) + '%';
}

const header = document.getElementById('site-header');
function updateHeader() {
    const home = document.getElementById('home');
    const headerH = header ? header.offsetHeight : 72;
    const homeBottom = home.offsetTop + home.offsetHeight - headerH;
    const isOnHome = window.scrollY < homeBottom;

    header.classList.toggle('on-home', isOnHome);
    header.classList.toggle('scrolled', window.scrollY > 20);
}

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');
function updateActiveNav() {
    let current = '';
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollMid >= top && scrollMid < bottom) current = sec.id;
    });
    if (!current) {
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
        });
    }
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

const backTop = document.getElementById('back-top');
function updateBackTop() {
    backTop.classList.toggle('show', window.scrollY > 400);
}
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
        lbImg.src = card.querySelector('img').src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

const feedback = document.getElementById('form-feedback');
document.getElementById('f-submit').addEventListener('click', () => {
    const name  = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const msg   = document.getElementById('f-msg').value.trim();
    const btn   = document.getElementById('f-submit');

    feedback.textContent = '';
    feedback.className   = '';

    if (!name || !email || !msg) {
        feedback.textContent = '⚠ Semua field harus diisi.';
        feedback.className   = 'error';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.textContent = '⚠ Format email tidak valid.';
        feedback.className   = 'error';
        return;
    }

    btn.disabled    = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
        feedback.textContent = '✓ Pesan terkirim! Terima kasih, ' + name + '.';
        feedback.className   = 'success';
        btn.textContent      = 'Send Message';
        btn.disabled         = false;
        document.getElementById('f-name').value  = '';
        document.getElementById('f-email').value = '';
        document.getElementById('f-msg').value   = '';
    }, 1200);
});

window.addEventListener('scroll', () => {
    updateProgress();
    updateHeader();
    updateActiveNav();
    updateBackTop();
}, { passive: true });

window.addEventListener('resize', updateHeader, { passive: true });

updateProgress();
updateHeader();
updateActiveNav();
updateBackTop();

(function () {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    window.addEventListener('pointermove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    function animateGlow() {
        x += (targetX - x) * 0.18;
        y += (targetY - y) * 0.18;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();
