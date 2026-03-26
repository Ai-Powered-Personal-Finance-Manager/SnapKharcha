import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { LinkButton, Logo } from "../../../shared";
import { navLinks } from "../data";
import {
  MobileNavigationHamburgerInterface,
  MobileNavigationSheetInterface,
} from "../interface";

export const MobileNavigationHamburger = ({
  menuOpen,
  setMenuOpen,
}: MobileNavigationHamburgerInterface) => {
  return (
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="lg:hidden text-black p-2"
      aria-label="Toggle menu"
    >
      <div
        className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
      />
      <div
        className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
      />
      <div
        className={`w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  );
};

export const MobileNavigationSheet = ({
  menuOpen,
  setMenuOpen,
  activeSection,
  handleRefNavigation,
}: MobileNavigationSheetInterface) => {
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent className="bg-white backdrop-blur-xl border-t border-[#1e1e2e] px-6 py-4 flex flex-col gap-4">
        <SheetTitle>
          <Logo />
        </SheetTitle>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => {
              handleRefNavigation(link.href);
              setMenuOpen(false);
            }}
            className={cn(
              "text-[#8888aa] text-sm transition-colors duration-200 py-2",
              activeSection === link.href && "text-green-500",
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="flex flex-col mt-auto gap-3 pt-2">
          <LinkButton
            href="/auth/login"
            label="Sign In"
            className="flex-1 text-center text-sm hover:text-black py-2.5 border border-[#1e1e2e] rounded-xl transition-colors duration-200 text-black"
          />
          <LinkButton
            href="/auth/register"
            label="Get Started"
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-green-500 text-white"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
