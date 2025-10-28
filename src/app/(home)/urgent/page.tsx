'use client'

import React from "react";
import UrgentList from "@/components/urgent/UrgentList";
import AddUrgent from "@/components/urgent/AddUrgent";


const Page = () => {
    return (
        <div className={"bg-white w-full flex flex-col"}>
            <AddUrgent/>
            <UrgentList/>
        </div>
    )
}

export default Page;