import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import {
  qualifications, degreeDurations, academicStatuses, departments,
  languages, careerDomains, programTiers, stepLabels
} from '../constants/formData';
import { validateStep, calculateLeadScore, initialFormData } from '../utils/formUtils';
import { submitApplication } from '../services/api';

// ─── Reusable Input Classes ───
const inputBase = "w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 sm:px-6 sm:py-5 focus:outline-none focus:border-[#E6C875]/50 focus:ring-1 focus:ring-[#E6C875]/20 transition-all duration-300 font-light placeholder:text-gray-400 dark:placeholder:text-white/30";
const selectBase = "w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-5 py-4 sm:px-6 sm:py-5 focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light";
const errorText = "text-red-400 text-sm mt-2 font-light tracking-wide";

// ─── Step Progress Indicator ───
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="mb-16">
    <div className="flex items-center justify-between mb-4">
      {stepLabels.map((label, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
            i < currentStep ? 'bg-[#E6C875] text-black scale-90' :
            i === currentStep ? 'bg-[#E6C875] text-black scale-110 shadow-[0_0_20px_rgba(230,200,117,0.4)]' :
            'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/30'
          }`}>
            {i < currentStep ? <CheckCircle size={18} /> : i + 1}
          </div>
          <span className={`text-[10px] sm:text-xs mt-2 tracking-widest uppercase transition-colors duration-500 hidden sm:block ${
            i <= currentStep ? 'text-[#E6C875]' : 'text-gray-400 dark:text-white/30'
          }`}>{label}</span>
        </div>
      ))}
    </div>
    <div className="w-full bg-gray-200 dark:bg-white/10 h-[2px] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#E6C875] to-[#E6C875]/60 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
      />
    </div>
  </div>
);

// ─── Step 1: Personal Info ───
const PersonalInfoStep = ({ formData, setField, errors }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">01. Identity Matrix</h3>
      <div className="space-y-6">
        <div>
          <input type="text" placeholder="Full Name *" value={formData.fullName} onChange={e => setField('fullName', e.target.value)} className={`${inputBase} ${errors.fullName ? '!border-red-400/50' : ''}`} />
          {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setField('email', e.target.value)} className={`${inputBase} ${errors.email ? '!border-red-400/50' : ''}`} />
            {errors.email && <p className={errorText}>{errors.email}</p>}
          </div>
          <div>
            <input type="tel" placeholder="Phone Number (10 digits) *" value={formData.phone} onChange={e => setField('phone', e.target.value)} className={`${inputBase} ${errors.phone ? '!border-red-400/50' : ''}`} />
            {errors.phone && <p className={errorText}>{errors.phone}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Step 2: Education ───
const EducationStep = ({ formData, setField, errors }) => (
  <div className="space-y-8">
    <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">02. Academic Profile</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-500 dark:text-white/50 text-sm mb-2 tracking-wide font-light">Highest Qualification *</label>
        <select value={formData.qualification} onChange={e => setField('qualification', e.target.value)} className={`${selectBase} ${errors.qualification ? '!border-red-400/50' : ''}`}>
          <option value="">Select Qualification</option>
          {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
        {errors.qualification && <p className={errorText}>{errors.qualification}</p>}
      </div>
      <div>
        <label className="block text-gray-500 dark:text-white/50 text-sm mb-2 tracking-wide font-light">Degree Duration *</label>
        <select value={formData.duration} onChange={e => setField('duration', e.target.value)} className={`${selectBase} ${errors.duration ? '!border-red-400/50' : ''}`}>
          <option value="">Select Duration</option>
          {degreeDurations.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.duration && <p className={errorText}>{errors.duration}</p>}
      </div>
      <div>
        <label className="block text-gray-500 dark:text-white/50 text-sm mb-2 tracking-wide font-light">Current Academic Status *</label>
        <select value={formData.academicStatus} onChange={e => setField('academicStatus', e.target.value)} className={`${selectBase} ${errors.academicStatus ? '!border-red-400/50' : ''}`}>
          <option value="">Select Status</option>
          {academicStatuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.academicStatus && <p className={errorText}>{errors.academicStatus}</p>}
      </div>
      <div>
        <label className="block text-gray-500 dark:text-white/50 text-sm mb-2 tracking-wide font-light">Department / Branch *</label>
        <select value={formData.department} onChange={e => setField('department', e.target.value)} className={`${selectBase} ${errors.department ? '!border-red-400/50' : ''}`}>
          <option value="">Select Department</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.department && <p className={errorText}>{errors.department}</p>}
      </div>
    </div>
  </div>
);

// ─── Step 3: Languages ───
const LanguageStep = ({ formData, setField, errors }) => {
  const toggle = (lang) => {
    const current = formData.languages;
    if (current.includes(lang)) {
      setField('languages', current.filter(l => l !== lang));
    } else {
      setField('languages', [...current, lang]);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">03. Communication Languages</h3>
      <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">Which languages are you comfortable communicating in? Select all that apply.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {languages.map(lang => (
          <button
            key={lang}
            type="button"
            onClick={() => toggle(lang)}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
              formData.languages.includes(lang)
                ? 'bg-[#E6C875]/10 border-[#E6C875]/40 text-[#E6C875] shadow-[0_0_15px_rgba(230,200,117,0.1)]'
                : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-[#E6C875]/30 hover:text-[#E6C875]'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      {errors.languages && <p className={errorText}>{errors.languages}</p>}
    </div>
  );
};

// ─── Step 4: Career Domain ───
const DomainStep = ({ formData, setField, errors }) => (
  <div className="space-y-8">
    <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">04. Target Architecture</h3>
    <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">Which career domain interests you the most?</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {careerDomains.map(domain => (
        <button
          key={domain.id}
          type="button"
          onClick={() => setField('domain', domain.label)}
          className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${
            formData.domain === domain.label
              ? 'bg-[#E6C875]/10 border-[#E6C875]/40 shadow-[0_0_25px_rgba(230,200,117,0.1)]'
              : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/30'
          }`}
        >
          <span className="text-2xl mb-2 block">{domain.icon}</span>
          <span className={`text-sm font-medium transition-colors ${
            formData.domain === domain.label ? 'text-[#E6C875]' : 'text-gray-700 dark:text-white/70 group-hover:text-[#E6C875]'
          }`}>{domain.label}</span>
        </button>
      ))}
    </div>
    {formData.domain === 'Confused — Need Guidance' && (
      <div className="bg-[#E6C875]/[0.05] border border-[#E6C875]/30 p-6 rounded-2xl mt-4">
        <p className="text-[#E6C875] text-sm font-medium">
          🧭 Our Career Guidance Team will help you identify the most suitable domain based on your background and career goals.
        </p>
      </div>
    )}
    {errors.domain && <p className={errorText}>{errors.domain}</p>}
  </div>
);

// ─── Step 5: Program Goal ───
const ProgramGoalStep = ({ formData, setField, errors }) => (
  <div className="space-y-8">
    <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-4">05. Program Selection</h3>
    <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-6">What level of support are you looking for?</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programTiers.map((tier, idx) => (
        <button
          key={tier.id}
          type="button"
          onClick={() => setField('program', tier.stores)}
          className={`text-left p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${
            formData.program === tier.stores
              ? 'bg-[#E6C875]/10 border-[#E6C875]/40 shadow-[0_0_30px_rgba(230,200,117,0.15)] scale-[1.02]'
              : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-[#E6C875]/20'
          }`}
        >
          {idx === 2 && (
            <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] bg-[#E6C875] text-black px-3 py-1 rounded-full font-bold">Recommended</span>
          )}
          <h4 className={`text-xl font-medium mb-2 transition-colors ${
            formData.program === tier.stores ? 'text-[#E6C875]' : 'text-gray-900 dark:text-white'
          }`}>{tier.title}</h4>
          <p className="text-xs text-gray-500 dark:text-white/40 mb-5 tracking-wide uppercase">{tier.subtitle}</p>
          <ul className="space-y-3">
            {tier.features.map((feat, fi) => (
              <li key={fi} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/60 font-light">
                <CheckCircle size={14} className={`mt-0.5 shrink-0 ${formData.program === tier.stores ? 'text-[#E6C875]' : 'text-gray-400 dark:text-white/30'}`} />
                {feat}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
    {errors.program && <p className={errorText}>{errors.program}</p>}
  </div>
);

// ─── Step 6: Additional Info ───
const AdditionalInfoStep = ({ formData, setField }) => (
  <div className="space-y-8">
    <h3 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-8 border-b border-gray-200 dark:border-white/10 pb-4">06. Career Intel</h3>
    <p className="text-gray-500 dark:text-white/50 text-sm font-light mb-4">What kind of role are you aiming for? (Optional)</p>
    <textarea
      rows="5"
      placeholder="Describe your career aspirations, dream companies, or any specific goals..."
      value={formData.careerGoals}
      onChange={e => setField('careerGoals', e.target.value)}
      className={`${inputBase} resize-none`}
    />
  </div>
);

// ─── Success Screen ───
const SuccessScreen = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 flex items-center justify-center animate-in zoom-in duration-500">
      <CheckCircle size={48} className="text-[#E6C875]" />
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">Application Transmitted</h2>
    <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto mb-4">
      Our admissions team will review your information and contact you shortly.
    </p>
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 mt-4">
      <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
      <span className="text-[#E6C875] text-sm font-medium tracking-wide">Expected Response: 24–48 Hours</span>
    </div>
  </div>
);

// ─── Main ApplyView Component ───
const TOTAL_STEPS = 6;

const ApplyView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const setField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for that field on change
    if (errors[field]) {
      setErrors(prev => {
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
      const leadScore = calculateLeadScore(formData);
      await submitApplication(formData, leadScore);
      setIsSuccess(true);
    } catch (err) {
      // For demo/development, show success anyway if webhook URL isn't set
      if (err.message && err.message.includes('YOUR_GOOGLE')) {
        setIsSuccess(true);
      } else {
        setSubmitError('Something went wrong. Please try again or contact support@vedupskilling.in');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = { formData, setField, errors };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfoStep {...stepProps} />;
      case 1: return <EducationStep {...stepProps} />;
      case 2: return <LanguageStep {...stepProps} />;
      case 3: return <DomainStep {...stepProps} />;
      case 4: return <ProgramGoalStep {...stepProps} />;
      case 5: return <AdditionalInfoStep {...stepProps} />;
      default: return null;
    }
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Apply Now | Ved Skill Verification Platform",
      "description": "Apply for Ved's engineering skill verification, internship and placement track programs."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I apply for Ved's placement assistance program?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fill out the multi-step application form on this page. Select the Placement Track to receive certification, internship experience, interview preparation, and recruiter visibility support."
          }
        },
        {
          "@type": "Question",
          "name": "What programs does Ved offer for engineering students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ved offers three progressive tracks: Certification (structured training), Internship Track (projects + portfolio), and Placement Track (full hiring support with recruiter visibility)."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Apply Now"
        description="Apply for Ved's engineering skill verification, internship and placement track programs. Build your verifiable portfolio and get hired."
        url="/apply"
        schema={schema}
      />
      <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {!isSuccess ? (
            <>
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
                    Start Your Verification Track.
                  </h1>
                  <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Admission is selective. We only work with engineers serious about building verifiable proof of competence.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                  <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                  <div className="min-h-[320px]" key={currentStep}>
                    <div className="animate-in fade-in slide-in-from-right-5 duration-500 ease-out">
                      {renderStep()}
                    </div>
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mt-8 text-sm font-light">
                      <AlertCircle size={18} className="shrink-0" />
                      {submitError}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
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
                        className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full px-8 py-4 sm:px-10 sm:py-5 flex items-center gap-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      >
                        <span className="hidden sm:inline">Continue</span>
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-[#E6C875] text-black font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full px-8 py-4 sm:px-10 sm:py-5 flex items-center gap-3 hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(230,200,117,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            Transmit Application
                            <ArrowRight size={18} />
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
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <SuccessScreen />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyView;
