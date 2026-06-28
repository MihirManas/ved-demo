"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cpu, Database, Code, Network, Zap, Users, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { domainsData } from "@/constants/domainsData";

const categories = [
  "Software Engineering & Web",
  "Data Science & AI",
  "Hardware, IoT & Core Engineering",
  "Cloud Computing & Cyber Security",
  "Design & UI/UX",
  "Business, Management & Finance",
  "Specialized Sciences"
];

export default function Domains() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const coursesList = Object.values(domainsData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveCategory(categories[index]);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Highlights when the section reaches the upper part of viewport
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (idx: number) => {
    const section = sectionRefs.current[idx];
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 150; // Offset for fixed navbar
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

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
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Elite Domains.</h1>
            <p className="text-gray-600 dark:text-white/60 text-xl font-light max-w-3xl leading-relaxed">
              Curriculum engineered relentlessly for the next generation of technological leaders. Select your architectural path below.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:w-1/4 flex-shrink-0 hidden lg:block relative">
            <div className="fixed top-40 w-[22%] xl:w-[280px]">
              <h3 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-8">Table of Contents</h3>
              <nav className="flex flex-col space-y-2 relative">
                <div className="absolute -left-12 top-0 w-64 h-64 bg-[#E6C875]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
                
                {categories.map((category, idx) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => scrollToSection(idx)}
                      className={`relative z-10 text-left px-6 py-4 font-light text-lg transition-all duration-500 ease-out flex items-center justify-between group ${
                        isActive 
                          ? "text-[#E6C875] border-l-[3px] border-[#E6C875] bg-gradient-to-r from-[#E6C875]/5 to-transparent font-medium" 
                          : "text-gray-500 dark:text-white/40 border-l-[3px] border-transparent hover:text-gray-900 dark:hover:text-white/80 hover:border-gray-200 dark:hover:border-white/20"
                      }`}
                    >
                      <span>
                        <span className="opacity-50 mr-2 text-sm">{idx + 1}.</span> {category}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E6C875] shadow-[0_0_8px_#E6C875] animate-pulse"></span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Right Content Area (Scrollable Sections) */}
          <div className="lg:w-3/4 pb-32">
            {categories.map((category, idx) => {
              const categoryCourses = coursesList.filter(c => c.category === category);
              return (
                <div 
                  key={category} 
                  ref={(el) => { sectionRefs.current[idx] = el; }}
                  data-index={idx}
                  className="mb-32 pt-16 scroll-mt-32" // Added margin and padding for scroll alignment
                >
                  <ScrollReveal>
                    <div className="mb-10">
                      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="text-[#E6C875] mr-6 opacity-80">{idx + 1}.</span> 
                        {category}
                      </h2>
                      <div className="w-24 h-[1px] bg-[#E6C875]/50 mt-8 mb-12"></div>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-2 gap-8">
                    {categoryCourses.map((course, courseIdx) => (
                      <ScrollReveal key={course.id} delay={courseIdx * 100}>
                        <Link
                          href={`/domains/${course.id}`}
                          className="group block bg-white dark:bg-black/40 rounded-3xl border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-2xl dark:hover:bg-white/[0.03] dark:hover:border-[#E6C875]/30 transition-all duration-700 ease-out backdrop-blur-xl flex flex-col h-full shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer"
                        >
                          <div className="h-48 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 dark:from-white/[0.01] to-transparent border-b border-gray-100 dark:border-white/[0.02]">
                            <div className="text-gray-200 dark:text-white/5 transform group-hover:scale-125 group-hover:text-[#E6C875]/20 transition-all duration-1000 ease-out">
                              <IconComponent id={course.iconId} />
                            </div>
                            <div className="absolute top-6 left-6 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full flex items-center">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">{course.length}</span>
                            </div>
                          </div>

                          <div className="p-8 relative z-20 flex-grow flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6C875] mb-4">{course.tag}</div>
                              <h3 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">{course.title}</h3>
                              <p className="text-gray-600 dark:text-white/50 font-light text-sm mb-6 leading-relaxed line-clamp-2">{course.about}</p>

                              <div className="flex flex-wrap gap-2 mb-6">
                                {course.techs.slice(0, 3).map((tech: string) => (
                                  <div key={tech} className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-white/70 group-hover:border-[#E6C875]/30 transition-colors duration-500">
                                    {tech}
                                  </div>
                                ))}
                                {course.techs.length > 3 && (
                                  <div className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-white/70">
                                    +{course.techs.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-end border-t border-gray-200 dark:border-white/10 pt-6 mt-2">
                              <span className="text-gray-900 dark:text-white group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] font-bold text-xs uppercase tracking-widest flex items-center transition-colors duration-300">
                                Explore Syllabus <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
