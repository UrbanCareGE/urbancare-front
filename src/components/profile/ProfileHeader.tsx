'use client'

import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {Bell, MessageCircleMore, Newspaper, Settings} from "lucide-react";
import {ProfileBarButton} from "@/components/home/profile-bar/ProfileBarButton";


export const ProfileHeader = () => {
    return (
        <div className={"flex w-full h-full justify-between items-center"}>
            <ActiveUserAvatar/>
            <div className={"flex gap-2"}>
                <ProfileBarButton>
                    <MessageCircleMore/>
                </ProfileBarButton>
                <ProfileBarButton>
                    <Newspaper/>
                </ProfileBarButton>
                <ProfileBarButton>
                    <Bell/>
                </ProfileBarButton>
                <ProfileBarButton>
                    <Settings/>
                </ProfileBarButton>
            </div>
        </div>
    );
};
