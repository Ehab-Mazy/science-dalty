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
            unit1: { progress: 0, score: 0, lessons: {} },
            unit2: { progress: 0, score: 0, lessons: {} },
            unit3: { progress: 0, score: 0, lessons: {} }
        };
    }

    init() {
        this.loadProgress();
        this.displayOverallProgress();
        this.displayUnitProgress();
        this.loadAdditionalTests();
    }

    loadProgress() {
        // تحميل التقدم من localStorage
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
        const successRate = completedTests > 0 ? Math.round((this.userProgress.points / (completedTests * 100)) * 100) : 0;
        const overallProgress = (completedTests / 6) * 100; // 6 اختبارات إجمالاً

        document.getElementById('totalPoints').textContent = totalPoints;
        document.getElementById('completedTests').textContent = completedTests;
        document.getElementById('successRate').textContent = successRate + '%';
        document.getElementById('overallProgress').style.width = overallProgress + '%';

        // تحديث نتائج الوحدات
        document.getElementById('unit1Score').textContent = this.userProgress.unit1.score > 0 ? this.userProgress.unit1.score + '%' : '--';
        document.getElementById('unit2Score').textContent = this.userProgress.unit2.score > 0 ? this.userProgress.unit2.score + '%' : '--';
        document.getElementById('unit3Score').textContent = this.userProgress.unit3.score > 0 ? this.userProgress.unit3.score + '%' : '--';
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

    startLessonTest(unitId, lessonId) {
        // بدء اختبار درس معين
        const testData = this.getLessonTestData(unitId, lessonId);
        if (testData) {
            this.openTestWindow(testData);
        }
    }

    startUnitTest(unitNumber) {
        // بدء اختبار وحدة كاملة
        const testData = this.getUnitTestData(unitNumber);
        if (testData) {
            this.openTestWindow(testData);
        }
    }

    getLessonTestData(unitId, lessonId) {
        // بيانات اختبارات الدروس (يمكن استبدالها ببيانات حقيقية)
        const tests = {
            unit1: {
                lesson1: {
                    title: "اختبار درس: حالات المادة وتحولاتها",
                    questions: [
                        {
                            question: "ما هي حالات المادة الثلاث الرئيسية؟",
                            options: ["الصلبة، السائلة، الغازية", "السائلة، البلازما، الصلبة", "الغازية، الصلبة، البلورية", "المذابة، المعلقة، الصلبة"],
                            correct: 0,
                            points: 10
                        },
                        {
                            question: "عند تسخين المادة الصلبة تتحول إلى:",
                            options: ["الحالة السائلة", "الحالة الغازية", "تبقى صلبة", "تتحول إلى بلازما"],
                            correct: 0,
                            points: 10
                        }
                    ],
                    time: 5
                },
                lesson2: {
                    title: "اختبار درس: تغير حالات المادة",
                    questions: [
                        {
                            question: "عملية تحول المادة من الحالة السائلة إلى الصلبة تسمى:",
                            options: ["انصهار", "تبخر", "تكثيف", "تجمد"],
                            correct: 3,
                            points: 10
                        }
                    ],
                    time: 3
                }
            },
            unit2: {
                lesson1: {
                    title: "اختبار درس: مقدمة في التفاعلات الكيميائية",
                    questions: [
                        {
                            question: "التفاعل الكيميائي هو عملية:",
                            options: ["تغير في شكل المادة فقط", "تغير في ترتيب الذرات وتكوين مواد جديدة", "تغير في حجم المادة فقط", "تغير في لون المادة فقط"],
                            correct: 1,
                            points: 10
                        }
                    ],
                    time: 4
                }
            },
            unit3: {
                lesson1: {
                    title: "اختبار درس: البناء الضوئي",
                    questions: [
                        {
                            question: "البناء الضوئي يحدث في:",
                            options: ["الجذور فقط", "الأوراق الخضراء", "الساق فقط", "جميع أجزاء النبات"],
                            correct: 1,
                            points: 10
                        }
                    ],
                    time: 4
                }
            }
        };

        return tests[unitId]?.[lessonId];
    }

    getUnitTestData(unitNumber) {
        // بيانات اختبارات الوحدات الكاملة
        const unitTests = {
            1: {
                title: "🔬 اختبار الوحدة الأولى الشامل: المادة والطاقة",
                questions: [
                    {
                        question: "ما هي حالات المادة الثلاث الرئيسية؟",
                        options: ["الصلبة، السائلة، الغازية", "السائلة، البلازما، الصلبة", "الغازية، الصلبة، البلورية", "المذابة، المعلقة، الصلبة"],
                        correct: 0,
                        points: 10
                    },
                    {
                        question: "عند تسخين المادة الصلبة تتحول إلى:",
                        options: ["الحالة السائلة", "الحالة الغازية", "تبقى صلبة", "تتحول إلى بلازما"],
                        correct: 0,
                        points: 10
                    },
                    {
                        question: "أي من العمليات التالية يمثل تحول المادة من الحالة السائلة إلى الغازية؟",
                        options: ["التكثيف", "الانصهار", "التجمد", "التبخر"],
                        correct: 3,
                        points: 10
                    }
                ],
                time: 10
            },
            2: {
                title: "🧪 اختبار الوحدة الثانية الشامل: التفاعلات الكيميائية",
                questions: [
                    {
                        question: "التفاعل الكيميائي هو عملية:",
                        options: ["تغير في شكل المادة فقط", "تغير في ترتيب الذرات وتكوين مواد جديدة", "تغير في حجم المادة فقط", "تغير في لون المادة فقط"],
                        correct: 1,
                        points: 10
                    },
                    {
                        question: "في المعادلة الكيميائية، المواد الموجودة على يسار السهم تسمى:",
                        options: ["النواتج", "المواد المتفاعلة", "العوامل المساعدة", "المحفزات"],
                        correct: 1,
                        points: 10
                    }
                ],
                time: 8
            },
            3: {
                title: "🌿 اختبار الوحدة الثالثة الشامل: تدفق الطاقة",
                questions: [
                    {
                        question: "البناء الضوئي يحدث في:",
                        options: ["الجذور فقط", "الأوراق الخضراء", "الساق فقط", "جميع أجزاء النبات"],
                        correct: 1,
                        points: 10
                    }
                ],
                time: 6
            }
        };

        return unitTests[unitNumber];
    }

    openTestWindow(testData) {
        // فتح نافذة الاختبار (يمكن ربطها بنظام الاختبارات الحالي)
        alert(`🚀 بدء الاختبار: ${testData.title}\n⏱️ الوقت: ${testData.time} دقيقة\n❓ عدد الأسئلة: ${testData.questions.length}`);
        
        // هنا يمكنك ربط هذا بنظام الاختبارات الموجود في main.js
        // مؤقتاً نستخدم alert للعرض
    }

    loadAdditionalTests() {
        // تحميل الاختبارات الإضافية من localStorage
        const additionalTests = JSON.parse(localStorage.getItem('importedTests')) || {};
        const container = document.getElementById('additionalTests');
        
        if (!container) return;

        if (Object.keys(additionalTests).length === 0) {
            container.innerHTML = `
                <div class="lesson-card" style="text-align: center; grid-column: 1 / -1;">
                    <h3>📝 لا توجد اختبارات إضافية حالياً</h3>
                    <p>يتم إضافة اختبارات جديدة بشكل دوري</p>
                </div>
            `;
            return;
        }

        Object.values(additionalTests).forEach(test => {
            const testHTML = `
                <div class="lesson-card">
                    <div class="lesson-header">
                        <h3>🎯 ${test.title}</h3>
                        <span class="lesson-status completed">إضافي</span>
                    </div>
                    <p>اختبار إضافي لتعزيز فهمك للمادة العلمية</p>
                    <div class="lesson-meta">
                        <span>⏱️ ${test.time} دقيقة</span>
                        <span>❓ ${test.questions.length} أسئلة</span>
                    </div>
                    <button class="btn btn-success" onclick="testsSystem.startAdditionalTest('${test.id}')">
                        ✏️ بدء الاختبار
                    </button>
                </div>
            `;
            container.innerHTML += testHTML;
        });
    }

    startAdditionalTest(testId) {
        const additionalTests = JSON.parse(localStorage.getItem('importedTests')) || {};
        const test = additionalTests[testId];
        
        if (test) {
            this.openTestWindow(test);
        }
    }

    // دالة لتحديث التقدم بعد انتهاء الاختبار
    updateProgressAfterTest(unitId, lessonId, score, points) {
        this.userProgress.points += points;
        this.userProgress.completedTests += 1;
        
        if (unitId && lessonId) {
            this.userProgress[unitId].lessons[lessonId] = {
                completed: true,
                score: score,
                points: points
            };
            
            // تحديث تقدم الوحدة
            this.updateUnitProgress(unitId);
        }
        
        this.saveProgress();
        this.displayOverallProgress();
        this.displayUnitProgress();
    }

    updateUnitProgress(unitId) {
        const unit = this.userProgress[unitId];
        const lessons = Object.values(unit.lessons);
        const completedLessons = lessons.filter(lesson => lesson.completed);
        
        if (lessons.length > 0) {
            unit.progress = (completedLessons.length / lessons.length) * 100;
            unit.score = completedLessons.reduce((sum, lesson) => sum + lesson.score, 0) / completedLessons.length;
        }
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

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ نظام الاختبارات جاهز للعمل');
});
// في ملف tests-system.js - أضف هذه الدوال

class TestsSystem {
    // ... الكود السابق ...

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

    startLessonTest(unitId, lessonId) {
        const testData = this.getLessonTestData(unitId, lessonId);
        if (testData) {
            this.openTestWindow(testData, 'lesson', unitId, lessonId);
        }
    }

    startUnitTest(unitNumber) {
        const testData = this.getUnitTestData(unitNumber);
        if (testData) {
            this.openTestWindow(testData, 'unit', `unit${unitNumber}`);
        }
    }

    startAdditionalTest(testId) {
        const additionalTests = JSON.parse(localStorage.getItem('importedTests')) || {};
        const test = additionalTests[testId];
        
        if (test) {
            // تحويل تنسيق الاختبار المستورد لتتناسب مع النظام
            const formattedTest = {
                title: test.title,
                questions: test.questions,
                time: test.time
            };
            
            this.openTestWindow(formattedTest, 'imported', null, null, testId);
        }
    }

    // دالة معالجة نتائج الاختبار
    processTestResults(score, correctAnswers, totalQuestions, timeTaken) {
        const testSession = JSON.parse(localStorage.getItem('currentTestSession') || '{}');
        
        if (!testSession.testData) return;

        const points = Math.round(score * totalQuestions / 100); // حساب النقاط
        
        // حفظ النتائج بناءً على نوع الاختبار
        switch(testSession.testType) {
            case 'lesson':
                this.updateLessonProgress(testSession.unitId, testSession.lessonId, score, points);
                break;
            case 'unit':
                this.updateUnitProgress(testSession.unitId, score, points);
                break;
            case 'imported':
                this.updateImportedTestProgress(score, points);
                break;
        }

        // عرض النتائج
        this.showResults(score, correctAnswers, totalQuestions, timeTaken, points);
    }

    updateLessonProgress(unitId, lessonId, score, points) {
        if (!this.userProgress[unitId]) {
            this.userProgress[unitId] = { progress: 0, score: 0, lessons: {} };
        }
        
        this.userProgress[unitId].lessons[lessonId] = {
            completed: true,
            score: score,
            points: points,
            completedAt: new Date().toISOString()
        };
        
        this.updateUnitProgress(unitId);
        this.saveProgress();
    }

    updateUnitProgress(unitId, score = null, points = 0) {
        const unit = this.userProgress[unitId];
        if (!unit) return;

        const lessons = Object.values(unit.lessons);
        const completedLessons = lessons.filter(lesson => lesson.completed);
        
        if (lessons.length > 0) {
            unit.progress = (completedLessons.length / lessons.length) * 100;
            unit.score = completedLessons.reduce((sum, lesson) => sum + lesson.score, 0) / completedLessons.length;
        }
        
        if (score !== null) {
            unit.score = Math.max(unit.score, score); // حفظ أفضل نتيجة
        }
        
        this.userProgress.points += points;
        this.userProgress.completedTests += 1;
        
        this.saveProgress();
        this.displayOverallProgress();
        this.displayUnitProgress();
    }

    updateImportedTestProgress(score, points) {
        this.userProgress.points += points;
        this.userProgress.completedTests += 1;
        this.saveProgress();
        this.displayOverallProgress();
    }

    showResults(score, correctAnswers, totalQuestions, timeTaken, points) {
        // يمكنك تخصيص عرض النتائج هنا
        const resultsHTML = `
            <div class="results-popup">
                <h2>🎉 تم إنهاء الاختبار!</h2>
                <div class="score-display">${score}%</div>
                <div class="results-details">
                    <p>✅ الإجابات الصحيحة: ${correctAnswers}/${totalQuestions}</p>
                    <p>⏱️ الوقت المستغرق: ${timeTaken} دقيقة</p>
                    <p>🏆 النقاط المكتسبة: ${points} نقطة</p>
                </div>
                <button onclick="testsSystem.closeResults()" class="btn btn-primary">موافق</button>
            </div>
        `;
        
        // إضافة popup للنتائج
        const popup = document.createElement('div');
        popup.id = 'testResultsPopup';
        popup.innerHTML = resultsHTML;
        popup.style.cssText = `
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
        `;
        
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
}