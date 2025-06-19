import envConfig from "../../../conf/envConfiq";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserDetails from "../users/UserDetails";
import UserTripsDetails from "../users/UserTripsDetails";
import UserReviewsDeatils from "../users/UserReviewsDeatils";

import YourProfile from "../users/YourProfile";
import NullTrips from "../users/NullTrips";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilesDetails = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState("details");
    const [user, setUser] = useState(null);
    const userLocale = navigator.language || "en-US"; // Auto-detect user locale
    //console.log("User :", user);
    const joinedDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            year: "numeric",
            month: "long",
        }).format(date);
    };

    const userData = useSelector((state) => state.auth.user);
    //console.log(joinedDate(user.createdAt)); // Output: "February 2025"
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `${envConfig.API_URL}/users/current-user`,
                    {
                        //headers: { Authorization: `Bearer ${accessToken}` },
                        withCredentials: true, // Send cookies
                    }
                );
                console.log("User details:", response.data.data);

                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                // logoutUser();
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            //sending data in backend
            const response = await axios.post(
                `${envConfig.API_URL}/users/logout`,
                {},

                {
                    withCredentials: true, // Send and receive cookies with the request
                }
            );

            if (response.status === 200) {
                console.log("User Logged out successfully:", response.data);
                alert("Logout successful!");
            } else {
                alert("Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.log("Error while logging out user:", error.message);
            console.error("Error response:", error.response);
            alert("An error occurred during logout. Please try again later.");
        }
    };
    return (
        <div className="mt-0">
            {user ? (
                <main className="max-w-8xl mx-auto p-6 shadow-sm">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col  m-10 mt-4 bg-background">
                            <h1 className="font-roboto text-xl font-bold sm:text-md">
                                Your Profile
                            </h1>

                            <YourProfile
                                user={user}
                                joinedDate={joinedDate}
                                isCurrentUser={true}
                            />
                        </div>
                        <div className="mt-8">
                            <Link
                                to={{
                                    pathname: "/edit-profile",
                                    state: { userData: user },
                                }}
                                className="bg-button-color p-1 px-4 rounded-full hover:cursor-pointer hover:bg-button-color-hover text-white  text-xs"
                            >
                                Edit Profile
                            </Link>
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
                                    onClick={() => setActiveComponent("trips")}
                                    className={`pb-2 text-sm font-poppins font-medium hover:cursor-pointer  ${
                                        activeComponent === "trips"
                                            ? "text-button-color border-b-2 "
                                            : "text-paragraph-color"
                                    }`}
                                >
                                    Trips
                                </button>
                                <button
                                    onClick={() => setActiveComponent("review")}
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
                                {/* {user ? ({activeComponent === "trips" && (
                                <UserTripsDetails />) }
                            ) : (
                                
                            )} */}
                                {activeComponent === "trips" && <NullTrips />}
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
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilesDetails;
