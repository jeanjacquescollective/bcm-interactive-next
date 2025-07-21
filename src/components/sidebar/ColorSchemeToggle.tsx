"use client";
import * as Icon from 'react-feather';
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes';

interface ColorSchemeToggleProps {
    sideBarOpen: boolean;
}

const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({ sideBarOpen }) => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? (
                <>
                    <Icon.Sun />
                    {sideBarOpen && <span>Light Mode</span>}
                </>
            ) : (
                <>
                    <Icon.Moon />
                    {sideBarOpen && <span>Dark Mode</span>}
                </>
            )}
        </div>
    );
};

export default ColorSchemeToggle;
