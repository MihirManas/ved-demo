"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal>
            <div>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-12">Initiate Contact.</h1>
              <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed mb-20 max-w-lg">
                Our admissions engineering team is ready to perfectly align your trajectory with the right technological domain.
              </p>

              <div className="space-y-16">
                <div className="flex items-start space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <MapPin size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Global Headquarters</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">Ved Upskilling Campus<br />Bengaluru, Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <Mail size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Digital Comms</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">admissions@vedupskilling.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-10 group">
                  <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                    <Phone size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Direct Line</h4>
                    <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">+91 (800) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-16 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 rounded-full blur-[80px] pointer-events-none"></div>
              <h3 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-12 relative z-10">Request Callback.</h3>

              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <input type="text" placeholder="First Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
                  </div>
                </div>
                <div>
                  <input type="email" placeholder="Professional Email" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
                </div>
                <div>
                  <select className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light cursor-pointer">
                    <option>Select Domain of Interest</option>
                    <option>Full Stack Architecture</option>
                    <option>Applied AI & Data Science</option>
                    <option>Embedded Systems</option>
                  </select>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-lg rounded-[2rem] px-8 py-7 mt-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
