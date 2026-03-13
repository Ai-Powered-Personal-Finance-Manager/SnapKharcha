import { Dispatch, SetStateAction } from "react";

export interface MobileNavigationHamburgerInterface {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}
