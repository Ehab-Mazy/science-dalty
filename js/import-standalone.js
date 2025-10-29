// نظام استيراد الاختبارات المنفصل - الإصدار المحسن
class TestImporter {
    constructor() {
        this.questions = [];
        this.currentStep = 1;
        this.init();
    }

    init() {
        this.showStep(1);
        this.bindEvents();
        console.log('✅ نظام الاستيراد جاهز للعمل');
    }

    bindEvents() {
        // حدث النسخ واللصق
        const textarea = document.getElementById('excelData');
        if (textarea) {
            textarea.addEventListener('paste', (e) => {
                this.handlePaste(e);
            });
            
            textarea.addEventListener('input', (e) => {
                this.handleInput(e);
            });
        }

        // تحديث الوقت المقترح
        document.getElementById('testTimeInput')?.addEventListener('input', (e) => {
            this.updateSuggestedTime();
        });

        // زر المسح
        document.querySelector('.btn-secondary')?.addEventListener('click', () => {
            this.clearData();
        });
    }

    handlePaste(event) {
        // نعطي مؤشراً بسيطاً أن البيانات تم لصقها
        setTimeout(() => {
            this.showNotification('📋 تم لصق البيانات بنجاح', 'success');
        }, 100);
    }

    handleInput(event) {
        const textarea = event.target;
        const lines = textarea.value.split('\n').filter(line => line.trim());
        
        if (lines.length > 0) {
            // تحديث عداد الأسطر
            this.updateLineCount(lines.length);
        }
    }

    updateLineCount(count) {
        // يمكنك إضافة عداد للأسطر إذا أردت
        console.log(`عدد الأسطر: ${count}`);
    }

    showStep(stepNumber) {
        console.log(`الانتقال إلى الخطوة: ${stepNumber}`);
        
        // إخفاء جميع الخطوات
        document.querySelectorAll('.step-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // إظهار الخطوة المطلوبة
        const stepPanel = document.getElementById(`step${stepNumber}-panel`);
        if (stepPanel) {
            stepPanel.classList.add('active');
            this.currentStep = stepNumber;
        }

        // تحديث مؤشرات الخطوات
        this.updateStepIndicators(stepNumber);

        // التركيز على العناصر المهمة
        this.focusOnStep(stepNumber);
    }

    focusOnStep(stepNumber) {
        setTimeout(() => {
            switch(stepNumber) {
                case 2:
                    document.getElementById('excelData')?.focus();
                    break;
                case 4:
                    document.getElementById('testTitleInput')?.focus();
                    break;
            }
        }, 300);
    }

    updateStepIndicators(activeStep) {
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber === activeStep) {
                indicator.classList.add('active');
            } else if (stepNumber < activeStep) {
                indicator.classList.add('completed');
            }
        });
    }

    clearData() {
        const textarea = document.getElementById('excelData');
        if (textarea) {
            textarea.value = '';
            textarea.focus();
        }
        this.questions = [];
        this.updatePreview();
        this.showNotification('🗑️ تم مسح البيانات', 'info');
    }

    parseData() {
        const textarea = document.getElementById('excelData');
        if (!textarea) {
            this.showError('❌ عنصر اللصق غير موجود');
            return;
        }

        const excelData = textarea.value.trim();
        
        if (!excelData) {
            this.showError('⚠️ يرجى لصق بيانات Excel أولاً');
            textarea.focus();
            return;
        }
        
        console.log('بيانات المدخلة:', excelData);
        
        try {
            this.questions = this.parseExcelData(excelData);
            
            if (this.questions.length === 0) {
                this.showError('❌ لم يتم العثور على أسئلة بصيغة صحيحة');
                return;
            }
            
            this.updatePreview();
            this.showStep(3);
            this.showSuccess(`✅ تم استيراد ${this.questions.length} سؤال بنجاح`);
            
        } catch (error) {
            this.showError('❌ حدث خطأ في تحليل البيانات. تأكد من تنسيق البيانات');
            console.error('خطأ في التحليل:', error);
        }
    }

    parseExcelData(data) {
        const questions = [];
        const rows = data.split('\n');
        
        console.log(`عدد الأسطر: ${rows.length}`);
        
        rows.forEach((row, index) => {
            if (row.trim()) {
                console.log(`معالجة السطر ${index + 1}:`, row);
                
                // استخدام تبويب أو فاصلة لفصل الأعمدة
                const columns = row.split('\t').length > 1 ? row.split('\t') : row.split(',');
                
                console.log(`الأعمدة في السطر ${index + 1}:`, columns);
                
                if (columns.length >= 6) {
                    const question = {
                        question: columns[0]?.trim() || `سؤال ${index + 1}`,
                        options: [
                            columns[1]?.trim() || 'الخيار الأول',
                            columns[2]?.trim() || 'الخيار الثاني',
                            columns[3]?.trim() || 'الخيار الثالث',
                            columns[4]?.trim() || 'الخيار الرابع'
                        ],
                        correct: this.parseCorrectAnswer(columns[5]),
                        explanation: columns[6]?.trim() || ''
                    };
                    
                    console.log(`السؤال ${index + 1} المعالج:`, question);
                    
                    // التحقق من جودة البيانات
                    if (question.question.length > 5 && question.options.every(opt => opt.length > 0)) {
                        questions.push(question);
                    }
                } else {
                    console.warn(`السطر ${index + 1} لا يحتوي على أعمدة كافية: ${columns.length}`);
                }
            }
        });
        
        console.log(`الأسئلة المستوردة: ${questions.length}`);
        return questions;
    }

    parseCorrectAnswer(answer) {
        if (!answer) {
            console.warn('إجابة صحيحة فارغة');
            return 0;
        }
        
        const cleanAnswer = answer.toString().trim().toLowerCase();
        console.log(`تحويل الإجابة: "${answer}" -> "${cleanAnswer}"`);
        
        if (['1', 'أ', 'a', 'first'].includes(cleanAnswer)) return 0;
        if (['2', 'ب', 'b', 'second'].includes(cleanAnswer)) return 1;
        if (['3', 'ج', 'c', 'third'].includes(cleanAnswer)) return 2;
        if (['4', 'د', 'd', 'fourth'].includes(cleanAnswer)) return 3;
        
        const numAnswer = parseInt(cleanAnswer);
        const result = isNaN(numAnswer) ? 0 : Math.max(0, Math.min(3, numAnswer - 1));
        
        console.log(`الإجابة المحولة: ${result}`);
        return result;
    }

    updatePreview() {
        const count = this.questions.length;
        const suggestedTime = Math.max(15, Math.ceil(count * 1.2));
        
        // تحديث الإحصائيات
        document.getElementById('questionsCount').textContent = count;
        document.getElementById('suggestedTime').textContent = suggestedTime;
        document.getElementById('finalQuestionsCount').textContent = count;
        document.getElementById('finalSuggestedTime').textContent = suggestedTime;
        
        const timeInput = document.getElementById('testTimeInput');
        if (timeInput) {
            timeInput.value = suggestedTime;
        }
        
        // تحديث المعاينة
        const previewContainer = document.getElementById('questionsPreview');
        
        if (count === 0) {
            previewContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #718096;">
                    📝 لم يتم استيراد أي أسئلة بعد
                </div>
            `;
            return;
        }
        
        previewContainer.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const questionHTML = `
                <div class="question-preview">
                    <div class="question-header">
                        <strong>سؤال ${index + 1}:</strong>
                        <span class="correct-answer">الإجابة الصحيحة: ${question.options[question.correct]}</span>
                    </div>
                    <p class="question-text">${question.question}</p>
                    <div class="options-preview">
                        ${question.options.map((opt, optIndex) => `
                            <div class="option ${optIndex === question.correct ? 'correct' : ''}" 
                                 data-letter="${String.fromCharCode(1570 + optIndex)}">
                                ${opt}
                            </div>
                        `).join('')}
                    </div>
                    ${question.explanation ? `
                        <p class="explanation">
                            <strong>الشرح:</strong> ${question.explanation}
                        </p>
                    ` : ''}
                </div>
            `;
            previewContainer.innerHTML += questionHTML;
        });
    }

    updateSuggestedTime() {
        const timeInput = document.getElementById('testTimeInput');
        const suggestedTime = Math.max(5, Math.ceil(this.questions.length * 1.2));
        
        if (timeInput && parseInt(timeInput.value) < suggestedTime) {
            timeInput.value = suggestedTime;
        }
    }

    addManualQuestion() {
        const newQuestion = {
            question: 'سؤال جديد - يمكنك تعديل هذا النص',
            options: [
                'الإجابة الأولى - عدلني',
                'الإجابة الثانية - عدلني', 
                'الإجابة الثالثة - عدلني',
                'الإجابة الرابعة - عدلني'
            ],
            correct: 0,
            explanation: 'شرح الإجابة - اختياري'
        };
        
        this.questions.push(newQuestion);
        this.updatePreview();
        this.showSuccess('✅ تم إضافة سؤال جديد');
    }

    clearAllQuestions() {
        if (this.questions.length === 0) {
            this.showError('❌ لا توجد أسئلة للمسح');
            return;
        }
        
        if (confirm(`⚠️ هل تريد مسح جميع الأسئلة (${this.questions.length} سؤال)؟`)) {
            this.questions = [];
            this.clearData();
            this.showStep(2);
            this.showSuccess('✅ تم مسح جميع الأسئلة');
        }
    }

    saveTest() {
        const titleInput = document.getElementById('testTitleInput');
        const timeInput = document.getElementById('testTimeInput');
        
        if (!titleInput || !timeInput) {
            this.showError('❌ عناصر النموذج غير موجودة');
            return null;
        }

        const title = titleInput.value.trim();
        const time = parseInt(timeInput.value);
        
        if (!title) {
            this.showError('⚠️ يرجى إدخال عنوان للاختبار');
            titleInput.focus();
            return null;
        }
        
        if (this.questions.length === 0) {
            this.showError('⚠️ لا توجد أسئلة لحفظها');
            return null;
        }
        
        if (time < 5) {
            this.showError('⚠️ وقت الاختبار يجب أن يكون 5 دقائق على الأقل');
            timeInput.focus();
            return null;
        }
        
        // حفظ الاختبار في localStorage
        const testId = 'test_' + Date.now();
        const testData = {
            id: testId,
            title: title,
            time: time,
            questions: this.questions,
            createdAt: new Date().toISOString(),
            questionCount: this.questions.length
        };
        
        // الحصول على الاختبارات الحالية
        const existingTests = JSON.parse(localStorage.getItem('importedTests') || '{}');
        existingTests[testId] = testData;
        
        // حفظ في localStorage
        localStorage.setItem('importedTests', JSON.stringify(existingTests));
        
        // تحديث الحالة
        const statusElement = document.getElementById('testStatus');
        if (statusElement) {
            statusElement.textContent = 'محفوظ';
            statusElement.style.color = '#38a169';
        }
        
        this.showSuccess(`✅ تم حفظ الاختبار "${title}" بنجاح! يحتوي على ${this.questions.length} سؤال`);
        
        return testId;
    }

    saveAndStartTest() {
        const testId = this.saveTest();
        if (testId) {
            this.showNotification('🚀 جارٍ الانتقال إلى صفحة الاختبارات...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html#tests';
            }, 2000);
        }
    }

    saveAndNew() {
        const testId = this.saveTest();
        if (testId) {
            this.showNotification('📝 جارٍ إعداد اختبار جديد...', 'success');
            
            setTimeout(() => {
                this.questions = [];
                this.clearData();
                document.getElementById('testTitleInput').value = '';
                document.getElementById('testStatus').textContent = 'غير محفوظ';
                document.getElementById('testStatus').style.color = '#e53e3e';
                this.showStep(1);
            }, 1500);
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // إزالة الإشعارات السابقة
        const existingNotification = document.querySelector('.import-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // إنشاء إشعار جديد
        const notification = document.createElement('div');
        notification.className = `import-notification import-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        // إضافة التنسيق
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#fed7d7' : type === 'success' ? '#c6f6d5' : '#bee3f8'};
            color: ${type === 'error' ? '#c53030' : type === 'success' ? '#276749' : '#2c5282'};
            padding: 15px 25px;
            border-radius: 10px;
            border-right: 4px solid ${type === 'error' ? '#e53e3e' : type === 'success' ? '#38a169' : '#3182ce'};
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // إزالة الإشعار تلقائياً بعد 5 ثوان
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideUp 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

// إنشاء النسخة العامة
const testImporter = new TestImporter();

// الدوال العامة للاستدعاء من HTML
function showStep(stepNumber) {
    testImporter.showStep(stepNumber);
}

function clearData() {
    testImporter.clearData();
}

function parseData() {
    testImporter.parseData();
}

function addManualQuestion() {
    testImporter.addManualQuestion();
}

function clearAllQuestions() {
    testImporter.clearAllQuestions();
}

function saveTest() {
    testImporter.saveTest();
}

function saveAndStartTest() {
    testImporter.saveAndStartTest();
}

function saveAndNew() {
    testImporter.saveAndNew();
}

// اختبار سريع للتحقق من عمل النظام
console.log('🚀 نظام استيراد الاختبارات محمل وجاهز للعمل!');