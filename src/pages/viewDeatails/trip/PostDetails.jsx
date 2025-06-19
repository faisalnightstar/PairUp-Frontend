import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers,
    FaExclamationCircle,
    FaRupeeSign,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Loader from "../../components/Loader";
import envConfig from "../../../confiq/envConfiq";

const PostDetails = () => {
    const { tripId } = useParams();
    const [tripDetail, setTripDetail] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [isJoined, setIsJoined] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false);

    const navigate = useNavigate();

    console.log("tripId: ", tripId);
    console.log("View Trip Details: ", tripDetail);
    console.log("Current User: ", currentUser);

    useEffect(() => {
        const fetchUserAndCheckStatus = async () => {
            try {
                const response = await axios.get(
                    `${envConfig.API_URL}/users/current-user`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        withCredentials: true,
                    }
                );

                const userData = response.data.data;
                setCurrentUser(userData);

                // Check organizer status
                if (tripDetail && userData._id === tripDetail.organizer._id) {
                    setIsOrganizer(true);
                }

                // Check if user is already a participant
                if (
                    tripDetail &&
                    tripDetail.participants?.some(
                        (participant) => participant._id === userData._id
                    )
                ) {
                    setIsJoined(true);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching currentUser details:", error);
                setLoading(false);
            }
        };

        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8001/api/v1/users/trips/view-trip/${tripId}`
                );

                const tripData = response.data.data;
                setTripDetail(tripData);

                fetchUserAndCheckStatus();
            } catch (error) {
                console.error(
                    "Error fetching trip details:",
                    error.response?.data || error.message
                );
            }
        };

        fetchTripDetails();
    }, [tripId]);

    if (!tripDetail) return <Loader />;

    // Rendering the trip details

    const userLocale = navigator.language || "en-US"; // Auto-detect currentUser locale

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

    // Function to navigate to view other currentUser details which is organizer or participant
    const handleUserClick = (username) => {
        navigate(`/view-other-user-details/${username}`);
    };

    const handleJoinTrip = async () => {
        if (!currentUser) {
            alert("Please log in to join the trip.");
            return;
        }

        if (isJoined) {
            alert("You have already joined this trip.");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8001/api/v1/users/trips/join-trip/${tripDetail._id}`,
                { userId: currentUser._id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setIsJoined(true);
                alert("Successfully joined the trip!");
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert("You have already joined this trip.");
                setIsJoined(true);
            } else {
                console.error("Error joining trip:", error);
                alert("Failed to join trip. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="min-w-screen mx-auto ">
                {/* Header Image */}
                <div className="relative">
                    <img
                        // src={tripDetail.images[0]}
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=2400&h=1000&s=1"
                        alt={tripDetail.destination}
                        className="w-full h-96 p-0 object-cover"
                    />
                    <h1 className="absolute bottom-4 left-6 text-4xl text-white font-bold">
                        {tripDetail.destination}
                    </h1>
                </div>

                {/* Trip Info */}
                <div className="flex justify-between items-cente max-w-8xl mx-auto shadow-lg bg-white  sm:mt-1 p-12 sm:p-1">
                    <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2" />{" "}
                        {tripStartDate(tripDetail.startDate)} -{" "}
                        {tripEndDate(tripDetail.endDate)}
                        <span className="flex flex-row justify-center items-center ml-2">
                            <FaUsers className="mr-1" />{" "}
                            {tripDetail.numberOfPeople} seats left
                        </span>
                    </div>

                    <span className="px-3 py-1 text-green-600 bg-green-100 rounded-full">
                        Booking Open
                    </span>
                </div>
                {/* Main Content */}
                <div className="flex flex-col justify-center md:flex-row  sm:gap-1 gap-6 px-2 md:px-2">
                    {/* Trip Details */}
                    <div className="mt-6 sm:mt-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">
                            Trip Details
                        </h2>
                        <p className="text-gray-600">
                            {tripDetail.description}
                        </p>

                        <div className="mt-4 sm:mt-1">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-red-500" />{" "}
                                Meeting Point
                            </h3>
                            <p className="text-gray-600">
                                {tripDetail.meetingPoint ||
                                    "Ngurah Rai International Airport, Denpasar"}
                            </p>
                        </div>

                        {/* Itinerary */}
                        <div className="mt-4 sm:mt-1">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaCalendarAlt className="mr-2 text-red-500" />{" "}
                                Schedule Overview
                            </h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                {tripDetail.itinerary.map((dayPlan, index) => (
                                    <li key={index}>
                                        <strong>{dayPlan.day}:</strong>{" "}
                                        {dayPlan.activity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Important Notes */}
                        <div className="mt-4 sm:mt-1">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaExclamationCircle className="mr-2 text-red-500" />{" "}
                                Important Notes
                            </h3>
                            <p className="text-gray-600">
                                Please bring comfortable walking shoes,
                                swimwear, and sun protection. All accommodations
                                and local transportation included.
                            </p>
                        </div>
                    </div>

                    {/* Organizer and Booking */}
                    <div className="mt-6  sm:mt-1 grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2  gap-6 sm:gap-1">
                        <div className="flex flex-col h-min p-4 bg-white shadow-md rounded-lg">
                            <div className="flex flex-row space-x-2 w-min">
                                <img
                                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full hover:cursor-pointer"
                                    src={tripDetail.organizer.avatar}
                                    alt={tripDetail.organizer.name}
                                    onClick={() =>
                                        handleUserClick(
                                            tripDetail.organizer.username
                                        )
                                    }
                                />
                                <div className="flex flex-col justify-center items-center pr-4">
                                    <h2
                                        className="flex flex-col font-roboto text-sm font-md w-min  cursor-pointer"
                                        onClick={() =>
                                            handleUserClick(
                                                tripDetail.organizer.username
                                            )
                                        }
                                    >
                                        {tripDetail.organizer.name}
                                        <p className="mt-0">
                                            {" "}
                                            <span
                                                className="text-xs font-md tracking-widest font-roboto bg-btn-bg-color rounded-full px-2 py-0.5 text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    handleUserClick(
                                                        tripDetail.organizer
                                                            .username
                                                    )
                                                }
                                            >
                                                @{tripDetail.organizer.username}
                                            </span>{" "}
                                        </p>
                                    </h2>

                                    <p className="text-yellow-500 text-xs">
                                        ⭐ 4.8 (124 reviews)
                                    </p>
                                </div>
                            </div>

                            <button className="mt-3 px-3 items-center bg-red-100 text-red-500  rounded-full">
                                Message Organizer
                            </button>
                        </div>

                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="flex flex-row items-center text-md font-semibold">
                                Budget:
                                <FaRupeeSign className=" text-red-500" />
                                {tripDetail.budget}/person
                            </h3>
                            <p className="text-gray-600">
                                Seats Left: {tripDetail.participants?.length} of{" "}
                                {tripDetail.numberOfPeople}
                            </p>
                            <p className="text-gray-600">
                                Joining Deadline:{" "}
                                {tripEndDate(tripDetail.endDate)}
                            </p>
                            {loading ? (
                                <div className="mt-3 w-full py-2 text-center">
                                    Loading...
                                </div>
                            ) : !isOrganizer && currentUser ? (
                                <button
                                    className={`mt-3 w-full py-2 rounded-full ${
                                        isJoined
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-red-500 text-white hover:bg-red-600"
                                    }`}
                                    onClick={handleJoinTrip}
                                    disabled={isJoined}
                                >
                                    {isJoined ? "Already Joined" : "Join Trip"}
                                </button>
                            ) : null}
                            {/* Participants Section */}
                            <div className="mt-6  w-full shadow-md rounded-lg">
                                <h3 className="text-xs text-center font-md mb-2">
                                    Participants
                                </h3>
                                <div className="flex flex-col bg-amber-400 flex-wrap gap-4">
                                    {tripDetail.participants?.map(
                                        (participant, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-3"
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full cursor-pointer"
                                                    src={participant?.avatar}
                                                    alt={participant?.name}
                                                    onClick={() =>
                                                        handleUserClick(
                                                            participant.username
                                                        )
                                                    }
                                                />
                                                <p
                                                    className="text-sm font-medium cursor-pointer"
                                                    onClick={() =>
                                                        handleUserClick(
                                                            participant?.username
                                                        )
                                                    }
                                                >
                                                    {participant?.name}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <p className="flex flex-row space-x-2 text-gray-500 text-sm mt-1 md:mt-3">
                                <img
                                    className="mr-2"
                                    src="SecureConnection.svg"
                                    alt=""
                                />
                                Don't pay anyone for this trip.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
        </>
    );
};

export default PostDetails;
