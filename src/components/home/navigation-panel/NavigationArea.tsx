import {NavigationLink} from "@/components/home/navigation-panel/NavigationLink";
import {SettingsIcon} from "lucide-react";
import React from "react";
import {NavigationGroupLink} from "@/components/home/navigation-panel/NavigationGroup";

export type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

export const navigationItems: NavItem[] = [
    {
        href: "/", label: "სერვისები", icon: <SettingsIcon/>, children: [
            {href: "/bla1", label: "მოთხოვნები", icon: <SettingsIcon/>},
            {href: "/blu1", label: "სიახლეები", icon: <SettingsIcon/>},
            {href: "/pla1", label: "განცხადებები", icon: <SettingsIcon/>},
        ],
    },
    {href: "/urgent", label: "ზოგადი სერვისები", icon: <SettingsIcon/>},
    {href: "/services", label: "ფინანსები", icon: <SettingsIcon/>},
    {
        href: "/bla", label: "მოთხოვნები", icon: <SettingsIcon/>, children: [
            {href: "/bla2", label: "მოთხოვნები", icon: <SettingsIcon/>},
            {href: "/blu2", label: "სიახლეები", icon: <SettingsIcon/>},
            {href: "/pla2", label: "განცხადებები", icon: <SettingsIcon/>},
        ]
    },
    {href: "/blu", label: "სიახლეები", icon: <SettingsIcon/>},
    {href: "/pla", label: "განცხადებები", icon: <SettingsIcon/>},
    {href: "/plu", label: "საპორტი", icon: <SettingsIcon/>},
];

type NavigationAreaProps = {
    navItems: NavItem[];
}

export const NavigationArea = ({navItems}: NavigationAreaProps) => {
    return (
        <div className={"h-full w-full flex flex-col gap-1"}>
            {navItems.map(navigationItem => {
                if (navigationItem.children && navigationItem.children.length > 0) {
                    return <NavigationGroupLink key={navigationItem.href} navigationItem={navigationItem}/>
                } else {
                    return <NavigationLink key={navigationItem.href} navigationItem={navigationItem}/>
                }
            })
            }
        </div>
    )
}
