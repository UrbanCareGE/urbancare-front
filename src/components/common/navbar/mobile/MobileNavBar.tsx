"use client";

import Link from "next/link";
import {ChevronsUp, HouseIcon, LucideIcon, MessageCircleMore, Newspaper, SendIcon, User} from "lucide-react";
import {usePathname} from "next/navigation";
import {Basic} from "@/app/layout";
import {cn} from "@/lib/utils";
import {useMobileScroll} from "@/hooks/use-mobile-scroll";

interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

const NAV_ITEMS: NavItem[] = [
    {href: "/post", icon: HouseIcon, label: "Posts"},
    {href: "/urgent", icon: ChevronsUp, label: "Urgent"},
    {href: "/", icon: SendIcon, label: "Chat"},
    {href: "/news", icon: Newspaper, label: "News"},
    {href: "/profile", icon: User, label: "Profile"},
];

export const MobileNavBar = ({className}: Basic) => {
    const pathname = usePathname();
    const activeIndex = NAV_ITEMS.findIndex(item => item.href === pathname);
    const {isVisible} = useMobileScroll()

    // justify-evenly calculation with icon width consideration
    const getBackgroundPosition = (index: number) => {
        // 100%/n+1 - n*w(n)/n+1 * f(i) + 50% - w(bg)
        return `calc((16.6% - 10rem / 6 + 2rem) * ${index - 2} + 50% - 1.5rem)`
    };

    return (
        <>
            <footer
                suppressHydrationWarning
                className={cn(
                    "fixed bottom-0 left-0 right-0 h-16 w-full flex justify-center items-center shadow-xl rounded-tr-panel bg-white transition-transform duration-300 ease-in-out z-[40] will-change-transform border-t",
                    isVisible ? "translate-y-0" : "translate-y-full",
                    className
                )}
            >
                <nav className={"relative w-full h-full flex justify-evenly items-center rounded-full"}>
                    <div
                        className="absolute w-12 h-12 bg-primary transition-all duration-300 ease-out rounded-3xl"
                        style={{
                            left: getBackgroundPosition(activeIndex),
                            transition: 'left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                        suppressHydrationWarning
                    />

                    {/* Navigation items */}
                    {NAV_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = index === activeIndex;

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
                </nav>
            </footer>
        </>
    );
};