import React from "react";
import {TypographyH2} from "@/components/common/text/Typography";

type LoginHeaderProps = {
    className?: string
}

export const LoginHeader: React.FC<LoginHeaderProps> = () => {
    return (<TypographyH2>ავტორიზაცია</TypographyH2>);

}