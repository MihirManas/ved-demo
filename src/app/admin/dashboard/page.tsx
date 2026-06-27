"use client";

import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Target, Activity, MapPin, Map, BrainCircuit } from 'lucide-react';

type Timeframe = 'realtime' | 'daily' | 'monthly' | 'yearly' | 'all';

interface StatsData {
  totalVisits: number;
  applications: number;
  topCities: { city: string; count: number }[];
  topStates: { state: string; count: number }[];
  tiers: { tier: string; count: number }[];
}

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>('daily');
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/stats?timeframe=${timeframe}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (e) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Poll every 10 seconds if realtime
    let interval: NodeJS.Timeout;
    if (timeframe === 'realtime') {
      interval = setInterval(fetchStats, 10000);
    }
    return () => clearInterval(interval);
  }, [timeframe]);

  const tabs: { id: Timeframe; label: string }[] = [
    { id: 'realtime', label: 'Real-Time (1H)' },
    { id: 'daily', label: 'Daily' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8 relative">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white mb-2 flex items-center gap-3">
              <Activity className="text-[#E6C875]" /> Ved Intelligence Engine
            </h1>
            <p className="text-white/50 text-sm">Proprietary analytics and geotracking system.</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  timeframe === tab.id 
                    ? 'bg-[#E6C875] text-black shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#E6C875] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white/50 mb-4">
                  <Users size={20} />
                  <h3 className="text-sm font-medium uppercase tracking-wider">Total Unique Views</h3>
                </div>
                <p className="text-5xl font-light text-white">{data.totalVisits.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white/50 mb-4">
                  <Target size={20} />
                  <h3 className="text-sm font-medium uppercase tracking-wider">Applications</h3>
                </div>
                <p className="text-5xl font-light text-[#E6C875]">{data.applications.toLocaleString()}</p>
              </div>
              <div className="bg-[#E6C875]/10 border border-[#E6C875]/30 p-6 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 text-[#E6C875] mb-4">
                  <BarChart3 size={20} />
                  <h3 className="text-sm font-medium uppercase tracking-wider">Conversion Rate</h3>
                </div>
                <p className="text-5xl font-light text-white">
                  {data.totalVisits > 0 ? ((data.applications / data.totalVisits) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>

            {/* AI Insight Slab (Monthly Tab Only) */}
            {timeframe === 'monthly' && (
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-8 rounded-3xl backdrop-blur-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                    <BrainCircuit className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Algorithmic Insight Engine</h3>
                    <p className="text-blue-100/80 leading-relaxed max-w-4xl">
                      Based on the monthly traffic map, Tier 2/3 cities are generating <strong>{
                        data.tiers.find(t => t.tier.includes('2')) ? 
                        ((data.tiers.find(t => t.tier.includes('2'))!.count / data.totalVisits) * 100).toFixed(1) : '0'
                      }%</strong> of all incoming traffic, with heavy concentration in {data.topStates[0]?.state || 'unknown regions'}. 
                      <br /><br />
                      <strong>Recommendation:</strong> Increase targeted ad spend focusing on the Full Stack program in {data.topCities[1]?.city || 'Tier 2 hubs'}, as cost-per-click is lower there while intent remains highly concentrated.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* City Breakdown */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 text-white mb-6">
                  <MapPin size={20} className="text-[#E6C875]" />
                  <h3 className="text-lg font-medium">Top Geolocation (Cities)</h3>
                </div>
                <div className="space-y-4">
                  {data.topCities.map((city, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2 text-white/70">
                        <span>{city.city}</span>
                        <span>{city.count}</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-2">
                        <div 
                          className="bg-[#E6C875] h-2 rounded-full" 
                          style={{ width: `${(city.count / data.topCities[0].count) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Breakdown */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 text-white mb-6">
                  <Map size={20} className="text-[#E6C875]" />
                  <h3 className="text-lg font-medium">State Distribution</h3>
                </div>
                <div className="space-y-4">
                  {data.topStates.map((state, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2 text-white/70">
                        <span>{state.state}</span>
                        <span>{state.count}</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-2">
                        <div 
                          className="bg-white/70 h-2 rounded-full" 
                          style={{ width: `${(state.count / data.topStates[0].count) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="text-center text-white/50 py-20">No data available for this timeframe.</div>
        )}
      </div>
    </div>
  );
}
