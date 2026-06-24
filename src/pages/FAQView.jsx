import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';

const faqs = [
  {
    question: "How does the verification protocol work?",
    answer: "Our verification protocol is a multi-step process where you prove your technical competence through real-world projects, architectural design, and rigorous code reviews. Once passed, your identity and skills are cryptographically verified and stored on the ledger."
  },
  {
    question: "Do I need a computer science degree to apply?",
    answer: "No. We completely reject the resume and degree-based filtering. We only care about your provable ability to execute engineering tasks. If you can pass our technical verification, you are in."
  },
  {
    question: "How does Ved help me get hired?",
    answer: "Once you achieve verified status, your portfolio is directly routed to active engineering managers and recruiters at our 85+ partner companies, allowing you to bypass standard technical screening rounds."
  },
  {
    question: "What is the cost of the program?",
    answer: "We offer different tracks based on your needs, ranging from free basic verification to intensive placement tracks. Please check our apply page for detailed breakdowns or contact our admissions team."
  },
  {
    question: "How long does verification take?",
    answer: "Verification timelines depend on your existing skill level. The cryptographic verification itself is instant upon passing the review, but completing the necessary projects can take anywhere from 2 weeks to 3 months."
  }
];

const FAQView = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Frequently Asked Questions | Ved Skill Verification Platform",
      "description": "Find answers to the most common questions about Ved's cryptographic skill verification, programs, and hiring."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEO 
        title="FAQ" 
        description="Frequently Asked Questions about Ved's engineering verification protocol."
        url="/faq"
        schema={schema}
      />
      <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
                Frequently Asked <span className="text-[#E6C875]">Questions</span>
              </h1>
              <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Everything you need to know about the verification protocol, hiring ecosystem, and how we operate.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div 
                  className={`bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] overflow-hidden transition-all duration-500 ${openIndex === idx ? 'shadow-xl dark:bg-white/[0.04]' : 'hover:bg-gray-50 dark:hover:bg-white/[0.03]'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                    <ChevronDown 
                      className={`text-[#E6C875] transition-transform duration-500 flex-shrink-0 ml-4 ${openIndex === idx ? 'rotate-180' : ''}`} 
                      size={24} 
                    />
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}
                  >
                    <p className="px-8 text-gray-600 dark:text-white/60 font-light text-lg sm:text-xl leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="mt-20 text-center">
              <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light mb-6">
                Still have questions? We are here to help.
              </p>
              <a href="/contact" className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full px-8 py-4 sm:px-10 sm:py-5 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Contact Support
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
};

export default FAQView;
