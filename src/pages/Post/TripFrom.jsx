// TripForm.jsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaUser } from "react-icons/fa";
import { FaIndianRupeeSign, FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createTrip } from "../../features/trip/tripSlice";

const TripForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            destination: "",
            categories: "",
            startDate: "",
            endDate: "",
            numberOfPeople: "",
            budget: "",
            description: "",
            itinerary: [{ activity: "" }],
            coverImage: null,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itinerary",
    });

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        // Create FormData for file uploads
        const formData = new FormData();
        formData.append("destination", data.destination);
        formData.append("categories", data.categories);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("numberOfPeople", data.numberOfPeople);
        formData.append("budget", data.budget);
        formData.append("description", data.description);
        formData.append("itinerary", JSON.stringify(data.itinerary));
        if (data.coverImage && data.coverImage[0]) {
            formData.append("coverImage", data.coverImage[0], "coverImage.jpg");
        }

        // Here you can dispatch your redux-thunk action (e.g., postTrip(formData))

        const response = await dispatch(createTrip(formData));

        console.log("trip post response: ", response);
        // Check if createTrip was fulfilled and the status code is 201
        if (
            createTrip.fulfilled.match(response) &&
            response.payload.statusCode === 201
        ) {
            const tripId = response.payload.data._id;
            alert("Trip posted successfully!");
            navigate("/discover");
            //navigate(`view-post-details/${tripId}`);
        } else {
            alert("Failed to post trip.");
        }

        // For demonstration, we'll log the formData keys.
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    // Use watch to get the current startDate value for validation of endDate
    const startDateValue = watch("startDate");

    return (
        <div className="flex justify-center items-center min-h-screen max-w-screen overflow-x-hidden">
            <div className="space-y-4 my-20 bg-white px-6 py-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex flex-row items-center space-x-2">
                        <FaPlaneDeparture
                            className="text-button-color"
                            size={28}
                        />
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold font-roboto text-header-color">
                            Plan Your Trip
                        </h1>
                    </div>
                    <p className="text-center text-sm font-roboto text-paragraph-color">
                        Share your travel plans and find companions
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 space-y-4"
                    encType="multipart/form-data"
                >
                    {/* Destination */}
                    <div className="relative">
                        <label
                            className="ml-2 font-roboto"
                            htmlFor="destination"
                        >
                            Destination
                        </label>
                        <div className="relative">
                            <input
                                id="destination"
                                placeholder="Destination"
                                required
                                {...register("destination", {
                                    required: "Destination is required",
                                })}
                                className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                            />
                            <FaLocationDot
                                className="absolute right-3 top-3 text-paragraph-color"
                                size={16}
                            />
                        </div>
                        {errors.destination && (
                            <p className="text-red-500 text-sm">
                                {errors.destination.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <label
                            className="ml-2 font-roboto"
                            htmlFor="categories"
                        >
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="categories"
                                {...register("categories", {
                                    required: "Category is required",
                                })}
                                className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                            >
                                <option value="" disabled>
                                    Select Trip Category
                                </option>
                                <option value="Adventure">Adventure</option>
                                <option value="Beach">Beach</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Bachlors">Bachlors</option>
                                <option value="Family-Friendly">
                                    Family-Friendly
                                </option>
                            </select>
                        </div>
                        {errors.categories && (
                            <p className="text-red-500 text-sm">
                                {errors.categories.message}
                            </p>
                        )}
                    </div>

                    {/* Start Date & End Date */}
                    <div className="flex flex-row space-x-2">
                        <div className="flex flex-col w-1/2 text-xs space-y-2">
                            <label
                                className="ml-2 font-roboto"
                                htmlFor="startDate"
                            >
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                {...register("startDate", {
                                    required: "Start date is required",
                                })}
                                min={new Date().toISOString().split("T")[0]}
                                className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col w-1/2 text-xs space-y-2">
                            <label
                                className="ml-2 font-roboto"
                                htmlFor="endDate"
                            >
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                {...register("endDate", {
                                    required: "End date is required",
                                    validate: (value) =>
                                        new Date(value) >=
                                            new Date(startDateValue) ||
                                        "End Date cannot be before Start Date",
                                })}
                                min={
                                    watch("startDate") ||
                                    new Date().toISOString().split("T")[0]
                                }
                                className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                            />
                            {errors.endDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.endDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Number of People & Budget */}
                    <div className="flex flex-row space-x-2">
                        <div className="flex flex-col w-1/2 text-xs space-y-2">
                            <label
                                className="ml-2 font-roboto"
                                htmlFor="numberOfPeople"
                            >
                                Number of People
                            </label>
                            <div className="relative">
                                <input
                                    id="numberOfPeople"
                                    type="number"
                                    placeholder="Number of People"
                                    {...register("numberOfPeople", {
                                        required:
                                            "Number of people is required",
                                    })}
                                    className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                                />
                                <FaUser
                                    className="absolute right-3 top-2.5 text-paragraph-color"
                                    size={16}
                                />
                            </div>
                            {errors.numberOfPeople && (
                                <p className="text-red-500 text-sm">
                                    {errors.numberOfPeople.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col w-1/2 text-xs space-y-2">
                            <label
                                className="ml-2 font-roboto"
                                htmlFor="budget"
                            >
                                Budget/Person
                            </label>
                            <div className="relative">
                                <FaIndianRupeeSign
                                    className="absolute right-3 top-2.5 text-paragraph-color"
                                    size={16}
                                />
                                <input
                                    id="budget"
                                    type="text"
                                    placeholder="Budget/Person"
                                    {...register("budget", {
                                        required: "Budget is required",
                                    })}
                                    className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                                />
                            </div>
                            {errors.budget && (
                                <p className="text-red-500 text-sm">
                                    {errors.budget.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="ml-2 font-roboto"
                        >
                            Trip Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            placeholder="Share details about your trip plans..."
                            className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                            cols="5"
                            rows="5"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Dynamic Itinerary */}
                    <div className="font-roboto">
                        <label className="ml-2" htmlFor="itinerary">
                            Itinerary
                        </label>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex flex-row justify-around items-center mt-2"
                            >
                                <p className="text-sm font-semibold">
                                    Day {index + 1}
                                </p>
                                <input
                                    id="itinerary"
                                    type="text"
                                    placeholder="Activity"
                                    {...register(
                                        `itinerary.${index}.activity`,
                                        {
                                            required: "Activity is required",
                                        }
                                    )}
                                    className="w-3/4 px-3 py-2 border-b-2 border-r-1 border-gray-200 rounded-md focus:outline-none focus:ring-button-color-hover focus:border-button-color sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-button-color text-md hover:text-red-600 hover:cursor-pointer"
                                >
                                    <IoIosCloseCircle size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ activity: "" })}
                            className="mt-2 text-button-color hover:text-button-color-hover"
                        >
                            + Add Day
                        </button>
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("coverImage", {
                                required: "Cover image is required",
                            })}
                            className="block w-full px-3 py-2 border-b-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-button-color sm:text-sm"
                        />
                        {errors.coverImage && (
                            <p className="text-red-500 text-sm">
                                {errors.coverImage.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-button-color w-full px-8 py-3 shadow-black shadow-sm rounded-full text-white text-xl hover:cursor-pointer hover:bg-button-color-hover"
                    >
                        Post You Trip
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripForm;
