import React from 'react';
import LegalLayout from '../layouts/LegalLayout';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const privacySections = [
  { id: 'collection', title: '1. Information We Collect' },
  { id: 'dice-id', title: '2. DICE ID Blockchain Verification' },
  { id: 'usage', title: '3. How We Use Your Information' },
  { id: 'recruiter', title: '4. Recruiter Visibility' },
  { id: 'security', title: '5. Data Security' },
  { id: 'rights', title: '6. Your Rights' },
  { id: 'contact', title: '7. Contact Us' }
];

const PrivacyPolicy = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy | Ved Skill Verification Platform",
      "description": "Learn how Ved collects, protects, and processes your information.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What data does Ved collect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We collect your technical portfolio data, project submissions, github repository metrics, and basic identifying information required to verify your engineering competence."
          }
        },
        {
          "@type": "Question",
          "name": "How does Ved protect personal information?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your skill proofs are verified and stored using the DICE ID blockchain infrastructure. Standard PII is encrypted at rest using AES-256 and transmitted via TLS."
          }
        },
        {
          "@type": "Question",
          "name": "Can users request deletion?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can request full account and PII deletion by contacting our privacy team. Note that blockchain verification hashes are immutable."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Protocol"
        description="Learn how Ved collects, protects, and processes your information."
        url="/privacy-policy"
        schema={schema}
      />
      <LegalLayout
        title="Privacy Protocol"
        subtitle="Learn how Ved collects, protects, and processes your information in the context of skill verification."
        date="June 19, 2026"
        sections={privacySections}
      >
        <div className="space-y-16 text-gray-700 dark:text-white/70 font-light leading-relaxed">
          
          <section id="collection" className="scroll-mt-32">
            <ScrollReveal>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">1. Information We Collect</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p className="mb-4">To effectively verify your engineering competence, we collect specific data points:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identity Data:</strong> Name, professional email, and academic institutional affiliations.</li>
                  <li><strong>Portfolio Data:</strong> GitHub repository URLs, commit history, pull request metadata, and deployment URLs.</li>
                  <li><strong>Verification Artifacts:</strong> Submitted project code, architecture diagrams, and technical write-ups.</li>
                  <li><strong>Usage Data:</strong> How you interact with the Ved Upskilling dashboard, time spent on modules, and assessment completion rates.</li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          <section id="dice-id" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">2. DICE ID Blockchain Verification</h2>
              <div className="bg-[#E6C875]/[0.05] border border-[#E6C875]/30 p-8 rounded-3xl backdrop-blur-xl border-l-4 border-l-[#E6C875]">
                <p className="text-gray-900 dark:text-white font-medium mb-2">Cryptographic Identity</p>
                <p>
                  Ved utilizes the DICE ID blockchain protocol to issue verifiable, tamper-proof credentials. When you complete a portfolio project, an immutable cryptographic hash representing your achievement is minted. This ensures that recruiters can trust the authenticity of your skills without requiring traditional academic transcripts.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section id="usage" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">3. How We Use Your Information</h2>
              <p className="mb-4">Your data is strictly utilized to advance your employability:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Skill Assessment:</strong> To evaluate and grade your technical portfolio submissions.</li>
                <li><strong>Credential Minting:</strong> To generate your unique DICE ID blockchain certificates.</li>
                <li><strong>Platform Optimization:</strong> To analyze learning patterns and improve our technical curriculum.</li>
              </ul>
            </ScrollReveal>
          </section>

          <section id="recruiter" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">4. Recruiter Visibility & Sharing</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Opt-in Hiring Network</h3>
                <p className="mb-4">
                  Ved acts as a bridge between elite engineering talent and top-tier tech companies. We do not sell your personal data to third-party marketers. Your data is shared under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your verified portfolio profile is routed to active engineering managers and recruiters within our trusted network.</li>
                  <li>You maintain control over your profile visibility toggle within the Portfolio Engine dashboard.</li>
                  <li>Contact information is only released to a recruiter when there is a mutual match or direct inbound interest.</li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          <section id="security" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">5. Data Security</h2>
              <p>
                We implement enterprise-grade security measures to protect your information. Personally Identifiable Information (PII) is encrypted at rest using AES-256 and transmitted via TLS 1.3 protocols. Access to our internal databases is strictly controlled via zero-trust architecture and multi-factor authentication.
              </p>
            </ScrollReveal>
          </section>

          <section id="rights" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">6. Your Rights</h2>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl">
                <p className="mb-4">As a user, you retain complete rights over your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Right to Access:</strong> You can export your entire portfolio history and data payload at any time.</li>
                  <li><strong>Right to Erasure:</strong> You may request the deletion of your account and PII. Please note that while your profile will be removed, the cryptographic hashes minted on the DICE ID blockchain are inherently immutable and cannot be destroyed, though they will be permanently unlinked from your identity.</li>
                  <li><strong>Right to Rectification:</strong> You can update your information directly via the Portfolio Engine.</li>
                </ul>
              </div>
            </ScrollReveal>
          </section>

          <section id="contact" className="scroll-mt-32">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">7. Contact Us</h2>
              <p className="mb-4">For any privacy-related inquiries, data requests, or concerns, please contact our Data Protection Officer:</p>
              <p className="flex items-center gap-3">
                <strong className="text-[#E6C875]">Email:</strong> 
                <a href="mailto:privacy@vedupskilling.in" className="hover:text-white transition-colors">privacy@vedupskilling.in</a>
              </p>
            </ScrollReveal>
          </section>

        </div>
      </LegalLayout>
    </>
  );
};

export default PrivacyPolicy;
