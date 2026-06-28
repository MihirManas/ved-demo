import { Network } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto text-center mb-40">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">Redefining Learning.</h1>
            <p className="text-3xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
              We break barriers to engineer your success. A singular focus on bridging the chasm between theoretical academia and aggressive industry demands.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="w-full h-[500px] rounded-[4rem] overflow-hidden mb-40 border border-gray-200 dark:border-white/[0.05] relative bg-white dark:bg-white/[0.02] backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E6C875]/20 dark:from-[#E6C875]/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:bg-[#E6C875]/30 dark:group-hover:bg-[#E6C875]/15 transition-colors duration-1000"></div>

            <div className="w-32 h-32 mb-10 rounded-full border border-[#E6C875]/50 dark:border-[#E6C875]/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-[#E6C875]/30 dark:border-[#E6C875]/10 animate-ping" style={{ animationDuration: '3s' }}></div>
              <Network className="text-[#E6C875] w-12 h-12" strokeWidth={1} />
            </div>

            <h3 className="text-5xl text-gray-900 dark:text-white font-medium mb-6 relative z-10 tracking-tight">The Ved Ecosystem</h3>
            <p className="text-gray-600 dark:text-white/50 text-2xl font-light max-w-2xl relative z-10 leading-relaxed">An uncompromising environment where theory is aggressively tested against reality.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-40">
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
              <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Mission.</h3>
              <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-2xl">
                Blending profound innovation with elite industry expertise. We craft an educational ecosystem that transforms raw potential into executing professionals capable of building highly scalable infrastructure.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
              <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Vision.</h3>
              <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-2xl">
                Universal access to world-class, rigorous tech education. Making mastery deeply engaging and undeniably impactful for the dedicated learner. We completely reject mediocrity.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100}>
          <div className="border-t border-gray-200 dark:border-white/5 pt-32 text-center">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-24">The Elite Faculty.</h2>
            <div className="grid md:grid-cols-3 gap-16">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border border-gray-200 dark:border-white/[0.05] mb-10 relative bg-gradient-to-br from-gray-50 dark:from-white/[0.02] to-gray-100 dark:to-white/[0.05] flex items-center justify-center backdrop-blur-2xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-[#E6C875]/50 dark:group-hover:border-[#E6C875]/30 transition-all duration-700">
                    <div className="absolute inset-0 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <span className="text-5xl text-gray-300 dark:text-white/20 font-light group-hover:text-[#E6C875] transition-colors duration-700">0{item}</span>
                  </div>
                  <h4 className="text-3xl font-medium text-gray-900 dark:text-white mb-4">Senior Architect</h4>
                  <p className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6">Ex-FAANG</p>
                  <p className="text-gray-600 dark:text-white/50 font-light text-lg leading-relaxed max-w-xs mx-auto">Specializing in high-throughput systems and advanced algorithmic design.</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
