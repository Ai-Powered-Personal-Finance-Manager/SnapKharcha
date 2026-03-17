"use client";
import { usePricing } from "../hooks/usePricing";
import { PricingHeader } from "./PricingHeader";
import { PricingMain } from "./PricingMain";

export const PricingSection = () => {
  const pricing = usePricing();

  return (
    <section
      id="pricing"
      className="relative bg-white py-28 px-6 lg:px-18 overflow-hidden"
    >
      <PricingHeader />

      <PricingMain setYearly={pricing.setYearly} yearly={pricing.yearly} />
    </section>
  );
};
