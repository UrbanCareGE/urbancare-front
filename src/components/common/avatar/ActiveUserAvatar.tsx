'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {useAuth} from "@/components/provider/AuthProvider";
import {getClientFileUrl} from "@/lib/api-client";
import {Skeleton} from "@/components/ui/skeleton";

function ActiveUserAvatarSkeleton() {
    return (
        <div className="relative inline-block">
            <Skeleton className="h-12 w-12 rounded-full"/>
        </div>
    );
}

export const ActiveUserAvatar = () => {
    const {user, isLoading} = useAuth();
    const initials = `${user?.name[0]}${user?.surname[0]}`.toUpperCase();


    if (isLoading) {
        return <ActiveUserAvatarSkeleton/>;
    }

    return (
        <div className="relative inline-block outline-none">
            <Avatar className="cursor-pointer w-12 h-12 rounded-full">
                <AvatarImage src={getClientFileUrl(user?.profileImageId)} alt="@shadcn" className={'object-cover'}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white bg-green-400"/>
        </div>
    );
};
