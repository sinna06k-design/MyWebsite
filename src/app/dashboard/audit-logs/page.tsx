"use client";

import React, { useState, useEffect } from "react";
import { FileCode, Search, Filter, Download, Check, AlertTriangle, ArrowUpDown } from "lucide-react";
import { mockAuditLogs, AuditLog } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function AuditLogs() {
  const { lang, t } = useLanguage();
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
    
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `systemx_audit_export.${format.toLowerCase()}`;
    link.click();
    
    setTimeout(() => setExportState("idle"), 2500);
  };

  const translateCategory = (cat: string) => {
    if (cat === "Verification") return t("catVerification");
    if (cat === "Security") return t("catSecurity");
    if (cat === "System") return t("catSystem");
    if (cat === "Moderation") return t("catModeration");
    if (cat === "Roles") return t("catRoles");
    if (cat === "Channels") return t("catChannels");
    return cat;
  };

  const translateSeverity = (sev: string) => {
    if (sev === "Critical") return t("sevCritical");
    if (sev === "High") return t("sevHigh");
    if (sev === "Medium") return t("sevMedium");
    if (sev === "Low") return t("sevLow");
    return sev;
  };

  const translateAction = (act: string) => {
    if (lang === "ar") {
      if (act === "Authentication Approved") return "تمت موافقة التحقق";
      if (act === "Anti-Link Block triggered") return "تفعيل مانع الروابط";
      if (act === "Invite Checked") return "تم فحص رابط الدعوة";
      if (act === "Rule Altered") return "تعديل الصلاحيات";
      if (act === "Anti-Raid Auto-Mute") return "كتم تلقائي للغارات";
      if (act === "Malicious Attachment Cleaned") return "تنظيف ملف ضار";
      return act;
    }
    return act;
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">{t("auditLogsTitle")}</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{t("auditLogsSub")}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport("CSV")}
            disabled={exportState !== "idle"}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyber-blue/30 text-white font-mono text-xs rounded-lg transition-all cursor-pointer bg-black/40"
          >
            {exportState === "success" ? (
              <>
                <Check className="h-3.5 w-3.5 text-cyber-green" /> {t("exportCsvSuccess")}
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 text-cyber-blue" /> {t("exportCsv")}
              </>
            )}
          </button>
          <button
            onClick={() => handleExport("JSON")}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyber-purple/30 text-white font-mono text-xs rounded-lg transition-all cursor-pointer bg-black/40"
          >
            <Download className="h-3.5 w-3.5 text-cyber-purple" /> {t("exportJson")}
          </button>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 glass-panel rounded-xl border-white/5 bg-black/60">
        
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className={`absolute ${lang === "ar" ? "right-3" : "left-3"} top-3 h-4 w-4 text-gray-500`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className={`w-full bg-black/40 border border-white/10 rounded-lg ${lang === "ar" ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 text-xs outline-none focus:border-cyber-blue text-white`}
          />
        </div>

        {/* Category Select */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-cyber-blue text-gray-300 font-mono"
          >
            <option value="All">{t("allCategories")}</option>
            <option value="Security">{t("catSecurity")}</option>
            <option value="Moderation">{t("catModeration")}</option>
            <option value="System">{t("catSystem")}</option>
            <option value="Verification">{t("catVerification")}</option>
            <option value="Roles">{t("catRoles")}</option>
            <option value="Channels">{t("catChannels")}</option>
          </select>
        </div>

        {/* Severity Select */}
        <div className="relative">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-cyber-blue text-gray-300 font-mono"
          >
            <option value="All">{t("allSeverities")}</option>
            <option value="Critical">{t("sevCritical")}</option>
            <option value="High">{t("sevHigh")}</option>
            <option value="Medium">{t("sevMedium")}</option>
            <option value="Low">{t("sevLow")}</option>
          </select>
        </div>
      </div>

      {/* AUDIT LOG TABLE GRID */}
      <div className="glass-panel rounded-2xl border-white/5 bg-black/40 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-gray-500 text-[10px] uppercase tracking-wider">
                <th className="py-3.5 px-6">{t("thLogId")}</th>
                <th className="py-3.5 px-6">{t("thTimestamp")}</th>
                <th className="py-3.5 px-6">{t("thOperator")}</th>
                <th className="py-3.5 px-6">{t("thAction")}</th>
                <th className="py-3.5 px-6">{t("thCategory")}</th>
                <th className="py-3.5 px-6">{t("thSeverity")}</th>
                <th className="py-3.5 px-6 text-right">{t("thDetails")}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                      {t("noLogsMatch")}
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
                      <td className="py-4 px-6 text-cyber-blue font-semibold">{translateAction(log.action)}</td>
                      <td className="py-4 px-6">
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[9px] font-bold uppercase">
                          {translateCategory(log.category)}
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
                          {translateSeverity(log.severity)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-right max-w-xs truncate">{lang === "ar" ? "تم التحقق والمصادقة الأمنية بنجاح." : log.details}</td>
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
