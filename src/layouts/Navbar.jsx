import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../constants/navigation';
import ThemeToggle from '../components/ThemeToggle';

const Navbar = ({ theme, toggleTheme, bootComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNav = (id) => {
    const path = id === 'home' ? '/' : `/${id}`;
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-b border-gray-200 dark:border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="flex flex-col">
              <span id="navbar-logo" className={`text-3xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center ${bootComplete === false ? 'opacity-0' : 'opacity-100'}`}>
                Ved<span className="text-[#E6C875] mx-1 font-light">/</span>Upskilling
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-sm uppercase tracking-[0.15em] transition-all duration-500 ease-out ${(currentPath === `/${link.id}` || (currentPath === '/' && link.id === 'home') || (currentPath.startsWith('/course') && link.id === 'courses')) ? 'text-[#E6C875] font-semibold' : 'text-gray-500 dark:text-white/60 hover:text-black dark:hover:text-white'
                  }`}
              >
                {link.label}
              </button>
            ))}

            <div className="mr-2"><ThemeToggle theme={theme} toggleTheme={toggleTheme} size={20} /></div>

            <button
              onClick={() => handleNav('apply')}
              className="bg-black dark:bg-white hover:bg-[#E6C875] dark:hover:bg-[#E6C875] text-white dark:text-black px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-500 ease-out shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[#E6C875]/30">
              Apply
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} size={24} />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-white/80 transition-colors">
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-3xl border-b border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left text-xl tracking-wide ${(currentPath === `/${link.id}` || (currentPath === '/' && link.id === 'home') || (currentPath.startsWith('/course') && link.id === 'courses')) ? 'text-[#E6C875]' : 'text-gray-700 dark:text-white/70'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
