"use client";

import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, MapPin, IndianRupee, Briefcase } from 'lucide-react';
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

export default function HRPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      setError('');
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, location, type, salary, password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add job');
      }

      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setType('Full-time');
      setSalary('');
      fetchJobs();
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete job');
      }

      fetchJobs();
    } catch (err: any) {
      alert(err.message);
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] flex items-center justify-center backdrop-blur-md">
                <Lock className="w-6 h-6 text-[#E6C875]" />
              </div>
            </div>
            <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-white tracking-tight">HR Portal</h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-white/60 uppercase tracking-widest font-bold">Restricted Access</p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white dark:bg-white/[0.02] py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-none sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-white/10">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Master Password</label>
                  <div className="mt-1">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm uppercase tracking-widest font-bold text-black dark:text-black bg-[#E6C875] hover:bg-[#D4B55E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6C875] transition-all duration-300"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tight">HR Control Center</h1>
              <p className="text-sm text-gray-500 dark:text-white/50 mt-1">Manage active job postings for Ved Upskilling</p>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="mt-4 md:mt-0 px-4 py-2 text-sm uppercase tracking-widest font-bold text-gray-600 dark:text-white/60 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-white/10 rounded-full hover:border-red-200 dark:hover:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Secure Logout
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Job Form */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={100}>
              <div className="bg-gray-50 dark:bg-white/[0.02] p-8 rounded-2xl border border-gray-200 dark:border-white/10 h-fit">
                <h2 className="text-xl font-medium mb-6 text-gray-900 dark:text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-[#E6C875]" />
                  New Posting
                </h2>
                {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/50">{error}</div>}
                
                <form onSubmit={handleAddJob} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Job Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Location</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Remote, Mumbai"
                      className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors appearance-none"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Salary (Optional)</label>
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. ₹5L - ₹8L"
                      className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm uppercase tracking-widest font-bold text-black dark:text-black bg-[#E6C875] hover:bg-[#D4B55E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6C875] transition-all duration-300 disabled:opacity-50 mt-4"
                  >
                    {loading ? 'Posting...' : 'Publish Job'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={200}>
              <h2 className="text-xl font-medium mb-6 text-gray-900 dark:text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                Active Roles
              </h2>
              <div className="space-y-6">
                {jobs.length === 0 ? (
                  <div className="p-12 text-center border border-dashed border-gray-300 dark:border-white/20 rounded-2xl">
                    <p className="text-gray-500 dark:text-white/50">No jobs posted yet. Your active roles will appear here.</p>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start group hover:border-[#E6C875]/30 transition-all duration-300">
                      <div className="flex-1 mb-6 sm:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#E6C875] transition-colors">{job.title}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-white/50 mb-4 font-medium">
                          <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                          {job.salary && <span className="flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-1" /> {job.salary}</span>}
                        </div>
                        <p className="text-gray-600 dark:text-white/70 whitespace-pre-wrap text-sm leading-relaxed font-light">{job.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="sm:ml-8 px-4 py-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-900 text-sm font-bold uppercase tracking-widest transition-all duration-300 w-full sm:w-auto flex justify-center items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
