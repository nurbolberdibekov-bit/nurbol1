const g = document.getElementById('greeting');
const btn = document.getElementById('askName');

function showGreeting(name) {
    g.textContent = name 
        ? `Hello, ${name}!`
        : 'Welcome!';
}

function askName() {
    const name = prompt('What is your name?');
    if (name) {
        localStorage.setItem('visitorName', name);
    } else {
        localStorage.removeItem('visitorName');
    }
    showGreeting(localStorage.getItem('visitorName'));
}

btn.addEventListener('click', askName);
showGreeting(localStorage.getItem('visitorName'));

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', toggleTheme);

loadTheme();

const scrollToTopBtn = document.getElementById('scrollToTop');

function toggleScrollButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', toggleScrollButton);
scrollToTopBtn.addEventListener('click', scrollToTop);

toggleScrollButton();

const hamburgerBtn = document.getElementById('hamburger');
const siteNav = document.getElementById('site-nav');

function setMenuState(isOpen) {
    hamburgerBtn.classList.toggle('is-active', isOpen);
    siteNav.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function toggleMenu() {
    const isOpen = !siteNav.classList.contains('open');
    setMenuState(isOpen);
}

hamburgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('click', (e) => {
    if (siteNav.classList.contains('open') && 
        !siteNav.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
        setMenuState(false);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuState(false);
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => setMenuState(false), 100);
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let ticking = false;
function updateScrollButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollButton);
        ticking = true;
    }
}

window.removeEventListener('scroll', toggleScrollButton);
window.addEventListener('scroll', requestTick, { passive: true });
