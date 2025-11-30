import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProcessEquation } from './components/ProcessEquation';
import { SimpleDiagram } from './components/SimpleDiagram';
import { FactorsChart } from './components/FactorsChart';
import { ChatBot } from './components/ChatBot';
import { LessonSlides } from './components/LessonSlides';
import { FoodChain } from './components/FoodChain';
import { ChloroplastDiagram } from './components/ChloroplastDiagram';
import { HelmontExperiment } from './components/HelmontExperiment';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-leaf-200 selection:text-leaf-900">
      <Header />
      
      <main>
        <HeroSection />
        
        <LessonSlides />

        <HelmontExperiment />

        <ChloroplastDiagram />

        <ProcessEquation />
        
        <SimpleDiagram />

        <FoodChain />

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              <div className="space-y-6">
                <div className="bg-leaf-50 p-6 rounded-2xl border border-leaf-100">
                  <h3 className="text-2xl font-bold text-leaf-900 mb-4">أهمية البناء الضوئي</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                      <p className="text-gray-700">إنتاج الغذاء (الجلوكوز) الذي تعتمد عليه جميع الكائنات الحية بشكل مباشر أو غير مباشر.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                      <p className="text-gray-700">إطلاق الأكسجين الضروري لتنفس الكائنات الحية.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                      <p className="text-gray-700">تقليل نسبة ثاني أكسيد الكربون في الغلاف الجوي، مما يقلل من الاحتباس الحراري.</p>
                    </li>
                  </ul>
                </div>
                
                <FactorsChart />
              </div>

              <div className="lg:sticky lg:top-24">
                <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-800 mb-2">لديك سؤال؟</h3>
                   <p className="text-gray-600">تحدث مع معلمنا الذكي لمعرفة المزيد عن أسرار النباتات.</p>
                </div>
                <ChatBot />
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer className="bg-leaf-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="opacity-80">
            تم تطوير هذا التطبيق التعليمي باستخدام تقنيات React و Gemini AI
          </p>
          <p className="mt-2 text-sm opacity-50">
             © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;