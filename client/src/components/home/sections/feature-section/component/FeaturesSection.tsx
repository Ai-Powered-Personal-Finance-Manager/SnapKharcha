"use client";

import { featuresData } from "../data";
import { FeatureGrid } from "./FeatureGrid";
import { FeatureHeader } from "./FeatureHeader";
import { FeatureParticalEffects } from "./FeatureParticalEffects";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative bg-[#01271E] py-28 px-6 lg:px-18  overflow-hidden"
    >
      <FeatureParticalEffects />
      19
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <FeatureHeader />

        {/* Feature Grid */}
        <FeatureGrid featuresData={featuresData} />
      </div>
    </section>
  );
};
