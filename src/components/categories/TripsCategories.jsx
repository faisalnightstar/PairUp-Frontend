import React, { useState } from "react";

const TripsCategories = ({ trip }) => {
    //    console.log("trip in TripsCategories: ", trip);
    const [categories, setCategories] = useState([trip]);

    const btn = [
        "All",
        "Adventure",
        "Beach",
        "Cultural",
        "Bachlors",
        "Family-Friendly",
        // "Mountains",
        // "Camping",
        // "City Tours",
        // "Historical Sites",
        // "Wildlife",
    ];
    const handleCategory = (category) => {
        console.log("trip in TripsCategories: ", category);

        if (category === "All") {
            setCategories(trip);
        } else {
            setCategories(trip.filter((trip) => trip.category === category));
        }
    };

    return (
        <div className="flex flex-row space-x-4 flex-wrap gap-2">
            {btn.map((btn, index) => (
                <button
                    onClick={() => handleCategory(btn)}
                    key={index}
                    className="bg-white font-poppins  text-header-color font-semibold py-1 px-4 rounded-full shadow transition-all duration-500 ease-in-out hover:bg-button-color hover:text-white hover:cursor-pointer hover:shadow-lg"
                >
                    {btn}
                </button>
            ))}
        </div>
    );
};

export default TripsCategories;
