"use client";
import { useState } from "react";

export const usePricing = () => {
  const [yearly, setYearly] = useState(false);
  return {
    yearly,
    setYearly,
  };
};
