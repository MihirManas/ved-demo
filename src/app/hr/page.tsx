"use client";

import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, MapPin, IndianRupee, Briefcase, FileText, User, Mail, Phone, ExternalLink, ChevronDown, ChevronUp, Github, Linkedin } from 'lucide-react';
import ScrollReveal from "@/components/ScrollReveal";

interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  resumeLink: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  createdAt: string;
}

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
  applications?: Application[];
}

export default function HRPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [salary, setSalary] = useState('');
  const [requiresGithub, setRequiresGithub] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobsAndApplications();
    }
  }, [isAuthenticated]);

  const fetchJobsAndApplications = async () => {
    try {
      // Fetch Jobs
      const jobsRes = await fetch('/api/jobs');
      const jobsData = await jobsRes.json();
      
      // Fetch Applications
      const appRes = await fetch(`/api/applications?password=${encodeURIComponent(password)}`);
      const appData = await appRes.json();
      
      if (jobsData.jobs) {
        const jobsWithApps = jobsData.jobs.map((job: Job) => {
          return {
            ...job,
            applications: appData.applications?.filter((app: Application) => app.jobId === job.id) || []
          };
        });
        setJobs(jobsWithApps);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
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
      // Modify the POST payload to include requiresGithub, but we also need to update the API for this
      // Wait, in our /api/jobs/route.ts, we need to make sure requiresGithub is accepted.
      // We will send it anyway, if Prisma schema has it, the route might need an update.
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, location, type, salary, password, requiresGithub
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
      setRequiresGithub(false);
      fetchJobsAndApplications();
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
    if (!confirm('Are you sure you want to delete this job and all its applications?')) return;
    
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

      fetchJobsAndApplications();
    } catch (err: any) {
      alert(err.message);
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
    }
  };

  const toggleJobExpanded = (id: number) => {
    if (expandedJobId === id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(id);
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
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-4 py-3 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm uppercase tracking-widest font-bold text-black dark:text-black bg-[#E6C875] hover:bg-[#D4B55E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6C875] transition-all duration-300">
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
              <p className="text-sm text-gray-500 dark:text-white/50 mt-1">Manage active job postings and applications</p>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="mt-4 md:mt-0 px-4 py-2 text-sm uppercase tracking-widest font-bold text-gray-600 dark:text-white/60 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-white/10 rounded-full hover:border-red-200 dark:hover:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10">
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
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Location</label>
                    <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote, Mumbai" className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors appearance-none">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Salary (Optional)</label>
                    <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. ₹5L - ₹8L" className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2 flex items-center">
                      <input type="checkbox" checked={requiresGithub} onChange={(e) => setRequiresGithub(e.target.checked)} className="mr-2 rounded border-gray-300 text-[#E6C875] focus:ring-[#E6C875] w-4 h-4" />
                      Require GitHub Profile Link
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Description</label>
                    <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E6C875] focus:border-[#E6C875] sm:text-sm text-gray-900 dark:text-white transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm uppercase tracking-widest font-bold text-black dark:text-black bg-[#E6C875] hover:bg-[#D4B55E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6C875] transition-all duration-300 disabled:opacity-50 mt-4">
                    {loading ? 'Posting...' : 'Publish Job'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Job List & Applications */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={200}>
              <h2 className="text-xl font-medium mb-6 text-gray-900 dark:text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                Active Roles & Applications
              </h2>
              <div className="space-y-6">
                {jobs.length === 0 ? (
                  <div className="p-12 text-center border border-dashed border-gray-300 dark:border-white/20 rounded-2xl">
                    <p className="text-gray-500 dark:text-white/50">No jobs posted yet. Your active roles will appear here.</p>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300">
                      {/* Job Header */}
                      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start group hover:bg-gray-50 dark:hover:bg-white/[0.01]">
                        <div className="flex-1 mb-6 sm:mb-0 cursor-pointer" onClick={() => toggleJobExpanded(job.id)}>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#E6C875] transition-colors">{job.title}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70">
                              {job.type}
                            </span>
                            {job.requiresGithub && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                GitHub Req
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-white/50 font-medium">
                            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                            {job.salary && <span className="flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-1" /> {job.salary}</span>}
                            <span className="flex items-center text-[#E6C875]">
                              <User className="w-3.5 h-3.5 mr-1" /> {job.applications?.length || 0} Applicants
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleJobExpanded(job.id)} className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            {expandedJobId === job.id ? <ChevronUp /> : <ChevronDown />}
                          </button>
                          <button onClick={() => handleDeleteJob(job.id)} className="p-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-900 transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Applications List */}
                      {expandedJobId === job.id && (
                        <div className="bg-gray-50 dark:bg-black/50 p-6 border-t border-gray-200 dark:border-white/10">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center">
                            Applications
                          </h4>
                          {(!job.applications || job.applications.length === 0) ? (
                            <p className="text-sm text-gray-500 dark:text-white/50 pb-4">No applications received yet.</p>
                          ) : (
                            <div className="space-y-4">
                              {job.applications.map(app => (
                                <div key={app.id} className="bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 p-5 rounded-xl">
                                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div>
                                      <h5 className="text-lg font-bold text-gray-900 dark:text-white">{app.name}</h5>
                                      <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600 dark:text-white/60">
                                        <a href={`mailto:${app.email}`} className="flex items-center hover:text-[#E6C875]"><Mail className="w-4 h-4 mr-2" /> {app.email}</a>
                                        <a href={`tel:${app.phone}`} className="flex items-center hover:text-[#E6C875]"><Phone className="w-4 h-4 mr-2" /> {app.phone}</a>
                                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {app.address}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 bg-[#E6C875]/10 text-[#E6C875] hover:bg-[#E6C875]/20 border border-[#E6C875]/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                                        <FileText className="w-3.5 h-3.5 mr-1.5" /> Resume
                                      </a>
                                      {app.linkedinUrl && (
                                        <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900/50 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                                          <Linkedin className="w-3.5 h-3.5 mr-1.5" /> LinkedIn
                                        </a>
                                      )}
                                      {app.githubUrl && (
                                        <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                                          <Github className="w-3.5 h-3.5 mr-1.5" /> GitHub
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
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
