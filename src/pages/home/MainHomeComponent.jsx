import React, { useEffect, useState, Suspense, lazy, useContext } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Loader, Categories, Button } from "../../components";
import { allTrips } from "../../features/trip/tripSlice";
import { createSelector } from "@reduxjs/toolkit";
import { LocationContext } from "../../components/LocationProvider2";
import AddressAutocomplete from "../../components/googlemaps/AddressAutocomplete";
import { FaLocationArrow, FaSearchLocation } from "react-icons/fa";
import {
    FaLocationCrosshairs,
    FaLocationPin,
    FaLocationPinLock,
} from "react-icons/fa6";

const TripPostCard = lazy(() => import("../../components/TripPostCard"));
const TripsCategories = lazy(
    () => import("../../components/categories/TripsCategories")
);
const selectTripData = createSelector(
    (state) => state.trip,
    (tripState) => ({
        trip: tripState.trip,
        loading: tripState.loading,
        errorResponse: tripState.errorResponse,
        error: tripState.error,
    })
);

const MainHomeComponent = ({ location }) => {
    const { address } = useContext(LocationContext);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [tripResponse, setTripResponse] = useState(null);
    console.log("tripResponse: ", tripResponse);
    const { trip, errorResponse, loading, error } = useSelector(
        selectTripData,
        shallowEqual
    );
    console.log(
        `trip: ${trip}, loading: ${loading}, error: ${error}, errorResponse: ${errorResponse?.status}`
    );

    useEffect(() => {
        const fetchData = async () => {
            const action = await dispatch(
                allTrips({
                    lat: location?.latitude,
                    lng: location?.longitude,
                    maxDistance: 10000,
                })
            );
            if (action?.payload) {
                setTripResponse(action.payload); // ✅ just payload
            } else {
                setTripResponse({
                    status: action?.error?.status || 500,
                    message:
                        action?.error?.message || "Unknown error occurred.",
                });
            }
        };

        fetchData();
    }, [dispatch, location?.latitude, location?.longitude]);

    if (loading) return <Loader />;
    if (
        errorResponse?.status === 404 ||
        errorResponse?.message === "Trips not found"
    ) {
        return (
            <>
                <p className="text-red-500 text-center mt-40">
                    No trips found near your location .
                    <br />
                    <span className="text-sm">
                        (Try changing your location or increase the radius.)
                    </span>
                </p>
                <div className="bg-gray-50 text-center py-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Trip Near: {selectedAddress || address}
                    </button>
                    {selectedAddress && (
                        <p className="mt-4 text-lg text-gray-700">
                            Selected: {selectedAddress}
                        </p>
                    )}
                    <AddressAutocomplete
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSelectAddress={(address) =>
                            setSelectedAddress(address)
                        }
                    />
                </div>
            </>
        );
    }
    if (error)
        return (
            <p className="text-red-500 text-center">
                Error: {error?.message || "Unknown error occurred."}
            </p>
        );
    if (!trip || trip.length === 0) {
        return (
            <p className="text-red-500 text-center mt-10">
                No trips found near your location.
            </p>
        );
    }

    return (
        <main className="flex-grow mt-20 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="bg-gray-50  gap-2 text-center py-4 ">
                    <div className="flex items-center gap-2">
                        <FaLocationCrosshairs />
                        <Button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            {selectedAddress || address?.split(",")[0]}
                        </Button>
                    </div>
                    {selectedAddress && (
                        <p className="mt-4 text-lg text-gray-700">
                            Selected: {selectedAddress}
                        </p>
                    )}
                    <AddressAutocomplete
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSelectAddress={(address) =>
                            setSelectedAddress(address)
                        }
                    />
                </div>
                <div className="bg-red-600 rounded-xl shadow p-4 gap-4 flex flex-col">
                    <Categories />
                    <Suspense fallback={<Loader />}>
                        <TripsCategories trip={trip} />
                    </Suspense>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-header-color">
                    Discover Best Trips Near You!
                </h1>
                <p className="text-sm md:text-base text-start text-paragraph-color">
                    Explore amazing travel experiences curated just for you.
                    Join fellow travelers on exciting adventures across India's
                    most beautiful destinations. From beach escapes to cultural
                    expeditions, find your perfect trip today!
                </p>
            </div>
            <div className="grid grid-cols-1 place-items-center content-center md:grid-cols-2 lg:grid-cols-3 gap-5">
                <Suspense fallback={<Loader />}>
                    {trip.map((tripItem) => (
                        <TripPostCard tripItem={tripItem} key={tripItem?._id} />
                    ))}
                </Suspense>
            </div>
        </main>
    );
};

export default MainHomeComponent;
