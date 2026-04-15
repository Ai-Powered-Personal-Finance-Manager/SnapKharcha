"use client";

import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

type Props = {
  onMobileMenuToggle: () => void;
  greeting?: string;
  collapsed: boolean;
  onToggle: () => void;
  avatarText: string;
};

export default function TopBar({
  onMobileMenuToggle,
  greeting = "Welcome, Rohan !",
  collapsed,
  onToggle,
  avatarText,
}: Props) {
  return (
    <header className="h-[60px] shrink-0 flex items-center justify-between px-5 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-2">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          {collapsed ? (
            <PanelLeftOpen size={17} />
          ) : (
            <PanelLeftClose size={17} />
          )}
        </button>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-gray-200 mx-1" />

        {/* greeting */}
        <div>
          <h1 className="text-gray-900 font-semibold text-[15px] leading-tight">
            {greeting}
          </h1>
          <p className="text-gray-400 text-[11px] leading-tight hidden sm:block">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right — search + actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 w-52 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00C950] border-2 border-white" />
        </button>

        {/* Avatar */}
        <Avatar className="w-8 h-8 rounded-full bg-[#00C950] border-2 border-gray-200 flex items-center justify-center shadow-sm shadow-[#00C950]/20 hover:shadow-md hover:shadow-[#00C950]/30 transition-all cursor-pointer">
          <AvatarFallback className="text-[11px] uppercase font-bold text-white">
            {avatarText}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

