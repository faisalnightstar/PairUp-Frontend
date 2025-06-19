import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    let navigate = useNavigate();

    let handleGetStartBtn = () => {
        navigate("/register");
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-8 my-20 bg-white sm:space-y-0 md:space-y-0">
                <img className="h-24" src="LogoColor.svg" alt="" />
                <div className="flex flex-col items-center space-y-4 sm:mt-0 md:mt-0">
                    <h1 className="text-5xl font-extrabold text-center">
                        Welcome to PairUp!
                    </h1>
                    <p className="text-center">
                        Your travel companion app for finding partners, sharing
                        expenses, <br /> and creating unforgettable memories.
                    </p>
                    <img src="getStarted1.png" alt="photo" />
                </div>
                <button
                    className="bg-button-color  mt-1 px-8 py-4 rounded-full text-white  text-xl hover:cursor-pointer"
                    onClick={handleGetStartBtn}
                >
                    Get Started
                </button>
            </div>
        </>
    );
};

export default GetStarted;
