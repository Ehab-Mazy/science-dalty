import React, { useState } from 'react';
import { Circle, Layers, Maximize, Palette } from 'lucide-react';

interface PartInfo {
  id: string;
  title: string;
  description: string;
  func: string;
  icon: React.ReactNode;
}

export const ChloroplastDiagram: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const parts: Record<string, PartInfo> = {
    membrane: {
      id: 'membrane',
      title: 'الغشاء المزدوج (Double Membrane)',
      description: 'غشاء خارجي وداخلي يحيط بالبلاستيدة.',
      func: 'يتحكم في دخول وخروج المواد من وإلى البلاستيدة، ويوفر الحماية.',
      icon: <Maximize className="text-leaf-600" />
    },
    stroma: {
      id: 'stroma',
      title: 'الستروما / الحشوة (Stroma)',
      description: 'سائل هلامي يملأ فراغ البلاستيدة الداخلي.',
      func: 'يحتوي على الأنزيمات اللازمة وتحدث فيه التفاعلات اللاضوئية (دورة كالفن) لتحويل الكربون إلى سكر.',
      icon: <Circle className="text-yellow-600" />
    },
    grana: {
      id: 'grana',
      title: 'الجرانا (Grana)',
      description: 'مجموعات من الأقراص المتراصة فوق بعضها البعض.',
      func: 'تزيد من مساحة السطح لامتصاص أكبر قدر من الضوء.',
      icon: <Layers className="text-green-700" />
    },
    thylakoid: {
      id: 'thylakoid',
      title: 'التيلاكويد (Thylakoid)',
      description: 'أقراص غشائية مجوفة تحتوي على صبغة الكلوروفيل.',
      func: 'المكان الذي تحدث فيه التفاعلات الضوئية (امتصاص الطاقة الشمسية وشطر الماء).',
      icon: <Palette className="text-green-500" />
    }
  };

  const handlePartClick = (id: string) => {
    setSelectedPart(id === selectedPart ? null : id);
  };

  const getOpacity = (id: string) => {
    if (!selectedPart) return 1;
    return selectedPart === id ? 1 : 0.4;
  };

  return (
    <section className="py-16 bg-white overflow-hidden" id="chloroplast-structure">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full mb-2 inline-block">
            تحت المجهر
          </span>
          <h2 className="text-3xl font-bold text-gray-900">تركيب البلاستيدة الخضراء</h2>
          <p className="text-gray-500 mt-2">اضغط على أجزاء الرسم لاستكشاف أين يحدث السحر</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Interactive SVG Diagram */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-inner p-4 min-h-[300px] flex items-center justify-center">
            <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl cursor-pointer select-none">
              
              {/* Outer Membrane */}
              <g onClick={() => handlePartClick('membrane')} style={{ opacity: getOpacity('membrane'), transition: 'opacity 0.3s' }}>
                <ellipse cx="200" cy="125" rx="190" ry="115" fill="#dcfce7" stroke="#166534" strokeWidth="4" />
                <ellipse cx="200" cy="125" rx="182" ry="108" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
              </g>

              {/* Stroma (The fluid background inside inner membrane) */}
              <g onClick={() => handlePartClick('stroma')} style={{ opacity: getOpacity('stroma'), transition: 'opacity 0.3s' }}>
                 <path d="M 382 125 A 182 108 0 0 1 18 125 A 182 108 0 0 1 382 125 Z" fill="#ecfccb" opacity="0.6" />
                 {/* Floating dots representing enzymes/starch */}
                 <circle cx="100" cy="80" r="2" fill="#84cc16" />
                 <circle cx="150" cy="180" r="3" fill="#84cc16" />
                 <circle cx="300" cy="100" r="2" fill="#84cc16" />
                 <circle cx="280" cy="160" r="2" fill="#84cc16" />
              </g>

              {/* Connections (Stromal Lamellae) */}
              <path d="M 90 125 L 150 125 M 190 115 L 250 135 M 190 135 L 250 115" stroke="#22c55e" strokeWidth="3" opacity={getOpacity('grana')} />

              {/* Grana Stacks */}
              <g onClick={() => handlePartClick('grana')} style={{ opacity: getOpacity('grana'), transition: 'opacity 0.3s' }}>
                {/* Stack 1 */}
                <g transform="translate(60, 90)">
                   <rect x="0" y="0" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="8" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="16" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="24" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="32" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                </g>
                
                 {/* Stack 2 (Center) */}
                 <g transform="translate(160, 80)">
                   <rect x="0" y="0" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="8" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="16" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="24" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="32" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="40" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                </g>

                 {/* Stack 3 (Right) */}
                 <g transform="translate(260, 100)">
                   <rect x="0" y="0" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="8" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="16" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                   <rect x="0" y="24" width="40" height="10" rx="4" fill="#15803d" stroke="#14532d" />
                </g>
              </g>

               {/* Single Thylakoid Highlight (Visual representation of clicking a single disc) */}
               <g onClick={(e) => { e.stopPropagation(); handlePartClick('thylakoid'); }} style={{ opacity: getOpacity('thylakoid'), transition: 'opacity 0.3s' }} className="cursor-pointer hover:brightness-110">
                  <rect x="155" y="65" width="50" height="14" rx="6" fill="#4ade80" stroke="#16a34a" strokeWidth="2" transform="rotate(-5)" />
                  <text x="165" y="76" fontSize="8" fill="#064e3b" fontWeight="bold" transform="rotate(-5)">Thylakoid</text>
                  
                  {/* Zoom lines */}
                  <line x1="180" y1="80" x2="180" y2="90" stroke="#4ade80" strokeWidth="1" strokeDasharray="2 2" />
               </g>

            </svg>
            
            {/* Labels overlaid absolutely for better text rendering */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 px-2 py-1 rounded text-xs font-bold text-leaf-800 transition-opacity ${selectedPart && selectedPart !== 'membrane' ? 'opacity-20' : 'opacity-100'}`}>
              غشاء خارجي وداخلي
            </div>
          </div>

          {/* Info Card */}
          <div className="h-full">
            {selectedPart ? (
              <div className="bg-white rounded-2xl border-2 border-leaf-100 shadow-lg p-6 h-full animate-fade-in-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-leaf-50 rounded-xl">
                    {parts[selectedPart].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{parts[selectedPart].title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">الوصف</h4>
                    <p className="text-gray-700 leading-relaxed">{parts[selectedPart].description}</p>
                  </div>
                  
                  <div className="bg-leaf-50/50 p-4 rounded-xl border border-leaf-100">
                    <h4 className="text-sm font-bold text-leaf-600 uppercase tracking-wider mb-1">الوظيفة الحيوية</h4>
                    <p className="text-gray-800 font-medium leading-relaxed">{parts[selectedPart].func}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline"
                >
                  إغلاق التفاصيل
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 h-full flex flex-col items-center justify-center text-center text-gray-400">
                <Palette className="w-12 h-12 mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">استكشف التركيب الدقيق</h3>
                <p className="max-w-xs">اضغط على أي جزء في الرسم (الغشاء، السائل، أو الأقراص الخضراء) لمعرفة دوره في عملية البناء الضوئي.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
