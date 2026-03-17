/*
@author: Deepesh Sunuwar
@description: useHomepage hook for homepageview
*/
"use client";
import { useCallback, useRef } from "react";

export const useHomepageView = () => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // this is a helper function for Removing null return issue of Ref. el
  const registerSection = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      sectionRefs.current[key] = el;
    },
    [],
  );
  return {
    sectionRefs,
    registerSection,
  };
};
