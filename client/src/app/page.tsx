import Navbar from "@/src/components/home/Navbar";
import HeroSection from "@/src/components/home/HeroSection";
import FeaturesSection from "@/src/components/home/FeaturesSection";
import HowItWorksSection from "@/src/components/home/HowItWorksSection";
import BusinessSection from "@/src/components/home/BusinessSection";
import SocialProofSection from "@/src/components/home/SocialProofSection";
import PricingSection from "@/src/components/home/PricingSection";
import CTASection from "@/src/components/home/CTASection";
import Footer from "@/src/components/home/Footer";

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
