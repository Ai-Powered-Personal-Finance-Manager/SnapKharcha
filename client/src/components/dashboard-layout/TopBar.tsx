"use client";

import { CONFIG } from "@/src/core/config";
import { localStorageUtil } from "@/src/core/utils";
import { LogoutResponse } from "@/src/features/auth/interface/loginInterface";
import { useLogoutAction } from "./hooks/useLogoutAction";
import {
  Bell,
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ChevronRight,
  HelpCircle,
  Loader2,
  LogOut,
  CircleUser,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useBreadcrumbs, type Breadcrumb } from "./hooks/useBreadcrumbs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  onMobileMenuToggle: () => void;
  collapsed: boolean;
  onToggle: () => void;
  avatarText: string;
};

export default function TopBar({
  onMobileMenuToggle,
  collapsed,
  onToggle,
  avatarText,
}: Props) {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs();
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutAction();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  useEffect(() => {
    if (!avatarMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && avatarMenuRef.current?.contains(event.target)) {
        return;
      }

      setAvatarMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAvatarMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [avatarMenuOpen]);

  const handleLogout = () => {
    setAvatarMenuOpen(false);

    logout(undefined, {
      onSuccess: (response: LogoutResponse) => {
        localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
        toast.success(response.message || "Logged out successfully.");
        router.replace(CONFIG.AUTH.HOME);
      },
      onError: (error) => {
        toast.error(error.message || "Unable to log out.");
      },
    });
  };

  return (
    <header className="h-15 shrink-0 flex items-center justify-between px-5 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
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

        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-1">
          {breadcrumbs.length > 0 ? (
            breadcrumbs.map((breadcrumb: Breadcrumb) => (
              <div key={breadcrumb.href} className="flex items-center gap-1">
                {breadcrumb.isActive ? (
                  // Active breadcrumb (last one)
                  <span className="text-gray-900 font-semibold text-[14px] leading-tight">
                    {breadcrumb.label}
                  </span>
                ) : (
                  // Clickable breadcrumb
                  <>
                    <Link
                      href={breadcrumb.href}
                      className="text-gray-600 hover:text-gray-900 font-medium text-[14px] leading-tight transition-colors"
                    >
                      {breadcrumb.label}
                    </Link>
                    <ChevronRight
                      size={16}
                      className="text-gray-300 shrink-0"
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            // Default text if no breadcrumbs
            <h1 className="text-gray-900 font-semibold text-[15px] leading-tight">
              Dashboard
            </h1>
          )}
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

        <div className="flex items-center">
          {/* Help and support */}
          <button title="Help and Support" onClick={() => router.push("/help")} className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer">
            <HelpCircle size={17} />
          </button>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00C950] border-2 border-white" />
          </button>
        </div>

        {/* Avatar */}
        <div ref={avatarMenuRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={avatarMenuOpen}
            aria-label="Open account menu"
            onClick={() => setAvatarMenuOpen((value) => !value)}
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1 py-1 pr-1.5 shadow-sm shadow-gray-200/40 transition-all hover:border-gray-300 hover:shadow-md cursor-pointer"
          >
            <Avatar className="w-8 h-8 rounded-full bg-[#00C950] flex items-center justify-center shadow-sm shadow-[#00C950]/20">
              <AvatarFallback className="text-[11px] uppercase font-bold text-white">
                {avatarText || "U"}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${avatarMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {avatarMenuOpen && (
            <div className="absolute right-0 top-12 z-40 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
              <Link
                href="/profile"
                onClick={() => setAvatarMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <CircleUser size={15} className="text-gray-400" />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setAvatarMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <Settings size={15} className="text-gray-400" />
                Settings
              </Link>

              <div className="my-1 h-px bg-gray-100" />

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <Loader2 size={15} className="animate-spin text-red-400" />
                ) : (
                  <LogOut size={15} className="text-red-400" />
                )}
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

