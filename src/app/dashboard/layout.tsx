import React from "react";
import DashboardShell from "@/components/dashboard-shell";

export const metadata = {
  title: "System X Command Center",
  description: "Enterprise Cybersecurity dashboard command console.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
