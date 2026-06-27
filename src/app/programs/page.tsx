import React from 'react';
import Link from 'next/link';
import { Cpu, Database, Code, Network, Zap, BookOpen, ChevronRight, Book } from 'lucide-react';
import { getAllPrograms, getAllDepartments } from '@/lib/content';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elite Programs - Ved Upskilling',
  description: 'Explore our elite programs in AI, Full Stack, Embedded Systems, and more. Curriculum engineered relentlessly for the next generation of technological leaders.',
};

export default function CoursesPage() {
  const programs = getAllPrograms();
  const departments = getAllDepartments();

  return (
    <div className="min-h-screen pt-40 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-12 border-b border-gray-200 dark:border-white/10">
            <div>
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Elite Programs.</h1>
              <p className="text-gray-600 dark:text-white/60 text-xl md:text-2xl font-light max-w-4xl leading-relaxed">Curriculum engineered relentlessly for the next generation of technological leaders. Filter out the noise and master the essence.</p>
            </div>
          </div>
        </ScrollReveal>

        {departments.map((dept, dIdx) => {
          const deptPrograms = programs.filter(p => p.department === dept.id);
          if (deptPrograms.length === 0) return null;

          return (
            <div key={dept.id} className="mb-24">
              <ScrollReveal delay={100}>
                <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-10 border-b border-gray-200 dark:border-white/10 pb-4">
                  {dept.title}
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {deptPrograms.map((course, idx) => (
                  <ScrollReveal key={course.id} delay={idx * 100}>
                    <Link href={`/programs/${course.id}`} className="group bg-white dark:bg-white/[0.02] rounded-[3rem] border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-2xl dark:hover:bg-white/[0.04] dark:hover:border-[#E6C875]/30 transition-all duration-700 ease-out backdrop-blur-xl flex flex-col h-full shadow-lg cursor-pointer">
                      <div className="h-64 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 dark:from-white/[0.01] to-transparent border-b border-gray-100 dark:border-white/[0.02]">
                        <div className="text-gray-200 dark:text-white/10 transform group-hover:scale-125 group-hover:text-[#E6C875]/30 transition-all duration-1000 ease-out">
                          <Book size={160} strokeWidth={1} />
                        </div>
                        <div className="absolute top-8 left-8 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 px-5 py-2 rounded-full flex items-center space-x-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">{course.length}</span>
                        </div>
                      </div>

                      <div className="p-10 relative z-20 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E6C875] mb-5">{dept.title}</div>
                          <h3 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-5 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">{course.title}</h3>
                          <p className="text-gray-600 dark:text-white/50 font-light text-base mb-6 leading-relaxed line-clamp-3">Focus: {course.focus}</p>

                          <div className="flex flex-wrap gap-3 mb-8">
                            {course.techs.map(tech => (
                              <div key={tech} className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-white/70 shadow-inner group-hover:border-[#E6C875]/50 group-hover:text-[#B8860B] dark:group-hover:text-white transition-colors duration-500">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-8 mt-4">
                          <div className="flex items-center text-gray-700 dark:text-white/70 text-sm font-semibold">
                            <BookOpen size={18} strokeWidth={2} className="mr-3 text-[#E6C875]" />
                            {course.syllabus?.length || 0} Modules
                          </div>
                          <div className="text-gray-900 dark:text-white group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] font-bold text-xs uppercase tracking-widest flex items-center transition-colors duration-300">
                            View Details <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
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
  );
}
