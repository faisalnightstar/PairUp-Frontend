import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { Input } from "../../components";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const onSubmit = async (credentials) => {
        console.log(credentials);
        try {
            const resultAction = await dispatch(loginUser(credentials));
            if (loginUser.fulfilled.match(resultAction)) {
                // Registration was successful. Navigate to the login page.
                navigate("/");
            } else {
                // Extract error message from the rejected payload
                const errorMessage =
                    resultAction.payload?.message ||
                    "Login failed. Please try again.";
                // Set errors based on the API message
                if (errorMessage === "User does not register") {
                    setError("email", { message: errorMessage });
                    return alert("User does not register");
                } else if (errorMessage === "Invalid user credentials") {
                    setError("password", { message: errorMessage });
                    return alert("Invalid user credentials");
                } else {
                    // Fallback: set a generic error on the email field
                    setError("email", { message: errorMessage });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="max-w-md mx-auto space-y-12 my-20 bg-white p-8 rounded-lg shadow-md">
            <div className="flex space-y-3 flex-col items-center">
                <img src="/Logo1.svg" alt="" className="h-18 w-xs" />
                <h1 className="text-4xl text-center font-bold font-roboto">
                    Welcome back!
                </h1>
                <p className="text-center text-sm font-roboto mt-2 text-paragraph-color">
                    Please sign in to your account.
                </p>
            </div>
            <form
                className="mt-4 space-y-6"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="relative">
                    <MdEmail
                        className="absolute justify-center left-3 top-3 text-gray-400"
                        size={16}
                    />
                    <Input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <MdLock
                        className="absolute left-3 top-3 text-gray-400"
                        size={16}
                    />
                    <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 6 characters long",
                            },
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3 text-gray-400 focus:outline-none hover:text-gray-600"
                    >
                        {showPassword ? (
                            <MdVisibilityOff size={16} />
                        ) : (
                            <MdVisibility size={16} />
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-button-color focus:ring-button-color border-gray-300 rounded hover:cursor-pointer"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900 hover:cursor-pointer"
                        >
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-button-color hover:text-opacity-90"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-button-color hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-button-color-hover hover:bg-button-color-hover hover:cursor-pointer"
                    >
                        Log In
                    </button>
                </div>
            </form>
            <div className="mt-2 justify-around flex flex-row">
                <button
                    type="button"
                    className=" flex justify-center text-center h-12 py-3 px-6 border border-gray-300 rounded-full shadow-sm  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  hover:cursor-pointer"
                >
                    <FaGoogle className="h-6 w-6" />
                </button>
                <button
                    type="button"
                    className=" flex justify-center text-center h-12 py-3 px-6 border border-gray-300 rounded-full shadow-sm  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-color hover:cursor-pointer"
                >
                    <FaApple className="h-6 w-6" />
                </button>
                <button
                    type="button"
                    className=" flex justify-center text-center h-12 py-3 px-6 border border-gray-300 rounded-full shadow-sm  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-color hover:cursor-pointer"
                >
                    <FaFacebook className="h-6 w-6" />
                </button>
            </div>
            <p className="text-center mt-2">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-roboto hover:underline text-button-color hover:text-button-color-hover"
                >
                    Sign Up
                </Link>
            </p>
            <div className="flex justify-center mt-4 space-x-4">
                <div className="flex items-center">
                    <img
                        src="/SecureConnection.svg"
                        alt="Secure Connection"
                        className="h-3 w-3 mr-2"
                    />
                    <span className="text-gray-600 text-sm">
                        Secure Connection
                    </span>
                </div>
                <div className="flex items-center">
                    <img
                        src="/SSLEncrypted.svg"
                        alt="SSL Encrypted"
                        className="h-3 w-3 mr-2"
                    />
                    <span className="text-gray-600 text-sm">SSL Encrypted</span>
                </div>
            </div>
        </div>
    );

    // return (
    //     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
    //         <h1 className="text-3xl font-bold mb-4">Login</h1>
    //         <div className="relative my-6">
    //             <Input
    //                 type="email"
    //                 placeholder="Enter your email"
    //                 // className="w-full p-4 pl-5 bg-gray-200 rounded-lg outline-none"
    //                 {...register("email", {
    //                     required: "email is required",
    //                 })}
    //             />
    //             <i className="absolute right-5 top-1/2 transform -translate-y-1/2 bx bxs-user"></i>
    //             {errors.email && (
    //                 <p className="text-red-500 text-sm">
    //                     {errors.email.message}
    //                 </p>
    //             )}
    //         </div>
    //         <div className="relative my-6">
    //             <Input
    //                 type="password"
    //                 placeholder="Password"
    //                 // className="w-full p-4 pl-5 bg-gray-200 rounded-lg outline-none"
    //                 {...register("loginPassword", {
    //                     required: "Password is required",
    //                 })}
    //             />
    //             <i className="absolute right-5 top-1/2 transform -translate-y-1/2 bx bxs-lock-alt"></i>
    //             {errors.loginPassword && (
    //                 <p className="text-red-500 text-sm">
    //                     {errors.loginPassword.message}
    //                 </p>
    //             )}
    //         </div>
    //         <div className="mb-6">
    //             <a href="#" className="text-sm text-gray-600">
    //                 Forgot Password?
    //             </a>
    //         </div>
    //         <button
    //             type="submit"
    //             className="w-full h-12 bg-blue-500 rounded-full shadow text-white font-semibold"
    //         >
    //             Login
    //         </button>
    //         <p className="mt-4 text-sm">or login with social platforms</p>
    //         <div className="flex justify-center space-x-4 mt-4">
    //             <a href="#" className="p-2 border border-gray-300 rounded">
    //                 <i className="bx bxl-google"></i>
    //             </a>
    //             <a href="#" className="p-2 border border-gray-300 rounded">
    //                 <i className="bx bxl-facebook"></i>
    //             </a>
    //             <a href="#" className="p-2 border border-gray-300 rounded">
    //                 <i className="bx bxl-github"></i>
    //             </a>
    //             <a href="#" className="p-2 border border-gray-300 rounded">
    //                 <i className="bx bxl-linkedin"></i>
    //             </a>
    //         </div>
    //     </form>
    // );
};

export default LoginForm;
