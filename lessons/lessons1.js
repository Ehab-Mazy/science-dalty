// كود محسن لصفحة الدروس
document.addEventListener('DOMContentLoaded', function() {
    // تتبع تقدم الطالب بشكل أفضل
    function initializeProgressTracking() {
        // تهيئة التخزين المحلي إذا لم يكن موجوداً
        if (!localStorage.getItem('scienceProgress')) {
            const initialProgress = {
                completedLessons: [],
                videoViews: {},
                quizScores: {},
                lastActivity: new Date().toISOString()
            };
            localStorage.setItem('scienceProgress', JSON.stringify(initialProgress));
        }
        
        updateProgressDisplays();
        setupLessonInteractions();
    }

    function updateProgressDisplays() {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        const completedLessons = progress.completedLessons;
        
        // تحديث البطاقات
        document.querySelectorAll('.lesson-card').forEach((card, index) => {
            const lessonId = `unit1-lesson${index + 1}`;
            
            if (completedLessons.includes(lessonId)) {
                card.classList.add('completed');
                const completionBadge = document.createElement('div');
                completionBadge.className = 'lesson-completion';
                completionBadge.textContent = '✓ مكتمل';
                card.appendChild(completionBadge);
            }
        });
        
        // تحديث شريط تقدم الوحدة
        updateUnitProgress();
    }

    function setupLessonInteractions() {
        // تفاعل مع أزرار الفيديو
        document.querySelectorAll('.btn-video').forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                const lessonId = `unit1-lesson${index + 1}`;
                markLessonComplete(lessonId);
                trackVideoView(lessonId);
            });
        });
        
        // تفاعل مع أزرار الاختبارات
        document.querySelectorAll('.btn-quiz').forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lessonId = `unit1-lesson${index + 1}`;
                startQuiz(lessonId);
            });
        });
    }

    function markLessonComplete(lessonId) {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            progress.lastActivity = new Date().toISOString();
            localStorage.setItem('scienceProgress', JSON.stringify(progress));
            updateProgressDisplays();
        }
    }

    function trackVideoView(lessonId) {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        progress.videoViews[lessonId] = (progress.videoViews[lessonId] || 0) + 1;
        localStorage.setItem('scienceProgress', JSON.stringify(progress));
    }

    function startQuiz(lessonId) {
        // يمكنك إضافة اختبار تفاعلي هنا لاحقاً
        alert(`🎯 اختبار الدرس جاهز للتنفيذ!\nسيتم إضافة الاختبارات التفاعلية قريباً.`);
        
        // مؤقتاً، نعتبر أن حل الاختبار يعني إكمال الدرس
        if (confirm('هل أنهيت الاختبار بنجاح؟')) {
            markLessonComplete(lessonId);
            trackQuizScore(lessonId, 100); // نتيجة افتراضية
        }
    }

    function trackQuizScore(lessonId, score) {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        progress.quizScores[lessonId] = score;
        localStorage.setItem('scienceProgress', JSON.stringify(progress));
    }

    function updateUnitProgress() {
        const progress = JSON.parse(localStorage.getItem('scienceProgress'));
        const unit1Lessons = 4; // عدد الدروس في الوحدة الأولى
        const completedUnit1Lessons = progress.completedLessons.filter(id => id.startsWith('unit1')).length;
        const progressPercent = (completedUnit1Lessons / unit1Lessons) * 100;
        
        // تحديث شريط التقدم
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
            progressFill.setAttribute('data-progress', Math.round(progressPercent));
        }
        
        // تحديث النص
        const progressText = document.querySelector('.unit-progress span');
        if (progressText) {
            progressText.textContent = Math.round(progressPercent) + '% مكتمل';
        }
    }

    // تأثيرات الظهور
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

    // إضافة تأثيرات متدرجة للبطاقات
    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.dataset.delay = index * 100;
        observer.observe(card);
    });
    
// نظام تشغيل الفيديو المدمج
document.addEventListener('DOMContentLoaded', function() {
    // عناصر نافذة الفيديو
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');

    // فتح نافذة الفيديو
    function openVideoModal(videoId, title, description) {
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
        
        // إضافة تأثير للبطاقة
        const activeCard = document.querySelector(`.btn-video[data-video="${videoId}"]`).closest('.lesson-card');
        activeCard.classList.add('watching-video');
    }

    // إغلاق نافذة الفيديو
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoPlayer.src = '';
        
        // إزالة التأثير من جميع البطاقات
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.classList.remove('watching-video');
        });
    }

    // إضافة أحداث لأزرار الفيديو
    document.querySelectorAll('.btn-video').forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            openVideoModal(videoId, title, description);
        });
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
        const progress = JSON.parse(localStorage.getItem('scienceProgress')) || {
            completedLessons: [],
            videoViews: {},
            quizScores: {},
            lastActivity: new Date().toISOString()
        };
        
        progress.videoViews[videoId] = (progress.videoViews[videoId] || 0) + 1;
        progress.lastActivity = new Date().toISOString();
        localStorage.setItem('scienceProgress', JSON.stringify(progress));
        
        markLessonAsWatched(videoId);
    }

    function markLessonAsWatched(videoId) {
        const lessonMap = {
            'E6c_yUApPcQ': 'unit1-lesson1',
            'VIDEO_ID_2': 'unit1-lesson2',
            'VIDEO_ID_3': 'unit1-lesson3',
            'VIDEO_ID_4': 'unit1-lesson4'
        };
        
        const lessonId = lessonMap[videoId];
        if (lessonId) {
            const progress = JSON.parse(localStorage.getItem('scienceProgress')) || {
                completedLessons: [],
                videoViews: {},
                quizScores: {},
                lastActivity: new Date().toISOString()
            };
            
            if (!progress.completedLessons.includes(lessonId)) {
                progress.completedLessons.push(lessonId);
                localStorage.setItem('scienceProgress', JSON.stringify(progress));
                updateProgressDisplays();
            }
        }
    }

    function updateProgressDisplays() {
        const progress = JSON.parse(localStorage.getItem('scienceProgress')) || {
            completedLessons: [],
            videoViews: {},
            quizScores: {},
            lastActivity: new Date().toISOString()
        };
        
        const completedLessons = progress.completedLessons;
        
        // تحديث البطاقات
        document.querySelectorAll('.lesson-card').forEach((card, index) => {
            const lessonId = `unit1-lesson${index + 1}`;
            
            if (completedLessons.includes(lessonId)) {
                card.style.borderColor = 'var(--science-green)';
                card.style.background = 'linear-gradient(135deg, var(--light-bg), #e8f7f0)';
                
                const badge = card.querySelector('.lesson-badge');
                if (badge) {
                    badge.innerHTML = '✓ مكتمل';
                    badge.style.background = 'var(--science-green)';
                }
            }
        });

        updateUnitProgress();
    }

    function updateUnitProgress() {
        const progress = JSON.parse(localStorage.getItem('scienceProgress')) || {
            completedLessons: [],
            videoViews: {},
            quizScores: {},
            lastActivity: new Date().toISOString()
        };
        
        const unit1Lessons = 4;
        const completedUnit1Lessons = progress.completedLessons.filter(id => id.startsWith('unit1')).length;
        const progressPercent = (completedUnit1Lessons / unit1Lessons) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
            progressFill.setAttribute('data-progress', Math.round(progressPercent));
        }
        
        const progressText = document.querySelector('.unit-progress span');
        if (progressText) {
            progressText.textContent = Math.round(progressPercent) + '% مكتمل';
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

    // تهيئة الصفحة
    updateProgressDisplays();
    
    console.log('🎬 نظام الفيديو المدمج جاهز!');
});
    // تهيئة الصفحة
    initializeProgressTracking();
    
    console.log('🎓 نظام الدروس التفاعلي جاهز!');
});
getTestsForLesson(lessonId) {
    return Object.values(this.savedTests).filter(test => 
        test.lessonLink === lessonId
    );
}