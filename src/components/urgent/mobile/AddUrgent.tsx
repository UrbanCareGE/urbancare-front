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
import {useCreateUrgent} from "@/hooks/query/urgent/use-create-urgent";
import {UrgentItemDTO} from "@/model/urgent.dto";

const AddUrgent = () => {
    const userContext = useAuth();
    const {user} = userContext;
    const [text, setText] = useState<string>("");
    const [open, setOpen] = useState(false);

    const onSuccess = (item: UrgentItemDTO) => {
        setText("")
        setOpen(false);
    }

    const {onSubmit, isPending, isError, error} = useCreateUrgent(userContext, onSuccess);

    const handleAdd = () => {
        if (!text.trim()) return;
        if (user?.selectedApartment?.id) {
            onSubmit(user.selectedApartment.id, text);
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
                        disabled={isPending}
                    />
                </div>
                <DrawerFooter>
                    <Button
                        onClick={handleAdd}
                        disabled={isPending || !text.trim()}
                    >
                        {isPending ? 'იგზავნება...' : 'გაგზავნა'}
                    </Button>

                    {isError && (
                        <p className="text-red-500 text-sm">
                            შეცდომა: {error?.message}
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