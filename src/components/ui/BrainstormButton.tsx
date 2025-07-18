import React, { useContext } from "react";
import { Zap } from "react-feather";

import { ManagedUI } from "@/contexts/ManagedUI";

interface BrainstormButtonProps {
    sideBarOpen: boolean;
}

const BrainstormButton: React.FC<BrainstormButtonProps> = ({ sideBarOpen }) => {
    const managedUI = useContext(ManagedUI);

    const handleClick = () => {
        console.log("Brainstorm button clicked");
        if (managedUI && managedUI.setOpenBrainstormModal) {
            managedUI.setOpenBrainstormModal(true);
            console.log("Opening brainstorm modal");
        }
    };

    return (
        <button
            className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={handleClick}
            type="button"
        >
            <Zap className="w-5 h-5 mr-3" />
            {sideBarOpen && (
                <span>Brainstorm</span>
            )}
        </button>
    );
};

export default BrainstormButton;
