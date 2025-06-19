import React, { useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import NullTrips from "./NullTrips";
import { useDispatch, useSelector } from "react-redux";
import { tripsHistory } from "../../features/trip/tripSlice.js";
import { fetchUserTripHistory } from "../../features/trip/tripHistorySlice.js";
import { useNavigate } from "react-router-dom";

const UserTripsDetails = ({ userId }) => {
    console.log("userId in UserTrips history: ", userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { trips, loading, error, message } = useSelector(
        (state) => state.tripHistory
    );
    console.log("tripHistories: ", trips, loading, error, message);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserTripHistory({ userId }));
        }
    }, [dispatch, userId]);

    if (loading) return <p>Loading...</p>;
    if (!trips || trips?.length === 0) return <NullTrips />;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="flex-grow mt-1 max-w-8xl mx-auto ">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
                Total Trips ({trips?.length})
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Trip Card 1 */}
                {trips &&
                    trips.map((trip) => (
                        <div
                            onClick={() =>
                                navigate(`/view-post-details/${trip?._id}`)
                            }
                            key={trip?._id}
                            className=" flex flex-col cursor-pointer flex-wrap content-start shadow-sm  p-4 rounded-sm"
                        >
                            <div className="flex flex-col items-start justify-between w-full">
                                <div className="flex items-center justify-between  w-full">
                                    <span
                                        className={`text-xs px-2 capitalize rounded-full ${trip?.role === "organized" ? "text-blue-600 bg-blue-100" : "bg-purple-100 text-purple-600"} `}
                                    >
                                        {trip?.role}
                                    </span>
                                    <span
                                        className={`text-xs ${trip?.status === "cancelled" ? "bg-red-100 text-red-500" : trip?.status === "completed" ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-600"} flex items-center capitalize px-2 rounded-full `}
                                    >
                                        {trip?.status}
                                    </span>
                                </div>
                                <h4 className=" font-medium text-sm leading-6 font-roboto mt-4">
                                    {trip?.destination}
                                </h4>
                                <p className="text-xs text-gray-600 flex items-center font-light">
                                    {new Date(trip?.startDate).toDateString()}
                                </p>
                            </div>
                            {/* <div className="flex flex-row items-center space-x-2 mt-2">
                                <img
                                    className="w-6 h-6 rounded-full bg-amber-200"
                                    src=""
                                    alt=""
                                />
                                
                                
                            </div> */}
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default UserTripsDetails;
