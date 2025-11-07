// في import.html - إضافة دوال الرفع اليدوي
function generateHostingFiles() {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    
    if (Object.keys(savedTests).length === 0) {
        showUploadStatus('single', '⚠️ لا توجد اختبارات لإنشاء ملفات', 'error');
        return;
    }

    let previewHTML = `
        <h4>📁 الملفات المنشأة للاستضافة:</h4>
        <p>قم بتحميل هذه الملفات ورفعها إلى مجلد <strong>tests/</strong> على استضافتك</p>
        <div class="files-list">
    `;

    // إنشاء ملف منفصل لكل اختبار
    Object.values(savedTests).forEach(test => {
        const testContent = JSON.stringify(test, null, 2);
        const filename = `${test.id}.json`;
        
        previewHTML += `
            <div class="file-item">
                <div class="file-info">
                    <strong>${test.title}</strong>
                    <div style="color: #666; font-size: 0.9rem;">
                        ${test.questionCount} سؤال | ${test.time} دقيقة
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn btn-primary btn-sm" 
                            onclick="downloadTestFile('${test.id}', '${test.title}')">
                        📥 تحميل
                    </button>
                </div>
            </div>
        `;
    });

    // إنشاء ملف الفهرس
    const indexData = {
        generatedAt: new Date().toISOString(),
        totalTests: Object.keys(savedTests).length,
        tests: Object.keys(savedTests)
    };
    
    previewHTML += `
        </div>
        <div style="margin-top: 20px;">
            <button class="btn btn-success" onclick="downloadIndexFile()">
                📋 تحميل ملف الفهرس
            </button>
            <button class="btn btn-info" onclick="downloadAllTestsZip()">
                📦 تحميل جميع الملفات (ZIP)
            </button>
        </div>
    `;

    document.getElementById('generatedFilesPreview').innerHTML = previewHTML;
    showUploadStatus('single', `✅ تم إنشاء ${Object.keys(savedTests).length} ملف اختبار`, 'success');
}

// تحميل ملف اختبار فردي
function downloadTestFile(testId, testTitle) {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    const test = savedTests[testId];
    
    if (!test) {
        showUploadStatus('single', '❌ لم يتم العثور على الاختبار', 'error');
        return;
    }

    const content = JSON.stringify(test, null, 2);
    downloadFile(`${testId}.json`, content, 'application/json');
    
    showUploadStatus('single', `✅ تم تحميل ملف: ${testTitle}`, 'success');
}

// تحميل ملف الفهرس
function downloadIndexFile() {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    
    const indexData = {
        generatedAt: new Date().toISOString(),
        totalTests: Object.keys(savedTests).length,
        tests: Object.keys(savedTests).map(id => ({
            id: id,
            title: savedTests[id].title,
            lesson: savedTests[id].lessonName,
            questions: savedTests[id].questionCount,
            time: savedTests[id].time
        }))
    };

    const content = JSON.stringify(indexData, null, 2);
    downloadFile('tests-index.json', content, 'application/json');
    
    showUploadStatus('single', '✅ تم تحميل ملف الفهرس', 'success');
}

// تحميل جميع الملفات في أرشيف ZIP (نظري - يحتاج مكتبة)
function downloadAllTestsZip() {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    
    // هذا مثال نظري - في الواقع تحتاج لمكتبة مثل JSZip
    alert('🚧 هذه الخاصية تحتاج إضافة مكتبة JSZip. جاري تحميل الملفات individually بدلاً من ذلك.');
    
    // بديل: تحميل جميع الملفات منفردة
    Object.values(savedTests).forEach(test => {
        setTimeout(() => {
            downloadTestFile(test.id, test.title);
        }, 100);
    });
}

// معالجة رفع ملف فردي
function handleSingleFileUpload(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const testData = JSON.parse(e.target.result);
            
            // التحقق من صحة البيانات
            if (!isValidTestData(testData)) {
                throw new Error('بيانات الاختبار غير صالحة');
            }
            
            // حفظ في localStorage
            const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
            savedTests[testData.id] = testData;
            localStorage.setItem('savedTests', JSON.stringify(savedTests));
            
            // تحديث الواجهة
            displaySavedTests();
            displayLessonTests();
            
            showUploadStatus('single', `✅ تم رفع الاختبار: ${testData.title}`, 'success');
        } catch (error) {
            showUploadStatus('single', `❌ خطأ في رفع الملف: ${error.message}`, 'error');
        }
    };
    
    reader.readAsText(file);
}
// معالجة رفع ملف فردي - الإصدار المحسن
function handleSingleFileUpload(files) {
    if (!files || files.length === 0) {
        showUploadStatus('single', '❌ لم يتم اختيار أي ملف', 'error');
        return;
    }

    const file = files[0];
    
    // التحقق من نوع الملف
    if (!file.name.endsWith('.json')) {
        showUploadStatus('single', '❌ نوع الملف غير مدعوم. يرجى اختيار ملف JSON', 'error');
        return;
    }

    // التحقق من حجم الملف (لا يتجاوز 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showUploadStatus('single', '❌ حجم الملف كبير جداً. الحد الأقصى 2MB', 'error');
        return;
    }

    const reader = new FileReader();
    
    // إظهار حالة التحميل
    showUploadStatus('single', '📁 جاري قراءة الملف...', 'info');
    
    reader.onload = function(e) {
        try {
            const fileContent = e.target.result;
            console.log('📄 محتوى الملف:', fileContent.substring(0, 200) + '...');
            
            let testData;
            
            // محاولة تحليل JSON
            try {
                testData = JSON.parse(fileContent);
            } catch (jsonError) {
                console.error('❌ خطأ في تحليل JSON:', jsonError);
                throw new Error(`تنسيق JSON غير صالح: ${jsonError.message}`);
            }
            
            // التحقق من هيكل البيانات
            const validationResult = validateTestStructure(testData);
            if (!validationResult.isValid) {
                throw new Error(`هيكل البيانات غير صالح: ${validationResult.errors.join(', ')}`);
            }
            
            // معالجة أنواع مختلفة من الملفات
            const processedTests = processTestData(testData);
            if (processedTests.length === 0) {
                throw new Error('لم يتم العثور على اختبارات صالحة في الملف');
            }
            
            // حفظ الاختبارات
            saveProcessedTests(processedTests);
            
            // عرض النتائج
            showUploadResults(processedTests);
            
        } catch (error) {
            console.error('❌ خطأ في معالجة الملف:', error);
            showUploadStatus('single', `❌ فشل في رفع الملف: ${error.message}`, 'error');
        }
    };
    
    reader.onerror = function(error) {
        console.error('❌ خطأ في قراءة الملف:', error);
        showUploadStatus('single', '❌ تعذر قراءة الملف. تأكد من صلاحيته', 'error');
    };
    
    reader.onprogress = function(event) {
        if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            showUploadStatus('single', `📁 جاري التحميل... ${Math.round(percent)}%`, 'info');
        }
    };
    
    // بدء قراءة الملف
    reader.readAsText(file, 'UTF-8');
}

// التحقق من هيكل البيانات بشكل شامل
function validateTestStructure(data) {
    const errors = [];
    
    if (!data) {
        errors.push('الملف فارغ');
        return { isValid: false, errors };
    }
    
    // إذا كان كائن اختبار فردي
    if (data.id && data.questions) {
        if (!data.title) errors.push('العنوان مفقود');
        if (!Array.isArray(data.questions)) errors.push('الأسئلة يجب أن تكون مصفوفة');
        else if (data.questions.length === 0) errors.push('لا توجد أسئلة');
        else {
            data.questions.forEach((q, index) => {
                if (!q.text || q.text.trim() === '') errors.push(`السؤال ${index + 1} بدون نص`);
                if (!q.options || !Array.isArray(q.options)) errors.push(`السؤال ${index + 1} بدون خيارات`);
                else if (q.options.length < 2) errors.push(`السؤال ${index + 1} يحتاج على الأقل خيارين`);
                if (q.correctAnswer === undefined || q.correctAnswer === null) {
                    errors.push(`السؤال ${index + 1} بدون إجابة صحيحة`);
                }
            });
        }
    }
    // إذا كان ملف مجموعة اختبارات
    else if (typeof data === 'object') {
        const testKeys = Object.keys(data).filter(key => 
            data[key] && data[key].id && Array.isArray(data[key].questions)
        );
        if (testKeys.length === 0) {
            errors.push('لم يتم العثور على اختبارات بصيغة صحيحة');
        }
    }
    // إذا كان مصفوفة اختبارات
    else if (Array.isArray(data)) {
        if (data.length === 0) errors.push('المصفوفة فارغة');
        else {
            data.forEach((test, index) => {
                if (!test.id || !test.questions) {
                    errors.push(`العنصر ${index + 1} ليس اختباراً صالحاً`);
                }
            });
        }
    }
    else {
        errors.push('تنسيق الملف غير معروف');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// معالجة أنواع مختلفة من بيانات الاختبار
function processTestData(data) {
    const processedTests = [];
    
    // النوع 1: اختبار فردي
    if (data.id && Array.isArray(data.questions)) {
        const normalizedTest = normalizeTestData(data);
        if (normalizedTest) processedTests.push(normalizedTest);
    }
    // النوع 2: كائن يحتوي على عدة اختبارات
    else if (typeof data === 'object' && !Array.isArray(data)) {
        Object.values(data).forEach(test => {
            if (test && test.id && Array.isArray(test.questions)) {
                const normalizedTest = normalizeTestData(test);
                if (normalizedTest) processedTests.push(normalizedTest);
            }
        });
    }
    // النوع 3: مصفوفة اختبارات
    else if (Array.isArray(data)) {
        data.forEach(test => {
            if (test && test.id && Array.isArray(test.questions)) {
                const normalizedTest = normalizeTestData(test);
                if (normalizedTest) processedTests.push(normalizedTest);
            }
        });
    }
    
    return processedTests;
}

// تطبيع بيانات الاختبار
function normalizeTestData(test) {
    try {
        // إنشاء نسخة من البيانات
        const normalized = JSON.parse(JSON.stringify(test));
        
        // التأكد من وجود المعرف
        if (!normalized.id) {
            normalized.id = 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // التأكد من وجود العنوان
        if (!normalized.title || normalized.title.trim() === '') {
            normalized.title = `اختبار ${normalized.id}`;
        }
        
        // التأكد من وجود وقت الاختبار
        if (!normalized.time || normalized.time < 1) {
            normalized.time = 15;
        }
        
        // التأكد من وجود رابط الدرس
        if (!normalized.lessonLink) {
            normalized.lessonLink = 'general-test';
            normalized.lessonName = 'اختبار عام';
        }
        
        // تأكيد عدد الأسئلة
        if (normalized.questions) {
            normalized.questionCount = normalized.questions.length;
            
            // تطبيع كل سؤال
            normalized.questions.forEach((question, index) => {
                // التأكد من وجود نص السؤال
                if (!question.text || question.text.trim() === '') {
                    question.text = `سؤال ${index + 1}`;
                }
                
                // التأكد من وجود الخيارات
                if (!question.options || !Array.isArray(question.options)) {
                    question.options = ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'];
                }
                
                // إكمال الخيارات الناقصة
                while (question.options.length < 4) {
                    question.options.push(`خيار ${question.options.length + 1}`);
                }
                
                // تقليل الخيارات الزائدة
                if (question.options.length > 4) {
                    question.options = question.options.slice(0, 4);
                }
                
                // التأكد من وجود إجابة صحيحة
                if (question.correctAnswer === undefined || question.correctAnswer === null) {
                    question.correctAnswer = 0;
                }
                
                // التأكد من أن الإجابة الصحيحة ضمن النطاق
                if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
                    question.correctAnswer = 0;
                }
            });
        }
        
        // إضافة بيانات إضافية إذا كانت مفقودة
        if (!normalized.subject) normalized.subject = 'علوم';
        if (!normalized.grade) normalized.grade = 'الصف الثاني الإعدادي';
        if (!normalized.createdAt) normalized.createdAt = new Date().toISOString();
        
        return normalized;
        
    } catch (error) {
        console.error('❌ خطأ في تطبيع بيانات الاختبار:', error);
        return null;
    }
}

// حفظ الاختبارات المعالجة
function saveProcessedTests(processedTests) {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    let savedCount = 0;
    
    processedTests.forEach(test => {
        if (test && test.id) {
            savedTests[test.id] = test;
            savedCount++;
            console.log('💾 تم حفظ الاختبار:', test.title);
        }
    });
    
    localStorage.setItem('savedTests', JSON.stringify(savedTests));
    return savedCount;
}

// عرض نتائج الرفع
function showUploadResults(processedTests) {
    const successCount = processedTests.length;
    
    let resultsHTML = `
        <div class="upload-success">
            <h4>✅ تم رفع ${successCount} اختبار بنجاح</h4>
            <div class="uploaded-tests">
    `;
    
    processedTests.forEach(test => {
        resultsHTML += `
            <div class="uploaded-test">
                <strong>${test.title}</strong>
                <div class="test-details">
                    <span>${test.questions.length} سؤال</span>
                    <span>${test.time} دقيقة</span>
                    <span>${test.lessonName}</span>
                </div>
            </div>
        `;
    });
    
    resultsHTML += `
            </div>
            <div class="upload-actions">
                <button class="btn btn-success" onclick="displaySavedTests()">
                    عرض جميع الاختبارات
                </button>
                <button class="btn btn-primary" onclick="generateHostingFiles()">
                    إنشاء ملفات للاستضافة
                </button>
            </div>
        </div>
    `;
    
    showUploadStatus('single', resultsHTML, 'success');
    
    // تحديث الواجهة
    setTimeout(() => {
        displaySavedTests();
        displayLessonTests();
    }, 1000);
}
// إضافة دعم سحب وإفلات الملفات
function initDragAndDrop() {
    const uploadAreas = document.querySelectorAll('.file-upload-area');
    
    uploadAreas.forEach(area => {
        // منع السلوك الافتراضي
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
        });
        
        // إضافة تأثيرات السحب
        ['dragenter', 'dragover'].forEach(eventName => {
            area.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, unhighlight, false);
        });
        
        // معالجة الإفلات
        area.addEventListener('drop', handleDrop, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        this.classList.add('dragover');
    }
    
    function unhighlight() {
        this.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const input = this.querySelector('input[type="file"]');
            if (input) {
                // تحديث عنصر الإدخال بالملفات
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(files[0]);
                input.files = dataTransfer.files;
                
                // تشغيل event change
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        }
    }
}

// إضافة نصائح للرفع
function addUploadTips() {
    const uploadTips = `
        <div class="upload-tips">
            <h4>💡 نصائح للرفع الناجح:</h4>
            <div class="tips-grid">
                <div class="tip">
                    <strong>✅ الملفات المدعومة:</strong>
                    <p>ملفات JSON فقط</p>
                </div>
                <div class="tip">
                    <strong>📝 تنسيق الملف:</strong>
                    <p>اختبار فردي أو مجموعة اختبارات</p>
                </div>
                <div class="tip">
                    <strong>⚡ الحجم الأقصى:</strong>
                    <p>2 ميجابايت كحد أقصى</p>
                </div>
                <div class="tip">
                    <strong>🔧 الهيكل المطلوب:</strong>
                    <p>يجب أن يحتوي على الأسئلة والخيارات</p>
                </div>
            </div>
        </div>
    `;
    
    const uploadSection = document.querySelector('.manual-upload-section');
    if (uploadSection) {
        uploadSection.insertAdjacentHTML('beforeend', uploadTips);
    }
}

// تهيئة نظام الرفع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    addUploadTips();
});
// تحميل قالب ملف الاختبار
function downloadTestTemplate() {
    const template = {
        "id": "test_مثال_123",
        "title": "اختبار مثال - حالات المادة",
        "description": "اختبار مثال لشرح التنسيق الصحيح",
        "time": 15,
        "questions": [
            {
                "text": "ما هي حالات المادة الأساسية؟",
                "options": [
                    "صلبة وسائلة",
                    "صلبة وسائلة وغازية", 
                    "صلبة وسائلة وغازية وبلازما",
                    "سائلة وغازية فقط"
                ],
                "correctAnswer": 1,
                "explanation": "حالات المادة الأساسية هي الصلبة والسائلة والغازية"
            },
            {
                "text": "أي من هذه يعد من خصائص الحالة الصلبة؟",
                "options": [
                    "شكل ثابت وحجم ثابت",
                    "شكل غير ثابت وحجم ثابت",
                    "شكل غير ثابت وحجم غير ثابت",
                    "شكل ثابت وحجم غير ثابت"
                ],
                "correctAnswer": 0,
                "explanation": "المادة في الحالة الصلبة لها شكل ثابت وحجم ثابت"
            }
        ],
        "lessonLink": "unit1-lesson1",
        "lessonName": "حالات المادة",
        "questionCount": 2,
        "subject": "علوم",
        "grade": "الصف الثاني الإعدادي",
        "createdAt": new Date().toISOString()
    };

    const content = JSON.stringify(template, null, 2);
    downloadFile('قالب-الاختبار.json', content, 'application/json');
    
    showUploadStatus('single', '📋 تم تحميل قالب الاختبار. استخدمه كمرجع لإنشاء ملفاتك.', 'info');
}

// معالجة رفع ملف المجموعة
function handleBatchFileUpload(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const batchData = JSON.parse(e.target.result);
            let successCount = 0;
            let errorCount = 0;
            
            // إذا كان ملف الفهرس
            if (batchData.tests && Array.isArray(batchData.tests)) {
                batchData.tests.forEach(test => {
                    if (isValidTestData(test)) {
                        const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
                        savedTests[test.id] = test;
                        localStorage.setItem('savedTests', JSON.stringify(savedTests));
                        successCount++;
                    } else {
                        errorCount++;
                    }
                });
            } 
            // إذا كان كائن يحتوي على اختبارات متعددة
            else if (typeof batchData === 'object') {
                Object.values(batchData).forEach(test => {
                    if (isValidTestData(test)) {
                        const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
                        savedTests[test.id] = test;
                        localStorage.setItem('savedTests', JSON.stringify(savedTests));
                        successCount++;
                    } else {
                        errorCount++;
                    }
                });
            } else {
                throw new Error('تنسيق الملف غير معروف');
            }
            
            // تحديث الواجهة
            displaySavedTests();
            displayLessonTests();
            
            showUploadStatus('batch', 
                `✅ تم رفع ${successCount} اختبار | ❌ فشل ${errorCount} اختبار`, 
                successCount > 0 ? 'success' : 'error'
            );
            
        } catch (error) {
            showUploadStatus('batch', `❌ خطأ في رفع الملف: ${error.message}`, 'error');
        }
    };
    
    reader.readAsText(file);
}

// التحقق من صحة بيانات الاختبار
function isValidTestData(testData) {
    return testData && 
           testData.id && 
           testData.title && 
           testData.questions && 
           Array.isArray(testData.questions) &&
           testData.questions.length > 0;
}

// عرض حالة الرفع
function showUploadStatus(type, message, status) {
    const elementId = type + 'UploadStatus';
    const element = document.getElementById(elementId);
    
    if (element) {
        element.innerHTML = `<div class="upload-status status-${status}">${message}</div>`;
        
        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }
}

// دالة مساعدة لتحميل الملفات
function downloadFile(filename, content, mimeType = 'application/json') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}