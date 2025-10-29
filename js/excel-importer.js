// نظام استيراد الاختبارات من Excel
class ExcelTestImporter {
    constructor() {
        this.questions = [];
        this.currentTestId = 1000;
    }

    // تحليل البيانات المنسوخة من Excel
    parseExcelData(copiedData) {
        this.questions = [];
        const rows = copiedData.split('\n');
        
        rows.forEach((row, index) => {
            if (row.trim()) {
                const columns = row.split('\t'); // تبويب Excel
                
                if (columns.length >= 6) { // سؤال + 4 خيارات + إجابة صحيحة
                    const question = {
                        question: columns[0]?.trim() || `سؤال ${index + 1}`,
                        options: [
                            columns[1]?.trim() || 'الخيار الأول',
                            columns[2]?.trim() || 'الخيار الثاني', 
                            columns[3]?.trim() || 'الخيار الثالث',
                            columns[4]?.trim() || 'الخيار الرابع'
                        ],
                        correct: this.parseCorrectAnswer(columns[5]),
                        explanation: columns[6]?.trim() || 'شرح الإجابة'
                    };
                    
                    this.questions.push(question);
                }
            }
        });
        
        return this.questions;
    }

    // تحويل الإجابة الصحيحة إلى رقم
    parseCorrectAnswer(answer) {
        const cleanAnswer = answer.toString().trim().toLowerCase();
        
        if (['1', 'أ', 'a', 'first'].includes(cleanAnswer)) return 0;
        if (['2', 'ب', 'b', 'second'].includes(cleanAnswer)) return 1;
        if (['3', 'ج', 'c', 'third'].includes(cleanAnswer)) return 2;
        if (['4', 'د', 'd', 'fourth'].includes(cleanAnswer)) return 3;
        
        return parseInt(cleanAnswer) || 0;
    }

    // إنشاء اختبار جديد
    createTest(title, time = 15) {
        const testId = this.currentTestId++;
        
        const testData = {
            title: title,
            time: time,
            questions: [...this.questions] // نسخة من الأسئلة
        };
        
        // إضافة الاختبار إلى النظام الرئيسي
        if (typeof addQuickTest !== 'undefined') {
            addQuickTest(testId, testData);
        } else {
            // طريقة بديلة إذا لم يكن addQuickTest متاحاً
            if (typeof testsData !== 'undefined') {
                testsData[testId] = testData;
            }
        }
        
        return testId;
    }

    // مسح جميع الأسئلة
    clearQuestions() {
        this.questions = [];
    }

    // إضافة سؤال يدوياً
    addManualQuestion(questionData) {
        this.questions.push(questionData);
    }

    // الحصول على عدد الأسئلة
    getQuestionCount() {
        return this.questions.length;
    }
    function previewQuestions() {
        const excelData = document.getElementById('excelData').value;
        
        if (!excelData.trim()) {
            alert('⚠️ يرجى لصق بيانات Excel أولاً');
            return;
        }
        
        try {
            // تحليل البيانات
            const questions = excelImporter.parseExcelData(excelData);
            
            // تحديث العداد
            document.getElementById('questionsCount').textContent = questions.length;
            document.getElementById('finalQuestionsCount').textContent = questions.length;
            
            // حساب الوقت المقترح
            const suggestedTime = Math.max(15, Math.ceil(questions.length * 1.5));
            document.getElementById('suggestedTime').textContent = suggestedTime;
            document.getElementById('testTimeInput').value = suggestedTime;
            
            // عرض المعاينة
            const previewContainer = document.getElementById('questionsPreview');
            previewContainer.innerHTML = '';
            
            questions.forEach((question, index) => {
                const questionHTML = `
                    <div class="question-preview">
                        <div class="question-header">
                            <strong>سؤال ${index + 1}:</strong>
                            <span class="correct-answer">الإجابة الصحيحة: ${question.options[question.correct]}</span>
                        </div>
                        <p class="question-text">${question.question}</p>
                        <div class="options-preview">
                            ${question.options.map((opt, optIndex) => `
                                <div class="option ${optIndex === question.correct ? 'correct' : ''}" data-letter="${String.fromCharCode(1570 + optIndex)}">
                                    ${opt}
                                </div>
                            `).join('')}
                        </div>
                        ${question.explanation ? `<p class="explanation"><strong>الشرح:</strong> ${question.explanation}</p>` : ''}
                    </div>
                `;
                previewContainer.innerHTML += questionHTML;
            });
            
            showStep(3);
            
        } catch (error) {
            alert('❌ حدث خطأ في تحليل البيانات. تأكد من تنسيق البيانات');
            console.error(error);
        }
    }  
}

// إنشاء نسخة عامة
const excelImporter = new ExcelTestImporter();
