"use client";
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
interface ManagedUIContextType {
    openTimerModal: boolean;
    setOpenTimerModal: Dispatch<SetStateAction<boolean>>;
}

// Defining context with proper type
export const ManagedUI = createContext<ManagedUIContextType | undefined>(undefined);

// Context Wrapper
export function ManagedUIProvider({ children }: { children: ReactNode }) {
    const [openTimerModal, setOpenTimerModal] = useState(false);
    const [openAidModal, setOpenAidModal] = useState(false);
    
    return (
        <ManagedUI.Provider
            value={{
                openTimerModal,
                setOpenTimerModal,
            }}
        >
            {children}
        </ManagedUI.Provider>
    );
}