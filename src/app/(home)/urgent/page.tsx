
import React from "react";
import {UrgentItem, UrgentService} from "@/service/urgent-service";
import Link from "next/link";
import {cookies} from "next/headers";
import UrgentCard from "@/app/(home)/urgent/UrgentCard";
import {JAVA_API_URL} from "@/lib/api-client";

export default async function Page() {
    const cook = await cookies()
    let error = false;
    let data: UrgentItem[] = [];
    try {
        // data = await UrgentService.getUrgentList(cook.get('auth-token')?.value!);

        const response = await fetch(`${JAVA_API_URL}/api/secure/urgent/68efd03837b62ea34882f812/list`,
            {headers: {
                Authorization: cook.get('auth-token')?.value ?? 'none'
            }}
        )
        data = await response.json()
        console.log(data);
    } catch (err) {
        console.log(err);
        error = true;
    }

    return (
        <div className={"bg-white w-full"}>
            <ul className="flex flex-col gap-3 py-3">
                <Link href="/urgent/add">
                    დამატება
                </Link>
                {/*{isLoading && (*/}
                {/*    <div className="flex items-center justify-center p-4 text-gray-500">*/}
                {/*        Loading...*/}
                {/*    </div>*/}
                {/*)}*/}
                {error && (
                    <div className="flex items-center justify-center p-4 text-red-500">
                        Error loading urgent items
                    </div>
                )}
                {data.map((item) => (
                    <UrgentCard key={item.id} {...item}/>
                ))}


            </ul>
        </div>
    )
}


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