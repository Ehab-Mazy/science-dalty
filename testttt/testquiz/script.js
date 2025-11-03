// كود متكامل للموقع
document.addEventListener('DOMContentLoaded', function() {
    // شريط التقدم أثناء التمرير
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });

    // تنعيم التمرير للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تأثيرات الظهور للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // مراقبة جميع العناصر
    document.querySelectorAll('.card, .experiment-card, .news-item, .quiz-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // تحديث دوائر التقدم
    function updateProgressCircles() {
        document.querySelectorAll('.progress-circle').forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            circle.style.background = `conic-gradient(var(--science-green) 0% ${percent}%, #ddd ${percent}% 100%)`;
            circle.innerHTML = `<span>${percent}%</span>`;
        });
    }

    // مخطط النتائج (بياني)
    function initResultsChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['الوحدة 1', 'الوحدة 2', 'الوحدة 3', 'الوحدة 4'],
                datasets: [{
                    label: 'نتائج الاختبارات',
                    data: [75, 82, 68, 90],
                    backgroundColor: [
                        'rgba(39, 174, 96, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(231, 76, 60, 0.8)'
                    ],
                    borderColor: [
                        'rgb(39, 174, 96)',
                        'rgb(52, 152, 219)',
                        'rgb(155, 89, 182)',
                        'rgb(231, 76, 60)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // تهيئة جميع الوظائف
    updateProgressCircles();
    initResultsChart();

    // إضافة تأثيرات للصور
    const images = document.querySelectorAll('.lesson-image, .teacher-photo, .school-logo');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    console.log('🚀 موقع Discover with Dalty جاهز! استمتع بالتعليم التفاعلي!');
});

// وظيفة لإضافة أخبار ديناميكية
function addNews(title, content, date) {
    const newsFeed = document.querySelector('.news-feed');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <span class="news-date">${date}</span>
    `;
    newsFeed.prepend(newsItem);
}
// إضافة عداد لعدد الزوار (بسيط)
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // أضف هذا في مكان مناسب في الهيدر
    const visitorElement = document.createElement('div');
    visitorElement.className = 'visitor-counter';
    visitorElement.innerHTML = `👥 عدد الزوار: ${count}`;
    visitorElement.style.cssText = 'background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; font-size: 0.9rem; margin-top: 10px;';
    
    const headerText = document.querySelector('.header-text');
    if (headerText) {
        headerText.appendChild(visitorElement);
    }
}

// استدعاء الدالة عند تحميل الصفحة
updateVisitorCount();

// مثال لإضافة خبر جديد
// addNews('اكتشاف جديد', 'علماء يكتشفون...', '2024-01-20');