"use client"

import {DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import React from "react";
import ThreadForm from "@/components/thread/mobile/thread-form/ThreadForm";
import {SheetClose, SheetHeader} from "@/components/ui/sheet";
import {X} from "lucide-react";

const AddDocButton = () => {
    return <ThreadForm>
        <ThreadForm.Trigger>
            <div>
                შექმნა
            </div>
        </ThreadForm.Trigger>
        <ThreadForm.Sheet>
            <SheetHeader className="border-b border-slate-200 px-3 py-3">
                <div className="flex items-center gap-2">
                    <div className={"w-8"}></div>
                    <div className={"mr-auto ml-auto"}>
                        <DrawerTitle className="text-lg font-semibold text-slate-900">
                            ახალი წესდება
                        </DrawerTitle>
                    </div>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full [&_svg]:size-7">
                            <X/>
                        </Button>
                    </SheetClose>
                </div>
            </SheetHeader>
        </ThreadForm.Sheet>
    </ThreadForm>
}

export default AddDocButton;