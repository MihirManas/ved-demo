"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/admin/actions";
import { LogOut, Activity, Users, MapPin, BarChart3, Loader2 } from "lucide-react";
import TrafficSourcesChart from "./TrafficSourcesChart";
import CityCategoriesChart from "./CityCategoriesChart";
import DailyLeadsChart from "./DailyLeadsChart";
import IndiaMapWidget from "./IndiaMapWidget";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-12 h-12 text-[#E6C875] animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-red-400">Failed to load dashboard data. Ensure the database is initialized.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-[#E6C875]/30">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            Analytics Overview
          </h1>
          <p className="text-neutral-400 mt-1">Real-time traffic and lead intelligence.</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors text-sm text-neutral-300"
        >
          <LogOut className="w-4 h-4" />
          Secure Logout
        </button>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Visits" value={stats.totalVisits.toLocaleString()} icon={<Users />} color="text-blue-400" />
        <StatCard title="Avg. Daily Leads" value={Math.round(stats.dailyLeads.reduce((a, b) => a + b.count, 0) / Math.max(stats.dailyLeads.length, 1)).toString()} icon={<Activity />} color="text-green-400" />
        <StatCard title="Top Source" value={stats.sources.sort((a,b)=>b.value-a.value)[0]?.name || 'N/A'} icon={<BarChart3 />} color="text-purple-400" />
        <StatCard title="Top State" value={stats.states.sort((a,b)=>b.value-a.value)[0]?.name || 'N/A'} icon={<MapPin />} color="text-orange-400" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Charts) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-6">Daily Leads Generation</h2>
            <DailyLeadsChart data={stats.dailyLeads} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-semibold mb-6">Traffic Sources</h2>
              <TrafficSourcesChart data={stats.sources} />
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-semibold mb-6">City Categories</h2>
              <CityCategoriesChart data={stats.cityCategories} />
            </div>
          </div>
        </div>

        {/* Right Column (Map) */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-xl h-full min-h-[500px]">
            <h2 className="text-lg font-semibold mb-2">Traffic by State (India)</h2>
            <p className="text-neutral-500 text-sm mb-6">Hover over states to see visit distribution.</p>
            <IndiaMapWidget data={stats.states} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 flex items-center justify-between group hover:bg-neutral-800/50 transition-colors">
      <div>
        <p className="text-neutral-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <div className={`p-4 bg-neutral-950 rounded-2xl ${color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  )
}
