import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const resultAction = await dispatch(logoutUser());
        if (logoutUser.fulfilled.match(resultAction)) {
            toast.success("Logged out successfully");
            navigate("/login");
        } else {
            toast.error(resultAction.payload.message);
        }
    };
    return (
        <button
            className=" p-1 px-4 rounded-full hover:cursor-pointer bg-button-color hover:bg-button-color-hover text-white hover:text-red-600  text-xs"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
