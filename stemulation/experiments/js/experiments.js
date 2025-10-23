// قائمة التجارب المخزنة
let experiments = [];

// تهيئة التطبيق
function initApp() {
    console.log('🚀 بدء تهيئة التطبيق...');
    loadExperiments();
    renderDropdown();
    renderExperiments();
}

// تحميل التجارب من localStorage
function loadExperiments() {
    console.log('📂 جاري تحميل التجارب...');
    
    const saved = localStorage.getItem('stemulationExperiments');
    
    if (saved) {
        console.log('✅ تم العثور على بيانات محفوظة');
        try {
            experiments = JSON.parse(saved);
            console.log('التجارب المحملة:', experiments);
        } catch (error) {
            console.error('❌ خطأ في تحليل البيانات:', error);
            createDefaultExperiments();
        }
    } else {
        console.log('📝 إنشاء تجارب افتراضية...');
        createDefaultExperiments();
    }
}

// إنشاء تجارب افتراضية
function createDefaultExperiments() {
    experiments = [
        {
            id: 1,
            name: " النظرية الجسيمية ",
            folder: "diffusion",
            description: "اكتشف كيف تنتشر الجزيئات في السوائل",
            icon: "🌊",
            active: true
        },
        {
            id: 2,
            name: "تجربة مقارنة حالات المادة", 
            folder: "matter-states",
            description: "شاهد تحولات المادة بين الحالات المختلفة",
            icon: "🌡️",
            active: true
        },
        {
            id: 3,
            name: "حالة البلازما  ",
            folder: "plasma",
            description: "اكتشف حالة البلازما",
            icon: "🔥",
            active: true
        },
        {
            id: 4,
            name: " تأثير اختلاف كتلة المادة على تغير درجة الحرارة ", 
            folder: "change-temperature",
            description: "اكتششف تأثير الحرارة على كتلتين مختلفتين من الماء  ",
            icon: "🌡️",
            active: true
        },
       
    ];
    saveExperiments();
    console.log('✅ تم إنشاء التجارب الافتراضية');
}

// حفظ التجارب في localStorage
function saveExperiments() {
    localStorage.setItem('stemulationExperiments', JSON.stringify(experiments));
    console.log('💾 تم حفظ التجارب:', experiments);
}

// عرض القائمة المنسدلة
function renderDropdown() {
    console.log('🔽 جاري عرض القائمة المنسدلة...');
    const dropdown = document.getElementById('experimentsDropdown');
    
    if (!dropdown) {
        console.error('❌ لم يتم العثور على عنصر القائمة المنسدلة!');
        return;
    }
    
    console.log('عدد التجارب:', experiments.length);
    console.log('التجارب النشطة:', experiments.filter(exp => exp.active).length);
    
    // مسح الخيارات الحالية (باستثناء الخيار الأول)
    while (dropdown.children.length > 1) {
        dropdown.removeChild(dropdown.lastChild);
    }
    
    // إضافة التجارب النشطة فقط
    const activeExperiments = experiments.filter(exp => exp.active);
    
    if (activeExperiments.length === 0) {
        console.log('⚠️ لا توجد تجارب نشطة');
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "لا توجد تجارب متاحة";
        dropdown.appendChild(option);
        return;
    }
    
    activeExperiments.forEach(exp => {
        const option = document.createElement('option');
        option.value = exp.folder;
        option.textContent = `${exp.icon} ${exp.name}`;
        dropdown.appendChild(option);
        console.log(`✅ تم إضافة: ${exp.name}`);
    });
    
    console.log('🎯 تم تحديث القائمة المنسدلة');
}

// فتح التجربة المحددة من القائمة - ✅ المسار المصحح هنا
function openSelectedExperiment() {
    const dropdown = document.getElementById('experimentsDropdown');
    const selectedFolder = dropdown.value;
    
    console.log('🔍 محاولة فتح التجربة:', selectedFolder);
    
    if (!selectedFolder) {
        alert('⚠️ يرجى اختيار تجربة من القائمة');
        return;
    }
    
    const experiment = experiments.find(exp => exp.folder === selectedFolder && exp.active);
    
    if (experiment) {
        console.log('🚀 فتح التجربة:', experiment.name);
        // ✅ المسار المصحح: داخل مجلد experiments
        const experimentPath = `${selectedFolder}/index.html`;
        console.log('المسار:', experimentPath);
        window.location.href = experimentPath;
    } else {
        alert('❌ هذه التجربة غير متاحة حالياً');
    }
}

// عرض التجارب في الشبكة
function renderExperiments(filteredExperiments = null) {
    console.log('🎨 جاري عرض التجارب في الشبكة...');
    const grid = document.getElementById('experimentsGrid');
    
    if (!grid) {
        console.error('❌ لم يتم العثور على عنصر الشبكة!');
        return;
    }
    
    const experimentsToRender = filteredExperiments || experiments;
    
    console.log('عدد التجارب للعرض:', experimentsToRender.length);
    
    grid.innerHTML = '';
    
    if (experimentsToRender.length === 0) {
        grid.innerHTML = `
            <div class="no-experiments">
                <h3>📭 لا توجد تجارب</h3>
                <p>استخدم قسم "ربط تجربة خارجية" لإضافة تجارب جديدة</p>
            </div>
        `;
        return;
    }
    
    experimentsToRender.forEach(exp => {
        const experimentCard = document.createElement('div');
        experimentCard.className = 'experiment-card';
        
        experimentCard.innerHTML = `
            <div class="experiment-status ${exp.active ? 'status-active' : 'status-inactive'}">
                ${exp.active ? '✅ نشطة' : '❌ غير نشطة'}
            </div>
            <div class="experiment-icon">${exp.icon}</div>
            <h3>${exp.name}</h3>
            <p>${exp.description}</p>
            <div style="margin: 15px 0;">
                <small><strong>المجلد:</strong> ${exp.folder}</small>
            </div>
            <div class="controls">
                <button class="btn" onclick="openExperiment('${exp.folder}')">🚀 فتح التجربة</button>
                <button class="btn btn-danger" onclick="toggleExperiment(${exp.id})">
                    ${exp.active ? '❌ إيقاف' : '✅ تفعيل'}
                </button>
            </div>
        `;
        
        grid.appendChild(experimentCard);
    });
    
    console.log('✅ تم عرض التجارب في الشبكة');
}

// فتح تجربة خارجية - ✅ المسار المصحح هنا
function openExperiment(folderName) {
    console.log('🔗 فتح التجربة:', folderName);
    const experiment = experiments.find(exp => exp.folder === folderName && exp.active);
    
    if (experiment) {
        // ✅ المسار المصحح: داخل مجلد experiments
        const experimentPath = `${folderName}/index.html`;
        console.log('🚀 الانتقال إلى:', experimentPath);
        window.location.href = experimentPath;
    } else {
        alert('❌ هذه التجربة غير مفعلة أو غير موجودة');
    }
}

// ربط تجربة جديدة - ✅ التصحيح هنا
function linkExperiment() {
    const name = document.getElementById('expName').value.trim();
    const folder = document.getElementById('expFolder').value.trim(); // ✅ التصحيح
    
    console.log('🔗 محاولة ربط تجربة جديدة:', { name, folder });
    
    if (!name || !folder) {
        alert('⚠️ يرجى إدخال اسم التجربة واسم المجلد');
        return;
    }
    
    // التحقق من عدم وجود تجربة بنفس الاسم أو المجلد
    const exists = experiments.some(exp => 
        exp.name === name || exp.folder === folder
    );
    
    if (exists) {
        alert('⚠️ هناك تجربة بنفس الاسم أو المجلد موجودة مسبقاً');
        return;
    }
    
    const newExperiment = {
        id: Date.now(),
        name: name,
        folder: folder,
        description: 'تجربة مخصصة - ' + name,
        icon: '🔬',
        active: true
    };
    
    experiments.push(newExperiment);
    saveExperiments();
    renderDropdown();
    renderExperiments();
    
    // مسح الحقول
    document.getElementById('expName').value = '';
    document.getElementById('expFolder').value = '';
    
    alert('✅ تم ربط التجربة بنجاح!');
}

// تفعيل/إيقاف تجربة
function toggleExperiment(id) {
    console.log('🔄 تبديل حالة التجربة:', id);
    const experiment = experiments.find(exp => exp.id === id);
    if (experiment) {
        experiment.active = !experiment.active;
        saveExperiments();
        renderDropdown();
        renderExperiments();
        alert(`✅ تم ${experiment.active ? 'تفعيل' : 'إيقاف'} التجربة: ${experiment.name}`);
    }
}

// البحث في التجارب
function searchExperiments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log('🔍 البحث عن:', searchTerm);
    
    if (!searchTerm) {
        renderExperiments();
        return;
    }
    
    const filtered = experiments.filter(exp => 
        exp.name.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm) ||
        exp.folder.toLowerCase().includes(searchTerm)
    );
    
    console.log('نتائج البحث:', filtered.length);
    renderExperiments(filtered);
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 تم تحميل الصفحة بنجاح');
    initApp();
    
    // تفعيل البحث عند الضغط على Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchExperiments();
        }
    });
    
    // تفعيل فتح التجربة عند الضغط على Enter في القائمة المنسدلة
    document.getElementById('experimentsDropdown').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            openSelectedExperiment();
        }
    });
});
