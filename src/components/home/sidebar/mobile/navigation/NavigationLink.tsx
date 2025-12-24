"use client";

import Link from "next/link";
import {ComponentPropsWithoutRef, forwardRef, ReactNode} from "react";
import {cn} from "@/lib/utils";
import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {usePathname} from "next/navigation";
import {SheetClose} from "@/components/ui/sheet";

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
            <SheetClose asChild>
                <Link
                    ref={ref}
                    {...props}
                    className={cn(
                        "h-9 group w-full flex items-center gap-2 rounded-panel px-1", className,)}
                    aria-current={isActive ? "page" : undefined}
                >
                    {navigationItem.icon && (
                        <div className={cn(
                            "flex-shrink-0 p-2 flex justify-center items-center bg-primary-container/50 text-primary-container-foreground rounded-panel", navigationItem.className)}>
                            {navigationItem.icon}
                        </div>
                    )}
                    <p className="flex-1 text-foreground-primary text-left truncate leading-tight tracking-wide font-normal text-lg">
                        {navigationItem.label}
                    </p>
                </Link>
            </SheetClose>
        );
    }
);

NavigationLink.displayName = "NavigationLink";