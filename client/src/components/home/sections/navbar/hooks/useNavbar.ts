/*
@author: Rohan Shrestha
@refactored by: Deepesh Sunuwar
@description: custom hook for navbar
*/

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavigationInterface } from "../interface";

export const useNavbar = ({ sectionRefs }: NavigationInterface) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRefNavigation = useCallback(
    (section: string) => {
      const navbarHeight = navRef.current?.clientHeight || 0;
      const element = sectionRefs.current[section];

      if (!element) return;

      const rect = element.getBoundingClientRect();
      window.scrollTo({
        top: window.pageYOffset + rect.top - navbarHeight,
        behavior: "smooth",
      });
    },
    [sectionRefs],
  );

  //tracking active section
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = navRef.current?.clientHeight || 0;
      const scrollPosition = window.scrollY + navbarHeight + 10; // small offset

      let currentSection = "";

      for (const key in sectionRefs.current) {
        const section = sectionRefs.current[key];
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection = key;
            break;
          }
        }
      }

      setActiveSection(currentSection);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return {
    scrolled,
    menuOpen,
    setScrolled,
    setMenuOpen,
    activeSection,
    handleRefNavigation,
  };
};
