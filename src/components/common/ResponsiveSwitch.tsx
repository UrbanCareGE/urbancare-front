'use client'

import {Children} from "@/app/layout";
import {useResponsive} from "@/components/common/ResponsiveLayout";

export const MobileAdapter = ({children}: Children) => {
    const {isMobile} = useResponsive();

    if (!isMobile) return <></>

    return (
        <>{children}</>
    );
};

export const DesktopAdapter = ({children}: Children) => {
    const {isDesktop} = useResponsive();

    if (!isDesktop) return <></>

    return (
        <>{children}</>
    );
}

export const TabletAdapter = ({children}: Children) => {
    const {isTablet} = useResponsive();

    if (!isTablet) return <></>

    return (
        <>{children}</>
    );
}
