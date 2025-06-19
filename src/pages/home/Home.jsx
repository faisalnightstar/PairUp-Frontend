import React, { use, useContext, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";
import { allTrips } from "../../features/trip/tripSlice";
import { createSelector } from "@reduxjs/toolkit";
import TripPostCard from "../../components/TripPostCard";
import { LocationContext } from "../../components/LocationProvider";

const selectTripData = createSelector(
    (state) => state.trip,
    (tripState) => ({
        trip: tripState.trip,
        loading: tripState.loading,
        error: tripState.error,
    })
);
const Home = () => {
    const dispatch = useDispatch();
    //const { lat, lng } = useSelector((state) => state.location);
    //console.log("In discover page lat: ", lat, "lng: ", lng);
    const { location } = useContext(LocationContext);
    console.log("location in discover: ", location);
    if (!location) {
        return (
            <p className="text-red-500 text-center mt-36">
                Location not found.
            </p>
        );
    }

    const { trip, loading, error } = useSelector(selectTripData, shallowEqual);
    // console.log("home trip data: ", trip);

    useEffect(() => {
        const fetchData = async () => {
            if (!trip || trip?.length === 0) {
                const response = dispatch(
                    allTrips({
                        lat: location.latitude,
                        lng: location.longitude,
                        maxDistance: 10000,
                    })
                );
                console.log("response in discover: ", response);
            }
        };

        fetchData();
    }, [dispatch, trip]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!trip || trip == undefined) {
        return <Loader />;
    }

    return (
        <>
            <main className="flex-grow mt-20 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex space-y-1 flex-col mb-2">
                    <h1 className="text-xl md:text-2xl font-bold text-header-color">
                        Discover Best Trips Near You!
                    </h1>
                    <p className="font-roboto text-sm w-3/4 text-center text-paragraph-color">
                        Explore amazing travel experiences curated just for you.
                        Join fellow travelers on exciting adventures across
                        India's most beautiful destinations. From beach escapes
                        to cultural expeditions, find your perfect trip today!
                    </p>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  gap-10">
                    {trip &&
                        // Sort by participants count order and limit to top-6
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

export default Home;
