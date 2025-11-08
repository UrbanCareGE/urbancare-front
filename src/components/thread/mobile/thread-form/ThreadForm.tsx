import React, {useContext, useState} from "react";
import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {Card} from "@/components/ui/card";

interface ThreadFormDrawerContextValue {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const ThreadFormDrawerContext = React.createContext<ThreadFormDrawerContextValue | undefined>(undefined);


const useThreadDrawer = () => {
    const context = useContext(ThreadFormDrawerContext);
    if (context === undefined) {
        throw new Error('useThread must be used within a ThreadCard');
    }
    return context;
}

interface ThreadFormDrawerProps {
    className?: string;
    children: React.ReactNode;
}

export const ThreadFormDrawer = ({className, children}: ThreadFormDrawerProps) => {
    const {isOpen, closeDrawer} = useThreadDrawer();

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
            <VisuallyHidden>
                <SheetTitle>
                    fear not for i am with you!
                </SheetTitle>
            </VisuallyHidden>
            <DrawerContent className={cn("h-90dvh bg-slate-50", className)}>
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
}

interface ThreadFormTriggerProps {
    className?: string;
    children: React.ReactNode;
}

export const ThreadFormTrigger = ({className, children}: ThreadFormTriggerProps) => {
    const {isOpen, openDrawer} = useThreadDrawer();

    return <div onClick={(e) => {
        e.stopPropagation();
        openDrawer();
    }}>
        {children}
    </div>;
}

interface ThreadFormRootProps {
    className?: string;
    children: React.ReactNode;
}

export const ThreadFormRoot = ({className, children}: ThreadFormRootProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const drawerValue: ThreadFormDrawerContextValue = {
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
    };

    return (
        <ThreadFormDrawerContext.Provider value={drawerValue}>
            <Card
                className={cn(
                    "overflow-hidden shadow-sm border-slate-200 bg-white transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300",
                    className
                )}
            >
                {children}
            </Card>
        </ThreadFormDrawerContext.Provider>
    )
}


export const ThreadForm = Object.assign(ThreadFormRoot, {
    Drawer: ThreadFormDrawer,
    Trigger: ThreadFormTrigger,
});

export default ThreadForm;
