import React from "react";
import {TypographyH3} from "@/components/common/text/Typography";

export type TextLogoProps = {
    className?: string;
}

export const TextLogo: React.FC<TextLogoProps> = ({className}) => {

    return <TypographyH3>
        <span className={"p-0 m-0"}>URBAN</span>
        <span className={"p-0 m-0 text-green-500"}>CARE</span>
    </TypographyH3>

}