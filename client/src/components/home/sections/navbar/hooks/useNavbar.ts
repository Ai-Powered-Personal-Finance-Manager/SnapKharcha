/*
@author: Rohan Shrestha
@refactored by: Deepesh Sunuwar
@description: custom hook for navbar
*/

"use client";
import { useEffect, useState } from "react";

export const useNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrolled,
    menuOpen,
    setScrolled,
    setMenuOpen,
  };
};
