"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-white/5 pt-32 pb-16 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-2">
            <span className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center mb-10">
              Ved<span className="text-[#E6C875] mx-2 font-light">/</span>Upskilling
            </span>
            <p className="text-gray-600 dark:text-white/50 max-w-lg font-light text-xl leading-relaxed">
              Elevating careers through precision engineering, rigorous curriculums, and real-world execution. The apex of technical education.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Architecture</h4>
            <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link href="/about">About Mission</Link></li>
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link href="/domains">Elite Domains</Link></li>
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link href="/verify">Credential Verifier</Link></li>
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link href="/contact">Initiate Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Legal Ledger</h4>
            <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Privacy Protocol</li>
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Terms of Service</li>
              <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Refund Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-white/30 font-bold tracking-[0.2em] uppercase">
          <p>© 2026 Ved Upskilling. All Rights Reserved.</p>
          <p className="mt-6 md:mt-0">Engineered for Elite Performance.</p>
        </div>
      </div>
    </footer>
  );
}
