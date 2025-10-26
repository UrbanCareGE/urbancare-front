"use client";

import Link from "next/link";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {NavItem} from "@/components/home/navigation-panel/NavigationArea";
import {usePathname} from "next/navigation";

type NavigationButtonProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

export const NavigationLink = ({
                                   navigationItem,
                                   className,
                               }: NavigationButtonProps) => {
    const pathname = usePathname();

    const isActive = pathname === navigationItem.href ||
        (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    return (
        <Link
            href={navigationItem.href}
            className={cn(
                "h-11 group relative w-full flex items-center justify-between transition-all duration-200 rounded-panel px-4 py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                    ? "bg-primary text-white shadow-sm hover:bg-primary/90"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                className,
            )}
            aria-current={isActive ? "page" : undefined}
        >
            <p className={cn(
                "flex-1 text-left truncate",
                isActive && "font-semibold"
            )}>
                {navigationItem.label}
            </p>

            {navigationItem.icon && (
                <div className={cn(
                    "flex-shrink-0 transition-all duration-200 rotate-180",
                    isActive
                        ? "text-primary-foreground scale-110"
                        : "text-gray-700 group-hover:text-gray-700 group-hover:scale-105"
                )}>
                    {navigationItem.icon}
                </div>
            )}
        </Link>
    );
};