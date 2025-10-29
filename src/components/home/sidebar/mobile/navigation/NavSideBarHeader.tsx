import {AppLogo} from "@/components/common/logo/AppLogo";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {Menu} from "lucide-react";
import React from "react";

export const NavSideBarHeader = () => {
    return (
        <div className={"w-full h-full flex items-center"}>
            <AppLogo/>
            <SheetPrimitive.Close asChild>
                <Menu className={"h-8 w-8 stroke-gray-800"}></Menu>
            </SheetPrimitive.Close>
        </div>
    );
};
