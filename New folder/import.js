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