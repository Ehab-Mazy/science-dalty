// العناصر
const glucoseSlider = document.getElementById('glucose-level');
const glucoseDisplay = document.getElementById('glucose-display');
const addBenedictBtn = document.getElementById('add-benedict');
const heatButton = document.getElementById('heat-button');
const resetButton = document.getElementById('reset-button');
const solution = document.getElementById('solution');
const flame = document.getElementById('flame');
const resultBox = document.getElementById('result-box');
const resultText = document.getElementById('result-text');
const tempValue = document.getElementById('temp-value');

// المتغيرات
let glucoseLevel = 0;
let benedictAdded = false;
let heating = false;

// تحديث مستوى الجلوكوز
glucoseSlider.addEventListener('input', function() {
    glucoseLevel = parseInt(this.value);
    glucoseDisplay.textContent = glucoseLevel;
});

// إضافة كاشف بندكت
addBenedictBtn.addEventListener('click', function() {
    if (!benedictAdded) {
        benedictAdded = true;
        solution.style.background = '#4169E1'; // أزرق
        solution.classList.add('filled');
        
        // تأثير صوتي بصري
        this.disabled = true;
        this.innerHTML = '<span class="btn-icon">✅</span> تم إضافة الكاشف';
        
        // تفعيل زر التسخين
        heatButton.disabled = false;
        
        // إظهار رسالة
        showNotification('تم إضافة كاشف بندكت الأزرق بنجاح! 💧', 'info');
    }
});

// التسخين
heatButton.addEventListener('click', function() {
    if (benedictAdded && !heating) {
        heating = true;
        this.disabled = true;
        
        // إظهار اللهب
        flame.classList.remove('hidden');
        
        // بدء التسخين التدريجي
        let temp = 25;
        const heatingInterval = setInterval(() => {
            temp += 5;
            tempValue.textContent = temp + '°C';
            
            if (temp >= 85) {
                clearInterval(heatingInterval);
                // بدء التفاعل
                setTimeout(() => {
                    performReaction();
                }, 1000);
            }
        }, 200);
    }
});

// إجراء التفاعل
function performReaction() {
    let color, result, borderColor;
    
    if (glucoseLevel === 0) {
        // سلبي
        color = '#4169E1';
        result = '❌ <strong>نتيجة سلبية</strong><br>اللون باقٍ أزرق - لا يوجد جلوكوز';
        borderColor = '#4169E1';
    } else if (glucoseLevel <= 25) {
        // تركيز قليل
        color = '#32CD32';
        result = '✅ <strong>نتيجة إيجابية ضعيفة</strong><br>لون أخضر - تركيز قليل من الجلوكوز (' + glucoseLevel + '%)';
        borderColor = '#32CD32';
    } else if (glucoseLevel <= 50) {
        // تركيز متوسط
        color = '#FFD700';
        result = '✅✅ <strong>نتيجة إيجابية متوسطة</strong><br>لون أصفر - تركيز متوسط من الجلوكوز (' + glucoseLevel + '%)';
        borderColor = '#FFD700';
    } else if (glucoseLevel <= 75) {
        // تركيز عالي
        color = '#FF8C00';
        result = '✅✅✅ <strong>نتيجة إيجابية قوية</strong><br>لون برتقالي - تركيز عالي من الجلوكوز (' + glucoseLevel + '%)';
        borderColor = '#FF8C00';
    } else {
        // تركيز عالي جداً
        color = '#DC143C';
        result = '✅✅✅✅ <strong>نتيجة إيجابية قوية جداً</strong><br>لون أحمر مع راسب - تركيز عالي جداً من الجلوكوز (' + glucoseLevel + '%)';
        borderColor = '#DC143C';
    }
    
    // تغيير اللون تدريجياً
    solution.style.transition = 'background 2s ease';
    solution.style.background = color;
    
    // إخفاء اللهب بعد فترة
    setTimeout(() => {
        flame.classList.add('hidden');
        let temp = 85;
        const coolingInterval = setInterval(() => {
            temp -= 5;
            tempValue.textContent = temp + '°C';
            if (temp <= 25) {
                clearInterval(coolingInterval);
            }
        }, 200);
    }, 2000);
    
    // إظهار النتيجة
    setTimeout(() => {
        resultBox.classList.remove('hidden');
        resultBox.style.borderRightColor = borderColor;
        resultText.innerHTML = result;
        
        // إضافة تأثير الظهور
        resultBox.style.animation = 'slideIn 0.5s ease';
        
        showNotification('اكتملت التجربة! تحقق من النتيجة 🎉', 'success');
    }, 2500);
}

// إعادة التعيين
resetButton.addEventListener('click', function() {
    // إعادة تعيين المتغيرات
    benedictAdded = false;
    heating = false;
    glucoseLevel = 0;
    
    // إعادة تعيين الواجهة
    glucoseSlider.value = 0;
    glucoseDisplay.textContent = 0;
    
    solution.style.background = 'transparent';
    solution.classList.remove('filled');
    solution.style.transition = 'all 0.5s ease';
    
    flame.classList.add('hidden');
    tempValue.textContent = '25°C';
    
    resultBox.classList.add('hidden');
    resultText.innerHTML = '';
    
    // إعادة تفعيل الأزرار
    addBenedictBtn.disabled = false;
    addBenedictBtn.innerHTML = '<span class="btn-icon">💧</span> إضافة كاشف بندكت';
    heatButton.disabled = true;
    
    showNotification('تم إعادة تعيين التجربة 🔄', 'info');
});

// دالة لإظهار الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#27ae60' : type === 'info' ? '#3498db' : '#e74c3c'};
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideDown 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// إضافة الأنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);