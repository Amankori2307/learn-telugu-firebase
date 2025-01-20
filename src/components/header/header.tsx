import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import the hamburger menu icon
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Navigation links data
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/vocab/add", label: "Add Vocab" },
        { to: "/review", label: "Review" },
        { to: "/sentences", label: "Sentences" },
        { to: "/chapters", label: "Chapters" },
    ];

    // Common NavLink styling
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
            ? "bg-blue-700 text-white"
            : "text-white hover:bg-blue-600 hover:text-white"
        }`;

    return (
        <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold text-white hover:text-blue-100 transition-colors duration-200"
                >
                    Vocab App
                </Link>

                {/* Hamburger Menu (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <FaBars className="w-6 h-6 text-white" /> {/* Use the FaBars icon */}
                </button>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-2">
                    {navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu (Dropdown) */}
                <div
                    className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-200 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    onClick={toggleMenu}
                >
                    <div
                        className={`bg-blue-600 w-64 h-full shadow-lg transform transition-transform duration-200 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="flex flex-col space-y-2 p-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={navLinkClass}
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;