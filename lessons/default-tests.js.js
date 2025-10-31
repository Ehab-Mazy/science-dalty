// اختبارات افتراضية للعرض التوضيحي
const defaultTests = {
    'demo-test-1': {
        id: 'demo-test-1',
        title: 'اختبار تجريبي - حالات المادة',
        time: 15,
        questions: [
            {
                id: 1,
                text: 'ما هي حالات المادة الثلاث؟',
                options: ['صلبة، سائلة، غازية', 'سائلة، نارية، هوائية', 'صلبة، سائلة، نارية', 'غازية، صلبة، معدنية'],
                correctAnswer: 0,
                explanation: 'حالات المادة الأساسية هي: الصلبة، السائلة، والغازية'
            },
            {
                id: 2,
                text: 'أي من الخصائص التالية تنتمي للحالة الصلبة؟',
                options: ['شكل ثابت وحجم ثابت', 'شكل متغير وحجم ثابت', 'شكل متغير وحجم متغير', 'شكل ثابت وحجم متغير'],
                correctAnswer: 0,
                explanation: 'المادة في الحالة الصلبة لها شكل ثابت وحجم ثابت'
            },
            {
                id: 3,
                text: 'عند تسخين المادة الصلبة تتحول إلى:',
                options: ['حالة سائلة', 'حالة غازية', 'تتبخر مباشرة', 'تتحول إلى بلازما'],
                correctAnswer: 0,
                explanation: 'تتحول المادة الصلبة إلى سائلة عند التسخين في عملية تسمى الانصهار'
            }
        ],
        createdAt: new Date().toISOString(),
        subject: 'علوم',
        grade: 'الصف الثاني الإعدادي',
        questionCount: 3,
        lessonLink: 'unit1-lesson1',
        lessonName: 'حالات المادة'
    },
    'demo-test-2': {
        id: 'demo-test-2',
        title: 'اختبار تغير حالات المادة',
        time: 10,
        questions: [
            {
                id: 1,
                text: 'ما اسم عملية تحول السائل إلى غاز؟',
                options: ['التكثف', 'الانصهار', 'التجمد', 'التبخر'],
                correctAnswer: 3,
                explanation: 'التبخر هو عملية تحول السائل إلى غاز'
            },
            {
                id: 2,
                text: 'عند تبريد الغاز يتحول إلى:',
                options: ['صلب', 'سائل', 'بلازما', 'يبقى غازاً'],
                correctAnswer: 1,
                explanation: 'يتحول الغاز إلى سائل عند التبريد في عملية تسمى التكثف'
            }
        ],
        createdAt: new Date().toISOString(),
        subject: 'علوم',
        grade: 'الصف الثاني الإعدادي',
        questionCount: 2,
        lessonLink: 'unit1-lesson2',
        lessonName: 'تغير حالات المادة'
    }
};

// دالة لتحميل الاختبارات الافتراضية
function loadDefaultTests() {
    try {
        // محاولة الحصول على الاختبارات المحفوظة
        const savedTests = JSON.parse(localStorage.getItem('savedTests') || '{}');
        
        // إذا لم توجد اختبارات محفوظة، استخدم الافتراضية
        if (Object.keys(savedTests).length === 0) {
            console.log('جاري تحميل الاختبارات الافتراضية...');
            localStorage.setItem('savedTests', JSON.stringify(defaultTests));
            return defaultTests;
        }
        
        return savedTests;
    } catch (error) {
        console.error('خطأ في تحميل الاختبارات:', error);
        // في حالة الخطأ، استخدم الافتراضية
        localStorage.setItem('savedTests', JSON.stringify(defaultTests));
        return defaultTests;
    }
}

// تصدير الدوال للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { defaultTests, loadDefaultTests };
}