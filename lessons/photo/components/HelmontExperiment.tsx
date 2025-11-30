import React from 'react';
import { Sprout, Trees, Droplets, Timer, ArrowRight, Scale, FlaskConical } from 'lucide-react';

export const HelmontExperiment: React.FC = () => {
  return (
    <section className="py-16 bg-amber-50/50" id="helmont-experiment">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف اكتشفنا سر نمو النبات؟</h2>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-amber-200 shadow-sm">
                <FlaskConical className="w-4 h-4" />
                تجربة فان هيلمونت (القرن 17)
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                اعتقد العلماء قديماً أن النباتات "تأكل" التراب لتنمو! قام العالم "فان هيلمونت" بتجربة شهيرة استمرت 5 سنوات غيرت هذا المفهوم تماماً.
            </p>
        </div>

        {/* Experiment Visualizer */}
        <div className="grid md:grid-cols-7 gap-4 items-center mb-12">
            {/* Start Stage */}
            <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-amber-100 text-center relative group hover:shadow-md transition-all">
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">البداية</div>
                <div className="flex justify-center mb-6 mt-2">
                    <div className="relative">
                        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                            <Sprout size={48} className="text-green-600" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow border border-gray-100">
                             <Scale className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">زراعة شتلة صغيرة</h3>
                <div className="space-y-3 text-right bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">وزن الشتلة</span>
                        <span className="font-mono font-bold text-gray-800">2.2 kg</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span className="text-gray-500 text-sm">وزن التربة الجافة</span>
                        <span className="font-mono font-bold text-gray-800">90.0 kg</span>
                    </div>
                </div>
            </div>

            {/* Transition Arrow & Process */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-6 gap-2">
                <div className="bg-blue-50 p-3 rounded-full border border-blue-100 shadow-sm animate-pulse">
                    <Droplets className="text-blue-500 w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-600">ري بالماء فقط</span>
                <div className="w-full h-0.5 bg-gray-300 relative my-2">
                    <ArrowRight className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-300 w-6 h-6 rtl:rotate-180" />
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs font-mono bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                    <Timer size={12} /> 5 سنوات
                </div>
            </div>

            {/* End Stage */}
            <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-amber-100 text-center relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">النتيجة بعد 5 سنوات</div>
                <div className="flex justify-center mb-6 mt-2">
                     <div className="relative">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                            <Trees size={56} className="text-green-700" />
                        </div>
                         <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow border border-gray-100">
                             <Scale className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">شجرة صفصاف ضخمة</h3>
                <div className="space-y-3 text-right bg-gray-50 p-4 rounded-xl">
                     <div className="flex justify-between border-b border-gray-200 pb-2 items-center">
                        <span className="text-gray-500 text-sm">وزن الشجرة</span>
                        <div className="text-left">
                            <span className="font-mono font-bold block text-gray-800">75.0 kg</span>
                            <span className="text-[10px] text-green-600 font-bold bg-green-100 px-1 rounded inline-block">+72.8 kg زيادة</span>
                        </div>
                    </div>
                    <div className="flex justify-between pt-1 items-center">
                        <span className="text-gray-500 text-sm">وزن التربة</span>
                        <div className="text-left">
                            <span className="font-mono font-bold block text-gray-800">89.94 kg</span>
                            <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1 rounded inline-block">-0.06 kg فقط!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Conclusion Cards */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border-l-4 border-amber-400 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-100 rounded-full opacity-50 blur-xl"></div>
                <h4 className="font-bold text-lg mb-3 text-amber-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs">1</span>
                    ماذا استنتج هيلمونت؟
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    بما أن وزن التربة لم ينقص تقريباً (فقط بضعة جرامات)، استنتج أن الشجرة لم تتغذَ على التربة كما كان سائداً، بل نمت واكتسبت كتلتها الهائلة من <span className="font-bold text-blue-600 bg-blue-50 px-1 rounded">الماء</span> الذي كان يضيفه بانتظام.
                </p>
            </div>
            
            <div className="bg-leaf-50 p-6 rounded-2xl border-l-4 border-leaf-500 shadow-sm relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-leaf-200 rounded-full opacity-50 blur-xl"></div>
                 <h4 className="font-bold text-lg mb-3 text-leaf-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-leaf-200 flex items-center justify-center text-xs">2</span>
                    الحقيقة العلمية اليوم
                </h4>
                 <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    هيلمونت كان محقاً جزئياً (التربة ليست الغذاء الرئيسي)، لكنه لم يعرف عن <span className="font-bold text-gray-800 bg-gray-200 px-1 rounded">ثاني أكسيد الكربون</span>! اليوم نعرف أن الكربون من الهواء هو المكون الأساسي لجسم النبات، وليس الماء فقط.
                 </p>
            </div>
        </div>

      </div>
    </section>
  );
};