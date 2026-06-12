"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Users, ShieldAlert, Check, ToggleLeft, ToggleRight, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface Ticket {
  id: string;
  user: string;
  reason: string;
  category: "Verification" | "Report" | "Admin Access";
  time: string;
}

const initialTickets: Ticket[] = [
  { id: "TCK-401", user: "GamerPro#1002", reason: "Failing OAuth2 verification callback.", category: "Verification", time: "3m ago" },
  { id: "TCK-400", user: "Tox Hunter#3990", reason: "Reporting spam bots in #general-chat.", category: "Report", time: "12m ago" },
  { id: "TCK-399", user: "DevMod_Alpha", reason: "API key validation mismatch on Webhook sync.", category: "Admin Access", time: "45m ago" }
];

export default function DiscordManagement() {
  const { lang, t } = useLanguage();
  const [toggles, setToggles] = useState({
    verificationGate: true,
    welcomeSystem: false,
    auditLogging: true,
    inviteBlock: false,
    moderationLogs: true
  });

  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [welcomeText, setWelcomeText] = useState("");
  const [activeServer, setActiveServer] = useState<any>({ name: "Nexus Esports", members: 12891, id: "srv-1" });

  useEffect(() => {
    if (lang === "ar") {
      setWelcomeText("أهلاً بك {user} في سيرفر {server}! الرجاء إكمال التوثيق عبر الرابط للحصول على الرتب الرسمية.");
    } else {
      setWelcomeText("Welcome {user} to SecurityBot System X server! Please complete verification via link to obtain roles.");
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let currentList = [];
      const stored = localStorage.getItem("user_servers");
      if (stored) {
        try {
          currentList = JSON.parse(stored) || [];
        } catch (e) {
          console.error(e);
        }
      }
      
      const params = new URLSearchParams(window.location.search);
      const serverParam = params.get("server");
      if (serverParam && currentList.length > 0) {
        const match = currentList.find((s: any) => s.id === serverParam);
        if (match) setActiveServer(match);
      } else if (currentList.length > 0) {
        setActiveServer(currentList[0]);
      }
    }
  }, []);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  const translateCategory = (cat: string) => {
    if (lang === "ar") {
      if (cat === "Verification") return "توثيق";
      if (cat === "Report") return "إبلاغ";
      if (cat === "Admin Access") return "دخول مشرف";
    }
    return cat;
  };

  const translateReason = (reason: string) => {
    if (lang === "ar") {
      if (reason === "Failing OAuth2 verification callback.") return "فشل في عملية إرجاع المصادقة للبوابة.";
      if (reason === "Reporting spam bots in #general-chat.") return "الإبلاغ عن بوتات سبام في شات عام.";
      if (reason === "API key validation mismatch on Webhook sync.") return "عدم تطابق في مفتاح الويب-هوك الفعلي.";
    }
    return reason;
  };

  const memberCount = activeServer?.members || 12891;
  const verifiedCount = Math.round(memberCount * 0.912);
  const activeChannelsCount = activeServer?.id === "srv-1" ? 42 : activeServer?.id === "srv-2" ? 84 : 19;

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider">{t("discordSettingsTitle")}</h1>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{t("discordSettingsSub")}</p>
      </div>

      {/* OVERVIEW PANEL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t("discMembers")}</p>
          <p className="text-2xl font-bold text-white font-mono">{memberCount.toLocaleString()}</p>
          <p className="text-[10px] text-cyber-blue font-mono font-semibold">{t("discMembersHour")}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t("activeChannels")}</p>
          <p className="text-2xl font-bold text-white font-mono">{activeChannelsCount}</p>
          <p className="text-[10px] text-gray-500 font-mono">{t("categoriesMonitored")}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t("verifiedMembers")}</p>
          <p className="text-2xl font-bold text-cyber-green font-mono">{verifiedCount.toLocaleString()}</p>
          <p className="text-[10px] text-cyber-green font-mono font-semibold">{t("successRate")}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-1">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t("securityTier")}</p>
          <p className="text-2xl font-bold text-cyber-purple font-mono">{t("maxShield")}</p>
          <p className="text-[10px] text-cyber-purple font-mono font-semibold">{t("antiNukeActive")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Toggles settings card */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-2 space-y-6">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
            {t("authGatewayConfigs")}
          </h3>

          <div className="space-y-4">
            {[
              { key: "verificationGate", title: t("oauthGateTitle"), desc: t("oauthGateDesc") },
              { key: "welcomeSystem", title: t("welcomeBroadcastTitle"), desc: t("welcomeBroadcastDesc") },
              { key: "auditLogging", title: t("loggingSyncTitle"), desc: t("loggingSyncDesc") },
              { key: "inviteBlock", title: t("inviteFilterTitle"), desc: t("inviteFilterDesc") },
              { key: "moderationLogs", title: t("diagTunnelsTitle"), desc: t("diagTunnelsDesc") }
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-start gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-white font-mono">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-normal">{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleToggle(item.key as any)}
                  className="text-cyber-blue shrink-0 cursor-pointer"
                >
                  {toggles[item.key as keyof typeof toggles] ? (
                    <ToggleRight className="h-9 w-9 text-cyber-blue" />
                  ) : (
                    <ToggleLeft className="h-9 w-9 text-gray-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket simulator list */}
        <div className="space-y-6">
          {/* Support Ticket Queue */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4 flex flex-col h-[380px] shadow-[0_0_20px_rgba(6,182,212,0.02)]">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              {t("ticketQueueTitle")}
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <AnimatePresence initial={false}>
                {tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-2 py-8 text-gray-500">
                    <Check className="h-8 w-8 text-cyber-green animate-bounce" />
                    <p className="text-xs font-mono">{t("allTicketsResolved")}</p>
                    <button 
                      onClick={() => setTickets(initialTickets)}
                      className="text-[10px] text-cyber-blue hover:underline cursor-pointer"
                    >
                      {t("resetQueueSim")}
                    </button>
                  </div>
                ) : (
                  tickets.map((tck) => (
                    <motion.div 
                      key={tck.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-start gap-3 relative group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-white font-mono">{tck.user}</span>
                          <span className="text-[9px] font-mono px-1 py-0.2 bg-white/10 rounded text-gray-400">{translateCategory(tck.category)}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-normal">{translateReason(tck.reason)}</p>
                        <p className="text-[9px] text-gray-600 font-mono">{tck.time}</p>
                      </div>

                      <button 
                        onClick={() => handleResolveTicket(tck.id)}
                        className="p-1 rounded bg-cyan-950/40 hover:bg-cyan-950/60 border border-cyber-blue/30 text-cyber-blue hover:text-white transition-all cursor-pointer"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Welcome embeds editor */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              {t("welcomeTextEditor")}
            </h3>
            <textarea
              rows={3}
              value={welcomeText}
              onChange={(e) => setWelcomeText(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-xs outline-none focus:border-cyber-blue font-mono text-gray-300 resize-none text-left"
            />
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-500">{t("welcomeTextVariables")}</span>
              <span className="text-cyber-blue flex items-center gap-1"><Play className="h-3 w-3" /> {t("autoSaveActive")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
