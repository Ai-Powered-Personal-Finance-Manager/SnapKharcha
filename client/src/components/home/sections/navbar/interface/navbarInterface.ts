import { Dispatch, SetStateAction } from "react";

export interface MobileNavigationHamburgerInterface {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}
export interface MobileNavigationSheetInterface {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  activeSection: string;
  handleRefNavigation: (link: string) => void;
}

export interface NavigationInterface {
  sectionRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export interface DesktopNavLinksInterface {
  activeSection: string;
  handleRefNavigation: (link: string) => void;
}
