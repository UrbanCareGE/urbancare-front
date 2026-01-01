'use client'

import React from "react";

type LoginHeaderProps = {
    className?: string
}

export const LoginHeader: React.FC<LoginHeaderProps> = () => {
    return (
        <header className={'text-center pt-6 pb-6 animate-slide-down'}>
            <div className="inline-flex items-center gap-2.5 mb-2">
                {/* Logo Icon */}
                <div
                    className="relative w-12 h-12 rounded-[14px] bg-gradient-primary flex items-center justify-center shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] overflow-hidden">
                    <div
                        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[14px]"/>
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 relative z-10"
                        fill="white"
                    >
                        <path
                            d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z"/>
                        <path d="M12 5L7 9V12H17V9L12 5Z" fillOpacity="0.3"/>
                    </svg>
                </div>

                {/* Logo Text */}
                <span className="text-[26px] font-bold bg-gradient-primary-text">
              UrbanCare
            </span>
            </div>
            <p className="text-secondary text-[15px] font-medium">
                შენს მობინადრეებთან ახლოს
            </p>
        </header>
    );

}