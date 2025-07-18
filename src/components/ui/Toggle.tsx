'use client';
import { useState } from 'react';
type ToggleProps = {
    initialState: boolean;
    onToggle: (state: boolean) => void;
    label?: string;
};

export default function Toggle({
    initialState,
    onToggle,
    colorOn = 'bg-green-400',
    colorOff = 'bg-gray-300',
}: ToggleProps & { colorOn?: string; colorOff?: string }) {
    const [toggled, setToggled] = useState(initialState);
    const handleToggle = () => {
        const newState = !toggled;
        setToggled(newState);
        onToggle(newState);
    };
    return (
        <label className="relative inline-block w-10 h-5 cursor-pointer">
            <input
                type="checkbox"
                checked={toggled}
                onChange={handleToggle}
                className="sr-only"
            />
            <div
                className={`w-10 h-5 rounded-full transition-colors duration-200 ${toggled ? colorOn : colorOff}`}
            />
            <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-200 ${toggled ? 'translate-x-5' : ''
                    }`}
            />
        </label>
    );
}
