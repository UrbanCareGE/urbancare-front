'use client'

import React from "react";
import Image from "next/image";

export const AppLogo = () => {
    return (
        <div className="h-12 w-full flex justify-start items-center">
            <span className={"w-24 h-10 relative"}>
                <Image fill src={"/assets/full-logo-cut.png"} alt={"MIRO"}/>
            </span>
        </div>
    );
};