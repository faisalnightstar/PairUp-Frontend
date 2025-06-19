import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { Input, Loader } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchReviews } from "../../features/reviewSlice";
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import ReviewCard from "../../components/ReviewCard";

const UserReviewsDeatils = ({ userDetail, joinedDate }) => {
    //console.log("userDetail: ", userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { fetchedReviews, loading, error } = useSelector(
        (state) => state.review
    );
    //console.log("fetchReviews: ", fetchedReviews);

    useEffect(() => {
        dispatch(fetchReviews(userDetail?._id));
    }, [dispatch, navigate]);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    const userLocale = navigator.language || "en-US"; // Auto-detect user locale

    const reviewedDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(userLocale, {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(date);
    };
    return (
        <main className="flex flex-grow flex-col items-center space-y-4 my-2 max-w-8xl mx-auto sm:px-2 md:px-4 lg:px-8">
            {/* Review Form Section and Total Reviews Section */}

            <div className="w-full flex flex-col md:flex-row items-center justify-between rounded-xl  p-4 hover:shadow-neutral-400  transition-shadow space-x-4">
                {/* review form */}
                <div className="flex flex-col w-full rounded-2xl flex-1/2 md:w-1/2 space-y-4 md:space-y-0 md:space-x-4  md:p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        Write a Review
                    </h4>
                    <ReviewForm revieweeId={userDetail?._id} />
                </div>
                {/* total reviews */}
                <div className="flex flex-col rounded-2xl flex-1/2 w-full md:w-1/2 space-y-4 md:space-y-0 md:space-x-4  md:p-8">
                    <h4 className="text-2xl font-bold text-gray-900 ">
                        User Ratings
                    </h4>
                    <Ratings revieweeId={userDetail?._id} />
                </div>
            </div>

            {/* User Reviews Section */}
            <h5 className="text-xl mr-auto font-bold text-gray-900 mb-10">
                User Reviews ({fetchedReviews?.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Review Card Section */}
                {fetchedReviews &&
                    fetchedReviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            reviewedDate={reviewedDate}
                            navigate={navigate}
                        />
                    ))}
            </div>
        </main>
    );
};

export default UserReviewsDeatils;
