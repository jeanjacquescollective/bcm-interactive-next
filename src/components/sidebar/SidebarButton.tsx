import React from "react";

type Props = {
  icon: React.ReactNode;
  label: string;
  sideBarOpen: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
};

const SidebarButton: React.FC<Props> = ({
  icon,
  label,
  sideBarOpen,
  onClick,
  className = "",
  ariaLabel,
  children
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
    { children}
  </button>
);

export default SidebarButton;
