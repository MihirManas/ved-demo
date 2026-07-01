"use client";

import { useState, useEffect } from 'react';
import { Briefcase, MapPin, IndianRupee, ChevronRight, Search, X } from 'lucide-react';
import ScrollReveal from "@/components/ScrollReveal";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string | null;
  requiresGithub: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    resumeLink: '',
    linkedinUrl: '',
    githubUrl: ''
  });

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

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setSubmitError("");
    setFormData({ name: '', email: '', phone: '', address: '', resumeLink: '', linkedinUrl: '', githubUrl: '' });
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?.id,
          ...formData
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
      }, 3000);
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
                    <button 
                      onClick={() => handleApplyClick(job)}
                      className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors group/btn"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-[#111] z-10 p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for {selectedJob.title}</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mt-1">{selectedJob.location} • {selectedJob.type}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h4>
                  <p className="text-gray-600 dark:text-white/60">Thank you for applying. Our HR team will review your details and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Email Address *</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Phone Number *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">City/Address *</label>
                      <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Resume Link (Google Drive, Dropbox, etc.) *</label>
                    <input required type="url" placeholder="https://..." value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                    <p className="mt-2 text-xs text-gray-500 dark:text-white/40">Please ensure the link is publicly accessible.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">LinkedIn URL (Optional)</label>
                    <input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>

                  {selectedJob.requiresGithub && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">GitHub URL *</label>
                      <input required type="url" placeholder="https://github.com/..." value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                      <p className="mt-2 text-xs text-[#E6C875]">This role requires a GitHub profile.</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex justify-end gap-4">
                    <button type="button" onClick={() => setSelectedJob(null)} className="px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="px-8 py-3 bg-[#E6C875] hover:bg-[#D4B55E] text-black rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-[#E6C875]/30 disabled:opacity-50 flex items-center">
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
