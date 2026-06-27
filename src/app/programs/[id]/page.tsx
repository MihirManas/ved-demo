import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { domainsData } from '@/lib/data';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  return Object.keys(domainsData).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = domainsData[params.id as keyof typeof domainsData];
  if (!course) {
    return { title: 'Program Not Found' };
  }
  return {
    title: `${course.title} - Ved Upskilling`,
    description: course.about,
    keywords: [course.title, ...course.techs, 'Internship', 'Training', 'Placement Assistance'],
  };
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = domainsData[params.id as keyof typeof domainsData];
  
  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/programs"
          className="inline-flex items-center text-gray-500 dark:text-white/50 hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-bold group"
        >
          <ChevronRight size={18} className="rotate-180 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Programs Catalog
        </Link>

        <ScrollReveal>
          <div className="mb-32">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-[#E6C875] mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-[#E6C875] mr-4"></span> {course.tag}
            </div>
            
            <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-10 leading-[1.1]">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-900 dark:text-white/70 uppercase tracking-widest">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#E6C875] mr-3"></span> {course.length}</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#E6C875] mr-3"></span> {course.modules} Modules</div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-24">
            <ScrollReveal delay={100}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">System Architecture Overview</h3>
                <p className="text-gray-600 dark:text-white/60 font-light leading-relaxed text-xl mb-12">{course.about}</p>
                
                <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">The Industry Vacuum</h3>
                <p className="text-gray-600 dark:text-white/60 font-light leading-relaxed text-xl mb-12">{course.whyChoose}</p>
                
                <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Market Trajectory & Compensation</h3>
                <p className="text-gray-600 dark:text-white/60 font-light leading-relaxed text-xl mb-6">{course.marketGrowth}</p>
                <p className="text-[#B8860B] dark:text-[#E6C875] font-light leading-relaxed text-xl">{course.hiring}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">Execution Syllabus</h3>
              <div className="space-y-6">
                {course.syllabus.map((item, i) => (
                  <div key={i} className="flex items-center p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-2xl hover:border-gray-300 dark:hover:border-white/20 transition-colors">
                    <span className="text-[#E6C875] font-mono text-xl mr-6 opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="text-gray-800 dark:text-white/90 text-xl font-light">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={300}>
              <div className="sticky top-32 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-10 rounded-[3rem] backdrop-blur-xl shadow-2xl">
                <h4 className="text-gray-900 dark:text-white font-medium text-2xl mb-8">Primary Technologies</h4>
                <div className="flex flex-wrap gap-3 mb-12">
                  {course.techs.map(tech => (
                    <div key={tech} className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-white/80">
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="space-y-6 mb-12 border-t border-gray-200 dark:border-white/10 pt-10">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#E6C875] mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600 dark:text-white/60 font-light">1-on-1 Mentorship from Industry Leaders</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#E6C875] mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600 dark:text-white/60 font-light">Cryptographic DICE ID Certification</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#E6C875] mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600 dark:text-white/60 font-light">Dedicated Placement Protocol</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-300 shadow-xl"
                >
                  Book Consultation
                </Link>
                
                <p className="text-center text-xs text-gray-500 dark:text-white/40 mt-6 uppercase tracking-widest">Admissions for 2026 Open</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <SchemaMarkup
        type="Course"
        data={{
          name: course.title,
          description: course.about,
          provider: {
            "@type": "EducationalOrganization",
            name: "Ved Upskilling",
            sameAs: "https://vedupskilling.com"
          }
        }}
      />
    </main>
  );
}
