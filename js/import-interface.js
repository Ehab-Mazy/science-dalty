// واجهة استيراد الاختبارات
class ImportInterface {
    constructor() {
        this.currentStep = 1;
        this.questions = [];
        this.init();
    }

    init() {
        this.createImportButton();
        this.renderInterface();
        this.bindEvents();
    }

    createImportButton() {
        if (!document.querySelector('.import-fab')) {
            const fab = document.createElement('button');
            fab.className = 'import-fab';
            fab.innerHTML = '📊 استيراد اختبار';
            fab.onclick = () => this.toggle();
            document.body.appendChild(fab);
        }
    }

    renderInterface() {
        const overlay = document.createElement('div');
        overlay.id = 'excelImporter';
        overlay.className = 'import-overlay';
        overlay.innerHTML = this.getModalHTML();
        document.body.appendChild(overlay);
    }

    getModalHTML() {
        return `
        <div class="import-modal">
            <div class="import-header">
                <h2>📊 استيراد الاختبارات من Excel</h2>
                <button class="close-btn" onclick="importInterface.toggle()">✕</button>
            </div>

            <div class="import-steps">
                <!-- الخطوة 1 -->
                <div class="step active" id="step1">
                    <div class="step-icon">1</div>
                    <h3>تعليمات الاستيراد</h3>
                    
                    <div class="instructions">
                        <div class="instruction-item">
                            <span class="icon">📝</span>
                            <div class="text">
                                <strong>انسخ بيانات Excel بهذا الشكل:</strong>
                                <p>السؤال [Tab] الإجابة أ [Tab] الإجابة ب [Tab] الإجابة ج [Tab] الإجابة د [Tab] الإجابة الصحيحة [Tab] الشرح</p>
                            </div>
                        </div>
                        
                        <div class="instruction-item">
                            <span class="icon">📋</span>
                            <div class="text">
                                <strong>مثال على التنسيق:</strong>
                                <div class="example-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>السؤال</th>
                                                <th>الإجابة أ</th>
                                                <th>الإجابة ب</th>
                                                <th>الإجابة ج</th>
                                                <th>الإجابة د</th>
                                                <th>الصحيحة</th>
                                                <th>الشرح</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ما هي حالات المادة؟</td>
                                                <td>صلبة</td>
                                                <td>سائلة</td>
                                                <td>غازية</td>
                                                <td>جميع ما سبق</td>
                                                <td>4</td>
                                                <td>حالات المادة ثلاثة</td>
                                            </tr>
                                            <tr>
                                                <td>أين يحدث البناء الضوئي؟</td>
                                                <td>الجذور</td>
                                                <td>الأوراق</td>
                                                <td>الساق</td>
                                                <td>الزهور</td>
                                                <td>2</td>
                                                <td>في البلاستيدات الخضراء</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <div class="instruction-item">
                            <span class="icon">💡</span>
                            <div class="text">
                                <strong>ملاحظات هامة:</strong>
                                <ul>
                                    <li>الإجابة الصحيحة: استخدم الأرقام (1,2,3,4) أو الحروف (أ,ب,ج,د)</li>
                                    <li>الشرح حقل اختياري</li>
                                    <li>يفصل بين الأعمدة بعلامة Tab (نسخ عادي من Excel)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary next-btn" onclick="importInterface.showStep(2)">التالي →</button>
                </div>

                <!-- الخطوة 2 -->
                <div class="step" id="step2">
                    <div class="step-icon">2</div>
                    <h3>لصق بيانات Excel</h3>
                    
                    <div class="paste-section">
                        <textarea 
                            id="excelData" 
                            placeholder="الصق بيانات Excel هنا...
مثال:
ما هي حالات المادة؟	صلبة	سائلة	غازية	جميع ما سبق	4	حالات المادة ثلاثة
أين يحدث البناء الضوئي؟	الجذور	الأوراق	الساق	الزهور	2	في البلاستيدات الخضراء"
                            rows="8"
                        ></textarea>
                        
                        <div class="paste-actions">
                            <button class="btn btn-secondary" onclick="importInterface.clearData()">
                                🗑️ مسح البيانات
                            </button>
                            <button class="btn btn-primary" onclick="importInterface.parseData()">
                                🔍 معاينة الأسئلة
                            </button>
                        </div>
                    </div>

                    <div class="step-nav">
                        <button class="btn btn-outline" onclick="importInterface.showStep(1)">← السابق</button>
                        <button class="btn btn-primary" onclick="importInterface.showStep(3)">التالي →</button>
                    </div>
                </div>

                <!-- الخطوة 3 -->
                <div class="step" id="step3">
                    <div class="step-icon">3</div>
                    <h3>معاينة الأسئلة</h3>
                    
                    <div class="preview-header">
                        <div class="preview-stats">
                            <span class="stat">عدد الأسئلة: <strong id="questionsCount">0</strong></span>
                            <span class="stat">الوقت المقترح: <strong id="suggestedTime">15</strong> دقيقة</span>
                        </div>
                        <button class="btn btn-warning" onclick="importInterface.addManualQuestion()">
                            ➕ إضافة سؤال يدوي
                        </button>
                    </div>

                    <div id="questionsPreview" class="questions-preview">
                        <!-- الأسئلة تظهر هنا -->
                    </div>

                    <div class="preview-actions">
                        <button class="btn btn-danger" onclick="importInterface.clearAllQuestions()">
                            🗑️ مسح الكل
                        </button>
                    </div>

                    <div class="step-nav">
                        <button class="btn btn-outline" onclick="importInterface.showStep(2)">← السابق</button>
                        <button class="btn btn-primary" onclick="importInterface.showStep(4)">التالي →</button>
                    </div>
                </div>

                <!-- الخطوة 4 -->
                <div class="step" id="step4">
                    <div class="step-icon">4</div>
                    <h3>حفظ الاختبار</h3>
                    
                    <div class="test-settings">
                        <div class="form-group">
                            <label>عنوان الاختبار:</label>
                            <input type="text" id="testTitleInput" placeholder="مثال: اختبار العلوم - الوحدة الأولى" class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label>وقت الاختبار (دقائق):</label>
                            <input type="number" id="testTimeInput" value="15" min="5" max="60" class="form-input">
                        </div>
                        
                        <div class="summary">
                            <h4>ملخص الاختبار:</h4>
                            <p>عدد الأسئلة: <span id="finalQuestionsCount">0</span></p>
                            <p>الوقت المقترح: <span id="finalSuggestedTime">15</span> دقيقة</p>
                        </div>
                    </div>

                    <div class="save-actions">
                        <button class="btn btn-success" onclick="importInterface.saveTest()">
                            💾 حفظ الاختبار
                        </button>
                        <button class="btn btn-primary" onclick="importInterface.saveAndStartTest()">
                            🚀 حفظ وبدء الاختبار
                        </button>
                    </div>

                    <div class="step-nav">
                        <button class="btn btn-outline" onclick="importInterface.showStep(3)">← السابق</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    bindEvents() {
        // أي أحداث إضافية يمكن إضافتها هنا
    }

    toggle() {
        const overlay = document.getElementById('excelImporter');
        overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
        this.showStep(1);
    }

    showStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        const stepElement = document.getElementById(`step${stepNumber}`);
        if (stepElement) {
            stepElement.classList.add('active');
            this.currentStep = stepNumber;
        }
    }

    clearData() {
        document.getElementById('excelData').value = '';
    }

    parseData() {
        const excelData = document.getElementById('excelData').value;
        
        if (!excelData.trim()) {
            alert('⚠️ يرجى لصق بيانات Excel أولاً');
            return;
        }
        
        try {
            this.questions = this.parseExcelData(excelData);
            this.updatePreview();
            this.showStep(3);
        } catch (error) {
            alert('❌ حدث خطأ في تحليل البيانات. تأكد من تنسيق البيانات');
            console.error(error);
        }
    }

    parseExcelData(data) {
        const questions = [];
        const rows = data.split('\n');
        
        rows.forEach((row, index) => {
            if (row.trim()) {
                const columns = row.split('\t');
                
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
                    
                    questions.push(question);
                }
            }
        });
        
        return questions;
    }

    parseCorrectAnswer(answer) {
        const cleanAnswer = answer.toString().trim().toLowerCase();
        
        if (['1', 'أ', 'a', 'first'].includes(cleanAnswer)) return 0;
        if (['2', 'ب', 'b', 'second'].includes(cleanAnswer)) return 1;
        if (['3', 'ج', 'c', 'third'].includes(cleanAnswer)) return 2;
        if (['4', 'د', 'd', 'fourth'].includes(cleanAnswer)) return 3;
        
        return parseInt(cleanAnswer) || 0;
    }

    updatePreview() {
        const count = this.questions.length;
        const suggestedTime = Math.max(15, Math.ceil(count * 1.5));
        
        document.getElementById('questionsCount').textContent = count;
        document.getElementById('suggestedTime').textContent = suggestedTime;
        document.getElementById('finalQuestionsCount').textContent = count;
        document.getElementById('finalSuggestedTime').textContent = suggestedTime;
        document.getElementById('testTimeInput').value = suggestedTime;
        
        const previewContainer = document.getElementById('questionsPreview');
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
    }

    addManualQuestion() {
        alert('سيتم إضافة واجهة إضافة سؤال يدوي في التحديث القادم');
        // يمكنك إضافة منطق إضافة سؤال يدوي هنا
    }

    clearAllQuestions() {
        if (confirm('⚠️ هل تريد مسح جميع الأسئلة؟')) {
            this.questions = [];
            this.clearData();
            this.updatePreview();
            this.showStep(2);
        }
    }

    saveTest() {
        const title = document.getElementById('testTitleInput').value.trim();
        const time = parseInt(document.getElementById('testTimeInput').value);
        
        if (!title) {
            alert('⚠️ يرجى إدخال عنوان للاختبار');
            return;
        }
        
        if (this.questions.length === 0) {
            alert('⚠️ لا توجد أسئلة لحفظها');
            return;
        }
        
        // حفظ الاختبار في النظام الرئيسي
                                                                                                                                                                                                                         const testId = 'imported_' + Date.now();
        const testData = {
    id: 'test_' + Date.now(), // معرف فريد
    title: 'عنوان الاختبار',
    time: 15, // وقت الاختبار
    questions: importedQuestions, // الأسئلة
    createdAt: new Date().toISOString(), // تاريخ الإنشاء
    subject: 'علوم', // المادة
    grade: 'الصف الثاني الإعدادي' // الصف
};
    const testData = {
    id: 'test_' + Date.now(), // معرف فريد
    title: 'عنوان الاختبار',
    time: 15, // وقت الاختبار
    questions: importedQuestions, // الأسئلة
    createdAt: new Date().toISOString(), // تاريخ الإنشاء
    subject: 'علوم', // المادة
    grade: 'الصف الثاني الإعدادي' // الصف
};
        
        // استخدام النظام الرئيسي إذا كان متاحاً
        if (typeof addQuickTest !== 'undefined') {
            addQuickTest(testId, testData);
        } else if (typeof testsData !== 'undefined') {
            testsData[testId] = testData;
        }
        
        alert(`✅ تم حفظ الاختبار "${title}" بنجاح!`);
        this.toggle();
        
        // تحديث واجهة الاختبارات إذا كانت موجودة
        if (typeof displayQuickTests !== 'undefined') {
            displayQuickTests();
        }
    }

    saveAndStartTest() {
        this.saveTest();
        // يمكنك إضافة منطق بدء الاختبار هنا
    }
}

// إنشاء النسخة العامة
const importInterface = new ImportInterface();