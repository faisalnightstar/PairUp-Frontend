import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";

const ReviewCard = ({ review, reviewedDate, navigate }) => {
    const [expanded, setExpanded] = useState(false);
    const comment = review?.comment || "";
    const words = comment.split(" ");
    const isLong = words.length > 20;
    const displayedComment = expanded
        ? comment
        : words.slice(0, 10).join(" ") + (isLong ? "..." : "");

    return (
        <div
            key={review._id}
            className="bg-review-card-bg rounded-xl shadow-sm p-4 hover:shadow-md w-80 transition-shadow"
        >
            <div className="flex flex-row items-start justify-between space-x-4 mb-2">
                <div className="flex flex-row items-start space-x-4 mb-2">
                    <img
                        onClick={() => navigate(`/user/${review?.username}`)}
                        src={review?.avatar}
                        alt="avatar"
                        className="h-10 w-10 object-cover rounded-full cursor-pointer"
                    />
                    <div className="flex flex-col space-x-2">
                        <h5
                            onClick={() =>
                                navigate(`/user/${review?.username}`)
                            }
                            id={review?._id}
                            className="text-xs font-serif font-semibold cursor-pointer text-gray-900"
                        >
                            {review?.fullName}
                        </h5>
                        <p className="text-gray-600 flex items-center text-xs">
                            <MdStarRate className="mr-2" /> {review?.rating}
                        </p>
                    </div>
                </div>
                <span className="text-gray-600 flex items-center text-xs">
                    <FaCalendarAlt className="mr-2 text-custom" />
                    {reviewedDate(review?.createdAt)}
                </span>
            </div>
            <p className="text-xs">
                {displayedComment}
                {isLong && (
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="text-button-color ml-1 underline"
                    >
                        {isLong && !expanded ? "Show more" : "Show less"}
                    </button>
                )}
            </p>
        </div>
    );
};

export default ReviewCard;
