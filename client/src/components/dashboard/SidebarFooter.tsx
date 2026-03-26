"use client";

import { bottomNavItems } from "@/src/lib/sidebarData";
import SidebarNavItem from "./SidebarNavItem";

type Props = {
    collapsed: boolean;
};

// Mock user — replace with real auth data
const mockUser = {
    name: "Rohan Shrestha",
    email: "rohan@example.com",
    plan: "Pro",
    initials: "RS",
};

export default function SidebarFooter({ collapsed }: Props) {
    return (
        <div className="border-t border-white/8 px-3 pt-3 pb-4 space-y-1 shrink-0">
            {/* Bottom nav items */}
            {bottomNavItems.map((item) => (
                <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
            ))}

            {/* User card */}
            <div
                className={`mt-3 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 ${
                collapsed ? "justify-center" : ""
                }`}
            >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-lg bg-[#00C950] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">
                        {mockUser.initials}
                    </span>
                </div>

                {!collapsed && (
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate leading-tight">
                            {mockUser.name}
                        </p>
                        <p className="text-white/35 text-[10px] truncate leading-tight">
                            {mockUser.email}
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