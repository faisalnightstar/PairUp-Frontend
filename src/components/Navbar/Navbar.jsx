import React from "react";
import { FaCompass, FaComments, FaUser } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Container from "../container/Container";
import { useSelector } from "react-redux";

const Navbar = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navItems = [
        {
            name: "Home",
            slug: "/",
            icon: <IoMdHome />,
            active: true,
        },
        {
            name: "Discover",
            slug: "/discover",
            icon: <FaCompass />,
            active: authStatus,
        },
        {
            name: "Post",
            slug: "/post-trip",
            icon: <IoAddCircle />,
            active: authStatus,
        },
        {
            name: "Message",
            slug: "/msg",
            icon: <FaComments />,
            active: authStatus,
        },
        {
            name: "Profile",
            slug: "/profile",
            icon: <FaUser />,
            active: authStatus,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <header className="max-w-8xl mx-auto px-4">
                <Container>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.slug}
                            className={({ isActive }) =>
                                `flex flex-col items-center ${
                                    isActive
                                        ? "text-button-color"
                                        : "text-black"
                                } hover:text-button-color-hover`
                            }
                        >
                            {item.icon}
                            {/* <IoMdHome className="text-xl mb-1" /> */}
                            <span className="text-xs">{item.name}</span>
                        </NavLink>
                    ))}
                </Container>
            </header>
        </nav>
    );
};

export default Navbar;
