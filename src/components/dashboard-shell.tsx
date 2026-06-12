"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Shield, Terminal, MessageSquare, Sliders, BrainCircuit, 
  FileCode, Activity, Cpu, Users, Lock, Unlock, 
  AlertTriangle, Bell, Menu, X, RadioTower, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/lib/language-context";

function DashboardShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState<string[]>([]);

  // Section collapsibles
  const [sectionsOpen, setSectionsOpen] = useState({
    general: true,
    moderation: true,
    modules: true
  });

  // State to track enabled/disabled state of ProBot modules (toggled by checkmarks in sidebar)
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, boolean>>({
    overview: true,
    serverSettings: true,
    botCommands: true,
    moderation: true,
    logs: true,
    automod: true,
    antiRaid: true,
    vipProtection: true,
    utility: true,
    welcomeGoodbye: true,
    autoResponder: true,
    aiAssistant: true,
    levelingSystem: false,
    statistics: true,
    tickets: true
  });

  // Set system alerts translated
  useEffect(() => {
    if (lang === "ar") {
      setSystemAlerts([
        "تم تشغيل نظام منع المداهمة: تم حظر 47 سجل سبام",
        "محاولة حقن SQL تم حظرها من عنوان IP 198.51.100.12",
        "تسريب في الإنترنت المظلم: تنبيه اختراق بيانات اعتماد الإدارة"
      ]);
    } else {
      setSystemAlerts([
        "Anti-Raid triggered: 47 spam logs blocked",
        "SQL injection attempt blocked from IP 198.51.100.12",
        "Dark Web Leak detected: admin credentials compromise alert"
      ]);
    }
  }, [lang]);

  useEffect(() => {
    const isLocked = localStorage.getItem("system-lockdown") === "true";
    setLockdownActive(isLocked);
  }, [pathname]);

  const handleLockdown = () => {
    localStorage.setItem("system-lockdown", "true");
    setLockdownActive(true);
    setPasscode("");
    setPasscodeError(false);
  };

  const handleUnlock = () => {
    if (passcode === "1337" || passcode === "0000") {
      localStorage.setItem("system-lockdown", "false");
      setLockdownActive(false);
      setPasscode("");
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 800);
    }
  };

  const toggleModuleStatus = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setModuleStatuses(prev => {
      const updated = !prev[id];
      const statusText = updated ? (lang === "ar" ? "تفعيل" : "Enabled") : (lang === "ar" ? "تعطيل" : "Disabled");
      const alertMsg = `${name} : ${statusText}`;
      setSystemAlerts(prevAlerts => [alertMsg, ...prevAlerts]);
      return { ...prev, [id]: updated };
    });
  };

  // Define categorized navigation lists to match ProBot screenshots
  const generalItems = [
    { name: t("navCommandCenter"), href: "/dashboard", icon: Shield, id: "overview" },
    { name: t("navDiscordSettings"), href: "/dashboard/discord", icon: Sliders, id: "serverSettings" },
    { name: t("navBotCommands"), href: "/dashboard/commands", icon: Terminal, id: "botCommands" },
  ];

  const moderationItems = [
    { name: t("navModeration"), href: "/dashboard/discord", icon: Shield, id: "moderation" },
    { name: t("navLogs"), href: "/dashboard/audit-logs", icon: FileCode, id: "logs" },
    { name: t("navAutomod"), href: "/dashboard/discord", icon: Cpu, id: "automod" },
    { name: t("navAntiRaid"), href: "/dashboard/discord", icon: AlertTriangle, id: "antiRaid", premium: true },
    { name: t("navVipProtection"), href: "/dashboard/discord", icon: Lock, id: "vipProtection", premium: true },
  ];

  const moduleItems = [
    { name: t("navUtility"), href: "/dashboard/discord", icon: Cpu, id: "utility" },
    { name: t("navWelcomeGoodbye"), href: "/dashboard/discord", icon: Users, id: "welcomeGoodbye" },
    { name: t("navAutoResponder"), href: "/dashboard/discord", icon: MessageSquare, id: "autoResponder" },
    { name: t("navAiAssistant"), href: "/dashboard/ai-assistant", icon: BrainCircuit, id: "aiAssistant" },
    { name: t("navLevelingSystem"), href: "/dashboard/discord", icon: Activity, id: "levelingSystem", premium: true },
    { name: t("navStatistics"), href: "/dashboard/discord", icon: Activity, id: "statistics", premium: true },
    { name: t("navTickets"), href: "/dashboard/discord", icon: FileCode, id: "tickets", premium: true },
  ];

  const dirAttr = lang === "ar" ? "rtl" : "ltr";
  const activeServerName = lang === "ar" ? "شركه الحراميه العالميه" : "Nexus Esports";

  const renderNavItem = (item: { name: string; href: string; icon: any; id: string; premium?: boolean }) => {
    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
    const isModuleEnabled = moduleStatuses[item.id];

    return (
      <li key={item.id}>
        <Link
          href={item.href}
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 group border border-transparent ${
            isActive 
              ? "bg-[#2f3136] text-white font-medium shadow-sm" 
              : "text-[#b9bbbe] hover:text-white hover:bg-[#2e303c]"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <item.icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-cyber-blue" : "text-gray-400"}`} />
            <span className="truncate">{item.name}</span>
            {item.premium && (
              <span className="text-[8px] px-1 py-0.2 rounded font-bold font-mono tracking-tighter uppercase shrink-0 bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {lang === "ar" ? "مميّز" : "PREMIUM"}
              </span>
            )}
          </div>

          {item.id !== "overview" && item.id !== "serverSettings" && (
            <button
              onClick={(e) => toggleModuleStatus(e, item.id, item.name)}
              className="ml-2 shrink-0 cursor-pointer"
            >
              {isModuleEnabled ? (
                <span className="h-4 w-4 rounded-full bg-emerald-500 border border-emerald-500 flex items-center justify-center text-[10px] text-white font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  ✓
                </span>
              ) : (
                <span className="h-4 w-4 rounded-full border border-gray-600 hover:border-emerald-500 transition-colors flex items-center justify-center text-[8px]" />
              )}
            </button>
          )}
        </Link>
      </li>
    );
  };

  return (
    <div dir={dirAttr} className="relative min-h-screen bg-[#14151b] text-gray-200 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none" />
      
      {/* SINGLE COLUMN SIDEBAR (ProBot Style) */}
      <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#1e2029] border-r border-[#14151b] flex flex-col transition-transform duration-300 ${
        lang === "ar" 
          ? mobileMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          : mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${lang === "ar" ? "right-0 md:left-auto" : "left-0"}`}>
        
        {/* Active Server Badge Header */}
        <div className="p-4 border-b border-[#14151b] bg-[#1a1c24] flex flex-col justify-center min-h-[72px]">
          <p className="text-[10px] text-cyber-blue font-mono font-bold tracking-wider uppercase">{t("activeNode")}</p>
          <h2 className="font-bold text-sm text-white truncate font-mono">{activeServerName}</h2>
        </div>

        {/* Navigation link elements (ProBot Layout Style) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          
          {/* GENERAL Category */}
          <div>
            <button 
              onClick={() => setSectionsOpen(prev => ({ ...prev, general: !prev.general }))}
              className="w-full flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 py-1 font-mono hover:text-white transition-colors cursor-pointer"
            >
              <span>{t("catGeneralMenu")}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${sectionsOpen.general ? "" : "-rotate-90"}`} />
            </button>
            
            <AnimatePresence initial={false}>
              {sectionsOpen.general && (
                <motion.ul 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {generalItems.map(renderNavItem)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* MODERATION Category */}
          <div>
            <button 
              onClick={() => setSectionsOpen(prev => ({ ...prev, moderation: !prev.moderation }))}
              className="w-full flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 py-1 font-mono hover:text-white transition-colors cursor-pointer"
            >
              <span>{t("catModerationMenu")}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${sectionsOpen.moderation ? "" : "-rotate-90"}`} />
            </button>

            <AnimatePresence initial={false}>
              {sectionsOpen.moderation && (
                <motion.ul 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {moderationItems.map(renderNavItem)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* MODULE SETTINGS Category */}
          <div>
            <button 
              onClick={() => setSectionsOpen(prev => ({ ...prev, modules: !prev.modules }))}
              className="w-full flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 py-1 font-mono hover:text-white transition-colors cursor-pointer"
            >
              <span>{t("catModuleSettingsMenu")}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${sectionsOpen.modules ? "" : "-rotate-90"}`} />
            </button>

            <AnimatePresence initial={false}>
              {sectionsOpen.modules && (
                <motion.ul 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {moduleItems.map(renderNavItem)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* User badge */}
        <div className="p-3 border-t border-white/5 bg-[#14151b] text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-full border border-white/10 bg-cyan-950/20 flex items-center justify-center font-bold text-cyber-blue">
              OP
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white truncate">Operator#0001</p>
              <p className="text-[9px] text-gray-500">{t("operatorLevel")}</p>
            </div>
          </div>
        </div>

      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden glass-panel border-b border-white/5 h-16 px-4 flex items-center justify-between z-30 bg-[#1e2029] sticky top-0">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-cyber-blue" />
          <span className="font-bold text-white tracking-widest font-mono text-sm">SYSTEM X</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="px-2 py-1 rounded border border-cyan-500/30 bg-cyan-950/20 text-cyber-blue text-[10px] font-mono cursor-pointer"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button 
            onClick={handleLockdown}
            className="p-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-500 animate-pulse cursor-pointer"
          >
            <Lock className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-x-hidden">
        
        {/* DESKTOP HEADER */}
        <header className="hidden md:flex h-16 border-b border-white/5 bg-[#14151b]/80 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-emerald-950/25 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="uppercase">{activeServerName} {t("shieldActive")}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-cyan-950/25 border border-cyan-500/20 px-3 py-1 rounded-full text-[10px] text-cyber-blue font-mono">
              <RadioTower className="h-3 w-3 animate-pulse" />
              <span>{t("ping")}: 2ms</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/25 text-cyber-blue hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer hover:bg-cyan-950/40"
            >
              {lang === "en" ? "العربية" : "ENGLISH"}
            </button>

            {/* Notification triggers */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                {systemAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyber-red animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute ${lang === "ar" ? "left-0" : "right-0"} mt-2 w-80 glass-panel border border-white/10 rounded-xl shadow-2xl p-4 z-50 space-y-3`}
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold font-mono tracking-wider text-white">{t("systemEvents")} ({systemAlerts.length})</span>
                        <button 
                          onClick={() => setSystemAlerts([])}
                          className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                        >
                          {t("clearAll")}
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {systemAlerts.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center py-4">{t("noEvents")} {activeServerName}.</p>
                        ) : (
                          systemAlerts.map((alert, idx) => (
                            <div key={idx} className={`p-2.5 rounded bg-white/5 ${lang === "ar" ? "border-r-2" : "border-l-2"} border-cyber-red text-xs space-y-1`}>
                              <p className="text-gray-200 font-medium">{alert}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleLockdown}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-mono text-xs tracking-wider transition-all duration-300 animate-pulse hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{t("emergencyLockdown")}</span>
            </button>
          </div>
        </header>

        {/* CONTAINER CONTENT */}
        <main className="flex-1 p-6 md:p-8 relative">
          {children}
        </main>
      </div>

      {/* LOCKDOWN OVERLAY */}
      <AnimatePresence>
        {lockdownActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 scanlines"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_60%)] animate-pulse-slow pointer-events-none" />

            <div className="w-full max-w-md p-8 glass-panel-neon border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.2)] rounded-2xl relative text-center space-y-8">
              
              <div className="inline-flex p-4 rounded-full bg-red-950/40 border border-red-500/30 text-red-500 animate-bounce">
                <AlertTriangle className="h-10 w-10 text-glow-red" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-widest text-red-500 font-mono text-glow-red">{t("systemLockdownTitle")}</h1>
                <p className="text-sm text-gray-400">
                  {t("systemLockdownDesc")} (**{activeServerName}**)
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {t("enterPin")}
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••"
                    className={`w-40 text-center tracking-widest font-mono text-2xl px-3 py-2 bg-black/60 rounded-lg border ${
                      passcodeError ? "border-red-500 text-red-500 animate-shake" : "border-white/10 text-white focus:border-red-500"
                    } outline-none transition-all`}
                  />
                  {passcodeError && (
                    <p className="text-[11px] text-red-500 font-mono mt-1">{t("invalidPin")}</p>
                  )}
                </div>

                <div className="flex justify-center gap-4 pt-2">
                  <button
                    onClick={handleUnlock}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    <Unlock className="h-4 w-4" />
                    <span>{t("deactivateSheath")}</span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-gray-600 font-mono">
                {t("defaultPinMsg")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DashboardShellContent>{children}</DashboardShellContent>
    </LanguageProvider>
  );
}
