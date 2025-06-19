import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRating } from "../../features/ratingSlice";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons
import { Loader } from "../../components";
import { renderStars } from "./renderStars.jsx";

function Ratings({ revieweeId }) {
    const dispatch = useDispatch();
    const { userRatings, loading, error } = useSelector(
        (state) => state.ratings
    );
    console.log(`userRatings in ratings : ${userRatings}`);

    useEffect(() => {
        if (revieweeId) {
            dispatch(fetchRating(revieweeId));
        }
    }, []);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    if (!userRatings)
        return <p className="text-gray-600 mt-10 ">No ratings available</p>;

    return (
        <div className="p-4 ">
            <div className="flex items-center mb-2">
                {renderStars(userRatings?.averageRating)}
                <span className="ml-2 font-semibold text-xl">
                    {userRatings?.averageRating} out of 5
                </span>
            </div>
            <p className="text-gray-600 mb-4">
                {userRatings?.totalCount} ratings
            </p>

            {userRatings?.ratings?.map((rating) => {
                const percentage =
                    (rating?.count / userRatings?.totalCount) * 100;
                return (
                    <div
                        key={rating?.stars}
                        className="flex items-center mb-2 "
                    >
                        <span className="mr-2"> {rating?.stars} star</span>
                        <div className="bg-gray-200 rounded-full h-1 flex-1 relative">
                            <div
                                className="bg-button-color rounded-full h-1"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <span className="ml-2">{percentage?.toFixed(0)}%</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Ratings;

// const renderStars = (averageRating) => {
//     const fullStars = Math.floor(averageRating);
//     const hasHalfStar = averageRating - fullStars >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//     return (
//         <div className="flex items-center">
//             {[...Array(fullStars)].map((_, index) => (
//                 <FaStar key={`full-${index}`} className="text-button-color" />
//             ))}
//             {hasHalfStar && <FaStarHalfAlt className="text-button-color" />}
//             {[...Array(emptyStars)].map((_, index) => (
//                 <FaStar key={`empty-${index}`} className="text-gray-300" />
//             ))}
//         </div>
//     );
// };
// export { renderStars };
