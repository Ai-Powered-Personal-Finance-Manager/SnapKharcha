import { Dispatch, SetStateAction } from "react";

export interface NavLinkInterface {
  href: string;
  className?: string;
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface MobileNavigationHamburgerInterface {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}
