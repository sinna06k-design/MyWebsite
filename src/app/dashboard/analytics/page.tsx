"use client";

import React, { useState } from "react";
import { Activity, TrendingUp, BarChart2, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function AnalyticsCenter() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  // Simulated heatmap grid data: 7 days x 12 intervals
  const heatmapData = [
    [2, 4, 1, 0, 8, 12, 18, 24, 15, 10, 4, 2], // Mon
    [1, 0, 0, 3, 5, 15, 22, 30, 20, 12, 6, 1], // Tue
    [3, 2, 1, 1, 9, 14, 25, 28, 18, 14, 5, 3], // Wed
    [0, 1, 0, 2, 4, 11, 20, 32, 25, 11, 8, 2], // Thu
    [4, 3, 2, 4, 12, 28, 38, 45, 30, 22, 12, 8], // Fri
    [8, 12, 15, 8, 20, 35, 42, 50, 48, 38, 22, 15], // Sat
    [6, 8, 10, 5, 12, 25, 30, 40, 35, 25, 15, 10], // Sun
  ];

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">TELEMTRY & ANALYTICS CENTER</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Aggregated system audits, traffic trends, and mitigator load profiles</p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 rounded-lg bg-black/60 border border-white/5 font-mono text-xs">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === "weekly" ? "bg-cyan-600 text-white font-bold" : "text-gray-400"
            }`}
          >
            WEEKLY DATA
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === "monthly" ? "bg-cyan-600 text-white font-bold" : "text-gray-400"
            }`}
          >
            MONTHLY DATA
          </button>
        </div>
      </div>

      {/* METRIC GAUGES ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verification Success Trend */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Verification Trend Rate</span>
            <TrendingUp className="h-4 w-4 text-cyber-green" />
          </div>
          <div className="flex justify-between items-end h-32 pt-4 px-2">
            {[45, 68, 52, 90, 84, 95, 91].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 w-full">
                <div 
                  className="w-3/5 bg-gradient-to-t from-cyan-600 to-cyber-blue rounded-t-sm transition-all duration-1000"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[9px] font-mono text-gray-600">D0{idx+1}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-mono text-center pt-2">91.2% overall verification clearance rating this period.</p>
        </div>

        {/* Incident mitigations charts */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Mitigation Load Types</span>
            <BarChart2 className="h-4 w-4 text-cyber-purple" />
          </div>
          
          <div className="space-y-3 font-mono text-xs pt-2">
            {[
              { type: "Anti-Raid Quarantine", count: 488, pct: 60, col: "bg-cyber-blue" },
              { type: "Anti-Spam Message Delete", count: 240, pct: 30, col: "bg-cyber-purple" },
              { type: "Anti-Webhook Token Revoke", count: 86, pct: 10, col: "bg-cyber-red" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400">{item.type}</span>
                  <span className="text-white font-bold">{item.count} ({item.pct}%)</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.col} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Risk analysis */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Cyber Risk Profile</span>
            <ShieldAlert className="h-4 w-4 text-cyber-red animate-pulse" />
          </div>

          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <div className="text-3xl font-extrabold text-cyber-green font-mono">0.02%</div>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Active Threat Exposure Rate</p>
            <span className="px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
              OPTIMIZED
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-mono text-center leading-relaxed">
            All nodes operating inside safe latency thresholds. Threat vectors quarantined.
          </p>
        </div>
      </div>

      {/* HEATMAP GRID SYSTEM */}
      <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyber-blue" />
            <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wider">Node Activity Density Heatmap</h3>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-gray-500 items-center">
            <span>Low</span>
            <div className="flex gap-0.5">
              <span className="h-3 w-3 rounded-sm bg-cyan-950/20" />
              <span className="h-3 w-3 rounded-sm bg-cyan-900/40" />
              <span className="h-3 w-3 rounded-sm bg-cyan-600/70" />
              <span className="h-3 w-3 rounded-sm bg-cyber-blue" />
            </div>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-2 overflow-x-auto pb-2">
          {/* Days */}
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, dIdx) => (
            <div key={day} className="flex items-center gap-2 min-w-[600px]">
              <span className="w-10 text-[10px] font-mono text-gray-500 font-bold text-right shrink-0">{day}</span>
              <div className="flex-1 grid grid-cols-12 gap-1.5">
                {heatmapData[dIdx].map((val, vIdx) => {
                  const bg = val > 40
                    ? "bg-cyber-blue shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    : val > 20
                    ? "bg-cyan-600/70"
                    : val > 8
                    ? "bg-cyan-900/40"
                    : "bg-cyan-950/20";
                  return (
                    <div 
                      key={vIdx} 
                      className={`h-7 rounded-md ${bg} transition-all hover:scale-105 relative group cursor-pointer`}
                    >
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-white font-mono z-20 whitespace-nowrap">
                        {val} events
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Timeline footer */}
          <div className="flex items-center gap-2 pt-2 min-w-[600px] border-t border-white/5">
            <span className="w-10 shrink-0" />
            <div className="flex-1 grid grid-cols-12 text-[9px] font-mono text-gray-500 text-center gap-1.5">
              {["00h", "02h", "04h", "06h", "08h", "10h", "12h", "14h", "16h", "18h", "20h", "22h"].map((t) => (
                <div key={t}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
