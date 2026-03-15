import {
  BusinessSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  Navbar,
} from "../components/home/sections";

import { CTASection } from "../components/home/sections/CTASection";
import { Footer } from "../components/home/sections/Footer";

import { PricingSection } from "../components/home/sections/PricingSection";
import { SocialProofSection } from "../components/home/sections/SocialProofSection";

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BusinessSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
