"use client";

import Link from "next/link";
import {CircleUser, HouseIcon, LucideIcon, Newspaper, SendIcon, ShieldAlert} from "lucide-react";
import {useParams, usePathname} from "next/navigation";
import {Basic} from "@/app/layout";
import {cn} from "@/lib/utils";
import {useMobileScroll} from "@/hooks/use-mobile-scroll";

interface NavItem {
    path: string; // relative path within apartment (empty string for home)
    icon: LucideIcon;
    label: string;
    isAbsolute?: boolean; // for routes outside apartment like /profile
}

const NAV_ITEMS: NavItem[] = [
    {path: "post", icon: HouseIcon, label: "Posts"},
    {path: "urgent", icon: ShieldAlert, label: "Urgent"},
    {path: "", icon: SendIcon, label: "Chat"},
    {path: "news", icon: Newspaper, label: "News"},
    {path: "/profile", icon: CircleUser, label: "Profile", isAbsolute: true},
];

export const MobileNavBar = ({className}: Basic) => {
    const pathname = usePathname();
    const {apartmentId} = useParams<{ apartmentId: string }>();

    const getHref = (item: NavItem) => {
        if (item.isAbsolute) return item.path;
        if (!apartmentId) return '/';
        return item.path ? `/apartment/${apartmentId}/${item.path}` : `/apartment/${apartmentId}`;
    };

    const isActive = (item: NavItem) => {
        const href = getHref(item);
        return pathname === href;
    };

    const activeIndex = NAV_ITEMS.findIndex(item => isActive(item));
    const {isVisible} = useMobileScroll()

    // justify-evenly calculation with icon width consideration
    const getBackgroundPosition = (index: number) => {
        // 100%/n+1 - n*w(n)/n+1 * f(i) + 50% - w(bg)
        return `calc((16.66666666% - 10rem / 6 + 2rem) * ${index - 2} + 50% - 1.75rem)`
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
                        className={cn("absolute w-14 h-11 bg-primary transition-all duration-300 ease-out rounded-xl", {
                            "hidden": activeIndex < 0
                        })}
                        style={{
                            left: getBackgroundPosition(activeIndex),
                            transition: 'left 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
                        }}
                        suppressHydrationWarning
                    />

                    {/* Navigation items */}
                    {NAV_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isItemActive = index === activeIndex;
                        const href = getHref(item);

                        return (
                            <Link
                                key={item.path}
                                href={href}
                                className="relative z-10 flex items-center justify-center w-8 transition-colors duration-300"
                                aria-label={item.label}
                            >
                                <Icon
                                    className={`transition-colors duration-300 ${
                                        isItemActive ? "text-white" : "text-icon"
                                    }`}
                                    size={26}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </footer>
        </>
    );
};