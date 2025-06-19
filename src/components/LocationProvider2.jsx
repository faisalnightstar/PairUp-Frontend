// src/components/LocationProvider.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation, setLocationError } from "../features/locationSlice.js";

const LocationProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        })
                    );
                },
                (error) => {
                    console.error("Error getting location:", error);
                    dispatch(setLocationError(error.message));
                }
            );
        } else {
            dispatch(
                setLocationError(
                    "Geolocation is not supported by your browser."
                )
            );
        }
    }, [dispatch]);

    return <>{children}</>;
};

export default LocationProvider;
