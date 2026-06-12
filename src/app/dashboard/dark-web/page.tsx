"use client";

import React, { useState } from "react";
import { EyeOff, Search, ShieldAlert, CheckCircle, Database, AlertCircle } from "lucide-react";
import { mockDarkWebLeaks, DarkWebLeak } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkWebMonitor() {
  const [query, setQuery] = useState("");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "clean" | "warning">("idle");
  const [leaks, setLeaks] = useState<DarkWebLeak[]>(mockDarkWebLeaks);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setScanState("scanning");

    setTimeout(() => {
      const q = query.toLowerCase();
      // Fictional logic triggers compromise warning on certain words, clean on others
      if (q.includes("admin") || q.includes("systemx") || q.includes("compromise")) {
        setScanState("warning");
      } else {
        setScanState("clean");
      }
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <EyeOff className="h-6 w-6 text-orange-500 text-glow-purple" />
            <span>DARK WEB CREDENTIAL MONITOR</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Simulates deep credentials database leak scans targeting corporate domains</p>
        </div>
      </div>

      {/* SCANNING CORE CONTROL */}
      <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/60 space-y-6">
        <div className="space-y-2">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest">Breach Database Search Gate</h3>
          <p className="text-xs text-gray-400 font-mono leading-normal">
            Query our aggregate dataset of breached forums, botnet dumps, and credential logs for leaked user credentials.
          </p>
        </div>

        <form onSubmit={handleScan} className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter operator email or corporate domain (e.g. admin@systemx.com)..."
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-xs outline-none focus:border-orange-500 text-white font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={scanState === "scanning"}
            className="px-6 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-mono text-xs font-semibold tracking-wider rounded-lg cursor-pointer transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            {scanState === "scanning" ? "CHECKING INDEX..." : "DEEP SEARCH"}
          </button>
        </form>

        {/* Scan Status viewport */}
        <AnimatePresence mode="wait">
          {scanState === "scanning" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-orange-950/10 border border-orange-500/20 rounded-xl flex items-center gap-3 text-xs font-mono text-orange-400 animate-pulse"
            >
              <Database className="h-5 w-5 animate-spin" />
              <span>Querying Redline & Stealer logs databases. Compiling hashes indices...</span>
            </motion.div>
          )}

          {scanState === "clean" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-xs font-mono text-emerald-400"
            >
              <CheckCircle className="h-5 w-5 animate-bounce" />
              <span>NO BREACHES DETECTED. Email signature '{query}' is currently secure in our logs.</span>
            </motion.div>
          )}

          {scanState === "warning" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-xs font-mono text-red-400"
            >
              <AlertCircle className="h-5 w-5 animate-bounce text-glow-red" />
              <span>🚨 COMPROMISE DETECTED. Found credentials match in leak record LEAK-102. Please trigger passcode resets immediately.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* COMPROMISED RECORDS LIST */}
      <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
        <div className="border-b border-white/5 pb-3">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5 text-red-500 animate-pulse" />
            <span>Simulated Leak Incidents Records</span>
          </h3>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {leaks.map((leak) => (
            <div key={leak.id} className="p-4 rounded-xl border border-white/5 bg-white/2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white uppercase">{leak.source}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded border font-bold uppercase ${
                    leak.riskScore === "High" ? "bg-red-950/20 border-red-500/30 text-red-400" : "bg-yellow-950/20 border-yellow-500/30 text-yellow-400"
                  }`}>
                    {leak.riskScore} Risk
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{leak.compromisedData}</p>
                <p className="text-[9px] text-gray-600">Dated: {leak.leakDate}</p>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                leak.status === "Active Alert" 
                  ? "bg-red-950/20 border-red-500/30 text-red-400 animate-pulse" 
                  : "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
              }`}>
                {leak.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
