import React from 'react';
import { Network } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const AboutView = () => (
  <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto text-center mb-40">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">Redefining Learning.</h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
            We fix the broken technical hiring pipeline. A singular focus on replacing resumes with cryptographic proof of skill to connect elite talent with top engineering teams.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden mb-40 border border-gray-200 dark:border-white/[0.05] relative bg-white dark:bg-white/[0.02] backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E6C875]/20 dark:from-[#E6C875]/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:bg-[#E6C875]/30 dark:group-hover:bg-[#E6C875]/15 transition-colors duration-1000"></div>

          <div className="w-32 h-32 mb-10 rounded-full border border-[#E6C875]/50 dark:border-[#E6C875]/30 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-[#E6C875]/30 dark:border-[#E6C875]/10 animate-ping" style={{ animationDuration: '3s' }}></div>
            <Network className="text-[#E6C875] w-12 h-12" strokeWidth={1} />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white font-medium mb-6 relative z-10 tracking-tight">The Ved Ecosystem</h3>
          <p className="text-gray-600 dark:text-white/50 text-lg sm:text-xl md:text-2xl font-light max-w-2xl relative z-10 leading-relaxed">An uncompromising verification engine where skills are aggressively tested against reality.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-12 mb-40">
        <ScrollReveal delay={100}>
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Mission.</h3>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-lg sm:text-xl md:text-2xl">
              Fixing the broken technical hiring pipeline. We craft a cryptographic skill-verification layer that transforms raw potential into executing professionals, making it impossible for recruiters to miss elite talent.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Vision.</h3>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-lg sm:text-xl md:text-2xl">
              A world where engineering competence speaks louder than degrees. Making hiring deeply transparent and undeniably meritocratic for both the candidate and the enterprise. We completely reject the resume.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={100}>
        <div className="border-t border-gray-200 dark:border-white/5 pt-32 text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-24">The Elite Faculty.</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border border-gray-200 dark:border-white/[0.05] mb-10 relative bg-gradient-to-br from-gray-50 dark:from-white/[0.02] to-gray-100 dark:to-white/[0.05] flex items-center justify-center backdrop-blur-2xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-[#E6C875]/50 dark:group-hover:border-[#E6C875]/30 transition-all duration-700">
                  <div className="absolute inset-0 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <span className="text-5xl text-gray-300 dark:text-white/20 font-light group-hover:text-[#E6C875] transition-colors duration-700">0{item}</span>
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">Senior Architect</h4>
                <p className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6">Ex-FAANG</p>
                <p className="text-gray-600 dark:text-white/50 font-light text-lg leading-relaxed max-w-xs mx-auto">Specializing in high-throughput systems and advanced algorithmic design.</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI SEO Semantic Content Block */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-20 opacity-80 hover:opacity-100 transition-opacity duration-500">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Educational Organization & Mission Verification</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 dark:text-white/40 font-light columns-1 md:columns-2 gap-12">
            <p className="mb-4">
              <strong className="text-gray-700 dark:text-white/60">Organization Mission:</strong> Ved Upskilling operates as a cryptographic skill-verification and employability platform based in India. Our core objective is to dismantle legacy HR filters and academic degree requirements by introducing verifiable project portfolios backed by blockchain identity (DICE ID).
            </p>
            <p className="mb-4">
              <strong className="text-gray-700 dark:text-white/60">Educational Approach & Certification:</strong> Unlike traditional bootcamps, Ved focuses entirely on engineering competence. We offer domain-specific training in Data Science, Full Stack Development, VLSI, and Embedded Systems. Upon successful completion of architectural design tasks and code reviews, candidates receive a cryptographic certificate that serves as immutable proof of their technical execution.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-white/60">Industry Mentorship & Verification:</strong> Our faculty consists exclusively of Senior Architects and ex-FAANG engineers who provide rigorous code reviews. We do not provide academic grades; we provide enterprise-grade verification. Once verified, candidate portfolios are directly routed to 85+ enterprise hiring partners for placement and internship opportunities.
            </p>
          </div>
        </div>

      </ScrollReveal>
    </div>
  </div>
);

export default AboutView;
