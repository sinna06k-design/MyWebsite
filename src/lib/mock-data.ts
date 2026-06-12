export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: "Security" | "Moderation" | "Verification" | "Roles" | "Channels" | "System";
  severity: "Low" | "Medium" | "High" | "Critical";
  details: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  type: string;
  severity: "info" | "warning" | "critical";
  status: "mitigated" | "monitoring" | "active";
}

export interface DeveloperKey {
  id: string;
  name: string;
  key: string;
  created: string;
  status: "Active" | "Revoked";
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "Active" | "Inactive";
}

// Generate audit logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: "LOG-9821",
    timestamp: "2026-06-12 15:14:02",
    user: "Admin#0001",
    action: "Emergency Lockdown Mode Enabled",
    category: "System",
    severity: "Critical",
    details: "All moderation configurations forced to max sensitivity due to API threat surge."
  },
  {
    id: "LOG-9820",
    timestamp: "2026-06-12 15:11:45",
    user: "SecurityBot AI",
    action: "Malicious Link Filter Triggered",
    category: "Security",
    severity: "High",
    details: "Deleted link from User#3391 redirecting to known phishing address."
  },
  {
    id: "LOG-9819",
    timestamp: "2026-06-12 15:08:21",
    user: "Mod_Shadow",
    action: "User Banned",
    category: "Moderation",
    severity: "Medium",
    details: "Banned Spammer#9810 after repeating invites across channels."
  },
  {
    id: "LOG-9818",
    timestamp: "2026-06-12 15:05:00",
    user: "SecurityBot AI",
    action: "Raid Shield Activated",
    category: "Security",
    severity: "Critical",
    details: "Blocked 47 bot accounts trying to register within 3 seconds."
  },
  {
    id: "LOG-9817",
    timestamp: "2026-06-12 15:00:10",
    user: "System",
    action: "API Key Created",
    category: "System",
    severity: "Low",
    details: "New API key 'Production Read-Only' issued."
  },
  {
    id: "LOG-9816",
    timestamp: "2026-06-12 14:55:30",
    user: "DiscordAuth",
    action: "Verification Successful",
    category: "Verification",
    severity: "Low",
    details: "User Member#1129 passed OAuth2 gate & assigned Role: Verified."
  },
  {
    id: "LOG-9815",
    timestamp: "2026-06-12 14:48:12",
    user: "Mod_Pulse",
    action: "Channel Deleted",
    category: "Channels",
    severity: "High",
    details: "Deleted channel #temp-chat-9."
  },
  {
    id: "LOG-9814",
    timestamp: "2026-06-12 14:42:01",
    user: "Admin#0001",
    action: "Role Perms Altered",
    category: "Roles",
    severity: "Medium",
    details: "Granted @Moderator role permission to manage webhooks."
  }
];

// Security Alerts
export const mockAlerts: SecurityAlert[] = [
  {
    id: "ALT-770",
    timestamp: "15:14:02",
    source: "203.0.113.88",
    target: "API Route: /v1/auth",
    type: "Brute Force Attempt",
    severity: "critical",
    status: "active"
  },
  {
    id: "ALT-769",
    timestamp: "15:10:15",
    source: "Discord Webhook Proxy",
    target: "System Integrations",
    type: "Anti-Nuke Trigger",
    severity: "warning",
    status: "monitoring"
  },
  {
    id: "ALT-768",
    timestamp: "15:08:44",
    source: "User_Spam_Engine",
    target: "#announcements",
    type: "Webhook Spam Wave",
    severity: "critical",
    status: "mitigated"
  },
  {
    id: "ALT-767",
    timestamp: "14:55:00",
    source: "198.51.100.12",
    target: "Dashboard Core",
    type: "SQL Injection Probe",
    severity: "warning",
    status: "mitigated"
  },
  {
    id: "ALT-766",
    timestamp: "14:30:12",
    source: "System Shield v4",
    target: "Gateway Portal",
    type: "Anti-Link Block",
    severity: "info",
    status: "mitigated"
  }
];

// Dark Web Simulation Data
export interface DarkWebLeak {
  id: string;
  source: string;
  compromisedData: string;
  leakDate: string;
  riskScore: "High" | "Medium" | "Low";
  status: "Active Alert" | "Resolved";
}

export const mockDarkWebLeaks: DarkWebLeak[] = [
  {
    id: "LEAK-102",
    source: "Redline Stealer Log Dump",
    compromisedData: "admin@systemx.com - Password: hash_sha256(*****)",
    leakDate: "2026-06-11",
    riskScore: "High",
    status: "Active Alert"
  },
  {
    id: "LEAK-101",
    source: "Discord Member Email Cache Leak",
    compromisedData: "78 user emails verified in community guild list",
    leakDate: "2026-06-08",
    riskScore: "Medium",
    status: "Resolved"
  },
  {
    id: "LEAK-100",
    source: "BreachForums Database Post",
    compromisedData: "Dev keys associated with obsolete dashboard sub-url",
    leakDate: "2026-05-30",
    riskScore: "High",
    status: "Resolved"
  }
];

// Default developer center configurations
export const mockDeveloperKeys: DeveloperKey[] = [
  { id: "key-1", name: "SecurityBot Webhook API", key: "sb_live_4f8g9h3k2s1d6g5f8e3...", created: "2026-01-15", status: "Active" },
  { id: "key-2", name: "Local Dev Test Console", key: "sb_test_9k8d7f6s5a4r3e2w1q0...", created: "2026-05-20", status: "Active" }
];

export const mockWebhooks: Webhook[] = [
  { id: "wh-1", name: "System Alerts Discord channel", url: "https://discord.com/api/webhooks/134463/...", events: ["threat.detected", "incident.critical"], status: "Active" },
  { id: "wh-2", name: "Moderator Log Dump", url: "https://api.mycompany.com/webhook", events: ["user.ban", "role.update"], status: "Active" }
];
