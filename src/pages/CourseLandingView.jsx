import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Award, Briefcase, Code, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import { domainsData } from '../constants/domainsData';

const CourseLandingView = () => {
  const { slug } = useParams();
  
  // Find the course by matching the URL slug
  const courseId = Object.keys(domainsData).find(
    key => domainsData[key].title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
  );

  if (!courseId) {
    return <Navigate to="/courses" replace />;
  }

  const course = domainsData[courseId];

  // Schema for Course and EducationalOrganization
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${course.title} Course in India | Ved Upskilling`,
      "description": `Master ${course.title} with Ved's Cryptographic Skill Verification. Bypass HR filters and get directly connected to top engineering teams.`
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": `Learn ${course.focus}. Program includes real-world architecture, execution, and cryptographic verification of skills.`,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Ved Upskilling",
        "sameAs": "https://vedupskilling.in"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vedupskilling.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Domains",
          "item": "https://vedupskilling.in/courses"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": course.title,
          "item": `https://vedupskilling.in/domains/${slug}`
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title={`${course.title} Program`}
        description={`Learn ${course.title}. ${course.focus}. Get verified and placed in elite engineering teams.`}
        url={`/domains/${slug}`}
        schema={schema}
      />
      
      <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-8 sm:p-16 mb-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E6C875]/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#E6C875]/20 transition-all duration-1000"></div>
              
              <div className="relative z-10 max-w-4xl">
                <div className="inline-block px-4 py-2 rounded-full bg-[#E6C875]/10 border border-[#E6C875]/30 text-[#E6C875] text-xs font-bold uppercase tracking-[0.2em] mb-8">
                  {course.tag}
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">
                  {course.title} <span className="text-[#E6C875]">Engineering.</span>
                </h1>
                
                {/* AI Semantic Paragraph */}
                <p className="text-gray-600 dark:text-white/60 text-lg sm:text-2xl font-light leading-relaxed mb-12">
                  This intensive program is designed for engineers seeking to master <strong className="font-medium text-gray-900 dark:text-white">{course.focus}</strong>. Replace traditional degrees with a cryptographic portfolio that proves your competence directly to top recruiters.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/apply" className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full px-8 py-4 sm:px-10 sm:py-5 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 shadow-xl flex items-center gap-3">
                    Start Verification <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Core Modules Grid */}
          <ScrollReveal delay={100}>
            <div className="mb-16">
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">
                Core Architecture.
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.modules.map((mod, idx) => (
                  <div key={idx} className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-xl">
                    <div className="w-12 h-12 rounded-full bg-[#E6C875]/10 flex items-center justify-center mb-6">
                      <Code className="text-[#E6C875]" size={24} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{mod}</h3>
                    <p className="text-gray-500 dark:text-white/50 font-light text-sm">Deep execution and real-world application of {mod.toLowerCase()} principles.</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* AI SEO Semantic Block: Career Outcomes */}
          <ScrollReveal delay={200}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-8 sm:p-16 backdrop-blur-2xl">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">
                  Career Outcomes.
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Briefcase className="text-[#E6C875] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Placement Assistance</h4>
                      <p className="text-gray-600 dark:text-white/60 font-light mt-1">Direct visibility to 85+ enterprise hiring partners.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <ShieldCheck className="text-[#E6C875] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Cryptographic Certificate</h4>
                      <p className="text-gray-600 dark:text-white/60 font-light mt-1">Immutable proof of your technical execution on the blockchain.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Award className="text-[#E6C875] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Internship Experience</h4>
                      <p className="text-gray-600 dark:text-white/60 font-light mt-1">Real-world production environments and architectural design.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
                  Who This Program Is For
                </h3>
                <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed mb-6">
                  This program is strictly engineered for individuals who want to bypass broken hiring pipelines. Whether you are a college student needing a verified portfolio or a professional looking to pivot into elite engineering roles, the {course.title} track will force you to execute at an enterprise standard.
                </p>
                <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed mb-8">
                  You do not need a computer science degree. You only need the willingness to submit to rigorous verification protocols.
                </p>
                
                <Link to="/verify" className="text-[#E6C875] font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-2 hover:gap-4 transition-all">
                  See Verification Protocol <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </>
  );
};

export default CourseLandingView;
