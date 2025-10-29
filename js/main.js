// بيانات البحث
const searchData = [
    {
        title: "الوحدة الأولى: المادة والطاقة",
        type: "unit",
        url: "#unit1",
        keywords: ["الوحدة الأولى", "المادة والطاقة", "حالات المادة", "الطاقة الداخلية", "درجة الحرارة", "انتقال الحرارة"]
    },
    {
        title: "حالات المادة وتحولاتها",
        type: "lesson",
        unit: 1,
        url: "#unit1",
        keywords: ["حالات المادة", "صلبة", "سائلة", "غازية", "تحولات"]
    },
    {
        title: "تغير حالات المادة",
        type: "lesson", 
        unit: 1,
        url: "#unit1",
        keywords: ["انصهار", "تجمد", "تبخر", "تكثيف", "تغير حالات"]
    },
    {
        title: "الطاقة الداخلية ودرجة الحرارة",
        type: "lesson",
        unit: 1,
        url: "#unit1",
        keywords: ["طاقة داخلية", "درجة حرارة", "طاقة حركية", "جزيئات"]
    },
    {
        title: "طرق انتقال الحرارة",
        type: "lesson",
        unit: 1,
        url: "#unit1",
        keywords: ["انتقال الحرارة", "توصيل", "حمل", "إشعاع"]
    },
    {
        title: "الوحدة الثانية: التفاعلات الكيميائية",
        type: "unit",
        url: "#unit2",
        keywords: ["الوحدة الثانية", "تفاعلات كيميائية", "معادلة كيميائية", "كيمياء التغذية"]
    },
    {
        title: "الوحدة الثالثة: تدفق الطاقة",
        type: "unit",
        url: "#unit3", 
        keywords: ["الوحدة الثالثة", "تدفق الطاقة", "عمليات حيوية", "بناء ضوئي", "تنفس خلوي"]
    }
];

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
        time: 15
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
        time: 12
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
        time: 18
    }
};

// متغيرات الاختبار
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;
let timerInterval = null;
let timeLeft = 0;

// === نظام الاختبارات المستوردة ===

// دالة لتحميل الاختبارات من localStorage
function loadImportedTests() {
    const importedTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
    
    // دمج الاختبارات المستوردة مع testsData
    Object.entries(importedTests).forEach(([testId, testData]) => {
        testsData[testId] = {
            title: testData.title,
            time: testData.time,
            questions: testData.questions
        };
    });
}

// دالة لعرض الاختبارات الأساسية في صفحة الاختبارات
function displayBasicTests() {
    const container = document.getElementById('basicTestsGrid');
    if (!container) return;

    container.innerHTML = '';

    // عرض الاختبارات الأساسية فقط (1, 2, 3)
    [1, 2, 3].forEach(testId => {
        if (testsData[testId] && testsData[testId].questions) {
            const test = testsData[testId];
            const bestScore = getBestScore(testId);
            const testHTML = `
                <div class="test-card">
                    <h3>${test.title}</h3>
                    <p>${test.questions.length} سؤال</p>
                    <p>⏱️ الوقت: ${test.time} دقيقة</p>
                    <p>🎯 أفضل نتيجة: <span>${bestScore > 0 ? bestScore + '%' : '--'}</span></p>
                    <button class="btn btn-primary" onclick="startTest(${testId})">بدء الاختبار</button>
                </div>
            `;
            container.innerHTML += testHTML;
        }
    });
}

// دالة لعرض الاختبارات المستوردة في صفحة الاختبارات
function displayImportedTestsInTestsPage() {
    const container = document.getElementById('importedTestsInTestsPage');
    if (!container) return;

    const importedTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
    container.innerHTML = '';

    if (Object.keys(importedTests).length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #718096; background: #f7fafc; border-radius: 10px;">
                <div style="font-size: 48px; margin-bottom: 15px;">📝</div>
                <h3 style="color: #4a5568;">لا توجد اختبارات مستوردة بعد</h3>
                <p>استخدم زر "استيراد اختبار جديد" لإنشاء اختبارك الأول</p>
            </div>
        `;
        return;
    }

    Object.values(importedTests).forEach(test => {
        const bestScore = getBestScore(test.id);
        const testHTML = `
            <div class="imported-test-item" style="margin: 15px 0; padding: 20px; background: white; border-radius: 12px; border: 2px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 8px 0; color: #2d3748;">🎯 ${test.title}</h4>
                        <div style="display: flex; gap: 20px; font-size: 14px; color: #666;">
                            <span>❓ ${test.questions.length} سؤال</span>
                            <span>⏱️ ${test.time} دقيقة</span>
                            <span>🎯 أفضل نتيجة: ${bestScore > 0 ? bestScore + '%' : '--'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-success" onclick="startTest('${test.id}')" 
                                style="padding: 10px 20px;">
                            ✏️ بدء الاختبار
                        </button>
                        <button class="btn btn-danger" onclick="deleteTest('${test.id}')" 
                                style="padding: 10px 15px;">
                            🗑️ حذف
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += testHTML;
    });
}

// دالة تحديث القائمة في صفحة الاختبارات
function refreshTestsInTestsPage() {
    loadImportedTests();
    displayBasicTests();
    displayImportedTestsInTestsPage();
    alert('✅ تم تحديث قائمة الاختبارات');
}

// دالة حذف الاختبار
function deleteTest(testId) {
    if (confirm('⚠️ هل أنت متأكد من حذف هذا الاختبار؟')) {
        const importedTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
        delete importedTests[testId];
        localStorage.setItem('importedTests', JSON.stringify(importedTests));
        
        // إزالة من testsData أيضاً
        delete testsData[testId];
        
        refreshTestsInTestsPage();
        alert('✅ تم حذف الاختبار');
    }
}

// دوال التنقل الرئيسية
function showMainPage() {
    hideAllPages();
    document.getElementById('mainPage').style.display = 'block';
    window.scrollTo(0, 0);
}

function showUnit(unitNumber) {
    document.getElementById('mainPage').style.display = 'none';
    document.querySelectorAll('.unit-page').forEach(page => {
        page.style.display = 'none';
    });
    
    if (unitNumber === 4) {
        alert('📚 الوحدة الرابعة قيد التطوير وسيتم إضافتها قريباً!');
        showMainPage();
    } else {
        document.getElementById('unit' + unitNumber).style.display = 'block';
        window.scrollTo(0, 0);
    }
}

function hideAllPages() {
    document.getElementById('mainPage').style.display = 'none';
    document.querySelectorAll('.unit-page').forEach(page => {
        page.style.display = 'none';
    });
}

// دوال البحث
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (searchTerm.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
    }
    
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
    
    displaySearchResults(results, resultsContainer);
}

function displaySearchResults(results, container) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
    } else {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.innerHTML = `
                <strong>${result.title}</strong>
                <span class="result-type">${getTypeText(result.type)}</span>
            `;
            resultElement.onclick = () => {
                if (result.type === 'unit') {
                    showUnit(result.unit || 1);
                }
                container.style.display = 'none';
                document.getElementById('searchInput').value = '';
            };
            container.appendChild(resultElement);
        });
    }
    
    container.style.display = 'block';
}

function getTypeText(type) {
    const types = {
        'unit': '📚 وحدة',
        'lesson': '📖 درس'
    };
    return types[type] || type;
}

// دوال الفيديوهات
function showAllVideos() {
    alert('🎬 سيتم فتح مكتبة الفيديوهات قريباً!');
}

// دوال التجارب
function openExperiment(experimentType) {
    const experiments = {
        'diffusion': 'تجربة الانتشار',
        'matter-states': 'تجربة حالات المادة',
        'internal energy': 'تجربة الطاقة الداخلية',
        'heat-transfer': 'تجربة انتقال الحرارة'
    };
    
    alert(`🔬 جارٍ تحميل ${experiments[experimentType] || 'التجربة'}...`);
    window.location.href = 'stemulation/experiments/index.html';
}

// دوال الاختبارات القصيرة
function takeQuiz(lessonNumber) {
    alert(`🎯 اختبار الدرس ${lessonNumber} قيد التطوير!`);
}

function takeTest(unitNumber) {
    if (testsData[unitNumber]) {
        startTest(unitNumber);
    } else {
        alert('📝 هذا الاختبار غير متاح حالياً!');
    }
}

// دوال التنزيل
function downloadResource(type) {
    const resources = {
        'presentation': 'العرض التقديمي',
        'worksheet': 'ورقة العمل', 
        'summary': 'ملخص الدرس',
        'images': 'مكتبة الصور'
    };
    
    alert(`📥 جارٍ تحميل ${resources[type] || 'المورد'}...`);
}

// دوال المسابقات
function showCompetition() {
    alert('🏆 المسابقة الحالية: مسابقة العلوم الأسبوعية - تفاصيل قريباً!');
}

// دوال معلومات الموقع
function showAbout() {
    alert('ℹ️ موقع علوم الصف الثاني الإعدادي - منهج مصر\nتم التطوير بواسطة: إيهاب مازي عبده');
}

function showContact() {
    alert('📞 للتواصل:\nالبريد الإلكتروني: example@email.com\nالمدرسة: الشهيد حمزة السحيتي الإعدادية');
}

// دوال الاختبارات التفاعلية
function showTestsPage() {
    hideAllPages();
    document.getElementById('testsPage').style.display = 'block';
    loadBestScores();
    loadImportedTests();
    displayBasicTests();
    displayImportedTestsInTestsPage();
}

function startTest(testId) {
    // تحميل أحدث البيانات
    loadImportedTests();
    
    if (!testsData[testId]) {
        alert('❌ الاختبار غير موجود. قد يكون قد تم مسحه.');
        return;
    }
    
    currentTest = testId;
    currentQuestionIndex = 0;
    userAnswers = new Array(testsData[testId].questions.length).fill(null);
    startTime = new Date();
    timeLeft = testsData[testId].time * 60;
    
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
    loadQuestion();
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
    const timeTaken = Math.round((new Date() - startTime) / 1000);
    
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
    for (let i = 1; i <= 3; i++) {
        const bestScore = getBestScore(i);
        const element = document.getElementById(`bestScore${i}`);
        if (element) {
            element.textContent = bestScore > 0 ? `${bestScore}%` : '--';
        }
    }
}

function reviewTest() {
    alert('سيتم إضافة صفحة مراجعة الإجابات قريباً!');
}

function retakeTest() {
    startTest(currentTest);
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء جميع الصفحات وإظهار الرئيسية فقط
    hideAllPages();
    document.getElementById('mainPage').style.display = 'block';
    
    // تحميل الاختبارات المستوردة
    loadImportedTests();
    
    console.log('✅ تم تحميل الموقع بنجاح');
});