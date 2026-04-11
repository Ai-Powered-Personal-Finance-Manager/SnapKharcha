"use client";

import type { NavItem } from "@/src/lib/sidebarData";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  item: NavItem;
  collapsed: boolean;
  onClick?: () => void;
};

const badgeColors = {
  green: "bg-[#00C950]/15 text-[#00C950]",
  red: "bg-red-500/15 text-red-400",
  amber: "bg-amber-500/15 text-amber-400",
};

export default function SidebarNavItem({ item, collapsed, onClick }: Props) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      // logout handler
      onClick={() => {
        if (item.isLogout && onClick) {
          onClick();
        }
      }}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-[#00C950]/12 text-[#00C950] shadow-sm"
          : "text-white/50 hover:text-white hover:bg-white/6",
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#00C950] rounded-r-full" />
      )}

      {/* Icon */}
      <Icon
        size={18}
        className={cn(
          "shrink-0 transition-colors",
          isActive
            ? "text-[#00C950]"
            : "text-white/40 group-hover:text-white/70",
        )}
      />

      {/* Label */}
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}

      {/* Badge */}
      {!collapsed && item.badge && (
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none",
            badgeColors[item.badgeColor ?? "green"],
          )}
        >
          {item.badge}
        </span>
      )}

      {/* Collapsed badge dot */}
      {collapsed && item.badge && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00C950]" />
      )}
    </Link>
  );
}
