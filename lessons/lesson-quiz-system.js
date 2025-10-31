// نظام ربط الدروس والاختبارات
class LessonQuizSystem {
    constructor() {
        this.savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    }

    // الحصول على الاختبارات المرتبطة بدرس معين
    getTestsForLesson(lessonId) {
        return Object.values(this.savedTests).filter(test => 
            test.lessonLink === lessonId
        );
    }

    // عرض اختبارات الدرس في نافذة منبثقة
    showLessonTests(lessonId, lessonName) {
        const tests = this.getTestsForLesson(lessonId);
        
        if (tests.length === 0) {
            this.showNoTestsModal(lessonName);
        } else {
            this.showTestsListModal(tests, lessonName);
        }
    }

    // عرض رسالة عندما لا توجد اختبارات
    showNoTestsModal(lessonName) {
        const modalHTML = `
            <div class="quiz-modal-overlay" id="quizModal">
                <div class="quiz-modal">
                    <div class="quiz-modal-header">
                        <h3>📝 اختبارات ${lessonName}</h3>
                        <span class="close-modal" onclick="closeQuizModal()">&times;</span>
                    </div>
                    <div class="quiz-modal-body">
                        <div class="no-tests-message">
                            <div style="font-size: 4rem; margin-bottom: 20px;">📚</div>
                            <h4>لا توجد اختبارات لهذا الدرس بعد</h4>
                            <p>يمكنك إنشاء اختبارات جديدة من صفحة استيراد الاختبارات</p>
                            <div class="modal-actions">
                                <button class="btn btn-primary" onclick="redirectToImport()">
                                    ➕ إنشاء اختبار جديد
                                </button>
                                <button class="btn btn-outline" onclick="closeQuizModal()">
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // عرض قائمة الاختبارات المتاحة
    showTestsListModal(tests, lessonName) {
        let testsHTML = '';
        
        tests.forEach(test => {
            const date = new Date(test.createdAt).toLocaleDateString('ar-EG');
            testsHTML += `
                <div class="test-item">
                    <div class="test-item-header">
                        <h4>${test.title}</h4>
                        <span class="test-badge">${test.questions.length} سؤال</span>
                    </div>
                    <div class="test-item-meta">
                        <span>🕒 ${test.time} دقيقة</span>
                        <span>📅 ${date}</span>
                    </div>
                    <div class="test-item-actions">
                        <button class="btn btn-start" onclick="startTest('${test.id}')">
                            ▶ بدء الاختبار
                        </button>
                        <button class="btn btn-outline" onclick="viewTestDetails('${test.id}')">
                            👀 معاينة
                        </button>
                    </div>
                </div>
            `;
        });

        const modalHTML = `
            <div class="quiz-modal-overlay" id="quizModal">
                <div class="quiz-modal">
                    <div class="quiz-modal-header">
                        <h3>📝 اختبارات ${lessonName}</h3>
                        <span class="close-modal" onclick="closeQuizModal()">&times;</span>
                    </div>
                    <div class="quiz-modal-body">
                        <div class="tests-list">
                            ${testsHTML}
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary" onclick="redirectToImport()">
                                ➕ إنشاء اختبار جديد
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// إنشاء نسخة عامة من النظام
const quizSystem = new LessonQuizSystem();

// وظائف عامة للاستخدام في الأزرار
function showLessonTests(lessonId, lessonName) {
    quizSystem.showLessonTests(lessonId, lessonName);
}

function closeQuizModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.remove();
    }
}

function redirectToImport() {
    window.location.href = '../import/import.html';
}

function startTest(testId) {
    localStorage.setItem('currentTestId', testId);
    window.location.href = '../test/test.html';
}

function viewTestDetails(testId) {
    const tests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    const test = tests[testId];
    
    if (test) {
        alert(`معاينة اختبار: ${test.title}\nعدد الأسئلة: ${test.questions.length}\nالوقت: ${test.time} دقيقة`);
    }
}

// إغلاق النافذة عند النقر خارجها
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quizModal');
    if (event.target === modal) {
        closeQuizModal();
    }
});