import React from "react";
import {TypographyH2} from "@/components/common/text/Typography";
import {AppLogo} from "@/components/common/logo/AppLogo";

type RegisterHeaderProps = {
    className?: string
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = () => {
    return <div className={"flex flex-col justify-center items-center w-full py-4"}>
        <AppLogo/>
        <TypographyH2>ანგარიშის შექმნა</TypographyH2>
    </div>
}