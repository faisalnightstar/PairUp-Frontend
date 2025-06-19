import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "../components/index.js";
import {
    getCurrentLoggedInUser,
    refreshAccessToken,
} from "../features/auth/authSlice.js";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, initialized } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const checkAuth = async () => {
            if (!initialized && !loading) {
                if (!isAuthenticated) {
                    try {
                        await dispatch(refreshAccessToken()).unwrap(); // Wait for refreshToken to complete
                        //await dispatch(getCurrentLoggedInUser()).unwrap(); // Wait for getCurrentLoggedInUser to complete
                        // isAuthenticated will be updated by getCurrentLoggedInUser success action.
                    } catch (error) {
                        // Handle refreshToken or getCurrentLoggedInUser failure
                        console.error("Authentication check failed:", error);
                        // No need to set isAuthenticated to false here, as it's already false.
                        // You can dispatch a logout action if needed.
                    }
                }
            }
        };

        checkAuth();
    }, [dispatch, isAuthenticated, initialized, loading]);

    // Wait until the authentication state has been checked
    if (!initialized || loading) {
        return <Loader />;
    }
    // If not authenticated after loading, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/getstarted" replace />;
    }

    return children;
};

export default ProtectedRoute;
