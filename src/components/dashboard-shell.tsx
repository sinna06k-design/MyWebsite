"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Shield, Terminal, MessageSquare, Sliders, BrainCircuit, 
  FileCode, Activity, Code, Globe, Radio, EyeOff, Menu, X, 
  Bell, Lock, Unlock, AlertTriangle, Cpu, RadioTower, Plus, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  color: string;
}

interface DiscordServer {
  id: string;
  name: string;
  icon: string;
  members: number;
  active: boolean;
}

const mainNavItems: SidebarItem[] = [
  { name: "Command Center", href: "/dashboard", icon: Shield, color: "text-cyber-blue" },
  { name: "SecurityBot OS", href: "/dashboard/system-os", icon: Terminal, color: "text-cyber-indigo" },
  { name: "Discord Management", href: "/dashboard/discord", icon: MessageSquare, color: "text-cyber-blue" },
  { name: "Advanced Shield", href: "/dashboard/security-center", icon: Sliders, color: "text-cyber-purple", badge: "Core" },
  { name: "AI Security Assistant", href: "/dashboard/ai-assistant", icon: BrainCircuit, color: "text-pink-400" },
  { name: "Audit Log Center", href: "/dashboard/audit-logs", icon: FileCode, color: "text-gray-400" },
  { name: "Analytics Center", href: "/dashboard/analytics", icon: Activity, color: "text-cyber-green" },
  { name: "Developer Console", href: "/dashboard/developer", icon: Code, color: "text-amber-400" },
];

const secretNavItems: SidebarItem[] = [
  { name: "Global Threat Map", href: "/dashboard/cyber-map", icon: Globe, color: "text-red-400", badge: "Live" },
  { name: "Anomaly Radar", href: "/dashboard/radar", icon: Radio, color: "text-cyber-green" },
  { name: "Dark Web Monitor", href: "/dashboard/dark-web", icon: EyeOff, color: "text-orange-500", badge: "Leak" },
];

const mockServers: DiscordServer[] = [
  { id: "srv-1", name: "Nexus Esports", icon: "NE", members: 12891, active: true },
  { id: "srv-2", name: "Gamer Alliance", icon: "GA", members: 45290, active: true },
  { id: "srv-4", name: "Global Elite Club", icon: "GE", members: 8920, active: true }
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState<string[]>([
    "Anti-Raid triggered: 47 spam logs blocked",
    "SQL injection attempt blocked from IP 198.51.100.12",
    "Dark Web Leak detected: admin credentials compromise alert"
  ]);

  // Read active server from query param or local storage
  const [servers, setServers] = useState<DiscordServer[]>(mockServers);
  const [activeServer, setActiveServer] = useState<DiscordServer>(mockServers[0]);

  useEffect(() => {
    const isLocked = localStorage.getItem("system-lockdown") === "true";
    setLockdownActive(isLocked);

    let currentList = mockServers;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user_servers");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.length > 0) {
            setServers(parsed);
            currentList = parsed;
            setActiveServer(parsed[0]);
          }
        } catch (e) {
          console.error("Error loading user servers:", e);
        }
      }

      const params = new URLSearchParams(window.location.search);
      const serverParam = params.get("server");
      if (serverParam) {
        const match = currentList.find(s => s.id === serverParam);
        if (match) setActiveServer(match);
      }
    }
  }, [pathname]);

  const handleServerSwitch = (server: DiscordServer) => {
    setActiveServer(server);
    // Persist parameter in navigation
    router.push(`${pathname}?server=${server.id}`);
  };

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

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-200 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      
      {/* DUAL SIDEBAR SYSTEM */}
      <aside className={`fixed md:sticky top-0 z-40 h-screen w-80 glass-panel border-r border-white/5 flex transition-transform duration-300 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        
        {/* COLUMN 1: DISCORD GUILD BUBBLE BAR (Extreme Left) */}
        <div className="w-16 md:w-18 bg-[#04060a] border-r border-white/5 flex flex-col items-center py-6 gap-4 select-none shrink-0">
          {/* System Home Hub */}
          <Link 
            href="/servers"
            className="relative p-2.5 rounded-xl bg-cyan-950/40 border border-cyber-blue/30 text-cyber-blue hover:text-white hover:border-white transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] group cursor-pointer"
          >
            <Cpu className="h-5 w-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-black border border-white/10 rounded font-mono text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              HUB CONSOLE
            </span>
          </Link>

          <div className="w-8 border-t border-white/5 my-1" />

          {/* Server bubbles */}
          <div className="flex-1 w-full flex flex-col items-center gap-3 overflow-y-auto">
            {servers.map((server) => {
              const isSelected = activeServer.id === server.id;
              return (
                <div key={server.id} className="relative group w-full flex justify-center">
                  
                  {/* Left Indicator Pill (Discord style!) */}
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-cyber-blue rounded-r transition-all duration-300 ${
                    isSelected ? "h-8" : "h-0 group-hover:h-3"
                  }`} />
                  
                  {/* Server Circle Bubble */}
                  <button
                    onClick={() => handleServerSwitch(server)}
                    className={`h-11 w-11 font-bold font-mono text-xs flex items-center justify-center transition-all duration-300 border cursor-pointer overflow-hidden ${
                      isSelected 
                        ? "bg-cyan-950/30 border-cyber-blue text-cyber-blue rounded-xl shadow-[0_0_12px_rgba(6,182,212,0.2)]" 
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-cyan-950/20 hover:border-cyber-blue/30 rounded-full hover:rounded-xl"
                    }`}
                  >
                    {server.icon.startsWith("http") ? (
                      <img src={server.icon} alt={server.name} className="h-full w-full object-cover" />
                    ) : (
                      server.icon
                    )}
                  </button>

                  {/* Server Tooltip */}
                  <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black border border-white/10 rounded font-mono text-[9px] text-white font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                    {server.name}
                  </span>
                </div>
              );
            })}

            {/* Add server / invite bot bubble */}
            <Link
              href="/servers"
              className="h-11 w-11 rounded-full hover:rounded-xl bg-white/5 border border-white/5 hover:border-cyber-purple/40 hover:bg-purple-950/15 text-gray-400 hover:text-cyber-purple flex items-center justify-center transition-all group cursor-pointer"
            >
              <Plus className="h-5 w-5" />
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-black border border-white/10 rounded font-mono text-[9px] text-white font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                ADD BOT SERVER
              </span>
            </Link>
          </div>

          <div className="text-[9px] font-mono text-gray-600 tracking-tighter">v4.0</div>
        </div>

        {/* COLUMN 2: SELECTED SERVER SETTINGS LINKS */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Active Server Badge Header */}
          <div className="p-4 border-b border-white/5 bg-black/20 flex flex-col justify-center min-h-[72px]">
            <p className="text-[10px] text-cyber-blue font-mono font-bold tracking-wider uppercase">ACTIVE NODE</p>
            <h2 className="font-bold text-sm text-white truncate font-mono">{activeServer.name}</h2>
          </div>

          {/* Navigation link elements */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 font-mono">Server Control</div>
              <ul className="space-y-1">
                {mainNavItems.map((item) => {
                  const querySuffix = `?server=${activeServer.id}`;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={`${item.href}${querySuffix}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 group ${
                          isActive 
                            ? "bg-cyan-950/30 border border-cyber-blue/30 text-white font-medium" 
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-cyber-blue text-glow-cyan" : item.color}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 font-mono">Holographic Intel</div>
              <ul className="space-y-1">
                {secretNavItems.map((item) => {
                  const querySuffix = `?server=${activeServer.id}`;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={`${item.href}${querySuffix}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 group ${
                          isActive 
                            ? "bg-purple-950/30 border border-cyber-purple/30 text-white font-medium" 
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-cyber-purple text-glow-purple" : item.color}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* User badge */}
          <div className="p-3 border-t border-white/5 bg-black/40 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-full border border-white/10 bg-cyan-950/20 flex items-center justify-center font-bold text-cyber-blue">
                OP
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">Operator#0001</p>
                <p className="text-[9px] text-gray-500">LEVEL: HIGH-CLEARANCE</p>
              </div>
            </div>
          </div>
        </div>

      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden glass-panel border-b border-white/5 h-16 px-4 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-cyber-blue" />
          <span className="font-bold text-white tracking-widest font-mono text-sm">SYSTEM X</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLockdown}
            className="p-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-500 animate-pulse"
          >
            <Lock className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-x-hidden">
        
        {/* DESKTOP HEADER */}
        <header className="hidden md:flex h-16 border-b border-white/5 bg-black/25 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-emerald-950/25 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="uppercase">{activeServer.name} SHIELD: ACTIVE</span>
            </div>
            
            <div className="flex items-center gap-2 bg-cyan-950/25 border border-cyan-500/20 px-3 py-1 rounded-full text-[10px] text-cyber-blue font-mono">
              <RadioTower className="h-3 w-3 animate-pulse" />
              <span>PING: 2ms</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
                      className="absolute right-0 mt-2 w-80 glass-panel border border-white/10 rounded-xl shadow-2xl p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold font-mono tracking-wider text-white">SYSTEM EVENTS ({systemAlerts.length})</span>
                        <button 
                          onClick={() => setSystemAlerts([])}
                          className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {systemAlerts.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center py-4">No critical reports for {activeServer.name}.</p>
                        ) : (
                          systemAlerts.map((alert, idx) => (
                            <div key={idx} className="p-2.5 rounded bg-white/5 border-l-2 border-cyber-red text-xs space-y-1">
                              <p className="text-gray-200 font-medium">{alert}</p>
                              <p className="text-[9px] text-gray-500 font-mono">Server ID: {activeServer.id}</p>
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
              <span>EMERGENCY LOCKDOWN</span>
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
                <h1 className="text-2xl font-bold tracking-widest text-red-500 font-mono text-glow-red">SYSTEM LOCKDOWN</h1>
                <p className="text-sm text-gray-400">
                  Manual safety override engaged. All active tunnels for **{activeServer.name}** have been frozen.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                    Enter Operator Override PIN
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
                    <p className="text-[11px] text-red-500 font-mono mt-1">INVALID BYPASS KEY CODE</p>
                  )}
                </div>

                <div className="flex justify-center gap-4 pt-2">
                  <button
                    onClick={handleUnlock}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    <Unlock className="h-4 w-4" />
                    <span>DEACTIVATE SHEATH</span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-gray-600 font-mono">
                DEFAULT SYSTEM RECOVERY PIN: <span className="text-red-500/60">0000</span> OR <span className="text-red-500/60">1337</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
