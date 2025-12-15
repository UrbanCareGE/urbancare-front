"use client";

import Link from "next/link";
import {ComponentPropsWithoutRef, forwardRef, ReactNode} from "react";
import {cn} from "@/lib/utils";
import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
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
                    "h-11 group w-full flex items-center gap-1 rounded-panel px-1 py-2", className,)}
                aria-current={isActive ? "page" : undefined}
            >
                {navigationItem.icon && (
                    <div className={cn(
                        "flex-shrink-0 p-2 flex justify-center items-center text-icon",
                        {"text-icon": isActive},
                    )}>
                        {navigationItem.icon}
                    </div>
                )}
                <p className="flex-1 text-text-primary/80 text-left truncate leading-tight font-medium text-lg">
                    {navigationItem.label}
                </p>
            </Link>
        );
    }
);

NavigationLink.displayName = "NavigationLink";