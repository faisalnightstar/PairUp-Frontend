import React from "react";

const Categories = () => {
    const btn = ["Trips", "Events"];
    return (
        <div className="flex flex-row space-x-4">
            {btn.map((btn, index) => (
                <button
                    key={index}
                    className="bg-white font-poppins hover:text-button-color  text-header-color font-semibold py-2 px-6 rounded-full shadow"
                >
                    {btn}
                </button>
            ))}
        </div>
    );
};

export default Categories;
