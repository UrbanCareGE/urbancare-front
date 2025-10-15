"use client";

import Link from "next/link";
import {ChevronsUp, LucideIcon, MessageCircleMore, Newspaper} from "lucide-react";
import {usePathname} from "next/navigation";
import {Basic} from "@/app/layout";
import {cn} from "@/lib/utils";

interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

const NAV_ITEMS: NavItem[] = [
    {href: "/", icon: MessageCircleMore, label: "Chat"},
    {href: "/urgent", icon: ChevronsUp, label: "Urgent"},
    {href: "/post", icon: Newspaper, label: "Posts"},
];

export const MobileNavBar = ({className}: Basic) => {
    const pathname = usePathname();
    const activeIndex = NAV_ITEMS.findIndex(item => item.href === pathname);
    const activeIndexSafe = activeIndex === -1 ? 0 : activeIndex;

    // justify-evenly calculation with icon width consideration
    const getBackgroundPosition = (index: number) => {

        // 100%/n+1 - n*w(n)/n+1 * f(i) + 50% - w(bg)
        return `calc((25% - 6rem / 4 + 2rem) * ${index - 1} + 50% - 2rem)`
    };

    return (
        <>
            <footer className={cn("h-14 w-full flex justify-center items-center bg-white", className)}>

                <div className={"relative w-9/12 h-full flex justify-evenly items-center rounded-full"}>

                    <div
                        className="absolute w-16 h-12 bg-primary transition-all duration-300 ease-out rounded-3xl"
                        style={{
                            left: getBackgroundPosition(activeIndexSafe),
                            transition: 'left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                        suppressHydrationWarning
                    />

                    {/* Navigation items */}
                    {NAV_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = index === activeIndexSafe;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative z-10 flex items-center justify-center w-8 transition-colors duration-300"
                                aria-label={item.label}
                            >
                                <Icon
                                    className={`transition-colors duration-300 ${
                                        isActive ? "text-white" : "text-black"
                                    }`}
                                    size={28}
                                />
                            </Link>
                        );
                    })}
                </div>
            </footer>
        </>
    );
};
