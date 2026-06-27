import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Zap, ShieldCheck, Users, LayoutDashboard, Quote } from 'lucide-react';
import ParticleCanvas from '@/components/ui/particle-canvas';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';

import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Ved Upskilling - AI Internship Program & Career Training',
  description: 'Ved Upskilling is a career training platform that teaches AI, Data Science and Web Development through training, projects and placement assistance.',
  keywords: ['AI Internship Program', 'Data Science Internship', 'Python Internship', 'Web Development Internship', 'Placement Assistance', 'Industry Ready Training', 'Online Internship', 'Internship with Projects'],
};

export default function Home() {
  const reviews = [
    { name: "Siddharth V.", role: "Lead AI Engineer", initials: "SV", bg: "from-[#E6C875] to-yellow-800", quote: "The curriculum bridges the gap between academic theory and hardcore industry execution. Within 4 months of the Applied AI program, I spearheaded a machine learning transition at my firm." },
    { name: "Priya M.", role: "Senior Software Architect", initials: "PM", bg: "from-gray-300 dark:from-white to-gray-500 dark:to-gray-400", quote: "Ved Upskilling stripped away the unnecessary fluff. The 1-on-1 mentorship felt like I was already working as a Senior Full Stack Developer. It fundamentally changed how I write code." },
    { name: "Rahul D.", role: "Embedded Systems Lead", initials: "RD", bg: "from-[#E6C875]/60 to-yellow-900", quote: "The rigorous focus on actual hardware architecture rather than just theory allowed me to confidently clear the technical rounds at a top semiconductor firm. Unmatched quality." },
    { name: "Ananya K.", role: "Data Scientist", initials: "AK", bg: "from-gray-200 dark:from-gray-300 to-gray-400 dark:to-gray-600", quote: "I transitioned from a basic analytics role to building highly scalable PyTorch models. The Execution Protocol is intense, but the resulting career trajectory is undeniable." }
  ];

  return (
    <main className="relative overflow-hidden">
      <ParticleCanvas />
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div>
                <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse shadow-[0_0_10px_#E6C875]"></span>
                  <span className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-[0.25em]">Admissions Open 2026</span>
                </div>

                <div className="flex flex-col mb-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 dark:text-white tracking-tighter leading-[1.05]">
                    Stop Sending Resumes. <span className="text-[#E6C875]">Start Proving</span> Competence.
                  </h1>
                </div>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 mb-12 font-light leading-relaxed tracking-wide max-w-xl">
                  A minimalist, practitioner-led ecosystem. Master AI, Full Stack, and Embedded Systems through precision engineering and real-world execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    href="/programs"
                    className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  >
                    <span>Build Your Proof</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-transparent text-center text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
                  >
                    Book Free Consultation
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-bold text-gray-900 dark:text-white/80">
                  <div className="flex items-center space-x-1.5"><span className="text-[#E6C875]">⭐ 4.6</span> <span>Google</span></div>
                  <div className="flex items-center space-x-1.5"><span className="text-[#E6C875]">⭐ 4.89</span> <span>Course Report</span></div>
                  <div className="flex items-center space-x-1.5"><span className="text-[#E6C875]">⭐ 4.97</span> <span>Switchup</span></div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="relative min-h-[600px] py-12 md:py-0 rounded-[3rem] border border-gray-200 dark:border-white/5 flex items-center justify-center group overflow-hidden bg-gradient-to-br from-black/[0.02] dark:from-white/[0.03] to-transparent backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(230,200,117,0.05)]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 group-hover:scale-110 transition-all duration-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-200/50 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 w-full max-w-[450px]">
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:translate-y-8 animate-float shadow-lg hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Code className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Architecture</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Systems built for immense, unbounded scale.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:-translate-y-8 animate-float-delayed shadow-lg hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Zap className="text-gray-900 dark:text-white w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Execution</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Flawless, high-performance rapid delivery.</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-[#E6C875]/10 to-transparent border border-[#E6C875]/30 p-8 rounded-[2rem] backdrop-blur-xl animate-float shadow-lg hover:border-[#E6C875]/50 transition-colors duration-500">
                    <ShieldCheck className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Verification</h4>
                    <p className="text-[#D4AF37] dark:text-[#E6C875]/70 text-sm mt-3 font-light leading-relaxed">Cryptographically secured achievements backed by Wipro DICE ID.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Methodology Section */}
      <section className="py-32 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Designed for Mastery.</h2>
              <p className="text-gray-600 dark:text-white/60 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">Precision curriculums engineered by industry veterans, built for those who demand absolute excellence.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 auto-rows-[300px]">
            <ScrollReveal delay={100}>
              <article className="h-full md:col-span-2 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 relative overflow-hidden group backdrop-blur-2xl transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04]">
                <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110 duration-1000 ease-out text-gray-900 dark:text-white">
                  <Users size={300} strokeWidth={0.5} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E6C875]/20 to-transparent text-[#E6C875] rounded-full flex items-center justify-center backdrop-blur-xl border border-[#E6C875]/20">
                    <Users size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Industry Pioneer Mentorship.</h3>
                    <p className="text-gray-600 dark:text-white/60 max-w-xl font-light text-lg leading-relaxed">Direct 1-on-1 guidance from professionals shaping the future at top multinationals. No teaching assistants, only absolute experts.</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <article className="h-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] backdrop-blur-2xl flex flex-col justify-between">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent text-gray-900 dark:text-white rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <LayoutDashboard size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-3">Advanced LMS.</h3>
                  <p className="text-gray-600 dark:text-white/60 font-light leading-relaxed">A seamless, proprietary dashboard tracking your true technical progress.</p>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative z-10 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Proven Trajectories.</h2>
                <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed">Our alumni don't just find jobs; they dictate the architectural decisions at the world's leading technological firms.</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
              <ScrollReveal key={idx} delay={(idx % 2 + 1) * 100}>
                <article className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-10 rounded-[2.5rem] hover:shadow-xl dark:hover:bg-white/[0.03] transition-all backdrop-blur-xl h-full flex flex-col justify-between">
                  <div>
                    <Quote className="text-[#E6C875]/50 dark:text-[#E6C875]/30 w-10 h-10 mb-6" />
                    <p className="text-gray-700 dark:text-white/80 text-lg font-light leading-relaxed mb-8">
                      "{review.quote}"
                    </p>
                  </div>
                  <footer className="flex items-center space-x-5 border-t border-gray-200 dark:border-white/10 pt-6 mt-auto">
                    <div className={`w-14 h-14 bg-gradient-to-br ${review.bg} rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center overflow-hidden`}>
                      <span className="text-white dark:text-black font-bold text-lg tracking-widest">{review.initials}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium text-lg">{review.name}</h4>
                      <p className="text-[#B8860B] dark:text-[#E6C875]/70 text-xs mt-1 uppercase tracking-widest font-semibold">{review.role}</p>
                    </div>
                  </footer>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 border-t border-gray-200 dark:border-white/5 bg-[#E6C875]/5 dark:bg-[#E6C875]/[0.02]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">
              Ready to architect the future?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/programs"
                className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-300 shadow-lg"
              >
                Explore Programs
              </Link>
              <Link
                href="/contact"
                className="bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-white/20 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors duration-300"
              >
                Apply Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative z-10 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <article className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Who are you and what do you do?</h3>
                <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">Ved Upskilling is a career training platform that teaches AI, Data Science and Web Development through training, projects and placement assistance.</p>
              </article>
              <article className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Who is this for?</h3>
                <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">Our programs are built for ambitious beginners, freshers, and intermediate developers seeking to secure internships and full-time roles in competitive tech domains.</p>
              </article>
              <article className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Will I get placement assistance?</h3>
                <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">Yes. We provide comprehensive placement assistance, including portfolio reviews, mock interviews with industry experts, and direct referrals to our hiring network.</p>
              </article>
            </div>
          </ScrollReveal>
        </div>
        <SchemaMarkup 
          type="FAQPage"
          data={{
            mainEntity: [
              {
                "@type": "Question",
                name: "Who are you and what do you do?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ved Upskilling is a career training platform that teaches AI, Data Science and Web Development through training, projects and placement assistance."
                }
              },
              {
                "@type": "Question",
                name: "Who is this for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our programs are built for ambitious beginners, freshers, and intermediate developers seeking to secure internships and full-time roles in competitive tech domains."
                }
              },
              {
                "@type": "Question",
                name: "Will I get placement assistance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We provide comprehensive placement assistance, including portfolio reviews, mock interviews with industry experts, and direct referrals to our hiring network."
                }
              }
            ]
          }}
        />
      </section>
    </main>
  );
}
