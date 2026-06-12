"use client";

import React, { useState, useEffect } from "react";
import { Globe, ShieldAlert, Cpu, AlertTriangle, RadioTower, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreatArc {
  id: string;
  source: string;
  srcName: string;
  target: string;
  dstName: string;
  protocol: string;
  severity: "critical" | "warning" | "info";
  time: string;
}

const cities = [
  { name: "San Francisco, USA", x: 150, y: 120 },
  { name: "Frankfurt, Germany", x: 480, y: 100 },
  { name: "Beijing, China", x: 780, y: 130 },
  { name: "Saint Petersburg, Russia", x: 550, y: 70 },
  { name: "London, UK", x: 440, y: 95 },
  { name: "Tokyo, Japan", x: 840, y: 140 },
  { name: "Sydney, Australia", x: 860, y: 320 },
  { name: "Sao Paulo, Brazil", x: 300, y: 280 },
  { name: "Cape Town, South Africa", x: 520, y: 310 }
];

const protocols = ["SQL Injection Probe", "DDoS Syn Flood", "API Authentication Brute Force", "Malicious Link Broadcast", "Webhook Spammer Node"];

export default function CyberMap() {
  const [activeAttacks, setActiveAttacks] = useState<ThreatArc[]>([]);
  const [nodesStats, setNodesStats] = useState({ online: 88, blockedToday: 4910, sensorLatency: 2 });

  useEffect(() => {
    // Spawn initial attacks
    const initial: ThreatArc[] = Array.from({ length: 3 }).map((_, idx) => generateAttack(idx.toString()));
    setActiveAttacks(initial);

    const interval = setInterval(() => {
      const newAttack = generateAttack(Date.now().toString());
      setActiveAttacks(prev => [newAttack, ...prev.slice(0, 4)]);
      
      // Randomly change nodes stats
      setNodesStats(prev => ({
        ...prev,
        blockedToday: prev.blockedToday + Math.floor(Math.random() * 2) + 1,
        sensorLatency: Math.floor(Math.random() * 3) + 1
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const generateAttack = (id: string): ThreatArc => {
    const srcIdx = Math.floor(Math.random() * cities.length);
    let dstIdx = Math.floor(Math.random() * cities.length);
    while (dstIdx === srcIdx) {
      dstIdx = Math.floor(Math.random() * cities.length);
    }
    
    const src = cities[srcIdx];
    const dst = cities[dstIdx];
    const severities: ThreatArc["severity"][] = ["critical", "warning", "info"];
    
    return {
      id,
      source: `185.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
      srcName: src.name,
      target: `Node-${Math.floor(Math.random() * 900) + 100}`,
      dstName: dst.name,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      time: new Date().toLocaleTimeString()
    };
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <Globe className="h-6 w-6 text-red-500 text-glow-red animate-pulse" />
            <span>GLOBAL THREAT MAP</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Real-time simulation of international server attacks and traffic mitigations</p>
        </div>
      </div>

      {/* METRIC ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-xl border-white/5 bg-black/40 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Global Sensors Monitored</p>
          <p className="text-2xl font-bold text-white font-mono">{nodesStats.online}</p>
          <p className="text-[10px] text-cyber-blue font-mono font-semibold">Live Connection: Established</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-white/5 bg-black/40 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Intrusions Defeated Today</p>
          <p className="text-2xl font-bold text-cyber-purple font-mono">{nodesStats.blockedToday.toLocaleString()}</p>
          <p className="text-[10px] text-cyber-purple font-mono font-semibold">Shield Efficiency: 100%</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-white/5 bg-black/40 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Sensor Latency Response</p>
          <p className="text-2xl font-bold text-cyber-green font-mono">{nodesStats.sensorLatency}ms</p>
          <p className="text-[10px] text-cyber-green font-mono font-semibold">Synapse link optimized</p>
        </div>
      </div>

      {/* WORLD MAP AND LOG FEED PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* World Map SVG */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/80 lg:col-span-2 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.02)]">
          <div className="absolute top-4 left-6 flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            <RadioTower className="h-4.5 w-4.5 text-cyber-blue animate-pulse" />
            <span>Live Threat Simulator Stream</span>
          </div>

          {/* SVG Map Canvas */}
          <svg className="w-full max-w-4xl aspect-[2/1] bg-transparent" viewBox="0 0 1000 500">
            {/* Background Grid Points */}
            <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />

            {/* Fictional Continent Grid lines */}
            <path d="M 100,100 L 250,150 L 350,300 L 280,420 L 150,380 Z M 400,80 L 650,60 L 920,100 L 850,220 L 700,320 L 450,220 Z M 480,260 L 580,240 L 620,400 L 500,420 Z" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            {/* City Nodes */}
            {cities.map((city) => (
              <g key={city.name}>
                <circle cx={city.x} cy={city.y} r="4" fill="#06b6d4" className="animate-pulse" />
                <circle cx={city.x} cy={city.y} r="10" stroke="rgba(6,182,212,0.3)" strokeWidth="1" fill="transparent" className="animate-ping" style={{ animationDuration: "2s" }} />
                <text x={city.x + 8} y={city.y + 4} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">{city.name.split(",")[0]}</text>
              </g>
            ))}

            {/* Live Attack Arcs */}
            {activeAttacks.map((attack) => {
              const srcCity = cities.find(c => c.name === attack.srcName);
              const dstCity = cities.find(c => c.name === attack.dstName);
              if (!srcCity || !dstCity) return null;

              // Arc path calculation
              const dx = dstCity.x - srcCity.x;
              const dy = dstCity.y - srcCity.y;
              const dr = Math.hypot(dx, dy) * 0.95; // curvature
              const pathD = `M ${srcCity.x},${srcCity.y} A ${dr},${dr} 0 0,1 ${dstCity.x},${dstCity.y}`;
              
              const strokeColor = attack.severity === "critical" 
                ? "rgba(239,68,68,0.7)" 
                : attack.severity === "warning"
                ? "rgba(245,158,11,0.7)"
                : "rgba(6,182,212,0.7)";

              return (
                <g key={attack.id}>
                  {/* Arc line */}
                  <path 
                    d={pathD} 
                    fill="transparent" 
                    stroke={strokeColor} 
                    strokeWidth="1.5" 
                    strokeDasharray="6, 6" 
                    className="animate-[dash_10s_linear_infinite]" 
                  />
                  {/* Pulsing beam marker */}
                  <circle cx={dstCity.x} cy={dstCity.y} r="8" fill={attack.severity === "critical" ? "#ef4444" : "#06b6d4"} opacity="0.3" className="animate-ping" style={{ animationDuration: "1s" }} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Live Attack Log stream */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4 flex flex-col h-[480px]">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
            Simulated Attack Console
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <AnimatePresence initial={false}>
              {activeAttacks.map((attack) => (
                <motion.div
                  key={attack.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg border text-xs font-mono space-y-1 relative ${
                    attack.severity === "critical" 
                      ? "bg-red-950/15 border-red-500/20" 
                      : attack.severity === "warning"
                      ? "bg-amber-950/15 border-amber-500/20"
                      : "bg-cyan-950/15 border-cyan-500/20"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className={`font-bold ${
                      attack.severity === "critical" ? "text-red-500" : attack.severity === "warning" ? "text-amber-500" : "text-cyber-blue"
                    }`}>
                      {attack.protocol}
                    </span>
                    <span className="text-gray-500">{attack.time}</span>
                  </div>
                  <p className="text-gray-300">Origin IP: {attack.source}</p>
                  <p className="text-[10px] text-gray-500">From: {attack.srcName.split(",")[0]} → To: {attack.dstName.split(",")[0]}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
