import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="col-span-5 row-start-3 mt-6 text-gray-500 text-sm text-center py-4">
            <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <span>© 2025 Zjaak | Inspired by Canvanizer</span>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-xs mt-1">All data is stored locally in your browser</p>
            </div>
            </div>
        </div>
    );
};

export default Footer;