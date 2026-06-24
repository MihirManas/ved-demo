import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useTheme } from './hooks/useTheme';
import { styles } from './utils/styles';

import ParticleCanvas from './components/ParticleCanvas';
import BootSequence from './components/BootSequence';
import FloatingActionButton from './components/FloatingActionButton';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

import HomeView from './pages/HomeView';
import CoursesView from './pages/CoursesView';
import CourseDetailView from './pages/CourseDetailView';
import CourseLandingView from './pages/CourseLandingView';
import AboutView from './pages/AboutView';
import VerifierView from './pages/VerifierView';
import ApplyView from './pages/ApplyView';
import ContactView from './pages/ContactView';
import FAQView from './pages/FAQView';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-[#E6C875]/30 selection:text-[#E6C875] overflow-x-clip transition-colors duration-1000">
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} theme={theme} />}
      {/* Sunrise Overlay Gradient */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/10 via-[#F8F9FA]/50 to-white/80 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/5 via-black to-black/80 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      />

      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* GLOBAL PARTICLES BACKGROUND */}
      <ParticleCanvas key={location.pathname} theme={theme} />

      <Navbar theme={theme} toggleTheme={toggleTheme} bootComplete={bootComplete} />

      <main className="relative z-10 pt-24">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/courses" element={<CoursesView />} />
          <Route path="/course/:id" element={<CourseDetailView />} />
          <Route path="/domains/:slug" element={<CourseLandingView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/verify" element={<VerifierView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/apply" element={<ApplyView />} />
          <Route path="/faq" element={<FAQView />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Action Protocol */}
      <FloatingActionButton />
    </div>
  );
}
