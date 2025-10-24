'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {JAVA_API_URL, NEXT_API_URL} from "@/lib/api-client";
import {Textarea} from "@/components/ui/textarea";

const AddUrgent = () => {
    const [text, setText] = useState("");

    return (
        <Drawer shouldScaleBackground={false}>
            <DrawerTrigger className={"text-white m-4 h-10 rounded-lg bg-primary"}>+ შექმნა</DrawerTrigger>
            <DrawerContent className={"bg-white"}>
                <DrawerHeader>
                    <DrawerTitle className={"text-md"}>დააფიქსირეთ სასწრაფო შეტყობინება</DrawerTitle>
                </DrawerHeader>
                <div className={"px-4"}>

                <Textarea placeholder={"შეიყვანეთ ტექსტი"}  value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <DrawerFooter>
                    <Button onClick={async () => {
                        await fetch(`${NEXT_API_URL}/api/secure/urgent/68efd03837b62ea34882f812/create`,
                            {
                                method: "POST",
                                body: JSON.stringify({content: text}),
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            });
                        setText("");
                    }}>გაგზავნა</Button>

                    {/*<DrawerClose asChild={true}>*/}
                    {/*    <Button variant="outline">Cancel</Button>*/}
                    {/*</DrawerClose>*/}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default AddUrgent;
