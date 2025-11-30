import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sun, CloudRain, Wind, Leaf, Activity, CheckCircle2 } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "ما هو البناء الضوئي؟",
    content: "هي عملية حيوية تقوم بها النباتات والطحالب لصنع غذائها بنفسها. تخيل أنها 'مطبخ' النبات الذي يحول مواد بسيطة إلى وجبة دسمة مليئة بالطاقة، مستخدماً ضوء الشمس كوقود للطهي.",
    icon: <Leaf className="w-16 h-16" />,
    color: "bg-leaf-100 text-leaf-600"
  },
  {
    id: 2,
    title: "المكونات الأساسية (المدخلات)",
    content: "لإتمام هذه 'الطبخة'، يحتاج النبات إلى ثلاثة مكونات رئيسية:\n1. ضوء الشمس (مصدر الطاقة).\n2. الماء (يأتي من الجذور).\n3. ثاني أكسيد الكربون (يأتي من الهواء).",
    icon: <div className="flex gap-2"><Sun className="w-10 h-10 text-yellow-500" /><CloudRain className="w-10 h-10 text-blue-500" /><Wind className="w-10 h-10 text-gray-400" /></div>,
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 3,
    title: "المصنع الأخضر (البلاستيدات)",
    content: "تحدث العملية داخل أجزاء صغيرة جداً في خلايا الورقة تسمى 'البلاستيدات الخضراء'. تحتوي هذه البلاستيدات على مادة 'الكلوروفيل' التي تعطي النبات لونه الأخضر وهي المسؤولة عن امتصاص ضوء الشمس.",
    icon: <Activity className="w-16 h-16" />,
    color: "bg-green-100 text-green-700"
  },
  {
    id: 4,
    title: "النتائج (المخرجات)",
    content: "بعد انتهاء العملية، ينتج النبات شيئين عظيمين:\n1. سكر الجلوكوز: وهو غذاء النبات ومصدر طاقته.\n2. الأكسجين: غاز نقي يطلقه النبات في الهواء لتتنفسه الكائنات الحية.",
    icon: <div className="flex items-center gap-2"><span className="text-4xl">🍬</span><span className="text-2xl">+</span><span className="text-4xl">🌬️</span></div>,
    color: "bg-orange-50 text-orange-600"
  },
  {
    id: 5,
    title: "أهمية العملية للحياة",
    content: "بدون البناء الضوئي، لن تكون هناك حياة على الأرض! فهي المصدر الأساسي للأكسجين الذي نتنفسه، والمصدر الأول للطعام في السلسلة الغذائية.",
    icon: <CheckCircle2 className="w-16 h-16" />,
    color: "bg-leaf-200 text-leaf-800"
  }
];

export const LessonSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const currentData = slides[currentSlide];

  return (
    <section className="py-16 bg-white" id="lesson-slides">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-leaf-900">رحلة التعلم</h2>
          <p className="text-gray-500 mt-2">تعرف على البناء الضوئي خطوة بخطوة</p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[400px] flex flex-col md:flex-row">
          
          {/* Visual Side */}
          <div className={`w-full md:w-1/3 ${currentData.color} flex flex-col items-center justify-center p-8 transition-colors duration-500`}>
            <div className="bg-white/50 p-6 rounded-full backdrop-blur-sm shadow-sm animate-bounce-slow">
              {currentData.icon}
            </div>
            <div className="mt-6 font-bold text-9xl opacity-10 font-mono absolute select-none">
              {currentData.id}
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-leaf-100 text-leaf-700 text-xs font-bold px-3 py-1 rounded-full">
                  شريحة {currentData.id} من {slides.length}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                {currentData.title}
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {currentData.content}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 text-gray-500 hover:text-leaf-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                السابق
              </button>

              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-8 bg-leaf-500' : 'w-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 text-leaf-600 hover:text-leaf-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
              >
                التالي
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};