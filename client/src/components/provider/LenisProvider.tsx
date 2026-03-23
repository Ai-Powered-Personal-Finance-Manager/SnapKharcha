"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Init Lenis
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;
