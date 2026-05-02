"use client";

import { mainNavSections } from "@/src/core/constant/sidebarData";
import SidebarNavItem from "./SidebarNavItem";

type Props = {
    collapsed: boolean;
};

export default function SidebarNav({ collapsed }: Props) {
    return (
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin">
            {mainNavSections.map((section, idx) => (
                <div key={idx} className="space-y-1">
                    {/* Section title */}
                    {section.title && !collapsed && (
                        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/25 select-none">
                            {section.title}
                        </p>
                    )}

                    {/* Divider when collapsed */}
                    {section.title && collapsed && (
                        <div className="mx-2 border-t border-white/8 my-2" />
                    )}

                    {section.items.map((item) => (
                        <SidebarNavItem
                            key={item.href}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}
                </div>
            ))}
        </nav>
    );
}