import {
  FeaturesSection,
  HeroSection,
  Navbar,
} from "../components/home/sections";
import { BusinessSection } from "../components/home/sections/BusinessSection";
import { CTASection } from "../components/home/sections/CTASection";
import { Footer } from "../components/home/sections/Footer";
import { HowItWorksSection } from "../components/home/sections/HowItWorksSection";
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
