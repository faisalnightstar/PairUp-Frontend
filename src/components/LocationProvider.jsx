// LocationProvider.jsx
import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    // Retrieve stored location and address from localStorage on initial render
    const [location, setLocation] = useState(() => {
        const savedLocation = localStorage.getItem("userLocation");
        return savedLocation ? JSON.parse(savedLocation) : null;
    });
    const [address, setAddress] = useState(() => {
        return localStorage.getItem("userAddress") || null;
    });

    useEffect(() => {
        const updateLocation = async (position) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            setLocation(newLocation);
            localStorage.setItem("userLocation", JSON.stringify(newLocation));

            // Reverse geocoding using OpenStreetMap's Nominatim API
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${newLocation.latitude}&lon=${newLocation.longitude}&format=json`
                );
                const data = await response.json();
                // Extract a human-readable address from the response.
                // data.display_name often provides a full address string.
                const userAddress = data.display_name;
                setAddress(userAddress);
                localStorage.setItem("userAddress", userAddress);
            } catch (error) {
                console.error("Error fetching address:", error);
            }
        };

        const handleError = (error) => {
            console.error("Error getting location:", error);
        };

        // Use watchPosition to continuously monitor location changes
        const watchId = navigator.geolocation.watchPosition(
            updateLocation,
            handleError,
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LocationContext.Provider value={{ location, address }}>
            {children}
        </LocationContext.Provider>
    );
};
