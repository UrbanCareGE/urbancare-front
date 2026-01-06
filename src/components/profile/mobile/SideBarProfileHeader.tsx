'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {useAuth} from "@/components/provider/AuthProvider";
import {Skeleton} from "@/components/ui/skeleton";
import {getClientFileUrl} from "@/lib/api-client";

function ProfileSideBarViewSkeleton() {
    return (
        <div className="flex flex-1 items-center gap-3 w-full">
            {/* Avatar skeleton */}
            <div className="relative inline-block">
                <Skeleton className="h-16 w-16 rounded-full"/>
            </div>

            {/* Text content skeleton */}
            <div className="flex flex-col gap-2 mr-auto">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-3 w-24"/>
            </div>
        </div>
    );
}

export const SideBarProfileHeader = () => {
    const {user, isLoading} = useAuth();
    // const initials = `${user?.name[0]}${user?.surname[0]}`.toUpperCase();
    const initials = 'temp'

    if (isLoading) {
        return <ProfileSideBarViewSkeleton/>;
    }

    return (
        <div className="flex flex-1 items-center gap-3 w-full">
            <div className="relative inline-block outline-none">
                <Avatar className="h-16 w-16 cursor-pointer ring-2 ring-offset-1 ring-gray-200">
                    <AvatarImage src={getClientFileUrl(user?.profileImageId)} alt="@shadcn" className={'object-cover'}/>
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span
                    className="absolute bottom-0 right-0 block w-4 h-4 rounded-full border-2 border-white bg-green-400"/>
            </div>
            <div className="flex flex-col mr-auto">
                <p className="font-semibold text-xl">
                    {user?.name} {user?.surname}
                </p>
                <span className='text-base text-sky-950 inline'>
                    @{user?.phone}
                </span>
            </div>
        </div>
    );
};
