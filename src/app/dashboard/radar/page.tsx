"use client";

import React, { useState, useEffect } from "react";
import { Radio, AlertTriangle, Cpu, Terminal, Play, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RadarTarget {
  id: string;
  angle: number;
  distance: number; // radius pct
  name: string;
  type: string;
  ip: string;
  detected: string;
}

const defaultTargets: RadarTarget[] = [
  { id: "T-01", angle: 45, distance: 60, name: "Proxy Spammer Node", type: "Spam Engine", ip: "203.0.113.11", detected: "2s ago" },
  { id: "T-02", angle: 160, distance: 40, name: "Webhook Threat Probe", type: "Webhook Exploit", ip: "198.51.100.42", detected: "5s ago" },
  { id: "T-03", angle: 280, distance: 80, name: "Executive Hijack Key", type: "Anti-Nuke Trigger", ip: "185.220.101.4", detected: "10s ago" }
];

export default function AnomalyRadar() {
  const [activeRadar, setActiveRadar] = useState(true);
  const [targets, setTargets] = useState<RadarTarget[]>(defaultTargets);
  const [sweepCount, setSweepCount] = useState(24);

  useEffect(() => {
    if (!activeRadar) return;

    const interval = setInterval(() => {
      // Append or modify a target slightly to simulate scanning
      setTargets(prev => {
        const withRotated = prev.map(t => ({
          ...t,
          angle: (t.angle + 10) % 360
        }));
        
        // Randomly add a target
        if (Math.random() > 0.6) {
          const names = ["DDoS Botnet Node", "Direct SQL Injector", "Quarantined Spammer", "Credentials Scraper"];
          const types = ["Rate Limit Abuse", "Web Attack Probe", "Security Violation", "Dark Web Leak Match"];
          const newTarget: RadarTarget = {
            id: `T-0${withRotated.length + 1}`,
            angle: Math.floor(Math.random() * 360),
            distance: Math.floor(Math.random() * 60) + 20,
            name: names[Math.floor(Math.random() * names.length)],
            type: types[Math.floor(Math.random() * types.length)],
            ip: `198.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
            detected: "Just now"
          };
          return [...withRotated.slice(0, 3), newTarget];
        }
        return withRotated;
      });

      setSweepCount(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeRadar]);

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <Radio className="h-6 w-6 text-cyber-green animate-pulse" />
            <span>ANOMALY DETECTION RADAR</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Rotational wave sweep scanner targeting localized security anomalies</p>
        </div>

        <button
          onClick={() => setActiveRadar(!activeRadar)}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider rounded-lg transition-all border ${
            activeRadar 
              ? "bg-red-950/20 border-red-500/30 text-red-400 hover:bg-red-950/40" 
              : "bg-cyan-950/20 border-cyber-blue/30 text-cyber-blue hover:bg-cyan-950/40"
          } cursor-pointer`}
        >
          {activeRadar ? (
            <>
              <Square className="h-4 w-4" /> STOP SWEEP SCANNER
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> ENGAGE SWEEP SCANNER
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Scanner Dial Card */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/85 lg:col-span-2 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          
          {/* Radar Circles Container */}
          <div className="relative h-72 w-72 md:h-80 md:w-80 rounded-full border border-cyber-green/20 flex items-center justify-center bg-black/40">
            {/* Inner rings */}
            <div className="absolute h-3/4 w-3/4 rounded-full border border-cyber-green/10" />
            <div className="absolute h-1/2 w-1/2 rounded-full border border-cyber-green/10 border-dashed" />
            <div className="absolute h-1/4 w-1/4 rounded-full border border-cyber-green/10" />
            
            {/* Axis lines */}
            <div className="absolute w-full h-[1px] bg-cyber-green/10" />
            <div className="absolute h-full w-[1px] bg-cyber-green/10" />

            {/* Sweep sweeping line */}
            {activeRadar && (
              <div 
                className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none"
                style={{ 
                  background: "conic-gradient(from 0deg, rgba(16,185,129,0.15) 0deg, transparent 90deg)"
                }}
              />
            )}

            {/* Target dots */}
            {activeRadar && targets.map((t) => {
              // Calculate x, y based on distance and angle
              const r = t.distance * 1.5; // Scale radius
              const rad = (t.angle * Math.PI) / 180;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;

              return (
                <div
                  key={t.id}
                  className="absolute h-3.5 w-3.5 rounded-full bg-cyber-red shadow-[0_0_10px_rgba(239,68,68,0.8)] border border-white animate-pulse cursor-pointer group"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  {/* Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-black border border-red-500/30 text-red-400 font-mono text-[9px] px-2 py-0.5 rounded shadow-xl whitespace-nowrap z-25">
                    {t.name} [{t.ip}]
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-6 text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyber-green animate-ping" />
            <span>SWEEP SEQUENCE: 0x{sweepCount.toString(16).toUpperCase()}</span>
          </div>
        </div>

        {/* Target list logs sidebar */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4 flex flex-col h-[420px]">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
            Active Scanned Targets ({targets.length})
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <AnimatePresence initial={false}>
              {targets.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-lg bg-white/5 border border-red-500/20 text-xs font-mono space-y-1 relative"
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-red-400 font-bold uppercase">{t.type}</span>
                    <span className="text-gray-500">{t.detected}</span>
                  </div>
                  <p className="text-gray-300 font-semibold">{t.name}</p>
                  <p className="text-[10px] text-gray-500">Node IP Address: {t.ip}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
