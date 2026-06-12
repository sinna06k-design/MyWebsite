"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, BrainCircuit, User, Terminal, Cpu, FileWarning, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { askAI } from "@/app/actions";

interface ChatMessage {
  role: "user" | "system";
  content: string;
}

const initialMessages: ChatMessage[] = [
  { 
    role: "system", 
    content: "### Welcome to SecurityBot System X AI Core.\n\nI have complete access to cluster gateways, active port stats, and Discord moderation matrices.\n\nYou can ask me to **audit the firewall rules**, **analyze spam threat logs**, or **inspect credential databases**." 
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Map message history to format expected by server action
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await askAI(text, history);
      setMessages(prev => [...prev, { role: "system", content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "system", 
        content: "### 🚨 Connection Interrupted\n\nAI Core handshake timed out. Check API server state or configuration keys." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-pink-400 text-glow-purple" />
          <span>AI SECURITY CORE ASSISTANT</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Command AI Core to conduct diagnostics audits and audit risk thresholds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Suggested Actions left sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-1">Suggested Diagnostic Core Tasks</p>
          
          <button
            onClick={() => handleSuggest("Run server diagnostics audit on Discord configurations")}
            className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-black/40 hover:border-cyber-blue/30 text-xs font-mono text-gray-300 hover:text-white transition-all space-y-1 block cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-cyber-blue font-bold">
              <Cpu className="h-4 w-4" /> Run Server Audit
            </div>
            <p className="text-[10px] text-gray-500 font-sans leading-normal">Scans active roles, invites, permissions structures.</p>
          </button>

          <button
            onClick={() => handleSuggest("Check active database for leaked operator credentials or dark web leaks")}
            className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-black/40 hover:border-cyber-purple/30 text-xs font-mono text-gray-300 hover:text-white transition-all space-y-1 block cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-cyber-purple font-bold">
              <ShieldAlert className="h-4 w-4" /> Leak Database Scan
            </div>
            <p className="text-[10px] text-gray-500 font-sans leading-normal">Checks credentials against compromised databases.</p>
          </button>

          <button
            onClick={() => handleSuggest("Generate zero-day risk mitigations guidelines for anti-spam filters")}
            className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-black/40 hover:border-pink-500/30 text-xs font-mono text-gray-300 hover:text-white transition-all space-y-1 block cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-pink-400 font-bold">
              <FileWarning className="h-4 w-4" /> Mitigation Guidelines
            </div>
            <p className="text-[10px] text-gray-500 font-sans leading-normal">Drafts rules presets for link filtering configurations.</p>
          </button>
        </div>

        {/* Chat Interface viewport */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 lg:col-span-3 flex flex-col h-[520px] shadow-[0_0_20px_rgba(6,182,212,0.02)]">
          {/* Output area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 p-2 bg-black/20 rounded-xl border border-white/5">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 p-3 rounded-lg ${
                  m.role === "user" ? "bg-cyan-950/10 border-l-2 border-cyber-blue" : "bg-white/2"
                }`}
              >
                <div className={`p-2 rounded-lg h-9 w-9 shrink-0 flex items-center justify-center border ${
                  m.role === "user" 
                    ? "bg-cyan-950/45 border-cyber-blue/20 text-cyber-blue" 
                    : "bg-pink-950/20 border-pink-500/20 text-pink-400"
                }`}>
                  {m.role === "user" ? <User className="h-4.5 w-4.5" /> : <BrainCircuit className="h-4.5 w-4.5" />}
                </div>

                <div className="flex-1 min-w-0 prose prose-invert prose-xs text-xs text-gray-300 space-y-2 leading-relaxed">
                  {/* Clean parser helper for visual simulation logs */}
                  {m.content.split("\n\n").map((para, pidx) => {
                    if (para.startsWith("###")) {
                      return <h4 key={pidx} className="font-bold text-white font-mono text-xs uppercase tracking-wider">{para.replace("###", "").trim()}</h4>;
                    }
                    if (para.startsWith("* ")) {
                      return (
                        <ul key={pidx} className="list-disc list-inside space-y-1 text-gray-400 pl-2">
                          {para.split("\n").map((li, lidx) => (
                            <li key={lidx}>{li.replace("*", "").trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={pidx}>{para}</p>;
                  })}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 p-3 rounded-lg bg-white/2">
                <div className="p-2 rounded-lg bg-pink-950/20 border border-pink-500/20 text-pink-400 animate-pulse">
                  <BrainCircuit className="h-4.5 w-4.5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span>AI core analyzing telemetry data...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }} 
            className="mt-4 flex gap-3 border-t border-white/5 pt-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Security Core to perform audits..."
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs outline-none focus:border-pink-500 text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
