"use client";

import { X } from "lucide-react";
import SidebarFooter from "./SidebarFooter";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import { UserInterface } from "./interface/userInterface";

type Props = {
  open: boolean;
  onClose: () => void;
  user: UserInterface;
};

export default function MobileSidebar({ open, onClose, user }: Props) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#01271E] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-lg bg-white/8 text-white/40 hover:text-white hover:bg-white/8 transition-colors"
        >
          <X size={15} />
        </button>

        <div className="relative z-10 flex flex-col h-full">
          <SidebarLogo collapsed={false} />
          <SidebarNav collapsed={false} />
          <SidebarFooter user={user} collapsed={false} />
        </div>
      </div>
    </>
  );
}
