import ScrollReveal from "@/components/ScrollReveal";

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Terms of Service.</h1>
            <p className="text-2xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
              The foundational agreements governing our engagement.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-12 text-lg text-gray-600 dark:text-white/70 font-light leading-relaxed bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 md:p-16 rounded-[3rem] backdrop-blur-2xl shadow-xl dark:shadow-none">
            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or utilizing Ved Upskilling ("the Platform"), you are explicitly agreeing to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you are restricted from accessing our services and curriculum.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">2. Educational Services</h2>
              <p className="mb-4">
                We provide elite, rigorous technical education programs. The specific parameters, requirements, and deliverables for each program are outlined on their respective pages. We reserve the absolute right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">3. User Obligations</h2>
              <p className="mb-4">
                You agree to utilize the Platform only for lawful purposes. You are strictly prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Attempting unauthorized access to our infrastructure.</li>
                <li>Distributing our proprietary curriculum without explicit permission.</li>
                <li>Engaging in disruptive behaviors within the community.</li>
                <li>Submitting fraudulent data during enrollment.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">4. Intellectual Property</h2>
              <p className="mb-4">
                All content, curriculum, architectures, and intellectual property found on the Platform are exclusively owned by Ved Upskilling. You are granted a limited, non-exclusive license to access the materials for your personal, non-commercial educational use.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">5. Limitation of Liability</h2>
              <p className="mb-4">
                Ved Upskilling shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the Platform. Our total liability is limited to the amount paid by you for the specific services in question.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
