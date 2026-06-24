import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ScrollReveal from '../components/ScrollReveal';

const LegalLayout = ({ children, title, subtitle, date, sections }) => {
  const activeSection = useScrollSpy(sections.map(s => s.id), 120);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Legal Hero */}
        <ScrollReveal>
          <div className="mb-20">
            <p className="text-[#E6C875] font-bold tracking-[0.2em] uppercase text-sm mb-4">Legal Ledger</p>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-white/60 text-xl md:text-2xl font-light max-w-3xl leading-relaxed mb-6">
              {subtitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-white/40 tracking-widest uppercase">
              Last Updated: {date}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-32">
            <ScrollReveal delay={200}>
              <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-xs mb-8">Table of Contents</h4>
              <nav aria-label="Table of Contents">
                <ul className="space-y-4 border-l border-gray-200 dark:border-white/10">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left pl-6 text-sm transition-all duration-300 w-full ${
                          activeSection === section.id 
                            ? 'text-[#E6C875] font-semibold border-l-2 border-[#E6C875] -ml-[1px] translate-x-1' 
                            : 'text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        aria-current={activeSection === section.id ? 'true' : 'false'}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </ScrollReveal>
          </aside>

          {/* Table of Contents - Mobile */}
          <div className="lg:hidden mb-10 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-6 rounded-2xl backdrop-blur-xl">
            <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-xs mb-4">Table of Contents</h4>
            <select 
              className="w-full bg-transparent text-gray-900 dark:text-white outline-none border-b border-gray-200 dark:border-white/10 pb-2 appearance-none"
              onChange={(e) => scrollToSection(e.target.value)}
              value={activeSection}
            >
              {sections.map(s => (
                <option key={s.id} value={s.id} className="text-black">{s.title}</option>
              ))}
            </select>
          </div>

          {/* Legal Content */}
          <main className="flex-1 max-w-4xl prose prose-lg prose-gray dark:prose-invert">
            {children}
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
