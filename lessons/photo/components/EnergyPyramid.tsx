import React from 'react';
import { Recycle } from 'lucide-react';
import { levels } from './foodChainData';

interface EnergyPyramidProps {
  activeLevel: string;
  onSelectLevel: (id: string) => void;
}

export const EnergyPyramid: React.FC<EnergyPyramidProps> = ({ activeLevel, onSelectLevel }) => {
  // Separate decomposers from the pyramid stack
  const pyramidLevels = levels.filter(l => l.id !== 'decomposer');
  const decomposer = levels.find(l => l.id === 'decomposer');

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full h-full justify-center py-8">
      
      {/* The Pyramid Stack */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md">
        {pyramidLevels.map((level) => {
          const isActive = activeLevel === level.id;
          const Icon = level.icon;
          
          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={`
                relative h-20 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group
                ${level.width}
                ${isActive ? 'shadow-lg scale-105 ring-4 ring-white ring-opacity-60' : 'hover:scale-102 opacity-80 hover:opacity-100'}
                bg-gradient-to-r ${level.bgGradient}
              `}
            >
              <div className={`p-2 rounded-full bg-white/40 backdrop-blur-sm ${level.color}`}>
                <Icon size={24} />
              </div>
              <div className="flex flex-col items-start">
                <span className={`font-bold text-sm md:text-base ${level.color}`}>{level.name}</span>
                <span className="text-xs font-mono opacity-70">{level.energy} طاقة</span>
              </div>
              
              {isActive && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 transform"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Side Block: Decomposer (The recycler) */}
      {decomposer && (
        <div className="md:h-64 md:w-1 w-full h-1 bg-dashed border-r-2 border-gray-300 border-dashed relative flex items-center justify-center">
            {/* Visual connector lines could go here */}
            <button
              onClick={() => onSelectLevel(decomposer.id)}
              className={`
                md:absolute md:left-8 relative
                w-full md:w-32 h-20 md:h-auto md:aspect-square 
                rounded-2xl transition-all duration-300
                flex flex-col items-center justify-center gap-2
                bg-gradient-to-br ${decomposer.bgGradient}
                ${activeLevel === decomposer.id ? 'shadow-xl ring-4 ring-gray-100 scale-105' : 'hover:scale-105 opacity-80 hover:opacity-100'}
              `}
            >
              <Recycle className="text-gray-600 w-8 h-8 animate-spin-slow" />
              <span className="text-xs font-bold text-gray-700">المحللات</span>
              <span className="text-[10px] text-gray-500 text-center px-2">تدوير المغذيات</span>
            </button>
        </div>
      )}
    </div>
  );
};