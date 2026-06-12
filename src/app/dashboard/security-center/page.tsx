"use client";

import React, { useState } from "react";
import { Sliders, ShieldAlert, Sparkles, Check, AlertTriangle, FileDown, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityCenter() {
  const [modules, setModules] = useState({
    antiRaid: true,
    antiSpam: true,
    antiBot: true,
    antiLink: true,
    antiScam: true,
    antiMention: false,
    antiMassBan: true,
    antiChannelDel: true,
    antiRoleDel: true,
    antiWebhookAbuse: true,
    antiNuke: true
  });

  const [mentionLimit, setMentionLimit] = useState(5);
  const [banThreshold, setBanThreshold] = useState(3);
  const [mitigationAction, setMitigationAction] = useState("Quarantine");
  const [reportStatus, setReportStatus] = useState<"idle" | "generating" | "success">("idle");

  const handleToggle = (key: keyof typeof modules) => {
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateReport = () => {
    setReportStatus("generating");
    setTimeout(() => {
      setReportStatus("success");
      setTimeout(() => setReportStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">ADVANCED SECURITY SHIELD</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Deploy localized threat policies, rate limit gates, and safety mitigators</p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={reportStatus !== "idle"}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-emerald-600 text-white font-mono text-xs tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
        >
          {reportStatus === "generating" ? (
            "GENERATING AUDIT..."
          ) : reportStatus === "success" ? (
            <>
              <Check className="h-4 w-4" /> REPORT GENERATED
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" /> GENERATE AUDIT REPORT
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Toggles Module list */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-2 space-y-6">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cyber-blue" />
            <span>Operational Defense Policy Toggles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "antiRaid", title: "Anti-Raid Shield", desc: "Prevents bulk account creation joins." },
              { key: "antiSpam", title: "Anti-Message Spam", desc: "Flags repeating characters & texts." },
              { key: "antiBot", title: "Anti-Bot Verification", desc: "Blocks automated scripts execution." },
              { key: "antiLink", title: "Anti-Link Filter", desc: "Filters unapproved external invite links." },
              { key: "antiScam", title: "Anti-Scam Phishing", desc: "Quarantines known malicious redirects." },
              { key: "antiMention", title: "Anti-Mention Abuse", desc: "Locks channels upon massive tags waves." },
              { key: "antiMassBan", title: "Anti-Mass Ban Gate", desc: "Blocks bulk user ban requests." },
              { key: "antiChannelDel", title: "Anti-Channel Deletion", desc: "Preserves channels list structure." },
              { key: "antiRoleDel", title: "Anti-Role Deletion", desc: "Blocks bulk roles deletion attempts." },
              { key: "antiWebhookAbuse", title: "Anti-Webhook Spam", desc: "Auto-deletes spamming hook tokens." },
              { key: "antiNuke", title: "Anti-Nuke Protection", desc: "Manual locking on overall config reset." }
            ].map((item) => (
              <div 
                key={item.key} 
                onClick={() => handleToggle(item.key as any)}
                className={`p-3.5 rounded-xl border flex justify-between items-center gap-4 cursor-pointer select-none transition-all ${
                  modules[item.key as keyof typeof modules] 
                    ? "bg-cyan-950/20 border-cyber-blue/30 text-white shadow-[0_0_10px_rgba(6,182,212,0.02)]" 
                    : "bg-white/2 border-white/5 text-gray-500 hover:bg-white/5"
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs font-mono">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 font-sans">{item.desc}</p>
                </div>
                <div className={`h-4.5 w-4.5 rounded flex items-center justify-center border transition-all ${
                  modules[item.key as keyof typeof modules] 
                    ? "bg-cyber-blue border-cyber-blue text-black" 
                    : "border-gray-600 bg-transparent"
                }`}>
                  {modules[item.key as keyof typeof modules] && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration sliders and mitigation panels */}
        <div className="space-y-6">
          {/* Policy limits settings */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-6">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              Trigger Event Sensitivities
            </h3>

            {/* Slider 1: mentions */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Mention Abuse Cap</span>
                <span className="text-cyber-blue font-bold">{mentionLimit} users</span>
              </div>
              <input
                type="range"
                min={2}
                max={15}
                value={mentionLimit}
                onChange={(e) => setMentionLimit(parseInt(e.target.value))}
                className="w-full accent-cyber-blue"
              />
              <p className="text-[9px] text-gray-500">Mutes operator if tags threshold breached in single message.</p>
            </div>

            {/* Slider 2: ban rate */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Mass Ban Limit Rate</span>
                <span className="text-cyber-purple font-bold">{banThreshold} bans/min</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={banThreshold}
                onChange={(e) => setBanThreshold(parseInt(e.target.value))}
                className="w-full accent-cyber-purple"
              />
              <p className="text-[9px] text-gray-500">Auto-quarantines moderator if action count exceeds rate limit.</p>
            </div>
          </div>

          {/* Mitigation configuration */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              Auto Mitigation Strategy
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <label className="text-gray-500 uppercase text-[10px]">On Intrusion Detected: Action Protocol</label>
              <select
                value={mitigationAction}
                onChange={(e) => setMitigationAction(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 outline-none focus:border-cyber-blue text-gray-300"
              >
                <option value="Quarantine">Quarantine & Hold Client Gateway</option>
                <option value="Mute">Assign Restricted Mute Role</option>
                <option value="Kick">Kick Node Member (Soft Ban)</option>
                <option value="Ban">Ban Credential Hash Key (Hard Ban)</option>
              </select>
            </div>

            <div className="p-3 bg-cyan-950/20 border border-cyber-blue/20 rounded-lg text-[10px] text-cyan-400 font-mono flex gap-2">
              <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
              <span>Current strategy locks all new invitations if Anti-Raid is active.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
