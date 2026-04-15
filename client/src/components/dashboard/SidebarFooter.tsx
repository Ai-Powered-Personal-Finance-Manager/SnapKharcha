"use client";

import { CONFIG } from "@/src/core/config";
import { localStorageUtil } from "@/src/core/utils";
import { CapitalizeFirst } from "@/src/core/utils/capitalizeFirst";
import { bottomNavItems } from "@/src/lib/sidebarData";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import SidebarNavItem from "./SidebarNavItem";
import { UserInterface } from "./interface/userInterface";

type Props = {
  collapsed: boolean;
  user: UserInterface;
};

// Mock user — replace with real auth data
const mockUser = {
  plan: "Pro",
};

export default function SidebarFooter({ collapsed, user }: Props) {
  const router = useRouter();
  //later refactor useLogout
  const useLogout = () => {
    localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
    router.replace(CONFIG.AUTH.HOME);
  };
  return (
    <div className="border-t border-white/8 px-3 pt-3 pb-4 space-y-1 shrink-0">
      {/* Bottom nav items */}
      {bottomNavItems.map((item) => (
        <SidebarNavItem
          onClick={useLogout}
          key={item.href}
          item={item}
          collapsed={collapsed}
        />
      ))}

      {/* User card */}
      <div
        className={`mt-3 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        {/* Avatar */}
        <Avatar className="w-7 h-7 rounded-lg bg-[#00C950] flex items-center justify-center shrink-0">
          <AvatarFallback className="text-[10px] font-bold uppercase text-white">
            {user?.name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate leading-tight">
              {CapitalizeFirst(user?.name)}
            </p>
            <p className="text-white/35 text-[10px] truncate leading-tight">
              {user?.email}
            </p>
          </div>
        )}

        {!collapsed && (
          <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#00C950]/15 text-[#00C950] border border-[#00C950]/20">
            {mockUser.plan}
          </span>
        )}
      </div>
    </div>
  );
}
