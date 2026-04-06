/*
@author: Deepesh Sunuwar
@description: Reusable Logo component
*/

import { CONFIG } from "@/src/core/config";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { LogoInterface } from "../interface";

export const Logo = ({
  showIcon,
  isFooter,
  navigation,
  className,
}: LogoInterface) => {
  const handleRefNavigation = navigation;
  return (
    <Link
      href={CONFIG.AUTH.HOME}
      onClick={() => {
        // e.preventDefault();
        if (navigation) handleRefNavigation(CONFIG.AUTH.HOME);
      }}
      className={cn(" flex items-center gap-2 group", className)}
    >
      {showIcon && (
        <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-[#0099ff]/20 group-hover:shadow-[#0099ff]/40 transition-all duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <span
        className={cn(
          "text-black font-bold text-2xl max-md:text-xl tracking-tight",
          isFooter && "text-white",
        )}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Snap<span className="text-[#00C950]">Kharcha</span>
      </span>
    </Link>
  );
};
