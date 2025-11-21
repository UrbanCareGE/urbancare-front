import React from "react";
import {MobileSideBar} from "@/components/home/sidebar/mobile/MobileSideBar";
import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {Menu} from "lucide-react";
import {ProfileSideBarHeader} from "@/components/home/sidebar/mobile/profile/ProfileSideBarHeader";
import {LogoutButton} from "@/components/auth/LogoutButton";
import {ProfileSideBarBody} from "@/components/home/sidebar/mobile/profile/ProfileSIdeBarBody";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import NavigationArea from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {NavSideBarHeader} from "@/components/home/sidebar/mobile/navigation/NavSideBarHeader";
import {useMobileScroll} from "@/hooks/use-mobile-scroll";
import {cn} from "@/lib/utils";

export const MobileHeader = () => {
    const {isVisible} = useMobileScroll()

    return (
        <header
            className={cn("h-20 w-full flex items-center px-3 border-b border-gray-200 sticky top-0 bg-white !z-[20] transition-all duration-500 ease-in-out will-change-transform -translate-y-20", {'translate-y-0': isVisible, 'opacity-0' : !isVisible})}>
            <MobileSideBar side={'left'}>
                <MobileSideBar.Trigger>
                    <Menu className={'w-8 h-8 text-slate-500'}/>
                </MobileSideBar.Trigger>
                <MobileSideBar.Content>
                    <MobileSideBar.Header className={"px-3 bg-gray-50"}>
                        <NavSideBarHeader/>
                    </MobileSideBar.Header>
                    <MobileSideBar.Body className={"px-3"}>
                        <NavigationArea/>
                    </MobileSideBar.Body>
                    <MobileSideBar.Footer className={"px-3 bg-gray-50"}>
                        <NeighborhoodSelect/>
                    </MobileSideBar.Footer>
                </MobileSideBar.Content>
            </MobileSideBar>
            <span className={"ml-3 font-semibold text-xl text-center mr-auto"}>URBANCARE</span>
            <MobileSideBar side={'right'}>
                <MobileSideBar.Trigger>
                    <ActiveUserAvatar/>
                </MobileSideBar.Trigger>
                <MobileSideBar.Content>
                    <MobileSideBar.Header className={"bg-gray-50"}>
                        <ProfileSideBarHeader/>
                    </MobileSideBar.Header>
                    <MobileSideBar.Body className={"overflow-y-scroll"}>
                        <ProfileSideBarBody/>
                    </MobileSideBar.Body>
                    <MobileSideBar.Footer className={"px-3 bg-gray-50"}>
                        <LogoutButton/>
                    </MobileSideBar.Footer>
                </MobileSideBar.Content>
            </MobileSideBar>
        </header>
    );
};
