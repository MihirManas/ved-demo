import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Instagram, Linkedin, User, Plus } from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <MessageCircle size={20} strokeWidth={1.5} />, label: "WhatsApp", url: "https://api.whatsapp.com/send/?phone=916361233567&text&type=phone_number&app_absent=0" },
    { icon: <Phone size={20} strokeWidth={1.5} />, label: "Call Us", url: "tel:+916361233567" },
    { icon: <Mail size={20} strokeWidth={1.5} />, label: "Mail Support", url: "mailto:Support@vedupskilling.in" },
    { icon: <MapPin size={20} strokeWidth={1.5} />, label: "Location", url: "https://maps.app.goo.gl/REWfAk8Db6KpdT5BA" },
    { icon: <Instagram size={20} strokeWidth={1.5} />, label: "Instagram", url: "https://www.instagram.com/vedupskilling/" },
    { icon: <Linkedin size={20} strokeWidth={1.5} />, label: "LinkedIn", url: "https://www.linkedin.com/company/vedupskilling/" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Founder Profile", url: "https://www.linkedin.com/in/rajesh-h-718010270/" },
  ];

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex flex-col items-end">
      {/* Menu Items */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-500 origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-end gap-4"
            style={{ transitionDelay: isOpen ? `${(menuItems.length - index) * 40}ms` : '0ms' }}
          >
            <span className="bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:text-[#E6C875] dark:hover:text-[#E6C875] hover:scale-110 hover:border-[#E6C875]/50 transition-all duration-300">
              {item.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Main Button */}
      <button 
        onClick={toggleMenu}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-black dark:bg-white/[0.05] backdrop-blur-2xl border border-gray-800 dark:border-white/10 hover:bg-gray-900 dark:hover:bg-[#E6C875]/10 hover:border-[#E6C875]/50 dark:hover:border-[#E6C875]/30 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 shadow-2xl text-white group focus:outline-none"
      >
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-[135deg]' : 'rotate-0'}`}>
          <Plus size={32} strokeWidth={1} className="group-hover:text-[#E6C875] transition-colors duration-300" />
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
