import React, { useState } from 'react';
import { MapPin, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitCallback } from '../services/api';
import { validateEmail, validatePhone } from '../utils/formUtils';

const ContactView = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', domain: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!validatePhone(form.phone)) errs.phone = 'Enter a valid Indian phone number';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitCallback(form);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError('Something went wrong. Please try again or email admissions@vedupskilling.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) => `w-full bg-gray-50 dark:bg-black/50 border ${errors[field] ? 'border-red-400/50' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-[2rem] px-5 py-4 text-base sm:px-8 sm:py-6 sm:text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30`;

  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <ScrollReveal>
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-12">Get Recruiter Visibility.</h1>
              <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed mb-20 max-w-lg">
                Our engineering team is ready to perfectly align your portfolio trajectory with active recruiters in your target domain.
              </p>

              <div className="space-y-16">
                <div className="flex items-start space-x-6 sm:space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <MapPin size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-2xl sm:text-3xl tracking-wide mb-4">Global Headquarters</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-base sm:text-xl leading-relaxed">Ved Upskilling Campus<br />Bengaluru, Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 sm:space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <Mail size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-2xl sm:text-3xl tracking-wide mb-4">Digital Comms</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-base sm:text-xl leading-relaxed">admissions@vedupskilling.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 sm:space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <Phone size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-2xl sm:text-3xl tracking-wide mb-4">Direct Line</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-base sm:text-xl leading-relaxed">+91 (800) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 rounded-full blur-[80px] pointer-events-none"></div>

              {!isSuccess ? (
                <>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-12 relative z-10">Request Callback.</h3>

                  <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <input type="text" placeholder="First Name *" value={form.firstName} onChange={e => setField('firstName', e.target.value)} className={inputClass('firstName')} />
                        {errors.firstName && <p className="text-red-400 text-sm mt-2 font-light">{errors.firstName}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Last Name" value={form.lastName} onChange={e => setField('lastName', e.target.value)} className={inputClass('lastName')} />
                      </div>
                    </div>
                    <div>
                      <input type="email" placeholder="Professional Email *" value={form.email} onChange={e => setField('email', e.target.value)} className={inputClass('email')} />
                      {errors.email && <p className="text-red-400 text-sm mt-2 font-light">{errors.email}</p>}
                    </div>
                    <div>
                      <input type="tel" placeholder="Phone Number (10 digits) *" value={form.phone} onChange={e => setField('phone', e.target.value)} className={inputClass('phone')} />
                      {errors.phone && <p className="text-red-400 text-sm mt-2 font-light">{errors.phone}</p>}
                    </div>
                    <div>
                      <select value={form.domain} onChange={e => setField('domain', e.target.value)} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 rounded-[2rem] px-5 py-4 text-base sm:px-8 sm:py-6 sm:text-xl focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light cursor-pointer">
                        <option value="">Select Domain of Interest</option>
                        <option>Applied Data Science & AI</option>
                        <option>Full Stack Development</option>
                        <option>VLSI Design</option>
                        <option>Embedded Systems</option>
                        <option>MongoDB & Django Systems</option>
                        <option>React Native Development</option>
                      </select>
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-sm font-light">
                        <AlertCircle size={18} className="shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-base sm:text-lg rounded-[2rem] px-8 py-5 sm:py-7 mt-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={20} className="animate-spin" /> Submitting...</>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12 relative z-10">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 flex items-center justify-center animate-in zoom-in duration-500">
                    <CheckCircle size={40} className="text-[#E6C875]" />
                  </div>
                  <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight">Callback Requested</h3>
                  <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed mb-6">
                    Our admissions team will reach out to you shortly.
                  </p>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30">
                    <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
                    <span className="text-[#E6C875] text-sm font-medium tracking-wide">Expected Response: 24 Hours</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
