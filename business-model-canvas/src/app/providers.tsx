"use client";
import React, { ReactNode, use, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes'

const Providers = ({ children }: { children: ReactNode }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const { theme, setTheme } = useTheme()
    useEffect(() => {
        setIsMounted(true);
    }
    , []);
    if (!isMounted) {
        return <>{children}</>; // Prevents flickering on initial load
    }
    // const { lang } = useParams();
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(preferredTheme);
    document.body.setAttribute("data-theme", preferredTheme);
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            {children}
        </ThemeProvider>
    );
}