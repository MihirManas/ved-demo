import ScrollReveal from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'About Ved Upskilling - AI Learning Platform',
  description: 'Our mission is to bridge the gap between academic theory and hardcore industry execution in AI, Full Stack, and Embedded Systems.',
  keywords: ['About Ved Upskilling', 'Career Training Institute', 'Industry Ready Education', 'Placement Focused Learning', 'Learn AI', 'Learn Data Science'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-40 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-24">
          <ScrollReveal>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">The Philosophy.</h1>
            <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-4xl leading-relaxed">
              We don't teach. We engineer competence.
            </p>
          </ScrollReveal>
        </header>

        <section className="grid md:grid-cols-2 gap-16 mb-24">
          <ScrollReveal delay={100}>
            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-white/80 font-light leading-relaxed space-y-8">
              <p>
                The technology industry is fundamentally broken at the entry level. Universities are teaching theoretical concepts that were obsolete a decade ago, while companies are demanding senior-level execution from junior engineers. 
              </p>
              <p>
                Ved Upskilling was forged to destroy this gap. We are a collective of active, senior-level engineers and architects from the world's most demanding tech firms. We realized the only way to create true engineers is through an apprenticeship model—direct, brutal, and highly effective.
              </p>
              <p>
                We do not use teaching assistants. We do not use pre-recorded theoretical lectures. Every interaction is live, dynamic, and strictly focused on architectural execution. If it doesn't compile in production, we don't teach it.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <aside className="bg-[#E6C875]/5 dark:bg-[#E6C875]/[0.02] border border-[#E6C875]/20 p-12 rounded-[3rem] backdrop-blur-xl h-full flex flex-col justify-center">
              <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Core Tenets</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-[#E6C875] font-bold mr-4">01.</span>
                  <span className="text-gray-700 dark:text-white/80 text-lg">No fluff. Only production-grade architecture.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E6C875] font-bold mr-4">02.</span>
                  <span className="text-gray-700 dark:text-white/80 text-lg">Direct mentorship from active industry leaders.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E6C875] font-bold mr-4">03.</span>
                  <span className="text-gray-700 dark:text-white/80 text-lg">Cryptographically verifiable proof of competence.</span>
                </li>
              </ul>
            </aside>
          </ScrollReveal>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative z-10 border-t border-gray-200 dark:border-white/5">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <article className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Why trust Ved Upskilling?</h3>
                  <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">We are run by active industry experts who write production code daily. Our outcomes are verified, our placement network is established, and we use a brutal, no-nonsense apprenticeship model.</p>
                </article>
                <article className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">How long is the training?</h3>
                  <p className="text-gray-600 dark:text-white/70 font-light leading-relaxed">Our programs range from 4 to 6 months of highly intensive, project-based execution depending on the chosen domain.</p>
                </article>
              </div>
            </ScrollReveal>
          </div>
          <SchemaMarkup 
            type="FAQPage"
            data={{
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Why trust Ved Upskilling?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are run by active industry experts who write production code daily. Our outcomes are verified, our placement network is established, and we use a brutal, no-nonsense apprenticeship model."
                  }
                },
                {
                  "@type": "Question",
                  name: "How long is the training?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our programs range from 4 to 6 months of highly intensive, project-based execution depending on the chosen domain."
                  }
                }
              ]
            }}
          />
        </section>

      </div>
    </main>
  );
}
