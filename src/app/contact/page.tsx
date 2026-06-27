import React from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Free Consultation - Ved Upskilling',
  description: 'Book your free career consultation. Speak directly with our industry experts to align your career trajectory in AI, Full Stack, or Embedded Systems.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-40 pb-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="mb-24 text-center">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Initiate Protocol.</h1>
            <p className="text-gray-600 dark:text-white/60 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Book a free consultation with our senior architects to blueprint your exact career transition.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl">
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">Book Free Consultation</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50">First Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E6C875] text-gray-900 dark:text-white transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E6C875] text-gray-900 dark:text-white transition-all" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E6C875] text-gray-900 dark:text-white transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50">Domain of Interest</label>
                  <select className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#E6C875] text-gray-900 dark:text-white transition-all appearance-none">
                    <option value="" disabled selected>Select a domain</option>
                    <option value="ai">Applied Data Science & AI</option>
                    <option value="fullstack">Full Stack NodeJS Architecture</option>
                    <option value="embedded">Embedded Systems Engineering</option>
                    <option value="vlsi">VLSI Design Architecture</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-300 shadow-xl mt-4">
                  Schedule Session
                </button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-12 lg:pl-12">
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Direct Channels</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-gray-200 dark:border-white/10">
                      <Mail className="text-[#E6C875]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1">Email</p>
                      <a href="mailto:admissions@vedupskilling.com" className="text-xl text-gray-900 dark:text-white font-light hover:text-[#E6C875] transition-colors">admissions@vedupskilling.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-gray-200 dark:border-white/10">
                      <Phone className="text-[#E6C875]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1">Phone / WhatsApp</p>
                      <a href="tel:+919876543210" className="text-xl text-gray-900 dark:text-white font-light hover:text-[#E6C875] transition-colors">+91 98765 43210</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-gray-200 dark:border-white/10">
                      <MapPin className="text-[#E6C875]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/50 mb-1">Headquarters</p>
                      <p className="text-xl text-gray-900 dark:text-white font-light">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-[#E6C875]/10 to-transparent border border-[#E6C875]/30 rounded-3xl backdrop-blur-xl">
                <MessageSquare className="text-[#E6C875] w-10 h-10 mb-6" />
                <h4 className="text-xl text-gray-900 dark:text-white font-medium mb-3">Response Time SLA</h4>
                <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">
                  Our admissions committee typically reviews consultation requests and assigns a domain expert within 4 hours during business days.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
