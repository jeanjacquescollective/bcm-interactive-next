import React from "react";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="py-4">
        <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Left column */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-gray-700 font-semibold text-sm">
                        © 2025 <a href="https://www.zjaak.be" target="_blank">Zjaak</a>
                    </span>
                </div>
                {/* Center column */}
                <div className="flex justify-center space-x-4">
                    <div className="relative w-16 h-8">
                        <Image
                            src="/images/HAVEN_logo_bol.png"
                            alt="HAVEN Logo"
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="64px"
                        />
                    </div>
                    <div className="relative w-20 h-8">
                        <Image
                            src="/images/logo_vlaanderen.png"
                            alt="Vlaanderen Logo"
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="80px"
                        />
                    </div>
                </div>
                {/* Right column */}
                <div className="flex flex-col items-center md:items-end text-xs text-gray-400">
                    <span>All data is stored locally in your browser.</span>
                    <div>
                        <a
                            href="https://github.com/zjaak"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            GitHub
                        </a>
                        {" | "}
                        <a
                            href="mailto:info@zjaak.com"
                            className="hover:underline"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
