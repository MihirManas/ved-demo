"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/domains', label: 'Domains' },
    { href: '/verify', label: 'Verifier' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#1F3145]/60 backdrop-blur-2xl border-b border-gray-200 dark:border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="flex flex-col">
              <span id="navbar-logo" className="text-[34px] font-medium tracking-tight text-gray-900 dark:text-white flex items-center">
                <img src="/favicon.svg" alt="Ved Upskilling Logo" className="h-[65px] w-auto mr-[0.055em] object-contain" />
                Ved Upskilling
              </span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith('/domains') && link.href === '/domains');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm uppercase tracking-[0.15em] transition-all duration-500 ease-out ${isActive ? 'text-[#E6C875] font-semibold' : 'text-gray-500 dark:text-white/60 hover:text-[#1F3145] dark:hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/apply"
              className="bg-[#1F3145] dark:bg-white hover:bg-[#E6C875] dark:hover:bg-[#E6C875] text-white dark:text-[#1F3145] px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-500 ease-out shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[#E6C875]/30">
              Apply
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-white/80 transition-colors">
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white/95 dark:bg-[#1F3145]/95 backdrop-blur-3xl border-b border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith('/domains') && link.href === '/domains');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left text-xl tracking-wide ${isActive ? 'text-[#E6C875]' : 'text-gray-700 dark:text-white/70'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  );
}
