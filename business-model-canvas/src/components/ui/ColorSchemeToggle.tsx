"use client";
import * as Icon from 'react-feather';
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes'

interface ColorSchemeToggleProps {
    sideBarOpen: boolean;
}

const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({sideBarOpen}) => {
    const [darkMode, setDarkMode] = useState<boolean | null>(null);
    const { theme, setTheme } = useTheme();

    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(prefersDarkScheme);
            if (prefersDarkScheme) {
                setTheme("dark");
                document.body.setAttribute("data-theme", "dark");
            } else {
                setTheme("light");
                document.body.removeAttribute("data-theme");
            }
        
    }
    }, []);

const toggleDarkMode = (newState: boolean) => {
    setDarkMode(newState);
    if (newState) {
        setTheme("dark");
        document.body.setAttribute("data-theme", "dark");
    } else {
        setTheme("light");
        document.body.removeAttribute("data-theme");
    }
};

// Prevent rendering until darkMode is determined
if (darkMode === null) return null;

return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleDarkMode(!darkMode)}>
        {!darkMode ? (
            <>
                <Icon.Moon />
                {sideBarOpen && <span>Dark Mode</span>}
            </>
        ) : (
            <>
                <Icon.Sun />
                {sideBarOpen && <span>Light Mode</span>}
            </>
        )}
    </div>
);
};

export default ColorSchemeToggle;