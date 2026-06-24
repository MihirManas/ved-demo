import React from 'react';
import LegalLayout from '../layouts/LegalLayout';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const refundSections = [
  { id: 'cancellation', title: '1. Cancellation Policy' },
  { id: 'non-refundable', title: '2. Non-Refundable Payments' },
  { id: 'exceptions', title: '3. Exception for Refund' },
  { id: 'process', title: '4. Refund Process' }
];

const RefundPolicy = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Refund Policy | Ved Skill Verification Platform",
      "description": "Review refund eligibility, timelines, and payment policies for Ved Upskilling.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who qualifies for a refund?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A refund will only be processed if the Company fails to commence the batch within 45 days of the candidate's selected start date."
          }
        },
        {
          "@type": "Question",
          "name": "Are there non-refundable situations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All payments made toward our services are strictly non-refundable once enrollment is confirmed, except under the specific batch delay condition."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Refund Policy"
        description="Review refund eligibility, timelines, and payment policies."
        url="/refund-policy"
        schema={schema}
      />
      <LegalLayout
        title="Refund Policy"
        subtitle="Review refund eligibility, timelines, and payment policies."
        date="June 19, 2026"
        sections={refundSections}
      >
        <div className="space-y-16 text-gray-700 dark:text-white/70 font-light leading-relaxed">
          
          <section id="cancellation" className="scroll-mt-32">
            <ScrollReveal>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">1. Cancellation Policy</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl border-l-4 border-l-[#E6C875]">
                <h3 className="text-[#E6C875] font-semibold text-lg mb-2">Strict No-Cancellation Policy</h3>
                <p>
                  Once enrollment is confirmed, cancellations are not permitted under any circumstances. This policy is binding to ensure smooth operations and resource allocation.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="non-refundable" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">2. Non-Refundable Payments</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p>
                  All payments made toward our services, including the initial non-refundable enrollment fee and subsequent full payment, are completely non-refundable. Candidates are strongly advised to review their schedules and commitment levels before finalizing enrollment.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="exceptions" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">3. Exception for Refund</h2>
              <div className="bg-[#E6C875]/[0.05] border border-[#E6C875]/30 p-8 rounded-3xl backdrop-blur-xl">
                <p className="text-gray-900 dark:text-white font-medium mb-4">
                  A refund will only be processed under the following condition:
                </p>
                <p className="text-gray-700 dark:text-white/80">
                  If the Company fails to commence the batch within <strong>45 days</strong> of the candidate's selected start date. In such specific cases, a full refund of the paid amount will be issued to the original payment method.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="process" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">4. Refund Process</h2>
              <p className="mb-4">If you qualify for a refund under the exception clause (Section 3), the process is as follows:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Initiation:</strong> You must email <a href="mailto:support@vedupskilling.in" className="text-[#E6C875] hover:underline">support@vedupskilling.in</a> stating the delay of your batch beyond 45 days.
                </li>
                <li>
                  <strong>Verification:</strong> Our team will verify the batch commencement date against your enrollment records.
                </li>
                <li>
                  <strong>Processing:</strong> Approved refunds will be processed within 10-15 business days to the original mode of payment used during enrollment.
                </li>
              </ul>
            </ScrollReveal>
          </section>

        </div>
      </LegalLayout>
    </>
  );
};

export default RefundPolicy;
