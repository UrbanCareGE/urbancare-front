import React from "react";
import {TypographyH2} from "@/components/common/text/Typography";

type RegisterHeaderProps = {
    className?: string
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = () => {
    return <div className={"flex flex-col justify-center items-center w-full py-4"}>
        <TypographyH2><span className={"text-primary"}>ანგარიშის</span> შექმნა</TypographyH2>
    </div>
}