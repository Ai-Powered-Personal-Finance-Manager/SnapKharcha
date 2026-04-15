"use client";

import { CapitalizeFirst } from "@/src/core/utils/capitalizeFirst";
import { useState } from "react";
import { Loading } from "../Loading";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useUser } from "./hooks/useUser";
import { UserInterface } from "./interface/userInterface";

type Props = {
  children: React.ReactNode;
  greeting?: string;
};

export default function DashboardShell({ children, greeting }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;

  const typedUser: UserInterface = user?.user;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:shrink-0">
        <Sidebar
          user={typedUser}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          avatarText={typedUser?.name?.slice(0, 1)}
          onMobileMenuToggle={() => setMobileOpen(true)}
          greeting={`Hello ${CapitalizeFirst(typedUser?.name)}!`}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6 max-w-screen-2xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
