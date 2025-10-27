// بيانات الاختبارات
const testsData = {
    1: {
        title: "اختبار الوحدة الأولى: المادة والطاقة",
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
            },
            {
                question: "الطاقة الداخلية للمادة تعتمد على:",
                options: [
                    "درجة الحرارة فقط",
                    "حركة الجزيئات وموقعها",
                    "لون المادة فقط",
                    "شكل المادة الخارجي"
                ],
                correct: 1,
                explanation: "الطاقة الداخلية هي مجموع الطاقة الحركية والطاقة الكامنة للجزيئات"
            },
            {
                question: "أي من الطرق التالية لانتقال الحرارة لا يحتاج إلى وسط مادي؟",
                options: [
                    "التوصيل",
                    "الحمل",
                    "الإشعاع", 
                    "الموجة"
                ],
                correct: 2,
                explanation: "الإشعاع هو طريقة انتقال الحرارة التي لا تحتاج إلى وسط مادي"
            }
        ],
        time: 15 // دقائق
    },
    2: {
        title: "اختبار الوحدة الثانية: التفاعلات الكيميائية",
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
        time: 12
    },
    3: {
        title: "اختبار الوحدة الثالثة: العمليات الحيوية", 
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
                explanation: "البناء الضوئي يحدث primarily في الأوراق الخضراء حيث توجد البلاستيدات الخضراء"
            }
        ],
        time: 18
    },
    4: {
        title: "الاختبار الشامل",
        questions: [
            // يمكنك إضافة أسئلة شاملة هنا
        ],
        time: 30
    }
};

// متغيرات الاختبار
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;
let timerInterval = null;
let timeLeft = 0;

// دوال الاختبارات
function showTestsPage() {
    hideAllPages();
    document.getElementById('testsPage').style.display = 'block';
    loadBestScores();
}

function startTest(testId) {
    if (!testsData[testId]) {
        alert('هذا الاختبار غير متاح حالياً');
        return;
    }
    
    currentTest = testId;
    currentQuestionIndex = 0;
    userAnswers = new Array(testsData[testId].questions.length).fill(null);
    startTime = new Date();
    timeLeft = testsData[testId].time * 60; // تحويل إلى ثواني
    
    // بدء المؤقت
    startTimer();
    
    // عرض صفحة الاختبار
    hideAllPages();
    document.getElementById('testContainer').style.display = 'block';
    document.getElementById('testTitle').textContent = testsData[testId].title;
    
    loadQuestion();
}

function loadQuestion() {
    const test = testsData[currentTest];
    const question = test.questions[currentQuestionIndex];
    
    // تحديث شريط التقدم
    updateProgress();
    
    // عرض السؤال
    document.getElementById('questionText').textContent = question.question;
    
    // عرض الخيارات
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}`;
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''} 
                   onchange="selectAnswer(${index})" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // تحديث أزرار التنقل
    document.getElementById('prevBtn').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    document.getElementById('nextBtn').style.display = currentQuestionIndex < test.questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submitBtn').style.display = currentQuestionIndex === test.questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    loadQuestion(); // إعادة تحميل لتحديث التحديد
}

function nextQuestion() {
    if (currentQuestionIndex < testsData[currentTest].questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function updateProgress() {
    const test = testsData[currentTest];
    const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
    
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `السؤال ${currentQuestionIndex + 1} من ${test.questions.length}`;
}

function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `⏰ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitTest() {
    clearInterval(timerInterval);
    
    // حساب النتيجة
    const test = testsData[currentTest];
    let correctCount = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === test.questions[index].correct) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / test.questions.length) * 100);
    const timeTaken = Math.round((new Date() - startTime) / 1000); // بالثواني
    
    // حفظ أفضل نتيجة
    saveBestScore(currentTest, score);
    
    // عرض النتائج
    showResults(score, correctCount, test.questions.length, timeTaken);
}

function showResults(score, correctCount, totalQuestions, timeTaken) {
    hideAllPages();
    document.getElementById('resultsPage').style.display = 'block';
    
    // تحديث البيانات
    document.getElementById('finalScore').textContent = score;
    document.getElementById('resultTestName').textContent = testsData[currentTest].title;
    document.getElementById('correctAnswers').textContent = `${correctCount}/${totalQuestions}`;
    document.getElementById('percentage').textContent = `${score}%`;
    
    // تحويل الوقت
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    document.getElementById('timeTaken').textContent = `${minutes} دقيقة ${seconds} ثانية`;
    
    // عرض أفضل نتيجة
    const bestScore = getBestScore(currentTest);
    document.getElementById('bestResult').textContent = `${bestScore}%`;
    
    // تحديث الرسم البياني
    updatePerformanceChart();
}

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

function loadBestScores() {
    for (let i = 1; i <= 4; i++) {
        const bestScore = getBestScore(i);
        const element = document.getElementById(`bestScore${i}`);
        if (element) {
            element.textContent = bestScore > 0 ? `${bestScore}%` : '--';
        }
    }
}

function reviewTest() {
    // يمكنك إضافة صفحة مراجعة الإجابات هنا
    alert('سيتم إضافة صفحة مراجعة الإجابات قريباً!');
}

function retakeTest() {
    startTest(currentTest);
}

function updatePerformanceChart() {
    // يمكنك إضافة رسم بياني باستخدام Chart.js
    const ctx = document.getElementById('performanceChart').getContext('2d');
    // كود الرسم البياني سيضاف لاحقاً
}

// تحديث دالة hideAllPages
function hideAllPages() {
    document.getElementById('mainPage').style.display = 'none';
    document.querySelectorAll('.unit-page').forEach(page => {
        page.style.display = 'none';
    });
}

// تحديث القائمة الرئيسية لإضافة رابط الاختبارات
// في القائمة الرئيسية، غير الرابط من #tests إلى showTestsPage()