import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaExclamationCircle,
    FaUsers,
} from "react-icons/fa";
import { LocationContext } from "../../../components/LocationProvider";
import { Loader } from "../../../components";
import axios from "../../../../axiosConfig.js";
import { useSelector } from "react-redux";

import { newtonsCradle } from "ldrs";

newtonsCradle.register();

// Default values shown

const DetailSection = () => {
    const { selectedTrip } = useSelector((state) => state.trip);
    //let selectedTrip = selectedTrip;
    // console.log("selectedTrip in details: ", selectedTrip);
    //const { address } = useContext(LocationContext);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //console.log("address in DetailSection: ", address);
    let lat = useMemo(() => selectedTrip.location.coordinates[0][1]);
    let lng = useMemo(() => selectedTrip.location.coordinates[0][0]);
    //console.log("qwerty lat: ", lat, "lng: ", lng);

    //const address = meetingPoint(lat, lng);

    useEffect(() => {
        const fetchAddress = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const data = await response.json();
                setAddress(data.display_name);

                // const resp = await axios.get(
                //     `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                // );
                // console.log("resp with axios: ", resp);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (lat && lng) {
            fetchAddress();
        }
    }, [lat, lng]);

    // if (error) {
    //     return <p>Error fetching address: {error.message}</p>;
    // }

    return (
        <div className="mt-6 sm:mt-1 bg-white p-6 rounded-lg shadow-md md:w-3/4">
            <h2 className="text-xl font-semibold mb-3">Trip Details</h2>
            <p className="text-gray-600 text-sm">{selectedTrip.description}</p>

            <div className="mt-4 sm:mt-1 flex items-center">
                <h3 className="text-sm font-semibold flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" /> Meeting
                    Point:-
                </h3>
                {loading ? (
                    <p className="text-gray-600 text-sm ml-2">
                        Loading
                        <l-newtons-cradle
                            size="30"
                            speed="1.4"
                            color="black"
                        ></l-newtons-cradle>
                    </p>
                ) : (
                    <p className="text-gray-600 text-sm ml-2">
                        {(address && address) ||
                            "Error fetching address. Please try again."}
                    </p>
                )}
            </div>

            {/* Itinerary */}
            <div className="mt-4 sm:mt-1">
                <h3 className="text-sm font-semibold flex items-center">
                    <FaCalendarAlt className="mr-2 text-red-500" /> Schedule
                    Overview
                </h3>
                <ul className="list-disc pl-5 text-gray-600">
                    {selectedTrip.itinerary.map((dayPlan, index) => (
                        <li key={index}>
                            <strong>Day {index + 1}:</strong> {dayPlan.activity}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Important Notes */}
            <div className="mt-4 sm:mt-1">
                <h3 className="text-sm font-semibold flex items-center">
                    <FaExclamationCircle className="mr-2 text-red-500" />{" "}
                    Important Notes
                </h3>
                <p className="text-gray-600">
                    Please bring comfortable walking shoes, swimwear, and sun
                    protection. All accommodations and local transportation
                    included.
                </p>
            </div>

            {/* Group Size */}
            <div className="mt-4 sm:mt-1">
                <h3 className="text-sm font-semibold flex items-center">
                    <FaUsers className="mr-2 text-red-500" /> Trip Participants
                    ({selectedTrip.participants?.length}
                    {"/"}
                    {selectedTrip.numberOfPeople})
                </h3>

                <div className="flex flex-row flex-wrap gap-4 mt-2">
                    {selectedTrip?.participants?.map((participant) => (
                        <div
                            key={participant?.username}
                            className="flex items-center space-x-1"
                        >
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer"
                                src={participant?.avatar}
                                alt={participant?.name}
                                onClick={() =>
                                    handleUserClick(participant?.username)
                                }
                            />
                            <p
                                className="text-xs font-serif cursor-pointer"
                                onClick={() =>
                                    handleUserClick(participant?.username)
                                }
                            >
                                {participant?.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailSection;

export const meetingPoint = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        // Extract a human-readable address from the response.
        // data.display_name often provides a full address string.

        return data.display_name;
    } catch (error) {
        console.error("Error fetching address:", error);
    }
};
