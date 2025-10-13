'use client'

import {Button} from "@/components/ui/button";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import React from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

type OauthFormProps = {
    className?: string;
}

export const OauthForm = ({className}: OauthFormProps) => {
    const router = useRouter();
    return (
        <div className={cn("grid grid-cols-3 md:grid-cols-4 gap-2 w-full", className)}>
            <Button
                variant="outline"
                type="button"
                onClick={async () => {
                    router.push("https://ivette-nonpropagable-dialectically.ngrok-free.dev/auth/google")
                }}
                className="flex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <GoogleIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="hidden sm:inline">Google</span>
            </Button>

            <Button
                variant="outline"
                type="button"
                disabled={false}
                className="flex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <FacebookIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="hidden sm:inline">Facebook</span>
            </Button>
            <Button
                variant="outline"
                type="button"
                disabled={false}
                className="flex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <AppleIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="hidden sm:inline">Apple</span>
            </Button>
        </div>
    );
};
