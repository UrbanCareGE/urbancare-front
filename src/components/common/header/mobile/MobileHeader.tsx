import {NavigationSideBar} from "@/components/home/sidebar/mobile/navigation/NavigationSideBar";
import React from "react";
import {ProfileSideBar} from "@/components/home/sidebar/mobile/profile/ProfileSideBar";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {NavigationArea, navigationItems} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {AppLogo} from "@/components/common/logo/AppLogo";
import {Basic} from "@/app/layout";
import {LogoutButton} from "@/components/auth/LogoutButton";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {Menu} from "lucide-react";
import {ProfileSideBarHeader} from "@/components/home/sidebar/mobile/profile/ProfileSideBarHeader";
import ThemeToggle from "@/components/common/util/ThemeToggle";
import {SectionHeader} from "@/components/home/sidebar/mobile/profile/SectionHeader";

export const MobileHeader = ({className}: Basic) => {
    return (
        <div className={"h-16 w-full flex items-center px-3 border-b border-gray-200"}>
            <NavigationSideBar>
                <DynamicPanel>
                    <DynamicPanel.Header className={"gap-2 border-b"}>
                        <div className={"w-full flex"}>
                            <AppLogo/>
                            <SheetPrimitive.Close>
                                <Menu className={"h-8 w-8 stroke-gray-800"}></Menu>
                                <span className="sr-only">Close</span>
                            </SheetPrimitive.Close>
                        </div>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body>
                        <NavigationArea navItems={navigationItems}/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer>
                        <NeighborhoodSelect/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </NavigationSideBar>
            <span className={"ml-3 font-semibold text-xl mr-auto"}>URBANCARE</span>
            <ProfileSideBar>
                <DynamicPanel>
                    <DynamicPanel.Header className={"flex h-28 border-b-2"}>
                        <ProfileSideBarHeader/>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body>
                        <SectionHeader value={"ფონი"}/>
                        <ThemeToggle/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer className={"border-t-2"}>
                        <LogoutButton/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </ProfileSideBar>
        </div>
    );
};
