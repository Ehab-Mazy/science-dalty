import React from 'react';
import { Leaf, Sun } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-leaf-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-leaf-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-leaf-600" />
            </div>
            <h1 className="text-2xl font-bold text-leaf-800 tracking-tight">
              عالم البناء الضوئي
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <div className="hidden md:flex items-center gap-1 text-sun-500">
              <Sun className="h-5 w-5 animate-pulse" />
              <span>مصدر الحياة</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};