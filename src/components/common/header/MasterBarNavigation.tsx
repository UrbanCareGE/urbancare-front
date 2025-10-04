'use client'

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import {Globe, Headset, MessageCircleIcon, Newspaper} from "lucide-react";
import Link from "next/link";

const masterBarRoutes = [
    {
        title: "home",
        navigationPath: "/home",
        icon: <MessageCircleIcon width={24} height={24}/>
    },
    {
        title: "feed",
        navigationPath: "/about",
        icon: <Newspaper width={24} height={24}/>
    },
    {
        title: "global",
        navigationPath: "/gallery",
        icon: <Globe width={24} height={24}/>
    },
    {
        title: "support",
        navigationPath: "/help",
        icon: <Headset width={24} height={24}/>
    }
];

export const MasterBarNavigation: React.FC = () => {
    const pathName = usePathname();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <nav
            className="flex h-full items-center gap-4 px-2 py-1 rounded-xl
                 hover:bg-gray-100/60 transition-colors"
            onMouseLeave={() => setHovered(null)}
        >
            {masterBarRoutes.map((btn) => {
                const isActive = pathName === btn.navigationPath;
                const isHovered = hovered === btn.navigationPath;

                return (
                    <Link
                        key={btn.navigationPath}
                        href={btn.navigationPath}
                        onMouseEnter={() => setHovered(btn.navigationPath)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-panel transition-colors duration-200 hover:cursor-pointer
                         ${isActive ? "bg-primary text-white" : ""} 
                          ${isHovered && !isActive ? "bg-gray-200" : ""}`}
                    >
                        {btn.icon}
                    </Link>
                );
            })}
        </nav>
    );
};