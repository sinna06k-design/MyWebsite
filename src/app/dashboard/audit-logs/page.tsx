"use client";

import React, { useState } from "react";
import { FileCode, Search, Filter, Download, Check, AlertTriangle, ArrowUpDown } from "lucide-react";
import { mockAuditLogs, AuditLog } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [exportState, setExportState] = useState<"idle" | "success">("idle");

  // Filter conditions
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) || 
                          log.action.toLowerCase().includes(search.toLowerCase()) ||
                          log.details.toLowerCase().includes(search.toLowerCase()) ||
                          log.id.toLowerCase().includes(search.toLowerCase());
                          
    const matchesCategory = categoryFilter === "All" ? true : log.category === categoryFilter;
    const matchesSeverity = severityFilter === "All" ? true : log.severity === severityFilter;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const handleExport = (format: "CSV" | "JSON") => {
    setExportState("success");
    
    // Simulate real file creation logic
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `systemx_audit_export.${format.toLowerCase()}`;
    link.click();
    
    setTimeout(() => setExportState("idle"), 2500);
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">AUDIT LOG TELEMETRY</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Chronological records of all system state events, moderation actions, and user integrations</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport("CSV")}
            disabled={exportState !== "idle"}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyber-blue/30 text-white font-mono text-xs rounded-lg transition-all cursor-pointer bg-black/40"
          >
            {exportState === "success" ? (
              <>
                <Check className="h-3.5 w-3.5 text-cyber-green" /> EXPORTED CSV
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 text-cyber-blue" /> EXPORT CSV
              </>
            )}
          </button>
          <button
            onClick={() => handleExport("JSON")}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyber-purple/30 text-white font-mono text-xs rounded-lg transition-all cursor-pointer bg-black/40"
          >
            <Download className="h-3.5 w-3.5 text-cyber-purple" /> EXPORT JSON
          </button>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 glass-panel rounded-xl border-white/5 bg-black/60">
        
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs by ID, action, user, or details..."
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-cyber-blue text-white"
          />
        </div>

        {/* Category Select */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-cyber-blue text-gray-300 font-mono"
          >
            <option value="All">All Categories</option>
            <option value="Security">Security Only</option>
            <option value="Moderation">Moderation Only</option>
            <option value="System">System Configurations</option>
            <option value="Verification">Verification Gates</option>
            <option value="Roles">Roles & Permissions</option>
            <option value="Channels">Channels Logging</option>
          </select>
        </div>

        {/* Severity Select */}
        <div className="relative">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-cyber-blue text-gray-300 font-mono"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Threats</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Log</option>
          </select>
        </div>
      </div>

      {/* AUDIT LOG TABLE GRID */}
      <div className="glass-panel rounded-2xl border-white/5 bg-black/40 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-gray-500 text-[10px] uppercase tracking-wider">
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6">Operator Node</th>
                <th className="py-3.5 px-6">Action Payload</th>
                <th className="py-3.5 px-6">Group Category</th>
                <th className="py-3.5 px-6">Threat Severity</th>
                <th className="py-3.5 px-6 text-right">Raw Details</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                      No logs matching query criteria found.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-400 font-bold">{log.id}</td>
                      <td className="py-4 px-6 text-gray-500">{log.timestamp}</td>
                      <td className="py-4 px-6 text-white font-bold">{log.user}</td>
                      <td className="py-4 px-6 text-cyber-blue font-semibold">{log.action}</td>
                      <td className="py-4 px-6">
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[9px] font-bold uppercase">
                          {log.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                          log.severity === "Critical"
                            ? "bg-red-950/20 border-red-500/30 text-red-500 text-glow-red"
                            : log.severity === "High"
                            ? "bg-orange-950/20 border-orange-500/30 text-orange-400"
                            : log.severity === "Medium"
                            ? "bg-yellow-950/20 border-yellow-500/30 text-yellow-400"
                            : "bg-white/5 border-white/10 text-gray-400"
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-right max-w-xs truncate">{log.details}</td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
