import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaEdit } from "react-icons/fa";

import { Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { singleTrip } from "../../../features/trip/tripSlice";
import DetailSection from "./DetailSection";
import JoiningAndOrganizerSection from "./JoiningAndOrganizerSection";

const ViewPostDetails = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const [isOrganizer, setIsOrganizer] = useState(false);

    //console.log("tripId for getting trip page details: ", tripId);

    // let tripDetail = useSelector((state) =>
    //     state.trip.trip.find((t) => t._id === tripId)
    // );

    const { selectedTrip, loading, error } = useSelector((state) => state.trip);
    const { user } = useSelector((state) => state.auth);

    //console.log("selectedTrip: ", selectedTrip);

    useEffect(() => {
        dispatch(singleTrip(tripId));
    }, [tripId]);

    console.log(
        "(selectedTrip.organizer?.username === user?.username): ",
        selectedTrip?.organizer?.username === user?.username
    );

    if (loading || !selectedTrip) return <Loader />;
    if (error) {
        return (
            <p className="text-red-500 mt-36">Something went wrong: {error}</p>
        );
    }
    // Rendering the trip details

    const userLocale = navigator.language || "en-US"; // Auto-detect currentUser locale
    //console.log(new Date(selectedTrip.startDate));

    const tripStartDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            day: "2-digit",
            month: "short",
        }).format(date);
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

    return (
        <>
            <div className="min-w-screen mx-auto mt-16 mb-20 overflow-hidden isolate">
                {/* Header Image */}
                <div className="relative">
                    <img
                        src={selectedTrip.coverImage}
                        alt={selectedTrip.destination}
                        className="w-full mix-blend-multipl md:h-[32rem] lg:h-full overflow-hidden p-0 object-cover"
                    />
                    <h1 className="absolute drop-shadow-2xl shadow-black outline-white outline-1 underline decoration-solid rounded-md mix-blend-plus-darker px-4 capitalize bottom-4 left-6 md:text-4xl bg-blur-sm text-white font-bold">
                        {selectedTrip?.destination}
                    </h1>
                    {isOrganizer && (
                        <FaEdit
                            className={`absolute top-4 right-4 text-lg md:text-3xl text-white cursor-pointer drop-shadow-md decoration-solid rounded-md mix-blend-plus-darker `}
                        />
                    )}
                </div>

                {/* Trip Info */}
                <div className="flex justify-between bg-white items-cente max-w-8xl mx-auto shadow-lg   sm:mt-1 px-2 p-1 md:py-4">
                    <div className="flex items-center text-gray-600 text-xs">
                        <FaCalendarAlt className="mr-2" />{" "}
                        {tripStartDate(selectedTrip.startDate)} -{" "}
                        {tripEndDate(selectedTrip.endDate)}
                        <span className="flex flex-row justify-center items-center text-xs md:text-sm ml-2">
                            <FaUsers className="mr-1" />{" "}
                            {selectedTrip.numberOfPeople} seats left
                        </span>
                    </div>

                    <span
                        className={`px-2 md:px-3 md:py-1 text-xs  rounded-full ${isJoiningOpen(selectedTrip.startDate) ? "bg-green-100 text-green-600" : "bg-gray-400 text-white"}`}
                    >
                        {isJoiningOpen(selectedTrip.startDate)
                            ? "Joining Open"
                            : " Joining Closed"}
                    </span>
                </div>
                {/* Main Content */}
                <div className="flex flex-col justify-around md:flex-row  sm:gap-1 gap-6 px-2 md:px-2">
                    {/* Trip Details Section */}
                    <DetailSection tripDetail={selectedTrip} />
                    {/* Organizer and Booking Section */}
                    <JoiningAndOrganizerSection
                        tripDetail={selectedTrip}
                        tripEndDate={tripEndDate(selectedTrip.endDate)}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewPostDetails;

function isJoiningOpen(tripStartDate) {
    const currentDate = new Date();
    const startDate = new Date(tripStartDate);

    currentDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    return currentDate <= startDate;
}
