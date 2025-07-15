import React, { useEffect, useState } from "react";
import {
    FaMapMarkerAlt,
    FaHeart,
    FaCalendarAlt,
    FaUsers,
    FaCalendar,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";

const TripPostCard = ({ tripItem }) => {
    //console.log("tripItem: ", tripItem);

    const navigate = useNavigate();
    const location = useLocation();
    const userLocale = navigator.language || "en-US"; // Auto-detect user locale

    const tripStartDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            day: "2-digit",
            month: "short",
        }).format(date);
    };
    // State to track if this trip is saved
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedTripsItems")) || [];
        setIsSaved(saved.some((t) => t._id === tripItem._id));
    }, [tripItem?._id]);

    // Toggle save/remove trip in localStorage when heart button is clicked
    const savedTrips = () => {
        const saved = JSON.parse(localStorage.getItem("savedTripsItems")) || [];
        const alreadySaved = saved.some((t) => t._id === tripItem._id);
        if (!alreadySaved) {
            const updated = [...saved, tripItem];
            localStorage.setItem("savedTripsItems", JSON.stringify(updated));
            setIsSaved(true);
        } else {
            const updated = saved.filter((t) => t._id !== tripItem._id);
            localStorage.setItem("savedTripsItems", JSON.stringify(updated));
            setIsSaved(false);
        }
    };

    const tripEndDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            year: "numeric",
            day: "2-digit",
            month: "short",
        }).format(date);
    };

    const handleUserClick = (tripId) => {
        const basePath = location.pathname.startsWith(
            "http://localhost:5173/discover"
        )
            ? "/discover"
            : "";

        navigate(`${basePath}/view-post-details/${tripId}`);
    };
    // const handleUserClick = (tripId) => {
    //     navigate(`view-post-details/${tripId}`);
    // };

    return (
        <div className=" bg-white flex flex-col items-center justify-center w-[100%] rounded-xl shadow-sm p-2 hover:border-2 hover:border-button-color h-96 transition-all duration-100 ease-linear">
            <img
                src={
                    tripItem?.coverImage
                        ? tripItem?.coverImage
                        : "https://res.cloudinary.com/pairup-connect/image/upload/f_auto,q_auto/No_image_available_afsl0y"
                }
                alt="cover image"
                className="w-fit h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-2 text-custom" />
                        {tripStartDate(tripItem?.startDate)} -{" "}
                        {tripEndDate(tripItem?.endDate)}
                    </span>
                    <span className="text-gray-600 flex items-center">
                        <FaUsers className="mr-2 text-custom" />
                        {tripItem?.participantCount} Joined
                    </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg flex flex-row items-center font-semibold text-header-color mb-1">
                            <FaMapMarkerAlt className="mr-2  text-md center text-header-color" />
                            {tripItem?.destination}
                        </h3>
                        <p className="text-gray-600 items-center text-xs w-64 truncate">
                            {tripItem?.description}
                        </p>
                    </div>
                    <button
                        onClick={savedTrips}
                        className={`!rounded-button p-2 hover:text-button-color hover:cursor-pointer ${isSaved ? "text-button-color" : "text-fonts-color"}`}
                        title={isSaved ? "Trip saved" : "Save trip"}
                        aria-pressed={isSaved}
                    >
                        <FaHeart />
                    </button>
                </div>
                <button
                    className="rounded-full w-full bg-button-color font-roboto text-white py-2 px-4 hover:bg-button-color/90 hover:cursor-pointer"
                    onClick={() => handleUserClick(tripItem?._id)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TripPostCard;
