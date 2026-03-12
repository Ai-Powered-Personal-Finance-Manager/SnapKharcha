import { BusinessSection } from "../components/home/sections/BusinessSection";
import { CTASection } from "../components/home/sections/CTASection";
import { FeaturesSection } from "../components/home/sections/FeaturesSection";
import { Footer } from "../components/home/sections/Footer";
import { HeroSection } from "../components/home/sections/HeroSection";
import { HowItWorksSection } from "../components/home/sections/HowItWorksSection";
import { Navbar } from "../components/home/sections/navbar/components/Navbar";
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
