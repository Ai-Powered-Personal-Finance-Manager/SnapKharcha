"use client";
import { useNavbar } from "../../navbar/hooks";
import { NavigationInterface } from "../../navbar/interface";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterBrand } from "./FooterBrand";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { Newsletter } from "./Newsletter";

export const Footer = ({ sectionRefs }: NavigationInterface) => {
  const footer = useNavbar({ sectionRefs: sectionRefs });
  return (
    <footer className="bg-gray-900 px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <FooterBrand navigation={footer.handleRefNavigation} />

          {/* Link columns */}
          <FooterLinkColumn />
        </div>

        {/* Newsletter */}
        <Newsletter />

        {/* Bottom bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
};
