// ===== ФУНКЦИОНАЛЬНОСТЬ ПРИВЕТСТВИЯ ПОЛЬЗОВАТЕЛЯ =====
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

// ===== ФУНКЦИОНАЛЬНОСТЬ ПЕРЕКЛЮЧЕНИЯ ТЕМ =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Функция для переключения темы
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Обновляем иконку
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Загружаем сохраненную тему при загрузке страницы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Добавляем обработчик события
themeToggle.addEventListener('click', toggleTheme);

// Загружаем тему при загрузке страницы
loadTheme();

// ===== ФУНКЦИОНАЛЬНОСТЬ КНОПКИ СКРОЛЛА ВВЕРХ =====
const scrollToTopBtn = document.getElementById('scrollToTop');

// Функция для показа/скрытия кнопки скролла
function toggleScrollButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Функция для плавного скролла вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Добавляем обработчики событий
window.addEventListener('scroll', toggleScrollButton);
scrollToTopBtn.addEventListener('click', scrollToTop);

// Проверяем начальную позицию скролла
toggleScrollButton();

// ===== HAMBURGER MENU =====
const hamburgerBtn = document.getElementById('hamburger');
const siteNav = document.getElementById('site-nav');

function setMenuState(isOpen) {
    hamburgerBtn.classList.toggle('is-active', isOpen);
    siteNav.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
}

function toggleMenu() {
    const isOpen = !siteNav.classList.contains('open');
    setMenuState(isOpen);
}

hamburgerBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link (mobile)
siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuState(false);
});

