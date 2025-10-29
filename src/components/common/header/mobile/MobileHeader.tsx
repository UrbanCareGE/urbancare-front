import React from "react";
import {MobileSideBar} from "@/components/home/sidebar/mobile/MobileSideBar";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {NavigationArea, navigationItems} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {Basic} from "@/app/layout";
import {NavSideBarHeader} from "@/components/home/sidebar/mobile/navigation/NavSideBarHeader";
import {SheetTrigger} from "@/components/ui/sheet";
import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {Menu} from "lucide-react";
import {ProfileSideBarHeader} from "@/components/home/sidebar/mobile/profile/ProfileSideBarHeader";
import {LogoutButton} from "@/components/auth/LogoutButton";
import {ProfileSideBarBody} from "@/components/home/sidebar/mobile/profile/ProfileSIdeBarBody";
import {AppVersionLabel} from "@/components/common/util/AppVersionLabel";

export const MobileHeader = ({className}: Basic) => {
    return (
        <div className={"h-20 w-full flex items-center px-3 border-b border-gray-200"}>
            <MobileSideBar trigger={<SheetTrigger className={"outline-none"}>
                <Menu className={'w-8 h-8 text-gray-600'}/>
            </SheetTrigger>} side={'left'}>
                <DynamicPanel>
                    <DynamicPanel.Header className={"gap-2"}>
                        <NavSideBarHeader/>
                    </DynamicPanel.Header>
                    <DynamicPanel.Separator/>
                    <DynamicPanel.Body>
                        <NavigationArea navItems={navigationItems}/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Separator/>
                    <DynamicPanel.Footer>
                        <NeighborhoodSelect/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </MobileSideBar>
            <span className={"ml-3 font-semibold text-xl mr-auto"}>URBANCARE</span>
            <MobileSideBar trigger={<SheetTrigger className={"outline-none"}>
                <ActiveUserAvatar/>
            </SheetTrigger>} side={'right'}>
                <DynamicPanel>
                    <DynamicPanel.Header className={"h-36 gap-2 px-4"}>
                        <ProfileSideBarHeader/>
                    </DynamicPanel.Header>
                    <DynamicPanel.Separator/>
                    <DynamicPanel.Body className={"px-0"}>
                        <ProfileSideBarBody/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Separator/>
                    <DynamicPanel.Footer>
                        <LogoutButton/>
                        <AppVersionLabel/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </MobileSideBar>
        </div>
    );
};
