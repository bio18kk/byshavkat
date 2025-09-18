// Обучающая платформа
class LearningPlatform {
    constructor() {
        this.currentCourse = null;
        this.currentLesson = 0;
        this.courses = {
            html: this.createHTMLCourse(),
            css: this.createCSSCourse(),
            js: this.createJSCourse(),
            python: this.createPythonCourse()
        };
    }

    // Инициализация платформы
    init() {
        this.renderPlatform();
        this.bindEvents();
    }

    // Рендер главной страницы платформы
    renderPlatform() {
        const platformHTML = `
            <div class="platform-header">
                <h1>Wentisame</h1>
                <p>покупайте игровую валюту</p>
            </div>

            <div class="course-grid">
                <div class="course-card html" data-course="html">
                    <div class="course-icon">   </div>
                    <h3>HTML Basics</h3>
                    <p>Основы создания веб-страниц</p>
                    <p><strong>10 уроков</strong></p>
                </div>

                <div class="course-card css" data-course="css">
                    <div class="course-icon">  </div>
                    <h3>CSS Styling</h3>
                    <p>Стилизация и дизайн</p>
                    <p><strong>8 уроков</strong></p>
                </div>

                <div class="course-card js" data-course="js">
                    <div class="course-icon">  </div>
                    <h3>JavaScript</h3>
                    <p>Интерактивность и логика</p>
                    <p><strong>12 уроков</strong></p>
                </div>

                <div class="course-card python" data-course="python">
                    <div class="course-icon">   </div>
                    <h3>Python</h3>
                    <p>Универсальный программинг</p>
                    <p><strong>15 уроков</strong></p>
                </div>
            </div>

            <div id="lesson-container"></div>
        `;

        document.getElementById('learning-platform').innerHTML = platformHTML;
    }

    // Бинд событий
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.course-card')) {
                const course = e.target.closest('.course-card').dataset.course;
                this.startCourse(course);
            }

            if (e.target.id === 'next-lesson') {
                this.nextLesson();
            }

            if (e.target.id === 'prev-lesson') {
                this.prevLesson();
            }

            if (e.target.id === 'back-to-courses') {
                this.renderPlatform();
            }
        });
    }

    // Начать курс
    startCourse(courseName) {
        this.currentCourse = courseName;
        this.currentLesson = 0;
        this.renderLesson();
    }

    // Рендер урока
    renderLesson() {
        const course = this.courses[this.currentCourse];
        const lesson = course.lessons[this.currentLesson];
        
        const lessonHTML = `
            <div class="lesson-content">
                <h2>${lesson.title}</h2>
                <div class="lesson-text">${lesson.content}</div>
                
                ${lesson.example ? `
                    <div class="code-editor">
                        ${lesson.example}
                    </div>
                ` : ''}

                <div class="navigation">
                    <button class="btn btn-secondary" id="back-to-courses">← Назад к курсам</button>
                    <div>
                        ${this.currentLesson > 0 ? 
                            `<button class="btn" id="prev-lesson">← Предыдущий</button>` : ''}
                        <button class="btn" id="next-lesson">
                            ${this.currentLesson < course.lessons.length - 1 ? 'Следующий →' : 'Завершить курс'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('lesson-container').innerHTML = lessonHTML;
    }

    // Следующий урок
    nextLesson() {
        const course = this.courses[this.currentCourse];
        if (this.currentLesson < course.lessons.length - 1) {
            this.currentLesson++;
            this.renderLesson();
        } else {
            this.renderPlatform();
        }
    }

    // Предыдущий урок
    prevLesson() {
        if (this.currentLesson > 0) {
            this.currentLesson--;
            this.renderLesson();
        }
    }

    // Создание курсов
    createHTMLCourse() {
        return {
            title: "HTML Basics",
            lessons: [
                {
                    title: "Введение в HTML",
                    content: "HTML (HyperText Markup Language) - язык разметки для создания веб-страниц.",
                    example: `<span class="code-comment"><!-- Базовая структура HTML --></span>
<span class="code-tag">&lt;!DOCTYPE html&gt;</span>
<span class="code-tag">&lt;html&gt;</span>
<span class="code-tag">&lt;head&gt;</span>
    <span class="code-tag">&lt;title&gt;</span>Моя страница<span class="code-tag">&lt;/title&gt;</span>
<span class="code-tag">&lt;/head&gt;</span>
<span class="code-tag">&lt;body&gt;</span>
    <span class="code-tag">&lt;h1&gt;</span>Привет мир!<span class="code-tag">&lt;/h1&gt;</span>
<span class="code-tag">&lt;/body&gt;</span>
<span class="code-tag">&lt;/html&gt;</span>`
                },
                {
                    title: "Теги и атрибуты",
                    content: "Основные теги: div, p, a, img, и их атрибуты.",
                    example: `<span class="code-tag">&lt;div <span class="code-attribute">class</span>=<span class="code-value">"container"</span>&gt;</span>
    <span class="code-tag">&lt;p&gt;</span>Это параграф<span class="code-tag">&lt;/p&gt;</span>
    <span class="code-tag">&lt;a <span class="code-attribute">href</span>=<span class="code-value">"https://example.com"</span>&gt;</span>Ссылка<span class="code-tag">&lt;/a&gt;</span>
    <span class="code-tag">&lt;img <span class="code-attribute">src</span>=<span class="code-value">"image.jpg"</span> <span class="code-attribute">alt</span>=<span class="code-value">"Описание"</span>&gt;</span>
<span class="code-tag">&lt;/div&gt;</span>`
                }
            ]
        };
    }

    createCSSCourse() {
        return {
            title: "CSS Styling",
            lessons: [
                {
                    title: "Основы CSS",
                    content: "CSS (Cascading Style Sheets) для стилизации HTML-элементов.",
                    example: `<span class="css-selector">body</span> {
    <span class="code-attribute">font-family</span>: Arial, sans-serif;
    <span class="code-attribute">margin</span>: 0;
    <span class="code-attribute">padding</span>: 20px;
    <span class="code-attribute">background-color</span>: #f0f0f0;
}

<span class="css-selector">.container</span> {
    <span class="code-attribute">max-width</span>: 1200px;
    <span class="code-attribute">margin</span>: 0 auto;
}`
                }
            ]
        };
    }

    createJSCourse() {
        return {
            title: "JavaScript",
            lessons: [
                {
                    title: "Введение в JavaScript",
                    content: "JavaScript добавляет интерактивность на веб-страницы.",
                    example: `<span class="code-comment">// Базовый синтаксис</span>
<span class="js-keyword">const</span> message = <span class="code-value">'Привет мир!'</span>;
console.log(message);

<span class="code-comment">// Функция</span>
<span class="js-keyword">function</span> showAlert() {
    alert(<span class="code-value">'Сообщение!'</span>);
}

<span class="code-comment">// Обработчик события</span>
document.getElementById(<span class="code-value">'myButton'</span>).addEventListener(<span class="code-value">'click'</span>, showAlert);`
                }
            ]
        };
    }

    createPythonCourse() {
        return {
            title: "Python Programming",
            lessons: [
                {
                    title: "Основы Python",
                    content: "Python - мощный и простой в изучении язык программирования.",
                    example: `<span class="code-comment"># Вывод текста</span>
<span class="python-keyword">print</span>(<span class="code-value">"Привет мир!"</span>)

<span class="code-comment"># Переменные</span>
name = <span class="code-value">"Иван"</span>
age = 25

<span class="code-comment"># Условные операторы</span>
<span class="python-keyword">if</span> age >= 18:
    <span class="python-keyword">print</span>(<span class="code-value">f"{name} совершеннолетний"</span>)
<span class="python-keyword">else</span>:
    <span class="python-keyword">print</span>(<span class="code-value">f"{name} несовершеннолетний"</span>)`
                }
            ]
        };
    }
}

// Инициализация платформы
window.learningPlatformInstance = new LearningPlatform();