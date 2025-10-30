'use client'
// components/SheetProfileHeader.tsx

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import React from "react";
import {useAuth} from "@/components/provider/AuthProvider";
import {Pencil} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {SheetClose} from "@/components/ui/sheet";

function SheetProfileHeaderSkeleton() {
    return (
        <div className="flex items-center gap-3 p-2 w-full">
            {/* Avatar skeleton */}
            <div className="relative inline-block">
                <Skeleton className="h-12 w-12 rounded-full"/>
            </div>

            {/* Text content skeleton */}
            <div className="flex flex-col gap-2 mr-auto">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-3 w-24"/>
            </div>
        </div>
    );
}

export default function SheetProfileHeader() {
    const {user, isLoading} = useAuth();
    const initials = `${user?.name}${user?.surname[0]}`.toUpperCase();

    if (isLoading) {
        return <SheetProfileHeaderSkeleton/>;
    }

    return (
        <div className="flex items-center gap-3 w-full">
            <div className="relative inline-block outline-none">
                <Avatar className="h-12 w-12 cursor-pointer ring-2 ring-offset-1 ring-gray-200">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                    <AvatarImage src={''} alt={`${user?.name} ${user?.surname}`}/>
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span
                    className="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white bg-green-400"/>
            </div>
            <div className="flex flex-col mr-auto">
                <p className="font-semibold text-base text-gray-600">
                    {user?.name} {user?.surname}
                </p>
                <span className='text-xs text-gray-600 inline'>
                    @{user?.phone}
                </span>
            </div>
            <SheetClose asChild>
                <Link href={'/wkapwkpu'}>
                    <Pencil className={"w-5 h-5 text-gray-600"}/>
                </Link>
            </SheetClose>

        </div>
    );
}