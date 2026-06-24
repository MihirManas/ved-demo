import React from 'react';
import LegalLayout from '../layouts/LegalLayout';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const termsSections = [
  { id: 'services-offered', title: '1. Services Offered' },
  { id: 'enrollment', title: '2. Enrollment and Fees' },
  { id: 'cancellation', title: '3. Cancellation Policy' },
  { id: 'refund', title: '4. Refund Policy' },
  { id: 'obligations', title: '5. Candidate Obligations' },
  { id: 'placement', title: '6. Placement Assistance' },
  { id: 'intellectual-property', title: '7. Intellectual Property' },
  { id: 'liability', title: '8. Limitation of Liability' },
  { id: 'termination', title: '9. Termination of Services' },
  { id: 'governing-law', title: '10. Governing Law' },
  { id: 'contact', title: '11. Contact Information' }
];

const TermsOfService = () => {
  const schema = [{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | Ved Skill Verification Platform",
    "description": "Understand the rules governing your use of Ved's skill-verification platform.",
    "publisher": {
      "@type": "Organization",
      "name": "Ved Upskilling"
    }
  }];

  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Understand the rules governing your use of Ved's skill-verification platform."
        url="/terms-of-service"
        schema={schema}
      />
      <LegalLayout
        title="Terms of Service"
        subtitle="Understand the rules governing your use of Ved's skill-verification platform."
        date="June 19, 2026"
        sections={termsSections}
      >
        <div className="space-y-16 text-gray-700 dark:text-white/70 font-light leading-relaxed">
          
          <section>
            <ScrollReveal>
              <p className="text-xl mb-8">
                Welcome to Ved Upskilling ("Company", "we", "our", or "us"). By enrolling in our programs or using our services, you agree to these Terms and Conditions ("Terms"). Please read them carefully before proceeding.
              </p>
            </ScrollReveal>
          </section>

          <section id="services-offered" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">1. Services Offered</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p>
                  Ved Upskilling specializes in offering skill development programs, including courses, training sessions, internships, project work, and placement assistance for graduates, working professionals, and candidates seeking to enhance their career opportunities. All services are subject to availability and may be modified at our discretion.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="enrollment" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">2. Enrollment and Fee Structure</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-[#E6C875] font-semibold text-lg mb-2">2.1 Enrollment Fee</h3>
                  <p>Candidates are required to pay a non-refundable enrollment fee depending on the selected service.</p>
                </div>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-[#E6C875] font-semibold text-lg mb-2">2.2 Full Payment</h3>
                  <p>The remaining service fee must be fully paid within 10-15 days of enrollment. Failure to adhere to this timeline will result in forfeiture of the enrollment fee and termination of access to the services.</p>
                </div>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-[#E6C875] font-semibold text-lg mb-2">2.3 Payment Modes</h3>
                  <p>Payment can be made via online transfers, UPI, bank deposits, or other methods specified by Ved Upskilling.</p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <section id="cancellation" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">3. Cancellation Policy</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl border-l-4 border-l-[#E6C875]">
                <p>
                  <strong>Strict No-Cancellation Policy:</strong> Once enrollment is confirmed, cancellations are not permitted under any circumstances. This policy is binding to ensure smooth operations and resource allocation.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="refund" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">4. Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Non-Refundable Payments:</strong> All payments made toward our services are non-refundable.</li>
                <li><strong>Exception for Refund:</strong> A refund will only be processed if the Company fails to commence the batch within 45 days of the candidate's selected start date. In such cases, a full refund of the paid amount will be issued.</li>
              </ul>
            </ScrollReveal>
          </section>

          <section id="obligations" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">5. Candidate Obligations</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Accurate Information</h3>
                  <p>Candidates must provide truthful and accurate details during enrollment and promptly update any changes.</p>
                </div>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Compliance</h3>
                  <p>Candidates must comply with all rules, schedules, and instructions provided by Ved Upskilling.</p>
                </div>
                <div className="md:col-span-2 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Active Participation</h3>
                  <p>Responsibility lies with the candidate to actively participate in the program to achieve desired outcomes. The Company is not liable for lack of effort or participation.</p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <section id="placement" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">6. Placement Assistance</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Support, Not Guarantee:</strong> Placement assistance aims to support candidates in securing opportunities but does not guarantee job placement.</li>
                <li><strong>Eligibility Requirements:</strong> Candidates must meet specific prerequisites and actively engage in placement activities to qualify for placement assistance.</li>
              </ul>
            </ScrollReveal>
          </section>

          <section id="intellectual-property" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">7. Intellectual Property Rights</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p>
                  All materials, course content, and resources provided by Ved Upskilling are proprietary and for personal educational use only. Unauthorized reproduction, distribution, or commercial use of these materials is strictly prohibited.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="liability" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">8. Limitation of Liability</h2>
              <p className="mb-4">Ved Upskilling will not be held liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A candidate's inability to utilize the services due to personal reasons.</li>
                <li>Indirect, incidental, or consequential damages arising from the use of our services.</li>
                <li>Any outcomes dependent on external factors beyond the Company's control.</li>
              </ul>
            </ScrollReveal>
          </section>

          <section id="termination" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">9. Termination of Services</h2>
              <p className="mb-4">Ved Upskilling reserves the right to suspend or terminate services for candidates who:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate these Terms.</li>
                <li>Engage in fraudulent, unethical, or disruptive behavior.</li>
              </ul>
            </ScrollReveal>
          </section>

          <section id="governing-law" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">10. Governing Law and Jurisdiction</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p>
                  These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="contact" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">11. Contact Information</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p className="mb-4">For any queries or concerns, please reach out to us:</p>
                <p className="flex items-center gap-3 mb-2">
                  <strong className="text-[#E6C875]">Website:</strong> 
                  <a href="https://vedupskilling.in/" className="hover:text-white transition-colors">www.vedupskilling.in</a>
                </p>
                <p className="flex items-center gap-3">
                  <strong className="text-[#E6C875]">Email:</strong> 
                  <a href="mailto:support@vedupskilling.in" className="hover:text-white transition-colors">support@vedupskilling.in</a>
                </p>
              </div>
            </ScrollReveal>
          </section>

        </div>
      </LegalLayout>
    </>
  );
};

export default TermsOfService;
