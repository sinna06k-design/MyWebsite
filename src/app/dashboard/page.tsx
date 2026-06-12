"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, Activity, Users, Shield, Cpu, 
  Terminal, Sparkles, AlertTriangle, ArrowUpRight, 
  CheckCircle, RadioTower, Database, Network
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockAlerts, mockAuditLogs, AuditLog, SecurityAlert } from "@/lib/mock-data";

export default function DashboardHome() {
  const [securityScore, setSecurityScore] = useState(94);
  const [liveLogs, setLiveLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockAlerts);
  const [threatScore, setThreatScore] = useState(12);
  const [systemLoad, setSystemLoad] = useState({ cpu: 22, ram: 45, net: 8 });

  // Simulate real-time metrics updates
  useEffect(() => {
    const logInterval = setInterval(() => {
      // Append a random new audit log
      const users = ["User#0091", "SysAdmin", "Mod_Zero", "Gatekeeper", "DiscordBot"];
      const actions = ["Authentication Approved", "Anti-Link Block triggered", "Invite Checked", "Rule Altered"];
      const categories: AuditLog["category"][] = ["Verification", "Security", "System", "Moderation"];
      const severities: AuditLog["severity"][] = ["Low", "Medium", "High"];
      const details = ["OAuth credentials validated.", "Phishing link pattern identified.", "System validated connection token.", "Sensitivity updated."];
      
      const idx = Math.floor(Math.random() * users.length);
      const newLog: AuditLog = {
        id: `LOG-${Math.floor(Math.random() * 9000) + 1000}`,
        timestamp: new Date().toLocaleTimeString(),
        user: users[idx],
        action: actions[idx],
        category: categories[idx],
        severity: severities[idx],
        details: details[idx]
      };
      
      setLiveLogs(prev => [newLog, ...prev.slice(0, 7)]);
      
      // Fluctuate health metrics
      setSystemLoad({
        cpu: Math.floor(Math.random() * 15) + 15,
        ram: Math.floor(Math.random() * 5) + 42,
        net: Math.floor(Math.random() * 10) + 5
      });
      
      // Minor threat score changes
      setThreatScore(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(0, Math.min(100, prev + delta));
      });
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="space-y-8">
      {/* INTRO TITLE BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">SYSTEM CONTROL CENTER</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Real-time Node Telemetry & Threat Defense</p>
        </div>

        <div className="flex items-center gap-3 bg-cyan-950/20 border border-cyber-blue/20 rounded-xl px-4 py-2">
          <RadioTower className="h-5 w-5 text-cyber-blue animate-pulse" />
          <div className="text-left font-mono">
            <p className="text-[10px] text-gray-500 uppercase leading-none">AI CORE STATE</p>
            <p className="text-xs text-white font-bold">SYNAPSE-ONLINE</p>
          </div>
        </div>
      </div>

      {/* METRIC COUNTER ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Score */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 flex items-center justify-between relative overflow-hidden group">
          <div className="space-y-2">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Global Security Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{securityScore}</span>
              <span className="text-xs text-cyber-blue font-mono">/100</span>
            </div>
            <p className="text-[10px] text-cyber-green font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse" /> SYSTEM SECURED
            </p>
          </div>
          {/* Radial visual metric */}
          <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
              <circle cx="32" cy="32" r="28" stroke="#06b6d4" strokeWidth="4" fill="transparent" 
                strokeDasharray={175} strokeDashoffset={175 - (175 * securityScore) / 100} 
                className="transition-all duration-1000"
              />
            </svg>
            <Shield className="h-5 w-5 absolute text-cyber-blue text-glow-cyan" />
          </div>
        </div>

        {/* Card 2: Protected Servers */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-2 relative overflow-hidden group">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Protected Servers</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">1,429</span>
            <span className="text-xs text-cyber-blue font-mono font-bold">+4 today</span>
          </div>
          {/* sparkline */}
          <div className="h-8 w-full opacity-30 mt-2">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M 0 15 Q 15 5, 30 12 T 60 4 T 90 15 T 100 8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Card 3: Members Guarded */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-2 relative overflow-hidden group">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Protected Members</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">3.1M</span>
            <span className="text-xs text-cyber-purple font-mono font-bold">+184 today</span>
          </div>
          {/* sparkline */}
          <div className="h-8 w-full opacity-30 mt-2">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M 0 18 Q 20 8, 40 14 T 70 5 T 100 2" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Card 4: Incidents */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-2 relative overflow-hidden group">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Active Anomalies</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyber-red font-mono text-glow-red">{threatScore}</span>
            <span className="text-xs text-gray-500 font-mono">mitigated: 99.4%</span>
          </div>
          {/* sparkline */}
          <div className="h-8 w-full opacity-30 mt-2">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M 0 5 Q 10 18, 30 8 T 60 18 T 100 5" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* DASHBOARD CHARTS & SYSTEM CONTROL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Alert center */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-cyber-red text-glow-red" />
              <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wider">Active Threat Gateways</h3>
            </div>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest">SECURE STACK</span>
          </div>

          <div className="space-y-4">
            {alerts.slice(0, 4).map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors ${
                  alert.severity === "critical" 
                    ? "bg-red-950/15 border-red-500/20" 
                    : alert.severity === "warning"
                    ? "bg-amber-950/15 border-amber-500/20"
                    : "bg-cyan-950/15 border-cyan-500/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${
                      alert.severity === "critical" ? "bg-red-500" : alert.severity === "warning" ? "bg-amber-500" : "bg-cyber-blue"
                    } animate-pulse`} />
                    <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">{alert.type}</span>
                    <span className="text-[9px] font-mono text-gray-500">[{alert.id}]</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">Source: {alert.source} → Target: {alert.target}</p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[9px] font-mono text-gray-500">{alert.timestamp}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                    alert.status === "mitigated" 
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" 
                      : alert.status === "monitoring"
                      ? "bg-amber-950/20 border-amber-500/30 text-amber-400"
                      : "bg-red-950/20 border-red-500/30 text-red-400 animate-pulse"
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Node Diagnostics Monitor */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyber-blue" />
              <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wider">Cluster Hardware Health</h3>
            </div>
            <span className="h-2 w-2 rounded-full bg-cyber-green animate-ping" />
          </div>

          <div className="space-y-5">
            {/* CPU */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5" /> CPU Load</span>
                <span className="text-white font-bold">{systemLoad.cpu}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${systemLoad.cpu}%` }}
                />
              </div>
            </div>

            {/* RAM */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> Memory Buffer</span>
                <span className="text-white font-bold">{systemLoad.ram}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-500" 
                  style={{ width: `${systemLoad.ram}%` }}
                />
              </div>
            </div>

            {/* Network Port */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 flex items-center gap-1.5"><Network className="h-3.5 w-3.5" /> Inbound Socket Port</span>
                <span className="text-white font-bold">{systemLoad.net} MB/s</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, systemLoad.net * 5)}%` }}
                />
              </div>
            </div>

            {/* System Status Flags */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <p className="text-gray-500 text-[10px] uppercase">Firewall Port</p>
                <p className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> SECURE
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-[10px] uppercase">Proxy Routing</p>
                <p className="text-cyber-blue font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue animate-pulse" /> TUNNELING
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE AUDIT LOG EVENT FEED */}
      <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyber-blue text-glow-cyan" />
            <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wider">Live Security Incident Feed</h3>
          </div>
          <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase animate-pulse">Streaming logs live</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator/Origin</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {liveLogs.map((log) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-400 font-bold">{log.id}</td>
                    <td className="py-3 px-4 text-gray-500">{log.timestamp}</td>
                    <td className="py-3 px-4 text-white font-bold">{log.user}</td>
                    <td className="py-3 px-4 text-cyan-400">{log.action}</td>
                    <td className="py-3 px-4">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[9px] font-bold uppercase">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[9px] font-bold uppercase ${
                        log.severity === "Critical" 
                          ? "text-red-500" 
                          : log.severity === "High"
                          ? "text-orange-400"
                          : log.severity === "Medium"
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-right truncate max-w-xs">{log.details}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
