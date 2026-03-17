import { Logo } from "../../../shared";
import { FooterBrandInterface } from "../interface";

export const FooterBrand = ({ navigation }: FooterBrandInterface) => {
  return (
    <div className="col-span-2">
      <Logo isFooter navigation={navigation} />

      <p
        className="text-gray-400 text-sm leading-relaxed mb-6 mt-4 max-w-xs"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        AI-powered personal and business finance management. Track expenses,
        snap bills, and get smart insights — all in one place.
      </p>
      <div className="flex items-center gap-3">
        {[
          { icon: "𝕏", label: "Twitter" },
          { icon: "in", label: "LinkedIn" },
          { icon: "f", label: "Facebook" },
          { icon: "◎", label: "Instagram" },
        ].map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00C950]/50 hover:bg-[#00C950]/10 transition-all duration-200 text-xs font-bold"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
};
