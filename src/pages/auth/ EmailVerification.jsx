import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";

const EmailVerification = () => {
    return (
        <div className="bg-surface max-w-lg mx-auto my-20 p-8 flex flex-col items-center text-center rounded-lg shadow-md">
            <FaEnvelopeOpenText className="text-primary" size={60} />
            <h1 className="text-2xl font-bold mt-6 mb-2 text-text-primary">
                Verify Your Email
            </h1>
            <p className="text-text-secondary mb-6">
                We've sent a verification link to your email address. Please
                check your inbox and click the link to activate your account.
            </p>
            <p className="text-sm text-text-muted mb-6">
                (Don't forget to check your spam folder!)
            </p>
            <Link
                to="/login"
                className="w-full bg-primary text-on-primary font-semibold py-2 px-4 rounded-full hover:opacity-90 transition-opacity"
            >
                Back to Login
            </Link>
        </div>
    );
};

export default EmailVerification;
