import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { LinkButtonInterface } from "../interface";

export const LinkButton = ({
  href,
  label,
  className,
  children,
  onClick,
  dir,
}: LinkButtonInterface) => {
  return (
    <Link
      dir={dir}
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
