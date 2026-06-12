"use client";

import React from "react";

export default function CyberGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.05)_0%,transparent_60%)]" />
      
      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 mix-blend-screen animate-grid-drift" style={{ height: "200%" }} />
      
      {/* Vignette Fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030712_95%)]" />
    </div>
  );
}
