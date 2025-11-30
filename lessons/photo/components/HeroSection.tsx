import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-leaf-50 to-white py-16 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-6xl font-black text-leaf-900 mb-6 leading-tight">
          كيف تتنفس <span className="text-leaf-500">الأرض</span>؟
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed">
          اكتشف كيف تحول النباتات ضوء الشمس والماء وثاني أكسيد الكربون إلى طعام وأكسجين، في أهم عملية كيميائية على كوكبنا.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#interactive-diagram" className="px-8 py-3 bg-leaf-600 text-white rounded-full font-bold shadow-lg hover:bg-leaf-700 transition-all transform hover:-translate-y-1">
            استكشف العملية
          </a>
          <a href="#chat-bot" className="px-8 py-3 bg-white text-leaf-700 border-2 border-leaf-100 rounded-full font-bold hover:bg-leaf-50 transition-all">
            اسأل المعلم الذكي
          </a>
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-sun-400 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-leaf-300 opacity-20 blur-3xl"></div>
    </div>
  );
};