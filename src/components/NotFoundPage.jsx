import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
