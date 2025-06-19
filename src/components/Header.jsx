import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import LoginBtn from "./LoginBtn";
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("isAuthenticated: ", isAuthenticated);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-2 sm:px-0 md:px-1">
            <div className="max-w-8xl mx-auto">
                <div className="flex items-center justify-between h-16 px-0  space-x-10 md:px-2">
                    {/* Logo (Left on all devices) */}
                    <div className="flex items-center rounded-xl">
                        <img
                            src="https://res.cloudinary.com/pairup-connect/image/upload/v1741842768/pairup/public/efjqbohoogiopt0c28hh.png"
                            alt="Logo"
                            className="h-14 w-auto"
                        />
                        <img
                            src="https://res.cloudinary.com/pairup-connect/image/upload/v1742051927/pairup/public/ei6xpilmkej0n9bsjusi.png"
                            alt="Logo"
                            className="h-14 w-auto hidden md:block"
                        />
                    </div>
                    {/* Search & Filter Buttons (Right on small screens) */}
                    <div className="flex items-center space-x-4 flex-grow justify-end">
                        <div className="relative">
                            <p className="absolute bg-gray-100 cursor-pointer p-1 rounded-full text-center top-[-11px] right-0 text-xs text-gray-600">
                                Saved
                            </p>
                        </div>
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
