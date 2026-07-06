"use client";

import { useState } from "react";
import { X, Calendar, Clock, Video } from "lucide-react";

interface WebinarRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebinarRegistrationModal({ isOpen, onClose }: WebinarRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "beginner",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        // Reset state after transition
        setTimeout(() => setIsSuccess(false), 300);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1F3145] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check your email for the webinar joining link and calendar invite.
            </p>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E6C875]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
                <span>Live Masterclass</span>
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">
                Exclusive Architecture Webinar
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Join our experts to uncover the secrets of scalable system design and high-performance execution.
              </p>
              
              <div className="flex items-center space-x-6 mt-6 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Calendar size={16} className="text-[#E6C875]" />
                  <span>Next Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock size={16} className="text-[#E6C875]" />
                  <span>10:00 AM IST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Video size={16} className="text-[#E6C875]" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20 outline-none transition-all dark:text-white"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20 outline-none transition-all dark:text-white"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20 outline-none transition-all dark:text-white"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Level</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20 outline-none transition-all dark:text-white appearance-none"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                >
                  <option value="beginner">Student / Beginner (0-1 yrs)</option>
                  <option value="intermediate">Intermediate (1-3 yrs)</option>
                  <option value="advanced">Advanced (3+ yrs)</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#1F3145] dark:bg-white text-white dark:text-[#1F3145] py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Secure My Spot</span>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                Limited to 100 seats. Early registration recommended.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
