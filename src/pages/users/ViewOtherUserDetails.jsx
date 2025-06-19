import envConfig from "../../../confiq/envConfiq";
//import React, { useEffect, useState } from "react";
import { GetUserByUsername } from "../../api/GetUserByUsername";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
//import cookies from "js-cookie";
import cookieParser from "cookie-parser";
import Cookies from "js-cookie";
import UserTripsDetails from "./UserTripsDetails";
import UserReviewsDeatils from "./UserReviewsDeatils";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YourProfile from "./YourProfile";
import NullTrips from "./NullTrips";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const ViewOtherUserDetails = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    console.log("find user by username : ", user);

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

    const [activeComponent, setActiveComponent] = useState("details");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${envConfig.API_URL}/users/find/find-user/${username}`
                );
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [username]);

    if (!user) {
        return (
            <p className="text-center text-xl h-screen/2 font-bold mt-16 text-gray-500">
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
                                    {/* {user ? ({activeComponent === "trips" && (
                                <UserTripsDetails />) }
                            ) : (
                                
                            )} */}
                                    {activeComponent === "trips" && (
                                        <NullTrips />
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

                <Navbar />
            </div>
        </>
    );
};

export default ViewOtherUserDetails;
