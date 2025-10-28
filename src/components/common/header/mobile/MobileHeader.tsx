import {NavigationSideBar} from "@/components/home/sidebar/mobile/NavigationSideBar";
import React from "react";
import {ProfileSideBar} from "@/components/home/sidebar/mobile/NavigationProfileBar";
import {NavigationPanel} from "@/components/home/navigation-panel/NavigationPanel";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {NavigationArea, navigationItems} from "@/components/home/navigation-panel/NavigationArea";
import {AppLogo} from "@/components/common/logo/AppLogo";
import {Basic} from "@/app/layout";
import {LogoutButton} from "@/components/auth/LogoutButton";
import ProfileHeader from "@/components/profile/mobile/ProfileHeaader";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {Menu} from "lucide-react";

export const MobileHeader = ({className}: Basic) => {
    return (
        <div className={"h-16 w-full flex items-center px-3 border-b border-gray-200"}>
            <NavigationSideBar>
                <NavigationPanel>
                    <NavigationPanel.Header className={"gap-2 items-start shadow-none rounded-none"}>
                        <div className={"w-full flex"}>
                            <AppLogo/>
                            <SheetPrimitive.Close>
                                <Menu className={"h-8 w-8 stroke-gray-800"}></Menu>
                                <span className="sr-only">Close</span>
                            </SheetPrimitive.Close>
                        </div>
                    </NavigationPanel.Header>
                    <NavigationPanel.Body>
                        <NavigationArea navItems={navigationItems}/>
                    </NavigationPanel.Body>
                    <NavigationPanel.Footer>
                        <NeighborhoodSelect/>
                    </NavigationPanel.Footer>
                </NavigationPanel>
            </NavigationSideBar>
            <span className={"ml-3 font-semibold text-xl mr-auto"}>URBANCARE</span>
            <ProfileSideBar>
                <DynamicPanel>
                    <DynamicPanel.Header className={"flex justify-start items-center"}>
                        <ProfileHeader/>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body>
                        <div>Body</div>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer>
                        <LogoutButton/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </ProfileSideBar>
        </div>
    );
};
