import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyProtocol() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Privacy Protocol.</h1>
            <p className="text-2xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
              We respect your privacy as relentlessly as we engineer our systems.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-12 text-lg text-gray-600 dark:text-white/70 font-light leading-relaxed bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 md:p-16 rounded-[3rem] backdrop-blur-2xl shadow-xl dark:shadow-none">
            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">1. Data Collection Architecture</h2>
              <p className="mb-4">
                When you engage with Ved Upskilling, we securely collect necessary operational data to facilitate your educational journey. This includes your name, contact coordinates, technical background, and payment metrics. We may also gather telemetry data regarding your interaction with our platform to optimize the learning experience.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">2. Utilization of Information</h2>
              <p className="mb-4">
                The data we collect is fundamentally deployed to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Execute and elevate our educational services.</li>
                <li>Process your financial transactions securely.</li>
                <li>Communicate critical updates, curriculum changes, and opportunities.</li>
                <li>Analyze system performance and user engagement patterns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">3. Security Infrastructure</h2>
              <p className="mb-4">
                We implement elite-tier security measures to protect your personal information from unauthorized access or disclosure. However, no data transmission architecture over the Internet or electronic storage is completely impenetrable. We continuously update our security protocols to maintain the highest standards.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">4. Third-Party Integrations</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your identifiable data to outside parties, excluding trusted third parties who assist in operating our infrastructure, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">5. Your Control</h2>
              <p className="mb-4">
                You possess full rights to access, correct, or request the deletion of your personal data. Should you need to execute any of these actions, initiate contact with our administration team.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
