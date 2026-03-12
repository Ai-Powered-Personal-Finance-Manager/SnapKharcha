import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { NavLinkInterface } from "../interface/navbarInterface";

export const NavLink = ({
  href,
  label,
  className,
  children,
  onClick,
}: NavLinkInterface) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-[#8888aa] hover:text-black text-sm font-medium transition-colors duration-200",
        className,
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {label}
      {children}
    </Link>
  );
};
