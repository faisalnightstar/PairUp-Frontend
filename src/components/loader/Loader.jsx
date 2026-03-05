import React, { useState, useEffect } from "react";
import { cardio } from "ldrs";
import styles from "./Loader.module.css";

const Loader = () => {
    cardio.register();
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFallback(true);
        }, 10000); // 10 seconds
        return () => clearTimeout(timer);
    }, []);

    if (showFallback) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <div className="text-2xl font-bold mb-4">Something went wrong.</div>
                <div className="mb-4">Please try refreshing the page.</div>
                <button
                    className="px-4 py-2 bg-[#F79489] text-white rounded hover:bg-[#e07a6b] transition"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            {/* Default values shown */}
            <l-cardio
                size="150"
                stroke="6"
                speed="3"
                color="#F79489"
            ></l-cardio>
            <div
                className={`${styles["loading-animation"]} flex flex-row mt-2 text-2xl font-bold tracking-widest`}
            >
                <span>P</span>
                <span>a</span>
                <span>i</span>
                <span>r</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>U</span>
                <span>p</span>
            </div>
        </div>
    );
};

export default Loader;
