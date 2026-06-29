"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Dashboard from "@/components/admin/Dashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if already authenticated in this session
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy secure password for now. In production, use a proper backend auth.
    if (password === "VedAdmin2026!") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black overflow-y-auto text-white">
        <Dashboard onLogout={() => {
          setIsAuthenticated(false);
          sessionStorage.removeItem("admin_auth");
        }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#E6C875] to-yellow-200 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(230,200,117,0.3)]">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-neutral-400 text-sm mt-2 text-center">
              Restricted Area. Enter credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6C875]/50 focus:border-[#E6C875] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {error && (
              <p className="text-red-400 text-sm text-center animate-pulse">
                Incorrect credentials.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#E6C875] hover:bg-[#d4b55e] text-black font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(230,200,117,0.2)] hover:shadow-[0_0_30px_rgba(230,200,117,0.4)]"
            >
              Verify & Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
