import React, { useState } from 'react';
import { ShieldCheck, Award, ChevronRight, Code, MapPin, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { verifyCertificate } from '../services/verifierService';

const VerifierView = () => {
  const [state, setState] = useState('idle'); // idle, loading, verified, review, success
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setState('loading');
    setError('');
    verifyCertificate(certId)
      .then((data) => {
        setProfile(data);
        setState('verified');
      })
      .catch((err) => {
        setError(err.message);
        setState('idle');
      });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center animate-in fade-in duration-1000 ease-out">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">

        {state === 'idle' || state === 'loading' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 lg:p-24 backdrop-blur-3xl relative overflow-hidden text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#E6C875]/10 rounded-full blur-[150px] pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex justify-center items-center w-28 h-28 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-12 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                  <ShieldCheck size={50} strokeWidth={1} className={state === 'loading' ? 'text-[#E6C875] animate-pulse' : 'text-[#E6C875]'} />
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">
                  {state === 'loading' ? 'Verifying Ledger...' : 'Verify Protocol.'}
                </h2>
                <p className="text-gray-600 dark:text-white/60 mb-16 max-w-2xl mx-auto font-light text-lg sm:text-xl md:text-2xl leading-relaxed">
                  Confirm cryptographic authenticity. Used by 85+ tech recruiters globally to bypass technical screening rounds.
                </p>

                <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleVerify}>
                  <div>
                    <input
                      type="text"
                      value={certId}
                      onChange={(e) => setCertId(e.target.value)}
                      disabled={state === 'loading'}
                      placeholder="e.g. VED-2026-AI-001"
                      className="w-full bg-gray-50 dark:bg-black/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-6 py-5 sm:px-10 sm:py-8 text-center text-base sm:text-xl focus:outline-none focus:border-[#E6C875] dark:focus:border-[#E6C875] transition-all duration-500 font-light tracking-[0.2em] placeholder:text-gray-400 dark:placeholder:text-white/20 shadow-inner"
                    />
                  </div>

                  {error && <p className="text-red-500 font-bold tracking-widest text-sm uppercase animate-in fade-in">{error}</p>}

                  <button disabled={state === 'loading'} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-base sm:text-lg rounded-[2rem] px-6 py-5 sm:px-10 sm:py-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:hover:scale-100">
                    {state === 'loading' ? 'Querying Blockchain...' : 'Consult Ledger'}
                  </button>
                </form>

                <div className="mt-20 flex items-center justify-center space-x-3 text-sm text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase font-bold">
                  <ShieldCheck size={20} />
                  <span>Secured by Blockchain Validation</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : state === 'verified' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 backdrop-blur-3xl relative overflow-hidden shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6C875]/10 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="text-center mb-12 relative z-10 border-b border-gray-200 dark:border-white/10 pb-12">
                <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-8 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                  <Award size={36} strokeWidth={1.5} className="text-[#E6C875]" />
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Cryptographic Identity Verified.</h2>
                <p className="text-[#E6C875] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">Ledger Match Confirmed</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
                <div>
                  <h4 className="text-gray-500 dark:text-white/50 text-sm uppercase tracking-[0.2em] font-bold mb-8">Alumni Profile</h4>
                  <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-2">{profile.name}</h3>
                  <p className="text-xl text-gray-600 dark:text-white/70 font-light mb-8">{profile.position}</p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center space-x-4">
                      <Code className="text-[#E6C875]" size={20} />
                      <span className="text-gray-700 dark:text-white/80 font-medium">{profile.stack}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="text-[#E6C875]" size={20} />
                      <span className="text-gray-700 dark:text-white/80 font-medium">Issued: {profile.date}</span>
                    </div>
                  </div>

                  <button onClick={() => setState('review')} className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-500 shadow-xl w-full md:w-auto">
                    Write Domain Review
                  </button>
                </div>

                {/* Digital Certificate Visual */}
                <div className="bg-gradient-to-br from-gray-50 dark:from-white/[0.03] to-gray-200 dark:to-transparent border border-gray-300 dark:border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-2 border border-[#E6C875]/30 rounded-2xl pointer-events-none"></div>
                  <div className="text-center pt-6 pb-10">
                    <h5 className="text-[#E6C875] tracking-[0.4em] uppercase text-xs font-bold mb-6">Ved / Upskilling</h5>
                    <h3 className="text-2xl text-gray-900 dark:text-white font-medium mb-1">Certificate of Execution</h3>
                    <p className="text-gray-500 dark:text-white/50 text-[10px] tracking-widest uppercase mb-8">Blockchain Verified</p>

                    <h2 className="text-3xl text-[#B8860B] dark:text-[#E6C875] font-serif italic mb-6">{profile.name}</h2>

                    <div className="w-16 h-[1px] bg-[#E6C875]/50 mx-auto mb-6"></div>
                    <p className="text-gray-700 dark:text-white/80 text-sm max-w-[200px] mx-auto leading-relaxed">
                      Has successfully mastered the architecture and engineering of <br /><span className="font-bold">{profile.stack}</span>.
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-t border-gray-300 dark:border-white/10 pt-4 mt-4 px-2">
                    <span className="text-[9px] text-gray-400 dark:text-white/30 uppercase tracking-widest font-bold">ID: {profile.id}</span>
                    <ShieldCheck size={20} className="text-[#E6C875]/50" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : state === 'review' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 backdrop-blur-3xl relative shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <button onClick={() => setState('verified')} className="text-gray-500 dark:text-white/50 hover:text-[#E6C875] uppercase tracking-widest text-xs font-bold mb-10 flex items-center transition-colors">
                <ChevronRight size={16} className="rotate-180 mr-2" /> Back to Certificate
              </button>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Post Execution Review.</h2>
              <p className="text-gray-600 dark:text-white/60 mb-12 font-light text-base sm:text-xl">Share your experience mastering the <span className="font-bold text-[#E6C875]">{profile.stack}</span> architecture.</p>

              <form className="space-y-8" onSubmit={handleReviewSubmit}>
                <div>
                  <label className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-4 block">Current Position</label>
                  <input type="text" defaultValue={profile.position} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-4 block">Execution Review</label>
                  <textarea rows="5" placeholder="Detail your learning trajectory, the mentorship quality, and your ultimate placement outcome..." className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light resize-none"></textarea>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-lg rounded-2xl px-8 py-6 mt-4 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-500 shadow-xl">
                  Publish to Public Ledger
                </button>
              </form>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-16 lg:p-24 backdrop-blur-3xl text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="inline-flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-10 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                <Star size={40} strokeWidth={1.5} className="text-[#E6C875]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Review Published.</h2>
              <p className="text-gray-600 dark:text-white/60 mb-12 font-light text-lg sm:text-2xl max-w-xl mx-auto">Your execution review has been successfully broadcast to the global alumni network.</p>
              <button onClick={() => setState('verified')} className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-500">
                Return to Certificate
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default VerifierView;
