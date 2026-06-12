"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, Mail, Lock, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulated credential check
    setTimeout(() => {
      if (email && password) {
        // Redirect to 2FA verification page
        router.push("/two-factor");
      } else {
        setError("Please enter a valid operator email and passcode.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-200 flex items-center justify-center p-4">
      <CyberGrid />
      <ParticlesBg />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-panel rounded-2xl relative z-10 space-y-6"
      >
        {/* LOGO */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Cpu className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-white font-mono">
            ESTABLISH LINK <span className="text-cyber-blue">X</span>
          </h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Operator Console Sign In</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Operator Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@systemx.com"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-cyber-blue text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Passcode</label>
              <Link href="/forgot-password" className="text-[10px] font-mono text-cyber-blue hover:underline">
                FORGOT KEY?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-cyber-blue text-white"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-cyan-500 rounded border-white/10 bg-black/40"
            />
            <label htmlFor="remember" className="text-xs text-gray-400 font-mono cursor-pointer select-none">
              REMEMBER NODE LINK
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-mono text-xs font-semibold tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            {loading ? "ESTABLISHING..." : (
              <>
                AUTHENTICATE <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-xs text-gray-500 font-mono">NEW OPERATOR? </span>
          <Link href="/register" className="text-xs text-cyber-blue font-mono hover:underline font-bold">
            REGISTER INTERFACE
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
