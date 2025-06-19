import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    UserDetails,
    UserTripsDetails,
    UserReviewsDeatils,
    YourProfile,
    NullTrips,
} from "../../users/index.js";
import { Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { otherUser } from "../../../features/user/userSlice";

const ViewOtherUserDetails = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    //console.log("find user by username : ", username);

    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            dispatch(otherUser(username));
        } catch (error) {
            console.error("Error fetching user by username details:", error);
        }
    }, [username]);

    const userLocale = navigator.language || "en-US"; // Auto-detect user locale
    const joinedDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            year: "numeric",
            month: "long",
        }).format(date);
    };

    const [activeComponent, setActiveComponent] = useState("details");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <p className="text-center text-xl h-screen/2 font-bold mt-16 text-gray-500">
                Something went wrong {error}
            </p>
        );
    }

    if (!user) {
        return (
            <p className="text-center text-xl h-screen/2 font-bold mt-36 text-gray-500">
                User not found
            </p>
        );
    }

    return (
        <>
            <div className="mt-0">
                {user ? (
                    <main className="max-w-8xl mx-auto p-6 ">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col  m-10 mt-4 bg-background">
                                <h1 className="font-roboto text-xl font-bold sm:text-md">
                                    Your Profile
                                </h1>

                                <YourProfile
                                    user={user}
                                    joinedDate={joinedDate}
                                />
                            </div>
                        </div>

                        <nav>
                            <div>
                                {/* Navigation Buttons */}
                                <div className="space-x-6 mb-4">
                                    <button
                                        onClick={() =>
                                            setActiveComponent("details")
                                        }
                                        className={`pb-2 text-sm font-poppins font-medium hover:cursor-pointer  ${
                                            activeComponent === "details"
                                                ? "text-button-color border-b-2 "
                                                : "text-paragraph-color"
                                        }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveComponent("trips")
                                        }
                                        className={`pb-2 text-sm font-poppins font-medium hover:cursor-pointer  ${
                                            activeComponent === "trips"
                                                ? "text-button-color border-b-2 "
                                                : "text-paragraph-color"
                                        }`}
                                    >
                                        Trips
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveComponent("review")
                                        }
                                        className={`pb-2 text-sm font-poppins font-medium hover:cursor-pointer ${
                                            activeComponent === "review"
                                                ? "text-button-color border-b-2 "
                                                : "text-paragraph-color"
                                        }`}
                                    >
                                        Reviews
                                    </button>
                                </div>

                                {/* Render Selected Component */}
                                <div className="w-full p-4 border border-gray-200 rounded-lg shadow-md">
                                    {activeComponent === "details" && (
                                        <UserDetails userDetail={user} />
                                    )}

                                    {activeComponent === "trips" && (
                                        <UserTripsDetails userId={user._id} />
                                    )}
                                    {activeComponent === "review" && (
                                        <UserReviewsDeatils
                                            userDetail={user}
                                            joinedDate={joinedDate}
                                        />
                                    )}
                                </div>
                            </div>
                        </nav>
                    </main>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
};

export default ViewOtherUserDetails;
