import Link from "next/link";
import { navLinks } from "../data";
import { DesktopNavLinksInterface } from "../interface";

export const DesktopNavigation = ({
  activeSection,
  handleRefNavigation,
}: DesktopNavLinksInterface) => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => (
        <li className="list-none" key={link.href}>
          <Link
            href={link.href}
            className={`transition text-sm text-[#8888aa] ${
              activeSection === link.href && "text-green-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleRefNavigation(link.href);
            }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </div>
  );
};
