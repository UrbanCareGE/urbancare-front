'use client'

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import {HeaderNavigationButton} from "@/components/common/header/HeaderNavigationButton";
import {Globe, Headset, Newspaper} from "lucide-react";
import {HouseIcon} from "@/components/common/icons";

const masterBarRoutes = [
    {
        title: "home",
        navigationPath: "/home",
        icon: <HouseIcon width={48} height={48} stroke={'black'}/>
    },
    {
        title: "feed",
        navigationPath: "/about",
        icon: <Newspaper width={48} height={48} stroke={'black'}/>
    },
    {
        title: "global",
        navigationPath: "/gallery",
        icon: <Globe width={48} height={48} stroke={'black'}/>
    },
    {
        title: "support",
        navigationPath: "/help",
        icon: <Headset width={48} height={48} stroke={'black'}/>
    }
]

type NavigationPanelProps = {} & React.HTMLAttributes<HTMLElement>;

export const MasterBarNavigation: React.FC<NavigationPanelProps> = () => {
    const pathName = usePathname();
    const [hovered, setHovered] = useState<string | null>(null)

    return (
        <div className={"flex justify-between items-center gap-2 h-full"}>
            {
                masterBarRoutes.map((btn, i) => {
                        const highlightActive: boolean = pathName === btn.navigationPath && hovered === null;
                        const highlightHover: boolean = hovered === btn.navigationPath;
                        return <HeaderNavigationButton title={btn.title}
                                                       navigationPath={btn.navigationPath}
                                                       icon={btn.icon}
                                                       key={i}
                                                       onMouseEnter={() => setHovered(btn.navigationPath)}
                                                       onMouseLeave={() => setHovered(null)}
                                                       className={(highlightActive || highlightHover) ? ("border-primary rounded-none [&>svg]:stroke-primary" + (highlightHover ? " " : "")) : "border-white"}
                        />
                    }
                )
            }
        </div>
    )

}