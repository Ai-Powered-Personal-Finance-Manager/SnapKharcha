/*
@author: Deepesh Sunuwar
@description: Reusable Logo component
*/

import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-[#0099ff]/20 group-hover:shadow-[#0099ff]/40 transition-all duration-300">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div> */}
      <span
        className="text-black font-bold text-2xl max-md:text-xl tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Snap<span className="text-[#00C950]">Kharcha</span>
      </span>
      {/* <Image src="/main-logo.png" alt="SnapKharcha Logo" width={150} height={100} /> */}
    </Link>
  );
};
