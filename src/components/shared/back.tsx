import React from "react";
import { IoArrowBack } from "react-icons/io5"; // Import the back arrow icon from react-icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface BackProps {
    onClick?: () => void; // Optional callback function for the click event
    className?: string; // Optional className for custom styling
}

const Back: React.FC<BackProps> = ({ onClick, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // Use the custom onClick handler if provided
        } else {
            navigate(-1); // Go back to the previous page by default
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
        >
            <IoArrowBack className="mr-2" /> {/* Back arrow icon */}
            <span>Back</span> {/* Optional text */}
        </button>
    );
};

export default Back;