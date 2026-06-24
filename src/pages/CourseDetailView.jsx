import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Star, Network, Users } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { domainsData } from '../constants/domainsData';

const CourseDetailView = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const course = domainsData[courseId];
  if (!course) return <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white text-3xl">Domain Not Found</div>;

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-500 dark:text-white/50 hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-bold group"
        >
          <ChevronRight size={18} className="rotate-180 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Domains Catalog
        </button>

        <ScrollReveal>
          <div className="mb-32">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-[#E6C875] mb-6">{course.tag}</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-gray-900 dark:text-white mb-10 leading-[1.05]">{course.title}</h1>
            <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-5xl leading-relaxed">{course.about}</p>

            <div className="flex flex-wrap gap-4 mt-12">
              {course.techs.map(tech => (
                <div key={tech} className="px-6 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/20 rounded-full text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white shadow-inner dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 mb-32">
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Star className="text-[#E6C875] mr-5" size={32} /> The Hiring Deficit</h3>
              <p className="text-gray-600 dark:text-white/60 font-light text-xl leading-relaxed">{course.whyChoose}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Network className="text-[#E6C875] mr-5" size={32} /> Market Trajectory</h3>
              <p className="text-gray-600 dark:text-white/60 font-light text-xl leading-relaxed">{course.marketGrowth}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="md:col-span-2 bg-gradient-to-r from-gray-50 dark:from-white/[0.02] to-[#E6C875]/[0.05] border border-[#E6C875]/30 dark:border-[#E6C875]/20 rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(230,200,117,0.1)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Users className="text-[#E6C875] mr-5" size={32} /> Hiring Landscape</h3>
              <p className="text-[#B8860B] dark:text-[#E6C875]/80 font-light text-2xl leading-relaxed">{course.hiring}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="border-t border-gray-200 dark:border-white/10 pt-32 mb-32">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-20 text-center">Portfolio Project Pipeline.</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-black/60 border border-gray-200 dark:border-white/10 rounded-3xl p-10 flex items-center hover:border-[#E6C875]/50 dark:hover:border-[#E6C875]/50 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-500 shadow-md dark:shadow-lg">
                  <div className="text-6xl font-medium text-gray-200 dark:text-white/5 mr-10 w-24 text-right">{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className="text-2xl text-gray-800 dark:text-white/80 font-light">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[4rem] p-24 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <h2 className="text-5xl font-medium text-gray-900 dark:text-white mb-10">Ready to master {course.tag}?</h2>
            <p className="text-gray-600 dark:text-white/50 text-xl font-light mb-12 max-w-2xl mx-auto">Stop sending resumes into the void. Apply to build a verifiable project portfolio that gets you hired.</p>
            <button
              onClick={() => navigate('/apply')}
              className="bg-black dark:bg-white text-white dark:text-black px-16 py-6 rounded-full font-bold uppercase tracking-widest text-xl hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Start Building Your Portfolio
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default CourseDetailView;
