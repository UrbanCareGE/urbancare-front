import {NavigationLink} from "@/components/home/sidebar/mobile/navigation/NavigationLink";
import {
    Building2Icon,
    FileUser,
    Headset,
    LandmarkIcon,
    NewspaperIcon,
    Rss,
    SettingsIcon,
    ShieldAlertIcon
} from "lucide-react";
import React from "react";
import {NavigationGroupLink} from "@/components/home/sidebar/mobile/navigation/NavigationGroup";
import {SheetClose} from "@/components/ui/sheet";

export type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

export const navigationItems: NavItem[] = [
    {href: "/news", label: "სიახლეები", icon: <NewspaperIcon/>},
    {href: "/applications", label: "განცხადებები", icon: <FileUser/>},
    {href: "/urgent", label: "სასწრაფო", icon: <ShieldAlertIcon/>},
    {
        href: "/services", label: "სერვისები", icon: <Building2Icon/>, children: [
            {href: "/bla1", label: "ჩემი სერვისები", icon: <SettingsIcon/>},
            {href: "/", label: "ზოგადი სერვისები", icon: <SettingsIcon/>},
        ],
    },
    {
        href: "/bla", label: "მოთხოვნები", icon: <SettingsIcon/>, children: [
            {href: "/bla2", label: "მოთხოვნები", icon: <SettingsIcon/>},
            {href: "/blu2", label: "სიახლეები", icon: <SettingsIcon/>},
            {href: "/pla2", label: "განცხადებები", icon: <SettingsIcon/>},
        ]
    },
    {href: "/finance", label: "ფინანსები", icon: <LandmarkIcon/>},
    {href: "/support", label: "dახმარება", icon: <Headset/>},
];

type NavigationAreaProps = {
    navItems: NavItem[];
}

export const NavigationArea = ({navItems}: NavigationAreaProps) => {
    return (
        <div className={"h-full w-full flex flex-col gap-1 py-3"}>
            {navItems.map(navigationItem => {
                if (navigationItem.children && navigationItem.children.length > 0) {
                    return <NavigationGroupLink key={navigationItem.href} navigationItem={navigationItem}/>
                } else {
                    return <SheetClose key={navigationItem.href + 'close'} asChild>
                        <NavigationLink key={navigationItem.href} navigationItem={navigationItem}
                                        href={navigationItem.href}/>
                    </SheetClose>;
                }
            })
            }
        </div>
    )
}