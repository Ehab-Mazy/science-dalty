// بيانات الاختبارات الأساسية
const testsData = {
    1: {
        title: "🔬 اختبار الوحدة الأولى: المادة والطاقة",
        questions: [
            {
                question: "ما هي حالات المادة الثلاث الرئيسية؟",
                options: [
                    "الصلبة، السائلة، الغازية",
                    "السائلة، البلازما، الصلبة", 
                    "الغازية، الصلبة، البلورية",
                    "المذابة، المعلقة، الصلبة"
                ],
                correct: 0,
                explanation: "الحالات الرئيسية للمادة هي: الصلبة، السائلة، الغازية"
            },
            {
                question: "عند تسخين المادة الصلبة تتحول إلى:",
                options: [
                    "الحالة السائلة",
                    "الحالة الغازية",
                    "تبقى صلبة",
                    "تتحول إلى بلازما"
                ],
                correct: 0,
                explanation: "تتحول المادة الصلبة إلى سائلة عند التسخين في عملية تسمى الانصهار"
            },
            {
                question: "أي من العمليات التالية يمثل تحول المادة من الحالة السائلة إلى الغازية؟",
                options: [
                    "التكثيف",
                    "الانصهار",
                    "التجمد",
                    "التبخر"
                ],
                correct: 3,
                explanation: "التبخر هو عملية تحول المادة من الحالة السائلة إلى الغازية"
            }
        ],
        time: 10
    },
    2: {
        title: "🧪 اختبار الوحدة الثانية: التفاعلات الكيميائية",
        questions: [
            {
                question: "التفاعل الكيميائي هو عملية:",
                options: [
                    "تغير في شكل المادة فقط",
                    "تغير في ترتيب الذرات وتكوين مواد جديدة",
                    "تغير في حجم المادة فقط",
                    "تغير في لون المادة فقط"
                ],
                correct: 1,
                explanation: "التفاعل الكيميائي يتضمن تكسير روابط وتكوين رواق جديدة مما ينتج مواد جديدة"
            },
            {
                question: "في المعادلة الكيميائية، المواد الموجودة على يسار السهم تسمى:",
                options: [
                    "النواتج",
                    "المواد المتفاعلة",
                    "العوامل المساعدة",
                    "المحفزات"
                ],
                correct: 1,
                explanation: "المواد المتفاعلة (Reactants) هي المواد الداخلة في التفاعل وتكتب على يسار السهم"
            }
        ],
        time: 8
    },
    3: {
        title: "🌿 اختبار الوحدة الثالثة: العمليات الحيوية", 
        questions: [
            {
                question: "البناء الضوئي يحدث في:",
                options: [
                    "الجذور فقط",
                    "الأوراق الخضراء",
                    "الساق فقط", 
                    "جميع أجزاء النبات"
                ],
                correct: 1,
                explanation: "البناء الضوئي يحدث في الأوراق الخضراء حيث توجد البلاستيدات الخضراء"
            }
        ],
        time: 5
    }
};

// === نظام الاختبارات المستوردة ===
function loadImportedTests() {
    const importedTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
    Object.entries(importedTests).forEach(([testId, testData]) => {
        testsData[testId] = testData;
    });
}

// عرض الاختبارات الأساسية
function displayBasicTests() {
    const container = document.getElementById('basicTestsGrid');
    if (!container) return;

    container.innerHTML = '';

    [1, 2, 3].forEach(testId => {
        if (testsData[testId]) {
            const test = testsData[testId];
            const bestScore = getBestScore(testId);
            const testHTML = `
                <div class="test-card" onclick="startTest(${testId})">
                    <div class="test-icon">🔬</div>
                    <h3>${test.title}</h3>
                    <div class="test-meta">
                        <span>❓ ${test.questions.length} أسئلة</span>
                        <span>⏱️ ${test.time} دقيقة</span>
                    </div>
                    <div class="test-score">
                        <span>🎯 ${bestScore > 0 ? bestScore + '%' : 'لم تحل بعد'}</span>
                    </div>
                    <button class="btn btn-primary">بدء الاختبار</button>
                </div>
            `;
            container.innerHTML += testHTML;
        }
    });
}

// عرض الاختبارات المستوردة
function displayImportedTestsInTestsPage() {
    const container = document.getElementById('importedTestsInTestsPage');
    if (!container) return;

    const importedTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
    container.innerHTML = '';

    if (Object.keys(importedTests).length === 0) {
        container.innerHTML = `
            <div class="no-tests-message">
                <div class="no-tests-icon">📝</div>
                <h3>لا توجد اختبارات إضافية حالياً</h3>
                <p>يتم إضافة اختبارات جديدة بشكل دوري</p>
            </div>
        `;
        return;
    }

    Object.values(importedTests).forEach(test => {
        const bestScore = getBestScore(test.id);
        const testHTML = `
            <div class="test-card imported-test" onclick="startTest('${test.id}')">
                <div class="test-icon">🎯</div>
                <h3>${test.title}</h3>
                <div class="test-meta">
                    <span>❓ ${test.questions.length} أسئلة</span>
                    <span>⏱️ ${test.time} دقيقة</span>
                </div>
                <div class="test-score">
                    <span>🎯 ${bestScore > 0 ? bestScore + '%' : 'لم تحل بعد'}</span>
                </div>
                <button class="btn btn-success">بدء الاختبار</button>
            </div>
        `;
        container.innerHTML += testHTML;
    });
}

// دوال الاختبارات
function showTestsPage() {
    hideAllPages();
    document.getElementById('testsPage').style.display = 'block';
    loadImportedTests();
    displayBasicTests();
    displayImportedTestsInTestsPage();
}

function startTest(testId) {
    loadImportedTests();
    
    if (!testsData[testId]) {
        alert('❌ الاختبار غير متاح');
        return;
    }
    
    currentTest = testId;
    currentQuestionIndex = 0;
    userAnswers = new Array(testsData[testId].questions.length).fill(null);
    startTime = new Date();
    timeLeft = testsData[testId].time * 60;
    
    startTimer();
    hideAllPages();
    document.getElementById('testContainer').style.display = 'block';
    document.getElementById('testTitle').textContent = testsData[testId].title;
    
    loadQuestion();
}

function submitTest() {
    clearInterval(timerInterval);
    
    const test = testsData[currentTest];
    let correctCount = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === test.questions[index].correct) {
            correctCount++;
        }
    });
    
    const totalQuestions = test.questions.length;
    const wrongCount = totalQuestions - correctCount;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const timeTaken = Math.round((new Date() - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    
    // حفظ أفضل نتيجة
    saveBestScore(currentTest, score);
    
    // عرض النتائج
    showResults(score, correctCount, wrongCount, totalQuestions, minutes);
}

function showResults(score, correctCount, wrongCount, totalQuestions, minutes) {
    hideAllPages();
    document.getElementById('resultsPage').style.display = 'block';
    
    // تحديث البيانات
    document.getElementById('finalScore').textContent = score;
    document.getElementById('resultTestName').textContent = testsData[currentTest].title;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('wrongAnswers').textContent = wrongCount;
    document.getElementById('timeTaken').textContent = minutes;
}

// باقي الدوال تبقى كما هي...
function saveBestScore(testId, score) {
    const bestScores = JSON.parse(localStorage.getItem('bestScores') || '{}');
    if (!bestScores[testId] || score > bestScores[testId]) {
        bestScores[testId] = score;
        localStorage.setItem('bestScores', JSON.stringify(bestScores));
    }
}

function getBestScore(testId) {
    const bestScores = JSON.parse(localStorage.getItem('bestScores') || '{}');
    return bestScores[testId] || 0;
}

// التهيئة
document.addEventListener('DOMContentLoaded', function() {
    hideAllPages();
    document.getElementById('mainPage').style.display = 'block';
    loadImportedTests();
});