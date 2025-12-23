"use client";

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
import {useParams} from "next/navigation";

export type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

// Paths relative to /apartment/[apartmentId]/
const getNavigationItems = (apartmentId: string): NavItem[] => [
    {href: `/apartment/${apartmentId}/urgent`, label: "სასწრაფო", icon: <ShieldAlertIcon className={"text-icon"}/>},
    {href: `/apartment/${apartmentId}/thread/news`, label: "სიახლეები", icon: <MegaphoneIcon className={"text-icon"}/>},
    {
        href: `/apartment/${apartmentId}/thread/services`, label: "სერვისები", icon: <PocketKnifeIcon className={"text-icon"}/>, children: [
            {href: `/apartment/${apartmentId}/learn`, label: "განათლება", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/sport`, label: "ფიტნესი", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/vet`, label: "ვეტი", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/craft`, label: "ხელობა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/other`, label: "სხვა", icon: <SettingsIcon className={"text-icon"}/>},
        ],
    },
    {href: `/apartment/${apartmentId}/thread/requests`, label: "მოთხოვნები", icon: <ClipboardListIcon className={"text-icon"}/>},
    {href: `/apartment/${apartmentId}/thread/active/labour`, label: "მიმდინარე სამუშაოები", icon: <PaintRollerIcon className={"text-icon"}/>},
    {
        href: `/apartment/${apartmentId}/thread/notice`, label: "განცხადებები", icon: <ScrollTextIcon className={"text-icon"}/>, children: [
            {href: `/apartment/${apartmentId}/notice/apartment`, label: "ბინა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/notice/car`, label: "მანქანა", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/notice/parking`, label: "პარკინგი", icon: <SettingsIcon className={"text-icon"}/>},
        ]
    },
    {href: `/apartment/${apartmentId}/documents`, label: "დოკუმენტები", icon: <FileUser className={"text-icon h-5 w-5"}/>},
    {
        href: `/apartment/${apartmentId}/info`, label: "ინფორმაცია", icon: <BookOpenIcon className={"text-icon"}/>, children: [
            {href: `/apartment/${apartmentId}/info/contact`, label: "კონტაქტები", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/info/docs`, label: "წესდება", icon: <SettingsIcon className={"text-icon"}/>},
            {href: `/apartment/${apartmentId}/info/cars`, label: "ავტომობილები", icon: <SettingsIcon className={"text-icon"}/>}
        ]
    },
    {href: `/apartment/${apartmentId}/finance`, label: "ფინანსები", icon: <LandmarkIcon className={"text-icon"}/>},
];

const NavigationArea = () => {
    const {apartmentId} = useParams<{ apartmentId: string }>();
    const navigationItems = apartmentId ? getNavigationItems(apartmentId) : [];
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