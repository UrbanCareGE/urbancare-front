import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {NavigationSideBar} from "@/components/home/sidebar/mobile/NavigationSideBar";
import React from "react";
import {ProfileSideBar} from "@/components/home/sidebar/mobile/NavigationProfileBar";
import {NavigationPanel} from "@/components/home/navigation-panel/NavigationPanel";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {NavigationArea, navigationItems} from "@/components/home/navigation-panel/NavigationArea";
import {AppLogo} from "@/components/common/logo/AppLogo";
import {Basic} from "@/app/layout";
import {cn} from "@/lib/utils";
import {LogoutButton} from "@/components/auth/LogoutButton";
import ProfileHeader from "@/components/profile/mobile/ProfileHeaader";

export const MobileHeader = ({className}: Basic) => {
    return (
        <div className={cn("flex flex-col border-b w-full z-40 bg-white", className)}>
            <div className={"h-16 w-full flex items-center px-3 border-b border-gray-200"}>
                <NavigationSideBar>
                    <NavigationPanel>
                        <NavigationPanel.Header className={"gap-2  items-start"}>
                            <AppLogo/>
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
                            <ProfileHeader firstName={"racxa"} lastName={"rucxa"} username={"pavlovich"}/>
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
            <div className={"px-4"}>
                <Select>
                    <SelectTrigger className={"h-8"}>
                        <div>
                            თბილისი, პ. ქავთარაძის 34გ
                        </div>
                    </SelectTrigger>
                    <SelectContent className={"bg-white"}>
                        <SelectItem key={1} value={"1"}>
                            AAAAA
                        </SelectItem>
                        <SelectItem key={2} value={"2"}>
                            AAAAA
                        </SelectItem>
                        <SelectItem key={3} value={"3"}>
                            AAAAA
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
