import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface Breadcrumb {
    label: string;
    href: string;
    isActive: boolean;
}

export function useBreadcrumbs(): Breadcrumb[] {
    const pathname = usePathname();

    return useMemo(() => {
        if (!pathname) {
            return [];
        }

        // Remove route group wrapping: (auth), (protected), (guest)
        const cleanPath = pathname
            .replace(/\/\([^)]+\)/g, "")
            .split("/")
            .filter(Boolean);

        if (cleanPath.length === 0) {
            return [];
        }

        const breadcrumbs: Breadcrumb[] = [];

        // Build breadcrumbs from the path
        let currentPath = "";
        cleanPath.forEach((segment, index) => {
            currentPath += `/${segment}`;
            
            // Format the label: convert kebab-case to Title Case
            const label = segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            breadcrumbs.push({
                label,
                href: currentPath,
                isActive: index === cleanPath.length - 1,
            });
        });

        return breadcrumbs;
    }, [pathname]);
}
