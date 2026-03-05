import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Loader, TripPostCard } from "../../components";
import { allTrips } from "../../features/trip/tripSlice";
import { createSelector } from "@reduxjs/toolkit";
import { LocationContext } from "../../components/LocationProvider";

const selectTripData = createSelector(
    (state) => state.trip,
    (tripState) => ({
        trip: tripState.trip,
        loading: tripState.loading,
        error: tripState.error,
    })
);

const Discover = () => {
    const dispatch = useDispatch();
    //const { lat, lng } = useSelector((state) => state.location);
    //console.log("In discover page lat: ", lat, "lng: ", lng);
    // const { location, error: locationError } = useContext(LocationContext);
    const { location, error: locationError } = useContext(LocationContext);
    //const { latitude, longitude } = location;
    //console.log("location in discover: ", location, handleError);
    //console.log("latitude: ", latitude, "longitude: ", longitude);
    const { trip, loading, error } = useSelector(selectTripData, shallowEqual);
    console.log("trip in discover: ", trip);

    useEffect(() => {
        const fetchData = async () => {
            if (locationError) {
                alert(
                    `${locationError}. Please allow location access, we don't store your location.`
                );
                return <p className="text-red-500">Location not found.</p>;
            }
            if (!trip || trip.length === 0) {
                const response = await dispatch(
                    allTrips({
                        lat: location?.latitude,
                        lng: location?.longitude,
                        maxDistance: 1400000,
                    })
                );
                //console.log("response in discover: ", response.payload);
            }
        };

        fetchData();
    }, [
        dispatch,
        trip,
        location?.latitude,
        location?.longitude,
        location,
        locationError,
    ]);

    if (locationError) {
        return (
            <p className="text-red-500 mt-36 text-center">
                Location not found.
            </p>
        );
    }

    if (loading) return <Loader />;
    if (error)
        return (
            <p className="text-red-500">
                Error: {error.message || "An error occurred"}
            </p>
        );

    if (trip.length === 0 || trip.length == undefined) return <Loader />;
    return (
        <>
            <main className="flex-grow mt-20 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex space-y-1 flex-col mb-2">
                    <h1 className="md:text-3xl font-bold text-header-color">
                        Explore Trips
                    </h1>
                    <p className="font-poppins text-xs md:text-sm text-paragraph-color">
                        Find your next adventure from our curated collection of
                        trips
                    </p>
                </div>
                {error && <p className="text-red-500">{error.message}</p>}
                <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  gap-10">
                    {trip &&
                        trip.map((tripItem) => (
                            <TripPostCard
                                tripItem={tripItem}
                                key={tripItem._id}
                            />
                        ))}
                </div>
            </main>
        </>
    );
};

export default Discover;
