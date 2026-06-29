"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DailyLeadsChart({ data }: { data: { date: string, count: number }[] }) {
  // Format date for display
  const formattedData = data.map(item => {
    const d = new Date(item.date);
    return {
      ...item,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

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
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="displayDate" 
            stroke="#666" 
            tick={{fill: '#888', fontSize: 12}} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#666" 
            tick={{fill: '#888', fontSize: 12}} 
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
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
