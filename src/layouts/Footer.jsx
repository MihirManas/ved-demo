import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-white/5 pt-32 pb-16 relative z-10 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-5 gap-10 md:gap-16 mb-24">
        <div className="md:col-span-2">
          <span className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center mb-10">
            Ved<span className="text-[#E6C875] mx-2 font-light">/</span>Upskilling
          </span>
          <p className="text-gray-600 dark:text-white/50 max-w-lg font-light text-xl leading-relaxed">
            The cryptographic skill-verification layer for modern engineering hiring. Bypassing HR filters through verifiable project portfolios.
          </p>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Architecture</h4>
          <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/about">About Mission</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/courses">Elite Domains</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/verify">Credential Verifier</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/contact">Initiate Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Programs</h4>
          <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/domains/applied-data-science-ai">Data Science & AI</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/domains/full-stack-development">Full Stack Dev</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/domains/vlsi-design">VLSI Design</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/domains/embedded-systems">Embedded Systems</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Legal Ledger</h4>
          <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/faq">FAQ</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/privacy-policy">Privacy Protocol</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/terms-of-service">Terms of Service</Link></li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer"><Link to="/refund-policy">Refund Policy</Link></li>
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

export default Footer;
