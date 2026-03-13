"use client";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/src/lib/utils";
import { Logo } from "../../Logo";
import { navLinks } from "../data/navlinks";
import { useNavbar } from "../hooks/useNavbar";
import { MobileNavigationHamburgerInterface } from "../interface/navbarInterface";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  const navbar = useNavbar();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        navbar.scrolled
          ? "bg-white backdrop-blur-xl shadow-lg "
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl px-6 mx-auto py-4 flex items-center justify-between">
        <Logo />

        {/* DESKTOP NAV LINKS */}
        <DesktopNavigation />

        {/* CTA BUTTONS */}
        <CTAButtons />

        {/* Mobile Menu */}
        <MobileNavigationHamburger
          menuOpen={navbar.menuOpen}
          setMenuOpen={navbar.setMenuOpen}
        />
      </div>

      <MobileNavigationSheet
        menuOpen={navbar.menuOpen}
        setMenuOpen={navbar.setMenuOpen}
      />
    </nav>
  );
};

const DesktopNavigation = () => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.label}
          href={link.href}
          label={link.label}
          className="relative group"
          children={
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00C950] group-hover:w-full transition-all duration-300" />
          }
        />
      ))}
    </div>
  );
};

const CTAButtons = () => {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <NavLink href="/auth/login" label="Sign In" className="px-4 py-2" />

      <NavLink
        href="/auth/register"
        label="Get Started Free"
        className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-green-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#00C950]/20 hover:shadow-[#00C950]/40 hover:scale-105"
      />
    </div>
  );
};

const MobileNavigationHamburger = ({
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

const MobileNavigationSheet = ({
  menuOpen,
  setMenuOpen,
}: MobileNavigationHamburgerInterface) => {
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent className="bg-white backdrop-blur-xl border-t border-[#1e1e2e] px-6 py-4 flex flex-col gap-4">
        <SheetTitle>
          <Logo />
        </SheetTitle>
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            href={link.href}
            label={link.label}
            onClick={() => setMenuOpen(false)}
            className="text-black text-base font-medium transition-colors duration-200 py-2"
          />
        ))}

        <div className="flex flex-col mt-auto gap-3 pt-2">
          <NavLink
            href="/auth/login"
            label="Sign In"
            className="flex-1 text-center text-sm hover:text-black py-2.5 border border-[#1e1e2e] rounded-xl transition-colors duration-200 text-black"
          />
          <NavLink
            href="/auth/register"
            label="Get Started"
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-green-500 text-white"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
