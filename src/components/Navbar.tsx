"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/domains', label: 'Domains' },
    { href: '/verify', label: 'Verifier' },
    { href: '/contact', label: 'Contact' }
  ];

  const currentTheme = mounted ? resolvedTheme : 'light';

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-b border-gray-200 dark:border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="flex flex-col">
              <span id="navbar-logo" className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center">
                Ved<span className="text-[#E6C875] mx-1 font-light">/</span>Upskilling
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
                  className={`text-sm uppercase tracking-[0.15em] transition-all duration-500 ease-out ${isActive ? 'text-[#E6C875] font-semibold' : 'text-gray-500 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}

            {mounted && (
              <button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors mr-2">
                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentTheme === 'dark' ? 'translate-y-10 opacity-0 -rotate-180' : 'translate-y-0 opacity-100 rotate-0'}`}>
                  <Sun size={20} className="text-[#E6C875]" />
                </div>
                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentTheme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-180'}`}>
                  <Moon size={20} className="text-gray-500 dark:text-white/80" />
                </div>
              </button>
            )}

            <Link
              href="/apply"
              className="bg-black dark:bg-white hover:bg-[#E6C875] dark:hover:bg-[#E6C875] text-white dark:text-black px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-500 ease-out shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[#E6C875]/30">
              Apply
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentTheme === 'dark' ? 'translate-y-10 opacity-0 -rotate-180' : 'translate-y-0 opacity-100 rotate-0'}`}>
                  <Sun size={24} className="text-[#E6C875]" />
                </div>
                <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentTheme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-180'}`}>
                  <Moon size={24} className="text-gray-500 dark:text-white/80" />
                </div>
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-white/80 transition-colors">
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-3xl border-b border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
