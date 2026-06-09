// Упражнение 1: Анализ аргументов
function checkArgument(button, answerText) {
    // Ищем родителя кнопки с классом .argument-item
    const argumentItem = button.closest('.argument-item');

    // Внутри него ищем .answer
    const answerDiv = argumentItem.querySelector('.answer');

    // Выводим текст
    answerDiv.innerHTML = `<p><strong>Ответ:</strong> ${answerText}</p>`;
    answerDiv.style.display = 'block';

    // Меняем текст кнопки и блокируем её
    button.disabled = true;
    button.textContent = 'Проверено';
    button.style.backgroundColor = '#f0f0f0';
    button.style.cursor = 'not-allowed';
}

// Упражнение 2: Логические ошибки
function checkQuizAnswer(selectedButton) {
    const quizItem = selectedButton.closest('.quiz-item');
    const buttons = quizItem.querySelectorAll('.options button');
    const explanationDiv = quizItem.querySelector('.quiz-answer');

    // Сброс цветов
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
    });

    // Обработка выбора
    if (selectedButton.dataset.correct === "true") {
        selectedButton.classList.add('correct');
        selectedButton.style.backgroundColor = '#d4edda';
        selectedButton.style.borderColor = '#c3e6cb';
        explanationDiv.innerHTML = `<p class="correct">✅ ${selectedButton.dataset.explanationCorrect}</p>`;

        // Блокируем все кнопки после правильного ответа
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.7';
        });
    } else {
        selectedButton.classList.add('incorrect');
        selectedButton.style.backgroundColor = '#f8d7da';
        selectedButton.style.borderColor = '#f5c6cb';
        explanationDiv.innerHTML = `<p class="incorrect">❌ ${selectedButton.dataset.explanationWrong}</p>`;
        
        // Блокируем только неправильную кнопку
        selectedButton.disabled = true;
        selectedButton.style.cursor = 'not-allowed';
        selectedButton.style.opacity = '0.7';
    }
    
    explanationDiv.style.display = 'block';
    explanationDiv.style.animation = 'fadeIn 0.5s ease';
}

// Упражнение 3: Анализ новостей - Функция отправки ответа
function submitNewsAnswer() {
    const answerField = document.getElementById('news-answer');
    const feedbackDiv = document.getElementById('news-feedback');
    const submitBtn = document.getElementById('submit-news-answer');
    const answer = answerField.value.trim();
    
    console.log('Функция submitNewsAnswer вызвана');
    console.log('Ответ:', answer);
    
    if (!answerField || !feedbackDiv || !submitBtn) {
        console.error('Не найдены необходимые элементы');
        return;
    }
    
    if (answer === '') {
        feedbackDiv.innerHTML = '<p class="error">⚠️ Пожалуйста, введите ваш ответ перед отправкой.</p>';
        feedbackDiv.style.display = 'block';
        return;
    }
    
    // Показываем подтверждение
    feedbackDiv.innerHTML = '<p class="success">✅ Ваш ответ успешно отправлен! Спасибо за участие.</p>';
    feedbackDiv.style.display = 'block';
    
    // Деактивируем кнопку отправки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Ответ отправлен';
    submitBtn.style.backgroundColor = '#6c757d';
    submitBtn.style.cursor = 'not-allowed';
    
    // Сохраняем ответ (в реальном приложении здесь была бы отправка на сервер)
    console.log('Ответ сохранен:', answer);
    
    // Очищаем поле через 3 секунды
    setTimeout(() => {
        answerField.value = '';
        feedbackDiv.style.display = 'none';
        feedbackDiv.innerHTML = '';
        
        // Возвращаем кнопку в исходное состояние через 2 секунды
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить ответ';
            submitBtn.style.backgroundColor = '#4CAF50';
            submitBtn.style.cursor = 'pointer';
        }, 2000);
    }, 3000);
}

// Упражнение 3: Анализ новостей - Функция показа примера
function showSampleAnswer(button, sampleText) {
    const container = button.closest('.question') || button.parentElement;
    const sampleAnswerDiv = container.querySelector('.sample-answer');
    
    if (!sampleAnswerDiv) {
        console.error('Не найден элемент .sample-answer');
        return;
    }
    
    // Проверяем, показывается ли уже пример
    const isShown = button.dataset.shown === 'true';
    
    if (!isShown) {
        // Показываем пример
        sampleAnswerDiv.innerHTML = `<p><strong>Пример ответа:</strong> ${sampleText}</p>`;
        sampleAnswerDiv.style.display = 'block';
        button.textContent = 'Скрыть пример';
        button.dataset.shown = 'true';
        
        // Автоматически скрываем через 10 секунд
        setTimeout(() => {
            if (button.dataset.shown === 'true') {
                sampleAnswerDiv.style.display = 'none';
                sampleAnswerDiv.innerHTML = '';
                button.textContent = 'Показать пример ответа';
                button.dataset.shown = 'false';
            }
        }, 10000);
    } else {
        // Скрываем пример
        sampleAnswerDiv.style.display = 'none';
        sampleAnswerDiv.innerHTML = '';
        button.textContent = 'Показать пример ответа';
        button.dataset.shown = 'false';
    }
}

// Функция для инициализации всех обработчиков событий
function initExercisesEventListeners() {
    console.log('Инициализация обработчиков событий...');
    
    // Для упражнения 3: Анализ новостей - кнопка отправки
    const submitBtn = document.getElementById('submit-news-answer');
    if (submitBtn) {
        console.log('Найдена кнопка отправки:', submitBtn);
        submitBtn.addEventListener('click', submitNewsAnswer);
    } else {
        console.error('Кнопка submit-news-answer не найдена!');
    }
    
    // Для кнопок "Показать пример ответа" в упражнении 3
    const sampleButtons = document.querySelectorAll('.show-sample-btn');
    console.log('Найдено кнопок "Показать пример":', sampleButtons.length);
    
    sampleButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const sampleText = this.getAttribute('data-sample');
            console.log(`Кнопка ${index} нажата, текст:`, sampleText);
            showSampleAnswer(this, sampleText);
        });
    });
    
    // Для упражнения 1: Анализ аргументов
    const checkButtons = document.querySelectorAll('.check-btn');
    checkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerText = this.getAttribute('data-explanation');
            checkArgument(this, answerText);
        });
    });
    
    // Для упражнения 2: Логические ошибки
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            checkQuizAnswer(this);
        });
    });
    
    console.log('Инициализация обработчиков завершена');
}

// Анимация при загрузке hero блока
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroText = document.querySelector('.hero-text');

    if (heroTitle && heroText) {
        heroTitle.style.animationPlayState = 'running';
        heroText.style.animationPlayState = 'running';
    }
});

// Анимация при прокрутке: плавное появление блоков
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    const elements = document.querySelectorAll('.feature-card, .about-text');
    elements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const showTreeBtn = document.querySelector(".show-tree-btn");
    const tree = document.querySelector(".decision-tree");

    if (showTreeBtn && tree) {
        showTreeBtn.addEventListener("click", () => {
            tree.style.display = tree.style.display === "none" ? "block" : "none";
            showTreeBtn.textContent = tree.style.display === "block" ? "Скрыть пример" : "Показать пример дерева";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const methodCards = document.querySelectorAll(".method-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    methodCards.forEach(card => {
        observer.observe(card);
    });
});

// Функция для отслеживания появления элементов в области видимости
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.resource-list li');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});

// Инициализация, чтобы элементы сразу появились при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.resource-list li');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});

// Функция для отслеживания появления элементов в области видимости
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.exercise-card, .quiz-item, .news-exercise, .question');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});

// Инициализация, чтобы элементы сразу появились при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.exercise-card, .quiz-item, .news-exercise, .question');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
    
    // Инициализация обработчиков для упражнений
    console.log('Запуск инициализации обработчиков упражнений...');
    initExercisesEventListeners();
});

// ========== РЕГИСТРАЦИЯ ==========
(function initRegistration() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm_password');
    const registerBtn = document.getElementById('registerBtn');
    const alertDiv = document.getElementById('registerAlert');

    const fullnameError = document.getElementById('fullname-error');
    const phoneError = document.getElementById('phone-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');

    function showAlert(message, type) {
        if (!alertDiv) return;
        alertDiv.textContent = message;
        alertDiv.className = `register-alert register-alert-${type}`;
        alertDiv.style.display = 'block';
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }

    function validateFullname() {
        const value = fullnameInput.value.trim();
        if (value.length === 0) {
            fullnameError.style.display = 'block';
            fullnameInput.classList.add('error');
            return false;
        }
        const words = value.split(/\s+/);
        if (words.length < 2) {
            fullnameError.textContent = 'Введите полные ФИО (минимум имя и фамилию)';
            fullnameError.style.display = 'block';
            fullnameInput.classList.add('error');
            return false;
        }
        fullnameError.style.display = 'none';
        fullnameInput.classList.remove('error');
        return true;
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 12) {
            phoneError.style.display = 'block';
            phoneInput.classList.add('error');
            return false;
        }
        phoneError.style.display = 'none';
        phoneInput.classList.remove('error');
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(value)) {
            emailError.style.display = 'block';
            emailInput.classList.add('error');
            return false;
        }
        emailError.style.display = 'none';
        emailInput.classList.remove('error');
        return true;
    }

    function validatePassword() {
        const value = passwordInput.value;
        if (value.length < 6) {
            passwordError.style.display = 'block';
            passwordInput.classList.add('error');
            return false;
        }
        passwordError.style.display = 'none';
        passwordInput.classList.remove('error');
        return true;
    }

    function validateConfirm() {
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        if (password !== confirm) {
            confirmError.style.display = 'block';
            confirmInput.classList.add('error');
            return false;
        }
        confirmError.style.display = 'none';
        confirmInput.classList.remove('error');
        return true;
    }

    function validateForm() {
        return validateFullname() && validatePhone() && validateEmail() && validatePassword() && validateConfirm();
    }

    async function handleRegisterSubmit(event) {
        event.preventDefault();
        if (alertDiv) alertDiv.style.display = 'none';

        if (!validateForm()) {
            showAlert('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        const formData = {
            fullname: fullnameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            date: new Date().toLocaleString('ru-RU')
        };

        registerBtn.disabled = true;
        registerBtn.textContent = 'Регистрация...';

        try {
            // Замените URL на ваш бэкенд при публикации
            const response = await fetch('/api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    showAlert('Регистрация успешно завершена!', 'success');
                    registerForm.reset();
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    throw new Error(result.message || 'Ошибка регистрации');
                }
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showAlert('Произошла ошибка при регистрации. Попробуйте позже.', 'error');
            registerBtn.disabled = false;
            registerBtn.textContent = 'Зарегистрироваться';
        }
    }

    registerForm.addEventListener('submit', handleRegisterSubmit);
    fullnameInput.addEventListener('blur', validateFullname);
    phoneInput.addEventListener('blur', validatePhone);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmInput.addEventListener('blur', validateConfirm);

    passwordInput.addEventListener('input', function() {
        if (confirmInput.value.length > 0) validateConfirm();
    });

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        let formatted = '';
        if (value.length > 0) {
            formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.slice(1, 4);
            if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
            if (value.length >= 8) formatted += '-' + value.slice(7, 9);
            if (value.length >= 10) formatted += '-' + value.slice(9, 11);
        }
        e.target.value = formatted;
    });
})();

// ========== ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ ДЛЯ КНОПКИ "ВОЙТИ" ==========
(function initLoginToast() {
    // Создаём элемент уведомления
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <span class="toast-icon">🔐</span>
        <p class="toast-text">Сначала зарегистрируйтесь!</p>
        <button class="toast-close">✕</button>
    `;
    document.body.appendChild(toast);

    // Функция показа уведомления
    function showLoginToast() {
        toast.classList.add('show');
        
        // Автоматически скрыть через 3 секунды
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Закрытие по кнопке
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
    });

    // Находим все ссылки "Войти" на всех страницах
    const loginLinks = document.querySelectorAll('.login-link a, .nav-list a[href="#"]');
    
    loginLinks.forEach(link => {
        // Проверяем, что ссылка ведёт на "Войти"
        if (link.textContent.trim() === 'Войти' || link.getAttribute('href') === '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showLoginToast();
            });
        }
    });
})();

// ========== УПРАЖНЕНИЕ 4: ФАКТ ИЛИ МНЕНИЕ ==========
// ========== УПРАЖНЕНИЕ 4: ФАКТ ИЛИ МНЕНИЕ ==========
(function initFactOpinionQuiz() {
    const container = document.getElementById('factOpinionQuiz');
    if (!container) return;

    const questions = [
        {
            text: "Земля вращается вокруг Солнца.",
            correct: "fact",
            explanation: "✅ Это научно доказанный факт, подтверждённый наблюдениями."
        },
        {
            text: "Шоколад — самый вкусный десерт в мире.",
            correct: "opinion",
            explanation: "💭 Это мнение, так как вкус субъективен — кому-то вкуснее пирожное или мороженое."
        },
        {
            text: "Вода закипает при 100°C на уровне моря.",
            correct: "fact",
            explanation: "✅ Это физический факт, который можно проверить экспериментально."
        },
        {
            text: "Английский язык учить легче, чем китайский.",
            correct: "opinion",
            explanation: "💭 Это мнение — легкость изучения зависит от родного языка и индивидуальных способностей."
        },
        {
            text: "Человек не может дышать под водой без специального оборудования.",
            correct: "fact",
            explanation: "✅ Физиологический факт — у человека нет жабр, лёгкие не могут извлекать кислород из воды."
        }
    ];

    let userAnswers = [];
    let quizCompleted = false;
    let submitBtn, resetBtn, resultDiv;

    function renderQuestions() {
        container.innerHTML = '';
        userAnswers = new Array(questions.length).fill(null);
        quizCompleted = false;

        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'fact-opinion-item';
            questionDiv.setAttribute('data-q-index', index);
            questionDiv.innerHTML = `
                <div class="fact-opinion-statement">${index + 1}. ${q.text}</div>
                <div class="fact-opinion-buttons">
                    <button class="fact-btn" data-index="${index}" data-answer="fact">📊 Факт</button>
                    <button class="opinion-btn" data-index="${index}" data-answer="opinion">💭 Мнение</button>
                </div>
                <div class="fact-opinion-feedback" id="feedback-${index}"></div>
            `;
            container.appendChild(questionDiv);
        });

        // Обновляем ссылки на кнопки (они могут быть пересозданы)
        submitBtn = document.getElementById('submitFactOpinion');
        resetBtn = document.getElementById('resetFactOpinion');
        resultDiv = document.getElementById('factOpinionResult');

        // Навешиваем обработчики на кнопки ответов
        document.querySelectorAll('.fact-btn, .opinion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (quizCompleted) return;
                const index = parseInt(btn.dataset.index);
                const selected = btn.dataset.answer;
                userAnswers[index] = selected;
                
                const isCorrect = (selected === questions[index].correct);
                const feedbackDiv = document.getElementById(`feedback-${index}`);
                feedbackDiv.innerHTML = isCorrect ? questions[index].explanation : `❌ Неправильно! ${questions[index].explanation}`;
                feedbackDiv.className = `fact-opinion-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
                feedbackDiv.style.display = 'block';
                
                // Блокируем кнопки этого вопроса
                const parentDiv = btn.closest('.fact-opinion-item');
                parentDiv.querySelectorAll('.fact-btn, .opinion-btn').forEach(b => b.disabled = true);
            });
        });
    }

    function checkResults() {
        if (quizCompleted) return;
        const correctCount = userAnswers.filter((ans, idx) => ans === questions[idx].correct).length;
        const percent = Math.round((correctCount / questions.length) * 100);
        let message = '';
        if (percent === 100) message = '🎉 Идеально! Ты отлично отличаешь факты от мнений!';
        else if (percent >= 80) message = '👍 Отлично! Ты хорошо понимаешь разницу!';
        else if (percent >= 60) message = '📚 Неплохо! Но стоит ещё потренироваться.';
        else message = '💪 Попробуй ещё раз — разница между фактом и мнением очень важна для критического мышления!';
        
        if (resultDiv) {
            resultDiv.innerHTML = `✅ Результат: ${correctCount} из ${questions.length} правильных (${percent}%).<br>${message}`;
            resultDiv.style.display = 'block';
        }
        quizCompleted = true;
        
        // Блокируем все кнопки ответов
        document.querySelectorAll('.fact-btn, .opinion-btn').forEach(btn => btn.disabled = true);
    }

    function resetQuiz() {
        // Сбрасываем состояние
        userAnswers = new Array(questions.length).fill(null);
        quizCompleted = false;
        
        // Скрываем результат
        if (resultDiv) {
            resultDiv.style.display = 'none';
            resultDiv.innerHTML = '';
        }
        
        // Перерисовываем вопросы
        renderQuestions();
    }

    // Инициализация
    renderQuestions();
    
    submitBtn = document.getElementById('submitFactOpinion');
    resetBtn = document.getElementById('resetFactOpinion');
    
    if (submitBtn) submitBtn.addEventListener('click', checkResults);
    if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
})();
// ========== УПРАЖНЕНИЕ 5: DRAG & DROP ==========
(function initDragDropGame() {
    const container = document.querySelector('.drag-drop-container');
    if (!container) return;

    let draggedItem = null;
    let itemsStatus = new Map(); // храним, куда перемещён каждый элемент

    const dragItemsContainer = document.getElementById('dragItems');
    const strongZone = document.getElementById('strongZone');
    const weakZone = document.getElementById('weakZone');
    const checkBtn = document.getElementById('checkDragResult');
    const resetBtn = document.getElementById('resetDragGame');
    const resultDiv = document.getElementById('dragResult');

    // Получаем все элементы для перетаскивания
    function getAllDragItems() {
        return document.querySelectorAll('.drag-item');
    }

    // Сохраняем исходные данные
    let originalItemsHTML = [];
    function saveOriginalItems() {
        const items = getAllDragItems();
        originalItemsHTML = Array.from(items).map(item => item.outerHTML);
    }

    // Настройка drag & drop
    function setupDragEvents() {
        const dragItems = getAllDragItems();
        dragItems.forEach(item => {
            item.setAttribute('draggable', 'true');
            
            item.addEventListener('dragstart', (e) => {
                draggedItem = item;
                item.classList.add('dragging');
                e.dataTransfer.setData('text/plain', item.innerText);
                e.dataTransfer.effectAllowed = 'move';
            });
            
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
                draggedItem = null;
            });
        });
    }

    // Настройка зон для сброса
    function setupDropZones() {
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                if (!draggedItem) return;
                
                const expectedType = zone.getAttribute('data-expected');
                const itemType = draggedItem.getAttribute('data-type');
                const itemText = draggedItem.innerText;
                const explanation = draggedItem.getAttribute('data-explanation');
                
                // Проверяем, не был ли уже этот элемент перемещён
                if (draggedItem.classList.contains('dragged-out')) return;
                
                // Добавляем в зону
                const droppedItemDiv = document.createElement('div');
                droppedItemDiv.className = 'dropped-item';
                droppedItemDiv.innerHTML = `
                    <span>${itemText}</span>
                    <button class="remove-item" data-text="${itemText}">✕</button>
                `;
                droppedItemDiv.setAttribute('data-original-text', itemText);
                droppedItemDiv.setAttribute('data-type', itemType);
                droppedItemDiv.setAttribute('data-explanation', explanation);
                
                const targetZone = (expectedType === 'strong') ? strongZone : weakZone;
                targetZone.appendChild(droppedItemDiv);
                
                // Помечаем исходный элемент как перемещённый
                draggedItem.classList.add('dragged-out');
                draggedItem.style.display = 'none';
                
                // Сохраняем статус
                itemsStatus.set(itemText, {
                    zone: expectedType,
                    type: itemType,
                    explanation: explanation
                });
                
                // Добавляем обработчик удаления
                const removeBtn = droppedItemDiv.querySelector('.remove-item');
                removeBtn.addEventListener('click', () => {
                    // Возвращаем элемент обратно
                    const originalItem = Array.from(getAllDragItems()).find(
                        item => item.innerText === removeBtn.getAttribute('data-text')
                    );
                    if (originalItem) {
                        originalItem.style.display = '';
                        originalItem.classList.remove('dragged-out');
                    }
                    droppedItemDiv.remove();
                    itemsStatus.delete(itemText);
                });
            });
        });
    }

    // Проверка результата
    function checkResult() {
        let correct = 0;
        let total = itemsStatus.size;
        const feedbacks = [];
        
        itemsStatus.forEach((value, text) => {
            const isCorrect = (value.zone === value.type);
            if (isCorrect) {
                correct++;
                feedbacks.push(`✅ "${text.substring(0, 50)}..." — верно! ${value.explanation}`);
            } else {
                feedbacks.push(`❌ "${text.substring(0, 50)}..." — неверно. ${value.explanation}`);
            }
        });
        
        const notSorted = getAllDragItems().length - total;
        const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        let message = '';
        if (total === 0 && notSorted > 0) {
            message = '🤔 Перетащите аргументы в колонки, чтобы проверить результат!';
        } else {
            if (percent === 100 && total === 6) message = '🎉 Идеально! Ты отлично различаешь сильные и слабые аргументы!';
            else if (percent >= 80) message = '👍 Хорошая работа! Почти всё правильно.';
            else if (percent >= 60) message = '📚 Неплохо, но стоит ещё потренироваться распознавать логические ошибки.';
            else message = '💪 Попробуй ещё раз! Внимательно читай объяснения после проверки.';
        }
        
        resultDiv.innerHTML = `
            <strong>📊 Результат:</strong> ${correct} из ${total} правильных (${percent}%)<br>
            ${notSorted > 0 ? `⚠️ Осталось разобрать: ${notSorted} аргументов<br>` : ''}
            ${message}<br><br>
            <div style="font-size: 0.9rem; text-align: left; max-height: 200px; overflow-y: auto;">${feedbacks.join('<br>')}</div>
        `;
        resultDiv.style.display = 'block';
    }

    // Сброс игры
    function resetGame() {
        // Очищаем зоны
        strongZone.innerHTML = '';
        weakZone.innerHTML = '';
        
        // Показываем все элементы
        const items = getAllDragItems();
        items.forEach(item => {
            item.style.display = '';
            item.classList.remove('dragged-out');
        });
        
        // Очищаем статусы
        itemsStatus.clear();
        
        // Скрываем результат
        resultDiv.style.display = 'none';
    }

    // Инициализация
    saveOriginalItems();
    setupDragEvents();
    setupDropZones();
    
    if (checkBtn) checkBtn.addEventListener('click', checkResult);
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
})();

// ========== УПРАЖНЕНИЕ 6: ШКАЛА ДОСТОВЕРНОСТИ ==========
(function initCredibilityQuiz() {
    const container = document.getElementById('credibilityQuiz');
    if (!container) return;

    const statements = [
        {
            text: "«Шоколад полезен для здоровья. Исследование 2023 года на 5000 человек показало, что те, кто ест тёмный шоколад 3 раза в неделю, на 40% реже страдают от сердечно-сосудистых заболеваний.»",
            correctRange: { min: 70, max: 100 },
            explanation: "📊 Это ДОСТОВЕРНО! Утверждение основано на реальном исследовании с большой выборкой и конкретными цифрами. Конечно, важно учитывать, кто финансировал исследование, но сам аргумент сильный."
        },
        {
            text: "«Врачи рекомендуют наш препарат, потому что он лучший! Подробнее на сайте...»",
            correctRange: { min: 0, max: 30 },
            explanation: "⚠️ Это НЕДОСТОВЕРНО! Нет конкретных данных, нет названия препарата, нет имён врачей. Похоже на рекламный трюк."
        },
        {
            text: "«Согласно мета-анализу 15 исследований с участием 50 000 человек, регулярная физическая активность снижает риск депрессии на 25%.»",
            correctRange: { min: 75, max: 100 },
            explanation: "📊 Высокая достоверность! Мета-анализ — это золотой стандарт доказательной медицины, большая выборка повышает надёжность."
        },
        {
            text: "«Я знаю одного человека, который бросил курить с помощью этого чая. Значит, чай работает отлично!»",
            correctRange: { min: 0, max: 25 },
            explanation: "⚠️ Низкая достоверность! Это единичный случай — нельзя делать вывод на основе одного примера. Нужны исследования на больших группах."
        },
        {
            text: "«По данным ООН за 2024 год, уровень грамотности среди молодёжи в мире достиг 91% — это исторический рекорд.»",
            correctRange: { min: 80, max: 100 },
            explanation: "📊 Достоверно! ООН — авторитетный источник, есть конкретные цифры и год."
        }
    ];

    let userRatings = [];
    let quizCompleted = false;
    let submitBtn, resetBtn, resultDiv;

    function getScoreClass(score) {
        if (score >= 70) return 'score-high';
        if (score >= 40) return 'score-mid';
        return 'score-low';
    }

    function getScoreCategory(score) {
        if (score >= 70) return 'высокая ✨';
        if (score >= 40) return 'средняя 🤔';
        return 'низкая ⚠️';
    }

    function renderQuestions() {
        container.innerHTML = '';
        userRatings = new Array(statements.length).fill(50);
        quizCompleted = false;

        statements.forEach((stmt, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'credibility-item';
            questionDiv.setAttribute('data-q-index', index);
            questionDiv.innerHTML = `
                <div class="credibility-statement">📌 ${index + 1}. ${stmt.text}</div>
                <div class="credibility-slider-container">
                    <div class="slider-wrapper">
                        <span class="slider-label">😒 0%</span>
                        <input type="range" class="credibility-slider" id="slider-${index}" min="0" max="100" value="50">
                        <span class="slider-label">💯 100%</span>
                        <span class="slider-value" id="value-${index}">50%</span>
                    </div>
                    <div class="credibility-feedback" id="feedback-${index}"></div>
                </div>
            `;
            container.appendChild(questionDiv);

            const slider = document.getElementById(`slider-${index}`);
            const valueDisplay = document.getElementById(`value-${index}`);
            
            if (slider) {
                slider.addEventListener('input', (e) => {
                    if (!quizCompleted) {
                        const val = e.target.value;
                        valueDisplay.textContent = `${val}%`;
                        userRatings[index] = parseInt(val);
                    }
                });
            }
        });
    }

    function checkResults() {
        console.log('checkResults вызвана');
        if (quizCompleted) {
            console.log('Тест уже завершён');
            return;
        }
        
        let totalScore = 0;
        
        statements.forEach((stmt, index) => {
            const userRating = userRatings[index];
            const isGood = (userRating >= stmt.correctRange.min && userRating <= stmt.correctRange.max);
            
            let accuracy = 0;
            if (isGood) {
                accuracy = 100;
            } else {
                const correctMid = (stmt.correctRange.min + stmt.correctRange.max) / 2;
                const distance = Math.abs(userRating - correctMid);
                accuracy = Math.max(0, 100 - (distance * 1.5));
            }
            totalScore += accuracy;
            
            const userCategory = getScoreCategory(userRating);
            
            let feedbackClass = '';
            let indicator = '';
            if (isGood) {
                feedbackClass = 'credibility-feedback-good';
                indicator = '✅ Хорошая интуиция!';
            } else if (accuracy > 50) {
                feedbackClass = 'credibility-feedback-mid';
                indicator = '🤔 Близко, но не совсем!';
            } else {
                feedbackClass = 'credibility-feedback-bad';
                indicator = '❌ Совсем мимо!';
            }
            
            const feedbackDiv = document.getElementById(`feedback-${index}`);
            if (feedbackDiv) {
                feedbackDiv.innerHTML = `
                    <div class="${feedbackClass}" style="padding: 12px; border-radius: 10px;">
                        ${indicator}<br>
                        📊 Ваша оценка: <strong>${userRating}%</strong> (${userCategory})<br>
                        🎯 Правильный диапазон: <strong>${stmt.correctRange.min}-${stmt.correctRange.max}%</strong><br>
                        💡 ${stmt.explanation}
                    </div>
                `;
                feedbackDiv.style.display = 'block';
            }
            
            // Блокируем слайдер
            const slider = document.getElementById(`slider-${index}`);
            if (slider) slider.disabled = true;
        });
        
        const avgAccuracy = Math.round(totalScore / statements.length);
        let message = '';
        if (avgAccuracy >= 85) message = '🎉 Феноменально! Ты отлично оцениваешь достоверность информации!';
        else if (avgAccuracy >= 70) message = '👍 Отлично! Ты хорошо чувствуешь, чему можно верить.';
        else if (avgAccuracy >= 50) message = '📚 Неплохо! Есть куда расти — тренируйся дальше.';
        else message = '💪 Скептицизм — это хорошо, но иногда информация заслуживает доверия. Попробуй ещё раз!';
        
        const resultDiv = document.getElementById('credibilityResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <strong>📊 Средняя точность оценок: ${avgAccuracy}%</strong><br>
                ${message}
                <div style="font-size: 0.85rem; margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 8px;">
                    💡 Совет: Доверять можно источникам с конкретными цифрами, большими выборками и авторитетными организациями. 
                    Единичные примеры и громкие заявления без доказательств — повод усомниться.
                </div>
            `;
            resultDiv.style.display = 'block';
        }
        quizCompleted = true;
    }

    function resetQuiz() {
        userRatings = new Array(statements.length).fill(50);
        quizCompleted = false;
        
        const resultDiv = document.getElementById('credibilityResult');
        if (resultDiv) {
            resultDiv.style.display = 'none';
            resultDiv.innerHTML = '';
        }
        
        renderQuestions();
    }

    // Инициализация
    renderQuestions();
    
    submitBtn = document.getElementById('submitCredibility');
    resetBtn = document.getElementById('resetCredibility');
    
    console.log('Кнопка submitCredibility найдена:', submitBtn);
    console.log('Кнопка resetCredibility найдена:', resetBtn);
    
    if (submitBtn) {
        submitBtn.addEventListener('click', checkResults);
    } else {
        console.error('Кнопка submitCredibility не найдена!');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
})();// ========== УПРАЖНЕНИЕ 6: ШКАЛА ДОСТОВЕРНОСТИ ==========
(function initCredibilityQuiz() {
    const container = document.getElementById('credibilityQuiz');
    if (!container) return;

    const statements = [
        {
            text: "«Шоколад полезен для здоровья. Исследование 2023 года на 5000 человек показало, что те, кто ест тёмный шоколад 3 раза в неделю, на 40% реже страдают от сердечно-сосудистых заболеваний.»",
            correctRange: { min: 70, max: 100 },
            explanation: "📊 Это ДОСТОВЕРНО! Утверждение основано на реальном исследовании с большой выборкой и конкретными цифрами. Конечно, важно учитывать, кто финансировал исследование, но сам аргумент сильный."
        },
        {
            text: "«Врачи рекомендуют наш препарат, потому что он лучший! Подробнее на сайте...»",
            correctRange: { min: 0, max: 30 },
            explanation: "⚠️ Это НЕДОСТОВЕРНО! Нет конкретных данных, нет названия препарата, нет имён врачей. Похоже на рекламный трюк."
        },
        {
            text: "«Согласно мета-анализу 15 исследований с участием 50 000 человек, регулярная физическая активность снижает риск депрессии на 25%.»",
            correctRange: { min: 75, max: 100 },
            explanation: "📊 Высокая достоверность! Мета-анализ — это золотой стандарт доказательной медицины, большая выборка повышает надёжность."
        },
        {
            text: "«Я знаю одного человека, который бросил курить с помощью этого чая. Значит, чай работает отлично!»",
            correctRange: { min: 0, max: 25 },
            explanation: "⚠️ Низкая достоверность! Это единичный случай — нельзя делать вывод на основе одного примера. Нужны исследования на больших группах."
        },
        {
            text: "«По данным ООН за 2024 год, уровень грамотности среди молодёжи в мире достиг 91% — это исторический рекорд.»",
            correctRange: { min: 80, max: 100 },
            explanation: "📊 Достоверно! ООН — авторитетный источник, есть конкретные цифры и год."
        }
    ];

    let userRatings = [];
    let quizCompleted = false;
    let submitBtn, resetBtn, resultDiv;

    function getScoreClass(score) {
        if (score >= 70) return 'score-high';
        if (score >= 40) return 'score-mid';
        return 'score-low';
    }

    function getScoreCategory(score) {
        if (score >= 70) return 'высокая ✨';
        if (score >= 40) return 'средняя 🤔';
        return 'низкая ⚠️';
    }

    function renderQuestions() {
        container.innerHTML = '';
        userRatings = new Array(statements.length).fill(50);
        quizCompleted = false;

        statements.forEach((stmt, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'credibility-item';
            questionDiv.setAttribute('data-q-index', index);
            questionDiv.innerHTML = `
                <div class="credibility-statement">📌 ${index + 1}. ${stmt.text}</div>
                <div class="credibility-slider-container">
                    <div class="slider-wrapper">
                        <span class="slider-label">😒 0%</span>
                        <input type="range" class="credibility-slider" id="slider-${index}" min="0" max="100" value="50">
                        <span class="slider-label">💯 100%</span>
                        <span class="slider-value" id="value-${index}">50%</span>
                    </div>
                    <div class="credibility-feedback" id="feedback-${index}"></div>
                </div>
            `;
            container.appendChild(questionDiv);

            const slider = document.getElementById(`slider-${index}`);
            const valueDisplay = document.getElementById(`value-${index}`);
            
            if (slider) {
                slider.addEventListener('input', (e) => {
                    if (!quizCompleted) {
                        const val = e.target.value;
                        valueDisplay.textContent = `${val}%`;
                        userRatings[index] = parseInt(val);
                    }
                });
            }
        });
    }

    function checkResults() {
        console.log('checkResults вызвана');
        if (quizCompleted) {
            console.log('Тест уже завершён');
            return;
        }
        
        let totalScore = 0;
        
        statements.forEach((stmt, index) => {
            const userRating = userRatings[index];
            const isGood = (userRating >= stmt.correctRange.min && userRating <= stmt.correctRange.max);
            
            let accuracy = 0;
            if (isGood) {
                accuracy = 100;
            } else {
                const correctMid = (stmt.correctRange.min + stmt.correctRange.max) / 2;
                const distance = Math.abs(userRating - correctMid);
                accuracy = Math.max(0, 100 - (distance * 1.5));
            }
            totalScore += accuracy;
            
            const userCategory = getScoreCategory(userRating);
            
            let feedbackClass = '';
            let indicator = '';
            if (isGood) {
                feedbackClass = 'credibility-feedback-good';
                indicator = '✅ Хорошая интуиция!';
            } else if (accuracy > 50) {
                feedbackClass = 'credibility-feedback-mid';
                indicator = '🤔 Близко, но не совсем!';
            } else {
                feedbackClass = 'credibility-feedback-bad';
                indicator = '❌ Совсем мимо!';
            }
            
            const feedbackDiv = document.getElementById(`feedback-${index}`);
            if (feedbackDiv) {
                feedbackDiv.innerHTML = `
                    <div class="${feedbackClass}" style="padding: 12px; border-radius: 10px;">
                        ${indicator}<br>
                        📊 Ваша оценка: <strong>${userRating}%</strong> (${userCategory})<br>
                        🎯 Правильный диапазон: <strong>${stmt.correctRange.min}-${stmt.correctRange.max}%</strong><br>
                        💡 ${stmt.explanation}
                    </div>
                `;
                feedbackDiv.style.display = 'block';
            }
            
            // Блокируем слайдер
            const slider = document.getElementById(`slider-${index}`);
            if (slider) slider.disabled = true;
        });
        
        const avgAccuracy = Math.round(totalScore / statements.length);
        let message = '';
        if (avgAccuracy >= 85) message = '🎉 Феноменально! Ты отлично оцениваешь достоверность информации!';
        else if (avgAccuracy >= 70) message = '👍 Отлично! Ты хорошо чувствуешь, чему можно верить.';
        else if (avgAccuracy >= 50) message = '📚 Неплохо! Есть куда расти — тренируйся дальше.';
        else message = '💪 Скептицизм — это хорошо, но иногда информация заслуживает доверия. Попробуй ещё раз!';
        
        const resultDiv = document.getElementById('credibilityResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <strong>📊 Средняя точность оценок: ${avgAccuracy}%</strong><br>
                ${message}
                <div style="font-size: 0.85rem; margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 8px;">
                    💡 Совет: Доверять можно источникам с конкретными цифрами, большими выборками и авторитетными организациями. 
                    Единичные примеры и громкие заявления без доказательств — повод усомниться.
                </div>
            `;
            resultDiv.style.display = 'block';
        }
        quizCompleted = true;
    }

    function resetQuiz() {
        userRatings = new Array(statements.length).fill(50);
        quizCompleted = false;
        
        const resultDiv = document.getElementById('credibilityResult');
        if (resultDiv) {
            resultDiv.style.display = 'none';
            resultDiv.innerHTML = '';
        }
        
        renderQuestions();
    }

    // Инициализация
    renderQuestions();
    
    submitBtn = document.getElementById('submitCredibility');
    resetBtn = document.getElementById('resetCredibility');
    
    console.log('Кнопка submitCredibility найдена:', submitBtn);
    console.log('Кнопка resetCredibility найдена:', resetBtn);
    
    if (submitBtn) {
        submitBtn.addEventListener('click', checkResults);
    } else {
        console.error('Кнопка submitCredibility не найдена!');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
})();
