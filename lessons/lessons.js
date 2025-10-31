// نظام تشغيل الفيديو المدمج مع الصور المصغرة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ صفحة الدروس جاهزة!');
    
    // عناصر نافذة الفيديو
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');

    // فتح نافذة الفيديو
    function openVideoModal(videoId, title, description) {
        console.log('🎬 فتح فيديو:', videoId);
        
        if (videoId.startsWith('VIDEO_ID_')) {
            alert('⏳ هذا الفيديو قيد الإعداد وسيتم إضافته قريباً');
            return;
        }
        
        // بناء رابط YouTube المضمن
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoPlayer.src = embedUrl;
        videoTitle.textContent = title;
        videoDescription.textContent = description;
        
        // إظهار النافذة
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // تتبع المشاهدة
        trackVideoView(videoId);
    }

    // إغلاق نافذة الفيديو
    function closeVideoModal() {
        console.log('❌ إغلاق الفيديو');
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoPlayer.src = ''; // إوقف الفيديو
    }

    // إضافة أحداث للصور المصغرة للفيديو
    document.addEventListener('click', function(e) {
        // إذا تم النقر على صورة الفيديو المصغرة
        const thumbnail = e.target.closest('.video-thumbnail');
        if (thumbnail) {
            const videoId = thumbnail.getAttribute('data-video');
            const title = thumbnail.getAttribute('data-title');
            const description = thumbnail.getAttribute('data-description');
            
            openVideoModal(videoId, title, description);
        }
        
        // إذا كان زر الاختبار
        if (e.target.classList.contains('btn-quiz')) {
            const quizNum = e.target.getAttribute('data-quiz');
            alert(`📝 اختبار الدرس ${quizNum} قيد الإعداد وسيتم إضافته قريباً`);
        }
        
        // إذا كان زر التحميل
        if (e.target.classList.contains('btn-download')) {
            alert(`📥 سيتم إضافة ملفات التحميل قريباً`);
        }
    });

    // أحداث الإغلاق
    closeModal.addEventListener('click', closeVideoModal);
    
    // إغلاق بالنقر خارج النافذة
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // إغلاق بالزر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // تتبع مشاهدات الفيديو
    function trackVideoView(videoId) {
        try {
            let progress = JSON.parse(localStorage.getItem('scienceProgress'));
            if (!progress) {
                progress = {
                    completedLessons: [],
                    videoViews: {},
                    lastActivity: new Date().toISOString()
                };
            }
            
            progress.videoViews[videoId] = (progress.videoViews[videoId] || 0) + 1;
            progress.lastActivity = new Date().toISOString();
            localStorage.setItem('scienceProgress', JSON.stringify(progress));
            
            console.log('📊 تم تتبع مشاهدة الفيديو:', videoId);
            
            // تحديث عداد المشاهدات في الواجهة
            updateViewCount(videoId);
        } catch (error) {
            console.log('⚠️ لا يمكن حفظ البيانات في localStorage');
        }
    }

    // تحديث عداد المشاهدات
    function updateViewCount(videoId) {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        if (progress && progress.videoViews[videoId]) {
            const views = progress.videoViews[videoId];
            // يمكنك تحديث العداد في الواجهة هنا إذا أردت
            console.log(`👁️ عدد مشاهدات الفيديو ${videoId}: ${views}`);
        }
    }

    // تأثيرات الظهور للبطاقات
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.dataset.delay = index * 100;
        observer.observe(card);
    });

    // تحميل إحصائيات المشاهدات
    function loadViewStats() {
        try {
            const progress = JSON.parse(localStorage.getItem('scienceProgress'));
            if (progress && progress.videoViews) {
                // تحديث عداد المشاهدات للدرس الأول
                const lesson1Views = progress.videoViews['E6c_yUApPcQ'] || 0;
                const viewsElement = document.querySelector('.lesson-card .views');
                if (viewsElement && lesson1Views > 0) {
                    viewsElement.textContent = `👁️ ${lesson1Views} مشاهدة`;
                }
            }
        } catch (error) {
            console.log('⚠️ خطأ في تحميل الإحصائيات');
        }
    }

    // تهيئة الصفحة
    loadViewStats();
});

// دالة مساعدة لتحميل صورة المصغرة من YouTube
function loadYouTubeThumbnail(videoId, element) {
    const img = new Image();
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    img.onload = function() {
        element.style.backgroundImage = `url(${img.src})`;
    };
    img.onerror = function() {
        // إذا فشل تحميل الصورة عالية الدقة، جرب الصورة القياسية
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };
}
function showLessonTests(lessonId, lessonTitle) {
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    // البحث عن الاختبارات المرتبطة بالدرس المحدد
    let relatedTests = Object.values(savedTests).filter(test => 
        test.lessonLink === lessonId
    );

    // إذا لم توجد اختبارات، نعرض رسالة توضح التسمية الصحيحة
    if (relatedTests.length === 0) {
        // نحاول البحث عن اختبارات تحتوي على جزء من التسمية (للاستخدام الخاطئ مثل unit1-lesson بدلاً من unit1-lesson1)
        const alternativeTests = Object.values(savedTests).filter(test => 
            test.lessonLink && test.lessonLink.startsWith(lessonId.substring(0, lessonId.length-1))
        );
        if (alternativeTests.length > 0) {
            // إذا وجدنا اختبارات بتسمية قريبة، نعرضها مع تنبيه
            relatedTests = alternativeTests;
            document.getElementById('modalTitle').textContent = `اختبارات مشابهة للدرس: ${lessonTitle}`;
            const testsList = document.getElementById('testsList');
            let html = `<div class="no-tests" style="color: #e53e3e;">
                <p>⚠️ تم العثور على اختبارات بتسمية مشابهة. يرجى التأكد من ربط الاختبار بالدرس الصحيح.</p>
                <p>التسمية المطلوبة لهذا الدرس هي: <strong>${lessonId}</strong></p>
            </div>`;
            relatedTests.forEach((test, index) => {
                const date = new Date(test.createdAt).toLocaleDateString('ar-EG');
                html += `
                    <div class="test-item">
                        <div class="test-info">
                            <div class="test-title">${test.title}</div>
                            <div class="test-meta">
                                <span>🕒 ${test.time} دقيقة</span>
                                <span>❓ ${test.questionCount} سؤال</span>
                                <span>📅 ${date}</span>
                                <span>🔗 ${test.lessonLink}</span>
                            </div>
                        </div>
                        <button class="btn btn-success" onclick="startTest('${test.id}')">
                            بدء الاختبار
                        </button>
                    </div>
                `;
            });
            testsList.innerHTML = html;
        } else {
            // لا توجد اختبارات مطلقًا
            document.getElementById('modalTitle').textContent = `اختبارات الدرس: ${lessonTitle}`;
            const testsList = document.getElementById('testsList');
            testsList.innerHTML = `
                <div class="no-tests">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📝</div>
                    <h3>لا توجد اختبارات لهذا الدرس بعد</h3>
                    <p>يمكنك إنشاء اختبار جديد من صفحة الاستيراد وربطه بهذا الدرس</p>
                    <p style="margin-top: 10px; font-size: 14px; color: #667eea;">استخدم التسمية: <strong>${lessonId}</strong></p>
                </div>
            `;
        }
    } else {
        // هناك اختبارات مرتبطة بالدرس
        document.getElementById('modalTitle').textContent = `اختبارات درس: ${lessonTitle}`;
        const testsList = document.getElementById('testsList');
        let html = '';
        relatedTests.forEach((test, index) => {
            const date = new Date(test.createdAt).toLocaleDateString('ar-EG');
            html += `
                <div class="test-item">
                    <div class="test-info">
                        <div class="test-title">${test.title}</div>
                        <div class="test-meta">
                            <span>🕒 ${test.time} دقيقة</span>
                            <span>❓ ${test.questionCount} سؤال</span>
                            <span>📅 ${date}</span>
                        </div>
                    </div>
                    <button class="btn btn-success" onclick="startTest('${test.id}')">
                        بدء الاختبار
                    </button>
                </div>
            `;
        });
        testsList.innerHTML = html;
    }
    
    document.getElementById('testsModal').style.display = 'flex';
}
// دالة عرض اختبارات الدرس
function showLessonTests(lessonId, lessonName) {
    const modal = document.getElementById('lessonTestsModal');
    const modalTitle = document.getElementById('modalLessonTitle');
    const testsList = document.getElementById('lessonTestsList');

    modalTitle.textContent = `اختبارات درس: ${lessonName}`;

    // جلب الاختبارات من localStorage
    const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
    const lessonTests = Object.values(savedTests).filter(test => test.lessonLink === lessonId);

    if (lessonTests.length === 0) {
        testsList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #718096;">
                <p>لا توجد اختبارات لهذا الدرس بعد.</p>
                <p>يمكنك إنشاء اختبارات من صفحة استيراد الاختبارات</p>
                <a href="../import/import.html" class="btn-start" style="margin-top: 10px; display: inline-block;">
                    ➕ إنشاء اختبار
                </a>
            </div>
        `;
    } else {
        let html = '';
        lessonTests.forEach(test => {
            const date = new Date(test.createdAt).toLocaleDateString('ar-EG');
            html += `
                <div class="test-item">
                    <h4>${test.title}</h4>
                    <div class="test-meta">
                        <span>🕒 ${test.time} دقيقة</span>
                        <span>❓ ${test.questions.length} سؤال</span>
                        <span>📅 ${date}</span>
                    </div>
                    <div class="test-actions">
                        <a href="#" class="btn-start" onclick="startTest('${test.id}')">بدء الاختبار</a>
                    </div>
                </div>
            `;
        });
        testsList.innerHTML = html;
    }

    modal.style.display = 'block';
}

// دالة بدء الاختبار
function startTest(testId) {
    localStorage.setItem('currentTestId', testId);
    window.location.href = '../test/test.html';
}

// إغلاق النافذة
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('lessonTestsModal').style.display = 'none';
});

// إغلاق النافذة عند النقر خارجها
window.addEventListener('click', function(event) {
    const modal = document.getElementById('lessonTestsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
getTestsForLesson(lessonId) {
    return Object.values(this.savedTests).filter(test => 
        test.lessonLink === lessonId
    );
}
function setAlternativeThumbnail(img) {
    const videoId = img.src.split('/vi/')[1]?.split('/')[0];
    if (!videoId) return;
 
    // حاول مع hqdefault
    if (img.src.includes('maxresdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else {
        // إذا فشلت جميع المحاولات، استبدل بالبديل النصي
        img.style.display = 'none';
        const parent = img.parentElement;
        const title = parent.getAttribute('data-title') || 'فيديو الدرس';
        parent.innerHTML = `
            <div class="video-error">
                <div class="icon">🎬</div>
                <div>${title}</div>
                <small>انقر للمشاهدة</small>
            </div>
        `;
        // إعادة إضافة حدث النقر
        parent.addEventListener('click', handleVideoThumbnailClick);
    }
 }