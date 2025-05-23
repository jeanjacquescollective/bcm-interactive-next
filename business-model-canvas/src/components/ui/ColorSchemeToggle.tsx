"use client";
import * as Icon from 'react-feather';
import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { useTheme } from 'next-themes'

const ColorSchemeToggle: React.FC = () => {
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
    <>
        <Icon.Sun className="mr-1" />
        <Toggle
            onToggle={toggleDarkMode}
            initialState={darkMode}
            colorOn="bg-gray-700"
            colorOff="bg-gray-300"
        />
        <Icon.Moon className="ml-1" />
    </>
);
};

export default ColorSchemeToggle;