// components/LocationProvider.jsx

import { createContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(() => {
        const stored = localStorage.getItem("userLocation");
        return stored ? JSON.parse(stored) : null;
    });

    const [address, setAddress] = useState(() => {
        const stored = localStorage.getItem("userAddress");
        return stored ? stored : null;
    });
    console.log("address in location provider2: ", address);

    const [error, setError] = useState(null);

    // Optionally auto-detect user location on first load
    useEffect(() => {
        if (!location && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    };
                    setLocation(coords);
                    localStorage.setItem(
                        "userLocation",
                        JSON.stringify(coords)
                    );
                },
                (err) => setError(err.message)
            );
        }
    }, [location]);

    return (
        <LocationContext.Provider value={{ location, setLocation, error, address, setAddress }}>
            {children}
        </LocationContext.Provider>
    );
};

export { LocationContext };
