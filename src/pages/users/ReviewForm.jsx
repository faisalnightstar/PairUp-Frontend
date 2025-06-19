import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaStar } from "react-icons/fa"; // Import star icon
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../features/reviewSlice";
import { FaPaperPlane } from "react-icons/fa";
function ReviewForm({ revieweeId }) {
    //console.log("revieweeId: ", revieweeId);
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.review);
    const { user } = useSelector((state) => state.auth);
    //console.log("user: ", user);

    const onSubmit = (reviewData) => {
        if (user?._id == revieweeId) return alert("You cannot review yourself");
        //console.log("reviewData: ", reviewData);
        const response = dispatch(createReview({ reviewData, revieweeId }));
        console.log("response: ", response);
        reset(); // Reset form after successful submission
    };

    const StarRating = ({ field }) => {
        const [rating, setRating] = React.useState(0);
        const [hover, setHover] = React.useState(null);

        return (
            <div className="flex flex-row mt-2">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label
                            htmlFor={`rating-${ratingValue}`}
                            style={{ cursor: "pointer" }}
                            key={ratingValue}
                        >
                            <input
                                id={`rating-${ratingValue}`}
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                style={{ display: "none" }}
                                onChange={() => {
                                    setRating(ratingValue);
                                    field.onChange(ratingValue);
                                }}
                            />

                            <FaStar
                                className="star "
                                color={
                                    ratingValue <= (hover || rating)
                                        ? "#F79489"
                                        : "#e4e5e9"
                                }
                                size={20}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>
        );
    };

    return (
        <form
            className="flex flex-col  w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form-group  flex flex-col">
                <label htmlFor="rating">Rating:</label>
                <Controller
                    id="rating"
                    name="rating"
                    control={control}
                    rules={{ required: "Rating is required." }}
                    render={({ field }) => <StarRating field={field} />}
                />
                {errors.rating && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors?.rating?.message}
                    </p>
                )}
            </div>
            <div className="form-group  flex flex-col">
                <label htmlFor="comment">Your review:</label>
                <Controller
                    name="comment"
                    control={control}
                    rules={{ required: "Review is required." }}
                    render={({ field }) => (
                        <textarea
                            rows="4"
                            className="mt-1 block w-full  px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-button-color focus:border-button-color sm:text-sm"
                            {...field}
                        />
                    )}
                />
                {errors.comment && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors?.comment?.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className=" bg-button-color max-w-40 ml-auto flex flex-row items-center justify-evenly py-2 px-6 rounded-full text-white text-xs hover:cursor-pointer hover:bg-button-color-hover"
                disabled={loading === "pending"}
            >
                <FaPaperPlane className="mr-1" />
                {loading === "pending" ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}

export default ReviewForm;
