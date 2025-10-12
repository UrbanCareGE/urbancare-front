"use client";

import Link from "next/link";
import {ChevronsUp, MessageCircleMore, Newspaper} from "lucide-react";
import {usePathname} from "next/navigation";
import {LucideIcon} from "lucide-react";

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

export const MobileNavBar = () => {
    const pathname = usePathname();
    const activeIndex = NAV_ITEMS.findIndex(item => item.href === pathname);
    const activeIndexSafe = activeIndex === -1 ? 0 : activeIndex;

    // justify-evenly calculation with icon width consideration
    const getBackgroundPosition = (index: number) => {

        // 100%/n+1 - n*w(n)/n+1 * f(i) + 50% - w(bg)
        return `calc((25% - 6rem / 4 + 2rem) * ${index - 1} + 50% - 1.5rem)`
    };

    return (
        <footer className="h-16 w-full bg-white flex justify-center items-center">
            {/* Animated sliding background */}

            <div className={"relative w-64 h-full flex justify-evenly items-center rounded-full bg-gray-100"}>

                <div
                    className="absolute w-12 h-10 bg-primary transition-all duration-300 ease-out rounded-xl"
                    style={{
                        left: getBackgroundPosition(activeIndexSafe),
                    }}
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
                                size={24}
                            />
                        </Link>
                    );
                })}
            </div>
        </footer>
    );
};
