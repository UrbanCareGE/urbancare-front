import {NavigationLink} from "@/components/home/sidebar/mobile/navigation/NavigationLink";
import {
    BookOpenIcon,
    ClipboardListIcon,
    FileUser,
    LandmarkIcon,
    MegaphoneIcon,
    PaintRollerIcon,
    PocketKnifeIcon,
    ScrollTextIcon,
    SettingsIcon,
    ShieldAlertIcon
} from "lucide-react";
import React from "react";
import {NavigationLinkAccordion} from "@/components/home/sidebar/mobile/navigation/NavigationLinkAccordion";
import {SheetClose} from "@/components/ui/sheet";
import {Card} from "@/components/ui/card";

export type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

const navigationItems: NavItem[] = [
    {href: "/urgent", label: "სასწრაფო", icon: <ShieldAlertIcon className={"text-icon"}/>},
    {href: "/thread/news", label: "სიახლეები", icon: <MegaphoneIcon className={"text-icon"}/>},
    {
        href: "/thread/services", label: "სერვისები", icon: <PocketKnifeIcon className={"text-icon"}/>, children: [
            {href: "/learn", label: "განათლება", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/sport", label: "ფიტნესი", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/vet", label: "ვეტი", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/craft", label: "ხელობა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/other", label: "სხვა", icon: <SettingsIcon className={"text-icon"}/>},
        ],
    },
    {href: "/thread/requests", label: "მოთხოვნები", icon: <ClipboardListIcon className={"text-icon"}/>},
    {href: "/thread/active/labour", label: "მიმდინარე სამუშაოები", icon: <PaintRollerIcon className={"text-icon"}/>},
    {
        href: "/thread/notice", label: "განცხადებები", icon: <ScrollTextIcon className={"text-icon"}/>, children: [
            {href: "/apartment", label: "ბინა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/car", label: "მანქანა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/parking", label: "პარკინგი", icon: <SettingsIcon className={"text-icon"}/>},
        ]
    },
    {href: "/documents", label: "დოკუმენტები", icon: <FileUser className={"text-icon h-5 w-5"}/>},
    {
        href: "/info", label: "ინფორმაცია", icon: <BookOpenIcon className={"text-icon"}/>, children: [
            {href: "/info/contact", label: "კონტაქტები", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/info/docs", label: "წესდება", icon: <SettingsIcon className={"text-icon"}/>},
            {href: "/info/cars", label: "ავტომობილები", icon: <SettingsIcon className={"text-icon"}/>}
        ]
    },
    {href: "/finance", label: "ფინანსები", icon: <LandmarkIcon className={"text-icon"}/>},
];

const NavigationArea = () => {
    return (
        <div className={"w-full flex flex-col p-1"}>
            {navigationItems.map(navigationItem => {
                if (navigationItem.children && navigationItem.children.length > 0) {
                    return <NavigationLinkAccordion key={navigationItem.href} navigationItem={navigationItem}/>
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


export default NavigationArea;