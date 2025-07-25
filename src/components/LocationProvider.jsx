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
        // Only get location if we don't have it stored
        if (location) return;

        const updateLocation = async (position) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            setLocation(newLocation);
            localStorage.setItem("userLocation", JSON.stringify(newLocation));

            // Reverse geocoding using OpenStreetMap's Nominatim API with rate limiting
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${newLocation.latitude}&lon=${newLocation.longitude}&format=json`,
                    {
                        headers: {
                            'User-Agent': 'PairUp-Frontend/1.0'
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                const userAddress = data.display_name || 'Address not found';
                setAddress(userAddress);
                localStorage.setItem("userAddress", userAddress);
            } catch (error) {
                console.error("Error fetching address:", error);
                setAddress("Unable to get address");
            }
        };

        const handleError = (error) => {
            console.error("Error getting location:", error);
            // Set default values on error
            setLocation(null);
            setAddress("Location access denied");
        };

        // Use getCurrentPosition instead of watchPosition for one-time location fetch
        // Only use high accuracy if needed, and add timeout
        navigator.geolocation.getCurrentPosition(
            updateLocation,
            handleError,
            { 
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000 // Cache for 5 minutes
            }
        );
    }, [location]);

    return (
        <LocationContext.Provider value={{ location, address }}>
            {children}
        </LocationContext.Provider>
    );
};
