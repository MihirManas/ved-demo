import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, Network, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { getCourseBySlug } from "@/app/admin/course-actions";
import { notFound } from "next/navigation";

export default async function CourseDetail({ params }: { params: { id: string } }) {
  const res = await getCourseBySlug(params.id);
  const course = res.success ? res.course : null;
  if (!course) return notFound();

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/domains"
          className="inline-flex items-center text-gray-500 dark:text-white/50 hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-bold group"
        >
          <ChevronRight size={18} className="rotate-180 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Domains Catalog
        </Link>

        <ScrollReveal>
          <div className="mb-16 relative w-full h-[300px] md:h-[400px] rounded-[3rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
            <Image 
              src={course.image?.startsWith('http') ? course.image : `/images/courses/${course.slug.replace(/-/g, '_')}.png`} 
              alt={`${course.title} - Complete course covering ${course.techs.join(', ')}`} 
              fill 
              sizes="100vw"
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-32">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-[#E6C875] mb-6">{course.tag}</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-gray-900 dark:text-white mb-10 leading-[1.05]">{course.title}</h1>
            <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-5xl leading-relaxed">{course.about}</p>

            <div className="flex flex-wrap gap-4 mt-12">
              {course.techs.map((tech: string) => (
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
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Star className="text-[#E6C875] mr-5" size={32} /> Why Choose This Stack?</h3>
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
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-20 text-center">Execution Protocol.</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {course.syllabus.map((item: string, idx: number) => (
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
            <p className="text-gray-600 dark:text-white/50 text-xl font-light mb-12 max-w-2xl mx-auto">Admissions for the upcoming intensive cohort are strictly limited. Submit your credentials for evaluation.</p>
            <Link
              href="/apply"
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-16 py-6 rounded-full font-bold uppercase tracking-widest text-xl hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Apply For Domain
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
