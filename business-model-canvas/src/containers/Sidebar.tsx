"use client";
import React, { useState, useMemo } from "react";
import {
  Activity,
  Share2,
  Download,
  Upload,
  EyeOff,
  Globe,
  HelpCircle,
} from "react-feather";
import ColorSchemeToggle from "../components/ui/ColorSchemeToggle";
import TimerButton from "../components/ui/TimerButton";

type HeaderProps = { manageCanvasesText: string; helpText: string };

const SidebarButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  sideBarOpen: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}> = ({ icon, label, sideBarOpen, onClick, className = "", ariaLabel }) => (
  <button
    className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition ${className}`}
    onClick={onClick}
    aria-label={ariaLabel || label}
    type="button"
  >
    {icon}
    <span
      className={`ml-3 transition-all duration-200 ${
        sideBarOpen
          ? "opacity-100 ml-3"
          : "opacity-0 ml-0 w-0 overflow-hidden pointer-events-none"
      }`}
    >
      {label}
    </span>
  </button>
);

const ExportDropdown: React.FC<{ sideBarOpen: boolean }> = ({ sideBarOpen }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarButton
        icon={<Download className="w-5 h-5 mr-0" />}
        label="Export"
        sideBarOpen={sideBarOpen}
        onClick={toggleOpen}
        ariaLabel="Toggle export options"
      />
      {open && sideBarOpen && (
        <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 min-w-[100px] z-50">
          {["PDF", "JPG", "CSV", "JSON"].map((format) => (
            <button
              key={format}
              className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded"
              type="button"
            >
              {format}
            </button>
          ))}
        </div>
      )}
    </li>
  );
};

const ImportDropdown: React.FC<{ sideBarOpen: boolean }> = ({ sideBarOpen }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarButton
        icon={<Upload className="w-5 h-5 mr-0" />}
        label="Import"
        sideBarOpen={sideBarOpen}
        onClick={toggleOpen}
        ariaLabel="Toggle import options"
      />
      {open && sideBarOpen && (
        <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg p-2 min-w-[100px] z-50">
          {["CSV", "JSON"].map((format) => (
            <button
              key={format}
              className="block px-2 py-1 hover:bg-gray-700 w-full text-left rounded"
              type="button"
            >
              {format}
            </button>
          ))}
        </div>
      )}
    </li>
  );
};

const Sidebar: React.FC<HeaderProps> = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  // Language label depends on pathname
  const languageLabel = useMemo(() => {
    if (typeof window === "undefined") return "Language";
    return window.location.pathname.startsWith("/nl") ? "English" : "Nederlands";
  }, []);

  const handleLanguageChange = () => {
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/nl")) {
      window.location.pathname = currentPath.replace(/^\/nl/, "/en");
    } else if (currentPath.startsWith("/en")) {
      window.location.pathname = currentPath.replace(/^\/en/, "/nl");
    } else {
      window.location.pathname = "/en" + currentPath;
    }
  };

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-2xl z-40 flex flex-col transition-all duration-300 ${
        sideBarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-800 bg-gray-950">
        <span
          className={`text-xl font-semibold tracking-wide transition-opacity duration-200 ${
            sideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between">
        <ul className="space-y-1 px-2 py-6">
          <li>
            <TimerButton sideBarOpen={sideBarOpen} />
          </li>

          <li>
            <SidebarButton
              icon={<Activity className="w-5 h-5 mr-0" />}
              label="Brainstorm"
              sideBarOpen={sideBarOpen}
            />
          </li>

          <ExportDropdown sideBarOpen={sideBarOpen} />
          <ImportDropdown sideBarOpen={sideBarOpen} />

          <li>
            <SidebarButton
              icon={<EyeOff className="w-5 h-5 mr-0" />}
              label="Focus Mode"
              sideBarOpen={sideBarOpen}
            />
          </li>

          <li>
            <SidebarButton
              icon={<Globe className="w-5 h-5 mr-0" />}
              label={languageLabel}
              sideBarOpen={sideBarOpen}
              onClick={handleLanguageChange}
            />
          </li>

          <li>
            <SidebarButton
              icon={<HelpCircle className="w-5 h-5 mr-0" />}
              label={props.helpText}
              sideBarOpen={sideBarOpen}
              ariaLabel="Help"
            />
          </li>

          <li className="px-3 py-2">
            <ColorSchemeToggle sideBarOpen={sideBarOpen} />
          </li>
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setSideBarOpen((prev) => !prev)}
        className="absolute right-[-24px] top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800 transition z-50 border-2 border-gray-800"
        aria-label={sideBarOpen ? "Close sidebar" : "Open sidebar"}
        type="button"
      >
        {sideBarOpen ? (
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
