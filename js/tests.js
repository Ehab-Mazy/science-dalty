// نظام الاختبارات الكامل
class TestSystem {
    constructor() {
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.timerInterval = null;
        this.timeLeft = 0;
        this.testData = null;
        this.init();
    }

    init() {
        this.loadUserStats();
        this.displayTests();
        this.setupEventListeners();
    }

    // تحميل إحصائيات المستخدم
    loadUserStats() {
        const allResults = JSON.parse(localStorage.getItem('testResults') || '{}');
        let totalTests = 0;
        let totalScore = 0;
        let totalTime = 0;
        let bestScore = 0;

        Object.values(allResults).forEach(testResults => {
            totalTests += testResults.length;
            testResults.forEach(result => {
                totalScore += result.score;
                totalTime += result.timeTaken;
                if (result.score > bestScore) {
                    bestScore = result.score;
                }
            });
        });

        const averageScore = totalTests > 0 ? Math.round(totalScore / totalTests) : 0;
        const totalMinutes = Math.round(totalTime / 60);

        document.getElementById('completedTests').textContent = totalTests;
        document.getElementById('averageScore').textContent = `${averageScore}%`;
        document.getElementById('totalTime').textContent = totalMinutes;
        document.getElementById('bestScore').textContent = `${bestScore}%`;
    }

    // عرض جميع الاختبارات
    displayTests(filter = 'all') {
        const testsGrid = document.getElementById('testsGrid');
        testsGrid.innerHTML = '';

        Object.keys(testsData).forEach(testId => {
            const test = testsData[testId];
            const bestScore = this.getBestScore(testId);
            const isCompleted = this.isTestCompleted(testId);
            
            if (this.shouldShowTest(test, filter)) {
                const testCard = this.createTestCard(test, testId, bestScore, isCompleted);
                testsGrid.appendChild(testCard);
            }
        });
    }

    // إنشاء بطاقة اختبار
    createTestCard(test, testId, bestScore, isCompleted) {
        const testCard = document.createElement('div');
        testCard.className = `test-card ${isCompleted ? 'completed' : ''} ${test.isNew ? 'new' : ''}`;
        
        testCard.innerHTML = `
            <div class="test-card-header">
                <h3>${test.title}</h3>
                <span class="difficulty-badge ${test.difficulty}">${this.getDifficultyText(test.difficulty)}</span>
            </div>
            <div class="test-card-body">
                <p>${test.description}</p>
                <div class="test-card-info">
                    <div class="test-info-item">
                        <span>${test.questions.length}</span>
                        <span>سؤال</span>
                    </div>
                    <div class="test-info-item">
                        <span>${test.time}</span>
                        <span>دقيقة</span>
                    </div>
                    <div class="test-info-item">
                        <span>${bestScore}%</span>
                        <span>أفضل نتيجة</span>
                    </div>
                </div>
            </div>
            <div class="test-card-actions">
                <button class="btn btn-primary" onclick="testSystem.startTest(${testId})">
                    ${isCompleted ? '🔄 إعادة المحاولة' : 'بدء الاختبار'}
                </button>
                <button class="btn btn-outline" onclick="testSystem.showTestInfo(${testId})">
                    ℹ️ معلومات
                </button>
            </div>
        `;

        return testCard;
    }

    // بدء اختبار
    startTest(testId) {
        if (!testsData[testId]) {
            alert('هذا الاختبار غير متاح حالياً');
            return;
        }

        this.currentTest = testId;
        this.currentQuestionIndex = 0;
        this.testData = testsData[testId];
        this.userAnswers = new Array(this.testData.questions.length).fill(null);
        this.startTime = new Date();
        this.timeLeft = this.testData.time * 60;

        this.showTestPage();
        this.startTimer();
        this.loadQuestion();
    }

    // عرض صفحة الاختبار
    showTestPage() {
        document.getElementById('testPage').classList.remove('hidden');
        document.getElementById('testTitle').textContent = this.testData.title;
        window.scrollTo(0, 0);
    }

    // إعداد المستمعين للأحداث
    setupEventListeners() {
        // تصفية الاختبارات
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.displayTests(e.target.dataset.filter);
            });
        });
    }

    // باقي الدوال (loadQuestion, nextQuestion, previousQuestion, etc.)
    // ... [يتبع بنفس الدوال السابقة مع تحسينات]
}

// إنشاء instance من نظام الاختبارات
const testSystem = new TestSystem();

// دوال عامة للاستدعاء من HTML
function showTestsList() {
    document.getElementById('testPage').classList.add('hidden');
}

function startQuickTest(questionCount) {
    const randomQuestions = testSystem.getRandomQuestions(questionCount);
    // بدء اختبار سريع بالأسئلة العشوائية
}
// اختبار تجريبي بسيط
const simpleTest = {
    title: "❓ اختبار تجريبي",
    time: 5,
    questions: [
        {
            question: "ما هي عاصمة مصر؟",
            options: ["القاهرة", "الإسكندرية", "الجيزة", "أسوان"],
            correct: 0,
            explanation: "القاهرة هي عاصمة مصر"
        },
        {
            question: "كم عدد أرجل العنكبوت؟",
            options: ["6", "8", "10", "4"],
            correct: 1, 
            explanation: "العنكبوت له 8 أرجل"
        }
    ]
};

// أضف هذا الاختبار
addQuickTest(99, simpleTest);

// ثم قم بتحديث الصفحة وشاهد النتيجة!