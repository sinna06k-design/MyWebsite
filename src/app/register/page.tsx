"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, Mail, Lock, User, PlusCircle, Check } from "lucide-react";
import { motion } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";

export default function RegisterPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
          <div className="inline-flex p-3 rounded-xl bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <PlusCircle className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-white font-mono">
            DEPLOY CLIENT <span className="text-cyber-blue font-sans">X</span>
          </h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Register Security Cluster</p>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg text-center space-y-2">
            <Check className="h-8 w-8 mx-auto animate-bounce" />
            <p className="font-bold font-mono uppercase tracking-wider">CLUSTER SECURED</p>
            <p>Registration successful! Routing back to Operator Console...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Organization/Guild Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Nexus Esports"
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-cyber-blue text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Secure Admin Email</label>
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
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Create Security Passcode</label>
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

            {/* Checkbox agreed */}
            <div className="flex gap-2 items-start py-2">
              <input
                type="checkbox"
                required
                id="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-cyan-500 rounded border-white/10 bg-black/40"
              />
              <label htmlFor="agreed" className="text-[10px] text-gray-400 font-mono leading-relaxed cursor-pointer select-none">
                I ACKNOWLEDGE ALL INTRUSIONS DEFEATED BY SYSTEM X COMPLY WITH THE HOST NODE GENERAL DISCLOSURE POLICIES.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-semibold tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              {loading ? "CONFIGURING CLUSTER..." : "DEPLOY SECURITY SHIELD"}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <span className="text-xs text-gray-500 font-mono">LINK STABLISHED? </span>
          <Link href="/login" className="text-xs text-cyber-blue font-mono hover:underline font-bold">
            CONSOLE SIGN IN
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
