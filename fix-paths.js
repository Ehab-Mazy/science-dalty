// fix-paths.js - إصلاح المسارات التالفة
document.addEventListener('DOMContentLoaded', function() {
    fixAllImagePaths();
    fixAllLinks();
    initFallbackSystem();
});

function fixAllImagePaths() {
    // إصلاح مسارات الصور
    const images = document.querySelectorAll('img[src*="../images/"]');
    images.forEach(img => {
        const oldSrc = img.src;
        const newSrc = oldSrc.replace('../images/', 'images/');
        img.src = newSrc;
        
        // إضافة fallback للصور التالفة
        img.onerror = function() {
            console.log('🖼️ الصورة غير موجودة:', oldSrc);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIgcng9IjEwIj48L3JlY3Q+CiAgPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+PGt0PiU8L2t0PjwvdGV4dD4KPC9zdmc+';
            this.alt = 'صورة غير متوفرة';
        };
    });
}

function fixAllLinks() {
    // إصلاح الروابط المعطلة
    const links = document.querySelectorAll('a[href*="../"]');
    links.forEach(link => {
        const oldHref = link.getAttribute('href');
        if (oldHref) {
            const newHref = oldHref.replace('../', '');
            link.setAttribute('href', newHref);
        }
    });
}

function initFallbackSystem() {
    // نظام fallback للاختبارات
    if (typeof showLessonTests === 'undefined') {
        console.log('⚠️ نظام الاختبارات غير محمل، جاري تحميل البديل...');
        loadFallbackQuizSystem();
    }
}