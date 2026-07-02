"use client";

import { useTheme } from 'next-themes';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

export default function DailyLeadsChart({ data }: { data: { date: string, count: number }[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date for display
  const formattedData = data.map(item => {
    const d = new Date(item.date);
    return {
      ...item,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  if (!mounted) return <div className="h-[300px] w-full" />;

  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? '#333' : '#e5e7eb';
  const axisColor = isDark ? '#666' : '#9ca3af';
  const tickColor = isDark ? '#888' : '#6b7280';
  const tooltipBg = isDark ? '#111' : '#fff';
  const tooltipBorder = isDark ? '#333' : '#e5e7eb';
  const tooltipText = isDark ? '#fff' : '#111';

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E6C875" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#E6C875" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="displayDate" 
            stroke={axisColor} 
            tick={{fill: tickColor, fontSize: 12}} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke={axisColor} 
            tick={{fill: tickColor, fontSize: 12}} 
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText }}
            itemStyle={{ color: '#E6C875' }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#E6C875" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
