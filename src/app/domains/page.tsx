"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
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
  const [sortBy, setSortBy] = useState<"default" | "nameAsc" | "nameDesc" | "dateAdded">("default");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const coursesList = Object.values(domainsData);
  const totalCourses = coursesList.length;
  const totalDomains = categories.length;

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

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Elite Domains.</h1>
              <p className="text-gray-600 dark:text-white/60 text-xl font-light max-w-3xl leading-relaxed mb-8">
                Curriculum engineered relentlessly for the next generation of technological leaders. Select your architectural path below.
              </p>
              <div className="flex gap-4 items-center">
                <span className="px-5 py-2.5 rounded-full bg-[#E6C875]/10 text-[#E6C875] border border-[#E6C875]/30 text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(230,200,117,0.1)]">
                  {totalDomains} Domains
                </span>
                <span className="px-5 py-2.5 rounded-full bg-[#E6C875]/10 text-[#E6C875] border border-[#E6C875]/30 text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(230,200,117,0.1)]">
                  {totalCourses} Courses
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-white/50 dark:bg-black/30 p-2 px-4 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-md">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search architectures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-gray-900 dark:text-white font-medium outline-none focus:ring-0 text-sm py-1 w-full lg:w-64 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-4 bg-white/50 dark:bg-black/30 p-2 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-md self-start lg:self-end w-full lg:w-auto justify-between lg:justify-start">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest pl-3">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-gray-900 dark:text-white font-medium outline-none focus:ring-0 cursor-pointer text-sm pr-4 appearance-none w-full lg:w-auto"
                >
                  <option value="default" className="text-black">Default</option>
                  <option value="nameAsc" className="text-black">Name (A-Z)</option>
                  <option value="nameDesc" className="text-black">Name (Z-A)</option>
                  <option value="dateAdded" className="text-black">Date Added (Newest)</option>
                </select>
                <div className="pr-3 text-gray-400 pointer-events-none">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row-reverse gap-16 relative">
          {/* Right Sidebar - Table of Contents */}
          <div className="lg:w-1/4 flex-shrink-0 hidden lg:block relative">
            <div className="sticky top-40 h-[calc(100vh-120px)]">
              <h3 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-8">Table of Contents</h3>
              <nav className="flex flex-col relative border-l border-gray-200 dark:border-white/10">
                <div className="absolute -left-12 top-0 w-64 h-64 bg-[#E6C875]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
                
                {/* Buttery Smooth Floating Highlight */}
                <div 
                  className="absolute left-[-1px] w-[calc(100%+1px)] h-[60px] bg-gradient-to-r from-[#E6C875]/10 to-transparent border-l-[3px] border-[#E6C875] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"
                  style={{ transform: `translateY(${categories.indexOf(activeCategory) * 60}px)` }}
                />
                
                {categories.map((category, idx) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => scrollToSection(idx)}
                      className={`relative z-10 w-full h-[60px] text-left px-6 font-light text-[15px] xl:text-lg transition-colors duration-500 ease-out flex items-center justify-between group ${
                        isActive 
                          ? "text-[#E6C875] font-medium" 
                          : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/80"
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
              let categoryCourses = coursesList.filter(c => c.category === category);
              
              if (searchQuery.trim() !== "") {
                const q = searchQuery.toLowerCase();
                categoryCourses = categoryCourses.filter(c => 
                  c.title.toLowerCase().includes(q) || 
                  c.about.toLowerCase().includes(q) ||
                  c.techs.some((t: string) => t.toLowerCase().includes(q))
                );
              }

              if (categoryCourses.length === 0) return null;

              if (sortBy === "nameAsc") {
                categoryCourses.sort((a, b) => a.title.localeCompare(b.title));
              } else if (sortBy === "nameDesc") {
                categoryCourses.sort((a, b) => b.title.localeCompare(a.title));
              } else if (sortBy === "dateAdded") {
                categoryCourses.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
              }
              
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
                            <Image 
                              src={`/images/courses/${course.id.replace(/-/g, '_')}.png`} 
                              alt={`${course.title} - Complete guide to ${course.tag}`} 
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out mix-blend-overlay dark:mix-blend-normal" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black/80 to-transparent z-10"></div>
                            <div className="absolute top-6 left-6 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full flex items-center shadow-lg">
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
