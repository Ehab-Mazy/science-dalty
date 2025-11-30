import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import { PhotoSynthFactor } from '../types';

const data: PhotoSynthFactor[] = [
  { intensity: 0, rate: 0 },
  { intensity: 10, rate: 20 },
  { intensity: 20, rate: 45 },
  { intensity: 30, rate: 65 },
  { intensity: 40, rate: 80 },
  { intensity: 50, rate: 90 },
  { intensity: 60, rate: 95 },
  { intensity: 70, rate: 98 },
  { intensity: 80, rate: 100 },
  { intensity: 90, rate: 100 },
  { intensity: 100, rate: 100 },
];

export const FactorsChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-96 w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        تأثير شدة الضوء على معدل البناء الضوئي
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="intensity" 
            tick={{ fill: '#666' }}
            stroke="#ddd"
          >
             <Label value="شدة الضوء" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis 
            tick={{ fill: '#666' }}
            stroke="#ddd"
          >
             <Label value="معدل التفاعل" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            labelStyle={{ color: '#666' }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8 }}
            name="معدل البناء"
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-gray-500 mt-2">
        لاحظ ثبات المعدل عند مستويات الإضاءة العالية بسبب تشبع الكلوروفيل.
      </p>
    </div>
  );
};