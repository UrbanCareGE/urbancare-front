import React from "react";
import {TypographyH2} from "@/components/common/text/Typography";

type LoginHeaderProps = {
    className?: string
}

export const LoginHeader: React.FC<LoginHeaderProps> = () => {

    return <div className={"flex flex-col justify-center items-center w-full py-8"}>
        <TypographyH2>ავტორიზაცია</TypographyH2>
    </div>

}