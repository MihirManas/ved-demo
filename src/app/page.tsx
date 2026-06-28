"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Code, ShieldCheck, Zap, Users, LayoutDashboard, Quote, Cpu, Database, Network, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { domainsData } from "@/constants/domainsData";

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const heroData = [
    {
      fullText: "Stop Sending Resumes. Start Proving Competence.",
      highlight: "Start Proving",
      buttonText: "Build Your Proof",
      route: "/domains"
    },
    {
      fullText: "Stop applying randomly. Find out exactly why you are not getting interview calls.",
      highlight: "Find out exactly",
      buttonText: "Analyse Your Resume",
      route: "/verify"
    }
  ];

  useEffect(() => {
    const current = heroData[heroIndex];
    let typingSpeed = isDeleting ? 15 : 40;
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting && typedText === current.fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setHeroIndex((prev) => (prev + 1) % heroData.length);
      timeout = setTimeout(() => {}, 500);
    } else {
      timeout = setTimeout(() => {
        setTypedText(current.fullText.substring(0, typedText.length + (isDeleting ? -1 : 1)));
      }, typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, heroIndex]);

  const renderHighlightedText = (text: string, highlight: string) => {
    if (!text.includes(highlight)) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="text-[#E6C875]">{part}</span> 
        : part
    );
  };

  const reviews = [
    { name: "Siddharth V.", role: "Lead AI Engineer", initials: "SV", bg: "from-[#E6C875] to-yellow-800", quote: "The curriculum bridges the gap between academic theory and hardcore industry execution. Within 4 months of the Applied AI program, I spearheaded a machine learning transition at my firm." },
    { name: "Priya M.", role: "Senior Software Architect", initials: "PM", bg: "from-gray-300 dark:from-white to-gray-500 dark:to-gray-400", quote: "Ved Upskilling stripped away the unnecessary fluff. The 1-on-1 mentorship felt like I was already working as a Senior Full Stack Developer. It fundamentally changed how I write code." },
    { name: "Rahul D.", role: "Embedded Systems Lead", initials: "RD", bg: "from-[#E6C875]/60 to-yellow-900", quote: "The rigorous focus on actual hardware architecture rather than just theory allowed me to confidently clear the technical rounds at a top semiconductor firm. Unmatched quality." },
    { name: "Ananya K.", role: "Data Scientist", initials: "AK", bg: "from-gray-200 dark:from-gray-300 to-gray-400 dark:to-gray-600", quote: "I transitioned from a basic analytics role to building highly scalable PyTorch models. The Execution Protocol is intense, but the resulting career trajectory is undeniable." }
  ];

  const featuredCourses = [domainsData["fullstack"], domainsData["ai-python"]];

  const IconComponent = ({ id }: { id: string }) => {
    if (id === 'cpu') return <Cpu size={120} strokeWidth={1} />;
    if (id === 'database') return <Database size={120} strokeWidth={1} />;
    if (id === 'code') return <Code size={120} strokeWidth={1} />;
    if (id === 'network') return <Network size={120} strokeWidth={1} />;
    if (id === 'zap') return <Zap size={120} strokeWidth={1} />;
    if (id === 'users') return <Users size={120} strokeWidth={1} />;
    return <Cpu size={120} strokeWidth={1} />;
  };

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <div className="relative min-h-screen flex flex-col justify-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div>
                <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse shadow-[0_0_10px_#E6C875]"></span>
                  <span className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-[0.25em]">Admissions Open 2026</span>
                </div>

                <div className="grid relative mb-12 items-start min-h-[160px] md:min-h-[180px] lg:min-h-[220px]">
                  <h1 className="col-start-1 row-start-1 w-full text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 dark:text-white tracking-tighter leading-[1.05]">
                    {renderHighlightedText(typedText, heroData[heroIndex].highlight)}
                    <span className="w-1 h-[0.9em] bg-gray-900 dark:bg-white inline-block ml-2 animate-pulse align-middle opacity-50"></span>
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    href={heroData[heroIndex].route}
                    className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  >
                    <span className="transition-all duration-500">{heroData[heroIndex].buttonText}</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/about"
                    className="flex justify-center bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
                  >
                    Discover Our Method
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-bold text-gray-900 dark:text-white/80">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.6</span> <span>Google</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.89</span> <span>Course Report</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.97</span> <span>Switchup</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.7</span> <span>Career Karma</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="relative min-h-[600px] py-12 md:py-0 rounded-[3rem] border border-gray-200 dark:border-white/5 flex items-center justify-center group overflow-hidden bg-gradient-to-br from-black/[0.02] dark:from-white/[0.03] to-transparent backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(230,200,117,0.05)]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 group-hover:scale-110 transition-all duration-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-200/50 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 w-full max-w-[450px]">
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:translate-y-8 animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Code className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Architecture</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Systems built for immense, unbounded scale.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:-translate-y-8 animate-float-delayed shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Zap className="text-gray-900 dark:text-white w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Execution</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Flawless, high-performance rapid delivery.</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-[#E6C875]/10 to-transparent border border-[#E6C875]/30 p-8 rounded-[2rem] backdrop-blur-xl animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[#E6C875]/50 transition-colors duration-500">
                    <ShieldCheck className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Verification</h4>
                    <p className="text-[#D4AF37] dark:text-[#E6C875]/70 text-sm mt-3 font-light leading-relaxed">Cryptographically secured achievements backed by Wipro DICE ID.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Flagship Architectures.</h2>
                <p className="text-gray-600 dark:text-white/60 text-xl font-light max-w-2xl leading-relaxed">Our most rigorous, high-demand execution protocols. Designed specifically for enterprise-level scaling.</p>
              </div>
              <Link
                href="/domains"
                className="mt-8 md:mt-0 group flex items-center text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors duration-300"
              >
                View More Architecture <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredCourses.map((course, idx) => (
              <ScrollReveal key={course.id} delay={idx * 150}>
                <Link
                  href={`/domains/${course.id}`}
                  className="group block bg-white dark:bg-black/40 rounded-3xl border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-2xl dark:hover:bg-white/[0.03] dark:hover:border-[#E6C875]/30 transition-all duration-700 ease-out backdrop-blur-xl flex flex-col h-full shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <div className="h-56 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 dark:from-white/[0.01] to-transparent border-b border-gray-100 dark:border-white/[0.02]">
                    <div className="text-gray-200 dark:text-white/5 transform group-hover:scale-125 group-hover:text-[#E6C875]/20 transition-all duration-1000 ease-out">
                      <IconComponent id={course.iconId} />
                    </div>
                    <div className="absolute top-6 left-6 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full flex items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">{course.length}</span>
                    </div>
                  </div>

                  <div className="p-10 relative z-20 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6C875] mb-4">{course.tag}</div>
                      <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">{course.title}</h3>
                      <p className="text-gray-600 dark:text-white/50 font-light text-base mb-8 leading-relaxed line-clamp-3">{course.about}</p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {course.techs.map((tech: string) => (
                          <div key={tech} className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-white/70 group-hover:border-[#E6C875]/30 transition-colors duration-500">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end border-t border-gray-200 dark:border-white/10 pt-8 mt-2">
                      <span className="text-gray-900 dark:text-white group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] font-bold text-sm uppercase tracking-widest flex items-center transition-colors duration-300">
                        Explore Syllabus <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Designed for Mastery.</h2>
              <p className="text-gray-600 dark:text-white/60 text-2xl max-w-3xl mx-auto font-light leading-relaxed">Precision curriculums engineered by industry veterans, built for those who demand absolute excellence.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 auto-rows-[350px]">
            <ScrollReveal delay={100}>
              <div className="h-full md:col-span-2 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 relative overflow-hidden group backdrop-blur-2xl transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10">
                <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110 duration-1000 ease-out text-gray-900 dark:text-white">
                  <Users size={400} strokeWidth={0.5} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#E6C875]/20 to-transparent text-[#E6C875] rounded-full flex items-center justify-center backdrop-blur-xl border border-[#E6C875]/20 shadow-[0_0_30px_rgba(230,200,117,0.1)]">
                    <Users size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Industry Pioneer Mentorship.</h3>
                    <p className="text-gray-600 dark:text-white/60 max-w-xl font-light text-xl leading-relaxed">Direct 1-on-1 guidance from professionals shaping the future at top multinationals. No teaching assistants, only absolute experts.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="h-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10 backdrop-blur-2xl flex flex-col justify-between">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent text-gray-900 dark:text-white rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <LayoutDashboard size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Advanced LMS.</h3>
                  <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed">A seamless, proprietary dashboard tracking your true technical progress.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="h-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10 backdrop-blur-2xl flex flex-col justify-between">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent text-gray-900 dark:text-white rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <Zap size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Dynamic Sync.</h3>
                  <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed">Live, interactive sessions strictly adapting to your intensive professional schedule.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="h-full md:col-span-2 bg-[#E6C875]/[0.05] dark:bg-[#E6C875]/[0.03] border border-[#E6C875]/30 dark:border-[#E6C875]/10 rounded-[3rem] p-16 relative overflow-hidden transition-all duration-700 hover:shadow-xl dark:hover:bg-[#E6C875]/[0.05] dark:hover:border-[#E6C875]/20 backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E6C875]/10 dark:from-[#E6C875]/5 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-20 h-20 bg-white dark:bg-[#E6C875]/10 text-[#E6C875] rounded-full flex items-center justify-center border border-[#E6C875]/30 dark:border-[#E6C875]/20 shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Cryptographic Credentials.</h3>
                    <p className="text-[#B8860B] dark:text-[#E6C875]/80 max-w-xl font-light text-xl leading-relaxed">Verified via DICE ID blockchain. Universally trusted and instantly verifiable by global tech recruiters.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-24 max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Proven Trajectories.</h2>
              <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed">Our alumni don't just find jobs; they dictate the architectural decisions at the world's leading technological firms.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 mb-24 py-12 border-y border-gray-200 dark:border-white/10">
              <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                <p className="text-5xl lg:text-6xl font-medium tracking-tighter text-[#E6C875]">25+</p>
                <p className="text-gray-900 dark:text-white/80 text-sm md:text-base font-semibold mt-4">Emerging Domains</p>
              </div>
              <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                <p className="text-5xl lg:text-6xl font-medium tracking-tighter text-[#E6C875]">60+</p>
                <p className="text-gray-900 dark:text-white/80 text-sm md:text-base font-semibold mt-4">Industry Live Projects</p>
              </div>
              <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                <p className="text-5xl lg:text-6xl font-medium tracking-tighter text-[#E6C875]">1200+</p>
                <p className="text-gray-900 dark:text-white/80 text-sm md:text-base font-semibold mt-4">Students Enrolled</p>
              </div>
              <div className="text-center px-4">
                <p className="text-5xl lg:text-6xl font-medium tracking-tighter text-[#E6C875]">4.9+</p>
                <p className="text-gray-900 dark:text-white/80 text-sm md:text-base font-semibold mt-4">Students Rating</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-8 md:p-12 mb-24 flex flex-col items-center shadow-sm dark:shadow-none">
              <p className="text-gray-500 dark:text-white/50 text-sm uppercase tracking-[0.2em] mb-10 font-semibold text-center">Our alumni are working at</p>
              
              <div 
                className="w-full overflow-hidden relative"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
                  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
                }}
              >
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused] will-change-transform transform-gpu">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex justify-around items-center gap-10 md:gap-20 px-5 md:px-10">
                      {[
                        { name: 'Intel', src: '/companies/intel.webp' },
                        { name: 'TCS', src: '/companies/tcs.webp' },
                        { name: 'Dell', src: '/companies/dell.webp' },
                        { name: 'Cognizant', src: '/companies/cognizant.webp' },
                        { name: 'Wipro', src: '/companies/wipro.webp' },
                        { name: 'Genpact', src: '/companies/genpact.webp' }
                      ].map((company) => (
                        <div key={`${i}-${company.name}`} className="relative group flex items-center justify-center w-24 h-12 md:w-36 md:h-16">
                          <img
                            src={company.src}
                            alt={company.name}
                            className="max-h-full max-w-full object-contain transition-all duration-300 ease-in-out filter grayscale brightness-0 opacity-40 dark:invert dark:opacity-60 group-hover:grayscale-0 group-hover:brightness-100 dark:group-hover:invert-0 group-hover:opacity-100 group-hover:scale-110 cursor-pointer drop-shadow-sm group-hover:drop-shadow-xl"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review, idx) => (
              <ScrollReveal key={idx} delay={(idx % 2 + 1) * 100}>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 rounded-[3rem] shadow-xl dark:shadow-none hover:shadow-2xl dark:hover:bg-white/[0.03] transition-all backdrop-blur-xl h-full flex flex-col justify-between">
                  <div>
                    <Quote className="text-[#E6C875]/50 dark:text-[#E6C875]/30 w-12 h-12 mb-8" />
                    <p className="text-gray-700 dark:text-white/80 text-xl font-light leading-relaxed mb-12">
                      "{review.quote}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-6 border-t border-gray-200 dark:border-white/10 pt-8 mt-auto">
                    <div className={`w-16 h-16 bg-gradient-to-br ${review.bg} rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center overflow-hidden shadow-lg dark:shadow-[0_0_20px_rgba(230,200,117,0.2)]`}>
                      <span className="text-white dark:text-black font-bold text-xl tracking-widest">{review.initials}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium text-xl">{review.name}</h4>
                      <p className="text-[#B8860B] dark:text-[#E6C875]/70 text-sm mt-1 uppercase tracking-widest font-semibold">{review.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {!showAllReviews && reviews.length > 2 && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => setShowAllReviews(true)}
                className="px-8 py-3 bg-transparent border border-gray-300 dark:border-white/20 rounded-full text-gray-700 dark:text-white/80 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                Read More Reviews
              </button>
            </div>
          )}

          {showAllReviews && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => setShowAllReviews(false)}
                className="px-8 py-3 bg-transparent border border-gray-300 dark:border-white/20 rounded-full text-gray-700 dark:text-white/80 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Frequently Asked Questions.</h2>
              <p className="text-gray-600 dark:text-white/60 text-xl font-light">Clarifying the execution protocol.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-white/10 py-4">
                <AccordionTrigger className="text-xl font-medium hover:text-[#E6C875] transition-colors text-left">What is the expected time commitment?</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-white/60 text-lg font-light pt-4 leading-relaxed">
                  Our domains require an intensive commitment of 15-20 hours per week. This is a rigorous architectural program, not a casual tutorial series.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-white/10 py-4">
                <AccordionTrigger className="text-xl font-medium hover:text-[#E6C875] transition-colors text-left">Are there guaranteed placements?</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-white/60 text-lg font-light pt-4 leading-relaxed">
                  While we boast a 94% placement rate, we guarantee competence, not jobs. If you execute the protocol flawlessly, your architectural skills will make you undeniably hirable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-white/10 py-4">
                <AccordionTrigger className="text-xl font-medium hover:text-[#E6C875] transition-colors text-left">How does the cryptographic verification work?</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-white/60 text-lg font-light pt-4 leading-relaxed">
                  Upon successful completion, your credentials are minted on the Wipro DICE ID blockchain. This provides an immutable, universally trusted record of your technical competence that recruiters can verify instantly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-gray-200 dark:border-white/10 py-4">
                <AccordionTrigger className="text-xl font-medium hover:text-[#E6C875] transition-colors text-left">Do I need a strong background in coding?</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-white/60 text-lg font-light pt-4 leading-relaxed">
                  Yes. Our programs are designed to take intermediate developers and engineer them into senior architects. A foundational understanding of programming logic is required before applying.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
