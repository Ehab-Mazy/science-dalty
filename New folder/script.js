// قاعدة بيانات الاختبارات
const testsDatabase = {
    heat: {
        title: "اختبار الحرارة النوعية",
        questions: [
            {
                question: "ما هي الحرارة النوعية؟",
                options: [
                    "كمية الحرارة اللازمة لرفع درجة حرارة 1 جرام من المادة درجة مئوية واحدة",
                    "كمية الحرارة اللازمة لتحويل المادة من الحالة الصلبة إلى السائلة",
                    "كمية الحرارة اللازمة لرفع درجة حرارة 1 كجم من المادة درجة مئوية واحدة",
                    "كمية الحرارة المنطلقة عند احتراق المادة"
                ],
                correct: 0
            },
            {
                question: "ما وحدة قياس الحرارة النوعية في النظام الدولي للوحدات؟",
                options: [
                    "جول/كجم.كلفن",
                    "جول/جرام.كلفن",
                    "سعرة/جرام.كلفن",
                    "واط/م².كلفن"
                ],
                correct: 0
            },
            {
                question: "أي من المواد التالية لها أعلى حرارة نوعية؟",
                options: [
                    "الحديد",
                    "النحاس",
                    "الماء",
                    "الزئبق"
                ],
                correct: 2
            },
            {
                question: "إذا كانت الحرارة النوعية للماء 4184 جول/كجم.كلفن، فكم كمية الحرارة اللازمة لرفع درجة حرارة 2 كجم من الماء من 20°C إلى 30°C؟",
                options: [
                    "83680 جول",
                    "8368 جول",
                    "41840 جول",
                    "836800 جول"
                ],
                correct: 0
            },
            {
                question: "ما العلاقة الرياضية المستخدمة لحساب كمية الحرارة؟",
                options: [
                    "Q = m × c × ΔT",
                    "Q = m × c / ΔT",
                    "Q = m / c × ΔT",
                    "Q = c / m × ΔT"
                ],
                correct: 0
            },
            {
                question: "لماذا يستغرق الماء وقتاً أطول للتسخين مقارنة بالمعادن؟",
                options: [
                    "لأن له كثافة عالية",
                    "لأن له حرارة نوعية عالية",
                    "لأنه موصل رديء للحرارة",
                    "لأن له نقطة غليان منخفضة"
                ],
                correct: 1
            },
            {
                question: "إذا كانت الحرارة النوعية للألمنيوم 900 جول/كجم.كلفن، فما مقدار الطاقة اللازمة لرفع درجة حرارة 0.5 كجم من الألمنيوم بمقدار 10°C؟",
                options: [
                    "4500 جول",
                    "9000 جول",
                    "450 جول",
                    "1800 جول"
                ],
                correct: 0
            },
            {
                question: "أي من العوامل التالية لا يؤثر على الحرارة النوعية للمادة؟",
                options: [
                    "نوع المادة",
                    "درجة الحرارة",
                    "الضغط",
                    "حجم العينة"
                ],
                correct: 3
            },
            {
                question: "ما تأثير الحرارة النوعية العالية للماء على المناخ الساحلي؟",
                options: [
                    "يؤدي إلى تقلبات حرارية كبيرة بين الليل والنهار",
                    "يؤدي إلى اعتدال درجات الحرارة على السواحل",
                    "يؤدي إلى انخفاض درجات الحرارة صيفاً وارتفاعها شتاءً",
                    "لا يؤثر على المناخ الساحلي"
                ],
                correct: 1
            },
            {
                question: "إذا تم تسخين عينتين من الماء والحديد بنفس كمية الحرارة، فأي منهما ستكون درجة حرارته أعلى؟",
                options: [
                    "الماء",
                    "الحديد",
                    "ستكون درجة حرارتهما متساوية",
                    "يعتمد على كتلة كل منهما"
                ],
                correct: 1
            },
            {
                question: "ما الحرارة النوعية لمادة إذا كانت كمية الحرارة اللازمة لرفع درجة حرارة 200 جرام منها بمقدار 50°C هي 4000 جول؟",
                options: [
                    "0.4 جول/جرام.كلفن",
                    "4 جول/جرام.كلفن",
                    "40 جول/جرام.كلفن",
                    "400 جول/جرام.كلفن"
                ],
                correct: 0
            },
            {
                question: "أي من التطبيقات التالية يعتمد على مبدأ الحرارة النوعية؟",
                options: [
                    "المكواة الكهربائية",
                    "المدفأة",
                    "أنظمة التبريد في السيارات",
                    "كل ما سبق"
                ],
                correct: 3
            },
            {
                question: "ما الفرق بين السعة الحرارية والحرارة النوعية؟",
                options: [
                    "لا يوجد فرق بينهما",
                    "السعة الحرارية خاصة بالجسم بينما الحرارة النوعية خاصة بالمادة",
                    "السعة الحرارية خاصة بالمادة بينما الحرارة النوعية خاصة بالجسم",
                    "السعة الحرارية تقاس بالكيلوجرام بينما الحرارة النوعية تقاس بالجرام"
                ],
                correct: 1
            },
            {
                question: "إذا كانت الحرارة النوعية للذهب 129 جول/كجم.كلفن، فكم تبلغ كمية الحرارة اللازمة لرفع درجة حرارة 100 جرام من الذهب من 25°C إلى 125°C؟",
                options: [
                    "1290 جول",
                    "12900 جول",
                    "129 جول",
                    "12.9 جول"
                ],
                correct: 0
            },
            {
                question: "لماذا تستخدم أواني الطهي المصنوعة من الألمنيوم أو النحاس؟",
                options: [
                    "لأنها رخيصة الثمن",
                    "لأنها خفيفة الوزن",
                    "لأن لها حرارة نوعية منخفضة فتسخن بسرعة",
                    "لأنها لا تصدأ"
                ],
                correct: 2
            }
        ]
    },
    physics: {
        title: "اختبار القوانين الفيزيائية",
        questions: [
            {
                question: "ما هو قانون نيوتن الأول؟",
                options: [
                    "القوة تساوي الكتلة مضروبة في التسارع",
                    "لكل فعل رد فعل مساوٍ له في المقدار ومعاكس في الاتجاه",
                    "يظل الجسم في حالته الساكنة أو المتحركة بسرعة ثابتة ما لم تؤثر عليه قوة خارجية",
                    "الشغل يساوي القوة مضروبة في المسافة"
                ],
                correct: 2
            },
            {
                question: "ما هي وحدة قياس القوة في النظام الدولي؟",
                options: [
                    "الجول",
                    "النيوتن",
                    "الباسكال",
                    "الواط"
                ],
                correct: 1
            }
            // يمكنك إضافة المزيد من الأسئلة هنا
        ]
    },
    chemistry: {
        title: "اختبار التفاعلات الكيميائية",
        questions: [
            {
                question: "ما هو التفاعل الكيميائي؟",
                options: [
                    "عملية تتغير فيها الخواص الفيزيائية للمواد",
                    "عملية تكسر فيها الروابط الكيميائية وتتكون روابط جديدة",
                    "عملية ذوبان المواد في الماء",
                    "عملية تحول المادة من الحالة الصلبة إلى السائلة"
                ],
                correct: 1
            },
            {
                question: "ما نوع التفاعل بين الحمض والقاعدة؟",
                options: [
                    "تفاعل احتراق",
                    "تفاعل تعادل",
                    "تفاعل أكسدة واختزال",
                    "تفاعل إحلال"
                ],
                correct: 1
            }
            // يمكنك إضافة المزيد من الأسئلة هنا
        ]
    }
};

// حالة التطبيق
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testResults = {};

// عناصر DOM
const testsList = document.querySelector('.tests-list');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const quizTitle = document.getElementById('quiz-title');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const scoreValue = document.getElementById('score-value');
const totalQuestions = document.getElementById('total-questions');
const correctAnswers = document.getElementById('correct-answers');
const wrongAnswers = document.getElementById('wrong-answers');
const percentage = document.getElementById('percentage');
const feedback = document.getElementById('feedback');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const backToTestsBtn = document.getElementById('back-to-tests');

// مستمعي الأحداث
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // إضافة مستمعي الأحداث لأزرار البدء
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', startTest);
    });
    
    // مستمعي الأحداث لأزرار التحكم
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    submitBtn.addEventListener('click', submitTest);
    
    // مستمعي الأحداث لأزرار النتائج
    reviewBtn.addEventListener('click', reviewAnswers);
    restartBtn.addEventListener('click', restartTest);
    backToTestsBtn.addEventListener('click', backToTests);
}

function startTest(event) {
    const testId = event.target.getAttribute('data-test');
    currentTest = testsDatabase[testId];
    
    if (!currentTest) {
        alert('الاختبار غير متوفر حالياً');
        return;
    }
    
    // إعادة تعيين البيانات
    currentQuestionIndex = 0;
    userAnswers = new Array(currentTest.questions.length).fill(null);
    testResults = {};
    
    // تحديث الواجهة
    testsList.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    quizTitle.textContent = currentTest.title;
    totalQuestions.textContent = currentTest.questions.length;
    
    loadQuestion();
}

function loadQuestion() {
    const question = currentTest.questions[currentQuestionIndex];
    
    // تحديث شريط التقدم
    const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${currentTest.questions.length}`;
    
    // تحديث رقم السؤال
    questionNumber.textContent = `السؤال ${currentQuestionIndex + 1}`;
    
    // تحديث نص السؤال
    questionText.textContent = question.question;
    
    // تحديث الخيارات
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
            <span>${option}</span>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // تحديث حالة الأزرار
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === currentTest.questions.length - 1;
    submitBtn.style.display = currentQuestionIndex === currentTest.questions.length - 1 ? 'block' : 'none';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    loadQuestion();
}

function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function submitTest() {
    // حساب النتائج
    let correctCount = 0;
    const feedbackItems = [];
    
    currentTest.questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        if (isCorrect) {
            correctCount++;
        }
        
        feedbackItems.push({
            question: question.question,
            userAnswer: question.options[userAnswers[index]] || 'لم يتم الإجابة',
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect
        });
    });
    
    const wrongCount = currentTest.questions.length - correctCount;
    const percentageValue = Math.round((correctCount / currentTest.questions.length) * 100);
    
    // حفظ النتائج
    testResults = {
        correctCount,
        wrongCount,
        percentage: percentageValue,
        feedback: feedbackItems
    };
    
    // عرض النتائج
    showResults();
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // تحديث النتائج
    scoreValue.textContent = testResults.correctCount;
    correctAnswers.textContent = testResults.correctCount;
    wrongAnswers.textContent = testResults.wrongCount;
    percentage.textContent = `${testResults.percentage}%`;
    
    // تحديث دائرة النتيجة
    const scoreCircle = document.querySelector('.score-circle');
    scoreCircle.style.background = `conic-gradient(#2ecc71 ${testResults.percentage}%, #ecf0f1 ${testResults.percentage}%)`;
    
    // تحديث التغذية الراجعة
    feedback.innerHTML = '';
    testResults.feedback.forEach((item, index) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = `feedback-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
        
        feedbackItem.innerHTML = `
            <p><strong>سؤال ${index + 1}:</strong> ${item.question}</p>
            <p>إجابتك: ${item.userAnswer}</p>
            ${!item.isCorrect ? `<p>الإجابة الصحيحة: ${item.correctAnswer}</p>` : ''}
        `;
        
        feedback.appendChild(feedbackItem);
    });
}

function reviewAnswers() {
    currentQuestionIndex = 0;
    quizContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    loadQuestion();
}

function restartTest() {
    startTest({ target: { getAttribute: () => Object.keys(testsDatabase).find(key => testsDatabase[key] === currentTest) } });
}

function backToTests() {
    testsList.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
}