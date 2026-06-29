"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
  'Tier 1': '#3b82f6',
  'Tier 2': '#8b5cf6',
  'Tier 3': '#ec4899',
  'Other': '#64748b'
};

export default function CityCategoriesChart({ data }: { data: { name: string, value: number }[] }) {
  // Sort data so Tier 1 is first
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#aaa', fontSize: 13 }}
            width={70}
          />
          <Tooltip 
            cursor={{ fill: '#333', opacity: 0.4 }}
            contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24} animationDuration={1500}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS['Other']} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
