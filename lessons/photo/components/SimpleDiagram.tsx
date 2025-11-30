import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Droplets } from 'lucide-react';

export const SimpleDiagram: React.FC = () => {
  const [activePart, setActivePart] = useState<string | null>(null);

  const parts = {
    sun: {
      title: 'أشعة الشمس',
      desc: 'المصدر الرئيسي للطاقة. يمتص الكلوروفيل في الأوراق الطاقة الضوئية لبدء التفاعل.',
      color: 'bg-yellow-100 border-yellow-400 text-yellow-800'
    },
    water: {
      title: 'الماء (H₂O)',
      desc: 'يمتصه النبات من التربة عبر الجذور وينتقل إلى الأوراق.',
      color: 'bg-blue-100 border-blue-400 text-blue-800'
    },
    co2: {
      title: 'ثاني أكسيد الكربون (CO₂)',
      desc: 'يدخل إلى الورقة عبر فتحات صغيرة تسمى الثغور.',
      color: 'bg-gray-100 border-gray-400 text-gray-800'
    },
    chlorophyll: {
      title: 'الكلوروفيل',
      desc: 'الصبغة الخضراء في البلاستيدات الخضراء التي تمتص الضوء.',
      color: 'bg-green-100 border-green-400 text-green-800'
    },
    products: {
      title: 'النواتج',
      desc: 'ينتج سكر الجلوكوز (طاقة) وينطلق غاز الأكسجين كناتج ثانوي.',
      color: 'bg-red-100 border-red-400 text-red-800'
    }
  };

  return (
    <div id="interactive-diagram" className="py-12 bg-leaf-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-leaf-900 mb-12">مخطط تفاعلي</h3>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Diagram Container */}
          <div className="relative w-full max-w-lg aspect-square bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white">
            {/* Background Sky/Ground */}
            <div className="absolute inset-0 flex flex-col">
              <div className="h-2/3 bg-sky-100"></div>
              <div className="h-1/3 bg-[#8B5E3C]"></div>
            </div>

            {/* Sun */}
            <button 
              onClick={() => setActivePart('sun')}
              className={`absolute top-8 left-8 p-4 rounded-full transition-transform hover:scale-110 ${activePart === 'sun' ? 'ring-4 ring-yellow-300 scale-110' : ''}`}
            >
              <Sun className="h-16 w-16 text-yellow-500 animate-spin-slow" />
            </button>

            {/* Plant */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
               {/* Flower/Leaves */}
               <div className="relative group cursor-pointer" onClick={() => setActivePart('chlorophyll')}>
                  <div className={`w-32 h-32 bg-leaf-500 rounded-full rounded-br-none transform -rotate-45 shadow-lg transition-all ${activePart === 'chlorophyll' ? 'brightness-110 scale-105' : ''}`}></div>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-leaf-400 rounded-full rounded-bl-none transform rotate-45 -translate-x-4 shadow-lg opacity-90 transition-all ${activePart === 'chlorophyll' ? 'brightness-110 scale-105' : ''}`}></div>
               </div>
               
               {/* Stem */}
               <div className="w-4 h-32 bg-leaf-700"></div>

               {/* Roots */}
               <div className="w-full relative h-20" onClick={() => setActivePart('water')}>
                  <div className="absolute top-0 left-1/2 w-1 h-16 bg-[#F5DEB3] transform -rotate-12 origin-top"></div>
                  <div className="absolute top-0 left-1/2 w-1 h-20 bg-[#F5DEB3] transform rotate-12 origin-top"></div>
                  <div className="absolute top-0 left-1/2 w-1 h-24 bg-[#F5DEB3] transform rotate-0 origin-top"></div>
               </div>
            </div>

            {/* CO2 Label */}
            <button 
               onClick={() => setActivePart('co2')}
               className={`absolute top-1/2 right-12 bg-white/80 p-2 rounded-lg shadow-sm backdrop-blur text-sm font-bold text-gray-600 hover:bg-white transition-all ${activePart === 'co2' ? 'ring-2 ring-gray-400' : ''}`}
            >
              <Wind className="inline-block ml-1 h-4 w-4" />
              CO₂
            </button>

            {/* Water Label */}
            <button 
               onClick={() => setActivePart('water')}
               className={`absolute bottom-4 right-1/4 bg-blue-500/80 p-2 rounded-lg shadow-sm text-sm font-bold text-white hover:bg-blue-600 transition-all ${activePart === 'water' ? 'ring-2 ring-blue-300' : ''}`}
            >
              <Droplets className="inline-block ml-1 h-4 w-4" />
              H₂O
            </button>

             {/* Products Label */}
            <button 
               onClick={() => setActivePart('products')}
               className={`absolute top-1/3 left-1/4 bg-red-100 p-2 rounded-lg shadow-sm text-sm font-bold text-red-600 hover:bg-red-200 transition-all ${activePart === 'products' ? 'ring-2 ring-red-300' : ''}`}
            >
              O₂ + سكر
            </button>
          </div>

          {/* Info Card */}
          <div className="flex-1 w-full lg:max-w-md min-h-[200px]">
            {activePart ? (
              <div className={`p-6 rounded-2xl border-2 shadow-lg transition-all duration-500 ease-in-out ${parts[activePart as keyof typeof parts].color}`}>
                <h4 className="text-2xl font-bold mb-4">{parts[activePart as keyof typeof parts].title}</h4>
                <p className="text-lg leading-relaxed opacity-90">
                  {parts[activePart as keyof typeof parts].desc}
                </p>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center h-full text-gray-400 bg-white/50">
                <span className="text-4xl mb-4">👆</span>
                <p className="text-lg">اضغط على أجزاء الرسم لاكتشاف المزيد</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};