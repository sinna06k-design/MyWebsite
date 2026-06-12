"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Cpu, ShieldAlert, Wifi, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export default function SecurityBotOS() {
  const [input, setInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "SecurityBot OS v4.0.0-Beta initialized.", type: "success" },
    { text: "Type 'help' to fetch active operations payload.", type: "output" }
  ]);
  const [threatLevel, setThreatLevel] = useState("SECURE");
  const [shieldPower, setShieldPower] = useState(99.4);
  const [scanning, setScanning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...terminalHistory, { text: `operator@systemx:~$ ${input}`, type: "input" as const }];

    setInput("");

    // Simulator parser
    setTimeout(() => {
      switch (cmd) {
        case "help":
          setTerminalHistory([
            ...newHistory,
            { text: "Supported Commands:", type: "success" },
            { text: "  scan     - Run diagnostic threat scan on active nodes", type: "output" },
            { text: "  firewall - Display active ports and state metrics", type: "output" },
            { text: "  shield   - Recalibrate security shield parameters", type: "output" },
            { text: "  clear    - Clear console logs", type: "output" },
            { text: "  lockdown - Engage manual safety overrides", type: "output" }
          ]);
          break;
        case "clear":
          setTerminalHistory([]);
          break;
        case "scan":
          setScanning(true);
          setTerminalHistory([
            ...newHistory,
            { text: "[*] Initializing diagnostic scan protocol...", type: "output" },
            { text: "[*] Probing 4 active webhooks and 12 server directories...", type: "output" },
            { text: "[+] Verification Gates: ACTIVE (100% security rating)", type: "success" },
            { text: "[+] Anti-Raid Shield: ACTIVE (quarantine buffer normal)", type: "success" },
            { text: "[!] Zero-day alert check: 0 vulnerabilities found.", type: "success" },
            { text: "[*] Node scan completed successfully.", type: "success" }
          ]);
          setTimeout(() => setScanning(false), 2000);
          break;
        case "firewall":
          setTerminalHistory([
            ...newHistory,
            { text: "Firewall Diagnostics Report:", type: "output" },
            { text: "  PORT 80   - REDIRECTING TO HTTPS (Closed)", type: "output" },
            { text: "  PORT 443  - TLS 1.3 SECURE (Active)", type: "success" },
            { text: "  PORT 22   - SSH TUNNEL (Restricted to Core operator IP)", type: "success" },
            { text: "  PORT 3000 - INTERNAL CLIENT PROXY (Tunnel Active)", type: "output" },
            { text: "Firewall Load: 12% | Attack Interceptions today: 8", type: "success" }
          ]);
          break;
        case "shield":
          setScanning(true);
          setShieldPower(100.0);
          setTerminalHistory([
            ...newHistory,
            { text: "[*] Aligning electromagnetic shield vectors...", type: "output" },
            { text: "[*] Refreshing session storage caches and API access keys...", type: "output" },
            { text: "[+] Shield power successfully recalibrated to 100.00%", type: "success" }
          ]);
          setTimeout(() => setScanning(false), 1500);
          break;
        case "lockdown":
          setTerminalHistory([
            ...newHistory,
            { text: "[!] Engaging safety triggers. Please toggle the red button in the top menu to verify override code.", type: "error" }
          ]);
          break;
        default:
          setTerminalHistory([
            ...newHistory,
            { text: `Command not found: '${cmd}'. Type 'help' to review shell command guidelines.`, type: "error" }
          ]);
          break;
      }
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <div>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider">SECURITYBOT OS TERMINAL</h1>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Futuristic holographic diagnostics command line</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Terminals Console */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/60 lg:col-span-2 flex flex-col h-[500px] shadow-[0_0_20px_rgba(6,182,212,0.02)]">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center gap-2 text-cyber-blue font-mono text-xs font-bold uppercase">
              <Terminal className="h-4.5 w-4.5" />
              <span>Core Shell Simulator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          {/* Lines container */}
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs p-2 bg-black/40 rounded-lg border border-white/5">
            {terminalHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line.type === "input" 
                    ? "text-gray-300 font-bold" 
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                    ? "text-cyber-green text-glow-cyan"
                    : "text-gray-400"
                }
              >
                {line.text}
              </div>
            ))}
            {scanning && (
              <div className="text-cyber-blue animate-pulse">Scanning matrix nodes. Please wait...</div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleCommand} className="mt-4 flex gap-3 border-t border-white/5 pt-4">
            <span className="text-cyber-blue font-mono text-sm self-center">~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help' or 'scan' to inspect..."
              className="flex-1 bg-transparent text-sm font-mono text-white outline-none focus:ring-0 border-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-cyan-950/40 hover:bg-cyan-950/60 border border-cyber-blue/30 rounded-lg text-cyber-blue font-mono text-xs cursor-pointer"
            >
              EXECUTE
            </button>
          </form>
        </div>

        {/* Meters and Defense Grid */}
        <div className="space-y-6">
          {/* Gauge Widget */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-6">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              Defensive Grid Strengths
            </h3>

            <div className="flex justify-around items-center py-2">
              {/* Shield circular indicator */}
              <div className="text-center space-y-2">
                <div className="relative h-24 w-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="42" stroke="#a855f7" strokeWidth="6" fill="transparent" 
                      strokeDasharray={264} strokeDashoffset={264 - (264 * shieldPower) / 100}
                    />
                  </svg>
                  <Shield className="h-6 w-6 absolute text-cyber-purple text-glow-purple" />
                </div>
                <p className="text-xs font-bold text-white font-mono">{shieldPower}%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Shield Capacity</p>
              </div>

              {/* Threat Alert indicator */}
              <div className="text-center space-y-2">
                <div className="h-24 w-24 rounded-full border border-cyber-blue/20 bg-cyan-950/20 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <Wifi className="h-6 w-6 text-cyber-blue animate-pulse" />
                </div>
                <p className="text-xs font-bold text-cyber-blue font-mono">{threatLevel}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">System Matrix</p>
              </div>
            </div>
          </div>

          {/* Active Shields Node Checklist */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              Cyber Shield Matrix
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {[
                { name: "AI SECURITY CORE", state: "Active", col: "text-cyber-green" },
                { name: "FIREWALL GATEWAYS", state: "Monitoring", col: "text-cyber-blue" },
                { name: "INTRUSION CAPTURE", state: "Shielded", col: "text-cyber-purple" },
                { name: "WEBHOOK SANDBOX", state: "Isolated", col: "text-cyber-green" }
              ].map((node, index) => (
                <div key={index} className="flex justify-between items-center p-2.5 rounded bg-white/5 border border-white/5">
                  <span className="text-gray-400 font-bold">{node.name}</span>
                  <span className={`text-[10px] uppercase font-bold ${node.col}`}>{node.state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
