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

export type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

const navigationItems: NavItem[] = [
    {href: "/urgent", label: "სასწრაფო", icon: <ShieldAlertIcon className={"text-primary"}/>},
    {href: "/thread/news", label: "სიახლეები", icon: <MegaphoneIcon className={"text-primary"}/>},
    {
        href: "/thread/services", label: "სერვისები", icon: <PocketKnifeIcon className={"text-primary"}/>, children: [
            {href: "/learn", label: "განათლება", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/sport", label: "ფიტნესი", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/vet", label: "ვეტი", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/craft", label: "ხელობა", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/other", label: "სხვა", icon: <SettingsIcon className={"text-primary"}/>},
        ],
    },
    {href: "/thread/requests", label: "მოთხოვნები", icon: <ClipboardListIcon className={"text-primary"}/>},
    {href: "/thread/active/labour", label: "მიმდინარე სამუშაოები", icon: <PaintRollerIcon className={"text-primary"}/>},
    {
        href: "/thread/notice", label: "განცხადებები", icon: <ScrollTextIcon className={"text-primary"}/>, children: [
            {href: "/apartment", label: "ბინა", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/car", label: "მანქანა", icon: <SettingsIcon className={"text-primary"}/>},
            {href: "/parking", label: "პარკინგი", icon: <SettingsIcon className={"text-primary"}/>},
        ]
    },
    {href: "/documents", label: "დოკუმენტები", icon: <FileUser className={"text-primary"}/>},
    {href: "/info", label: "ინფორმაცია", icon: <BookOpenIcon className={"text-primary"}/>},
    {href: "/finance", label: "ფინანსები", icon: <LandmarkIcon className={"text-primary"}/>},
];

const NavigationArea = () => {
    return (
        <div className={"w-full flex flex-col gap-1 py-3"}>
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