"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/admin/actions";
import { LogOut, Activity, Users, MapPin, BarChart3, Loader2, BookOpen, LineChart, GraduationCap, LayoutTemplate } from "lucide-react";
import TrafficSourcesChart from "./TrafficSourcesChart";
import CityCategoriesChart from "./CityCategoriesChart";
import DailyLeadsChart from "./DailyLeadsChart";
import IndiaMapWidget from "./IndiaMapWidget";
import CourseManager from "./CourseManager";
import MentorManager from "./MentorManager";
import ContentManager from "./ContentManager";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"analytics" | "courses" | "mentors" | "content">("mentors");
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black text-white p-4 md:p-8 font-sans selection:bg-[#E6C875]/30">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E6C875] blur-[100px] opacity-10 rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 w-full">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
              Admin Portal
            </h1>
            <p className="text-neutral-400 mt-2 text-sm font-medium tracking-wide uppercase">Manage your platform</p>
          </div>
          
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 overflow-x-auto">
            <button 
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'bg-white/10 text-white shadow-lg' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <LineChart className="w-4 h-4" />
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab("courses")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'courses' ? 'bg-[#E6C875]/20 text-[#E6C875] shadow-lg border border-[#E6C875]/30' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <BookOpen className="w-4 h-4" />
              Courses
            </button>
            <button 
              onClick={() => setActiveTab("mentors")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'mentors' ? 'bg-[#E6C875]/20 text-[#E6C875] shadow-lg border border-[#E6C875]/30' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <GraduationCap className="w-4 h-4" />
              Mentors
            </button>
            <button 
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'content' ? 'bg-[#E6C875]/20 text-[#E6C875] shadow-lg border border-[#E6C875]/30' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutTemplate className="w-4 h-4" />
              Site Content
            </button>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-sm font-medium text-neutral-300 hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] whitespace-nowrap"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      {activeTab === "courses" && (
        <div className="relative z-10">
          <CourseManager />
        </div>
      )}

      {activeTab === "mentors" && (
        <div className="relative z-10">
          <MentorManager />
        </div>
      )}

      {activeTab === "content" && (
        <div className="relative z-10">
          <ContentManager />
        </div>
      )}

      {activeTab === "analytics" && (
        <>
          {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
        <StatCard title="Total Visits" value={stats.totalVisits.toLocaleString()} icon={<Users />} color="text-blue-400" />
        <StatCard title="Avg. Daily Leads" value={Math.round(stats.dailyLeads.reduce((a, b) => a + b.count, 0) / Math.max(stats.dailyLeads.length, 1)).toString()} icon={<Activity />} color="text-green-400" />
        <StatCard title="Top Source" value={stats.sources.sort((a,b)=>b.value-a.value)[0]?.name || 'N/A'} icon={<BarChart3 />} color="text-purple-400" />
        <StatCard title="Top State" value={stats.states.sort((a,b)=>b.value-a.value)[0]?.name || 'N/A'} icon={<MapPin />} color="text-orange-400" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Left Column (Charts) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] hover:border-white/[0.08] transition-colors duration-500 rounded-3xl p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none"></div>
            <h2 className="text-xl font-bold mb-8 text-neutral-200">Daily Leads Generation</h2>
            <DailyLeadsChart data={stats.dailyLeads} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] hover:border-white/[0.08] transition-colors duration-500 rounded-3xl p-7 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/10 transition-colors duration-700 pointer-events-none"></div>
              <h2 className="text-xl font-bold mb-8 text-neutral-200">Traffic Sources</h2>
              <TrafficSourcesChart data={stats.sources} />
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] hover:border-white/[0.08] transition-colors duration-500 rounded-3xl p-7 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-[50px] translate-x-1/2 group-hover:bg-pink-500/10 transition-colors duration-700 pointer-events-none"></div>
              <h2 className="text-xl font-bold mb-8 text-neutral-200">City Categories</h2>
              <CityCategoriesChart data={stats.cityCategories} />
            </div>
          </div>
        </div>

        {/* Right Column (Map) */}
        <div className="lg:col-span-1">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] hover:border-white/[0.08] transition-colors duration-500 rounded-3xl p-7 shadow-2xl h-full min-h-[500px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[#E6C875]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:bg-[#E6C875]/10 transition-colors duration-700 pointer-events-none"></div>
            <h2 className="text-xl font-bold mb-2 text-neutral-200 relative z-10">Traffic by State (India)</h2>
            <p className="text-neutral-500 text-sm mb-8 font-medium relative z-10">Hover over states to see distribution.</p>
            <div className="relative z-10 h-[calc(100%-80px)]">
              <IndiaMapWidget data={stats.states} />
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-7 flex items-center justify-between group hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden shadow-xl">
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-colors duration-700 pointer-events-none"></div>
      <div className="relative z-10">
        <p className="text-neutral-400 text-sm font-semibold mb-2 uppercase tracking-wider">{title}</p>
        <p className="text-4xl font-extrabold tracking-tight text-white">{value}</p>
      </div>
      <div className={`relative z-10 p-4 bg-black/40 rounded-2xl ${color} border border-white/[0.05] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
        {icon}
      </div>
    </div>
  )
}
