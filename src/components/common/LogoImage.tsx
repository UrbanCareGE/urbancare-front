import Image from "next/image";
import React from "react";
import {cn} from "@/lib/utils";


type LogoImageProps = {
    className?: string;
}

export const LogoImage: React.FC<LogoImageProps> = ({className}) => {

    return (
        <Image
            src="/logo.png"
            alt="logo"
            height="52"
            width="52"
            className={cn("inline object-cover p-0 m-0", className)}
        />
    )
}