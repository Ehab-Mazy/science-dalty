import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const ProcessEquation: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">المعادلة الكيميائية</h3>
          <p className="text-gray-500">ملخص العملية الحيوية</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner">
          
          {/* Inputs */}
          <div className="flex flex-col items-center gap-2 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-mono font-bold text-gray-700">6CO₂</span>
            </div>
            <span className="text-sm text-gray-500">ثاني أكسيد الكربون</span>
          </div>

          <span className="text-2xl text-gray-400">+</span>

          <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-mono font-bold text-blue-500">6H₂O</span>
            </div>
            <span className="text-sm text-gray-500">ماء</span>
          </div>

          {/* Process Arrow */}
          <div className="flex flex-col items-center px-4 relative">
            <span className="text-xs font-bold text-sun-500 mb-1">ضوء الشمس</span>
            <div className="h-0.5 w-24 bg-gray-300 relative">
               <ArrowLeft className="absolute -left-1 -top-2.5 h-6 w-6 text-gray-300" />
            </div>
            <span className="text-xs font-bold text-leaf-600 mt-1">كلوروفيل</span>
          </div>

          {/* Outputs */}
          <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-mono font-bold text-leaf-600">C₆H₁₂O₆</span>
            </div>
            <span className="text-sm text-gray-500">جلوكوز (سكر)</span>
          </div>

          <span className="text-2xl text-gray-400">+</span>

          <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-mono font-bold text-red-500">6O₂</span>
            </div>
            <span className="text-sm text-gray-500">أكسجين</span>
          </div>

        </div>
      </div>
    </section>
  );
};