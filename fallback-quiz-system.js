// fallback-quiz-system.js - نظام اختبارات احتياطي
const fallbackQuizSystem = {
    init: function() {
        this.fixQuizButtons();
        this.createQuizModal();
        this.loadFallbackQuizzes();
    },

    fixQuizButtons: function() {
        const quizButtons = document.querySelectorAll('.btn-quiz');
        quizButtons.forEach(btn => {
            const originalOnclick = btn.getAttribute('onclick');
            if (!originalOnclick || originalOnclick.includes('showLessonTests')) {
                btn.setAttribute('onclick', 'fallbackQuizSystem.showTests(this)');
            }
        });
    },

    createQuizModal: function() {
        const modalHTML = `
            <div id="fallbackQuizModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; direction: rtl;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <button onclick="fallbackQuizSystem.closeModal()" style="position: absolute; left: 15px; top: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                    <h2 id="fallbackQuizTitle">اختبارات الدرس</h2>
                    <div id="fallbackQuizList"></div>
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="fallbackQuizSystem.closeModal()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">إغلاق</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    showTests: function(button) {
        const lessonCard = button.closest('.lesson-card');
        const lessonTitle = lessonCard.querySelector('h3').textContent;
        const lessonId = this.extractLessonId(lessonCard);

        document.getElementById('fallbackQuizTitle').textContent = `اختبارات: ${lessonTitle}`;
        
        const quizzes = this.getQuizzesForLesson(lessonId);
        this.displayQuizzes(quizzes, lessonId, lessonTitle);
        
        document.getElementById('fallbackQuizModal').style.display = 'block';
    },

    extractLessonId: function(lessonCard) {
        // استخراج معرف الدرس من البطاقة
        const badge = lessonCard.querySelector('.lesson-badge');
        if (badge && badge.textContent.includes('درس')) {
            const unitSection = lessonCard.closest('.unit-section');
            const unitId = unitSection?.id || 'unit1';
            const lessonNum = badge.textContent.replace('درس', '').trim();
            return `${unitId}-lesson${lessonNum}`;
        }
        return 'unknown-lesson';
    },

    getQuizzesForLesson: function(lessonId) {
        // بيانات اختبارات افتراضية
        const defaultQuizzes = {
            'unit1-lesson1': [
                { id: 'quiz-1', title: 'اختبار قصير - حالات المادة', questions: 5, time: 10 },
                { id: 'quiz-2', title: 'اختبار شامل - حالات المادة', questions: 10, time: 20 }
            ],
            'unit1-lesson2': [
                { id: 'quiz-3', title: 'اختبار تغير حالات المادة', questions: 8, time: 15 }
            ],
            'unit1-lesson3': [
                { id: 'quiz-4', title: 'اختبار الطاقة الداخلية', questions: 6, time: 12 }
            ]
        };

        return defaultQuizzes[lessonId] || [
            { id: 'default-quiz', title: 'اختبار الدرس', questions: 5, time: 10 }
        ];
    },

    displayQuizzes: function(quizzes, lessonId, lessonTitle) {
        const quizList = document.getElementById('fallbackQuizList');
        
        if (quizzes.length === 0) {
            quizList.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 15px;">📝</div>
                    <h3>لا توجد اختبارات متاحة</h3>
                    <p>سيتم إضافة الاختبارات قريباً</p>
                    <button onclick="fallbackQuizSystem.createSampleQuiz('${lessonId}', '${lessonTitle}')" 
                            style="background: #38a169; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">
                        إنشاء اختبار تجريبي
                    </button>
                </div>
            `;
            return;
        }

        let html = '';
        quizzes.forEach(quiz => {
            html += `
                <div style="border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 15px 0; background: #f7fafc;">
                    <h4 style="margin: 0 0 10px 0;">${quiz.title}</h4>
                    <div style="display: flex; justify-content: space-between; color: #666; font-size: 14px;">
                        <span>${quiz.questions} أسئلة</span>
                        <span>${quiz.time} دقيقة</span>
                    </div>
                    <button onclick="fallbackQuizSystem.startQuiz('${quiz.id}', '${lessonId}')" 
                            style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%; margin-top: 15px;">
                        بدء الاختبار
                    </button>
                </div>
            `;
        });

        quizList.innerHTML = html;
    },

    createSampleQuiz: function(lessonId, lessonTitle) {
        const sampleQuiz = {
            id: 'sample-' + Date.now(),
            title: `اختبار تجريبي - ${lessonTitle}`,
            questions: [
                {
                    text: "هذا سؤال تجريبي للدرس. ما هي الإجابة الصحيحة؟",
                    options: ["الإجابة الأولى", "الإجابة الثانية", "الإجابة الثالثة", "الإجابة الصحيحة"],
                    correctAnswer: 3,
                    explanation: "هذا شرح تجريبي للإجابة الصحيحة"
                },
                {
                    text: "سؤال آخر لاختبار النظام",
                    options: ["اختيار خاطئ", "الاختيار الصحيح", "اختيار خاطئ", "اختيار خاطئ"],
                    correctAnswer: 1,
                    explanation: "شرح للسؤال الثاني"
                }
            ],
            time: 10
        };

        this.startQuiz(sampleQuiz.id, lessonId, sampleQuiz);
    },

    startQuiz: function(quizId, lessonId, quizData = null) {
        if (!quizData) {
            quizData = this.getQuizData(quizId);
        }

        // حفظ بيانات الاختبار مؤقتاً
        sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
        
        // فتح صفحة الاختبار
        window.open(`quiz.html?quiz=${quizId}&lesson=${lessonId}`, '_blank');
    },

    getQuizData: function(quizId) {
        // بيانات اختبارات افتراضية
        const quizzes = {
            'quiz-1': {
                title: 'اختبار قصير - حالات المادة',
                questions: [
                    {
                        text: "كم عدد حالات المادة الأساسية؟",
                        options: ["2", "3", "4", "5"],
                        correctAnswer: 1,
                        explanation: "حالات المادة الأساسية هي: الصلبة، السائلة، الغازية"
                    },
                    {
                        text: "أي من هذه يعد من حالات المادة؟",
                        options: ["الطاقة", "الضوء", "السائلة", "الصوت"],
                        correctAnswer: 2,
                        explanation: "الحالة السائلة هي إحدى حالات المادة الثلاث"
                    }
                ],
                time: 10
            }
        };

        return quizzes[quizId] || quizzes['quiz-1'];
    },

    closeModal: function() {
        document.getElementById('fallbackQuizModal').style.display = 'none';
    }
};

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    fallbackQuizSystem.init();
});