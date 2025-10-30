import {ProfileSideBarGroup} from "@/components/home/sidebar/mobile/profile/ProfieSideBarGroup";
import {ThemeSelector} from "@/components/common/util/ThemeSelector";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {NavigationLink} from "@/components/home/sidebar/mobile/navigation/NavigationLink";
import {HandshakeIcon, HeadsetIcon, Lock, SettingsIcon, ShieldUser, UserPen} from "lucide-react";
import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {SheetClose} from "@/components/ui/sheet";

export const profileItems: NavItem[] = [
    {href: "/news", label: "პარამეტრები", icon: <SettingsIcon/>},
    {href: "/applications", label: "პაროლი", icon: <Lock/>},
    {href: "/urgent", label: "უსაბრთხოება", icon: <ShieldUser/>},
];

export const preferenceItems: NavItem[] = [
    {href: "/news", label: "პარამეტრები", icon: <SettingsIcon/>},
    {href: "/applications", label: "პაროლი", icon: <Lock/>},
    {href: "/urgent", label: "უსაბრთხოება", icon: <ShieldUser/>},
];

export const supportItems: NavItem[] = [
    {href: "/news", label: "დახმარება", icon: <HeadsetIcon/>},
    {href: "/applications", label: "მოგვწერეთ", icon: <UserPen/>},
    {href: "/urgent", label: "წესები და პირობები", icon: <HandshakeIcon/>},
];

export const ProfileSideBarBody = () => {
    return (
        <div className={'w-full h-full flex flex-col overflow-scroll'}>
            <ProfileSideBarGroup className={"px-4"}>
                <ProfileSideBarGroup.Header title={'ფონი'}/>
                <ProfileSideBarGroup.Content>
                    <ThemeSelector/>
                </ProfileSideBarGroup.Content>
            </ProfileSideBarGroup>
            <Separator className={"bg-gray-200"}/>
            <ProfileSideBarGroup className={"px-4"}>
                <ProfileSideBarGroup.Header title={'ანგარიში'}/>
                <ProfileSideBarGroup.Content>
                    {profileItems.map((item, index) => (
                        <SheetClose asChild key={item.href}>
                            <NavigationLink className={"px-0 pr-2"} key={item.href} navigationItem={item}
                                            href={item.href}/>
                        </SheetClose>
                    ))}
                </ProfileSideBarGroup.Content>
            </ProfileSideBarGroup>
            <Separator className={"bg-gray-200"}/>
            <ProfileSideBarGroup className={"px-4"}>
                <ProfileSideBarGroup.Header title={'პრეფერენციები'}/>
                <ProfileSideBarGroup.Content>
                    {preferenceItems.map((item, index) => (
                        <SheetClose asChild key={item.href}>
                            <NavigationLink className={"px-0 pr-2"} key={item.href} navigationItem={item}
                                            href={item.href}/>
                        </SheetClose>
                    ))}
                </ProfileSideBarGroup.Content>
            </ProfileSideBarGroup>
            <Separator className={"bg-gray-200"}/>
            <ProfileSideBarGroup className={"px-4"}>
                <ProfileSideBarGroup.Header title={'დახმარება'}/>
                <ProfileSideBarGroup.Content>
                    {supportItems.map((item, index) => (
                        <SheetClose asChild key={item.href}>
                            <NavigationLink className={"px-0 pr-2"} key={item.href} navigationItem={item}
                                            href={item.href}/>
                        </SheetClose>
                    ))}
                </ProfileSideBarGroup.Content>
            </ProfileSideBarGroup>
        </div>
    );
};
