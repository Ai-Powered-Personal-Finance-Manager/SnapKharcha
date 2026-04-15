"use client";

import { cn } from "@/src/lib/utils";
import SidebarFooter from "./SidebarFooter";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import { UserInterface } from "./interface/userInterface";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
  user: UserInterface;
};

export default function Sidebar({ collapsed, onToggle, user }: Props) {
  return (
    <aside
      className={cn(
        "relative flex flex-col h-full bg-[#01271E] border-r border-white/8 transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[240px]",
      )}
    >
      {/* Green glow blob top */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#00C950]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Content layers */}
      <div className="relative flex flex-col h-full z-10">
        <SidebarLogo collapsed={collapsed} />
        <SidebarNav collapsed={collapsed} />
        <SidebarFooter user={user} collapsed={collapsed} />
      </div>
    </aside>
  );
}
