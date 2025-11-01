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
import {Textarea} from "@/components/ui/textarea";
import {useAuth} from "@/components/provider/AuthProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UrgentService} from "@/service/urgent-service";

const AddUrgent = () => {
    const {user} = useAuth();
    const [text, setText] = useState<string>("");
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: async ({apartmentId, content}: { apartmentId: string; content: string }) => {
            return await UrgentService.add(apartmentId, content);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['urgent_list']}).then(r => {
            })
            setText("");
            setOpen(false);
        }
    })

    const handleAdd = () => {
        if (!text.trim()) return;
        if (user?.selectedApartment?.id) {
            addMutation.mutate({apartmentId: user?.selectedApartment?.id, content: text})
        }
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