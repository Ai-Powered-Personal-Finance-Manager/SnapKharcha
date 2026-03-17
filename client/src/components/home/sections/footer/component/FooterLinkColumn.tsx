import Link from "next/link";
import { links } from "../data";
import { FooterNavInterface } from "../interface";

export const FooterLinkColumn = () => {
  return (
    <>
      {Object.entries(links).map(([category, items]) => (
        <div key={category}>
          <h4
            className="text-white text-sm font-bold mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {category}
          </h4>
          <ul className="space-y-2.5">
            {items.map((item: FooterNavInterface) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
