'use client'

import {UrgentService} from "@/service/urgent-service";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {UrgentItemDTO} from "@/model/urgent.dto";

const UrgentCard = ({content, userInfo, id, apartmentId}: UrgentItemDTO & {apartmentId: string}) => {
    return (
        <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
            <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                <span>{userInfo.name} {userInfo.surname}</span>
                <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg"
                        onClick={() => UrgentService.resolve(apartmentId, id)}>შესრულებულია</Button>
            </div>
            <Separator className={"bg-blue-900"}/>
            <span className="text-sm text-gray-600 px-3 py-2">{content}</span>
        </li>
    );
};

export default UrgentCard;