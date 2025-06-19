import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
    const navigate = useNavigate();

    // Automatically redirect to the "/home" route after 3 seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/getstarted"); // Adjust the route based on your app
        }, 3000);

        // Cleanup the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            {/* Main container for the splash screen with gradient background */}
            <motion.div
                className="w-full h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-white to-[#F79489]"
                initial={{ opacity: 0 }} // Initial animation state
                animate={{ opacity: 1 }} // Final animation state
                transition={{ duration: 1 }} // Animation duration
            >
                {/* Logo element with a scaling animation */}
                <motion.img
                    src="LogoColor.svg"
                    alt="PairUp Logo"
                    className="w-xl h-48 object-contain"
                    initial={{ scale: 0 }} // Start scale at 0 (hidden)
                    animate={{ scale: 1 }} // Scale up to full size
                    transition={{ duration: 1 }} // Animation duration
                />

                {/* Text container for app title and tagline */}
                <div className="text-center space-y-4">
                    {/* App title */}
                    {/* <h1 className="text-5xl font-bold text-custom">PairUp</h1> */}
                    {/* App tagline */}
                    <p className="text-xl text-gray-600 font-light poppins">
                        Creating Bonds That Last
                    </p>
                </div>

                {/* Loader section */}
                <div className="w-72 space-y-4">
                    {/* Progress bar loader */}
                    <motion.div className="overflow-hidden h-2 flex rounded bg-gray-200">
                        <motion.div
                            className="w-full flex flex-col text-center text-black justify-center bg-custom"
                            initial={{
                                width: "0%",
                                backgroundColor: "#3498db",
                                scale: 1,
                                opacity: 1,
                            }}
                            animate={{
                                width: "100%",
                                backgroundColor: [
                                    "#3498db",
                                    "#e74c3c",
                                    "#2ecc71",
                                ],
                                scale: [1, 1.1, 1],
                                opacity: [1, 0.8, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                            }}
                        ></motion.div>
                    </motion.div>

                    {/* Loader message */}
                    <p className="text-paragraph-color text-center animate-pulse roboto">
                        Getting things ready for your next adventure...
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
