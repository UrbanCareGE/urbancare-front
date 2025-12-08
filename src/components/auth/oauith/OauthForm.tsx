import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import React from "react";
import {cn} from "@/lib/utils";
import {OauthLink} from "@/components/auth/oauith/OauthLink";

type OauthFormProps = {
    className?: string;
}

export const OauthForm = ({className}: OauthFormProps) => {
    return (
        <div className={cn("w-full flex justify-center items-center gap-3", className)}>
            <OauthLink href={"da"}>
                <GoogleIcon dimension={24}/>
                <span className="text-gray-500 hidden sm:inline">Google</span>
            </OauthLink>
            <OauthLink href={"da"}>
                <FacebookIcon dimension={24}/>
                <span className="text-gray-500 hidden sm:inline">Facebook</span>
            </OauthLink>
            <OauthLink href={"da"}>
                <AppleIcon dimension={24}/>
                <span className="text-gray-500 hidden sm:inline">Apple</span>
            </OauthLink>
        </div>
    );
};
