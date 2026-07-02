"use client";

import { useTheme } from 'next-themes';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#E6C875', '#a855f7', '#3b82f6', '#10b981', '#f43f5e', '#64748b'];

export default function TrafficSourcesChart({ data }: { data: { name: string, value: number }[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[250px] w-full" />;

  const isDark = resolvedTheme === 'dark';
  const tooltipBg = isDark ? '#111' : '#fff';
  const tooltipBorder = isDark ? '#333' : '#e5e7eb';
  const tooltipText = isDark ? '#fff' : '#111';
  const legendTextClass = isDark ? "text-neutral-300" : "text-gray-600";

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText }}
            itemStyle={{ color: tooltipText }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className={`${legendTextClass} text-sm`}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
