'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {NEXT_API_URL} from "@/lib/api-client";
import {Textarea} from "@/components/ui/textarea";
import {useAuth} from "@/components/provider/AuthProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const AddUrgent = () => {
    const {user} = useAuth();
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false); // ✅ Control drawer state
    const queryClient = useQueryClient();

    const addItem = async (content: string) => {
        const response = await fetch(`${NEXT_API_URL}/api/secure/urgent/${user?.selectedApartment?.id}/create`,
            {
                method: "POST",
                body: JSON.stringify({content}), // ✅ Fixed: wrap in object
                headers: {
                    "Content-Type": "application/json",
                }
            });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        return response.json();
    }

    const addMutation = useMutation({
        mutationFn: addItem,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['urgent_list']})
            setText(""); // ✅ Clear input
            setOpen(false); // ✅ Close drawer
        }
    })

    const handleAdd = () => {
        if (!text.trim()) return;
        addMutation.mutate(text)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
            <DrawerTrigger asChild>
                <Button className={"m-4"}>+ შექმნა</Button>
            </DrawerTrigger>
            <DrawerContent className={"bg-white"}>
                <DrawerHeader>
                    <DrawerTitle className={"text-md"}>დააფიქსირეთ სასწრაფო შეტყობინება</DrawerTitle>
                </DrawerHeader>
                <div className={"px-4"}>
                    <Textarea
                        placeholder={"შეიყვანეთ ტექსტი"}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        disabled={addMutation.isPending}
                    />
                </div>
                <DrawerFooter>
                    <Button
                        onClick={handleAdd}
                        disabled={addMutation.isPending || !text.trim()}
                    >
                        {addMutation.isPending ? 'იგზავნება...' : 'გაგზავნა'}
                    </Button>

                    {addMutation.isError && (
                        <p className="text-red-500 text-sm">
                            შეცდომა: {addMutation.error.message}
                        </p>
                    )}

                    <DrawerClose asChild>
                        <Button variant="outline">გაუქმება</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default AddUrgent;