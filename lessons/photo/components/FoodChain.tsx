import React, { useState } from 'react';
import { Zap, Info } from 'lucide-react';
import { levels } from './foodChainData';
import { EnergyPyramid } from './EnergyPyramid';

export const FoodChain: React.FC = () => {
  const [activeLevelId, setActiveLevelId] = useState<string>('producer');
  
  const currentLevel = levels.find(l => l.id === activeLevelId) || levels[levels.length - 1];
  const CurrentIcon = currentLevel.icon;

  return (
    <section className="py-16 bg-white overflow-hidden" id="food-chain">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-sm border border-amber-200">
            <Zap className="w-4 h-4 fill-amber-500" />
            انتقال الطاقة في النظام البيئي
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            هرم الطاقة
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            كلما صعدنا في الهرم، قلت الطاقة المتاحة. شاهد كيف تتناقص الطاقة من قاعدة الهرم العريضة حتى قمته.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Pyramid */}
          <div className="lg:col-span-7 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner relative overflow-hidden min-h-[500px] flex items-center">
             {/* Background decoration */}
             <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
             <EnergyPyramid activeLevel={activeLevelId} onSelectLevel={setActiveLevelId} />
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl h-full p-8 flex flex-col relative overflow-hidden transition-all duration-300">
              
              {/* Dynamic colored background header */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${currentLevel.bgGradient} opacity-50`}></div>

              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 text-${currentLevel.color.split('-')[1]}-600`}>
                  <CurrentIcon size={40} strokeWidth={1.5} />
                </div>

                <div className="mb-6">
                  <span className="text-sm font-bold opacity-60 uppercase tracking-wider">{currentLevel.role}</span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{currentLevel.name}</h3>
                </div>

                <div className="flex items-center gap-4 mb-8 bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-gray-100">
                  <div className="flex-1 border-l-2 border-gray-200 pl-4">
                    <span className="block text-xs text-gray-500 font-bold mb-1">مستوى الطاقة</span>
                    <span className={`text-2xl font-black ${currentLevel.color}`}>{currentLevel.energy}</span>
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs text-gray-500 font-bold mb-1">الحالة</span>
                    <span className="text-gray-800 font-medium">نشط في النظام</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {currentLevel.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-start gap-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                  <Info className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" />
                  <p>
                    {activeLevelId === 'producer' && "النباتات هي المنتج الوحيد الذي يضيف طاقة جديدة للنظام."}
                    {activeLevelId === 'primary' && "آكلات الأعشاب تحتاج لأكل كميات كبيرة لتعويض قلة الطاقة."}
                    {activeLevelId === 'secondary' && "عدد المفترسات دائماً أقل من عدد الفرائس بسبب نقص الطاقة المتاحة."}
                    {activeLevelId === 'decomposer' && "المحللات تغلق الدائرة وتعيد المواد الأولية للتربة."}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};