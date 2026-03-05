import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import LoginBtn from "./LoginBtn";
import { FaOpencart } from "react-icons/fa6";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("isAuthenticated: ", isAuthenticated);
    const savedTripItems = () => {
        navigate("/saved-trip");
    };
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-2 sm:px-0 md:px-1">
            <div className="max-w-8xl mx-auto">
                <div className="flex items-center justify-between h-16 px-0  space-x-10 md:px-2">
                    {/* Logo (Left on all devices) */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center rounded-xl hover:cursor-pointer"
                    >
                        {/* <img
                            src="https://res.cloudinary.com/pairup-connect/image/upload/v1741842768/pairup/public/efjqbohoogiopt0c28hh.png"
                            alt="Logo"
                            className="h-14 w-auto"
                        />
                        <img
                            src="https://res.cloudinary.com/pairup-connect/image/upload/v1742051927/pairup/public/ei6xpilmkej0n9bsjusi.png"
                            alt="Logo"
                            className="h-14 w-auto hidden md:block"
                        /> */}
                        <img
                            src="https://res.cloudinary.com/dvinmpv7q/image/upload/v1751309316/logo-without-bg_h7efge.png"
                            alt="Logo"
                            className="h-22 w-auto hidden md:block"
                        />
                        {/* <img
                            src="https://res.cloudinary.com/pairup-connect/image/upload/v1742051927/pairup/public/ei6xpilmkej0n9bsjusi.png"
                            alt="Logo"
                            className="h-14 w-auto hidden md:block"
                        /> */}
                        <img
                            className="h-8 w-auto hidden md:block"
                            src="/logo-black.jpeg"
                            alt=""
                        />
                    </div>
                    {/* Search & Filter Buttons (Right on small screens) */}
                    <div className="flex items-center space-x-4 flex-grow justify-end">
                        <div className="relative">
                            <button
                                onClick={savedTripItems}
                                className="bg-gray-100 cursor-pointer p-2 rounded-full"
                            >
                                <FaOpencart />
                            </button>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="bg-background text-text-primary p-2 rounded-full hover:bg-secondary"
                            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                        >
                            {theme === "light" ? (
                                <FaMoon size={18} />
                            ) : (
                                <FaSun size={18} />
                            )}
                        </button>
                        {/* Search Button */}
                        <button
                            className="bg-gray-100 cursor-pointer p-2 rounded-full"
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <FaSearch className="text-gray-600" />
                        </button>
                        {showSearch && (
                            <input
                                type="text"
                                className="border p-2 rounded-md bg-gray-200"
                                placeholder="Search..."
                            />
                        )}

                        {/* Filter Button */}
                        <button className="rounded-full cursor-pointer bg-gray-100 p-2">
                            <FaFilter className="text-gray-600" />
                        </button>
                        {isAuthenticated ? <LogoutBtn /> : <LoginBtn />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
