// نظام تشغيل الفيديو المحسن
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة نظام الفيديو
    initVideoSystem();
    
    // تهيئة نظام الاختبارات
    initQuizSystem();
    
    // التحقق من اتصال الاختبارات
    setTimeout(checkQuizConnection, 1000);
});

function initVideoSystem() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');
    
    // التأكد من وجود العناصر الأساسية
    if (!videoModal || !videoPlayer) {
        console.error('عناصر الفيديو الأساسية غير موجودة في الصفحة');
        return;
    }
    
    // إضافة event listeners للفيديوهات
    document.addEventListener('click', function(e) {
        const videoThumbnail = e.target.closest('.video-thumbnail');
        if (videoThumbnail) {
            e.preventDefault();
            e.stopPropagation();
            
            const videoId = videoThumbnail.getAttribute('data-video');
            const title = videoThumbnail.getAttribute('data-title') || 'فيديو تعليمي';
            const description = videoThumbnail.getAttribute('data-description') || 'شرح مفصل للدرس';
            
            playVideo(videoId, title, description);
        }
    });
    
    // دالة تشغيل الفيديو
    function playVideo(videoId, title, description) {
        if (!videoId || videoId.trim() === '') {
            showMessage('🎬 هذا الفيديو قيد الإعداد وسيتم إضافته قريباً');
            return;
        }
        
        try {
            // بناء رابط YouTube مع إعدادات محسنة
            const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
            
            videoPlayer.src = videoUrl;
            videoTitle.textContent = title;
            videoDescription.textContent = description;
            
            // عرض النافذة
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // التركيز على النافذة للتحكم باللوحة المفاتيح
            videoModal.focus();
            
        } catch (error) {
            console.error('خطأ في تشغيل الفيديو:', error);
            showMessage('❌ حدث خطأ في تشغيل الفيديو. يرجى المحاولة مرة أخرى.');
        }
    }
    
    // إغلاق النافذة
    function closeVideoModal() {
        videoModal.style.display = 'none';
        
        // إيقاف الفيديو
        if (videoPlayer) {
            videoPlayer.src = '';
        }
        
        document.body.style.overflow = 'auto';
    }
    
    // إضافة event listeners للإغلاق
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });
    
    // معالجة أخطاء الصور التمثيلية
    initThumbnailErrorHandling();
}

function initThumbnailErrorHandling() {
    document.querySelectorAll('.thumbnail-image').forEach(img => {
        img.addEventListener('error', function() {
            handleThumbnailError(this);
        });
        
        // التحقق الاستباقي للصور التمثيلية
        if (img.complete && img.naturalHeight === 90) {
            // هذه صورة YouTube الافتراضية (منخفضة الجودة)
            handleThumbnailError(img);
        }
    });
}

function handleThumbnailError(imgElement) {
    const parent = imgElement.closest('.video-thumbnail');
    if (!parent) return;
    
    const videoId = parent.getAttribute('data-video');
    const title = parent.getAttribute('data-title') || 'فيديو تعليمي';
    
    if (!videoId) return;
    
    // تسلسل محاولات الصور البديلة
    const thumbnailAttempts = [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/default.jpg`
    ];
    
    let currentAttempt = 0;
    
    function tryNextThumbnail() {
        if (currentAttempt >= thumbnailAttempts.length) {
            // جميع المحاولات فشلت، عرض placeholder
            showThumbnailPlaceholder(parent, title);
            return;
        }
        
        const newSrc = thumbnailAttempts[currentAttempt];
        currentAttempt++;
        
        // إنشاء صورة جديدة للتحقق
        const testImage = new Image();
        testImage.onload = function() {
            if (testImage.naturalHeight > 100) { // صورة ذات جودة مقبولة
                imgElement.src = newSrc;
            } else {
                tryNextThumbnail();
            }
        };
        testImage.onerror = tryNextThumbnail;
        testImage.src = newSrc;
    }
    
    tryNextThumbnail();
}

function showThumbnailPlaceholder(thumbnailElement, title) {
    const existingPlaceholder = thumbnailElement.querySelector('.thumbnail-placeholder');
    if (existingPlaceholder) return;
    
    thumbnailElement.querySelector('.thumbnail-image').style.display = 'none';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'thumbnail-placeholder';
    placeholder.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 2rem; margin-bottom: 10px;">🎬</div>
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <small>انقر للمشاهدة</small>
        </div>
    `;
    
    thumbnailElement.appendChild(placeholder);
}

function showMessage(message) {
    // إنشاء عنصر للرسائل إذا لم يكن موجوداً
    let messageEl = document.getElementById('videoMessage');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'videoMessage';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    // إخفاء الرسالة بعد 3 ثوان
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

function checkQuizConnection() {
    try {
        const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
        console.log('الاختبارات المحفوظة:', savedTests);
        
        const lessons = [
            'unit1-lesson1', 'unit1-lesson2', 'unit1-lesson3', 
            'unit1-lesson4', 'unit1-lesson5', 'unit1-lesson6', 'unit1-lesson7'
        ];
        
        lessons.forEach(lessonId => {
            const testsForLesson = Object.values(savedTests).filter(test => 
                test.lessonLink === lessonId
            );
            console.log(`الدرس ${lessonId}: ${testsForLesson.length} اختبار`);
        });
    } catch (error) {
        console.error('خطأ في التحقق من اتصال الاختبارات:', error);
    }
}

// دالة مساعدة للانتقال إلى صفحة الاختبارات
function goToQuiz(lessonId) {
    window.location.href = `quiz.html?lesson=${lessonId}`;
}

// نظام الاختبارات المتكامل
function initQuizSystem() {
    console.log('تم تهيئة نظام الاختبارات');
    
    // إضافة أنماط CSS للاختبارات
    addQuizStyles();
}

// بيانات الاختبارات الكاملة
const quizData = {
    'unit1-lesson1': {
        title: 'اختبار درس: حالات المادة',
        description: 'اختبر معلوماتك في درس حالات المادة',
        questions: [
            {
                question: 'كم عدد حالات المادة الأساسية؟',
                options: ['2', '3', '4', '5'],
                correctAnswer: 1,
                explanation: 'حالات المادة الأساسية هي: الصلبة، السائلة، الغازية'
            },
            {
                question: 'أي من الخصائص تنتمي للحالة الصلبة؟',
                options: ['شكل ثابت وحجم ثابت', 'شكل غير ثابت وحجم ثابت', 'شكل غير ثابت وحجم غير ثابت', 'شكل ثابت وحجم غير ثابت'],
                correctAnswer: 0,
                explanation: 'المادة في الحالة الصلبة لها شكل ثابت وحجم ثابت'
            },
            {
                question: 'ما الخاصية التي تميز الحالة الغازية؟',
                options: ['قابلية الانضغاط', 'شكل ثابت', 'حجم ثابت', 'كل ما سبق'],
                correctAnswer: 0,
                explanation: 'الغازات قابلة للانضغاط بدرجة كبيرة'
            }
        ]
    },
    'unit1-lesson2': {
        title: 'اختبار درس: تغير حالات المادة',
        description: 'اختبر معلوماتك في درس تغير حالات المادة',
        questions: [
            {
                question: 'عملية تحول المادة من الحالة الصلبة إلى الحالة السائلة تسمى:',
                options: ['التكثف', 'الانصهار', 'التجمد', 'التبخر'],
                correctAnswer: 1,
                explanation: 'الانصهار هو تحول المادة من الحالة الصلبة إلى السائلة'
            },
            {
                question: 'عند تبريد المادة السائلة تتحول إلى:',
                options: ['غاز', 'سائل', 'صلبة', 'بلازما'],
                correctAnswer: 2,
                explanation: 'عند تبريد المادة السائلة تتحول إلى الحالة الصلبة في عملية تسمى التجمد'
            },
            {
                question: 'أي من العمليات التالية تحتاج إلى امتصاص حرارة؟',
                options: ['الانصهار', 'التكثف', 'التجمد', 'كل ما سبق'],
                correctAnswer: 0,
                explanation: 'الانصهار والتبخر عمليات تحتاج إلى امتصاص حرارة'
            }
        ]
    },
    'unit1-lesson3': {
        title: 'اختبار درس: الطاقة الداخلية ودرجة الحرارة',
        description: 'اختبر معلوماتك في درس الطاقة الداخلية ودرجة الحرارة',
        questions: [
            {
                question: 'ما هو الفرق بين الطاقة الداخلية ودرجة الحرارة؟',
                options: [
                    'الطاقة الداخلية هي كمية الطاقة الكلية للمادة، بينما درجة الحرارة هي مقياس لمتوسط الطاقة الحركية للجزيئات',
                    'الطاقة الداخلية هي مقياس للحرارة، ودرجة الحرارة هي مقياس للطاقة',
                    'لا يوجد فرق بينهما',
                    'الطاقة الداخلية هي مقياس للطاقة الكامنة، ودرجة الحرارة هي مقياس للطاقة الحركية'
                ],
                correctAnswer: 0,
                explanation: 'الطاقة الداخلية تمثل مجموع الطاقات في المادة، بينما درجة الحرارة تقيس متوسط الطاقة الحركية للجزيئات'
            },
            {
                question: 'ما هي وحدة قياس درجة الحرارة في النظام الدولي؟',
                options: ['الفهرنهايت', 'الكلفن', 'السليزيوس', 'الجول'],
                correctAnswer: 1,
                explanation: 'الكلفن هي وحدة قياس درجة الحرارة في النظام الدولي للوحدات'
            }
        ]
    },
    'unit1-lesson4': {
        title: 'اختبار درس: الحرارة النوعية',
        description: 'اختبر معلوماتك في درس الحرارة النوعية',
        questions: [
            {
                question: 'ما المقصود بالحرارة النوعية للمادة؟',
                options: [
                    'كمية الحرارة اللازمة لرفع درجة حرارة 1 جرام من المادة درجة مئوية واحدة',
                    'كمية الحرارة التي تطلقها المادة عند احتراقها',
                    'درجة حرارة انصهار المادة',
                    'القدرة على توصيل الحرارة'
                ],
                correctAnswer: 0,
                explanation: 'الحرارة النوعية هي كمية الحرارة اللازمة لرفع درجة حرارة 1 جرام من المادة بمقدار 1 درجة مئوية'
            }
        ]
    },
    'unit1-lesson5': {
        title: 'اختبار درس: مراجعة حالات المادة',
        description: 'اختبر معلوماتك في مراجعة حالات المادة',
        questions: [
            {
                question: 'ما هو العامل الرئيسي الذي يتحكم في تغير حالات المادة؟',
                options: ['اللون', 'الطاقة الحرارية', 'الكثافة', 'الحجم'],
                correctAnswer: 1,
                explanation: 'الطاقة الحرارية هي العامل الرئيسي في تغير حالات المادة'
            }
        ]
    },
    'unit1-lesson6': {
        title: 'اختبار درس: الارتفاع ودرجة الحرارة',
        description: 'اختبر معلوماتك في درس الارتفاع ودرجة الحرارة',
        questions: [
            {
                question: 'لماذا تكون قمة الجبل أبرد من قاعدته؟',
                options: [
                    'لأن الهواء يكون أقل كثافة في الأعلى',
                    'لأن الضغط الجوي أقل في الأعلى',
                    'لأن درجة الحرارة تنخفض مع الارتفاع',
                    'جميع ما سبق'
                ],
                correctAnswer: 3,
                explanation: 'جميع الأسباب المذكورة تساهم في انخفاض درجة الحرارة في قمم الجبال'
            }
        ]
    },
    'unit1-lesson7': {
        title: 'اختبار درس: انتقال الحرارة',
        description: 'اختبر معلوماتك في درس انتقال الحرارة',
        questions: [
            {
                question: 'ما هي طرق انتقال الحرارة الثلاث؟',
                options: [
                    'التوصيل، الحمل، الإشعاع',
                    'التبخر، التكثف، الانصهار',
                    'الطاقة، الشغل، القدرة',
                    'الحرارة، البرودة، الاعتدال'
                ],
                correctAnswer: 0,
                explanation: 'طرق انتقال الحرارة هي التوصيل والحمل والإشعاع'
            }
        ]
    }
};

// المتغيرات العامة لنظام الاختبارات
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// دالة لعرض اختبارات الدرس
function showLessonTests(lessonId, lessonTitle) {
    console.log('فتح اختبارات الدرس:', lessonId, lessonTitle);
    
    const quizModal = document.getElementById('quizModal');
    const quizLessonTitle = document.getElementById('quizLessonTitle');
    const quizLessonDescription = document.getElementById('quizLessonDescription');
    const quizList = document.getElementById('quizList');
    
    if (!quizModal) {
        console.error('عنصر نافذة الاختبارات غير موجود');
        showMessage('❌ حدث خطأ في تحميل الاختبارات');
        return;
    }
    
    // تحديث عنوان ووصف الدرس
    quizLessonTitle.textContent = `اختبارات: ${lessonTitle}`;
    quizLessonDescription.textContent = `اختبر معلوماتك في درس ${lessonTitle}`;
    
    // مسح قائمة الاختبارات السابقة
    quizList.innerHTML = '';
    
    // التحقق من وجود اختبار لهذا الدرس
    if (!quizData[lessonId]) {
        console.warn('لا توجد بيانات اختبار للدرس:', lessonId);
        quizList.innerHTML = `
            <div class="no-quiz-message">
                <p>⚠️ لا توجد اختبارات متاحة لهذا الدرس حالياً</p>
                <p>سيتم إضافة الاختبارات قريباً</p>
            </div>
        `;
    } else {
        // إنشاء اختبار من البيانات
        const test = {
            id: lessonId,
            title: quizData[lessonId].title,
            description: quizData[lessonId].description,
            lessonLink: lessonId,
            questions: quizData[lessonId].questions
        };
        
        // التحقق مما إذا كان الاختبار مكتملاً
        const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
        const isCompleted = quizResults[lessonId] !== undefined;
        const score = isCompleted ? quizResults[lessonId].score : 0;
        
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        
        if (isCompleted) {
            quizItem.classList.add('completed');
        }
        
        quizItem.innerHTML = `
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <div class="quiz-meta">
                <span class="quiz-questions">${test.questions.length} سؤال</span>
                <span class="quiz-status ${isCompleted ? 'completed' : 'not-completed'}">
                    ${isCompleted ? `مكتمل - ${score}%` : 'غير مكتمل'}
                </span>
            </div>
        `;
        
        quizItem.addEventListener('click', function() {
            console.log('بدء الاختبار:', test);
            startQuiz(test);
        });
        
        quizList.appendChild(quizItem);
    }
    
    // عرض نافذة الاختبارات
    quizModal.style.display = 'block';
    console.log('تم عرض نافذة الاختبارات');
}

// بدء الاختبار
function startQuiz(test) {
    console.log('بدء الاختبار:', test);
    
    if (!test || !test.questions || test.questions.length === 0) {
        console.error('بيانات الاختبار غير صالحة:', test);
        showMessage('❌ لا يمكن بدء الاختبار - البيانات غير متاحة');
        return;
    }
    
    // إغلاق نافذة الاختبارات
    const quizModal = document.getElementById('quizModal');
    if (quizModal) {
        quizModal.style.display = 'none';
    }
    
    // حفظ الاختبار الحالي
    currentQuiz = test;
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    // إنشاء نافذة الاختبار
    createQuizWindow();
}

// إنشاء نافذة الاختبار
function createQuizWindow() {
    // إغلاق نافذة الاختبارات الحالية إذا كانت مفتوحة
    const existingQuizWindow = document.getElementById('quizWindow');
    if (existingQuizWindow) {
        existingQuizWindow.remove();
    }
    
    // إنشاء نافذة الاختبار
    const quizWindow = document.createElement('div');
    quizWindow.id = 'quizWindow';
    quizWindow.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    quizWindow.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h2>${currentQuiz.title}</h2>
                <p>${currentQuiz.description}</p>
            </div>
            
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="quizProgressBar"></div>
                </div>
                <div id="quizProgressText">السؤال 1 من ${currentQuiz.questions.length}</div>
            </div>
            
            <div id="questionContainer" class="question-container">
                <div class="question-text" id="questionText">${currentQuiz.questions[0].question}</div>
                <div class="options-container" id="optionsContainer">
                    ${currentQuiz.questions[0].options.map((option, index) => `
                        <div class="option" data-index="${index}">${option}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button id="prevBtn" class="btn btn-secondary" disabled>السابق</button>
                <button id="nextBtn" class="btn btn-primary">التالي</button>
            </div>
            
            <div id="resultContainer" class="quiz-result hidden">
                <h2>نتيجة الاختبار</h2>
                <div class="result-score" id="resultScore">0%</div>
                <div class="result-message" id="resultMessage"></div>
                <button id="restartQuiz" class="btn btn-primary">إعادة الاختبار</button>
                <button id="closeQuiz" class="btn btn-secondary">إغلاق</button>
            </div>
        </div>
    `;
    
    // إضافة النافذة إلى body
    document.body.appendChild(quizWindow);
    
    // تهيئة أحداث الاختبار
    initQuizEvents();
    
    // عرض السؤال الأول
    showQuestion();
}

// تهيئة أحداث الاختبار
function initQuizEvents() {
    // أحداث الخيارات
    document.getElementById('optionsContainer').addEventListener('click', function(e) {
        const option = e.target.closest('.option');
        if (option) {
            selectOption(parseInt(option.getAttribute('data-index')));
        }
    });
    
    // أحداث أزرار التنقل
    document.getElementById('prevBtn').addEventListener('click', goToPreviousQuestion);
    document.getElementById('nextBtn').addEventListener('click', goToNextQuestion);
    
    // أحداث النتيجة
    document.getElementById('restartQuiz').addEventListener('click', restartQuiz);
    document.getElementById('closeQuiz').addEventListener('click', function() {
        document.getElementById('quizWindow').remove();
    });
}

// عرض السؤال الحالي
function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.setAttribute('data-index', index);
        optionElement.textContent = option;
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // تحديث شريط التقدم
    updateProgressBar();
    
    // تحديث أزرار التنقل
    updateNavigationButtons();
}

// تحديث شريط التقدم
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${progress}%`;
    document.getElementById('quizProgressText').textContent = `السؤال ${currentQuestionIndex + 1} من ${currentQuiz.questions.length}`;
}

// تحديث أزرار التنقل
function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        document.getElementById('nextBtn').textContent = 'إنهاء الاختبار';
    } else {
        document.getElementById('nextBtn').textContent = 'التالي';
    }
}

// اختيار خيار
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // تحديث المظهر للخيار المحدد
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// الانتقال إلى السؤال التالي
function goToNextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('يرجى اختيار إجابة للمتابعة');
        return;
    }
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // انتهاء الاختبار
        calculateScore();
        showResult();
    }
}

// الانتقال إلى السؤال السابق
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// حساب النتيجة
function calculateScore() {
    score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
}

// عرض النتيجة
function showResult() {
    document.getElementById('questionContainer').classList.add('hidden');
    document.querySelector('.navigation-buttons').classList.add('hidden');
    
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.classList.remove('hidden');
    
    const percentage = (score / currentQuiz.questions.length) * 100;
    document.getElementById('resultScore').textContent = `${percentage}%`;
    
    let message = '';
    if (percentage >= 80) {
        message = 'ممتاز! لديك فهم رائع للدرس.';
    } else if (percentage >= 60) {
        message = 'جيد جداً! يمكنك مراجعة بعض النقاط.';
    } else if (percentage >= 40) {
        message = 'ليس سيئاً! ننصحك بمراجعة الدرس مرة أخرى.';
    } else {
        message = 'يحتاج إلى تحسين. ننصحك بمراجعة الدرس بعناية.';
    }
    document.getElementById('resultMessage').textContent = message;
    
    // حفظ النتيجة
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    quizResults[currentQuiz.id] = {
        score: percentage,
        date: new Date().toISOString()
    };
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
}

// إعادة الاختبار
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('questionContainer').classList.remove('hidden');
    document.querySelector('.navigation-buttons').classList.remove('hidden');
    
    showQuestion();
}

// إضافة أنماط CSS للاختبارات
function addQuizStyles() {
    const styles = `
        .quiz-container {
            max-width: 800px;
            width: 100%;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-height: 90vh;
            overflow-y: auto;
        }

        .quiz-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .quiz-progress {
            margin: 20px 0;
        }

        .progress-bar {
            height: 10px;
            background: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: #4CAF50;
            width: 0%;
            transition: width 0.3s ease;
        }

        .question-container {
            margin-bottom: 20px;
        }

        .question-text {
            font-size: 1.2rem;
            margin-bottom: 15px;
            font-weight: bold;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .option {
            padding: 15px;
            background: #f5f5f5;
            border: 2px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .option:hover {
            background: #e9e9e9;
        }

        .option.selected {
            border-color: #4CAF50;
            background: #e8f5e8;
        }

        .navigation-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn-primary {
            background: #4CAF50;
            color: white;
        }

        .btn-secondary {
            background: #9e9e9e;
            color: white;
        }

        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .quiz-result {
            text-align: center;
            padding: 20px;
        }

        .result-score {
            font-size: 2rem;
            font-weight: bold;
            margin: 20px 0;
        }

        .result-message {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }

        .hidden {
            display: none;
        }

        /* نافذة الاختبارات */
        .quiz-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            overflow-y: auto;
        }

        .quiz-modal-content {
            background: white;
            margin: 5% auto;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            position: relative;
        }

        .close-quiz-modal {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #333;
        }

        .quiz-list {
            margin: 20px 0;
        }

        .quiz-item {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .quiz-item:hover {
            background: #f9f9f9;
        }

        .quiz-item.completed {
            border-color: #4CAF50;
            background: #f1f8e9;
        }

        .quiz-status {
            float: left;
            font-weight: bold;
        }

        .quiz-status.completed {
            color: #4CAF50;
        }

        .quiz-status.not-completed {
            color: #f44336;
        }

        .no-quiz-message {
            text-align: center;
            padding: 40px 20px;
            color: #666;
        }

        .no-quiz-message p {
            margin: 10px 0;
        }

        .quiz-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }

        .quiz-questions {
            background: #e3f2fd;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.9rem;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// اختبار سريع للوظيفة
function testQuizSystem() {
    console.log('=== اختبار نظام الاختبارات ===');
    
    // اختبار وجود البيانات
    console.log('بيانات الاختبارات:', quizData);
    
    // اختبار وجود الدروس
    const testLessons = ['unit1-lesson1', 'unit1-lesson2', 'unit1-lesson3'];
    testLessons.forEach(lessonId => {
        if (quizData[lessonId]) {
            console.log(`✓ ${lessonId}: ${quizData[lessonId].questions.length} سؤال`);
        } else {
            console.log(`✗ ${lessonId}: لا توجد بيانات`);
        }
    });
    
    // اختبار الدوال
    const requiredFunctions = ['showLessonTests', 'startQuiz', 'initQuizSystem'];
    requiredFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✓ دالة ${funcName} موجودة`);
        } else {
            console.log(`✗ دالة ${funcName} غير موجودة`);
        }
    });
}

// تشغيل الاختبار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testQuizSystem, 1000);
});