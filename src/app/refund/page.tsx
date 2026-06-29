import ScrollReveal from "@/components/ScrollReveal";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Refund Policy.</h1>
            <p className="text-2xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
              Clear, uncompromising guidelines on financial commitments.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-12 text-lg text-gray-600 dark:text-white/70 font-light leading-relaxed bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 md:p-16 rounded-[3rem] backdrop-blur-2xl shadow-xl dark:shadow-none">
            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">1. The Principle of Commitment</h2>
              <p className="mb-4">
                Ved Upskilling is designed for the dedicated professional. We require absolute commitment from our cohorts. Consequently, our refund architecture is strict and definitively structured to ensure we allocate resources only to those fully engaged in the process.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">2. Pre-Commencement Protocol</h2>
              <p className="mb-4">
                If you elect to withdraw before the official commencement of your enrolled program, you are entitled to a full refund, minus a processing fee to cover administrative overhead. This request must be formally submitted through our designated channels at least 72 hours prior to the start date.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">3. Post-Commencement Protocol</h2>
              <p className="mb-4">
                Once a program officially begins and intellectual property is accessed, the financial commitment becomes final. We do not issue refunds for partial completion, change of mind, or failure to meet the rigorous demands of the curriculum. The investment is non-reversible.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">4. Exceptional Circumstances</h2>
              <p className="mb-4">
                We acknowledge that extreme, unforeseeable circumstances occur. In cases of severe medical emergencies or equivalent incapacitating events, we may review requests for deferred enrollment or partial refunds on a strictly case-by-case basis. These require substantial documentation and remain entirely at the discretion of the administration.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">5. Execution Timeline</h2>
              <p className="mb-4">
                Approved refunds are executed within 10-15 business days. The funds will be routed back through the original payment architecture utilized during enrollment.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
