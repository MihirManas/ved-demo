import { Target, Lightbulb, Shield, Zap, Users, Award, BookOpen, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ved Upskilling",
  description: "Ved Upskilling is a community of learners, mentors, and industry leaders committed to creating meaningful career transformations with 8-10 years of expertise.",
};

export default function About() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <ScrollReveal>
          <div className="max-w-5xl mx-auto text-center mb-40">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">
              Your Pathway to <span className="text-[#E6C875]">Professional Excellence.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
              Let’s embark on this journey together. Because <strong className="font-medium text-gray-900 dark:text-white">your success is our success.</strong>
            </p>
          </div>
        </ScrollReveal>

        {/* Who We Are Section */}
        <ScrollReveal delay={100}>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
            <div className="relative w-full aspect-square rounded-[4rem] overflow-hidden bg-white/5 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 shadow-2xl backdrop-blur-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6C875]/20 to-transparent opacity-50"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://vedupskilling.in/wp-content/uploads/2025/01/who-are-you-e1736048697378.png" 
                alt="Who We Are" 
                className="w-full h-full object-cover rounded-3xl relative z-10"
              />
            </div>
            <div>
              <h2 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Who We Are?</h2>
              <p className="text-xl text-gray-600 dark:text-white/60 leading-relaxed font-light mb-8">
                Our programs provide immersive, practical learning guided by industry professionals with 8-10 years of expertise. Students receive tailored support through one-on-one doubt-solving sessions and gain real-world experience by working on projects sourced from leading multinational companies.
              </p>
              <p className="text-xl text-gray-600 dark:text-white/60 leading-relaxed font-light mb-10">
                With lifetime access to our advanced LMS, dedicated placement assistance, and around-the-clock support, we ensure every learner is equipped for career growth and success.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-lg text-gray-700 dark:text-white/80">
                  <Star className="text-[#E6C875] w-6 h-6 mr-4 flex-shrink-0" /> Dramatically re-engineer value added systems via mission
                </li>
                <li className="flex items-center text-lg text-gray-700 dark:text-white/80">
                  <BookOpen className="text-[#E6C875] w-6 h-6 mr-4 flex-shrink-0" /> Access more than 100K online courses
                </li>
                <li className="flex items-center text-lg text-gray-700 dark:text-white/80">
                  <Award className="text-[#E6C875] w-6 h-6 mr-4 flex-shrink-0" /> Learn the high-impact skills that top companies want
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Section */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40">
            {[
              { value: "3.9k", label: "Successfully Trained", icon: Award },
              { value: "15.8k", label: "Classes Completed", icon: BookOpen },
              { value: "97.5%", label: "Satisfaction Rate", icon: Star },
              { value: "100.2k", label: "Students Community", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-3xl p-8 text-center backdrop-blur-2xl shadow-lg hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#E6C875]/10 rounded-2xl flex items-center justify-center text-[#E6C875]">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-gray-500 dark:text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Core Values Section */}
        <ScrollReveal delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
            {[
              { title: "Excellence", desc: "Striving to deliver the highest quality in every aspect of our platform.", icon: Target },
              { title: "Innovation", desc: "Continuously evolving to meet the demands of the modern world.", icon: Lightbulb },
              { title: "Integrity", desc: "Building trust through transparency, reliability, and ethical practices.", icon: Shield },
              { title: "Empowerment", desc: "Enabling individuals to take charge of their personal and professional growth.", icon: Zap },
            ].map((val, i) => (
              <div key={i} className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-10 rounded-[3rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.04] transition-all shadow-lg dark:shadow-none group">
                <div className="w-16 h-16 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-center mb-8 bg-gray-50 dark:bg-white/5 group-hover:scale-110 group-hover:border-[#E6C875]/50 transition-all duration-500">
                  <val.icon className="text-gray-600 dark:text-white/70 group-hover:text-[#E6C875] transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">{val.title}</h3>
                <p className="text-gray-600 dark:text-white/50 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-40">
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none h-full relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 transition-colors duration-1000"></div>
              <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8 relative z-10">Our Mission.</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed font-light text-2xl relative z-10">
                By blending innovation with expertise, we make upskilling a seamless and rewarding experience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none h-full relative overflow-hidden group">
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 transition-colors duration-1000"></div>
              <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8 relative z-10">Our Vision.</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed font-light text-2xl relative z-10">
                To empower individuals to achieve excellence by making education accessible, engaging, and impactful for everyone.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Our Process Section */}
        <ScrollReveal delay={100}>
          <div className="text-center mb-24">
            <h2 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Our Process</h2>
            <p className="text-xl text-gray-500 dark:text-white/50 max-w-2xl mx-auto">A seamless path to achieving your career aspirations.</p>
          </div>
          
          <div className="relative mb-40">
            {/* Connecting line for process steps */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E6C875]/30 to-transparent -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Book a Demo Call", desc: "Connect with our experts to explore our programs." },
                { step: "02", title: "Pick Your Plan", desc: "Choose the course that aligns with your aspirations." },
                { step: "03", title: "Join the Journey", desc: "Enroll with us to begin your experience." },
                { step: "04", title: "Learn and Grow", desc: "Transformative learning from industry experts." },
                { step: "05", title: "Achieve Excellence", desc: "Equip yourself to excel in your career." },
              ].map((process, i) => (
                <div key={i} className="relative z-10 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-xl text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full flex items-center justify-center text-xl font-bold text-[#E6C875] mb-6 group-hover:scale-110 group-hover:bg-[#E6C875] group-hover:text-white transition-all duration-300">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{process.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Instructors */}
        <ScrollReveal delay={100}>
          <div className="border-t border-gray-200 dark:border-white/5 pt-32 text-center">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-24">Meet Our Expert Instructors.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-[#111] mb-8 relative shadow-2xl group-hover:border-[#E6C875]/50 transition-all duration-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://vedupskilling.in/wp-content/uploads/2025/01/Team-2-1.jpg" 
                      alt="Instructor" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h4 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Expert Instructor</h4>
                  <p className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-4">15+ Yrs Experience</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
