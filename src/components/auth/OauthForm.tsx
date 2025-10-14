'use client'

import {Button} from "@/components/ui/button";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import React from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {AuthSpacer} from "@/components/auth/AuthSpacer";

type OauthFormProps = {
    className?: string;
}

export const OauthForm = ({className}: OauthFormProps) => {
    const router = useRouter();
    return (
        <div className={cn("w-full flex justify-evenly items-center gap-2", className)}>
            <AuthSpacer/>
            <Button
                variant="outline"
                type="button"
                onClick={async () => {
                    router.push("https://ivette-nonpropagable-dialectically.ngrok-free.dev/auth/google")
                }}
                className="flex-1 flex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <GoogleIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="text-gray-500 hidden sm:inline">Google</span>
            </Button>

            <Button
                variant="outline"
                type="button"
                disabled={false}
                className="flex-1 lex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <FacebookIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="text-gray-500 hidden sm:inline">Facebook</span>
            </Button>
            <Button
                variant="outline"
                type="button"
                disabled={false}
                className="flex-1 flex items-center bg-gray-200 justify-center gap-2 text-sm sm:text-base"
            >
                <AppleIcon className="sm:w-[30px] sm:h-[30px]"/>
                <span className="text-gray-500 hidden sm:inline">Apple</span>
            </Button>
            <AuthSpacer/>
        </div>
    );
};
