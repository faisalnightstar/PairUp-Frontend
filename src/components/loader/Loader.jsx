import React from "react";
import { cardio } from "ldrs";
import styles from "./Loader.module.css";

const Loader = () => {
    cardio.register();
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
