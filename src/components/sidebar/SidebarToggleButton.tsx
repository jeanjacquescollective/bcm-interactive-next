import React from "react";

const SidebarToggleButton: React.FC<{
  sideBarOpen: boolean;
  onClick: () => void;
}> = ({ sideBarOpen, onClick }) => (
  <button
    onClick={onClick}
    className={`
      absolute right-[-24px] top-1/2 -translate-y-1/2
      rounded-full w-12 h-12 flex items-center justify-center z-50
      border-2 shadow-lg transition
      backdrop-blur-md bg-white/30 border-white/40
      dark:bg-gray-900/40 dark:border-gray-700
      text-gray-900 hover:bg-white/40
      dark:text-white dark:hover:bg-gray-900/60
    `}
    aria-label={sideBarOpen ? "Close sidebar" : "Open sidebar"}
    type="button"
    style={{
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
      WebkitBackdropFilter: "blur(8px)",
      backdropFilter: "blur(8px)",
    }}
  >
    {sideBarOpen ? (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ) : (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )}
  </button>
);

export default SidebarToggleButton;
