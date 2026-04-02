"use client";
import { CONFIG } from "@/src/core/config";
import { cn } from "@/src/lib/utils";
import { LinkButton, Logo } from "../../../shared";
import { useNavbar } from "../hooks";
import { NavigationInterface } from "../interface";
import { DesktopNavigation } from "./DesktopNavigation";
import {
  MobileNavigationHamburger,
  MobileNavigationSheet,
} from "./MobileNavigation";

export const Navbar = ({ sectionRefs }: NavigationInterface) => {
  const navbar = useNavbar({ sectionRefs: sectionRefs });

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 px-6 z-50 transition-all duration-500",
        navbar.scrolled
          ? "bg-white backdrop-blur-xl shadow-lg "
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        <Logo navigation={navbar.handleRefNavigation} />

        {/* DESKTOP NAV LINKS */}
        <DesktopNavigation
          activeSection={navbar.activeSection}
          handleRefNavigation={navbar.handleRefNavigation}
        />

        {/* CTA BUTTONS */}
        <CTAButtons />

        {/* Mobile Menu */}
        <MobileNavigationHamburger
          menuOpen={navbar.menuOpen}
          setMenuOpen={navbar.setMenuOpen}
        />
      </div>

      <MobileNavigationSheet
        activeSection={navbar.activeSection}
        handleRefNavigation={navbar.handleRefNavigation}
        menuOpen={navbar.menuOpen}
        setMenuOpen={navbar.setMenuOpen}
      />
    </nav>
  );
};

const CTAButtons = () => {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <LinkButton
        href={CONFIG.AUTH.LOGIN}
        label="Sign In"
        className="px-4 py-2 text-black font-semibold"
      />

      <LinkButton
        href={CONFIG.AUTH.FORGOT_PASSWORD}
        label="Get Started Free"
        className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-green-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#00C950]/20 hover:shadow-[#00C950]/40 hover:scale-105"
      />
    </div>
  );
};
