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