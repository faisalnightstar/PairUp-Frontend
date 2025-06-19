import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NullTrips = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center">
            <img src="userTripNull.png" alt="" />
            <h1 className="text-2xl mt-4 font-bold text-gray-900">
                No trips yet
            </h1>
            <p className="text-paragraph-color mt-2">
                You haven't joined or posted any trips yet.
            </p>
            <button
                type="button"
                onClick={() => navigate("/post-trip")}
                className="flex flex-row items-center bg-button-color px-6 py-2 mt-4 rounded-full text-white  text-xs hover:cursor-pointer hover:bg-button-color-hover"
            >
                <FaPlus className="mr-1" /> Plan Your First Trip
            </button>
        </div>
    );
};

export default NullTrips;
