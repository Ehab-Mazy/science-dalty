import React from 'react';
import { Sprout, Rabbit, Bird, Recycle } from 'lucide-react';

export interface TrophicLevel {
  id: string;
  name: string;
  role: string;
  energy: string;
  description: string;
  icon: React.ElementType; // Changed to ElementType to pass component reference
  color: string;
  bgGradient: string;
  width: string; // Used for pyramid visualization
}

export const levels: TrophicLevel[] = [
  {
    id: 'decomposer',
    name: 'المحللات',
    role: 'إعادة التدوير',
    energy: 'إعادة تدوير',
    description: 'مثل الفطريات والبكتيريا. تقوم بتحليل الكائنات الميتة من جميع المستويات وإعادة العناصر الغذائية للتربة ليستفيد منها النبات مجدداً.',
    icon: Recycle,
    color: 'text-gray-600',
    bgGradient: 'from-gray-100 to-gray-200',
    width: 'w-full md:w-1/4' // Side block
  },
  {
    id: 'secondary',
    name: 'مستهلك ثانوي (آكل لحوم)',
    role: 'قمة الهرم',
    energy: '1% فقط',
    description: 'حيوانات مفترسة تتغذى على آكلات الأعشاب. تصلها كمية ضئيلة جداً من طاقة الشمس الأصلية (حوالي 1% فقط).',
    icon: Bird,
    color: 'text-red-600',
    bgGradient: 'from-red-100 to-red-200',
    width: 'w-[40%]'
  },
  {
    id: 'primary',
    name: 'مستهلك أول (آكل عشب)',
    role: 'المستهلكات',
    energy: '10%',
    description: 'حيوانات تتغذى مباشرة على النباتات. تحصل على 10% فقط من الطاقة المخزنة في النبات، والباقي يضيع كحرارة وحركة.',
    icon: Rabbit,
    color: 'text-yellow-700',
    bgGradient: 'from-yellow-100 to-yellow-200',
    width: 'w-[70%]'
  },
  {
    id: 'producer',
    name: 'المنتجات (النباتات)',
    role: 'قاعدة الهرم',
    energy: '100%',
    description: 'أساس الحياة. الكائنات الوحيدة التي تصنع غذائها بنفسها (البناء الضوئي). تحتوي على أكبر قدر من الطاقة.',
    icon: Sprout,
    color: 'text-green-700',
    bgGradient: 'from-green-100 to-green-200',
    width: 'w-full'
  }
];