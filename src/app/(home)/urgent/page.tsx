'use client'

import React from "react";
import AddUrgent from "@/app/(home)/urgent/AddUrgent";
import UrgentList from "@/app/(home)/urgent/UrgentList";


const Page = () => {
    return (
        <div className={"bg-white w-full flex flex-col"}>
            <AddUrgent/>
            <UrgentList/>
        </div>
    )
}


export default Page;


/*
let error = false;
    let data: UrgentItem[] = [];
    try {

        const response = await fetch(`${NEXT_API_URL}/api/secure/urgent/68efd03837b62ea34882f812/list`,
            {
                headers: {
                    Authorization: cook.get('auth-token')?.value ?? 'none'
                }
            }
        )
        if (response.ok) {
            data = await response.json()
            console.log(data);
        }
    } catch (err) {
        console.log(err);
        error = true;
    }
 */
/*
<main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-8">
            <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
                <HomeColumnPanel className="w-full h-full">
                    <HomeColumnPanel.Header className="">
                        {!sidebarOpen ? <AppLogo/> : null}
                    </HomeColumnPanel.Header>
                    <HomeColumnPanel.Body>
                        <NavigationPanel>
                            <NavigationPanel.Header
                                className={"p-2 flex justify-center items-center"}>
                                <NavigationPanelHeader/>
                            </NavigationPanel.Header>
                            <NavigationPanel.Body>
                                <NavigationPanelBody/>
                            </NavigationPanel.Body>
                            <NavigationPanel.Footer>
                                <NavigationPanelFooter/>
                            </NavigationPanel.Footer>
                        </NavigationPanel>
                    </HomeColumnPanel.Body>
                </HomeColumnPanel>
            </Sidebar>

            <HomeColumnPanel className="flex-1">
                <HomeColumnPanel.Header>
                    <SidebarToggle onClick={() => setSidebarOpen(true)}/>
                    <MasterBarHeader/>
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    {children}
                </HomeColumnPanel.Body>
            </HomeColumnPanel>

            {!isMobile && (
                <HomeColumnPanel className="w-72 big:w-96">
                    <HomeColumnPanel.Header className="justify-end">
                        <ProfileBarArea/>
                    </HomeColumnPanel.Header>
                    <HomeColumnPanel.Body>
                        <DynamicPanel>
                            <DynamicPanel.Header>
                                <div></div>
                            <DynamicPanel.Header className={"p-0 min-h-0"}>
                                <UrgentPreview/>
                            </DynamicPanel.Header>
                            <DynamicPanel.Body>
                                <div></div>
                            </DynamicPanel.Body>
                        </DynamicPanel>
                    </HomeColumnPanel.Body>
                </HomeColumnPanel>
            )}
        </main>
 */