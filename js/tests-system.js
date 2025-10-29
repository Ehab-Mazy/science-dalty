// نظام الاختبارات المتكامل
class TestsSystem {
    constructor() {
        this.userProgress = JSON.parse(localStorage.getItem('userProgress')) || this.getDefaultProgress();
        this.init();
    }

    getDefaultProgress() {
        return {
            points: 0,
            completedTests: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            totalTime: 0,
            unit1: { 
                progress: 0, 
                score: 0, 
                lessons: {
                    lesson1: { completed: false, score: 0, points: 0 },
                    lesson2: { completed: false, score: 0, points: 0 }
                } 
            },
            unit2: { 
                progress: 0, 
                score: 0, 
                lessons: {
                    lesson1: { completed: false, score: 0, points: 0 }
                } 
            },
            unit3: { 
                progress: 0, 
                score: 0, 
                lessons: {
                    lesson1: { completed: false, score: 0, points: 0 }
                } 
            },
            importedTests: {}
        };
    }

    init() {
        this.loadProgress();
        this.displayOverallProgress();
        this.displayUnitProgress();
        this.updateLessonStatus();
        this.loadAdditionalTests();
        
        console.log('✅ نظام الاختبارات جاهز للعمل');
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        }
    }

    saveProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }

    displayOverallProgress() {
        const totalPoints = this.userProgress.points;
        const completedTests = this.userProgress.completedTests;
        const totalQuestions = this.userProgress.totalQuestions;
        const correctAnswers = this.userProgress.correctAnswers;
        
        const successRate = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        const totalTests = 6; // 3 وحدات × 2 (درس + اختبار وحدة)
        const overallProgress = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

        if (document.getElementById('totalPoints')) {
            document.getElementById('totalPoints').textContent = totalPoints;
        }
        if (document.getElementById('completedTests')) {
            document.getElementById('completedTests').textContent = completedTests;
        }
        if (document.getElementById('successRate')) {
            document.getElementById('successRate').textContent = successRate + '%';
        }
        if (document.getElementById('overallProgress')) {
            document.getElementById('overallProgress').style.width = overallProgress + '%';
        }

        // تحديث نتائج الوحدات
        this.updateUnitScores();
    }

    updateUnitScores() {
        const units = ['unit1', 'unit2', 'unit3'];
        units.forEach(unit => {
            const scoreElement = document.getElementById(unit + 'Score');
            if (scoreElement) {
                scoreElement.textContent = this.userProgress[unit].score > 0 ? 
                    this.userProgress[unit].score + '%' : '--';
            }
        });
    }

    displayUnitProgress() {
        // تحديث دوائر التقدم للوحدات
        this.updateProgressCircle('unit1', this.userProgress.unit1.progress);
        this.updateProgressCircle('unit2', this.userProgress.unit2.progress);
        this.updateProgressCircle('unit3', this.userProgress.unit3.progress);
    }

    updateProgressCircle(unitId, progress) {
        const circle = document.getElementById(unitId + 'Progress');
        const percentElement = document.getElementById(unitId + 'Percent');
        
        if (circle && percentElement) {
            const offset = 220 - (progress * 220 / 100);
            circle.style.strokeDashoffset = offset;
            percentElement.textContent = Math.round(progress) + '%';
        }
    }

    updateLessonStatus() {
        // تحديث حالة الدروس بناءً على التقدم
        const units = ['unit1', 'unit2', 'unit3'];
        
        units.forEach(unitId => {
            const unit = this.userProgress[unitId];
            Object.keys(unit.lessons).forEach(lessonId => {
                const lessonElement = document.querySelector(`[onclick="startLessonTest('${unitId}', '${lessonId}')"]`);
                if (lessonElement) {
                    const statusElement = lessonElement.closest('.lesson-card').querySelector('.lesson-status');
                    if (statusElement) {
                        const lesson = unit.lessons[lessonId];
                        if (lesson.completed) {
                            statusElement.textContent = 'مكتمل';
                            statusElement.className = 'lesson-status completed';
                        } else if (lesson.score > 0) {
                            statusElement.textContent = 'قيد التقدم';
                            statusElement.className = 'lesson-status in-progress';
                        } else {
                            statusElement.textContent = 'لم يبدأ';
                            statusElement.className = 'lesson-status not-started';
                        }
                    }
                }
            });
        });
    }

    startLessonTest(unitId, lessonId) {
        const testData = this.getLessonTestData(unitId, lessonId);
        if (testData) {
            this.openTestWindow(testData, 'lesson', unitId, lessonId);
        } else {
            alert('❌ لا يوجد اختبار لهذا الدرس حالياً');
        }
    }

    startUnitTest(unitNumber) {
        const testData = this.getUnitTestData(unitNumber);
        if (testData) {
            this.openTestWindow(testData, 'unit', `unit${unitNumber}`);
        }
    }

    getLessonTestData(unitId, lessonId) {
        const tests = {
            unit1: {
                lesson1: {
                    title: "📚 اختبار درس: حالات المادة وتحولاتها",
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
                            points: 10,
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
                            points: 10,
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
                            points: 10,
                            explanation: "التبخر هو عملية تحول المادة من الحالة السائلة إلى الغازية"
                        }
                    ],
                    time: 8
                },
                lesson2: {
                    title: "📚 اختبار درس: تغير حالات المادة",
                    questions: [
                        {
                            question: "عملية تحول المادة من الحالة السائلة إلى الصلبة تسمى:",
                            options: [
                                "انصهار",
                                "تبخر",
                                "تكثيف",
                                "تجمد"
                            ],
                            correct: 3,
                            points: 10,
                            explanation: "تحول المادة من سائلة إلى صلبة يسمى التجمد"
                        },
                        {
                            question: "أي من العمليات التالية تمثل تحول المادة من الحالة الغازية إلى السائلة؟",
                            options: [
                                "انصهار",
                                "تبخر",
                                "تكثيف",
                                "تسامي"
                            ],
                            correct: 2,
                            points: 10,
                            explanation: "تحول المادة من غازية إلى سائلة يسمى التكثيف"
                        }
                    ],
                    time: 6
                }
            },
            unit2: {
                lesson1: {
                    title: "📚 اختبار درس: مقدمة في التفاعلات الكيميائية",
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
                            points: 10,
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
                            points: 10,
                            explanation: "المواد المتفاعلة (Reactants) هي المواد الداخلة في التفاعل وتكتب على يسار السهم"
                        }
                    ],
                    time: 7
                }
            },
            unit3: {
                lesson1: {
                    title: "📚 اختبار درس: البناء الضوئي",
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
                            points: 10,
                            explanation: "البناء الضوئي يحدث في الأوراق الخضراء حيث توجد البلاستيدات الخضراء"
                        },
                        {
                            question: "ما هو مصدر الطاقة في عملية البناء الضوئي؟",
                            options: [
                                "الماء",
                                "الهواء",
                                "ضوء الشمس",
                                "التربة"
                            ],
                            correct: 2,
                            points: 10,
                            explanation: "ضوء الشمس هو مصدر الطاقة في عملية البناء الضوئي"
                        }
                    ],
                    time: 6
                }
            }
        };

        return tests[unitId]?.[lessonId];
    }

    getUnitTestData(unitNumber) {
        const unitTests = {
            1: {
                title: "🔬 اختبار الوحدة الأولى الشامل: المادة والطاقة",
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
                        points: 15,
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
                        points: 15,
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
                        points: 15,
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
                        points: 15,
                        explanation: "الطاقة الداخلية هي مجموع الطاقة الحركية والطاقة الكامنة للجزيئات"
                    }
                ],
                time: 15
            },
            2: {
                title: "🧪 اختبار الوحدة الثانية الشامل: التفاعلات الكيميائية",
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
                        points: 20,
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
                        points: 20,
                        explanation: "المواد المتفاعلة (Reactants) هي المواد الداخلة في التفاعل وتكتب على يسار السهم"
                    },
                    {
                        question: "أي من العوامل التالية يسرع التفاعل الكيميائي؟",
                        options: [
                            "انخفاض درجة الحرارة",
                            "زيادة تركيز المواد",
                            "تقليل مساحة السطح",
                            "إضافة مانع التفاعل"
                        ],
                        correct: 1,
                        points: 20,
                        explanation: "زيادة تركيز المواد تزيد من فرص التصادم بين الجزيئات فتسرع التفاعل"
                    }
                ],
                time: 12
            },
            3: {
                title: "🌿 اختبار الوحدة الثالثة الشامل: تدفق الطاقة",
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
                        points: 25,
                        explanation: "البناء الضوئي يحدث في الأوراق الخضراء حيث توجد البلاستيدات الخضراء"
                    },
                    {
                        question: "ما هي المادة المنتجة في البناء الضوئي؟",
                        options: [
                            "ثاني أكسيد الكربون",
                            "الأكسجين",
                            "النيتروجين",
                            "الهيدروجين"
                        ],
                        correct: 1,
                        points: 25,
                        explanation: "ينتج النبات الأكسجين كمنتج ثانوي للبناء الضوئي"
                    },
                    {
                        question: "العملية التي تطلق الطاقة في الخلية تسمى:",
                        options: [
                            "البناء الضوئي",
                            "التنفس الخلوي",
                            "التمثيل الغذائي",
                            "الانقسام الخلوي"
                        ],
                        correct: 1,
                        points: 25,
                        explanation: "التنفس الخلوي هو العملية التي تطلق الطاقة المخزنة في الجلوكوز"
                    }
                ],
                time: 10
            }
        };

        return unitTests[unitNumber];
    }

    openTestWindow(testData, testType = 'lesson', unitId = null, lessonId = null) {
        // حفظ بيانات الاختبار الحالي في localStorage
        const testSession = {
            testData: testData,
            testType: testType,
            unitId: unitId,
            lessonId: lessonId,
            timestamp: Date.now()
        };
        
        localStorage.setItem('currentTestSession', JSON.stringify(testSession));
        
        // الانتقال إلى صفحة الاختبار النشط
        window.location.href = 'test-active.html';
    }

    startAdditionalTest(testId) {
        const additionalTests = JSON.parse(localStorage.getItem('importedTests')) || {};
        const test = additionalTests[testId];
        
        if (test) {
            // تحويل تنسيق الاختبار المستورد لتتناسب مع النظام
            const formattedTest = {
                title: test.title,
                questions: test.questions.map(q => ({
                    question: q.question,
                    options: q.options,
                    correct: q.correct,
                    points: 10, // نقاط افتراضية للاختبارات المستوردة
                    explanation: q.explanation || 'شرح الإجابة'
                })),
                time: test.time
            };
            
            this.openTestWindow(formattedTest, 'imported', null, null, testId);
        } else {
            alert('❌ الاختبار غير موجود');
        }
    }

    // دالة معالجة نتائج الاختبار
    processTestResults(score, correctAnswers, totalQuestions, timeTaken, points) {
        const testSession = JSON.parse(localStorage.getItem('currentTestSession') || '{}');
        
        if (!testSession.testData) {
            console.error('❌ لا توجد بيانات اختبار');
            return;
        }

        // تحديث الإحصائيات العامة
        this.userProgress.points += points;
        this.userProgress.completedTests += 1;
        this.userProgress.totalQuestions += totalQuestions;
        this.userProgress.correctAnswers += correctAnswers;
        this.userProgress.totalTime += timeTaken;

        // حفظ النتائج بناءً على نوع الاختبار
        switch(testSession.testType) {
            case 'lesson':
                this.updateLessonProgress(testSession.unitId, testSession.lessonId, score, points);
                break;
            case 'unit':
                this.updateUnitTestProgress(testSession.unitId, score, points);
                break;
            case 'imported':
                this.updateImportedTestProgress(score, points);
                break;
        }

        this.saveProgress();
        this.showResults(score, correctAnswers, totalQuestions, timeTaken, points);
    }

    updateLessonProgress(unitId, lessonId, score, points) {
        if (!this.userProgress[unitId]) {
            this.userProgress[unitId] = { progress: 0, score: 0, lessons: {} };
        }
        
        this.userProgress[unitId].lessons[lessonId] = {
            completed: true,
            score: Math.max(this.userProgress[unitId].lessons[lessonId]?.score || 0, score),
            points: points,
            completedAt: new Date().toISOString()
        };
        
        this.updateUnitProgress(unitId);
    }

    updateUnitTestProgress(unitId, score, points) {
        if (!this.userProgress[unitId]) {
            this.userProgress[unitId] = { progress: 0, score: 0, lessons: {} };
        }
        
        // حفظ أفضل نتيجة للوحدة
        this.userProgress[unitId].score = Math.max(this.userProgress[unitId].score, score);
        this.userProgress[unitId].points = (this.userProgress[unitId].points || 0) + points;
    }

    updateUnitProgress(unitId) {
        const unit = this.userProgress[unitId];
        const lessons = Object.values(unit.lessons);
        const completedLessons = lessons.filter(lesson => lesson.completed);
        
        if (lessons.length > 0) {
            unit.progress = (completedLessons.length / lessons.length) * 100;
        }
    }

    updateImportedTestProgress(score, points) {
        // يمكن إضافة تتبع للاختبارات المستوردة إذا لزم الأمر
        console.log(`✅ اختبار مستورد - النقاط: ${points}, النتيجة: ${score}%`);
    }

    showResults(score, correctAnswers, totalQuestions, timeTaken, points) {
        const resultsHTML = `
            <div class="results-popup" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                ">
                    <h2 style="color: #2d3748; margin-bottom: 20px;">🎉 تم إنهاء الاختبار!</h2>
                    
                    <div style="
                        font-size: 4rem;
                        font-weight: bold;
                        color: #667eea;
                        margin: 20px 0;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                    ">${score}%</div>
                    
                    <div style="
                        background: #f7fafc;
                        padding: 20px;
                        border-radius: 12px;
                        margin: 20px 0;
                        text-align: right;
                    ">
                        <p style="margin: 10px 0; color: #4a5568;">
                            <span style="font-weight: bold;">✅ الإجابات الصحيحة:</span> 
                            ${correctAnswers}/${totalQuestions}
                        </p>
                        <p style="margin: 10px 0; color: #4a5568;">
                            <span style="font-weight: bold;">⏱️ الوقت المستغرق:</span> 
                            ${timeTaken} دقيقة
                        </p>
                        <p style="margin: 10px 0; color: #4a5568;">
                            <span style="font-weight: bold;">🏆 النقاط المكتسبة:</span> 
                            ${points} نقطة
                        </p>
                    </div>
                    
                    <button onclick="testsSystem.closeResults()" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 1.1rem;
                        font-weight: bold;
                        cursor: pointer;
                        margin: 10px;
                        transition: transform 0.3s ease;
                    " onmouseover="this.style.transform='scale(1.05)'" 
                       onmouseout="this.style.transform='scale(1)'">
                        العودة للاختبارات
                    </button>
                </div>
            </div>
        `;
        
        // إضافة popup للنتائج
        const popup = document.createElement('div');
        popup.id = 'testResultsPopup';
        popup.innerHTML = resultsHTML;
        document.body.appendChild(popup);
    }

    closeResults() {
        const popup = document.getElementById('testResultsPopup');
        if (popup) {
            popup.remove();
        }
        // العودة إلى صفحة الاختبارات
        window.location.href = 'tests.html';
    }

    loadAdditionalTests() {
        // تحميل الاختبارات الإضافية من localStorage
        const additionalTests = JSON.parse(localStorage.getItem('importedTests')) || {};
        const container = document.getElementById('additionalTests');
        
        if (!container) return;

        if (Object.keys(additionalTests).length === 0) {
            container.innerHTML = `
                <div class="lesson-card" style="text-align: center; grid-column: 1 / -1;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📝</div>
                    <h3 style="color: #4a5568; margin-bottom: 10px;">لا توجد اختبارات إضافية حالياً</h3>
                    <p style="color: #718096;">يتم إضافة اختبارات جديدة بشكل دوري</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        Object.entries(additionalTests).forEach(([testId, test]) => {
            const bestScore = this.userProgress.importedTests?.[testId]?.score || 0;
            const testHTML = `
                <div class="lesson-card">
                    <div class="lesson-header">
                        <h3>🎯 ${test.title}</h3>
                        <span class="lesson-status ${bestScore > 0 ? 'completed' : 'not-started'}">
                            ${bestScore > 0 ? 'مكتمل' : 'جديد'}
                        </span>
                    </div>
                    <p>${test.description || 'اختبار إضافي لتعزيز فهمك للمادة العلمية'}</p>
                    <div class="lesson-meta">
                        <span>⏱️ ${test.time} دقيقة</span>
                        <span>❓ ${test.questions.length} أسئلة</span>
                        ${bestScore > 0 ? `<span>🎯 ${bestScore}%</span>` : ''}
                    </div>
                    <button class="btn btn-success" onclick="testsSystem.startAdditionalTest('${testId}')">
                        ✏️ بدء الاختبار
                    </button>
                </div>
            `;
            container.innerHTML += testHTML;
        });
    }

    // دالة لمسح التقدم (للاستخدام في التطوير)
    resetProgress() {
        if (confirm('⚠️ هل أنت متأكد من مسح جميع التقدم والنتائج؟')) {
            this.userProgress = this.getDefaultProgress();
            this.saveProgress();
            this.displayOverallProgress();
            this.displayUnitProgress();
            this.updateLessonStatus();
            alert('✅ تم مسح جميع التقدم');
        }
    }

    // دالة لتصدير النتائج
    exportResults() {
        const dataStr = JSON.stringify(this.userProgress, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'نتائج-الاختبارات-' + new Date().toISOString().split('T')[0] + '.json';
        link.click();
    }
}

// إنشاء نسخة من النظام
const testsSystem = new TestsSystem();

// دوال عامة للاستخدام في HTML
function startLessonTest(unitId, lessonId) {
    testsSystem.startLessonTest(unitId, lessonId);
}

function startUnitTest(unitNumber) {
    testsSystem.startUnitTest(unitNumber);
}

function startAdditionalTest(testId) {
    testsSystem.startAdditionalTest(testId);
}

// دالة للمساعد في التطوير (يمكن إزالتها في الإصدار النهائي)
function devTools() {
    console.log('🔧 أدوات المطور:');
    console.log('testsSystem.resetProgress() - مسح التقدم');
    console.log('testsSystem.exportResults() - تصدير النتائج');
    console.log('localStorage.getItem("userProgress") - عرض التقدم');
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة أدوات المطور في console
    window.testsSystem = testsSystem;
    console.log('🎯 نظام الاختبارات جاهز');
    console.log('🔧 اكتب devTools() لرؤية أدوات المطور');
});