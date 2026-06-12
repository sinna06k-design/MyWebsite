"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ShieldAlert, Check, Play, ToggleLeft, ToggleRight, Plus, X, Users, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface BotCommandConfig {
  id: string;
  name: string;
  descKey: string;
  enabled: boolean;
  roles: string[];
  channels: string[];
}

export default function BotCommandsSettings() {
  const { lang, t } = useLanguage();
  const [prefix, setPrefix] = useState("!");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeServer, setActiveServer] = useState<any>({ name: "Nexus Esports", members: 12891, id: "srv-1" });

  const [commands, setCommands] = useState<BotCommandConfig[]>([
    { id: "ban", name: "/ban", descKey: "cmdBanDesc", enabled: true, roles: ["@Admin"], channels: [] },
    { id: "mute", name: "/mute", descKey: "cmdMuteDesc", enabled: true, roles: ["@Admin", "@Moderator"], channels: [] },
    { id: "kick", name: "/kick", descKey: "cmdKickDesc", enabled: true, roles: ["@Admin", "@Moderator"], channels: [] },
    { id: "warn", name: "/warn", descKey: "cmdWarnDesc", enabled: true, roles: ["@everyone"], channels: [] },
    { id: "clear", name: "/clear", descKey: "cmdClearDesc", enabled: true, roles: ["@Admin", "@Moderator"], channels: [] },
    { id: "lock", name: "/lock", descKey: "cmdLockDesc", enabled: true, roles: ["@Admin"], channels: ["#general-chat"] },
  ]);

  // Handle load selected server
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

  const handleToggleCommand = (id: string) => {
    setCommands(prev => prev.map(cmd => cmd.id === id ? { ...cmd, enabled: !cmd.enabled } : cmd));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddRole = (id: string, role: string) => {
    setCommands(prev => prev.map(cmd => {
      if (cmd.id === id && !cmd.roles.includes(role)) {
        return { ...cmd, roles: [...cmd.roles, role] };
      }
      return cmd;
    }));
  };

  const handleRemoveRole = (id: string, role: string) => {
    setCommands(prev => prev.map(cmd => {
      if (cmd.id === id) {
        return { ...cmd, roles: cmd.roles.filter(r => r !== role) };
      }
      return cmd;
    }));
  };

  const availableRoles = ["@Admin", "@Moderator", "@VIP", "@everyone", "@Staff"];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <Terminal className="h-6 w-6 text-cyber-blue" />
            <span>{t("commandsTitle")}</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{t("commandsSub")}</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer self-stretch sm:self-auto text-center justify-center"
        >
          <Check className="h-4 w-4" />
          <span>{t("saveConfig")}</span>
        </button>
      </div>

      {/* SAVE CELEBRATION */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 font-mono text-xs text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <Check className="h-4 w-4 animate-bounce" />
            <span>{t("configSaved")} ({activeServer.name})</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Prefix settings */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-1 space-y-4 h-fit">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-2">
            {lang === "ar" ? "إعدادات البادئة" : "Prefix Trigger"}
          </h3>
          <div className="space-y-2">
            <label className="block text-[10px] text-gray-500 font-mono uppercase">
              {t("prefixLabel")}
            </label>
            <input
              type="text"
              maxLength={3}
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder={t("prefixPlaceholder")}
              className="w-full text-center tracking-widest font-mono text-xl px-3 py-2 bg-black/60 rounded-lg border border-white/10 text-white focus:border-cyber-blue outline-none transition-all"
            />
          </div>

          <div className="p-3 bg-cyan-950/20 border border-cyber-blue/20 rounded-xl text-[10px] text-cyber-blue font-mono leading-normal">
            <AlertTriangle className="h-4 w-4 mb-1 text-cyber-blue inline mr-1" />
            {lang === "ar" 
              ? "سيتم استدعاء البوت في الديسكورد باستخدام هذه البادئة (مثل !ban)." 
              : "Discord commands will trigger using this prefix symbol on the server (e.g. !ban)."}
          </div>
        </div>

        {/* Commands settings list table */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-3 space-y-6">
          <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-2">
            {lang === "ar" ? "قائمة وإعدادات أوامر الإشراف" : "Moderation Command Rules"}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-wider bg-white/2">
                  <th className="py-3 px-4">{t("commandNameHeader")}</th>
                  <th className="py-3 px-4">{t("authorizedRolesHeader")}</th>
                  <th className="py-3 px-4">{t("disallowedChannelsHeader")}</th>
                  <th className="py-3 px-4 text-center">{lang === "ar" ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd) => (
                  <tr key={cmd.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    
                    {/* Name & Desc */}
                    <td className="py-4 px-4 space-y-1">
                      <p className="font-bold text-white text-sm tracking-wide">{cmd.name}</p>
                      <p className="text-[10px] text-gray-400 font-sans leading-normal">{t(cmd.descKey)}</p>
                    </td>

                    {/* Roles Selector */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5 items-center max-w-[250px]">
                        {cmd.roles.map(r => (
                          <span key={r} className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyber-blue border border-cyber-blue/30">
                            {r}
                            <button 
                              onClick={() => handleRemoveRole(cmd.id, r)}
                              className="hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))}
                        
                        {/* Simple Select menu helper to add role */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAddRole(cmd.id, e.target.value);
                              e.target.value = "";
                            }
                          }}
                          className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-[9px] text-gray-400 outline-none focus:border-cyber-blue cursor-pointer"
                        >
                          <option value="">+</option>
                          {availableRoles
                            .filter(r => !cmd.roles.includes(r))
                            .map(r => (
                              <option key={r} value={r}>{r}</option>
                            ))
                          }
                        </select>
                      </div>
                    </td>

                    {/* Restricted Channels */}
                    <td className="py-4 px-4 text-gray-400 text-xs">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {cmd.channels.length === 0 ? (
                          <span className="text-[9px] text-gray-500 font-mono italic">
                            {lang === "ar" ? "متاح في كل القنوات" : "Allowed in all channels"}
                          </span>
                        ) : (
                          cmd.channels.map(ch => (
                            <span key={ch} className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                              {ch}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleCommand(cmd.id)}
                        className="text-cyber-blue cursor-pointer inline-flex items-center justify-center"
                      >
                        {cmd.enabled ? (
                          <ToggleRight className="h-8 w-8 text-cyber-blue" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-gray-600" />
                        )}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
