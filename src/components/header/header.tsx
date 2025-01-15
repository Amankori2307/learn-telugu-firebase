// src/components/Header.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    Vocab App
                </Link>

                {/* Hamburger Menu (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? "font-bold underline" : ""}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/add-vocab"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? "font-bold underline" : ""}`
                        }
                    >
                        Add Vocab
                    </NavLink>
                </nav>

                {/* Mobile Menu (Dropdown) */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 right-0 bg-blue-500 w-full shadow-lg">
                        <nav className="flex flex-col space-y-2 p-4">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `hover:underline ${isActive ? "font-bold underline" : ""}`
                                }
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/add-vocab"
                                className={({ isActive }) =>
                                    `hover:underline ${isActive ? "font-bold underline" : ""}`
                                }
                                onClick={toggleMenu}
                            >
                                Add Vocab
                            </NavLink>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;