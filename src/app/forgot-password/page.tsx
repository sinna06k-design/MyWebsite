"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Mail, ShieldAlert, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
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
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue">
            <ShieldAlert className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-white font-mono">
            RECOVER CREDENTIALS
          </h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Reset System X Access Key</p>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg text-center space-y-2">
            <Check className="h-8 w-8 mx-auto animate-bounce" />
            <p className="font-bold font-mono uppercase tracking-wider">RESET CODES SENT</p>
            <p>We've dispatched security recovery codes to **{email}**. Please inspect your inbox or server logs.</p>
            <div className="pt-4">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> BACK TO LOG IN
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Provide your active operator email. The system will broadcast a cryptographic bypass token to reset your credentials.
            </p>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-mono text-xs font-semibold tracking-widest rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              {loading ? "TRANSMITTING..." : "GENERATE RECOVERY PAYLOAD"}
            </button>

            <div className="text-center pt-2">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> CANCEL CONNECTION
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
