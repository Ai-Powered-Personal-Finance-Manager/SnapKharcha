"use client";
import LenisProvider from "../../../providers/LenisProvider";
import { useHomepageView } from "../hooks";
import {
  BusinessSection,
  CTASection,
  FeaturesSection,
  Footer,
  HeroSection,
  HowItWorksSection,
  Navbar,
  PricingSection,
  SocialProofSection,
} from "../sections";

export const HomepageView = () => {
  const homepageView = useHomepageView();

  return (
    <LenisProvider>
      <main className="bg-[#0a0a0f] min-h-screen">
        <Navbar sectionRefs={homepageView.sectionRefs} />

        <div id="/" ref={homepageView.registerSection("/")}>
          <HeroSection />
        </div>

        <div id="features" ref={homepageView.registerSection("#features")}>
          <FeaturesSection />
        </div>

        <div
          id="how-it-works"
          ref={homepageView.registerSection("#how-it-works")}
        >
          <HowItWorksSection />
        </div>

        <div id="business" ref={homepageView.registerSection("#business")}>
          <BusinessSection />
          <SocialProofSection />
        </div>

        <div id="pricing" ref={homepageView.registerSection("#pricing")}>
          <PricingSection />
          <CTASection />
        </div>

        <Footer sectionRefs={homepageView.sectionRefs} />
      </main>
    </LenisProvider>
  );
};
