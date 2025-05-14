"use client";
import React, { useEffect } from "react";

const Header: React.FC = () => {
    useEffect(() => {
        const languageToggle = document.getElementById("language-toggle");
        const nlLanguageElements = document.querySelectorAll("[data-lang='nl']");
        const enLanguageElements = document.querySelectorAll("[data-lang='en']");

        const handleLanguageToggle = () => {
            const currentLanguage = languageToggle?.dataset.lang || "en";
            const newLanguage = currentLanguage === "en" ? "nl" : "en";
            if (languageToggle) languageToggle.dataset.lang = newLanguage;

            nlLanguageElements.forEach((el) => {
                el.classList.toggle("hidden", newLanguage !== "nl");
            });
            enLanguageElements.forEach((el) => {
                el.classList.toggle("hidden", newLanguage !== "en");
            });
        };

        languageToggle?.addEventListener("click", handleLanguageToggle);

        return () => {
            languageToggle?.removeEventListener("click", handleLanguageToggle);
        };
    }, []);

    return (
        <header className="p-4 gradient-bg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <span data-lang="en" className="hidden">
                        Business Model Canvas
                    </span>
                    <span data-lang="nl">Business Model Canvas (NL)</span>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <button
                                id="manage-canvases-btn"
                                className="hover:underline flex items-center"
                            >
                                <i data-feather="layers" className="mr-1"></i>
                                <span data-lang="en" className="hidden">
                                    My Canvases
                                </span>
                                <span data-lang="nl">Mijn Canvas</span>
                            </button>
                        </li>
                        <li>
                            <button id="help-btn" className="hover:underline flex items-center">
                                <i data-feather="help-circle" className="mr-1"></i>
                                <span data-lang="en" className="hidden">
                                    Help
                                </span>
                                <span data-lang="nl">Hulp</span>
                            </button>
                        </li>
                        <li>
                            <button
                                id="dark-mode-toggle"
                                className="hover:underline flex items-center"
                            >
                                <i data-feather="moon" className="mr-1"></i>
                                <span data-lang="en" className="hidden">
                                    Dark Mode
                                </span>
                                <span data-lang="nl">Donkere Modus</span>
                            </button>
                        </li>
                        <li>
                            <button
                                id="language-toggle"
                                className="hover:underline flex items-center"
                                data-lang="en"
                            >
                                <i data-feather="globe" className="mr-1"></i>
                                <span data-lang="en" className="hidden">
                                    EN/NL
                                </span>
                                <span data-lang="nl">EN/NL</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
