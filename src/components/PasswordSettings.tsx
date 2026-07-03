"use client";

import { useState } from "react";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function PasswordSettings({ role }: { role: "admin" | "hr" }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/settings/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to update password.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-8 max-w-md shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-5 h-5 text-[#E6C875]" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E6C875]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E6C875]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-wider mb-2">Confirm New Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E6C875]"
          />
        </div>

        {status === "error" && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {message}
          </div>
        )}

        {status === "success" && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#E6C875] hover:bg-[#d4b55e] text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
        >
          {status === "loading" ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
