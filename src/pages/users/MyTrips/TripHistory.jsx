import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserTripHistory,
    setPage,
    setFilters,
} from "../../../features/trip/tripHistorySlice.js";
import { useParams } from "react-router-dom";
import TripHistoryCard from "./TripHistoryCard";
const TripHistory = ({ userId }) => {
    const dispatch = useDispatch();
    const {} = useParams();

    const {
        organizedTrips,
        participatedTrips,
        totalOrganized,
        totalParticipated,
        isLoading,
        error,
        currentPage,
        filters,
    } = useSelector((state) => state.tripHistory);

    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        if (userId) {
            dispatch(
                fetchUserTripHistory({ userId, page: currentPage, filters })
            );
        }
    }, [dispatch, userId, currentPage, filters]);

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    const handleFilterChange = (e) => {
        setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        dispatch(setFilters(localFilters));
        dispatch(
            fetchUserTripHistory({ userId, page: 1, filters: localFilters })
        );
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">User Trip History</h2>

            {/* Filters */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={localFilters.category || ""}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="minBudget"
                    placeholder="Min Budget"
                    value={localFilters.minBudget || ""}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="maxBudget"
                    placeholder="Max Budget"
                    value={localFilters.maxBudget || ""}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                />
                <button
                    onClick={applyFilters}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Apply Filters
                </button>
            </div>

            {isLoading && <p>Loading trips...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Organized Trips */}
            <h3 className="text-xl font-semibold mt-6">
                Trips as Organizer ({totalOrganized})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {organizedTrips.length > 0 ? (
                    organizedTrips.map((trip) => (
                        <TripHistoryCard
                            key={trip._id}
                            trip={trip}
                            userId={userId}
                            isOrganizer
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No organized trips found.</p>
                )}
            </div>

            {/* Participated Trips */}
            <h3 className="text-xl font-semibold mt-6">
                Trips as Participant ({totalParticipated})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {participatedTrips.length > 0 ? (
                    participatedTrips.map((trip) => (
                        <TripHistoryCard
                            key={trip._id}
                            trip={trip}
                            userId={userId}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">
                        No participated trips found.
                    </p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">
                    Page {currentPage}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TripHistory;
