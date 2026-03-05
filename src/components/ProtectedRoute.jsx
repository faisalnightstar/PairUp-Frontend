import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/index.js";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/getstarted" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
