"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowRight, Shield, ShieldCheck, Plus, Check, MessageSquare, AlertTriangle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";
import confetti from "canvas-confetti";

interface DiscordServer {
  id: string;
  name: string;
  icon: string;
  members: number;
  active: boolean;
  role: "Owner" | "Administrator";
}

interface DiscordUser {
  username: string;
  discriminator: string;
  id: string;
  avatar: string;
  email?: string;
}

const initialServers: DiscordServer[] = [
  { id: "srv-1", name: "Nexus Esports", icon: "NE", members: 12891, active: true, role: "Owner" },
  { id: "srv-2", name: "Gamer Alliance", icon: "GA", members: 45290, active: true, role: "Administrator" },
  { id: "srv-3", name: "Developer Hub", icon: "DH", members: 5420, active: false, role: "Administrator" }
];

export default function ServersPage() {
  const router = useRouter();
  const [servers, setServers] = useState<DiscordServer[]>(initialServers);
  const [loading, setLoading] = useState(true);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Detect if redirected back from Bot Invitation (contains guild_id query)
    const queryParams = new URLSearchParams(window.location.search);
    const invitedGuildId = queryParams.get("guild_id");
    if (invitedGuildId) {
      localStorage.setItem(`bot_active_${invitedGuildId}`, "true");
      // Clean query string from address bar
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Fire confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#a855f7", "#3b82f6"]
      });
    }

    // 2. Parse OAuth2 access token from hash
    const hash = window.location.hash;
    const hashParams = new URLSearchParams(hash.substring(1));
    let token = hashParams.get("access_token");

    if (token) {
      localStorage.setItem("discord_token", token);
      // Clean hash from url
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      token = localStorage.getItem("discord_token");
    }

    if (token) {
      fetchDiscordData(token);
    } else {
      // Fallback to initial mock servers for previewing
      setLoading(false);
    }
  }, []);

  const fetchDiscordData = async (accessToken: string) => {
    try {
      // Fetch profile
      const userRes = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!userRes.ok) {
        // Token might be expired
        localStorage.removeItem("discord_token");
        setLoading(false);
        return;
      }
      const userData = await userRes.json();
      setDiscordUser(userData);
      localStorage.setItem("discord_user", JSON.stringify(userData));

      // Fetch guilds
      const guildsRes = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!guildsRes.ok) throw new Error("Failed to fetch guilds list");
      const guildsData = await guildsRes.json();

      // Filter Administrator guilds (permissions bitmask: Administrator is 0x8)
      const adminGuilds = guildsData
        .filter((g: any) => g.owner || (parseInt(g.permissions) & 8) === 8)
        .map((g: any) => {
          const isBotActive = localStorage.getItem(`bot_active_${g.id}`) === "true";
          return {
            id: g.id,
            name: g.name,
            icon: g.icon 
              ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png` 
              : g.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase(),
            members: Math.floor(Math.random() * 8000) + 1200,
            active: isBotActive,
            role: g.owner ? "Owner" : "Administrator"
          };
        });

      setServers(adminGuilds);
      localStorage.setItem("user_servers", JSON.stringify(adminGuilds));
    } catch (err) {
      console.error("Error fetching Discord API:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteBot = (server: DiscordServer) => {
    if (typeof window === "undefined") return;
    const clientId = "1344630137152471113";
    const redirectUri = encodeURIComponent(window.location.origin + "/");
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot&guild_id=${server.id}&response_type=code&redirect_uri=${redirectUri}`;
    
    // Open in a new tab or window
    window.location.href = inviteUrl;
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-200 flex flex-col p-6 font-sans">
      <CyberGrid />
      <ParticlesBg />

      {/* HEADER LOGO */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/5 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-white tracking-wider flex items-center gap-1 font-mono text-sm">
              SYSTEM <span className="text-cyber-blue">X</span>
            </div>
            <div className="text-[9px] text-cyber-blue/70 tracking-widest font-mono">DISCORD GATEWAY</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-gray-400">
            {discordUser 
              ? `AUTHORIZED AS: ${discordUser.username} ${discordUser.email ? `(${discordUser.email})` : ""}` 
              : "AUTHORIZED AS: Operator#0001"}
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-wider text-white font-mono">SELECT SERVER GATEWAY</h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Only servers where you possess owner or administrator permissions are listed</p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <div className="p-4 bg-cyan-950/30 border border-cyber-blue/30 rounded-full animate-spin">
                <Cpu className="h-8 w-8 text-cyber-blue" />
              </div>
              <p className="text-xs font-mono text-gray-400 animate-pulse">Requesting active server credentials handshake...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {servers.length === 0 ? (
                <div className="p-8 glass-panel border border-white/5 rounded-2xl text-center md:col-span-2 space-y-4">
                  <AlertTriangle className="h-8 w-8 mx-auto text-amber-500" />
                  <p className="text-sm text-gray-400 font-mono">No Administrator servers detected on this Discord account.</p>
                  <Link 
                    href="/login" 
                    className="inline-block text-xs font-mono text-cyber-blue hover:underline font-bold"
                  >
                    RE-AUTHENTICATE ANOTHER ACCOUNT
                  </Link>
                </div>
              ) : (
                servers.map((server) => (
                  <div 
                    key={server.id}
                    className={`p-6 rounded-2xl glass-panel border transition-all duration-300 relative group overflow-hidden ${
                      server.active 
                        ? "border-cyber-blue/20 hover:border-cyber-blue/40 shadow-[0_0_15px_rgba(6,182,212,0.02)]" 
                        : "border-white/5 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute right-0 bottom-0 p-4 opacity-5 text-white pointer-events-none select-none">
                      <Shield className="h-28 w-28" />
                    </div>

                    <div className="flex justify-between items-start gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        {/* circular icon or image */}
                        {server.icon.startsWith("http") ? (
                          <img 
                            src={server.icon} 
                            alt={server.name}
                            className={`h-14 w-14 rounded-full border shadow-[0_0_15px_rgba(255,255,255,0.02)] object-cover ${
                              server.active ? "border-cyber-blue" : "border-white/10"
                            }`}
                          />
                        ) : (
                          <div className={`h-14 w-14 rounded-full border flex items-center justify-center text-lg font-bold font-mono shadow-[0_0_15px_rgba(255,255,255,0.02)] ${
                            server.active 
                              ? "bg-cyan-950/20 border-cyber-blue/30 text-cyber-blue text-glow-cyan" 
                              : "bg-white/5 border-white/10 text-gray-400"
                          }`}>
                            {server.icon}
                          </div>
                        )}

                        <div className="space-y-1">
                          <h3 className="font-bold text-white text-sm tracking-wide truncate max-w-[150px]">{server.name}</h3>
                          <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" /> {server.members.toLocaleString()} members
                          </p>
                          <span className="inline-block text-[9px] font-mono px-1.5 py-0.2 bg-white/5 rounded border border-white/5 text-gray-400 uppercase">
                            Role: {server.role}
                          </span>
                        </div>
                      </div>

                      {server.active ? (
                        <Link
                          href={`/dashboard?server=${server.id}`}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                        >
                          <span>Configure</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleInviteBot(server)}
                          className="px-4 py-2 border border-purple-500/30 bg-purple-950/20 hover:bg-purple-950/40 text-purple-400 hover:text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Invite Bot</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
