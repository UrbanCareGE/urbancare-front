'use client'

import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {Bell, MessageCircleMore, Newspaper, Settings} from "lucide-react";
import {ProfileBarButton} from "@/components/home/profile-bar/ProfileBarButton";


export const ProfileHeader = () => {
    return (
        <div className={"flex w-full h-full justify-between items-center"}>
            <ActiveUserAvatar/>
            <div className={"flex gap-2"}>
                <ProfileBarButton logo={<MessageCircleMore/>} href="/messages"/>
                <ProfileBarButton logo={<Newspaper/>} href="/news"/>
                <ProfileBarButton logo={<Bell/>} href="/notifications"/>
                <ProfileBarButton logo={<Settings/>} href="/settings"/>
            </div>
        </div>
    );
};
