import React, {createContext, ReactNode, useContext} from "react";

interface SheetContextType {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}


const SheetContext = createContext<SheetContextType>({isOpen: undefined, setIsOpen: undefined});


export default function SheetProvider({children}: { children: ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const value = {
        isOpen,
        setIsOpen,
    };
    return <SheetContext.Provider value={value}>
        {children}
    </SheetContext.Provider>
}

export function useSheet() {
    const context = useContext(SheetContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
