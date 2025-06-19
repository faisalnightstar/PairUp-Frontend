import React from "react";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate("/login");
    };
    return (
        <button
            className="bg-button-color py-2 px-4 rounded-full hover:cursor-pointer hover:bg-button-color-hover text-white  text-xs"
            onClick={handleLogout}
        >
            Login
        </button>
    );
};

export default LoginBtn;
