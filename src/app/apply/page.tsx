"use client";

import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { domainsData } from '@/constants/domainsData';

// ─── Constants ───
const stepLabels = ["Identity", "Academics", "Language", "Architecture", "Program", "Intel"];
const qualifications = ["B.Tech / B.E", "BCA / MCA", "B.Sc / M.Sc", "Diploma", "Working Professional", "Other"];
const degreeDurations = ["3 Years", "4 Years", "5+ Years"];
const academicStatuses = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduated"];
const departments = ["Computer Science / IT", "Electronics (ECE/EEE)", "Mechanical / Automobile", "Civil / Structural", "Other"];
const languages = ["English", "Hindi", "Kannada", "Telugu", "Tamil", "Malayalam", "Marathi", "Bengali"];

const programTiers = [
  {
    id: "tier1",
    title: "Certification Track",
    subtitle: "Core Architecture",
    stores: "certification",
    features: ["Live Technical Sessions", "Architectural Blueprints", "Cryptographic Certificate"]
  },
  {
    id: "tier2",
    title: "Internship Track",
    subtitle: "Real-World Execution",
    stores: "internship",
    features: ["Everything in Certification", "Live Industry Projects", "Experience Letter"]
  },
  {
    id: "tier3",
    title: "Placement Track",
    subtitle: "Full Career Acceleration",
    stores: "placement",
    features: ["Everything in Internship", "1-on-1 Mentorship", "Direct Recruiter Visibility", "Interview Engineering"]
  }
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  collegeName: '',
  crNumber: '',
  qualification: '',
  duration: '',
  academicStatus: '',
  department: '',
  languages: [],
  domainCategory: '',
  domainCourse: '',
  program: '',
  careerGoals: ''
};

// ─── Validation ───
const validateStep = (step: number, data: any) => {
  const errors: any = {};
  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = "Full Name is required";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Valid Email is required";
    if (!data.phone.trim() || data.phone.length < 10) errors.phone = "Valid 10-digit Phone is required";
  }
  if (step === 1) {
    if (!data.collegeName.trim()) errors.collegeName = "College Name is required";
    if (!data.qualification) errors.qualification = "Qualification is required";
    if (!data.duration) errors.duration = "Duration is required";
    if (!data.academicStatus) errors.academicStatus = "Academic Status is required";
    if (!data.department) errors.department = "Department is required";
  }
  if (step === 2) {
    if (data.languages.length === 0) errors.languages = "Select at least one language";
  }
  if (step === 3) {
    if (!data.domainCategory) errors.domainCategory = "Please select a domain category";
    if (!data.domainCourse) errors.domainCourse = "Please select a specific architecture/course";
  }
  if (step === 4) {
    if (!data.program) errors.program = "Please select a program track";
  }
  return errors;
};

// ─── Hyper-Premium Glassmorphic Styles ───
const inputBase = "w-full bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[1.5rem] px-6 py-5 focus:outline-none focus:border-[#E6C875] focus:bg-white dark:focus:bg-black/80 transition-all duration-500 font-light placeholder:text-gray-400 dark:placeholder:text-white/30 hover:border-[#E6C875]/50 hover:bg-white dark:hover:bg-white/[0.05] shadow-inner dark:shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)]";
const selectBase = "w-full bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[1.5rem] px-6 py-5 focus:outline-none focus:border-[#E6C875] focus:bg-white dark:focus:bg-black/80 transition-all duration-500 appearance-none font-light hover:border-[#E6C875]/50 hover:bg-white dark:hover:bg-white/[0.05] shadow-inner dark:shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] cursor-pointer";
const errorText = "text-red-400 text-sm mt-3 font-medium tracking-wide flex items-center";

// ─── Step Progress Indicator ───
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="mb-16">
    <div className="flex items-center justify-between mb-6">
      {stepLabels.map((label, i) => (
        <div key={i} className="flex flex-col items-center flex-1 relative z-10">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-700 ease-out border backdrop-blur-md ${
            i < currentStep ? 'bg-[#E6C875] text-black border-[#E6C875] scale-90' :
            i === currentStep ? 'bg-[#E6C875] text-black border-[#E6C875] scale-110 shadow-[0_0_30px_rgba(230,200,117,0.5)]' :
            'bg-white/50 dark:bg-white/5 text-gray-400 dark:text-white/30 border-gray-200 dark:border-white/10'
          }`}>
            {i < currentStep ? <CheckCircle size={20} /> : i + 1}
          </div>
          <span className={`text-[10px] sm:text-[11px] mt-4 tracking-widest uppercase transition-colors duration-500 hidden sm:block font-bold ${
            i === currentStep ? 'text-[#E6C875]' :
            i < currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/30'
          }`}>{label}</span>
        </div>
      ))}
    </div>
    <div className="w-full bg-gray-200/50 dark:bg-white/10 h-[3px] rounded-full overflow-hidden relative z-0 -mt-10 sm:-mt-14 max-w-[85%] mx-auto">
      <div
        className="h-full bg-gradient-to-r from-[#E6C875] to-[#E6C875]/80 rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_#E6C875]"
        style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
      />
    </div>
    <div className="h-10 sm:h-14"></div>
  </div>
);

// ─── Main Component ───
const TOTAL_STEPS = 6;

export default function ApplyView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const coursesList = Object.values(domainsData);
  const categories = Array.from(new Set(coursesList.map(c => c.category)));

  const setField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Transmission failed. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    const current = formData.languages;
    if (current.includes(lang as never)) {
      setField('languages', current.filter(l => l !== lang));
    } else {
      setField('languages', [...current, lang]);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out relative">
      
      {/* Dynamic Background Elements for Hyper-Aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E6C875]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {!isSuccess ? (
          <>
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 text-[#E6C875] text-xs font-bold uppercase tracking-[0.2em] mb-8">
                  <Sparkles size={14} className="mr-2" /> Evaluation Portal
                </div>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                  Start Your Verification Track.
                </h1>
                <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                  Admission is highly selective. We exclusively engineer talent ready for immense industry scale.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white/80 dark:bg-black/40 border border-gray-200 dark:border-white/[0.08] rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-14 md:p-20 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
                
                {/* Inner Glow border effect */}
                <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[3rem] sm:rounded-[4rem] pointer-events-none"></div>

                <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                <div className="min-h-[350px] relative z-10" key={currentStep}>
                  <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
                    
                    {/* Step 1: Personal Info */}
                    {currentStep === 0 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">01. Identity Matrix</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <input type="text" placeholder="Full Legal Name *" value={formData.fullName} onChange={e => setField('fullName', e.target.value)} className={`${inputBase} ${errors.fullName ? '!border-red-500/50 !bg-red-500/5' : ''}`} />
                            {errors.fullName && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.fullName}</p>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <input type="email" placeholder="Primary Email *" value={formData.email} onChange={e => setField('email', e.target.value)} className={`${inputBase} ${errors.email ? '!border-red-500/50 !bg-red-500/5' : ''}`} />
                              {errors.email && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.email}</p>}
                            </div>
                            <div>
                              <input type="tel" placeholder="Mobile Number *" value={formData.phone} onChange={e => setField('phone', e.target.value)} className={`${inputBase} ${errors.phone ? '!border-red-500/50 !bg-red-500/5' : ''}`} />
                              {errors.phone && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.phone}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Academics */}
                    {currentStep === 1 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">02. Academic Profile</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">College / University Name *</label>
                            <input type="text" placeholder="Enter full college or university name" value={formData.collegeName} onChange={e => setField('collegeName', e.target.value)} className={`${inputBase} ${errors.collegeName ? '!border-red-500/50 !bg-red-500/5' : ''}`} />
                            {errors.collegeName && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.collegeName}</p>}
                          </div>
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">Class Representative Number</label>
                            <input type="text" placeholder="CR Number (Optional)" value={formData.crNumber} onChange={e => setField('crNumber', e.target.value)} className={`${inputBase}`} />
                          </div>
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">Highest Qualification *</label>
                            <select value={formData.qualification} onChange={e => setField('qualification', e.target.value)} className={`${selectBase} ${errors.qualification ? '!border-red-500/50 !bg-red-500/5' : ''}`}>
                              <option value="">Select Qualification...</option>
                              {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                            {errors.qualification && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.qualification}</p>}
                          </div>
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">Degree Duration *</label>
                            <select value={formData.duration} onChange={e => setField('duration', e.target.value)} className={`${selectBase} ${errors.duration ? '!border-red-500/50 !bg-red-500/5' : ''}`}>
                              <option value="">Select Duration...</option>
                              {degreeDurations.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            {errors.duration && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.duration}</p>}
                          </div>
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">Current Status *</label>
                            <select value={formData.academicStatus} onChange={e => setField('academicStatus', e.target.value)} className={`${selectBase} ${errors.academicStatus ? '!border-red-500/50 !bg-red-500/5' : ''}`}>
                              <option value="">Select Status...</option>
                              {academicStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.academicStatus && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.academicStatus}</p>}
                          </div>
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">Department / Branch *</label>
                            <select value={formData.department} onChange={e => setField('department', e.target.value)} className={`${selectBase} ${errors.department ? '!border-red-500/50 !bg-red-500/5' : ''}`}>
                              <option value="">Select Department...</option>
                              {departments.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            {errors.department && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.department}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Languages */}
                    {currentStep === 2 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">03. Communication Vector</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        <p className="text-gray-600 dark:text-white/60 text-lg font-light mb-8">Select all languages you are comfortable communicating in. We provide specialized guidance based on native tongue superiority.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {languages.map(lang => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => toggleLanguage(lang)}
                              className={`px-6 py-4 rounded-[1.5rem] text-sm font-bold tracking-wider uppercase border transition-all duration-500 ease-out ${
                                formData.languages.includes(lang as never)
                                  ? 'bg-[#E6C875] border-[#E6C875] text-black shadow-[0_0_20px_rgba(230,200,117,0.3)] scale-105'
                                  : 'bg-white/50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-[#E6C875]/50 hover:text-[#E6C875] hover:bg-white dark:hover:bg-white/[0.05]'
                              }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                        {errors.languages && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.languages}</p>}
                      </div>
                    )}

                    {/* Step 4: Architecture Selection */}
                    {currentStep === 3 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">04. Target Architecture</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        
                        <div className="space-y-8">
                          <div>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">1. Primary Domain Category *</label>
                            <select 
                              value={formData.domainCategory}
                              onChange={(e) => {
                                setField('domainCategory', e.target.value);
                                setField('domainCourse', '');
                              }}
                              className={`${selectBase} ${errors.domainCategory ? '!border-red-500/50 !bg-red-500/5' : ''}`}
                            >
                              <option value="">Select Domain Category...</option>
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            {errors.domainCategory && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.domainCategory}</p>}
                          </div>

                          <div className={`transition-all duration-700 ${formData.domainCategory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                            <label className="block text-gray-900 dark:text-white text-xs mb-3 tracking-[0.1em] font-bold uppercase ml-4">2. Specific Execution Program *</label>
                            <select 
                              value={formData.domainCourse}
                              onChange={(e) => setField('domainCourse', e.target.value)}
                              disabled={!formData.domainCategory}
                              className={`${selectBase} ${errors.domainCourse ? '!border-red-500/50 !bg-red-500/5' : ''}`}
                            >
                              <option value="">Select Specific Program...</option>
                              {formData.domainCategory && coursesList.filter(c => c.category === formData.domainCategory).map(course => (
                                <option key={course.id} value={course.title}>{course.title}</option>
                              ))}
                            </select>
                            {errors.domainCourse && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.domainCourse}</p>}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Step 5: Program Goal */}
                    {currentStep === 4 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">05. Execution Protocol</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {programTiers.map((tier, idx) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => setField('program', tier.stores)}
                              className={`text-left p-8 rounded-[2rem] border transition-all duration-700 relative overflow-hidden group flex flex-col justify-between h-full ${
                                formData.program === tier.stores
                                  ? 'bg-gradient-to-br from-[#E6C875]/10 to-transparent border-[#E6C875] shadow-[0_0_40px_rgba(230,200,117,0.15)] scale-[1.02]'
                                  : 'bg-white/50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/40 hover:bg-white dark:hover:bg-white/[0.04]'
                              }`}
                            >
                              {idx === 2 && (
                                <div className="absolute top-0 right-0 bg-[#E6C875] text-black text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                                  Highest ROI
                                </div>
                              )}
                              <div>
                                <h4 className={`text-2xl font-medium tracking-tight mb-2 transition-colors ${
                                  formData.program === tier.stores ? 'text-[#E6C875]' : 'text-gray-900 dark:text-white'
                                }`}>{tier.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-white/40 mb-8 tracking-[0.2em] uppercase font-bold">{tier.subtitle}</p>
                                <ul className="space-y-4">
                                  {tier.features.map((feat, fi) => (
                                    <li key={fi} className="flex items-start gap-3 text-sm text-gray-700 dark:text-white/70 font-light">
                                      <CheckCircle size={16} className={`mt-0.5 shrink-0 transition-colors ${formData.program === tier.stores ? 'text-[#E6C875]' : 'text-gray-300 dark:text-white/20'}`} />
                                      {feat}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </button>
                          ))}
                        </div>
                        {errors.program && <p className={errorText}><AlertCircle size={14} className="mr-2"/> {errors.program}</p>}
                      </div>
                    )}

                    {/* Step 6: Additional Info */}
                    {currentStep === 5 && (
                      <div className="space-y-10">
                        <div className="mb-8">
                          <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.25em] font-bold mb-2">06. Intelligence Brief</h3>
                          <div className="h-[1px] w-12 bg-[#E6C875]"></div>
                        </div>
                        <p className="text-gray-600 dark:text-white/60 text-lg font-light mb-6">Detail your ultimate career aspirations. This data allows our mentors to architect your personalized placement strategy. (Optional)</p>
                        <textarea
                          rows={6}
                          placeholder="e.g., Target companies, current roadblocks, expected salary bump..."
                          value={formData.careerGoals}
                          onChange={e => setField('careerGoals', e.target.value)}
                          className={`${inputBase} resize-none`}
                        />
                      </div>
                    )}

                  </div>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-5 rounded-2xl mt-12 text-sm font-medium tracking-wide">
                    <AlertCircle size={18} className="shrink-0" />
                    {submitError}
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 dark:border-white/10 relative z-20">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-[#E6C875] transition-colors duration-300 uppercase tracking-widest text-sm font-bold group"
                    >
                      <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                  ) : <div />}

                  {currentStep < TOTAL_STEPS - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-sm rounded-full px-10 py-5 flex items-center gap-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      Continue Phase <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-[#E6C875] text-black font-bold uppercase tracking-widest text-sm rounded-full px-10 py-5 flex items-center gap-3 hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(230,200,117,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Transmitting Protocol...
                        </>
                      ) : (
                        <>
                          Initialize Sequence <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </ScrollReveal>
          </>
        ) : (
          <ScrollReveal>
            <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-12 sm:p-20 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
              <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[4rem] pointer-events-none"></div>
              
              <div className="w-32 h-32 mx-auto mb-10 rounded-full bg-gradient-to-br from-[#E6C875]/20 to-transparent border border-[#E6C875]/40 flex items-center justify-center animate-in zoom-in duration-700 shadow-[0_0_50px_rgba(230,200,117,0.2)]">
                <CheckCircle size={56} className="text-[#E6C875]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">Transmission Secured.</h2>
              <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Your credentials have been securely routed to our admissions team. 
                Based on your selected communication vector, an execution engineer will initiate contact.
              </p>
              
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6C875] animate-pulse shadow-[0_0_10px_#E6C875]" />
                <span className="text-gray-900 dark:text-white text-sm font-bold uppercase tracking-widest">SLA: 24–48 Hours</span>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
