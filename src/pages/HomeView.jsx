import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Zap, ShieldCheck, Users, LayoutDashboard, Quote } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ReviewCard from '../components/ReviewCard';
import { reviews } from '../constants/reviews';
import DomainCard from '../components/DomainCard';
import { domainsData } from '../constants/domainsData';

const Typewriter = ({ segments, onComplete, speed = 40, deleteSpeed = 20, pauseTime = 4000 }) => {
  const [cursor, setCursor] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const totalLength = segments.reduce((acc, seg) => acc + seg.text.length, 0);

  useEffect(() => {
    let timeout;
    if (isDeleting) {
      if (cursor > 0) {
        timeout = setTimeout(() => setCursor(c => c - 1), deleteSpeed);
      } else {
        setIsDeleting(false);
        if (onComplete) onComplete();
      }
    } else {
      if (cursor < totalLength) {
        timeout = setTimeout(() => setCursor(c => c + 1), speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    }
    return () => clearTimeout(timeout);
  }, [cursor, isDeleting, totalLength, speed, deleteSpeed, pauseTime, onComplete]);

  let charsRemaining = cursor;
  return (
    <>
      {segments.map((seg, idx) => {
        if (charsRemaining <= 0) return null;
        const toTake = Math.min(charsRemaining, seg.text.length);
        charsRemaining -= toTake;
        const textToShow = seg.text.substring(0, toTake);
        return (
          <span key={idx} className={seg.highlight ? "text-[#E6C875]" : ""}>
            {textToShow}
          </span>
        );
      })}
      <span className="animate-pulse text-[#E6C875] font-light ml-1">|</span>
    </>
  );
};

const HomeView = () => {
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroContent = [
    {
      segments: [
        { text: "Stop Sending ", highlight: false },
        { text: "Resumes.", highlight: true },
        { text: " Start Proving Competence.", highlight: false }
      ],
      buttonText: "Build Your Proof",
      route: "/courses"
    },
    {
      segments: [
        { text: "Stop applying randomly. ", highlight: false },
        { text: "Find out exactly", highlight: true },
        { text: " why you are not getting interview calls.", highlight: false }
      ],
      buttonText: "Analyse Your Resume",
      route: "/analyse"
    }
  ];

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

                <div className="relative mb-8 h-[220px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
                  <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 dark:text-white tracking-tighter leading-[1.05]">
                    <Typewriter 
                      key={heroIndex} 
                      segments={heroContent[heroIndex].segments} 
                      onComplete={() => setHeroIndex((prev) => (prev + 1) % heroContent.length)} 
                    />
                  </h1>
                </div>


                <div className="flex flex-col sm:flex-row gap-5">
                  <button
                    onClick={() => navigate(heroContent[heroIndex].route)}
                    className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  >
                    <span className="transition-all duration-500">{heroContent[heroIndex].buttonText}</span>
                    <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
                  >
                    Recruiter Visibility
                  </button>
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
              <div className="relative h-auto py-12 sm:py-0 sm:h-[500px] lg:h-[600px] rounded-[2rem] sm:rounded-[3rem] border border-gray-200 dark:border-white/5 flex items-center justify-center group overflow-hidden bg-gradient-to-br from-black/[0.02] dark:from-white/[0.03] to-transparent backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(230,200,117,0.05)]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 group-hover:scale-110 transition-all duration-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-200/50 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8 w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[550px]">
                  <div className="bg-white/60 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-xl transform sm:translate-y-8 animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
                    <Code className="text-[#E6C875] w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-base sm:text-lg">Portfolio Engine</h4>
                    <p className="text-gray-600 dark:text-white/60 text-xs sm:text-sm mt-2 sm:mt-3 font-light leading-relaxed">Systems built for immense, unbounded scale.</p>
                  </div>
                  <div className="bg-white/60 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-xl transform sm:-translate-y-8 animate-float-delayed shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
                    <Zap className="text-gray-900 dark:text-white w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-base sm:text-lg">Hiring Visibility</h4>
                    <p className="text-gray-600 dark:text-white/60 text-xs sm:text-sm mt-2 sm:mt-3 font-light leading-relaxed">Direct exposure to technical recruiters globally.</p>
                  </div>
                  <div className="sm:col-span-2 bg-gradient-to-r from-[#E6C875]/15 to-transparent border border-[#E6C875]/30 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-xl animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[#E6C875]/50 transition-all duration-500 hover:-translate-y-1">
                    <ShieldCheck className="text-[#E6C875] w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-base sm:text-lg">Cryptographic Proof</h4>
                    <p className="text-[#D4AF37] dark:text-[#E6C875]/80 text-xs sm:text-sm mt-2 sm:mt-3 font-light leading-relaxed">Unforgeable achievements backed by Wipro DICE ID.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-12 border-b border-gray-200 dark:border-white/10">
              <div className="max-w-3xl">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Engineering Portfolios.</h2>
                <p className="text-gray-600 dark:text-white/60 text-xl sm:text-2xl font-light leading-relaxed">Don't just learn. Build industry-grade systems that serve as undeniable proof of competence.</p>
              </div>
              <button
                onClick={() => navigate('/courses')}
                className="mt-8 md:mt-0 bg-transparent text-gray-900 dark:text-white hover:text-[#E6C875] dark:hover:text-[#E6C875] border border-gray-300 dark:border-white/20 hover:border-[#E6C875] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center space-x-2 transition-all duration-300"
              >
                <span>View More</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Object.values(domainsData).slice(0, 3).map((course, idx) => (
              <DomainCard key={course.id} course={course} onClick={() => navigate(`/course/${course.id}`)} delay={idx * 100} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col mb-16">
              <div className="max-w-4xl mb-16">
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Proven Trajectories.</h2>
                <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed">Our candidates don't just find jobs; their verified portfolios allow them to dictate terms and bypass standard technical screening entirely.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl border border-gray-200 dark:border-white/5 py-10 md:py-12 backdrop-blur-md shadow-sm">
                <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#E6C875]">25+</p>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm uppercase tracking-widest mt-4 font-semibold">Emerging Domains</p>
                </div>
                <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#E6C875]">60+</p>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm uppercase tracking-widest mt-4 font-semibold">Industry Live Projects</p>
                </div>
                <div className="text-center md:border-r border-gray-200 dark:border-white/10 px-4">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#E6C875]">1200+</p>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm uppercase tracking-widest mt-4 font-semibold">Students Enrolled</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#E6C875]">4.9+</p>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm uppercase tracking-widest mt-4 font-semibold">Students Rating</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="relative w-full mb-24 rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_0_50px_rgba(255,255,255,0.02)] p-2 sm:p-4">
              <div className="w-full overflow-hidden flex py-10 sm:py-12 relative group bg-transparent rounded-3xl">
                <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none rounded-l-3xl"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none rounded-r-3xl"></div>
                
                <div className="flex animate-marquee whitespace-nowrap min-w-full items-center justify-around shrink-0">
                  {[
                    { name: 'Capgemini', url: '/logos/capgemini.png' },
                    { name: 'Genpact', url: '/logos/genpact.png' },
                    { name: 'Intel', url: '/logos/intel.png' },
                    { name: 'TCS', url: '/logos/tcs.png' },
                    { name: 'Dell', url: '/logos/dell.png' },
                    { name: 'Wipro', url: '/logos/wipro.png' },
                    { name: 'Cognizant', url: '/logos/cognizant.png' }
                  ].map((logo, idx) => (
                    <img key={`logo-1-${idx}`} src={logo.url} alt={logo.name} className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain mx-8 md:mx-14 filter grayscale dark:invert opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
                  ))}
                </div>
                <div className="flex animate-marquee whitespace-nowrap min-w-full items-center justify-around shrink-0" aria-hidden="true">
                  {[
                    { name: 'Capgemini', url: '/logos/capgemini.png' },
                    { name: 'Genpact', url: '/logos/genpact.png' },
                    { name: 'Intel', url: '/logos/intel.png' },
                    { name: 'TCS', url: '/logos/tcs.png' },
                    { name: 'Dell', url: '/logos/dell.png' },
                    { name: 'Wipro', url: '/logos/wipro.png' },
                    { name: 'Cognizant', url: '/logos/cognizant.png' }
                  ].map((logo, idx) => (
                    <img key={`logo-2-${idx}`} src={logo.url} alt={logo.name} className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain mx-8 md:mx-14 filter grayscale dark:invert opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className={`transition-all duration-1000 ease-in-out ${showAllReviews ? 'max-h-[850px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar rounded-3xl' : ''}`}>
            <div className="grid md:grid-cols-2 gap-10">
              {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review, idx) => (
                <ReviewCard key={idx} review={review} delay={!showAllReviews ? (idx % 2 + 1) * 100 : 0} />
              ))}
            </div>
          </div>

          {!showAllReviews && (
            <div className="mt-16 text-center mb-24">
              <button
                onClick={() => setShowAllReviews(true)}
                className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
              >
                View More
              </button>
            </div>
          )}

          {/* AI SEO Semantic Content Block */}
          <div className="mt-20 pt-20 border-t border-gray-200 dark:border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Program Overview & Career Outcomes</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 dark:text-white/40 font-light columns-1 md:columns-2 lg:columns-3 gap-12">
              <p className="mb-4">
                <strong className="text-gray-700 dark:text-white/60">Who this program is for:</strong> Ved Upskilling is designed for engineering students, recent graduates, and working professionals who want to transition into elite tech roles. It is ideal for individuals seeking to bypass traditional resume screening and prove their competence directly.
              </p>
              <p className="mb-4">
                <strong className="text-gray-700 dark:text-white/60">Career outcomes:</strong> Graduates of our technical programs secure roles as Software Engineers, Data Scientists, VLSI Engineers, and Full Stack Developers at top multinational corporations. We focus exclusively on high-paying, high-growth career trajectories.
              </p>
              <p className="mb-4">
                <strong className="text-gray-700 dark:text-white/60">Required skills & Tools covered:</strong> Programs range from beginner to advanced. Depending on your domain, you will master tools like React, Node.js, Python, TensorFlow, Django, MongoDB, Verilog, and embedded C.
              </p>
              <p className="mb-4">
                <strong className="text-gray-700 dark:text-white/60">Industry demand & Expected salary ranges:</strong> The demand for cryptographically verified engineers is at an all-time high. Our alumni typically see starting salaries significantly above the industry average, directly reflecting the enterprise-level skills they acquire.
              </p>
              <p className="mb-4">
                <strong className="text-gray-700 dark:text-white/60">Placement & Internship support:</strong> Every candidate on the Placement Track receives intensive interview preparation, resume building, and direct visibility to our 85+ recruiting partners. The Internship Track provides real-world production environment experience.
              </p>
              <p>
                <strong className="text-gray-700 dark:text-white/60">Target companies:</strong> Our recruitment network spans FAANG-tier companies, hyper-growth startups, and global enterprise leaders actively seeking verified talent.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeView;
