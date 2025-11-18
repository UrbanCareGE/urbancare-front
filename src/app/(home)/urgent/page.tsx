'use client'

import React from "react";
import UrgentList from "@/components/urgent/mobile/UrgentList";
import AddUrgent from "@/components/urgent/mobile/AddUrgent";


const Page = () => {
    return (
        <div className={"bg-white w-full flex flex-col"}>
            <AddUrgent/>
            <UrgentList/>
        </div>
    )
}

export default Page;