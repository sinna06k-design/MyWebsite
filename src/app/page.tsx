"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shield, Terminal, Cpu, Zap, Activity, Users, 
  ArrowRight, Check, HelpCircle, Mail, Send, Award, 
  Lock, Globe, Flame, ShieldAlert, Sparkles, MessageSquare, BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CyberGrid from "@/components/cyber-grid";
import ParticlesBg from "@/components/particles-bg";

// Mock counts
const initialStats = {
  servers: 14205,
  members: 3102485,
  threats: 894312,
  shield: 99.98
};

export default function LandingPage() {
  const router = useRouter();
  
  // Discord redirect listener removed

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [stats, setStats] = useState(initialStats);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Stats increment simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        servers: prev.servers + Math.floor(Math.random() * 2),
        members: prev.members + Math.floor(Math.random() * 5),
        threats: prev.threats + Math.floor(Math.random() * 3),
        shield: 99.98 + (Math.random() * 0.01 - 0.005)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail("");
      }, 3000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactForm({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-200 overflow-x-hidden">
      {/* Background visual styles */}
      <CyberGrid />
      <ParticlesBg />
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyber-blue/30 text-cyber-blue group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-lg text-white tracking-wider flex items-center gap-1 font-mono">
              SYSTEM <span className="text-cyber-blue text-glow-cyan">X</span>
            </div>
            <div className="text-[9px] text-cyber-blue/70 tracking-widest font-mono">SECURITYBOT CORE</div>
          </div>
        </Link>
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-mono">
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#roadmap" className="hover:text-white transition-colors">ROADMAP</a>
          <a href="#pricing" className="hover:text-white transition-colors">PRICING</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        </nav>

        {/* HEADER CTA */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-xs md:text-sm font-mono text-gray-400 hover:text-white transition-colors"
          >
            LOGIN
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs md:text-sm tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            ENTER SYSTEM
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 text-center space-y-8">
        
        {/* Neon Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyan-950/20 text-xs text-cyber-blue font-mono">
          <Sparkles className="h-3 w-3 animate-spin" />
          <span>NOW ACTIVE: SECURE CLOUD VERIFICATION GATE v4</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
            Futuristic Shield for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyber-indigo to-cyber-purple text-glow-cyan">
              Enterprise Communities
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Real-time anti-raid matrices, automated anti-nuke shielding, and live incident analysis logs powered by an advanced security AI framework.
          </p>
        </div>

        {/* HERO CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer text-center"
          >
            Deploy System X Free
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-white/10 hover:border-cyber-blue/30 hover:bg-cyan-950/10 text-white transition-all text-center font-semibold cursor-pointer"
          >
            Explore Diagnostics
          </a>
        </div>

        {/* PARTNER LOGO DOCK */}
        <div className="pt-16 space-y-4">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">TRUSTED BY INDUSTRY LEADING COMMUNITIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            <span className="text-lg font-bold tracking-widest text-white font-mono hover:opacity-100 transition-opacity">DISCORD_NET</span>
            <span className="text-lg font-bold tracking-widest text-white font-mono hover:opacity-100 transition-opacity">CLOUDFLARE</span>
            <span className="text-lg font-bold tracking-widest text-white font-mono hover:opacity-100 transition-opacity">RIOT_GAMES</span>
            <span className="text-lg font-bold tracking-widest text-white font-mono hover:opacity-100 transition-opacity">VALVE_CORP</span>
            <span className="text-lg font-bold tracking-widest text-white font-mono hover:opacity-100 transition-opacity">TWITCH_TV</span>
          </div>
        </div>
      </section>

      {/* LIVE STATS COUNTER BAR */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 glass-panel-neon rounded-2xl border-white/5 bg-black/60 shadow-[0_0_20px_rgba(6,182,212,0.02)]">
          <div className="text-center space-y-1">
            <p className="text-2xl md:text-4xl font-extrabold text-white font-mono">{stats.servers.toLocaleString()}</p>
            <p className="text-xs text-cyber-blue font-mono tracking-widest uppercase">Protected Nodes</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl md:text-4xl font-extrabold text-white font-mono">{(stats.members / 1000000).toFixed(2)}M</p>
            <p className="text-xs text-cyber-purple font-mono tracking-widest uppercase">Members Guarded</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl md:text-4xl font-extrabold text-white font-mono">{stats.threats.toLocaleString()}</p>
            <p className="text-xs text-cyber-red font-mono tracking-widest uppercase">Threats Mitigated</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl md:text-4xl font-extrabold text-cyber-green font-mono">{stats.shield.toFixed(2)}%</p>
            <p className="text-xs text-cyber-green font-mono tracking-widest uppercase">Shield Active Rate</p>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono text-cyber-blue uppercase tracking-widest">Enterprise Feature Suite</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white">Military-Grade Defense Core</p>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            System X operates on custom state machines designed to anticipate and isolate server exploits instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-2xl hover:border-cyber-blue/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-cyber-blue">
              <Shield className="h-28 w-28" />
            </div>
            <div className="inline-flex p-3 rounded-xl bg-cyan-950/50 border border-cyber-blue/20 text-cyber-blue mb-6">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Anti-Raid & Spam Shield</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Detects anomalous, bulk connections. Applies granular rate limits and quarantine cages automatically to suspect endpoints.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-2xl hover:border-cyber-purple/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-cyber-purple">
              <Terminal className="h-28 w-28" />
            </div>
            <div className="inline-flex p-3 rounded-xl bg-purple-950/50 border border-cyber-purple/20 text-cyber-purple mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Anti-Nuke Protection</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Stops high-level configuration resets. Halts bulk deletes of roles or channels if an executive key is compromised.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-2xl hover:border-pink-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-pink-500">
              <BrainCircuit className="h-28 w-28" />
            </div>
            <div className="inline-flex p-3 rounded-xl bg-pink-950/50 border border-pink-500/20 text-pink-400 mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Security Analyst</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Audits database patterns, flags domain link lists, suggests moderation rules, and answers security queries with localized data context.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP TIMELINE */}
      <section id="roadmap" className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono text-cyber-purple uppercase tracking-widest">Development Schedule</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white">System X Evolution Map</p>
        </div>

        <div className="relative border-l border-white/5 ml-4 md:ml-32 space-y-12">
          {/* Phase 1 */}
          <div className="relative pl-8 md:pl-16">
            <span className="absolute -left-3 top-1.5 h-6 w-6 rounded-full bg-cyan-500 border-4 border-cyber-bg flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span className="absolute -left-28 top-2 hidden md:block text-xs font-mono text-cyber-blue">Q1 2026</span>
            <div className="glass-panel p-6 rounded-xl space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyber-blue border border-cyber-blue/20">DEPLOYED</span>
              <h4 className="text-lg font-bold text-white">V1.0 - Anti-Raid Core System</h4>
              <p className="text-sm text-gray-400">Custom OAuth verification gates, basic moderation tools, and real-time dashboard visualization layers.</p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative pl-8 md:pl-16">
            <span className="absolute -left-3 top-1.5 h-6 w-6 rounded-full bg-purple-500 border-4 border-cyber-bg flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="absolute -left-28 top-2 hidden md:block text-xs font-mono text-cyber-purple">Q2 2026</span>
            <div className="glass-panel p-6 rounded-xl space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-cyber-purple border border-cyber-purple/20">NOW LIVE</span>
              <h4 className="text-lg font-bold text-white">V2.0 - SecurityBot AI Integration</h4>
              <p className="text-sm text-gray-400">Gemini/Groq diagnostic support, conversational cybersecurity scanner, and developer custom SDK portal.</p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative pl-8 md:pl-16">
            <span className="absolute -left-3 top-1.5 h-6 w-6 rounded-full bg-gray-700 border-4 border-cyber-bg flex items-center justify-center" />
            <span className="absolute -left-28 top-2 hidden md:block text-xs font-mono text-gray-500">Q3 2026</span>
            <div className="glass-panel p-6 rounded-xl space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">STAGING</span>
              <h4 className="text-lg font-bold text-white">V3.0 - Anomaly Radar & Cyber Map</h4>
              <p className="text-sm text-gray-400">Global visual threat arc canvas maps, custom webhook logs exporting, and interactive radar sweep modules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono text-pink-400 uppercase tracking-widest">Trusted Feedback</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white">Operator Reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-panel p-8 rounded-2xl border-white/5 space-y-4">
            <p className="text-gray-300 italic text-sm md:text-base leading-relaxed">
              "We had a massive bot registration attack on our gaming discord. System X detected it in under a second and quarantined 400+ bots instantly. Setting it up took under 3 minutes."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-900/40 border border-cyber-blue/30 flex items-center justify-center font-bold text-white font-mono text-xs">
                K
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Kailen V.</p>
                <p className="text-xs text-gray-500">Guild Administrator, Nexus Esports</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border-white/5 space-y-4">
            <p className="text-gray-300 italic text-sm md:text-base leading-relaxed">
              "The developer APIs allowed us to connect System X to our custom verification site. The real-time rate dashboard is exactly what was missing in existing discord bot utilities."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-900/40 border border-cyber-purple/30 flex items-center justify-center font-bold text-white font-mono text-xs">
                M
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Max S.</p>
                <p className="text-xs text-gray-500">Security Lead, DevHub Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-cyber-green uppercase tracking-widest">SaaS Pricing</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white">Sleek, Transparent Plans</p>
          </div>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-black/60 border border-white/5">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                billingPeriod === "monthly" ? "bg-cyan-600 text-white font-bold" : "text-gray-400"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                billingPeriod === "yearly" ? "bg-cyan-600 text-white font-bold" : "text-gray-400"
              }`}
            >
              YEARLY (20% OFF)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Node Sentinel</h3>
              <p className="text-xs text-gray-400">Essential shielding for communities starting up.</p>
            </div>
            <div className="py-4 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white font-mono">$0</span>
              <span className="text-xs text-gray-500 font-mono"> / forever</span>
            </div>
            <ul className="flex-1 space-y-3 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-green" /> Anti-Raid Filter (Standard)
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-green" /> Verification Portal OAuth2
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-green" /> Basic Dashboard Telemetry
              </li>
            </ul>
            <Link 
              href="/register"
              className="w-full py-2.5 rounded-lg border border-white/10 hover:border-cyber-blue/30 text-center font-mono text-xs text-white transition-all cursor-pointer"
            >
              DEPLOY FOR FREE
            </Link>
          </div>

          {/* Plan 2 */}
          <div className="glass-panel-neon p-8 rounded-2xl flex flex-col space-y-6 border-cyber-blue/40 relative shadow-[0_0_25px_rgba(6,182,212,0.05)]">
            <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-cyan-600 text-white text-[9px] font-mono font-bold tracking-widest">
              RECOMMENDED
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                System X Pro <Sparkles className="h-4 w-4 text-cyber-blue" />
              </h3>
              <p className="text-xs text-gray-400">Complete AI protection and security automation.</p>
            </div>
            <div className="py-4 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white font-mono">
                {billingPeriod === "monthly" ? "$49" : "$39"}
              </span>
              <span className="text-xs text-gray-500 font-mono"> / month</span>
            </div>
            <ul className="flex-1 space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-blue" /> Everything in Sentinel
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-blue" /> AI Security Assistant (Gemini powered)
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-blue" /> Anti-Nuke Shield Configurations
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-blue" /> Global Threat map & Anomaly Radar
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-blue" /> Real-time Audit Logs Export
              </li>
            </ul>
            <Link 
              href="/register"
              className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-center font-mono text-xs text-white tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              UPGRADE TO PRO
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">System X Enterprise</h3>
              <p className="text-xs text-gray-400">Custom dedicated clusters for large corporations.</p>
            </div>
            <div className="py-4 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white font-mono">
                {billingPeriod === "monthly" ? "$299" : "$239"}
              </span>
              <span className="text-xs text-gray-500 font-mono"> / month</span>
            </div>
            <ul className="flex-1 space-y-3 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-purple" /> Dedicated AI Security Engine
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-purple" /> Unlimited Webhook Keys & API limits
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-purple" /> Dark Web Leak Credential Alerts
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyber-purple" /> 24/7 SLA Engineering Support
              </li>
            </ul>
            <a 
              href="#contact"
              className="w-full py-2.5 rounded-lg border border-white/10 hover:border-cyber-purple/30 text-center font-mono text-xs text-white transition-all cursor-pointer"
            >
              DISCUSS DEPLOYMENT
            </a>
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono text-cyber-blue uppercase tracking-widest">OPERATOR CORE</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white">Security Command Officers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-xl text-center space-y-4 hover:border-cyber-blue/20 transition-all">
            <div className="h-20 w-20 rounded-full mx-auto bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xl font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              E-1
            </div>
            <div>
              <p className="font-bold text-white text-sm">Elena Rostov</p>
              <p className="text-xs text-cyber-blue font-mono">Lead Cryptographer</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center space-y-4 hover:border-cyber-purple/20 transition-all">
            <div className="h-20 w-20 rounded-full mx-auto bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-xl font-mono shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              M-2
            </div>
            <div>
              <p className="font-bold text-white text-sm">Marcus Chen</p>
              <p className="text-xs text-cyber-purple font-mono">Shield Architect</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center space-y-4 hover:border-cyber-green/20 transition-all">
            <div className="h-20 w-20 rounded-full mx-auto bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center font-bold text-white text-xl font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              Z-3
            </div>
            <div>
              <p className="font-bold text-white text-sm">Zephyr Thorne</p>
              <p className="text-xs text-cyber-green font-mono">Threat Response Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">REPEATED INQUIRIES</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does the Anti-Nuke shield prevent admin hijack?",
              a: "System X monitors authorization signatures. If an administrator account performs destructive bulk updates (such as deleting multiple channels or kicking users within seconds), System X temporarily intercepts the requests, alerts the owner, and auto-quarantines the compromised credential key."
            },
            {
              q: "Does it require self-hosting?",
              a: "No. System X is a fully managed cloud solution. You can authorize your community nodes or servers via secure OAuth2 in under a minute without launching terminal processes yourself."
            },
            {
              q: "How secure is my Discord OAuth token?",
              a: "All tokens are AES-256 encrypted at rest and never shared. We follow OAuth2 authorization standard guidelines, which grant System X the minimum permissions necessary to defend your server."
            },
            {
              q: "Can I generate API webhooks for private applications?",
              a: "Yes. In the Developer Console, you can deploy read/write API tokens and connect webhook configurations to stream threat events into your corporate databases."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel rounded-xl overflow-hidden border-white/5 transition-all">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-semibold text-white flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <HelpCircle className={`h-5 w-5 text-cyber-blue transition-transform duration-200 ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <p className="p-6 text-sm text-gray-400 leading-relaxed bg-black/30">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & NEWSLETTER BLOCK */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-2xl border-white/5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Direct Command Link</h3>
            <p className="text-xs text-gray-400 font-mono">ESTABLISH SECURE CONTACT LINK WITH OPERATORS</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Operator Call Sign / Name</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Operator-01"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyber-blue text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Secure Connection Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="operator@systemx.net"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyber-blue text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Message Payload</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Inquire about custom enterprise threat shielding configs..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyber-blue text-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={contactSuccess}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-emerald-600 text-white rounded-lg text-sm font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              {contactSuccess ? (
                <>
                  <Check className="h-4 w-4" /> HANDSHAKE SUCCESSFUL
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> SEND SECURE TELEMETRY
                </>
              )}
            </button>
          </form>
        </div>

        {/* Newsletter Subscription */}
        <div className="glass-panel p-8 rounded-2xl border-white/5 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-xl bg-purple-950/50 border border-cyber-purple/20 text-cyber-purple">
              <Mail className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Sub-Frequency Briefings</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Subscribe to our secure telemetry feed. Get weekly summaries of new exploits, anti-nuke patch alerts, and zero-day threat analysis reports.
              </p>
            </div>
          </div>

          <form onSubmit={handleNewsletter} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="operator@securelink.net"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyber-purple text-white"
              />
              <button
                type="submit"
                disabled={newsletterSuccess}
                className="px-6 bg-purple-600 hover:bg-purple-500 disabled:bg-emerald-600 text-white font-semibold rounded-lg text-sm transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                {newsletterSuccess ? "SUBSCRIBED" : "JOIN FEED"}
              </button>
            </div>
            {newsletterSuccess && (
              <p className="text-xs text-cyber-green font-mono">Secure subscription verified. Secure link established.</p>
            )}
          </form>

          {/* Trust Badges */}
          <div className="border-t border-white/5 pt-6 space-y-3">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SECURITY COMPLIANCE ACCREDITATIONS</p>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1"><Award className="h-4 w-4 text-cyber-blue" /> SOC2 Type II</span>
              <span className="flex items-center gap-1"><Award className="h-4 w-4 text-cyber-purple" /> ISO 27001</span>
              <span className="flex items-center gap-1"><Award className="h-4 w-4 text-cyber-green" /> GDPR Guarded</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-black/40 py-12 px-6 md:px-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyber-blue" />
            <span className="font-bold text-white tracking-widest font-mono text-sm">SECURITYBOT SYSTEM X</span>
            <span className="text-[9px] font-mono text-gray-600">v4.0.28-Prod</span>
          </div>

          <p className="text-xs text-gray-500 font-mono">
            &copy; 2026 SecurityBot System X Inc. All telemetry feeds encrypted. All server gates verified.
          </p>
          
          <div className="flex items-center gap-6 text-xs text-gray-400 font-mono">
            <Link href="/login" className="hover:text-white transition-colors">LOGIN</Link>
            <Link href="/register" className="hover:text-white transition-colors">REGISTER</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">DASHBOARD</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
