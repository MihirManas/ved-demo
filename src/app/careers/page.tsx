"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, IndianRupee, ChevronRight, Search } from 'lucide-react';
import ScrollReveal from "@/components/ScrollReveal";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (data.jobs) {
          setJobs(data.jobs);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse shadow-[0_0_10px_#E6C875]"></span>
              <span className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-[0.25em]">Join Our Mission</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-medium text-gray-900 dark:text-white tracking-tighter leading-[1.05] mb-6">
              Build the Future of <span className="text-[#E6C875]">Education</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto font-light">
              We are on a mission to bridge the gap between academic theory and industry execution. Join our elite team.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search by role, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] text-gray-900 dark:text-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none placeholder-gray-400 dark:placeholder-white/30"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6C875]"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Open Roles Currently</h3>
              <p className="text-gray-500 dark:text-white/50">Check back later or follow our social channels for updates on new opportunities.</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No matches found</h3>
              <p className="text-gray-500 dark:text-white/50">Try adjusting your search query.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="group relative bg-white dark:bg-white/[0.02] rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-[#E6C875]/50 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_30px_rgba(230,200,117,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E6C875]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  <div className="relative z-10 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#E6C875] transition-colors">{job.title}</h2>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white/80">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-white/50 mb-6 font-medium">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-[#E6C875]" />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1.5 text-[#E6C875]" />
                          {job.salary}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-white/70 line-clamp-3 text-sm leading-relaxed font-light">{job.description}</p>
                  </div>
                  
                  <div className="mt-auto relative z-10">
                    <div className="h-[1px] w-full bg-gray-100 dark:bg-white/10 mb-6" />
                    <Link 
                      href={`mailto:hr@vedupskilling.com?subject=Application for ${job.title}`}
                      className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors group/btn"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
