"use client";

import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, ArrowRight, Loader2, Target, Briefcase, GraduationCap } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Department, Program } from '@/lib/content';

// ─── Constants ───
const qualifications = ['10th Pass', '12th Pass', 'Diploma', 'BCA', 'BSc', 'BTech', 'BE', 'MCA', 'MSc', 'MTech', 'MBA', 'Other'];
const degreeDurations = ['2 Years', '3 Years', '4 Years', '5 Years'];
const academicStatuses = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Passed Out', 'Working Professional'];
const oldDepartments = ['Computer Science', 'Artificial Intelligence', 'Data Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Biotechnology', 'Commerce', 'Management', 'Other'];
const languages = ['English', 'Hindi', 'Odia', 'Bengali', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Punjabi', 'Assamese', 'Urdu', 'Sanskrit', 'Other'];
const programTiers = [
  { id: 'certification', title: 'Certification', subtitle: 'Foundation Track', features: ['Structured Training', 'Skill Development', 'Domain Curriculum', 'Certification'], stores: 'Certification' },
  { id: 'internship', title: 'Internship Track', subtitle: 'Includes Certification', features: ['Everything in Certification', 'Internship Projects', 'Industry Project Experience', 'Portfolio Development'], stores: 'Certification + Internship' },
  { id: 'placement', title: 'Placement Track', subtitle: 'Includes Certification + Internship', features: ['Everything in Internship', 'Placement Assistance', 'Interview Preparation', 'Recruiter Visibility', 'Hiring Support'], stores: 'Certification + Internship + Placement' }
];
const stepLabels = ['Personal Info', 'Education', 'Languages', 'Target Architecture', 'Program Goal', 'Additional Info'];
const TOTAL_STEPS = 6;

// ─── Reusable Styles ───
const inputBase = "w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E6C875]/50 focus:ring-1 focus:ring-[#E6C875]/20 transition-all duration-300 font-light placeholder:text-gray-400 dark:placeholder:text-white/30";
const selectBase = "w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light";
const errorText = "text-red-400 text-sm mt-2 font-light tracking-wide";

export default function ApplyForm({ departmentsData, programsData }: { departmentsData: Department[], programsData: Program[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', qualification: '', duration: '', academicStatus: '', department: '',
    languages: [] as string[], selectedCategory: '', selectedCourse: '', programTier: '', careerGoals: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const setField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleNext = () => {
    // Basic Validation (Add more as needed)
    const newErrors: Record<string, string> = {};
    if (currentStep === 0) {
      if (!formData.fullName) newErrors.fullName = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.phone) newErrors.phone = "Required";
    } else if (currentStep === 1) {
      if (!formData.qualification) newErrors.qualification = "Required";
      if (!formData.duration) newErrors.duration = "Required";
      if (!formData.academicStatus) newErrors.academicStatus = "Required";
      if (!formData.department) newErrors.department = "Required";
    } else if (currentStep === 3) {
      if (!formData.selectedCategory) newErrors.selectedCategory = "Please select a category";
      if (!formData.selectedCourse) newErrors.selectedCourse = "Please select a course";
    } else if (currentStep === 4) {
      if (!formData.programTier) newErrors.programTier = "Please select a program goal";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSuccess(true);
      // In production: submit data to backend here
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle size={48} className="text-[#E6C875]" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">Application Transmitted</h2>
        <p className="text-gray-600 dark:text-white/60 text-lg font-light leading-relaxed max-w-xl mx-auto mb-4">
          Our admissions team will review your information and contact you shortly.
        </p>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">01. Identity Matrix</h3>
            <div className="space-y-6">
              <div>
                <input type="text" placeholder="Full Name *" value={formData.fullName} onChange={e => setField('fullName', e.target.value)} className={inputBase} />
                {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setField('email', e.target.value)} className={inputBase} />
                  {errors.email && <p className={errorText}>{errors.email}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setField('phone', e.target.value)} className={inputBase} />
                  {errors.phone && <p className={errorText}>{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">02. Academic Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <select value={formData.qualification} onChange={e => setField('qualification', e.target.value)} className={selectBase}>
                  <option value="">Select Qualification *</option>
                  {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                {errors.qualification && <p className={errorText}>{errors.qualification}</p>}
              </div>
              <div>
                <select value={formData.duration} onChange={e => setField('duration', e.target.value)} className={selectBase}>
                  <option value="">Select Duration *</option>
                  {degreeDurations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.duration && <p className={errorText}>{errors.duration}</p>}
              </div>
              <div>
                <select value={formData.academicStatus} onChange={e => setField('academicStatus', e.target.value)} className={selectBase}>
                  <option value="">Current Academic Status *</option>
                  {academicStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.academicStatus && <p className={errorText}>{errors.academicStatus}</p>}
              </div>
              <div>
                <select value={formData.department} onChange={e => setField('department', e.target.value)} className={selectBase}>
                  <option value="">Department / Branch *</option>
                  {oldDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <p className={errorText}>{errors.department}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">03. Communication Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {languages.map(lang => (
                <button
                  key={lang} type="button"
                  onClick={() => {
                    const current = formData.languages;
                    setField('languages', current.includes(lang) ? current.filter(l => l !== lang) : [...current, lang]);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                    formData.languages.includes(lang) ? 'bg-[#E6C875]/10 border-[#E6C875]/40 text-[#E6C875]' : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">04. Target Architecture</h3>
            
            {!formData.selectedCategory ? (
              <>
                <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">Select a department first:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departmentsData.map(dept => (
                    <button
                      key={dept.id} type="button"
                      onClick={() => { setField('selectedCategory', dept.id); setField('selectedCourse', ''); }}
                      className="text-left p-6 rounded-2xl border transition-all bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/30 group"
                    >
                      <span className="text-gray-700 dark:text-white/70 font-medium group-hover:text-[#E6C875] transition-colors">{dept.title}</span>
                    </button>
                  ))}
                </div>
                {errors.selectedCategory && <p className={errorText}>{errors.selectedCategory}</p>}
              </>
            ) : (
              <>
                <button type="button" onClick={() => setField('selectedCategory', '')} className="text-[#E6C875] text-sm flex items-center gap-2 hover:underline mb-6">
                  <ChevronLeft size={16} /> Back to Departments
                </button>
                <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">Select a course in <strong>{departmentsData.find(d => d.id === formData.selectedCategory)?.title}</strong>:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {programsData.filter(p => p.department === formData.selectedCategory).map(prog => (
                    <button
                      key={prog.id} type="button"
                      onClick={() => setField('selectedCourse', prog.id)}
                      className={`text-left p-6 rounded-2xl border transition-all ${
                        formData.selectedCourse === prog.id ? 'bg-[#E6C875]/10 border-[#E6C875]/40 shadow-[0_0_25px_rgba(230,200,117,0.1)]' : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/30'
                      }`}
                    >
                      <span className={`text-sm font-medium ${formData.selectedCourse === prog.id ? 'text-[#E6C875]' : 'text-gray-700 dark:text-white/70'}`}>{prog.title}</span>
                    </button>
                  ))}
                </div>
                {errors.selectedCourse && <p className={errorText}>{errors.selectedCourse}</p>}
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">05. Program Goal</h3>
            <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">What level of support are you looking for?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programTiers.map((tier, idx) => (
                <button
                  key={tier.id} type="button"
                  onClick={() => setField('programTier', tier.stores)}
                  className={`text-left p-8 rounded-3xl border transition-all relative overflow-hidden group ${
                    formData.programTier === tier.stores ? 'bg-[#E6C875]/10 border-[#E6C875]/40 shadow-[0_0_30px_rgba(230,200,117,0.15)] scale-[1.02]' : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/20'
                  }`}
                >
                  {idx === 2 && <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] bg-[#E6C875] text-black px-3 py-1 rounded-full font-bold">Recommended</span>}
                  <h4 className={`text-xl font-medium mb-2 ${formData.programTier === tier.stores ? 'text-[#E6C875]' : 'text-gray-900 dark:text-white'}`}>{tier.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 mb-5 tracking-wide uppercase">{tier.subtitle}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/60 font-light">
                        <CheckCircle size={14} className={`mt-0.5 shrink-0 ${formData.programTier === tier.stores ? 'text-[#E6C875]' : 'text-gray-400 dark:text-white/30'}`} /> {feat}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
            {errors.programTier && <p className={errorText}>{errors.programTier}</p>}
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">06. Additional Info</h3>
            <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-4">What kind of role are you aiming for? (Optional)</p>
            <textarea
              rows={5} placeholder="Describe your career aspirations, dream companies, or any specific goals..."
              value={formData.careerGoals} onChange={e => setField('careerGoals', e.target.value)}
              className={`${inputBase} resize-none`}
            />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-2xl">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentStep ? 'bg-[#E6C875] text-black scale-90' :
                i === currentStep ? 'bg-[#E6C875] text-black scale-110 shadow-[0_0_20px_rgba(230,200,117,0.4)]' :
                'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/30'
              }`}>
                {i < currentStep ? <CheckCircle size={18} /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs mt-2 tracking-widest uppercase transition-colors hidden sm:block ${
                i <= currentStep ? 'text-[#E6C875]' : 'text-gray-400 dark:text-white/30'
              }`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E6C875] to-[#E6C875]/60 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[320px]">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
        <button
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
          }`}
        >
          <ChevronLeft size={18} /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#E6C875] dark:hover:bg-[#E6C875] text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {currentStep === TOTAL_STEPS - 1 ? 'Submit Application' : 'Continue'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
