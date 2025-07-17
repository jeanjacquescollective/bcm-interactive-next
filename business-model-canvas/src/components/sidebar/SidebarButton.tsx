import React from "react";

type Props = {
  icon: React.ReactNode;
  label: string;
  sideBarOpen: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

const SidebarButton: React.FC<Props> = ({
  icon,
  label,
  sideBarOpen,
  onClick,
  className = "",
  ariaLabel,
}) => (
  <button
    className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition ${className}`}
    onClick={onClick}
    aria-label={ariaLabel || label}
    type="button"
  >
    {icon}
    <span
      className={`ml-3 transition-all duration-200 whitespace-nowrap ${
        sideBarOpen
          ? "opacity-100 ml-3"
          : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"
      }`}
    >
      {label}
    </span>
  </button>
);

export default SidebarButton;
