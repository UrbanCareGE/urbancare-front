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
    {href: "/news", label: "სიახლეები", icon: <NewspaperIcon className={"text-primary"}/>},
    {href: "/applications", label: "განცხადებები", icon: <FileUser className={"text-primary"}/>},
    {href: "/urgent", label: "სასწრაფო", icon: <ShieldAlertIcon className={"text-primary"}/>},
    {
        href: "/services", label: "სერვისები", icon: <Building2Icon className={"text-primary"}/>, children: [
            {href: "/bla1", label: "ჩემი სერვისები", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/", label: "ზოგადი სერვისები", icon: <SettingsIcon className={"text-primary"}/>},
        ],
    },
    {
        href: "/bla", label: "მოთხოვნები", icon: <SettingsIcon className={"text-primary"}/>, children: [
            {href: "/bla2", label: "მოთხოვნები", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/blu2", label: "სიახლეები", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/pla2", label: "განცხადებები", icon: <SettingsIcon className={"text-primary"}/>},
        ]
    },
    {href: "/finance", label: "ფინანსები", icon: <LandmarkIcon className={"text-primary"}/>},
    {href: "/support", label: "dახმარება", icon: <Headset className={"text-primary"}/>},
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