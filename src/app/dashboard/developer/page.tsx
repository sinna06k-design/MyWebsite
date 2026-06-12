"use client";

import React, { useState } from "react";
import { Code, Key, Radio, Plus, Check, Trash2, Cpu, Copy, BookOpen, Download } from "lucide-react";
import { mockDeveloperKeys, mockWebhooks, DeveloperKey, Webhook } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function DeveloperConsole() {
  const [keys, setKeys] = useState<DeveloperKey[]>(mockDeveloperKeys);
  const [webhooks, setWebhooks] = useState<Webhook[]>(mockWebhooks);
  
  // Forms states
  const [newKeyName, setNewKeyName] = useState("");
  const [newWhName, setNewWhName] = useState("");
  const [newWhUrl, setNewWhUrl] = useState("");
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: DeveloperKey = {
      id: `key-${keys.length + 1}`,
      name: newKeyName,
      key: `sb_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}...`,
      created: new Date().toISOString().split("T")[0],
      status: "Active"
    };

    setKeys([...keys, newKey]);
    setNewKeyName("");
  };

  const handleCreateWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhName.trim() || !newWhUrl.trim()) return;

    const newWh: Webhook = {
      id: `wh-${webhooks.length + 1}`,
      name: newWhName,
      url: newWhUrl,
      events: ["threat.detected"],
      status: "Active"
    };

    setWebhooks([...webhooks, newWh]);
    setNewWhName("");
    setNewWhUrl("");
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  const handleDeleteWh = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">DEVELOPER INTEGRATIONS</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Generate client API credentials, configure webhook bridges, and download modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Keys and webhooks */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* API Keys management */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
              <Key className="h-4.5 w-4.5 text-cyber-blue" />
              <span>API Gateway Access Keys</span>
            </h3>

            {/* Key list table */}
            <div className="space-y-3 font-mono text-xs">
              {keys.map((key) => (
                <div key={key.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="space-y-1">
                    <p className="font-bold text-white">{key.name}</p>
                    <p className="text-[10px] text-gray-500">{key.key}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleCopy(key.id, key.key)}
                      className="text-cyber-blue p-1 rounded hover:bg-white/5 cursor-pointer"
                    >
                      {copiedId === key.id ? <Check className="h-4 w-4 text-cyber-green" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-gray-500 hover:text-cyber-red p-1 rounded hover:bg-white/5 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create form */}
            <form onSubmit={handleCreateKey} className="flex gap-3 pt-2">
              <input
                type="text"
                required
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key label (e.g. Prod Shield Webhook)"
                className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-cyber-blue text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <Plus className="h-4 w-4" /> GENERATE
              </button>
            </form>
          </div>

          {/* Webhooks management */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
              <Radio className="h-4.5 w-4.5 text-cyber-purple animate-pulse" />
              <span>Active Webhook Broadcasts</span>
            </h3>

            {/* Webhook lists */}
            <div className="space-y-3 font-mono text-xs">
              {webhooks.map((wh) => (
                <div key={wh.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="space-y-1 min-w-0">
                    <p className="font-bold text-white truncate">{wh.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{wh.url}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteWh(wh.id)}
                    className="text-gray-500 hover:text-cyber-red p-1 rounded hover:bg-white/5 cursor-pointer ml-3"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Create webhook form */}
            <form onSubmit={handleCreateWebhook} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newWhName}
                  onChange={(e) => setNewWhName(e.target.value)}
                  placeholder="Webhook Label"
                  className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-cyber-purple text-white"
                />
                <input
                  type="url"
                  required
                  value={newWhUrl}
                  onChange={(e) => setNewWhUrl(e.target.value)}
                  placeholder="Endpoint URL (HTTPS)"
                  className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-cyber-purple text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                <Plus className="h-4 w-4" /> ADD WEBHOOK BRIDGE
              </button>
            </form>
          </div>

        </div>

        {/* Right side: Rate limits and documentation */}
        <div className="space-y-6">
          {/* Rate limits */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3">
              API Traffic Rate Controls
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Usage Cap</span>
                <span className="text-white font-bold">1,492 / 10,000 requests</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full" style={{ width: "15%" }} />
              </div>
              <p className="text-[10px] text-gray-500 leading-normal">
                Node reset triggers on 1st of month. If monthly caps exceed 100%, requests automatically throttle.
              </p>
            </div>
          </div>

          {/* Quick Docs block */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 space-y-4">
            <h3 className="font-bold text-white font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-cyber-blue" />
              <span>API Request Formats</span>
            </h3>

            <div className="space-y-3 text-[11px] font-mono leading-normal">
              <div className="p-2.5 rounded bg-black/50 border border-white/5 space-y-1">
                <p className="text-cyber-green font-bold">GET /v1/threats</p>
                <p className="text-gray-500">Fetches list of mitigated anomalies</p>
              </div>
              <div className="p-2.5 rounded bg-black/50 border border-white/5 space-y-1">
                <p className="text-cyber-purple font-bold">POST /v1/mitigate</p>
                <p className="text-gray-500">Triggers lock state on node</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <button 
                onClick={() => handleCopy("sdk", "curl -H 'Authorization: Bearer sb_live_...' https://api.systemx.net/v1/threats")}
                className="w-full py-2 border border-white/10 hover:border-cyber-blue/30 text-white rounded-lg text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-cyber-blue animate-pulse" />
                <span>COPY CURL PAYLOAD</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
