"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // Allow any 6-digit code or specific code to proceed
      if (code.length === 6) {
        router.push("/dashboard");
      } else {
        setError("Invalid token structure. Code must contain exactly 6 digits.");
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
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <ShieldCheck className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-white font-mono">
            TWO-FACTOR GATE
          </h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Verify Operator Signature</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-2 font-mono">
            <Lock className="h-4 w-4 shrink-0 animate-bounce" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-xs text-gray-400 leading-relaxed font-mono text-center">
            A temporary authenticator verification code has been dispatched. Enter the 6-digit token to clear the firewalls.
          </p>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block text-center">
              Enter Authenticator Code
            </label>
            <div className="relative max-w-xs mx-auto">
              <KeyRound className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-500" />
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-center tracking-[0.5em] font-mono text-xl outline-none focus:border-cyber-blue text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-mono text-xs font-semibold tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            {loading ? "CLEARING SECURITY MATRIX..." : (
              <>
                VERIFY SIGNATURE <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setCode("123456");
              setError("");
            }}
            className="text-xs text-cyber-blue font-mono hover:underline cursor-pointer"
          >
            Auto-Fill Demo Code (123456)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
