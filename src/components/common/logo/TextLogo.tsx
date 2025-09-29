import React from "react";
import {TypographyH3} from "@/components/common/text/Typography";

export type TextLogoProps = {
    className?: string;
}

export const TextLogo: React.FC<TextLogoProps> = ({className}) => {
    return <TypographyH3>
        <span className={""}>URBAN</span>
        <span className={"text-3xl text-primary"}>CARE</span>
    </TypographyH3>

}