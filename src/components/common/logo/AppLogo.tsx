'use client'

import React from "react";

export function UrbanCareLogo({size = 36}: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="16" fill="url(#uc-gradient)"/>
            <path
                d="M20 35L40 20L60 35V58C60 59.1046 59.1046 60 58 60H22C20.8954 60 20 59.1046 20 58V35Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M32 60V42H48V60"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient id="uc-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1976D2"/>
                    <stop offset="1" stopColor="#1565C0"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

export const AppLogo = () => {
    return (
        <div className="h-12 flex justify-start items-center mr-auto">
            <span className={"ml-3 font-semibold text-xl text-center mr-auto"}>URBANCARE</span>
            <UrbanCareLogo/>
        </div>
    );
};