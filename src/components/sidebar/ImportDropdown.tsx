import React, { useContext } from "react";
import { Upload } from "react-feather";
import SidebarButton from "./SidebarButton";
import { ManagedUI } from "@/contexts/ManagedUI";

type Props = {
  sideBarOpen: boolean;
  isOpen: boolean;
  setHovered: () => void;
  clearHovered: () => void;
};

const ImportDropdown: React.FC<Props> = ({ sideBarOpen }) => {
  const canvasUI = useContext(ManagedUI);

  const handleImportClick = () => {
    canvasUI?.setOpenImportModal(true);
  };

  return (
    <span className="relative">
      <SidebarButton
        icon={<Upload className="w-5 h-5" />}
        label="Import"
        sideBarOpen={sideBarOpen}
        ariaLabel="Toggle import options"
        onClick={handleImportClick}
      />
      {/* Dropdown code here if needed */}
    </span>
  );
};

export default ImportDropdown;

