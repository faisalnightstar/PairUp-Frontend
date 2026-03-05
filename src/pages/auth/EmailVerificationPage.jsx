import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../features/auth/authSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Loader } from "../../components";

const EmailVerificationPage = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (token) {
            const processVerification = async () => {
                try {
                    const resultAction = await dispatch(verifyEmail(token));
                    if (verifyEmail.fulfilled.match(resultAction)) {
                        setStatus("success");
                        // Automatically redirect to login after a few seconds
                        setTimeout(() => {
                            navigate("/login");
                        }, 5000);
                    } else {
                        setStatus("error");
                        setErrorMessage(
                            resultAction.payload?.message ||
                                "Verification failed."
                        );
                    }
                } catch (error) {
                    setStatus("error");
                    setErrorMessage("An unexpected error occurred.");
                }
            };
            processVerification();
        } else {
            setStatus("error");
            setErrorMessage("No verification token provided.");
        }
    }, [token, dispatch, navigate]);

    const renderContent = () => {
        switch (status) {
            case "success":
                return (
                    <>
                        <FaCheckCircle className="text-green-500" size={60} />
                        <h1 className="text-2xl font-bold mt-6 mb-2 text-text-primary">
                            Email Verified Successfully!
                        </h1>
                        <p className="text-text-secondary mb-6">
                            Your account has been activated. You can now log in
                            to continue.
                        </p>
                        <p className="text-sm text-text-muted">
                            Redirecting you to the login page...
                        </p>
                    </>
                );
            case "error":
                return (
                    <>
                        <FaTimesCircle className="text-red-500" size={60} />
                        <h1 className="text-2xl font-bold mt-6 mb-2 text-text-primary">
                            Verification Failed
                        </h1>
                        <p className="text-text-secondary mb-6">
                            {errorMessage}
                        </p>
                        <Link
                            to="/login"
                            className="w-full bg-primary text-on-primary font-semibold py-2 px-4 rounded-full hover:opacity-90 transition-opacity"
                        >
                            Back to Login
                        </Link>
                    </>
                );
            default: // 'verifying'
                return (
                    <>
                        <Loader />
                        <h1 className="text-2xl font-bold mt-6 text-text-primary">
                            Verifying your email...
                        </h1>
                        <p className="text-text-secondary">
                            Please wait a moment.
                        </p>
                    </>
                );
        }
    };

    return (
        <div className="bg-surface max-w-lg mx-auto my-20 p-8 flex flex-col items-center text-center rounded-lg shadow-md">
            {renderContent()}
        </div>
    );
};

export default EmailVerificationPage;
