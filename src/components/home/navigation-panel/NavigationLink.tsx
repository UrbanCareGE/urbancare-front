"use client";

import Link from "next/link";
import {ComponentPropsWithoutRef, forwardRef, ReactNode} from "react";
import {cn} from "@/lib/utils";
import {NavItem} from "@/components/home/navigation-panel/NavigationArea";
import {usePathname} from "next/navigation";

type NavigationLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
} & ComponentPropsWithoutRef<typeof Link>; // Add this to accept all Link props

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
    ({navigationItem, className, ...props}, ref) => { // Destructure ...props
        const pathname = usePathname();

        const isActive = pathname === navigationItem.href ||
            (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

        return (
            <Link
                ref={ref}
                {...props} // Spread all other props (including onClick from SheetClose)
                className={cn(
                    "h-11 group relative w-full flex items-center gap-2 transition-all duration-200 rounded-panel px-4 py-2",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                        ? "bg-primary text-white shadow-sm hover:bg-primary/90"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-600",
                    className,
                )}
                aria-current={isActive ? "page" : undefined}
            >
                {navigationItem.icon && (
                    <div className={cn(
                        "flex-shrink-0 transition-all duration-200",
                        isActive
                            ? "text-primary-foreground"
                            : "text-gray-600 group-hover:text-gray-400"
                    )}>
                        {navigationItem.icon}
                    </div>
                )}
                <p className={cn(
                    "flex-1 text-left truncate font-semibold text-lg",
                )}>
                    {navigationItem.label}
                </p>
            </Link>
        );
    }
);

NavigationLink.displayName = "NavigationLink";