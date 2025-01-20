import React from "react";
import { IoArrowBack } from "react-icons/io5"; // Import the back arrow icon from react-icons

interface BackProps {
    onClick: () => void; // Callback function for the click event
    className?: string; // Optional className for custom styling
}

const Back: React.FC<BackProps> = ({ onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
        >
            <IoArrowBack className="mr-2" /> {/* Back arrow icon */}
            <span>Back</span> {/* Optional text */}
        </button>
    );
};

export default Back;