import React, { useState, useRef, useContext } from "react";
import { Clock } from "react-feather";

import { ManagedUI } from "@/contexts/ManagedUI";

interface TimerButtonProps {
    sideBarOpen: boolean;
}

const TimerButton: React.FC<TimerButtonProps> = ({ sideBarOpen }) => {
    const managedUI = useContext(ManagedUI);

    const handleClick = () => {
        console.log("Timer button clicked");
        if (managedUI && managedUI.setOpenTimerModal) {
            managedUI.setOpenTimerModal(true);
            console.log("Opening timer modal");
        }
    };

    return (
        <>
            <button
                className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                onClick={handleClick}
                type="button"
            >
                <Clock className="w-5 h-5 mr-3" />
                {sideBarOpen && (
            <span>Timer</span> 
                )}
                {/* <span>Timer</span> */}
            </button>
        </>
    );
};

export default TimerButton;